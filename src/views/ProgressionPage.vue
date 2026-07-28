<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { MISSIONS } from '@/data/missions';
import { computed } from 'vue'
import { curriculums } from '@/composables/useMissionLock';

const userStore = useUserStore()
const langages = ['javascript', 'typescript', 'python', 'java', 'php', 'go', 'cpp', 'rust', 'csharp']

const ProgressionParLangue = computed(() => {
  return langages.map(langage => {
    const CoursTotal = curriculums[langage]?.flatMap((l: any) => l.lessons).length ?? 0
    const raw = localStorage.getItem(`codequest_${langage}_progress`)
    const data = raw ? JSON.parse(raw) : null
    const CoursCompleted = data?.completedLessons?.length ?? 0
    const MissionFinish = MISSIONS.filter(m => m.langage === langage && userStore.completeMissions.includes(m.missionId)).length
    const MissionTotal = MISSIONS.filter(m => m.langage === langage).length
    const totalItems = CoursTotal + MissionTotal
    const globalPct = totalItems > 0
      ? Math.round(((CoursCompleted + MissionFinish) / totalItems) * 100)
      : 0
    return {
      langage,
      CoursTotal,
      CoursCompleted,
      MissionFinish,
      MissionTotal,
      globalPct
    }
  })
})
</script>

<template>
  <div class="progression-page">
    <h1 class="page-title">JOURNAL DE BORD</h1>
    <p class="page-subtitle">Ta progression sur chaque planète — leçons et missions.</p>
    <div class="prog-grid">
      <div
        v-for="progression in ProgressionParLangue"
        :key="progression.langage"
        class="prog-card"
        :class="'card-' + progression.langage"
      >
        <div class="prog-card__header">
          <span class="prog-card__planet" :class="'planet--' + progression.langage"></span>
          <h2 class="prog-card__name">{{ progression.langage }}</h2>
          <span class="prog-card__pct" :class="progression.globalPct > 0 ? 'pct--active' : ''">{{ progression.globalPct }}%</span>
        </div>

        <div class="prog-track">
          <div class="prog-track__header">
            <span class="section-label">LEÇONS</span>
            <span class="prog-track__count">{{ progression.CoursCompleted }} / {{ progression.CoursTotal }}</span>
          </div>
          <div class="barre-conteneur">
            <div class="barre-remplissage" :style="{ width: progression.CoursTotal > 0 ? (progression.CoursCompleted / progression.CoursTotal) * 100 + '%' : '0%' }"></div>
          </div>
        </div>

        <div class="prog-track">
          <div class="prog-track__header">
            <span class="section-label">MISSIONS</span>
            <span class="prog-track__count">{{ progression.MissionFinish }} / {{ progression.MissionTotal }}</span>
          </div>
          <div class="barre-conteneur barre-missions">
            <div class="barre-remplissage" :style="{ width: progression.MissionTotal > 0 ? (progression.MissionFinish / progression.MissionTotal) * 100 + '%' : '0%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/styles/pages/progression.css"></style>

