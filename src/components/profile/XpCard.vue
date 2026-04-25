<script setup lang="ts">

import { computed } from 'vue'

const props = defineProps<{
  xp:      number
  xpToNext: number
  level:   number
}>()
const percent = computed(() =>
  Math.round((props.xp / props.xpToNext) * 100)
)
const formatXp = (n: number) => n.toLocaleString('fr-FR')
</script>

<template>
  <div class="xp-card">

    
    <div class="xp-card__label">
      
      <svg class="xp-card__icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      Expérience
    </div>

    
    <div class="xp-card__numbers">
      <span class="xp-card__current">{{ formatXp(props.xp) }} XP</span>
      <span class="xp-card__max">/ {{ formatXp(props.xpToNext) }}</span>
    </div>

    
    <div class="xp-card__track" role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100">
      <div class="xp-card__fill" :style="{ width: percent + '%' }">
        <div class="xp-card__fill-glow" />
      </div>
    </div>

    
    <p class="xp-card__pct">{{ percent }}% vers le niveau {{ props.level + 1 }}</p>

  </div>
</template>

<style scoped src="@/assets/styles/components/Galaxie_Profil/XpCard.css" />
