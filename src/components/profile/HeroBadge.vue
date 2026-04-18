<script setup lang="ts">
interface Props {
  level: number
  energy: string
}
defineProps<Props>()
</script>

<template>
  <div class="hero-badge">
    <div class="badge-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17Z"/>
        <path d="M9.2 7.4c1.2 0 2.3 1.8 2.8 4.6c.5 2.8.2 5.1-1 5.3c-1.2.2-2.8-1.8-3.3-4.6c-.5-2.8.2-5.1 1.5-5.3Z"/>
        <path d="M15 7.2c1.1.6 1.2 3.1.1 5.6c-1.1 2.5-3 4-4.1 3.4c-1.1-.6-1.2-3.1-.1-5.6c1.1-2.5 3-4 4.1-3.4Z"/>
        <path d="M16.8 12.3c0 1.3-2.2 2.4-4.9 2.4S7 13.6 7 12.3s2.2-2.4 4.9-2.4s4.9 1.1 4.9 2.4Z"/>
        <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>
      </svg>
    </div>

    <div class="badge-metric">
      <span class="badge-label">Quantum Level</span>
      <strong class="badge-value">∞ {{ level }}</strong>
    </div>

    <div class="badge-sep" aria-hidden="true" />

    <div class="badge-metric">
      <span class="badge-label badge-label--cyan">Dimensional Energy</span>
      <strong class="badge-value badge-value--gold">{{ energy }}</strong>
    </div>
  </div>
</template>

<style src="@/assets/styles/components/Galaxie_Profil/HeroBadge.css"></style>