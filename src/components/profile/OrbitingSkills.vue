<script setup lang="ts">
import type { OrbitingSkill } from '@/types/profil'

interface Props {
  skill: OrbitingSkill
  index: number
}

const props = defineProps<Props>()

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
  <div
    class="orbit-trail absolute border border-dashed rounded-full pointer-events-none"
    :style="getTrailStyle()"
  />

  <div class="orbit-wrapper absolute group cursor-pointer" :style="getWrapperStyle()">
    <div
      class="planet relative rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-125"
      :style="getPlanetStyle()"
    >
      <div class="planet-shine absolute inset-0 rounded-full" />

      <div class="tooltip absolute whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div class="text-white font-bold text-sm">{{ skill.name }}</div>
        <div class="text-cyan-300 text-xs">Mastery: {{ skill.level }}%</div>
      </div>
    </div>
  </div>
</template>

<style src="@/assets/styles/components/Galaxie_Profil/OrbitingSkills.css"></style>

