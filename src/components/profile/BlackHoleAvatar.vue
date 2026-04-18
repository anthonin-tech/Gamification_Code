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

    <div class="avatar-core">
      <div class="conic-bg" />
      <div class="avatar-inner">
        <img :src="avatarUrl" alt="Profile" class="avatar-img" />
      </div>
      <div class="singularity-overlay" />
    </div>

    <div class="lens-glow animate-pulse" />
    <div class="lens-outer" />
  </div>
</template>

<style src="@/assets/styles/components/Galaxie_Profil/BlackHoleAvatar.css"></style>