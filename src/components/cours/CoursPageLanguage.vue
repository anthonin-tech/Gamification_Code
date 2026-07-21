<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { LANGAGES } from '@/data/langages'
import type { Langage } from '@/types/langage'
import type { PlaneteCoursData, CourseModule } from '@/types/cours'
import { CURRICULUM_PYTHON } from '@/data/curriculum'
import { CURRICULUM_JAVASCRIPT } from '@/data/curriculum-javascript'
import { CURRICULUM_TYPESCRIPT } from '@/data/curriculum-typescript'
import { CURRICULUM_JAVA } from '@/data/curriculum-java'
import { CURRICULUM_PHP } from '@/data/curriculum-php'
import { CURRICULUM_GO } from '@/data/curriculum-go'
import { CURRICULUM_CPP } from '@/data/curriculum-cpp'
import { CURRICULUM_RUST } from '@/data/curriculum-rust'
import { CURRICULUM_CSHARP } from '@/data/curriculum-csharp'

const props = defineProps<{
  langage: Langage
  cours: PlaneteCoursData
}>()

const router = useRouter()

const SLUGS = ['javascript', 'python', 'typescript', 'go', 'rust', 'cpp', 'csharp', 'java', 'php']

function goTo(slug: string) {
  router.push(`/cours/${slug}`)
}

function labelFor(slug: string) {
  return LANGAGES.find(l => l.slug === slug)?.nom ?? slug
}

function colorFor(slug: string) {
  return LANGAGES.find(l => l.slug === slug)?.couleur ?? '#a78bfa'
}

function startLesson() {
  router.push(`/cours/${props.langage.slug}/learn`)
}

const CURRICULUM_MAP: Record<string, CourseModule[]> = {
  python:     CURRICULUM_PYTHON,
  javascript: CURRICULUM_JAVASCRIPT,
  typescript: CURRICULUM_TYPESCRIPT,
  java:       CURRICULUM_JAVA,
  php:        CURRICULUM_PHP,
  go:         CURRICULUM_GO,
  cpp:        CURRICULUM_CPP,
  rust:       CURRICULUM_RUST,
  csharp:     CURRICULUM_CSHARP,
}

const curriculumData = computed(() => CURRICULUM_MAP[props.langage.slug] ?? [])
const completedLessons = ref(new Set<string>())

onMounted(() => {
  const raw = localStorage.getItem(`codequest_${props.langage.slug}_progress`)
  if (raw) {
    try {
      const data = JSON.parse(raw)
      completedLessons.value = new Set<string>(data.completedLessons ?? [])
    } catch {}
  }
})

const totalLessons = computed(() =>
  curriculumData.value.reduce((s, m) => s + m.lessons.length, 0)
)

const completedCount = computed(() => completedLessons.value.size)

const progressPct = computed(() =>
  totalLessons.value ? Math.round((completedCount.value / totalLessons.value) * 100) : 0
)

function modCompleted(mi: number) {
  const mod = curriculumData.value[mi]
  if (!mod) return 0
  return mod.lessons.filter((_, li) => completedLessons.value.has(`${mi}-${li}`)).length
}

function isLessonCompleted(mi: number, li: number) {
  return completedLessons.value.has(`${mi}-${li}`)
}

function isModuleComplete(mi: number) {
  const mod = curriculumData.value[mi]
  return !!mod && mod.lessons.every((_, li) => isLessonCompleted(mi, li))
}

function isModuleLocked(mi: number) {
  if (mi === 0) return false
  return !isModuleComplete(mi - 1)
}

function isLessonLocked(mi: number, li: number) {
  if (mi === 0 && li === 0) return false
  if (isModuleLocked(mi)) return true
  if (li > 0) return !isLessonCompleted(mi, li - 1)
  return false
}

function lessonStatus(mi: number, li: number): 'done' | 'active' | 'locked' {
  if (isLessonCompleted(mi, li)) return 'done'
  if (isLessonLocked(mi, li)) return 'locked'
  return 'active'
}

const STATUS_LABEL = { done: 'TERMINÉ', active: 'EN COURS', locked: 'VERROUILLÉ' } as const
</script>

<template>
  <div class="cp" :style="{ '--lc': langage.couleur }">

    <nav class="switcher">
      <button
        v-for="slug in SLUGS"
        :key="slug"
        class="sw-btn"
        :class="{ 'sw-btn--active': langage.slug === slug }"
        @click="goTo(slug)"
      >
        <span class="sw-dot" :style="{ background: colorFor(slug), boxShadow: `0 0 5px ${colorFor(slug)}` }"></span>
        {{ labelFor(slug) }}
      </button>
    </nav>

    <div class="cp-header">
      <div class="cp-header__left">
        <div
          class="cp-planet"
          :style="{
            background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,.55), ${langage.couleur} 55%, color-mix(in srgb, ${langage.couleur} 75%, #000))`,
            boxShadow: `0 0 30px color-mix(in srgb, ${langage.couleur} 45%, transparent), inset 0 -6px 14px rgba(0,0,0,.3)`
          }"
        >
          {{ langage.sym }}
        </div>
        <div class="cp-header__info">
          <h1 class="cp-header__title">{{ langage.nom }}</h1>
          <p class="cp-header__sub">{{ completedCount }} / {{ totalLessons }} leçons complètes</p>
          <div class="cp-header__bar">
            <div
              class="cp-header__fill"
              :style="{ width: progressPct + '%', background: langage.couleur, boxShadow: `0 0 10px ${langage.couleur}` }"
            ></div>
          </div>
        </div>
      </div>
      <button class="cp-btn-continue" @click="startLesson">CONTINUER ►</button>
    </div>

    <div class="cp-modules">
      <div v-for="(mod, mi) in curriculumData" :key="mi" class="cp-module">
        <div class="cp-module__head">
          <span class="cp-module__num">M{{ mi + 1 }}</span>
          <span class="cp-module__icon">{{ mod.icon }}</span>
          <span class="cp-module__title">{{ mod.title.toUpperCase() }}</span>
          <span class="cp-module__badge">{{ modCompleted(mi) }}/{{ mod.lessons.length }}</span>
        </div>
        <div class="cp-lessons">
          <div
            v-for="(lesson, li) in mod.lessons"
            :key="li"
            class="cp-lesson"
            :class="`cp-lesson--${lessonStatus(mi, li)}`"
          >
            <span class="cp-lesson__dot"></span>
            <span class="cp-lesson__name">{{ lesson.title }}</span>
            <span class="cp-lesson__tag">{{ STATUS_LABEL[lessonStatus(mi, li)] }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped src="@/assets/styles/components/Cours/CoursPageLanguage.css"></style>
