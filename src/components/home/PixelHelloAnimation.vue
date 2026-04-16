<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const message = ref('Bonjour !')
const isSpeaking = ref(false)

let intervalId: number | undefined

onMounted(() => {
  const shouldReduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  if (shouldReduceMotion) {
    isSpeaking.value = true
    return
  }

  intervalId = window.setInterval(() => {
    isSpeaking.value = true
    window.setTimeout(() => {
      isSpeaking.value = false
    }, 2600)
  }, 4200)
})

onBeforeUnmount(() => {
  if (intervalId != null) window.clearInterval(intervalId)
})
</script>

<template>
  <section class="pixel-hello" aria-label="Personnage pixel art qui dit bonjour">
    <div class="hello-card">
      <div class="sprite-wrap" aria-hidden="true">
        <svg class="sprite" viewBox="0 0 64 64" role="img" aria-label="Pixel character">
          <g shape-rendering="crispEdges">
            <!-- Body -->
            <rect x="24" y="22" width="16" height="18" fill="#3b82f6" />
            <rect x="24" y="22" width="16" height="4" fill="#2563eb" />
            <!-- Head -->
            <rect x="24" y="10" width="16" height="12" fill="#f6c7a5" />
            <rect x="24" y="10" width="16" height="3" fill="#eab08f" />
            <!-- Hair -->
            <rect x="24" y="8" width="16" height="4" fill="#111827" />
            <rect x="24" y="12" width="4" height="2" fill="#111827" />
            <rect x="36" y="12" width="4" height="2" fill="#111827" />
            <!-- Eyes -->
            <rect x="28" y="14" width="2" height="2" fill="#111827" />
            <rect x="34" y="14" width="2" height="2" fill="#111827" />
            <!-- Mouth -->
            <rect x="30" y="18" width="4" height="1" fill="#b45309" />
            <!-- Legs -->
            <rect x="26" y="40" width="5" height="10" fill="#111827" />
            <rect x="33" y="40" width="5" height="10" fill="#111827" />
            <rect x="24" y="50" width="9" height="3" fill="#1f2937" />
            <rect x="32" y="50" width="9" height="3" fill="#1f2937" />
            <!-- Left arm -->
            <rect x="18" y="24" width="6" height="4" fill="#2563eb" />
            <rect x="16" y="28" width="8" height="4" fill="#2563eb" />
            <!-- Waving arm (right) -->
            <g class="arm">
              <rect x="40" y="24" width="6" height="4" fill="#2563eb" />
              <rect x="44" y="20" width="4" height="8" fill="#2563eb" />
              <rect x="46" y="18" width="4" height="4" fill="#2563eb" />
              <!-- Hand -->
              <rect x="48" y="16" width="6" height="4" fill="#f6c7a5" />
            </g>
          </g>
        </svg>
      </div>

      <div class="bubble" :class="{ 'bubble--show': isSpeaking }" role="status" aria-live="polite">
        <span class="bubble-text">{{ message }}</span>
      </div>
    </div>
  </section>
</template>

<style src="@/assets/styles/components/Code_Home/PixelHelloAnimation.css"></style>
