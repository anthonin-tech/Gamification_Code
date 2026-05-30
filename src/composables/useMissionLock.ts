import type { IMission } from '@/types/missions'
import { CURRICULUM_JAVASCRIPT } from '@/data/curriculum-javascript'
import { CURRICULUM_PYTHON } from '@/data/curriculum'
import { CURRICULUM_JAVA } from '@/data/curriculum-java'
import { CURRICULUM_CPP } from '@/data/curriculum-cpp'
import { CURRICULUM_GO } from '@/data/curriculum-go'
import { CURRICULUM_PHP } from '@/data/curriculum-php'
import { CURRICULUM_RUST } from '@/data/curriculum-rust'
import { CURRICULUM_TYPESCRIPT } from '@/data/curriculum-typescript'
import { CURRICULUM_CSHARP } from '@/data/curriculum-csharp'

const curriculums: Record<string, any> = {
  javascript: CURRICULUM_JAVASCRIPT,
  python:     CURRICULUM_PYTHON,
  java:       CURRICULUM_JAVA,
  cpp:        CURRICULUM_CPP,
  go:         CURRICULUM_GO,
  php:        CURRICULUM_PHP,
  rust:       CURRICULUM_RUST,
  typescript: CURRICULUM_TYPESCRIPT,
  csharp:     CURRICULUM_CSHARP,
}

export function MissionIsLock(mission: IMission): boolean {
    const raw = localStorage.getItem(`codequest_${mission.langage}_progress`)
    const data = raw ? JSON.parse(raw) : null
    const completedLessons: number[] = data?.completedLessons ?? []
    return completedLessons.length >= mission.minLecons
}

export function getLessonName(mission: IMission): string {
  const curriculum = curriculums[mission.langage]
  if (!curriculum) return 'cette leçon'
  const AllLesson = curriculum.flatMap((l: any) => l.lessons)
  const lessonRequired = AllLesson[mission.minLecons - 1]
  return lessonRequired?.title ?? 'cette leçon'
}
