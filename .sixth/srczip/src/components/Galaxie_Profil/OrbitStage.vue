<script setup lang="ts">
import type { OrbitingSkill } from '@/types/profil'

interface Props {
  skills: OrbitingSkill[]
}

defineProps<Props>()

// Orbit rings config (trail circles)
const ORBIT_TRAILS = [
  { size: 260, color: 'rgba(139,92,246,0.22)' },
  { size: 360, color: 'rgba(99,102,241,0.16)' },
  { size: 460, color: 'rgba(168,85,247,0.12)' },
  { size: 560, color: 'rgba(139,92,246,0.08)' },
  { size: 620, color: 'rgba(99,102,241,0.06)' },
]

// Map distance to orbit ring durations (same logic as HTML)
const getDuration = (distance: number): number => {
  if (distance <= 130) return 14
  if (distance <= 180) return 20
  if (distance <= 240) return 27
  return 34
}

const getWrapperStyle = (skill: OrbitingSkill, index: number) => {
  const duration = getDuration(skill.distance)
  // Spread planets evenly within the same orbit
  const sameOrbit = [] as OrbitingSkill[]
  // Use angle property directly for the initial offset
  const delay = -(skill.angle / 360) * duration
  return {
    '--d': `${skill.distance}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  }
}

const getPlanetStyle = (skill: OrbitingSkill) => ({
  width: `${skill.size}px`,
  height: `${skill.size}px`,
  background: skill.color,
  boxShadow: `0 0 25px ${skill.color}99, 0 0 60px ${skill.color}44`,
})

const getTrailStyle = (size: number, color: string) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderColor: color,
})
</script>

<template>
  <div class="orbit-stage">
    <!-- Orbit trail rings -->
    <div
      v-for="trail in ORBIT_TRAILS"
      :key="trail.size"
      class="orbit-trail"
      :style="getTrailStyle(trail.size, trail.color)"
    />

    <!-- Orbiting planets -->
    <div
      v-for="(skill, i) in skills"
      :key="skill.name"
      class="orbit-wrap"
      :style="getWrapperStyle(skill, i)"
    >
      <div class="planet group" :style="getPlanetStyle(skill)">
        <div class="planet-shine" />
        <div class="planet-label">
          <strong>{{ skill.name }}</strong>
          <span class="planet-mastery">Mastery: {{ skill.level }}%</span>
        </div>
      </div>
    </div>

    <!-- Slot for the avatar in the center -->
    <slot />
  </div>
</template>

<style scoped>
.orbit-stage {
  position: relative;
  width: 640px;
  height: 640px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Orbit trail rings ── */
.orbit-trail {
  position: absolute;
  border: 1px dashed;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* ── Orbiting wrapper ── */
@keyframes orbit {
  from { transform: rotate(0deg)   translateX(var(--d)) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(var(--d)) rotate(-360deg); }
}

.orbit-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  animation: orbit linear infinite;
}

/* ── Planet sphere ── */
.planet {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
}
.planet:hover { transform: scale(1.28); }

.planet-shine {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 25%,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 55%,
    rgba(0, 0, 0, 0.25) 100%
  );
}

/* ── Tooltip ── */
.planet-label {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(8px);
  padding: 5px 11px;
  border-radius: 8px;
  border: 1px solid rgba(168, 85, 247, 0.5);
  white-space: nowrap;
  font-size: 0.78rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: #f0e8ff;
}
.planet:hover .planet-label { opacity: 1; }

.planet-mastery {
  color: #22d3ee;
  font-size: 0.7rem;
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .orbit-stage { width: 520px; height: 520px; }
}
@media (max-width: 780px) {
  .orbit-stage { width: 360px; height: 360px; }
}
@media (max-width: 520px) {
  .orbit-stage { width: 300px; height: 300px; }
}
</style>
