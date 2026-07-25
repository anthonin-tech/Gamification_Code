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

async function terminerMission() {
  const xpBar = document.querySelector('.navbar-xpbar')
  if (!xpBar || !termineMissionBtn.value || !mission) return

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

  await checkAndUnlock(100 + mission.missionId, mission.missionId)
  await checkAndUnlock(5, userStore.completeMissions.length)
  await checkAndUnlock(6, userStore.completeMissions.length)

  await new Promise(resolve => setTimeout(resolve, 200))
  flyingXp.value = false

  localStorage.removeItem(`codequest_mission_${mission?.missionId}_time`)
  pause.value = true
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
                  <CodeEditor :langage="mission.langage" @submit="ManageSubmission" />
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
          :disabled="missionTermine || TableTask.length < mission.taches.length"
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

<style scoped>
.mission-detail {
  max-width: 1100px;
  margin: 0 auto;
  padding-bottom: 60px;
}

.md-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  margin-bottom: 16px;
}

.md-back {
  padding: 8px 16px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.7), rgba(59, 130, 246, 0.5));
  border: 1px solid rgba(124, 58, 237, 0.5);
  color: #fff;
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  transition: box-shadow 0.2s;
}

.md-back:hover {
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.4);
}

.md-signal {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 6px;
}

.md-timer {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
}

.md-timer__display {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.82);
  letter-spacing: 2px;
}

.md-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 24px 16px;
  padding: 18px 22px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  flex-wrap: wrap;
}

.md-banner__planet {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-orbitron);
  font-size: 13px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.7);
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), inset 0 -4px 10px rgba(0, 0, 0, 0.25);
}

.md-banner__info {
  flex: 1;
  min-width: 0;
}

.md-banner__title {
  margin: 0 0 5px;
  font-family: var(--font-orbitron);
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.5px;
}

.md-banner__meta {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.5;
}

.md-diff {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  flex-shrink: 0;
}

.md-diff.facile    { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.35); }
.md-diff.moyen     { background: rgba(251, 191, 36, 0.15);  color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.35); }
.md-diff.difficile { background: rgba(239, 68, 68, 0.15);   color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.35); }

.md-xp {
  font-family: var(--font-orbitron);
  font-size: 15px;
  font-weight: 800;
  color: #fbbf24;
  text-shadow: 0 0 12px rgba(251, 191, 36, 0.5);
  flex-shrink: 0;
}

.md-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  padding: 0 24px 40px;
  align-items: stretch;
}

.md-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: start;
}

.md-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  padding: 16px;
}

.md-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.md-section__label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(124, 58, 237, 0.9);
}

.md-section__label--gold {
  color: rgba(251, 191, 36, 0.85);
}

.md-section__count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
}

.md-prog-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 14px;
}

.md-prog-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(124, 58, 237, 0.9), rgba(59, 130, 246, 0.8));
  border-radius: 999px;
  transition: width 0.35s ease;
}

.md-tasks {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.md-task {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  color: rgba(255, 255, 255, 0.78);
  font-size: 12.5px;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.md-task:has(input:checked) {
  background: rgba(124, 58, 237, 0.07);
  border-color: rgba(124, 58, 237, 0.25);
  color: rgba(255, 255, 255, 0.38);
  text-decoration: line-through;
}

.md-task input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.2s, background 0.2s;
}

.md-task input[type="checkbox"]:checked {
  border-color: rgba(124, 58, 237, 0.8);
  background: rgba(124, 58, 237, 0.25);
}

.md-task input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 1px;
  width: 5px;
  height: 8px;
  border: 2px solid rgba(167, 139, 250, 1);
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}

.md-indices {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.md-indice {
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
  transition: border-color 0.2s;
}

.md-indice--unlocked {
  border-color: rgba(124, 58, 237, 0.35);
  background: rgba(124, 58, 237, 0.04);
}

.md-indice__num {
  display: block;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(167, 139, 250, 0.8);
  padding: 10px 12px 4px;
}

.md-indice__text {
  margin: 0;
  padding: 0 12px 12px;
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
}

.md-indice__btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.52);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s, background 0.2s;
}

.md-indice__btn:hover {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.82);
}

.md-indice__cost {
  font-family: var(--font-mono);
  font-size: 10px;
  color: rgba(251, 191, 36, 0.7);
  letter-spacing: 0.5px;
}

.md-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.editor-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.editor-verifying {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: rgba(2, 0, 20, 0.82);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.verifying-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.verifying-video {
  width: 200px;
  border-radius: 12px;
  filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.5));
}

.verifying-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(167, 139, 250, 0.9);
  animation: pulse-text 1.5s ease-in-out infinite;
}

@keyframes pulse-text {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}

.md-btn-valider {
  width: 100%;
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.3);
  font-family: var(--font-orbitron);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: not-allowed;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s;
}

.md-btn-valider:not(:disabled) {
  background: linear-gradient(90deg, #a78bfa, #60a5fa);
  color: #0b1020;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(124, 58, 237, 0.4);
}

.md-btn-valider:not(:disabled):hover {
  box-shadow: 0 10px 32px rgba(124, 58, 237, 0.6);
  transform: translateY(-2px);
}

.md-btn-valider--done {
  background: linear-gradient(90deg, #34d399, #10b981) !important;
  color: #0b1020 !important;
  box-shadow: 0 6px 24px rgba(52, 211, 153, 0.35) !important;
  cursor: default !important;
  transform: none !important;
}

.mission-locked {
  max-width: 500px;
  margin: 80px auto;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 20px;
  background: rgba(0, 10, 30, 0.6);
  backdrop-filter: blur(8px);
}

.locked-icon {
  color: #00d4ff;
  filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.9))
          drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
  animation: holo-pulse 2s ease-in-out infinite;
}

.holo-lock { width: 64px; height: 76px; }

@keyframes holo-pulse {
  0%, 100% { opacity: 0.75; }
  50%       { opacity: 1; }
}

.locked-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.35);
}

.locked-msg {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
}

.locked-lesson {
  color: #ffd700;
  font-weight: 700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
}

.locked-btn {
  margin-top: 4px;
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.4);
  background: rgba(0, 212, 255, 0.08);
  color: #00d4ff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.locked-btn:hover {
  border-color: rgba(0, 212, 255, 0.7);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.25);
}

.mission-not-found {
  text-align: center;
  padding: 80px 16px;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 860px) {
  .md-grid { grid-template-columns: 1fr; }
  .md-banner { margin: 0 12px 16px; }
  .md-topbar { padding: 12px 16px; }
  .md-grid { padding: 0 12px 40px; }
}
</style>

<style>
.xp-fly {
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  font-size: 18px;
  font-weight: 900;
  color: #fbbf24;
  text-shadow: 0 0 16px rgba(251, 191, 36, 0.9);
  animation: xp-fly 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

@keyframes xp-fly {
  0%   { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
  20%  { transform: translate(-50%, calc(-50% - 20px)) scale(1); opacity: 1; }
  100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.5); opacity: 0; }
}
</style>
