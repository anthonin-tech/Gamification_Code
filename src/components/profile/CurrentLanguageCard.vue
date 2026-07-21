<script setup lang="ts">
import type { CurrentLanguage } from '@/types/profil'

defineProps<{
  language: CurrentLanguage
}>()
</script>

<template>
  <div class="cur-lang" :style="{ '--cur-color': language.color }">
    <div class="cur-lang__pulse" aria-label="En cours" />

    <p class="cur-lang__section-label">EN ORBITE ACTUELLEMENT</p>

    <div class="cur-lang__body">
      <span class="cur-lang__planet" :style="{ '--lang-color': language.color }">
        <img :src="language.icon" :alt="language.name" class="cur-lang__planet-img" />
      </span>
      <div class="cur-lang__details">
        <p class="cur-lang__name">{{ language.name }}</p>
        <p v-if="language.mission" class="cur-lang__mission">Prochaine leçon : {{ language.mission }}</p>
      </div>
    </div>

    <div class="cur-lang__bar-row">
      <div class="cur-lang__bar" role="progressbar"
        :aria-valuenow="language.progress"
        aria-valuemin="0"
        aria-valuemax="100">
        <div class="cur-lang__bar-fill" :style="{ width: language.progress + '%' }" />
      </div>
      <span class="cur-lang__pct">{{ language.progress }}%</span>
    </div>

    <RouterLink :to="`/cours/${language.name}`" class="cur-lang__reprendre">REPRENDRE →</RouterLink>
  </div>
</template>

<style scoped src="@/assets/styles/components/Galaxie_Profil/CurrentLanguageCard.css" />
