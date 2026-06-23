export interface ITask {
    taskId: number
    taskTitre: string
}

export interface IIndice {
    niveau: 1 | 2 | 3
    texte: string
    xpCout: number
}

export interface IMission {
    missionId: number
    missionTitre: string
    taches: ITask[]
    indices: IIndice[]
    xpRecompense: number
    difficulte: 'FACILE' | 'MOYEN' | 'DIFFICILE'
    langage: string
    description: string
    image: string
    minLecons: number
}