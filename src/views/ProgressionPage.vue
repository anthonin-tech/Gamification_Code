<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { MISSIONS } from '@/data/missions';
import { CURRICULUM_PYTHON } from '@/data/curriculum';
import { computed } from 'vue'

const userStore = useUserStore()
const langages = [... new Set(MISSIONS.map(m => m.langage))]

const ProgressionParLangue = computed(() => {
  return langages.map(langage =>({
    langage,
    total: MISSIONS.filter(m => m.langage === langage).length,
    terminees: MISSIONS.filter(m => m.langage === langage && userStore.completeMissions.includes(m.missionId)).length
  }))
})

const cours = localStorage.getItem('codequest_python_progress')
const pythonData = cours ? JSON.parse(cours) : null
const completedLessons = pythonData?.completedLessons ?? []
const totalLeconsPython = CURRICULUM_PYTHON.reduce((acc, module) => acc + module.lessons.length, 0)
const termineesLeconsPython = completedLessons.length
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
      <p>{{ progression.terminees }} / {{ progression.total }}</p>
      <div class="barre-conteneur">
        <div class="barre-remplissage" :style="{ width: (progression.terminees / progression.total) * 100 + '%' }"></div>
      </div>

      <div v-if="progression.langage === 'python'" class="cours-section">
        <p class="section-label">Cours — leçons</p>
        <p>{{ termineesLeconsPython }} / {{ totalLeconsPython }}</p>
        <div class="barre-conteneur">
          <div class="barre-remplissage" :style="{ width: (termineesLeconsPython / totalLeconsPython) * 100 + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/styles/pages/progression.css"></style>

