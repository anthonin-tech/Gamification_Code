import type { UserProfile } from '@/types/profil'

export const USER_PROFILE: UserProfile = {
  username: 'Cosmic Developer',
  avatarUrl:
    'https://images.unsplash.com/photo-1610024513279-8724fb30468a?w=480&q=80&fit=crop',
  title: 'Architect of the Multiverse • Reality Bender • Quantum Coder',
  level: 42,
  energy: '47.8K',

  skills: [
    { name: 'TypeScript', level: 92, angle: 0,   distance: 130, color: '#a855f7', size: 40 },
    { name: 'Python',     level: 85, angle: 180,  distance: 130, color: '#f97316', size: 36 },
    { name: 'Vue.js',     level: 88, angle: 0,   distance: 180, color: '#06b6d4', size: 48 },
    { name: 'Node.js',    level: 79, angle: 120,  distance: 180, color: '#4ade80', size: 42 },
    { name: 'Rust',       level: 61, angle: 240,  distance: 180, color: '#f43f5e', size: 38 },
    { name: 'React',      level: 94, angle: 0,   distance: 240, color: '#60a5fa', size: 52 },
    { name: 'GraphQL',    level: 74, angle: 120,  distance: 240, color: '#facc15', size: 44 },
    { name: 'Docker',     level: 82, angle: 240,  distance: 240, color: '#ec4899', size: 46 },
    { name: 'Go',         level: 55, angle: 0,   distance: 300, color: '#34d399', size: 38 },
    { name: 'K8s',        level: 67, angle: 180,  distance: 300, color: '#c084fc', size: 40 },
  ],

  stats: [
    { label: 'XP Points',   value: 9847, icon: 'zap',         color: 'from-yellow-400 to-orange-500' },
    { label: 'Projects',    value: 42,   icon: 'layers',      color: 'from-purple-400 to-pink-500'  },
    { label: 'Galaxies',    value: 156,  icon: 'globe',       color: 'from-blue-400 to-cyan-500'    },
    { label: 'Global Rank', value: '#7', icon: 'trending-up', color: 'from-green-400 to-emerald-500'},
  ],

  activites: [
    {
      title:     'Quantum Algorithm Solved',
      dimension: 'Dimension X-42',
      energy:    2850,
      time:      '2h ago',
      color:     'from-purple-500 to-pink-500',
    },
    {
      title:     'Parallel Universe Deployed',
      dimension: 'Dimension Z-17',
      energy:    1920,
      time:      '5h ago',
      color:     'from-blue-500 to-cyan-500',
    },
    {
      title:     'Cosmic Code Merged',
      dimension: 'Dimension Y-89',
      energy:    3140,
      time:      '1d ago',
      color:     'from-green-500 to-emerald-500',
    },
  ],

  achievements: [
    { id: 1, icon: 'rocket',   name: 'Warp Speed',       unlocked: true,  rarity: 'legendary', x: 18, y: 28 },
    { id: 2, icon: 'locked',   name: 'Hidden Sector',    unlocked: false, rarity: 'common',    x: 13, y: 68 },
    { id: 3, icon: 'locked',   name: 'Uncharted Signal', unlocked: false, rarity: 'legendary', x: 40, y: 52 },
    { id: 4, icon: 'moon',     name: 'Lunar Drift',      unlocked: true,  rarity: 'rare',      x: 50, y: 72 },
    { id: 5, icon: 'star',     name: 'Supernova',        unlocked: true,  rarity: 'epic',      x: 80, y: 38 },
    { id: 6, icon: 'telescope',name: 'Deep Scan',        unlocked: true,  rarity: 'epic',      x: 75, y: 82 },
  ],
}
