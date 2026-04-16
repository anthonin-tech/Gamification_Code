<script setup lang="ts">
interface Props { avatarUrl: string }
defineProps<Props>()

const getRingStyle = (index: number) => ({
  width:  `${320 + index * 80}px`,
  height: `${320 + index * 80}px`,
  animationDuration: `${20 + index * 10}s`,
  animationDirection: (index % 2 === 0 ? 'normal' : 'reverse') as 'normal' | 'reverse',
})
</script>

<template>
  <div class="avatar-root">
    <!-- Event horizon rings (5 spinning rings with a cyan dot each) -->
    <div class="rings-container">
      <div
        v-for="(_, i) in 5"
        :key="`ring-${i}`"
        class="event-ring animate-spin"
        :style="getRingStyle(i)"
      >
        <div class="ring-dot" />
      </div>
    </div>

    <!-- Profile image -->
    <div class="avatar-core">
      <div class="conic-bg" />
      <div class="avatar-inner">
        <img :src="avatarUrl" alt="Profile" class="avatar-img" />
      </div>
      <div class="singularity-overlay" />
    </div>

    <!-- Gravitational lensing -->
    <div class="lens-glow animate-pulse" />
    <div class="lens-outer" />
  </div>
</template>

<style scoped>
.avatar-root {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Rings container: centered on avatar */
.rings-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.event-ring {
  position: absolute;
  border: 2px solid rgba(168, 85, 247, 0.2);
  border-radius: 50%;
}

.ring-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #22d3ee;
  border-radius: 50%;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(34,211,238,0.9), 0 0 40px rgba(34,211,238,0.4);
}

/* Core avatar */
.avatar-core {
  position: relative;
  z-index: 5;
  width: 256px;
  height: 256px;
  border-radius: 50%;
  overflow: hidden;
  border: 8px solid rgba(168,85,247,0.5);
}

.conic-bg {
  position: absolute;
  inset: 0;
  background: conic-gradient(from 0deg, #9333ea 0%, #ec4899 25%, #3b82f6 50%, #22d3ee 75%, #9333ea 100%);
  animation: conic-spin 30s linear infinite;
}

@keyframes conic-spin { to { transform: rotate(360deg); } }

.avatar-inner {
  position: absolute;
  inset: 28px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(0,0,0,0.6);
  z-index: 2;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.singularity-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 35%, rgba(147,51,234,0.45) 100%);
  z-index: 3;
}

/* Lensing glow */
.lens-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 4px solid rgba(34,211,238,0.3);
  filter: blur(4px);
  z-index: 6;
  pointer-events: none;
}

.lens-outer {
  position: absolute;
  inset: -16px;
  border-radius: 50%;
  border: 2px solid rgba(168,85,247,0.15);
  filter: blur(8px);
  z-index: 4;
  pointer-events: none;
}

@keyframes animate-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.animate-pulse { animation: animate-pulse 2s ease-in-out infinite; }
</style>
