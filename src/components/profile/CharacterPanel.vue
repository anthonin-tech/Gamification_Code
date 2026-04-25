<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string
  level:     number
}>()
</script>

<template>
  <aside class="char-panel">

    
    <span class="char-panel__corner char-panel__corner--tl" aria-hidden="true" />
    <span class="char-panel__corner char-panel__corner--tr" aria-hidden="true" />
    <span class="char-panel__corner char-panel__corner--bl" aria-hidden="true" />
    <span class="char-panel__corner char-panel__corner--br" aria-hidden="true" />

    
    <div class="char-panel__scanline" aria-hidden="true" />

    
    <div class="char-panel__frame">

      
      <img
        v-if="props.avatarUrl"
        :src="props.avatarUrl"
        alt="Personnage"
        class="char-panel__img"
      />

      
      <div v-else class="char-panel__placeholder">
        <svg class="char-panel__silhouette" viewBox="0 0 80 100" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <circle cx="40" cy="28" r="18" />
          <path d="M10 90 Q10 62 40 57 Q70 62 70 90" />
          <circle cx="62" cy="18" r="2"   fill="currentColor" opacity=".4" stroke="none" />
          <circle cx="18" cy="36" r="1.5" fill="currentColor" opacity=".3" stroke="none" />
        </svg>
        <p class="char-panel__hint">Dépose ton personnage ici</p>
      </div>

      
      <div class="char-panel__glow" aria-hidden="true" />
    </div>

    
    <div class="char-panel__badge">
      <span class="char-panel__badge-star" aria-hidden="true">✦</span>
      <span class="char-panel__badge-label">LVL {{ props.level }}</span>
      <span class="char-panel__badge-star" aria-hidden="true">✦</span>
    </div>

  </aside>
</template>

<style scoped src="@/assets/styles/components/Galaxie_Profil/CharacterPanel.css" />
