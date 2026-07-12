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