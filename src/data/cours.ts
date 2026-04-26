import type { PlaneteCoursData } from '@/types/cours'

export const COURS_DATA: PlaneteCoursData[] = [
  {
    slug: 'javascript',
    statut: 'EN COURS',
    totalMissions: 12,
    missionsTerminees: 7,
    xpTotal: 3200,
    missions: [
      {
        id: 'js-01',
        titre: "Capturer l'astéroïde",
        description: 'Maîtrise les fonctions fléchées et le map().',
        xp: 240,
        difficulte: 'FACILE',
        progression: 65,
        tag: 'JavaScript',
        couleurTag: '#F7DC6F'
      },
      {
        id: 'js-02',
        titre: 'Réveiller le satellite',
        description: 'Construis un composant useState animé.',
        xp: 380,
        difficulte: 'MOYEN',
        progression: 40,
        tag: 'React',
        couleurTag: '#61DAFB'
      },
      {
        id: 'js-03',
        titre: 'Trou noir du tri',
        description: 'Implémente le quicksort avant la singularité.',
        xp: 520,
        difficulte: 'DIFFICILE',
        progression: 15,
        tag: 'Algo',
        couleurTag: '#A78BFA'
      },
    ]
  },
  {
    slug: 'python',
    statut: 'EN COURS',
    totalMissions: 10,
    missionsTerminees: 3,
    xpTotal: 1400,
    missions: [
      {
        id: 'py-01',
        titre: 'La Nébuleuse des listes',
        description: 'Maîtrise les list comprehensions et les slices.',
        xp: 200,
        difficulte: 'FACILE',
        progression: 80,
        tag: 'Python',
        couleurTag: '#3776AB'
      },
      {
        id: 'py-02',
        titre: 'Signal du data scientist',
        description: 'Analyse un CSV avec pandas et matplotlib.',
        xp: 450,
        difficulte: 'MOYEN',
        progression: 30,
        tag: 'Data',
        couleurTag: '#FF6F00'
      },
      {
        id: 'py-03',
        titre: 'Singularité neuronale',
        description: 'Entraîne ton premier modèle TensorFlow.',
        xp: 600,
        difficulte: 'DIFFICILE',
        progression: 0,
        tag: 'IA',
        couleurTag: '#2BA977'
      },
    ]
  },
  {
    slug: 'typescript',
    statut: 'EN COURS',
    totalMissions: 12,
    missionsTerminees: 7,
    xpTotal: 3200,
    missions: [
      {
        id: 'ts-01',
        titre: "Capturer l'astéroïde",
        description: 'Maîtrise les fonctions fléchées et le map().',
        xp: 240,
        difficulte: 'FACILE',
        progression: 65,
        tag: 'Typescript',
        couleurTag: '#3178C6'
      },
      {
        id: 'js-02',
        titre: 'Réveiller le satellite',
        description: 'Construis un composant useState animé.',
        xp: 380,
        difficulte: 'MOYEN',
        progression: 40,
        tag: 'React',
        couleurTag: '#61DAFB'
      },
      {
        id: 'js-03',
        titre: 'Trou noir du tri',
        description: 'Implémente le quicksort avant la singularité.',
        xp: 520,
        difficulte: 'DIFFICILE',
        progression: 15,
        tag: 'Algo',
        couleurTag: '#A78BFA'
      },
    ]
  },
  {
    slug: 'rust',
    statut: 'EN COURS',
    totalMissions: 12,
    missionsTerminees: 7,
    xpTotal: 3200,
    missions: [
      {
        id: 'ts-01',
        titre: "Capturer l'astéroïde",
        description: 'Maîtrise les fonctions fléchées et le map().',
        xp: 240,
        difficulte: 'FACILE',
        progression: 65,
        tag: 'Rust',
        couleurTag: '#3178C6'
      },
      {
        id: 'js-02',
        titre: 'Réveiller le satellite',
        description: 'Construis un composant useState animé.',
        xp: 380,
        difficulte: 'MOYEN',
        progression: 40,
        tag: 'React',
        couleurTag: '#61DAFB'
      },
      {
        id: 'js-03',
        titre: 'Trou noir du tri',
        description: 'Implémente le quicksort avant la singularité.',
        xp: 520,
        difficulte: 'DIFFICILE',
        progression: 15,
        tag: 'Algo',
        couleurTag: '#A78BFA'
      },
    ]
  },
  {
    slug: 'go',
    statut: 'EN COURS',
    totalMissions: 12,
    missionsTerminees: 7,
    xpTotal: 3200,
    missions: [
      {
        id: 'ts-01',
        titre: "Capturer l'astéroïde",
        description: 'Maîtrise les fonctions fléchées et le map().',
        xp: 240,
        difficulte: 'FACILE',
        progression: 65,
        tag: 'Rust',
        couleurTag: '#3178C6'
      },
      {
        id: 'js-02',
        titre: 'Réveiller le satellite',
        description: 'Construis un composant useState animé.',
        xp: 380,
        difficulte: 'MOYEN',
        progression: 40,
        tag: 'React',
        couleurTag: '#61DAFB'
      },
      {
        id: 'js-03',
        titre: 'Trou noir du tri',
        description: 'Implémente le quicksort avant la singularité.',
        xp: 520,
        difficulte: 'DIFFICILE',
        progression: 15,
        tag: 'Algo',
        couleurTag: '#A78BFA'
      },
    ]
  },
  {
    slug: 'cpp',
    statut: 'EN COURS',
    totalMissions: 12,
    missionsTerminees: 7,
    xpTotal: 3200,
    missions: [
      {
        id: 'ts-01',
        titre: "Capturer l'astéroïde",
        description: 'Maîtrise les fonctions fléchées et le map().',
        xp: 240,
        difficulte: 'FACILE',
        progression: 65,
        tag: 'Rust',
        couleurTag: '#3178C6'
      },
      {
        id: 'js-02',
        titre: 'Réveiller le satellite',
        description: 'Construis un composant useState animé.',
        xp: 380,
        difficulte: 'MOYEN',
        progression: 40,
        tag: 'React',
        couleurTag: '#61DAFB'
      },
      {
        id: 'js-03',
        titre: 'Trou noir du tri',
        description: 'Implémente le quicksort avant la singularité.',
        xp: 520,
        difficulte: 'DIFFICILE',
        progression: 15,
        tag: 'Algo',
        couleurTag: '#A78BFA'
      },
    ]
  },
  {
    slug: 'csharp',
    statut: 'EN COURS',
    totalMissions: 12,
    missionsTerminees: 7,
    xpTotal: 3200,
    missions: [
      {
        id: 'ts-01',
        titre: "Capturer l'astéroïde",
        description: 'Maîtrise les fonctions fléchées et le map().',
        xp: 240,
        difficulte: 'FACILE',
        progression: 65,
        tag: 'Rust',
        couleurTag: '#3178C6'
      },
      {
        id: 'js-02',
        titre: 'Réveiller le satellite',
        description: 'Construis un composant useState animé.',
        xp: 380,
        difficulte: 'MOYEN',
        progression: 40,
        tag: 'React',
        couleurTag: '#61DAFB'
      },
      {
        id: 'js-03',
        titre: 'Trou noir du tri',
        description: 'Implémente le quicksort avant la singularité.',
        xp: 520,
        difficulte: 'DIFFICILE',
        progression: 15,
        tag: 'Algo',
        couleurTag: '#A78BFA'
      },
    ]
  },
  {
    slug: 'java',
    statut: 'EN COURS',
    totalMissions: 12,
    missionsTerminees: 7,
    xpTotal: 3200,
    missions: [
      {
        id: 'ts-01',
        titre: "Capturer l'astéroïde",
        description: 'Maîtrise les fonctions fléchées et le map().',
        xp: 240,
        difficulte: 'FACILE',
        progression: 65,
        tag: 'Rust',
        couleurTag: '#3178C6'
      },
      {
        id: 'js-02',
        titre: 'Réveiller le satellite',
        description: 'Construis un composant useState animé.',
        xp: 380,
        difficulte: 'MOYEN',
        progression: 40,
        tag: 'React',
        couleurTag: '#61DAFB'
      },
      {
        id: 'js-03',
        titre: 'Trou noir du tri',
        description: 'Implémente le quicksort avant la singularité.',
        xp: 520,
        difficulte: 'DIFFICILE',
        progression: 15,
        tag: 'Algo',
        couleurTag: '#A78BFA'
      },
    ]
  },
  {
    slug: 'php',
    statut: 'EN COURS',
    totalMissions: 12,
    missionsTerminees: 7,
    xpTotal: 3200,
    missions: [
      {
        id: 'ts-01',
        titre: "Capturer l'astéroïde",
        description: 'Maîtrise les fonctions fléchées et le map().',
        xp: 240,
        difficulte: 'FACILE',
        progression: 65,
        tag: 'Rust',
        couleurTag: '#3178C6'
      },
      {
        id: 'js-02',
        titre: 'Réveiller le satellite',
        description: 'Construis un composant useState animé.',
        xp: 380,
        difficulte: 'MOYEN',
        progression: 40,
        tag: 'React',
        couleurTag: '#61DAFB'
      },
      {
        id: 'js-03',
        titre: 'Trou noir du tri',
        description: 'Implémente le quicksort avant la singularité.',
        xp: 520,
        difficulte: 'DIFFICILE',
        progression: 15,
        tag: 'Algo',
        couleurTag: '#A78BFA'
      },
    ]
  },
]