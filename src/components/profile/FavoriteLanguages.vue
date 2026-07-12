<script setup lang="ts">

import type { FavoriteLanguage } from '@/types/profil'
defineProps<{
  languages: FavoriteLanguage[]
}>()
</script>

<template>
  <div class="fav-langs">

    <div class="fav-langs__label">
      <svg class="fav-langs__icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      Langages préférés
    </div>

    
    <div class="fav-langs__grid">
      <div
        v-for="lang in languages"
        :key="lang.name"
        class="fav-langs__orb"
        :style="{
          '--lang-color': lang.color,
          '--lang-glow':  lang.glow,
        }"
      >
        
        <div class="fav-langs__orb-ring" aria-hidden="true" />

        <img class="fav-langs__orb-icon" :src="lang.icon" :alt="lang.name" />
        <span class="fav-langs__orb-name">{{ lang.name }}</span>
      </div>
    </div>

  </div>
</template>

<style scoped src="@/assets/styles/components/Galaxie_Profil/FavoriteLanguages.css" />
