export interface Langage {
    nom: string
    sym: string
    couleur: string
    annee: number
    createur: string
    usage: string
    description: string
    popularite: number
    difficulte: number
    liens: string[]
    
    _posX: number
    _posY: number
    _rayon?: number
    _angle?: number
}

export interface Planete {
    id: string
    nom: string
    couleur: string
    taille: number
    vitesse: number
    orbitePct: number
    description: string
    langages: Langage[]

    _posX?: number
    _posY?: number
    _angle?: number
    _anglesLangages?: number[]
}

export type SceneGalaxie = "galaxie" | "solaire" | "planete"

export interface EtatGalaxie {
    scene: SceneGalaxie
    planeteSelectionnee: Planete | null
    langageSelectionnee: Langage | null
}