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
    name: 'Décollage : les variables',
    description: 'Mission 1 complétée — Variables maîtrisées.',
    icon: '📦',
    condition: 'mission_1',
    missionId: 1,
  },
  {
    id: 102,
    name: 'Orbite des conditions',
    description: 'Mission 2 complétée — Conditions maîtrisées.',
    icon: '🔀',
    condition: 'mission_2',
    missionId: 2,
  },
  {
    id: 103,
    name: 'Propulseurs : les fonctions',
    description: 'Mission 3 complétée — Fonctions maîtrisées.',
    icon: '⚙️',
    condition: 'mission_3',
    missionId: 3,
  },
  {
    id: 104,
    name: "Champ d'astéroïdes : les tableaux",
    description: 'Mission 4 complétée — Tableaux maîtrisés.',
    icon: '📋',
    condition: 'mission_4',
    missionId: 4,
  },
  {
    id: 105,
    name: 'Station spatiale : les objets',
    description: 'Mission 5 complétée — Objets maîtrisés.',
    icon: '🛸',
    condition: 'mission_5',
    missionId: 5,
  },
  {
    id: 106,
    name: 'Signal asynchrone : les Promises',
    description: 'Mission 6 complétée — Async/await maîtrisé.',
    icon: '⏳',
    condition: 'mission_6',
    missionId: 6,
  },
  {
    id: 107,
    name: 'Nébuleuse TypeScript : les types',
    description: 'Mission 7 complétée — TypeScript maîtrisé.',
    icon: '🔷',
    condition: 'mission_7',
    missionId: 7,
  },
  {
    id: 108,
    name: 'Trou noir : les algorithmes de tri',
    description: 'Mission 8 complétée — Algorithmes maîtrisés.',
    icon: '🌀',
    condition: 'mission_8',
    missionId: 8,
  },
  {
    id: 109,
    name: 'Singularité : récursion et memoization',
    description: 'Mission 9 complétée — Récursion maîtrisée.',
    icon: '♾️',
    condition: 'mission_9',
    missionId: 9,
  },
]
