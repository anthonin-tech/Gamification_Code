<script setup lang="ts">
import { MISSIONS } from '@/data/missions'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const route = useRoute()
const id = Number(route.params.id)
const mission = MISSIONS.find(m => m.missionId === id)

const userStore = useUserStore()

const termineMissionBtn = ref<HTMLElement | null>(null)
const btnRect = ref<DOMRect | null>(null)
const xpBar = document.querySelector('.navbar-xpbar')
const flyingXp = ref(false)
const flyStyle = ref({})

async function terminerMission() {
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

  await new Promise(resolve => setTimeout(resolve, 200))
  flyingXp.value = false
}
</script>

<template>
  <div v-if="mission" class="mission-detail">

    <div class="mission-banner" :class="mission.difficulte">
      <img :src="mission.image" :alt="mission.missionTitre" class="mission-banner__img" />
      <div class="mission-banner__overlay">
        <h1 class="mission-banner__title">{{ mission.missionTitre }}</h1>
        <span class="mission-banner__diff" :class="mission.difficulte">{{ mission.difficulte }}</span>
        <p class="mission-banner__meta">{{ mission.langage }} · {{ mission.taches.length }} tâches · +{{ mission.xpRecompense }} XP</p>
      </div>
    </div>

    <div class="mission-content">
      <section class="mission-section">
        <h2 class="mission-section__title">Description</h2>
        <p class="mission-section__text">{{ mission.description }}</p>
      </section>

      <section class="mission-section">
        <h2 class="mission-section__title">Tâches</h2>
        <ul class="mission-tasks">
          <li v-for="tache in mission.taches" :key="tache.taskId" class="mission-task">
            <span class="mission-task__dot" />
            {{ tache.taskTitre }}
          </li>
        </ul>
      </section>

      <button @click="terminerMission()" ref="termineMissionBtn" class="btn-terminer">
        Terminer la mission · +{{ mission.xpRecompense }} XP
      </button>
    </div>

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
  max-width: 860px;
  margin: 0 auto;
  padding: 0 0 60px;
}

/* ── Bannière ────────────────────────────────────────── */
.mission-banner {
  position: relative;
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  margin: 24px 24px 32px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
}

.mission-banner__img {
  width: 100%;
  height: 120%;
  object-fit: cover;
  display: block;
  transform: translateY(-10%);
  transition: transform 0.4s ease;
}

.mission-banner:hover .mission-banner__img {
  transform: translateY(-5%);
}

.mission-banner__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.92) 0%,
    rgba(0,0,0,0.5) 45%,
    rgba(0,0,0,0.15) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 32px;
  gap: 8px;
}

.mission-banner__diff {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  width: fit-content;
}

.mission-banner__diff.FACILE   { background: rgba(52,211,153,0.2); color: #34d399; border: 1px solid rgba(52,211,153,0.4); }
.mission-banner__diff.MOYEN    { background: rgba(251,191,36,0.2);  color: #fbbf24; border: 1px solid rgba(251,191,36,0.4); }
.mission-banner__diff.DIFFICILE { background: rgba(239,68,68,0.2);  color: #ef4444; border: 1px solid rgba(239,68,68,0.4); }

.mission-banner__title {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.3px;
}

.mission-banner__meta {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  text-transform: capitalize;
}

/* ── Contenu ─────────────────────────────────────────── */
.mission-content {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.mission-section__title {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.45);
  font-family: var(--font-pixel);
}

.mission-section__text {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
  line-height: 1.8;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-left: 3px solid rgba(124, 58, 237, 0.6);
  background: rgba(255, 255, 255, 0.03);
}

/* ── Tâches ──────────────────────────────────────────── */
.mission-tasks {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mission-task {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.82);
  font-size: 13.5px;
}

.mission-task__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.8);
  box-shadow: 0 0 8px rgba(124, 58, 237, 0.6);
  flex-shrink: 0;
}

/* ── Bouton terminer ─────────────────────────────────── */
.btn-terminer {
  align-self: flex-start;
  padding: 14px 28px;
  border-radius: 14px;
  border: 1px solid rgba(124, 58, 237, 0.5);
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(59, 130, 246, 0.15));
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
}

.btn-terminer:hover {
  border-color: rgba(124, 58, 237, 0.8);
  box-shadow: 0 0 24px rgba(124, 58, 237, 0.35);
  transform: translateY(-2px);
}

/* ── Not found ───────────────────────────────────────── */
.mission-not-found {
  text-align: center;
  padding: 80px 16px;
  color: rgba(255, 255, 255, 0.4);
}
</style>

<style>
/* Non scoped — l'élément est téléporté dans <body> */
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
