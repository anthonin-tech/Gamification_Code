// ============================================
// TYPES CENTRALISÉS - CodeQuest
// ============================================
// Ce fichier exporte tous les types TypeScript
// Avantage : Import simplifié depuis n'importe où
// Usage : import type { UserProfile, Achievement } from '@/types'

// Types pour le profil utilisateur
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Achievement {
  id: number
  icon: string
  name: string
  unlocked: boolean
  rarity: AchievementRarity
  x: number
  y: number
}

export interface OrbitingSkill {
  name: string
  level: number
  angle: number
  distance: number
  color: string
  size: number
}

export interface WormholeActivity {
  title: string
  dimension: string
  energy: number
  time: string
  color: string
}

export interface HexStat {
  label: string
  value: number | string
  icon: string
  color: string
}

export interface UserProfile {
  username: string
  avatarUrl: string
  title: string
  level: number
  energy: string
  skills: OrbitingSkill[]
  stats: HexStat[]
  activites: WormholeActivity[]
  achievements: Achievement[]
}

// Types pour les langages de programmation
export interface Language {
  id: string
  name: string
  description: string
  icon: string
  color: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  progress: number
  totalLessons: number
  completedLessons: number
}

// Types pour les articles/news
export interface Article {
  _id: string
  title: string
  summary: string
  category: string
  publishedAt: string
  imageUrl: string
  link: string
  source: string
  tags: string[]
}

export interface ArticlePagination {
  total: number
  totalPages: number
  hasPrev: boolean
  hasNext: boolean
}

export interface ArticlesResponse {
  articles: Article[]
  pagination: ArticlePagination
}

// Catégories disponibles pour les filtres
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
  'Général',
] as const

// Types pour la progression
export interface ProgressData {
  date: string
  xp: number
  lessons: number
  challenges: number
}

export interface Streak {
  current: number
  longest: number
  lastActivity: string
}
