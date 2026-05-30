<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { CURRICULUM_CSHARP } from '@/data/curriculum-csharp'
import { XP_PER_LEVEL }      from '@/utils/constants'
import type { CourseModule }  from '@/types/cours'
import '@/assets/styles/pages/lecon.css'

const LS_KEY = 'codequest_csharp_progress'
const LESSON_STATUS_BADGES = {
  inProgress: '↩ Reprise en cours',
  completed: '✓ Terminée',
} as const

type LessonSnapshot = {
  quizAnswered: Record<number, boolean>
  quizSelected: Record<number, number>
  codeInputs: Record<number, string>
  fillAnswers: Record<string, string>
  fillResults: Record<number, boolean | null>
  challengeResults: Record<number, boolean | null>
  challengeOutputs: Record<number, string>
  currentStep: number
}

type PersistedProgress = {
  totalXP?: number
  streak?: number
  completedLessons?: string[]
  currentModule?: number
  currentLesson?: number
  currentStep?: number
  activeModule?: number
  savedLessonData?: Record<string, LessonSnapshot>
}

type InteractiveStore = Record<string, unknown>
type LessonStep = any

const curriculum: CourseModule[] = CURRICULUM_CSHARP

const starCanvas = ref<HTMLCanvasElement | null>(null)
let animFrame = 0

const totalXP = ref(0)
const streak = ref(3)
const completedLessons = ref<Set<string>>(new Set())
const sidebarOpen = ref(false)
const activeModule = ref(0)
const currentModule = ref(0)
const currentLesson = ref(0)
const currentStep = ref(0)
const copied = ref(false)

const savedLessonData = ref<Record<string, LessonSnapshot>>({})

const quizAnswered = reactive<Record<number, boolean>>({})
const quizSelected = reactive<Record<number, number>>({})
const codeInputs = reactive<Record<number, string>>({})
const challengeOutputs = reactive<Record<number, string>>({})
const challengeResults = reactive<Record<number, boolean | null>>({})
const fillAnswers = reactive<Record<string, string>>({})
const fillResults = reactive<Record<number, boolean | null>>({})

const playerLevel = computed(() => Math.floor(totalXP.value / XP_PER_LEVEL) + 1)
const levelPercent = computed(() => (totalXP.value % XP_PER_LEVEL) / (XP_PER_LEVEL / 100))
const activeLesson = computed(() => curriculum[currentModule.value]?.lessons[currentLesson.value])
const lessonKey = computed(() => getLessonKey(currentModule.value, currentLesson.value))
const hasSavedLesson = computed(() => !!savedLessonData.value[lessonKey.value])
const isCurrentLessonCompleted = computed(() => completedLessons.value.has(lessonKey.value))
const currentLessonStatus = computed(() => {
  if (isCurrentLessonCompleted.value) return LESSON_STATUS_BADGES.completed
  if (hasSavedLesson.value) return LESSON_STATUS_BADGES.inProgress
  return ''
})

function getLessonKey(moduleIndex: number, lessonIndex: number) {
  return `${moduleIndex}-${lessonIndex}`
}

function isLessonCompleted(moduleIndex: number, lessonIndex: number) {
  return completedLessons.value.has(getLessonKey(moduleIndex, lessonIndex))
}

function hasSavedProgress(moduleIndex: number, lessonIndex: number) {
  return !!savedLessonData.value[getLessonKey(moduleIndex, lessonIndex)]
}

function clearStore(store: InteractiveStore) {
  Object.keys(store).forEach(key => delete store[key])
}

function initStars() {
  const c = starCanvas.value
  if (!c) return
  const ctx = c.getContext('2d')!
  c.width = window.innerWidth
  c.height = window.innerHeight

  const stars = Array.from({ length: 220 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 1.4 + 0.2,
    o: Math.random(),
    d: Math.random() > 0.5 ? 1 : -1,
    s: Math.random() * 0.005 + 0.002
  }))

  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height)
    for (const s of stars) {
      s.o += s.s * s.d
      if (s.o >= 1 || s.o <= 0) s.d *= -1
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200,185,255,${s.o})`
      ctx.fill()
    }
    animFrame = requestAnimationFrame(draw)
  }
  draw()
}

function saveProgress() {
  snapshotCurrentLesson()

  const data = {
    totalXP: totalXP.value,
    streak: streak.value,
    completedLessons: [...completedLessons.value],
    currentModule: currentModule.value,
    currentLesson: currentLesson.value,
    currentStep: currentStep.value,
    activeModule: activeModule.value,
    savedLessonData: savedLessonData.value,
  }
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

function loadProgress() {
  const raw = localStorage.getItem(LS_KEY)
  if (!raw) return

  try {
    const data: PersistedProgress = JSON.parse(raw)
    totalXP.value = data.totalXP ?? 0
    streak.value = data.streak ?? 3
    completedLessons.value = new Set(data.completedLessons ?? [])
    currentModule.value = data.currentModule ?? 0
    currentLesson.value = data.currentLesson ?? 0
    currentStep.value = data.currentStep ?? 0
    activeModule.value = data.activeModule ?? 0
    savedLessonData.value = data.savedLessonData ?? {}

    restoreLessonData(data.currentModule ?? 0, data.currentLesson ?? 0)
  } catch {
    localStorage.removeItem(LS_KEY)
  }
}

function snapshotCurrentLesson() {
  savedLessonData.value[lessonKey.value] = {
    quizAnswered: { ...quizAnswered },
    quizSelected: { ...quizSelected },
    codeInputs: { ...codeInputs },
    fillAnswers: { ...fillAnswers },
    fillResults: { ...fillResults },
    challengeResults: { ...challengeResults },
    challengeOutputs: { ...challengeOutputs },
    currentStep: currentStep.value,
  }
}

function restoreLessonData(mi: number, li: number) {
  const key = getLessonKey(mi, li)
  clearInteractiveState()
  const snap = savedLessonData.value[key]
  if (!snap) return
  Object.assign(quizAnswered, snap.quizAnswered ?? {})
  Object.assign(quizSelected, snap.quizSelected ?? {})
  Object.assign(codeInputs, snap.codeInputs ?? {})
  Object.assign(fillAnswers, snap.fillAnswers ?? {})
  Object.assign(fillResults, snap.fillResults ?? {})
  Object.assign(challengeResults, snap.challengeResults ?? {})
  Object.assign(challengeOutputs, snap.challengeOutputs ?? {})
}

function clearInteractiveState() {
  ;[quizAnswered, quizSelected, codeInputs, challengeOutputs, challengeResults, fillAnswers, fillResults]
    .forEach(clearStore)
}

watch([totalXP, currentStep, completedLessons], saveProgress, { deep: true })

watch([() => ({ ...quizAnswered }), () => ({ ...codeInputs }), () => ({ ...fillAnswers })],
  saveProgress, { deep: true })

function lessonTypeIcon(type: string) {
  return ({ theory: '📖', quiz: '⚡', project: '🚀', challenge: '💻' } as Record<string, string>)[type] ?? '📄'
}
function lessonTypeLabel(type: string) {
  return ({ theory: 'Cours', quiz: 'Quiz', project: 'Projet', challenge: 'Défi' } as Record<string, string>)[type] ?? 'Leçon'
}
function isModuleComplete(mi: number) {
  return curriculum[mi].lessons.every((_, li) => isLessonCompleted(mi, li))
}
function isModuleLocked(mi: number) {
  if (mi === 0) return false
  return !isModuleComplete(mi - 1)
}
function isLessonLocked(mi: number, li: number) {
  if (isModuleLocked(mi)) return true
  if (li === 0) return false
  return !isLessonCompleted(mi, li - 1)
}
function modProgress(mi: number) {
  return curriculum[mi].lessons.filter((_, li) => isLessonCompleted(mi, li)).length
}
function toggleModule(mi: number) {
  activeModule.value = activeModule.value === mi ? -1 : mi
}

function goLesson(mi: number, li: number) {
  if (isLessonLocked(mi, li)) return

  snapshotCurrentLesson()

  currentModule.value = mi
  currentLesson.value = li
  sidebarOpen.value   = false

  const key = getLessonKey(mi, li)
  const snap = savedLessonData.value[key]
  if (snap) {
    restoreLessonData(mi, li)
    currentStep.value = snap.currentStep ?? 0
  } else {
    clearInteractiveState()
    currentStep.value = 0
  }

  saveProgress()
}

function nextStep(si: number) {
  if (!activeLesson.value) return
  if (si + 1 >= activeLesson.value.steps.length) {
    completeLesson()
  } else {
    currentStep.value = si + 1
  }
}

function completeLesson() {
  const key = lessonKey.value
  if (!completedLessons.value.has(key)) {
    completedLessons.value.add(key)
    totalXP.value += activeLesson.value?.xp ?? 0
  }
  currentStep.value = activeLesson.value?.steps.length ?? 99
}

function goNextLesson() {
  const mod = curriculum[currentModule.value]
  if (currentLesson.value < mod.lessons.length - 1) {
    goLesson(currentModule.value, currentLesson.value + 1)
  } else if (currentModule.value < curriculum.length - 1) {
    goLesson(currentModule.value + 1, 0)
    activeModule.value = currentModule.value
  }
}

function answerQuiz(si: number, oi: number, step: LessonStep) {
  if (quizAnswered[si]) return
  quizSelected[si] = oi
  quizAnswered[si] = true
  if (oi === step.correct) totalXP.value += step.xp ?? 0
  saveProgress()
}

function runChallenge(si: number, step: LessonStep) {
  const code = codeInputs[si] ?? step.starter ?? ''
  let output = '$ python main.py\n'
  const prints = [...code.matchAll(/print\s*\(([^)]+)\)/g)]
  for (const m of prints) {
    const raw = m[1].trim().replace(/^["']|["']$/g, '').replace(/\\n/g, '\n')
    output += raw + '\n'
  }
  if (!prints.length) output += '(aucune sortie)'
  challengeOutputs[si] = output
  const passed = step.validator ? step.validator(code) : prints.length > 0
  challengeResults[si] = passed
  if (passed) totalXP.value += step.xp ?? 0
  saveProgress()
}

function checkFill(si: number, step: LessonStep) {
  let allCorrect = true
  step.parts.forEach((part: any, pi: number) => {
    if (part.type === 'blank') {
      const ans = (fillAnswers[`${si}-${pi}`] ?? '').trim()
      if (ans !== part.correct) allCorrect = false
    }
  })
  fillResults[si] = allCorrect
  if (allCorrect) totalXP.value += step.xp ?? 0
  saveProgress()
}

function formatCode(code: string): string {
  if (!code) return ''
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function copyCode(src: string) {
  try {
    await navigator.clipboard.writeText(src)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch {}
}

function resetAllProgress() {
  if (!confirm('Réinitialiser toute ta progression C# ?')) return
  localStorage.removeItem(LS_KEY)
  location.reload()
}

onMounted(() => {
  initStars()
  window.addEventListener('resize', initStars)
  loadProgress()
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  window.removeEventListener('resize', initStars)
})
</script>

<template>
  <main class="lecon-page">
    <canvas ref="starCanvas" class="star-canvas"></canvas>

    <aside class="lecon-sidebar" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="sidebar-top">
        <div class="lang-pill">
          <span class="lang-emoji">💜</span>
          <span class="lang-name">C#</span>
          <span class="lang-level">Zéro → Expert</span>
        </div>
        <button class="sidebar-close" @click="sidebarOpen = false">✕</button>
      </div>

      <div class="xp-section">
        <div class="xp-top-row">
          <span class="xp-total">⚡ {{ totalXP }} XP</span>
          <span class="xp-level">Niveau {{ playerLevel }}</span>
        </div>
        <div class="xp-bar-wrap">
          <div class="xp-bar-fill" :style="{ width: levelPercent + '%' }"></div>
        </div>
        <div class="xp-streak">🔥 {{ streak }} jours · {{ completedLessons.size }} leçons</div>
      </div>

      <nav class="module-nav">
        <div v-for="(mod, mi) in curriculum" :key="mi" class="module-group">
          <button
            class="module-header"
            :class="{
              'mod-active':   activeModule === mi,
              'mod-complete': isModuleComplete(mi),
              'mod-locked':   isModuleLocked(mi)
            }"
            @click="toggleModule(mi)"
          >
            <span class="mod-icon">{{ mod.icon }}</span>
            <span class="mod-title">{{ mod.title }}</span>
            <span class="mod-badge">{{ modProgress(mi) }}/{{ mod.lessons.length }}</span>
            <span class="mod-arrow" :class="{ rotated: activeModule === mi }">›</span>
          </button>

          <div class="lesson-list" v-if="activeModule === mi">
            <button
              v-for="(lesson, li) in mod.lessons"
              :key="li"
              class="lesson-btn"
              :class="{
                'lesson-active': currentModule === mi && currentLesson === li,
                'lesson-done':   isLessonCompleted(mi, li),
                'lesson-locked': isLessonLocked(mi, li)
              }"
              @click="goLesson(mi, li)"
            >
              <span class="lesson-dot"></span>
              <span>{{ lesson.title }}</span>
              <span v-if="hasSavedProgress(mi, li) && !isLessonCompleted(mi, li)">↩</span>
              <span v-else>{{ lessonTypeIcon(lesson.type) }}</span>
            </button>
          </div>
        </div>
      </nav>

      <div style="padding: 12px 18px; border-top: 1px solid rgba(255,255,255,0.06); margin-top: auto;">
        <button
          @click="resetAllProgress"
          style="background:none;border:none;color:rgba(255,255,255,0.2);font-size:11px;cursor:pointer;font-family:inherit;"
        >↺ Réinitialiser la progression</button>
      </div>
    </aside>

    <div class="lecon-main">

      <div class="topbar">
        <button class="menu-btn" @click="sidebarOpen = true">☰</button>
        <div class="breadcrumb">
          <span>{{ curriculum[currentModule]?.title }}</span>
          <span class="bc-sep">›</span>
          <span class="bc-lesson">{{ curriculum[currentModule]?.lessons[currentLesson]?.title }}</span>
        </div>
        <span
          v-if="hasSavedLesson && !isCurrentLessonCompleted"
          style="font-size:11px;color:rgba(251,191,36,0.8);background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.25);padding:3px 10px;border-radius:99px;"
        >{{ currentLessonStatus }}</span>
        <div class="topbar-xp">⚡ {{ totalXP }}</div>
      </div>

      <div v-if="activeLesson">

        <div class="lesson-hero">
          <div class="lesson-hero-meta">
            <span class="hero-type-badge">
              {{ lessonTypeIcon(activeLesson.type) }} {{ lessonTypeLabel(activeLesson.type) }}
            </span>
            <span class="hero-xp-badge">+{{ activeLesson.xp }} XP</span>
            <span class="hero-time">⏱ {{ activeLesson.time }}</span>
            <span
              v-if="isCurrentLessonCompleted"
              style="font-size:11px;color:#06d6a0;background:rgba(6,214,160,0.1);border:1px solid rgba(6,214,160,0.3);padding:3px 10px;border-radius:99px;"
            >{{ currentLessonStatus }}</span>
          </div>
          <h1 class="lesson-title-big">{{ activeLesson.title }}</h1>
          <p class="lesson-subtitle">{{ activeLesson.subtitle }}</p>
          <div class="lesson-progress-bar">
            <div
              class="lesson-progress-fill"
              :style="{ width: (currentStep / Math.max(activeLesson.steps.length - 1, 1)) * 100 + '%' }"
            ></div>
          </div>
        </div>

        <div class="steps-wrap">
          <div
            v-for="(step, si) in activeLesson.steps"
            :key="si"
            class="step-card"
            :class="{ 'step-visible': si <= currentStep, 'step-current': si === currentStep }"
          >

            <div v-if="step.type === 'theory'" class="step-theory">
              <div class="step-tag">📖 Concept</div>
              <h3>{{ step.title }}</h3>
              <p v-html="step.content"></p>
              <div v-if="step.callout" class="callout" :class="'callout-' + step.callout.kind">
                <strong>{{ step.callout.icon }} {{ step.callout.title }}</strong>
                <p>{{ step.callout.text }}</p>
              </div>
              <div v-if="step.code" class="code-block">
                <div class="code-header">
                  <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
                  <span class="code-fn">{{ step.code.filename }}</span>
                  <button class="copy-btn" @click="copyCode(step.code.src)">{{ copied ? '✓' : '⎘' }}</button>
                </div>
                <pre class="code-body" v-html="formatCode(step.code.src)"></pre>
              </div>
              <button class="btn-next" @click="nextStep(si)">Suivant →</button>
            </div>

            <div v-if="step.type === 'quiz'" class="step-quiz">
              <div class="step-tag">⚡ Quiz</div>
              <p class="quiz-q">{{ step.question }}</p>
              <div class="quiz-opts">
                <button
                  v-for="(opt, oi) in step.options"
                  :key="oi"
                  class="quiz-opt"
                  :class="{
                    'opt-correct': quizAnswered[si] && oi === step.correct,
                    'opt-wrong':   quizAnswered[si] && oi === quizSelected[si] && oi !== step.correct,
                  }"
                  :disabled="!!quizAnswered[si]"
                  @click="answerQuiz(si, oi, step)"
                >{{ opt }}</button>
              </div>
              <div v-if="quizAnswered[si]" class="quiz-feedback" :class="quizSelected[si] === step.correct ? 'fb-ok' : 'fb-ko'">
                {{ quizSelected[si] === step.correct ? '✅ ' + step.successMsg : '❌ ' + step.errorMsg }}
              </div>
              <button v-if="quizAnswered[si]" class="btn-next" @click="nextStep(si)">Continuer →</button>
            </div>

            <div v-if="step.type === 'code-challenge'" class="step-challenge">
              <div class="step-tag">💻 Défi Code</div>
              <div class="challenge-instructions">
                <p>{{ step.instructions }}</p>
                <div v-if="step.hint" class="callout callout-tip">💡 {{ step.hint }}</div>
              </div>
              <div class="editor-wrap">
                <div class="editor-header">
                  <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
                  <span>{{ step.filename ?? 'main.py' }}</span>
                  <button class="run-btn" @click="runChallenge(si, step)">▶ Run</button>
                </div>
                <textarea
                  v-model="codeInputs[si]"
                  class="code-textarea"
                  spellcheck="false"
                  :placeholder="step.placeholder"
                ></textarea>
              </div>
              <div v-if="challengeOutputs[si]" class="terminal-output">
                <div class="terminal-header">◉ Terminal</div>
                <pre>{{ challengeOutputs[si] }}</pre>
              </div>
              <div v-if="challengeResults[si] === true" class="callout callout-success">
                🎉 Mission réussie ! +{{ step.xp }} XP
                <button class="btn-next" @click="nextStep(si)">Continuer →</button>
              </div>
              <div v-if="challengeResults[si] === false" class="callout callout-warn">
                🔄 Pas tout à fait… Relis la consigne et réessaie !
              </div>
            </div>
            
            <div v-if="step.type === 'fill-blank'" class="step-fill">
              <div class="step-tag">✏️ Complète le code</div>
              <p>{{ step.instructions }}</p>
              <div class="fill-code">
                <span v-for="(part, pi) in step.parts" :key="pi">
                  <code v-if="part.type === 'text'">{{ part.value }}</code>
                  <input
                    v-else
                    v-model="fillAnswers[`${si}-${pi}`]"
                    class="fill-input"
                    :placeholder="part.placeholder"
                    :style="{ width: ((part.placeholder?.length ?? 6) * 10) + 'px' }"
                  />
                </span>
              </div>
              <button class="btn-check" @click="checkFill(si, step)">Vérifier ✓</button>
              <div v-if="fillResults[si] === true"  class="callout callout-success">✅ Parfait ! +{{ step.xp }} XP <button class="btn-next" @click="nextStep(si)">Suivant →</button></div>
              <div v-if="fillResults[si] === false" class="callout callout-warn">❌ Pas tout à fait, réessaie !</div>
            </div>

            <div v-if="step.type === 'project'" class="step-project">
              <div class="step-tag">🚀 Mini-Projet</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="project-objectives">
                <div v-for="obj in step.objectives" :key="obj" class="obj-item">○ {{ obj }}</div>
              </div>
              <div class="editor-wrap">
                <div class="editor-header">
                  <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
                  <span>{{ step.filename }}</span>
                  <button class="run-btn" @click="runChallenge(si, step)">▶ Run</button>
                </div>
                <textarea v-model="codeInputs[si]" class="code-textarea large" spellcheck="false">{{ step.starter }}</textarea>
              </div>
              <div v-if="challengeOutputs[si]" class="terminal-output">
                <div class="terminal-header">◉ Terminal</div>
                <pre>{{ challengeOutputs[si] }}</pre>
              </div>
              <button class="btn-project-done" @click="completeLesson">
                ✅ Projet terminé → +{{ step.xp }} XP
              </button>
            </div>

          </div>
        </div>

        <div v-if="currentStep >= activeLesson.steps.length" class="lesson-complete">
          <div class="complete-stars">
            <span v-for="n in 3" :key="n" class="star-big lit">★</span>
          </div>
          <h2>Leçon terminée ! 🏆</h2>
          <div class="complete-stats">
            <div class="cstat"><span>{{ activeLesson.xp }}</span><small>XP</small></div>
            <div class="cstat"><span>{{ activeLesson.time }}</span><small>Durée</small></div>
          </div>
          <button class="btn-next-lesson" @click="goNextLesson">Leçon suivante →</button>
        </div>

      </div>
    </div>

  </main>
</template>


