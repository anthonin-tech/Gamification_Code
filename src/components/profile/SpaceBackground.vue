<script setup lang="ts">

import { ref, onMounted } from 'vue'
interface Star {
  x:        number
  y:        number
  r:        number
  opacity:  number
  duration: number
}
const stars = ref<Star[]>([])

onMounted(() => {
  stars.value = Array.from({ length: 160 }, () => ({
    x:        Math.random() * 100,
    y:        Math.random() * 100,
    r:        Math.random() * 1.6 + 0.3,
    opacity:  Math.random() * 0.7 + 0.15,
    duration: Math.random() * 4 + 3,
  }))
})
</script>

<template>
  
  <div class="space-bg" aria-hidden="true">

    
    <div
      v-for="(star, i) in stars"
      :key="i"
      class="space-bg__star"
      :style="{
        left:              star.x + '%',
        top:               star.y + '%',
        width:             star.r * 2 + 'px',
        height:            star.r * 2 + 'px',
        opacity:           star.opacity,
        animationDuration: star.duration + 's',
      }"
    />

    
    <div class="space-bg__nebula space-bg__nebula--left"  />
    <div class="space-bg__nebula space-bg__nebula--right" />
    <div class="space-bg__nebula space-bg__nebula--top"   />

  </div>
</template>

<style scoped src="@/assets/styles/components/Galaxie_Profil/SpaceBackground.css" />
