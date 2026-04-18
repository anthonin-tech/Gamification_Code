<script setup lang="ts">
import type { OrbitingSkill } from '@/types/profil'

interface Props {
  skills: OrbitingSkill[]
}

defineProps<Props>()

const ORBIT_TRAILS = [
  { size: 260, color: 'rgba(139,92,246,0.22)' },
  { size: 360, color: 'rgba(99,102,241,0.16)' },
  { size: 460, color: 'rgba(168,85,247,0.12)' },
  { size: 560, color: 'rgba(139,92,246,0.08)' },
  { size: 620, color: 'rgba(99,102,241,0.06)' },
]

const getDuration = (distance: number): number => {
  if (distance <= 130) return 14
  if (distance <= 180) return 20
  if (distance <= 240) return 27
  return 34
}

const getWrapperStyle = (skill: OrbitingSkill, index: number) => {
  const duration = getDuration(skill.distance)

  const sameOrbit = [] as OrbitingSkill[]
  
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
    <div
      v-for="trail in ORBIT_TRAILS"
      :key="trail.size"
      class="orbit-trail"
      :style="getTrailStyle(trail.size, trail.color)"
    />

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

    <slot />
  </div>
</template>

<style src="@/assets/styles/components/Galaxie_Profil/OrbitStage.css"></style>