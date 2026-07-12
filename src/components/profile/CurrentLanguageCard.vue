<script setup lang="ts">

import type { CurrentLanguage } from '@/types/profil'

defineProps<{
  language: CurrentLanguage
}>()
</script>

<template>
  <div
    class="cur-lang"
    :style="{ '--cur-color': language.color }"
  >
    
    <div class="cur-lang__pulse" aria-label="En cours" />

    
    <div class="cur-lang__label">
      <svg class="cur-lang__icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      En cours d'apprentissage
    </div>

    
    <div class="cur-lang__body">

      
      <div
        class="cur-lang__badge"
        :style="{ '--lang-color': language.color }"
        :aria-label="language.name"
      >
        <img :src="language.icon" :alt="language.name" style="width:26px;height:26px;object-fit:contain;" />
      </div>

      
      <div class="cur-lang__details">
        <p class="cur-lang__name">{{ language.name }}</p>
        <p v-if="language.mission" class="cur-lang__mission">{{ language.mission }}</p>
      </div>

    </div>

    <div class="cur-lang__bar-row">
      <div class="cur-lang__bar" role="progressbar"
        :aria-valuenow="language.progress"
        aria-valuemin="0"
        aria-valuemax="100">
        <div
          class="cur-lang__bar-fill"
          :style="{ width: language.progress + '%' }"
        />
      </div>
      <span class="cur-lang__pct">{{ language.progress }}%</span>
    </div>
  </div>
</template>

<style scoped src="@/assets/styles/components/Galaxie_Profil/CurrentLanguageCard.css" />
