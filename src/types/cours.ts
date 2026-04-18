export type Difficulte = 'FACILE' | 'MOYEN' | 'DIFFICILE'

export interface Mission {
    id: string
    titre: string
    description: string
    xp: number
    difficulte: Difficulte
    progression: number
    tag: string
    couleurTag: string
}

export interface PlaneteCoursData {
    slug: string
    statut: 'TERMINÉ' | 'EN COURS' | 'VERROUILLÉ'
    totalMissions: number
    missionsTerminees: number
    xpTotal: number
    missions: Mission[]
}