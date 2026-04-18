<script setup lang="ts">
const STAR_COUNT   = 150
const METEOR_COUNT = 3

const stars = Array.from({ length: STAR_COUNT }, () => ({
  top:      Math.random() * 100,
  left:     Math.random() * 100,
  size:     Math.random() * 2.5 + 0.5,
  delay:    Math.random() * 6,
  duration: Math.random() * 3 + 2,
  opacity:  Math.random() * 0.7 + 0.3,
}))

const meteors = Array.from({ length: METEOR_COUNT }, (_, i) => ({
  top:   Math.random() * 40,
  left:  Math.random() * 80,
  delay: i * 9 + Math.random() * 6,
}))
</script>

<template>
  <div class="space-bg">
    <div class="space-base" />

    <div class="star-field">
      <div
        v-for="(star, i) in stars"
        :key="`s${i}`"
        class="star"
        :style="{
          top:               `${star.top}%`,
          left:              `${star.left}%`,
          width:             `${star.size}px`,
          height:            `${star.size}px`,
          opacity:           star.opacity,
          animationDelay:    `${star.delay}s`,
          animationDuration: `${star.duration}s`,
        }"
      />
    </div>

    <div
      v-for="(m, i) in meteors"
      :key="`m${i}`"
      class="meteor"
      :style="{ top: `${m.top}%`, left: `${m.left}%`, animationDelay: `${m.delay}s` }"
    />

    <div class="nebula nebula-purple" />
    <div class="nebula nebula-blue"   style="animation-delay:2s;animation-duration:28s" />
    <div class="nebula nebula-pink"   style="animation-delay:4s;animation-duration:33s" />
    <div class="nebula nebula-cyan"   style="animation-delay:7s;animation-duration:38s" />
  </div>
</template>

<style src="@/assets/styles/components/Galaxie_Profil/SpaceBackground.css"></style>

