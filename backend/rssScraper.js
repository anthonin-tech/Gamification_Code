import Parser from 'rss-parser'
import { Article } from './models/Article.js'

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['enclosure', 'enclosure'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
})

export const RSS_SOURCES = [
  // --- JavaScript & Web ---
  { name: 'CSS-Tricks', url: 'https://css-tricks.com/feed/', category: 'CSS / Web' },
  { name: 'Dev.to JavaScript', url: 'https://dev.to/feed/tag/javascript', category: 'JavaScript' },
  { name: 'Dev.to TypeScript', url: 'https://dev.to/feed/tag/typescript', category: 'TypeScript' },
  { name: 'Dev.to Vue', url: 'https://dev.to/feed/tag/vue', category: 'Vue.js' },
  { name: 'JavaScript Weekly', url: 'https://javascriptweekly.com/rss/1a1513b4', category: 'JavaScript' },
  { name: 'TypeScript Blog', url: 'https://devblogs.microsoft.com/typescript/feed/', category: 'TypeScript' },
  { name: 'web.dev', url: 'https://web.dev/feed.xml', category: 'CSS / Web' },
  { name: 'Mozilla Hacks', url: 'https://hacks.mozilla.org/feed/', category: 'CSS / Web' },
  // --- Python ---
  { name: 'Dev.to Python', url: 'https://dev.to/feed/tag/python', category: 'Python' },
  { name: 'Real Python', url: 'https://realpython.com/atom.xml', category: 'Python' },
  { name: 'Python Insider', url: 'https://blog.python.org/feeds/posts/default', category: 'Python' },
  { name: 'Planet Python', url: 'https://planetpython.org/rss20.xml', category: 'Python' },
  // --- Rust ---
  { name: 'Dev.to Rust', url: 'https://dev.to/feed/tag/rust', category: 'Rust' },
  { name: 'This Week in Rust', url: 'https://this-week-in-rust.org/rss.xml', category: 'Rust' },
  { name: 'Rust Blog officiel', url: 'https://blog.rust-lang.org/feed.xml', category: 'Rust' },
  // --- Go ---
  { name: 'Go Blog officiel', url: 'https://go.dev/blog/feed.atom', category: 'Go' },
  { name: 'Golang Weekly', url: 'https://golangweekly.com/rss/1a1513b4', category: 'Go' },
  // --- Général ---
  { name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: 'Général' },
  { name: 'The Changelog', url: 'https://changelog.com/feed', category: 'Open Source' },
  { name: 'InfoQ', url: 'https://feed.infoq.com/', category: 'Général' },
]

const CATEGORY_KEYWORDS = {
  JavaScript: ['javascript', 'js ', 'node.js', 'nodejs', 'npm', 'webpack', 'vite', 'esm', 'ecmascript'],
  TypeScript: ['typescript', ' ts ', 'typed javascript', 'type-safe'],
  'Vue.js': ['vue.js', 'nuxt', 'vuex', 'pinia', 'composition api', 'vue 3'],
  React: ['react', 'next.js', 'jsx', 'redux', 'react hooks', 'react native'],
  Python: ['python', 'django', 'flask', 'fastapi', ' pip ', 'pandas', 'numpy', 'pytorch'],
  Rust: ['rust lang', ' rust ', 'cargo', 'tokio', 'ownership', 'borrow checker', 'rustacean'],
  Go: ['golang', ' go ', 'goroutine', 'go module'],
  'CSS / Web': ['css', 'sass', 'scss', 'tailwind', ' html', 'flexbox', 'grid layout', 'web api'],
  DevOps: ['docker', 'kubernetes', 'ci/cd', 'github actions', 'terraform', 'devops'],
  'Base de données': ['sql', 'mongodb', 'postgres', 'redis', 'database', 'orm'],
}

function detectCategory(title, summary, defaultCategory) {
  const text = `${title} ${summary}`.toLowerCase()

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) return category
  }

  return defaultCategory
}

function extractImageUrl(item) {
  if (item?.mediaContent?.$?.url) return item.mediaContent.$.url
  if (item?.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url
  if (item?.enclosure?.url) return item.enclosure.url

  const content = item?.contentEncoded || item?.content || ''
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i)
  if (imgMatch) return imgMatch[1]
  return ''
}

async function scrapeSource(source) {
  try {
    console.log(`Scraping : ${source.name}`)
    const feed = await parser.parseURL(source.url)
    const items = feed?.items ?? feed?.item ?? []

    let processedCount = 0

    for (const item of items) {
      if (!item?.title || !item?.link) continue

      const summary = item.contentSnippet || item.summary || ''
      const category = detectCategory(item.title, summary, source.category)

      try {
        await Article.findOneAndUpdate(
          { link: item.link },
          {
            $setOnInsert: {
              title: item.title.trim(),
              link: item.link,
              summary: summary.substring(0, 1000),
              content: item.contentEncoded || item.content || '',
              author: item.creator || item.author || 'Inconnu',
              publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
              source: source.name,
              sourceUrl: source.url,
              category,
              tags: item.categories || [],
              imageUrl: extractImageUrl(item),
            },
          },
          {
            upsert: true,
            new: false,
          }
        )
        processedCount++
      } catch (err) {
        if (err?.code !== 11000) {
          console.error(`Erreur sauvegarde : ${item.title}`, err?.message ?? err)
        }
      }
    }

    console.log(`${source.name} : ${processedCount} articles traités`)
    return processedCount
  } catch (error) {
    console.error(`Impossible de scraper ${source.name} :`, error)
    return 0
  }
}

export async function scrapeAllSources() {
  console.log(`Démarrage du scraping RSS...`)
  const start = Date.now()
  const results = await Promise.allSettled(RSS_SOURCES.map((source) => scrapeSource(source)))
  const total = results.reduce((sum, result) => sum + (result.status === 'fulfilled' ? result.value : 0), 0)
  const duration = ((Date.now() - start) / 1000).toFixed(1)

  console.log(`Scraping terminé en ${duration}s - ${total} articles traités`)
}

