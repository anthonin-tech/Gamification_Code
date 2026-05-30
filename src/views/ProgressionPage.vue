<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { MISSIONS } from '@/data/missions';
import { computed } from 'vue'
import { curriculums } from '@/composables/useMissionLock';

const userStore = useUserStore()
const langages = [... new Set(MISSIONS.map(m => m.langage))]

const ProgressionParLangue = computed(() => {
  return langages.map(langage => {
    const CoursTotal = curriculums[langage]?.flatMap((l: any) => l.lessons).length ?? 0
    const raw = localStorage.getItem(`codequest_${langage}_progress`)
    const data = raw ? JSON.parse(raw) : null
    const CoursCompleted = data?.completedLessons?.length ?? 0 
    const MissionFinish = MISSIONS.filter(m => m.langage === langage && userStore.completeMissions.includes(m.missionId)).length
    const MissionTotal = MISSIONS.filter(m => m.langage === langage).length
    return {
      langage,
      CoursTotal,
      CoursCompleted,
      MissionFinish,
      MissionTotal
    }
  })
})
</script>

<template>
  <div class="progression-page">
    <div
      v-for = "progression in ProgressionParLangue"
      :key = "progression.langage"
      :class="'card-' + progression.langage"
    >
      <h2>{{ progression.langage }}</h2>
      <p class="section-label">Missions</p>
      <p>{{ progression.MissionFinish }} / {{ progression.MissionTotal }}</p>
      <div class="barre-conteneur">
        <div class="barre-remplissage" :style="{ width: (progression.MissionFinish / progression.MissionTotal) * 100 + '%' }"></div>
      </div>

      <div class="cours-section">
        <p class="section-label">Cours — leçons</p>
        <p>{{ progression.CoursCompleted }} / {{ progression.CoursTotal }}</p>
        <div class="barre-conteneur">
          <div class="barre-remplissage" :style="{ width: progression.CoursTotal > 0 ? (progression.CoursCompleted / progression.CoursTotal) * 100 + '%' : '0%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/styles/pages/progression.css"></style>

