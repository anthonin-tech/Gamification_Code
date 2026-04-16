<script setup lang="ts">
interface Props {
  level: number
  energy: string
}
defineProps<Props>()
</script>

<template>
  <div class="hero-badge">
    <!-- Orbit icon -->
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

<style scoped>
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.9rem 1.7rem;
  border: 1px solid rgba(140, 69, 255, 0.7);
  border-radius: 1.2rem;
  background: linear-gradient(180deg, rgba(29, 8, 47, 0.85), rgba(7, 10, 31, 0.8));
  box-shadow:
    0 0 0 1px rgba(62, 194, 255, 0.15) inset,
    0 0 36px rgba(108, 55, 255, 0.28);
  backdrop-filter: blur(16px);
}

.badge-icon {
  color: #10d8ff;
  width: 2.4rem;
  height: 2.4rem;
  flex: 0 0 auto;
}
.badge-icon svg { width: 100%; height: 100%; }

.badge-metric {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
}

.badge-label {
  font-size: 0.88rem;
  color: #c3a3ec;
}
.badge-label--cyan { color: #58ddff; }

.badge-value {
  font-size: clamp(1.6rem, 2.2vw, 2.3rem);
  font-weight: 700;
  color: #fff;
  line-height: 1;
}
.badge-value--gold {
  background: linear-gradient(180deg, #ffcb42, #ff9f11);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.badge-sep {
  width: 1px;
  align-self: stretch;
  background: linear-gradient(180deg, transparent, rgba(170, 100, 255, 0.85) 50%, transparent);
}

@media (max-width: 780px) {
  .hero-badge {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
