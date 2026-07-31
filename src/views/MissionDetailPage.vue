<script setup lang="ts">
import { MISSIONS } from '@/data/missions'
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { MissionIsLock, getLessonName } from '@/composables/useMissionLock'
import { Verification } from '@/composables/Verification'
import { useBadge } from '@/composables/useBadge.ts'
import CodeEditor from '@/components/Terminal/CodeEditor.vue'

const route = useRoute()
const id = Number(route.params.id)
const mission = MISSIONS.find(m => m.missionId === id)

const userStore = useUserStore()

const termineMissionBtn = ref<HTMLElement | null>(null)
const btnRect = ref<DOMRect | null>(null)
const flyingXp = ref(false)
const flyStyle = ref({})
const isSubmitting = ref(false)

async function terminerMission() {
  const xpBar = document.querySelector('.navbar-xpbar')
  if (!xpBar || !termineMissionBtn.value || !mission || isSubmitting.value) return

  isSubmitting.value = true
  const xpBarRect = xpBar.getBoundingClientRect()
  btnRect.value = termineMissionBtn.value.getBoundingClientRect()
  if (!btnRect.value) return

  const startX = btnRect.value.left + btnRect.value.width / 2
  const startY = btnRect.value.top + btnRect.value.height / 2
  const endX = xpBarRect.left + xpBarRect.width / 2
  const endY = xpBarRect.top + xpBarRect.height / 2

  flyStyle.value = {
    left: startX + 'px',
    top: startY + 'px',
    '--dx': (endX - startX) + 'px',
    '--dy': (endY - startY) + 'px',
  }

  flyingXp.value = true

  await new Promise(resolve => setTimeout(resolve, 900))
  userStore.updateXp(mission.xpRecompense)
  userStore.updateMisssion(mission.missionId)

  const { checkAndUnlock } = useBadge()

  const LANG_BADGE: Record<number, number> = {
    10: 101, 20: 102, 30: 103, 40: 104, 50: 105,
    60: 106, 70: 107, 80: 108, 90: 109,
  }
  const langBadgeId = LANG_BADGE[mission.missionId]
  if (langBadgeId) await checkAndUnlock(langBadgeId, mission.missionId)
  await checkAndUnlock(5, userStore.completeMissions.length)
  await checkAndUnlock(6, userStore.completeMissions.length)

  await new Promise(resolve => setTimeout(resolve, 200))
  flyingXp.value = false

  localStorage.removeItem(`codequest_mission_${mission?.missionId}_time`)
  pause.value = true

  isSubmitting.value = false
}

const missionTermine = computed(() =>
  userStore.completeMissions.includes(mission?.missionId ?? - 1)
)
const IsDelock = computed (() =>
  MissionIsLock(mission ?? { minLecons: 999, langage: ''} as any)
)

const TableTask = ref<number[]>([])
const ProgressTask = computed(() => {
  const MissionTotal = mission ? mission.taches.length : null
  if(MissionTotal) {
    return (TableTask.value.length / MissionTotal) * 100
  }
  else {
    return 0
  }
})

const IndiceLock = ref<number[]>([])
function DeLockIndice(indiceXP: number, indiceNiv: number) {
  userStore.updateXp(-indiceXP)
  IndiceLock.value.push(indiceNiv)
  localStorage.setItem(`codequest_mission_${mission?.missionId}_indices`, JSON.stringify(IndiceLock.value))
}

const isVerifying = ref<boolean>(false)

async function ManageSubmission (code: string) {
  if (!mission) return
  isVerifying.value = true
  const results = await Verification(mission, code, mission.langage)
  isVerifying.value = false
  TableTask.value = results.filter(resultat => resultat.valide).map(resultat => resultat.taskId)
}

const indiceSuccess = ref(false)

async function ManageIndiceChallenge(code: string) {
  if (!mission) return
  const results = await Verification(mission, code, mission.langage)
  const anyPassed = results.some(r => r.valide)
  if (anyPassed) {
    DeLockIndice(0, 3)
    indiceSuccess.value = true
  }
}

const SecondElapsed = ref<number>(0)
const pause = ref <boolean>(false)
let TimerIntervale: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  IndiceLock.value = JSON.parse(localStorage.getItem(`codequest_mission_${mission?.missionId}_indices`) ?? '[]')
  SecondElapsed.value = SecondElapsed.value = Number(localStorage.getItem(`codequest_mission_${mission?.missionId}_time`) ?? 0)
  TimerIntervale = setInterval(() => {
      if (!pause.value) {
        SecondElapsed.value ++
      }
  }, 1000)
})

onUnmounted(() => {
  localStorage.setItem(`codequest_mission_${mission?.missionId}_time`, String(SecondElapsed.value))
  if (TimerIntervale) {
    clearInterval(TimerIntervale)
  }
})

const TempsFormate = computed(() => {
  if (SecondElapsed.value <= 3600) {
    const minutes = Math.floor((SecondElapsed.value % 3600) / 60)
    const secondes = SecondElapsed.value % 60
    return `${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`
  }
  else {
    const minutes = Math.floor((SecondElapsed.value % 3600) / 60)
    const secondes = SecondElapsed.value % 60
    const heures = Math.floor(SecondElapsed.value / 3600)
    return `${heures}:${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`
  }
})
</script>

<template>
  <div v-if="mission && IsDelock" class="mission-detail">

    <div class="md-topbar">
      <router-link to="/mission" class="md-back">← Missions</router-link>
      <span class="md-signal">
        <svg width="12" height="10" viewBox="0 0 14 10" fill="currentColor">
          <rect x="0" y="6" width="2" height="4" rx="0.5"/>
          <rect x="4" y="4" width="2" height="6" rx="0.5"/>
          <rect x="8" y="2" width="2" height="8" rx="0.5"/>
          <rect x="12" y="0" width="2" height="10" rx="0.5"/>
        </svg>
        {{ mission.langage.slice(0,2).toUpperCase() }}-{{ String(mission.missionId).padStart(2, '0') }}
      </span>
      <div v-if="!missionTermine" class="md-timer">
        <span>⏱</span>
        <span class="md-timer__display">{{ TempsFormate }}</span>
      </div>
    </div>

    <div class="md-banner">
      <span class="md-banner__planet" :class="`planet--${mission.langage}`">
        {{ mission.langage.slice(0,2).toUpperCase() }}
      </span>
      <div class="md-banner__info">
        <h1 class="md-banner__title">{{ mission.missionTitre }}</h1>
        <p class="md-banner__meta">
          SECTEUR {{ mission.langage.toUpperCase() }} · Briefing : {{ mission.description }}
        </p>
      </div>
      <span class="md-diff" :class="mission.difficulte.toLowerCase()">{{ mission.difficulte }}</span>
      <span class="md-xp">+{{ mission.xpRecompense }} XP</span>
    </div>

    <div class="md-grid">

      <div class="md-left">

        <section class="md-section">
          <div class="md-section__header">
            <span class="md-section__label">● OBJECTIFS</span>
            <span class="md-section__count">{{ TableTask.length }} / {{ mission.taches.length }}</span>
          </div>
          <div class="md-prog-bar">
            <div class="md-prog-bar__fill" :style="{ width: ProgressTask + '%' }"></div>
          </div>
          <ul class="md-tasks">
            <li v-for="tache in mission.taches" :key="tache.taskId" class="md-task">
              <input type="checkbox" :checked="TableTask.includes(tache.taskId)" disabled>
              {{ tache.taskTitre }}
            </li>
          </ul>
        </section>

        <section class="md-section">
          <div class="md-section__header">
            <span class="md-section__label md-section__label--gold">♦ INDICES</span>
          </div>
          <div class="md-indices">
            <div v-for="indice in mission.indices" :key="indice.niveau">
              <div
                v-if="indice.niveau === 1 || IndiceLock.includes(indice.niveau - 1)"
                class="md-indice"
                :class="{ 'md-indice--unlocked': IndiceLock.includes(indice.niveau) }"
              >
                <div v-if="IndiceLock.includes(indice.niveau) && indice.niveau != 3">
                  <span class="md-indice__num">Indice {{ indice.niveau }}</span>
                  <p class="md-indice__text">{{ indice.texte }}</p>
                </div>
                <div v-else-if="indice.niveau === 3">
                  <span class="md-indice__num">Indice {{ indice.niveau }}</span>
                  <p class="md-indice__text">{{ indice.texte }}</p>
                  <CodeEditor :langage="mission.langage" @submit="ManageIndiceChallenge" />
                </div>
                <button v-else class="md-indice__btn" @click="DeLockIndice(indice.xpCout, indice.niveau)">
                  <span>Indice {{ indice.niveau }}</span>
                  <span class="md-indice__cost">débloquer · -{{ indice.xpCout }} XP</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      <div class="md-right">
        <div class="editor-wrapper">
          <CodeEditor :langage="mission.langage" @submit="ManageSubmission" />
          <div v-if="isVerifying" class="editor-verifying">
            <div class="verifying-scene">
              <video
                class="verifying-video"
                src="/Loading Coder.mp4"
                autoplay loop muted playsinline
              />
              <span class="verifying-label">Vérification en cours…</span>
            </div>
          </div>
        </div>

        <button
          @click="terminerMission()"
          ref="termineMissionBtn"
          class="md-btn-valider"
          :class="{ 'md-btn-valider--done': missionTermine }"
          :disabled="missionTermine || TableTask.length < mission.taches.length || isSubmitting"
        >
          {{ missionTermine
            ? '✓ Mission terminée'
            : `COCHE LES ${mission.taches.length} OBJECTIFS POUR VALIDER` }}
        </button>
      </div>

    </div>
  </div>

  <div v-else-if="mission" class="mission-locked">
    <div class="locked-icon">
      <svg class="holo-lock" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 32 L20 20 Q20 8 32 8 Q44 8 44 20 L44 32" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="7" y="30" width="50" height="40" rx="7" stroke="currentColor" stroke-width="2" fill="rgba(0,212,255,0.04)"/>
        <circle cx="32" cy="47" r="5.5" stroke="currentColor" stroke-width="2"/>
        <path d="M29 52 L29 59 Q29 61 32 61 Q35 61 35 59 L35 52 Z" fill="currentColor" opacity="0.8"/>
      </svg>
    </div>
    <h2 class="locked-title">{{ mission.missionTitre }}</h2>
    <p class="locked-msg">
      Complète <span class="locked-lesson">"{{ getLessonName(mission) }}"</span> pour débloquer cette mission
    </p>
    <router-link :to="`/cours/${mission.langage}/learn`" class="locked-btn">
      Aller au cours {{ mission.langage }}
    </router-link>
  </div>

  <div v-else class="mission-not-found">
    <p>Mission introuvable.</p>
  </div>

  <Teleport to="body">
    <div v-if="flyingXp" class="xp-fly" :style="flyStyle">
      +{{ mission?.xpRecompense }} XP
    </div>
  </Teleport>
</template>

<style scoped src="./MissionDetailPage.css"></style>

<style src="./MissionDetailPage.global.css"></style>
