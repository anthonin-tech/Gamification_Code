<script setup lang="ts">

import type { FavoriteLanguage } from '@/types/profil'
defineProps<{
  languages: FavoriteLanguage[]
}>()
</script>

<template>
  <div class="fav-langs__chips">
    <span
      v-for="lang in languages"
      :key="lang.name"
      class="fav-langs__chip"
      :style="{ '--lang-color': lang.color }"
    >
      <span class="fav-langs__chip-dot" :style="{ background: lang.color }"></span>
      {{ lang.name }}
    </span>
  </div>
</template>

<style scoped src="@/assets/styles/components/Galaxie_Profil/FavoriteLanguages.css" />
