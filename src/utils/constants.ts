export const XP_PER_LEVEL = 500
export const MAX_LEVEL = 100

export const XP_REWARDS = {
  LESSON_COMPLETED: 50,
  CHALLENGE_COMPLETED: 100,
  DAILY_STREAK: 25,
  ACHIEVEMENT_COMMON: 100,
  ACHIEVEMENT_RARE: 250,
  ACHIEVEMENT_EPIC: 500,
  ACHIEVEMENT_LEGENDARY: 1000
} as const

export const RARITY_COLORS = {
  common: '#6b7280',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b'
} as const

export const RARITY_LABELS = {
  common: 'Commun',
  rare: 'Rare',
  epic: 'Épique',
  legendary: 'Légendaire'
} as const

export const DIFFICULTY_COLORS = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444'
} as const

export const DIFFICULTY_LABELS = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé'
} as const

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const API_ENDPOINTS = {
  PROFILE: '/api/profile',
  LANGUAGES: '/api/languages',
  PROGRESSION: '/api/progression',
  ACHIEVEMENTS: '/api/achievements'
} as const

export const STORAGE_KEYS = {
  PROFILE: 'codequest_profile',
  PREFERENCES: 'codequest_preferences',
  THEME: 'codequest_theme',
  PROGRESS: 'codequest_progress'
} as const

export const LIMITS = {
  MAX_SKILLS: 20,
  MAX_ACHIEVEMENTS: 50,
  MAX_USERNAME_LENGTH: 30,
  MIN_USERNAME_LENGTH: 3
} as const

export const ANIMATION_DURATIONS = {
  FAST: 150,
  BASE: 250,
  SLOW: 350,
  VERY_SLOW: 500
} as const

export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profil mis à jour avec succès',
  LESSON_COMPLETED: 'Leçon terminée ! +{xp} XP',
  ACHIEVEMENT_UNLOCKED: 'Achievement débloqué : {name}',
  LEVEL_UP: 'Niveau {level} atteint ! 🎉'
} as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion au serveur',
  PROFILE_LOAD_ERROR: 'Impossible de charger le profil',
  SAVE_ERROR: 'Erreur lors de la sauvegarde',
  INVALID_INPUT: 'Données invalides'
} as const
