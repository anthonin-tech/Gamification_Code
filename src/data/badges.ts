export type BadgeCondition =
  | 'first_lesson'
  | 'lessons_10'
  | 'lessons_50'
  | 'first_mission'
  | 'missions_all'
  | 'first_connection'
  | `mission_${number}`

export type Badge = {
  id: number
  name: string
  description: string
  icon: string
  condition: BadgeCondition
  missionId?: number
}

export const BADGES: Badge[] = [
  {
    id: 1,
    name: 'Premier pas',
    description: 'Tu as créé ton compte CodeQuest.',
    icon: '🚀',
    condition: 'first_connection',
  },
  {
    id: 2,
    name: 'Première leçon',
    description: 'Tu as complété ta toute première leçon.',
    icon: '📖',
    condition: 'first_lesson',
  },
  {
    id: 3,
    name: 'Décollage confirmé',
    description: '10 leçons complétées.',
    icon: '⭐',
    condition: 'lessons_10',
  },
  {
    id: 4,
    name: 'Astronaute confirmé',
    description: '50 leçons complétées.',
    icon: '🌠',
    condition: 'lessons_50',
  },
  {
    id: 5,
    name: 'Première mission',
    description: 'Tu as terminé ta première mission.',
    icon: '🎯',
    condition: 'first_mission',
  },
  {
    id: 6,
    name: 'Conquérant galactique',
    description: 'Tu as complété toutes les missions. Skin spécial débloqué.',
    icon: '🌌',
    condition: 'missions_all',
  },

  {
    id: 101,
    name: 'Contact Python',
    description: 'Première mission Python complétée — bienvenue dans le serpent.',
    icon: '🐍',
    condition: 'mission_10',
    missionId: 10,
  },
  {
    id: 102,
    name: 'Contact JavaScript',
    description: 'Première mission JavaScript complétée — le web n\'a plus de secrets.',
    icon: '⚡',
    condition: 'mission_20',
    missionId: 20,
  },
  {
    id: 103,
    name: 'Contact TypeScript',
    description: 'Première mission TypeScript complétée — les types sont ta force.',
    icon: '🔷',
    condition: 'mission_30',
    missionId: 30,
  },
  {
    id: 104,
    name: 'Contact Java',
    description: 'Première mission Java complétée — la JVM t\'appartient.',
    icon: '☕',
    condition: 'mission_40',
    missionId: 40,
  },
  {
    id: 105,
    name: 'Contact PHP',
    description: 'Première mission PHP complétée — le backend web n\'a plus de secrets.',
    icon: '🐘',
    condition: 'mission_50',
    missionId: 50,
  },
  {
    id: 106,
    name: 'Contact Go',
    description: 'Première mission Go complétée — la concurrence est maîtrisée.',
    icon: '🏃',
    condition: 'mission_60',
    missionId: 60,
  },
  {
    id: 107,
    name: 'Contact Rust',
    description: 'Première mission Rust complétée — la mémoire n\'a plus de peur.',
    icon: '🦀',
    condition: 'mission_70',
    missionId: 70,
  },
  {
    id: 108,
    name: 'Contact C++',
    description: 'Première mission C++ complétée — le contrôle total est atteint.',
    icon: '💻',
    condition: 'mission_80',
    missionId: 80,
  },
  {
    id: 109,
    name: 'Contact C#',
    description: 'Première mission C# complétée — .NET n\'a plus de secrets.',
    icon: '🎵',
    condition: 'mission_90',
    missionId: 90,
  },
]
