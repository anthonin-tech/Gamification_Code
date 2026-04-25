import type { UserProfile } from '@/types/profil'

export const USER_PROFILE: UserProfile = {
  username:  'AnthoGalaxy',
  title:     'Cosmic Developer · Explorateur du code',
  avatarUrl: '',      
  level:     42,
  xp:        8_450,     
  xpToNext:  10_000,   
  streak:    37,        

  favoriteLanguages: [
    { name: 'TypeScript', icon: 'TS', color: '#3b82f6', glow: 'rgba(59,130,246,0.45)'  },
    { name: 'Python',     icon: 'PY', color: '#facc15', glow: 'rgba(250,204,21,0.4)'   },
    { name: 'Vue',        icon: 'VU', color: '#4ade80', glow: 'rgba(74,222,128,0.4)'   },
    { name: 'Rust',       icon: 'RS', color: '#fb923c', glow: 'rgba(251,146,60,0.4)'   },
  ],

  currentLanguage: {
    name:     'TypeScript',
    icon:     'TS',
    color:    '#3b82f6',
    progress: 68,
    mission:  'Maîtriser les Generics avancés',
  },
}
