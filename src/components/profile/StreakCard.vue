<script setup lang="ts">

const props = defineProps<{
  streak: number
}>()
const DAYS = [1, 2, 3, 4, 5, 6, 7]
</script>

<template>
  <div class="streak-card">

    <div class="streak-card__label">
      <svg class="streak-card__icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
      Jours consécutifs
    </div>

    <div class="streak-card__body">

      
      <div class="streak-card__visual">
        <div class="streak-card__ring" aria-label="`${props.streak} jours de suite`">
          <span class="streak-card__num">{{ props.streak }}</span>
        </div>
        <span class="streak-card__unit">JOURS</span>
      </div>

      
      <div class="streak-card__dots" aria-hidden="true">
        <div
          v-for="day in DAYS"
          :key="day"
          class="streak-card__dot"
          :class="{
            'streak-card__dot--active': day <= DAYS.length,
            'streak-card__dot--today':  day === DAYS.length,
          }"
        />
      </div>

    </div>
  </div>
</template>

<style scoped src="@/assets/styles/components/Galaxie_Profil/StreakCard.css" />
