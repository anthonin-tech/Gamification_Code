export interface Framework {
  nom: string
  sym: string
  couleur: string
  description: string
  cours?: string
  site?: string
  vitesse?: number
  _angle?: number
  _posX?: number
  _posY?: number
  _rayon?: number
}

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
  frameworks: Framework[]
  cours?: string
  _posX?: number
  _posY?: number
  _anglesFrameworks?: number[]
}

export type SceneGalaxie = 'galaxie' | 'systemes' | 'solaire'
