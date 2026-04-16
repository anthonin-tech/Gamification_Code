export interface Article {
    _id: string
    title: string
    link: string
    summary: string
    author: string
    publishedAt: string
    source: string
    sourceUrl: string
    category: string
    tags: string[]
    imageUrl: string
    createdAt: string
}

export interface ArticlesResponse {
    articles: Article[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}

export const CATEGORIES = [
    'Tous',
    'JavaScript',
    'TypeScript',
    'Vue.js',
    'React',
    'Python',
    'Rust',
    'Go',
    'CSS / Web',
    'DevOps',
    'Base de données',
    'Open Source',
    'Général'
] as const

export type Category = typeof CATEGORIES[number]