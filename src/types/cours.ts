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

export type StepType = 'theory' | 'quiz' | 'code-challenge' | 'fill-blank' | 'project'

export interface Callout {
    kind: 'tip' | 'warn' | 'success' | 'info' | 'sci'
    icon : string
    title: string
    text : string
}

export interface CodeBlock {
    filename : string
    src : string
}

export interface FillPart {
    type: 'text' | 'blank'
    value?: string
    placeholder?: string
    correct?: string
}

export type LessonStep =
  | {
      type: 'theory'
      title: string
      content: string
      callout?: Callout
      code?: CodeBlock
    }
  | {
      type: 'quiz'
      question: string
      options: string[]
      correct: number
      xp: number
      successMsg: string
      errorMsg: string
    }
  | {
      type: 'code-challenge'
      instructions: string
      placeholder?: string
      filename?: string
      xp: number
      hint?: string
      validator: (code: string) => boolean
      expectedOutput?: string | null
    }
  | {
      type: 'fill-blank'
      instructions: string
      parts: FillPart[]
      xp: number
    }
  | {
      type: 'project'
      title: string
      description: string
      filename: string
      starter: string
      objectives: string[]
      xp: number
      validator: (code: string) => boolean
    }

export interface CourseLesson {
  title: string
  subtitle: string
  type: 'theory' | 'quiz' | 'project' | 'challenge'
  time: string
  xp: number
  steps: LessonStep[]
}

export interface CourseModule {
  icon: string
  title: string
  lessons: CourseLesson[]
}