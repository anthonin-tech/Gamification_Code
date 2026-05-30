export interface ITask {
    taskId: number
    taskTitre: string
}

export interface IMission {
    missionId: number
    missionTitre: string
    taches: ITask[]
    xpRecompense: number
    difficulte: 'FACILE' | 'MOYEN' | 'DIFFICILE'
    langage: string
    description: string
    image: string
    minLecons: number
}