import http from 'node:http'
import dns from 'node:dns'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

import mongoose from 'mongoose'
import cron from 'node-cron'

import { loadDotEnv } from './lib/env.js'
import { Article } from './models/Article.js'
import { scrapeAllSources } from './rssScraper.js'

import { User } from './models/User.js'
import { parseBody } from './lib/parseBody.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { parseCookies } from './lib/parseCookies.js'

function isDnsLikeMongoError(error) {
  const code = error?.code
  const syscall = error?.syscall
  const dnsSyscalls = new Set(['querySrv', 'getaddrinfo'])
  if (syscall && !dnsSyscalls.has(syscall)) return false
  return code === 'ECONNREFUSED' || code === 'ENOTFOUND' || code === 'EAI_AGAIN'
}

function parseDnsServers(value) {
  if (!value) return undefined
  const servers = String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return servers.length ? servers : undefined
}

async function tryConnectWithAltDns({ mongodbUri, serverSelectionTimeoutMS, dnsServers }) {
  const previousServers = dns.getServers()
  try {
    dns.setServers(dnsServers)
    await mongoose.connect(mongodbUri, { serverSelectionTimeoutMS })
    return { connected: true, dnsServersUsed: dnsServers }
  } finally {
    try {
      dns.setServers(previousServers)
    } catch {
    }
  }
}

async function connectMongo({ mongodbUri, mongodbUriFallback, serverSelectionTimeoutMS }) {
  try {
    await mongoose.connect(mongodbUri, { serverSelectionTimeoutMS })
    return { uriUsed: mongodbUri, usedFallback: false }
  } catch (error) {
    const isSrvDnsError =
      String(mongodbUri).startsWith('mongodb+srv://') &&
      (isDnsLikeMongoError(error) || isDnsLikeMongoError(error?.cause))

    if (isSrvDnsError) {
      const envServers = parseDnsServers(process.env.MONGODB_DNS_SERVERS)
      const dnsServers = envServers || ['1.1.1.1', '8.8.8.8']
      try {
        console.warn('DNS SRV refusé: tentative avec DNS publics (1.1.1.1 / 8.8.8.8)...')
        const result = await tryConnectWithAltDns({ mongodbUri, serverSelectionTimeoutMS, dnsServers })
        if (result.connected) {
          return { uriUsed: mongodbUri, usedFallback: false, usedAltDns: true }
        }
      } catch (retryError) {
        error = retryError
      }
    }

    if (!mongodbUriFallback) throw error
    console.warn('Connexion MongoDB (primary) échouée, tentative fallback...')
    console.warn(error)
    await mongoose.connect(mongodbUriFallback, { serverSelectionTimeoutMS })
    return { uriUsed: mongodbUriFallback, usedFallback: true }
  }
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '86400')
}

async function handleGetArticles(url, res) {
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1)
  const limit = Math.min(20, parseInt(url.searchParams.get('limit') || '12', 10) || 12)
  const category = url.searchParams.get('category') || undefined
  const search = url.searchParams.get('search') || undefined

  const filter = {}

  if (category && category !== 'Tous') filter.category = category

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } },
    ]
  }

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-content -__v')
      .lean(),
    Article.countDocuments(filter),
  ])

  return sendJson(res, 200, {
    articles,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  })
}

async function handleScrape(res) {
  console.log('Scraping manuel déclenché')
  scrapeAllSources().catch(console.error)
  return sendJson(res, 202, { message: 'Scraping démarré en arrière-plan' })
}

export async function startBackend(options = {}) {
  loadDotEnv({ override: true })

  const port = options.port ?? Number(process.env.PORT || 3000)
  const enableScheduler = options.enableScheduler ?? process.env.ENABLE_SCHEDULER !== 'false'
  const mongodbRequired = options.mongodbRequired ?? process.env.MONGODB_REQUIRED !== 'false'
  const serverSelectionTimeoutMS = options.serverSelectionTimeoutMS ?? 5000

  const mongodbUri = process.env.MONGODB_URI
  if (!mongodbUri) {
    throw new Error('MONGODB_URI manquant. Ajoute-le dans `.env` (à la racine).')
  }

  const mongodbUriFallback = process.env.MONGODB_URI_FALLBACK || undefined
  let mongoConnected = false

  try {
    const { uriUsed, usedFallback, usedAltDns } = await connectMongo({
      mongodbUri,
      mongodbUriFallback,
      serverSelectionTimeoutMS,
    })
    mongoConnected = true
    console.log(`MongoDB connecté${usedFallback ? ' (fallback)' : ''}`)
    if (usedFallback) console.log(`URI utilisée: ${uriUsed}`)
    if (usedAltDns) console.log('Connexion établie via DNS alternatifs (config interne Node)')
  } catch (error) {
    const isDnsError = isDnsLikeMongoError(error) || isDnsLikeMongoError(error?.cause)
    if (isDnsError && String(mongodbUri).startsWith('mongodb+srv://')) {
      console.error(
        '❌ Échec DNS en tentant de résoudre le cluster MongoDB (mongodb+srv). ' +
          'Vérifie ta connexion Internet/DNS, ou fournis un fallback local via MONGODB_URI_FALLBACK.',
      )
    }

    if (mongodbRequired) throw error
    console.warn('MongoDB indisponible: démarrage en mode dégradé (MONGODB_REQUIRED=false).')
    console.warn(error)
  }

  if (enableScheduler && mongoConnected) {
    console.log('Démarrage du scheduler RSS...')
    setTimeout(() => {
      scrapeAllSources().catch(console.error)
    }, 3000)
    cron.schedule('0 * * * *', async () => {
      await scrapeAllSources()
    })
    console.log('Scheduler actif (scraping toutes les heures)')
  } else if (!enableScheduler) {
    console.log('Scheduler désactivé (ENABLE_SCHEDULER=false)')
  } else {
    console.log('Scheduler désactivé (MongoDB non connecté)')
  }

  const server = http.createServer(async (req, res) => {
    try {
      setCors(res)

      if (req.method === 'OPTIONS') {
        res.statusCode = 204
        return res.end()
      }

      const base = `http://${req.headers.host || 'localhost'}`
      const url = new URL(req.url || '/', base)

      if (req.method === 'GET' && url.pathname === '/api/health') {
        return sendJson(res, 200, { ok: true, mongoConnected })
      }

      if (req.method === 'GET' && url.pathname === '/api/articles') {
        if (!mongoConnected) {
          return sendJson(res, 503, { error: 'MongoDB indisponible (mode dégradé)' })
        }
        return await handleGetArticles(url, res)
      }

      if (req.method === 'POST' && url.pathname === '/api/scrape') {
        if (!mongoConnected) {
          return sendJson(res, 503, { error: 'MongoDB indisponible (mode dégradé)' })
        }
        return await handleScrape(res)
      }

      if (req.method === 'POST' && url.pathname === '/api/auth/register') {
        if (!mongoConnected) {
          return sendJson(res, 503, { error: 'MongoDB indisponible (mode dégradé)'})
        }
        return await handleRegister(req, res)
      }

      if (req.method === 'POST' && url.pathname === '/api/auth/login'){
        if (!mongoConnected) {
          return sendJson(res, 503, { error: 'MongoDB indisponible (mode dégradé)'})
        }
        return await handleLogin(req, res)
      }
      if (req.method === 'GET' && url.pathname === '/api/auth/profil'){
        if (!mongoConnected) {
          return sendJson(res, 503, { error: 'MongoDB indisponible (mode dégradé)'})
        }
        return await handleMe(req, res)
      }

      if (req.method === 'POST' && url.pathname === '/api/auth/logout'){
        if (!mongoConnected) {
          return sendJson(res, 503, { error: 'MongoDB indisponible (mode dégradé)'})
        }
        return await handleLogout(req, res)
      }

      if (req.method === 'POST' && url.pathname === '/api/badges/unlock'){
        if (!mongoConnected) {
          return sendJson(res, 503, { error: 'MongoDB indisponible (mode dégradé)'})
        }
        return await handleLockBadge(req, res)
      }

      if (req.method === 'POST' && url.pathname === '/api/execute'){
        if (!mongoConnected) {
          return sendJson(res, 503, { error: 'MongoDB indisponible (mode dégradé)'})
        }
        return await handleExcute(req, res)
      }

      return sendJson(res, 404, { error: 'Not found' })
    } catch (error) {
      console.error('Erreur API:', error)
      return sendJson(res, 500, { error: 'Internal server error' })
    }
  })

  server.listen(port, () => {
    console.log(`Backend prêt sur http://localhost:${port}`)
  })

  const shutdown = async () => {
    console.log('Arrêt du backend...')
    server.close(() => {
      console.log('HTTP server arrêté')
    })

    try {
      if (mongoConnected) {
        await mongoose.connection.close()
        console.log('MongoDB déconnecté')
      }
    } catch (e) {
      console.error('Erreur fermeture MongoDB:', e)
    } finally {
      process.exit(0)
    }
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  return server
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  startBackend().catch((e) => {
    console.error('Impossible de démarrer le backend:', e)
    process.exit(1)
  })
}

async function handleRegister(req, res) {
  const { username, email, password } = await parseBody(req)
  const userInfo = new User({ username, email, password })
  await userInfo.save()
  const token = jwt.sign( {id: userInfo._id, username }, process.env.JWT_SECRET , { expiresIn: '7d' })
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800`)
  sendJson(res, 201, { message: 'Compte créé' })
}

async function handleLogin(req, res) {
  const { email, password } = await parseBody(req)
  const user = await User.findOne({ email })
  if (!user) {
    return sendJson(res, 401, { error: 'Identifiants introuvables' })
  }
  const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
    return sendJson(res, 401, { error: 'Mauvais mot de passe' })
  }
  const token = jwt.sign( {id: user._id, username: user.username }, process.env.JWT_SECRET , { expiresIn: '7d' })
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800`)
  sendJson(res, 200, { message: 'Connecté' })
}

async function handleMe(req, res) {
    const cookie = parseCookies(req)
    if (!cookie.token) {
      return sendJson(res, 401, { error: 'Non connecté' })
    }
    let response
    try {
      response = jwt.verify(cookie.token, process.env.JWT_SECRET)
    } catch (error) {
      return sendJson(res, 401, { message: 'Token invalide'})
    }
    const user = await User.findById(response.id)
    sendJson(res, 200, { user })
}

async function handleLogout(req, res) {
  res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0`)
  sendJson(res, 200, { message: 'Déconnecté' })
}

async function handleLockBadge(req, res) {
  const cookie = parseCookies(req)
  if (!cookie.token) {
    return sendJson(res, 401, { error: 'Non connecté' })
  }
  let response
  try {
    response = jwt.verify(cookie.token, process.env.JWT_SECRET)
  } catch (error) {
    return sendJson(res, 401, { message: 'Token invalide'})
  }
  const userId = response.id
  const { badgeId } = await parseBody(req)
  const badge = await User.findByIdAndUpdate(userId, { $addToSet: { badges: badgeId } })
  sendJson(res, 200, { message: 'Badge ✓'})  
}

async function handleExcute(req, res) {
  const cookie = parseCookies(req)
  if (!cookie.token) {
    return sendJson(res, 401, { error: 'Non connecté'})
  }
  let response
  try {
    response = jwt.verify(cookie.token, process.env.JWT_SECRET)
  } catch (error) {
    return sendJson(res, 401, { message: 'Token invalide'})
  }
  const { langage, code } = await parseBody(req)
  const pistonRes = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: langage, version: '*', files: [{ content: code }] })
  })
  const data = await pistonRes.json()

  sendJson(res, 200, { stdout: data.run.stdout, stderr: data.run.stderr, exitCode: data.run.code })
}