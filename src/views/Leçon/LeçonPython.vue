<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { CURRICULUM_PYTHON } from '@/data/curriculum'
import { XP_PER_LEVEL }      from '@/utils/constants'
import type { CourseModule }  from '@/types/cours'
import '@/assets/styles/pages/lecon.css'

const route = useRoute()

const starCanvas = ref<HTMLCanvasElement | null>(null)
let animFrame = 0

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

onMounted(() => { initStars(); window.addEventListener('resize', initStars) })
onUnmounted(() => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', initStars) })

const curriculum: CourseModule[] = CURRICULUM_PYTHON

const totalXP          = ref(0)
const streak           = ref(3)
const completedLessons = ref<Set<string>>(new Set())
const sidebarOpen      = ref(false)
const activeModule     = ref(0)
const currentModule    = ref(0)
const currentLesson    = ref(0)
const currentStep      = ref(0)
const copied           = ref(false)

const playerLevel  = computed(() => Math.floor(totalXP.value / XP_PER_LEVEL) + 1)
const levelPercent = computed(() => (totalXP.value % XP_PER_LEVEL) / (XP_PER_LEVEL / 100))
const activeLesson = computed(() => curriculum[currentModule.value]?.lessons[currentLesson.value])

const quizAnswered     = reactive<Record<number, boolean>>({})
const quizSelected     = reactive<Record<number, number>>({})
const codeInputs       = reactive<Record<number, string>>({})
const challengeOutputs = reactive<Record<number, string>>({})
const challengeResults = reactive<Record<number, boolean | null>>({})
const fillAnswers      = reactive<Record<string, string>>({})
const fillResults      = reactive<Record<number, boolean | null>>({})

function lessonTypeIcon(type: string) {
  return ({ theory: '📖', quiz: '⚡', project: '🚀', challenge: '💻' } as Record<string, string>)[type] ?? '📄'
}
function lessonTypeLabel(type: string) {
  return ({ theory: 'Cours', quiz: 'Quiz', project: 'Projet', challenge: 'Défi' } as Record<string, string>)[type] ?? 'Leçon'
}
function isModuleComplete(mi: number) {
  return curriculum[mi].lessons.every((_, li) => completedLessons.value.has(`${mi}-${li}`))
}
function isModuleLocked(mi: number) {
  if (mi === 0) return false
  return !isModuleComplete(mi - 1)
}
function isLessonLocked(mi: number, li: number) {
  if (isModuleLocked(mi)) return true
  if (li === 0) return false
  return !completedLessons.value.has(`${mi}-${li - 1}`)
}
function modProgress(mi: number) {
  return curriculum[mi].lessons.filter((_, li) => completedLessons.value.has(`${mi}-${li}`)).length
}
function toggleModule(mi: number) {
  activeModule.value = activeModule.value === mi ? -1 : mi
}

function goLesson(mi: number, li: number) {
    if (isLessonLocked(mi, li)) return
    currentModule.value = mi
    currentLesson.value = li
    currentStep.value = 0
    sidebarOpen.value = false

    ;[quizAnswered, quizSelected, codeInputs, challengeOutputs, challengeResults].forEach(obj => {
        Object.keys(obj).forEach(k => delete (obj as Record<string, unknown>)[k])
    })
    Object.keys(fillAnswers).forEach(k => delete (fillAnswers as Record<string, unknown>)[k])
    Object.keys(fillResults).forEach(k => delete (fillResults as Record<string, unknown>)[k])
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
    const key = `${currentModule.value}-${currentLesson.value}`
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

function answerQuiz(si: number, oi: number, step: any) {
    if (quizAnswered[si]) return
    quizSelected[si] = oi
    quizAnswered[si] = true
    if (oi === step.correct) totalXP.value += step.xp ?? 0
}

function runChallenge(si: number, step: any) {
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
}

function checkFill(si: number, step: any) {
   let allCorrect = true
   step.parts.forEach((part: any, pi: number) => {
    if (part.type === 'blank') {
        const ans = (fillAnswers[`${si}-${pi}`] ?? '').trim()
        if (ans !== part.correct) allCorrect = false
    }
   })
   fillResults[si] = allCorrect
   if (allCorrect) totalXP.value += step.xp ?? 0
}

function highlight(code: string): string {
  if (!code) return ''
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(#.*)$/gm,  '<span class="cm">$1</span>')
    .replace(/\b(def|class|if|elif|else|for|while|return|import|from|in|not|and|or|is|True|False|None|with|as|try|except|finally|pass|break|continue|lambda|super|self)\b/g, '<span class="kw">$1</span>')
    .replace(/\b([A-Z][a-zA-Z0-9_]*)\s*(?=\(|:)/g, '<span class="cl">$1</span>')
    .replace(/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g,  '<span class="fn">$1</span>')
    .replace(/"([^"]*)"/g, '<span class="st">"$1"</span>')
    .replace(/'([^']*)'/g, "<span class='st'>'$1'</span>")
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="nm">$1</span>')
}

async function copyCode(src: string) {
  try {
    await navigator.clipboard.writeText(src)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch {}
}
</script>

<template>
  <main class="lecon-page">
    <canvas ref="starCanvas" class="star-canvas"></canvas>

    <aside class="lecon-sidebar" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="sidebar-top">
        <div class="lang-pill">
          <span class="lang-emoji">🐍</span>
          <span class="lang-name">Python</span>
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
                'lesson-done':   completedLessons.has(`${mi}-${li}`),
                'lesson-locked': isLessonLocked(mi, li)
              }"
              @click="goLesson(mi, li)"
            >
              <span class="lesson-dot"></span>
              <span>{{ lesson.title }}</span>
              <span>{{ lessonTypeIcon(lesson.type) }}</span>
            </button>
          </div>
        </div>
      </nav>
    </aside>

    <div class="lecon-main">

      <div class="topbar">
        <button class="menu-btn" @click="sidebarOpen = true">☰</button>
        <div class="breadcrumb">
          <span>{{ curriculum[currentModule]?.title }}</span>
          <span class="bc-sep">›</span>
          <span class="bc-lesson">{{ curriculum[currentModule]?.lessons[currentLesson]?.title }}</span>
        </div>
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

            <!-- THEORY -->
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
                <pre class="code-body" v-html="highlight(step.code.src)"></pre>
              </div>
              <button class="btn-next" @click="nextStep(si)">Suivant →</button>
            </div>

            <!-- QUIZ -->
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

            <!-- FILL-BLANK -->
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