<script setup lang="ts">
import type { OrbitingSkill } from '@/types/profil'

interface Props {
  skill: OrbitingSkill
  index: number
}

const props = defineProps<Props>()

// Trick : negative animation-delay = start mid-cycle at the right angle
// delay = -(angle/360) * duration  →  planet starts at its initial angle
const getWrapperStyle = () => {
  const duration = 15 + props.index * 2
  const angleDelay = -(props.skill.angle / 360) * duration
  return {
    '--distance': `${props.skill.distance}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${angleDelay}s`,
  }
}

const getPlanetStyle = () => ({
  width:  `${props.skill.size}px`,
  height: `${props.skill.size}px`,
  backgroundColor: props.skill.color,
  boxShadow: `0 0 25px ${props.skill.color}99, 0 0 60px ${props.skill.color}44, inset 0 0 15px rgba(255,255,255,0.15)`,
})

const getTrailStyle = () => ({
  width:  `${props.skill.distance * 2}px`,
  height: `${props.skill.distance * 2}px`,
  borderColor: `${props.skill.color}40`,
})
</script>

<template>
  <!-- Static orbit trail ring (centered at parent origin) -->
  <div
    class="orbit-trail absolute border border-dashed rounded-full pointer-events-none"
    :style="getTrailStyle()"
  />

  <!-- Orbiting wrapper — rotates around origin, then translates outward -->
  <div class="orbit-wrapper absolute group cursor-pointer" :style="getWrapperStyle()">
    <!-- Planet sphere -->
    <div
      class="planet relative rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-125"
      :style="getPlanetStyle()"
    >
      <!-- Surface shine -->
      <div class="planet-shine absolute inset-0 rounded-full" />

      <!-- Tooltip (counter-rotates so it stays readable) -->
      <div class="tooltip absolute whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div class="text-white font-bold text-sm">{{ skill.name }}</div>
        <div class="text-cyan-300 text-xs">Mastery: {{ skill.level }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Orbit: rotate the wrapper around origin (0,0), translate out, counter-rotate planet */
@keyframes orbit {
  from { transform: rotate(0deg)   translateX(var(--distance)) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(var(--distance)) rotate(-360deg); }
}

.orbit-wrapper {
  left: 0;
  top: 0;
  transform-origin: 0 0;
  animation: orbit linear infinite;
}

/* Trail ring: centered via negative margin */
.orbit-trail {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.planet-shine {
  background: radial-gradient(circle at 30% 25%, rgba(255,255,255,0.3) 0%, transparent 55%, rgba(0,0,0,0.25) 100%);
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(168,85,247,0.4);
  z-index: 100;
}
</style>
