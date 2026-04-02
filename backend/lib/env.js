import fs from 'node:fs'
import path from 'node:path'

function stripOptionalQuotes(value) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

export function loadDotEnv({ cwd = process.cwd(), filename = '.env', override = false } = {}) {
  const envPath = path.join(cwd, filename)
  if (!fs.existsSync(envPath)) return {}

  const raw = fs.readFileSync(envPath, 'utf8')
  const loaded = {}

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue

    const key = trimmed.slice(0, eqIndex).trim()
    if (!key) continue

    const valuePart = trimmed.slice(eqIndex + 1)
    const value = stripOptionalQuotes(valuePart)

    if (override || process.env[key] === undefined) {
      process.env[key] = value
      loaded[key] = value
    }
  }

  return loaded
}
