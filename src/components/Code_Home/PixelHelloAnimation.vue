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
  if (intervalId) window.clearInterval(intervalId)
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

<style scoped>
.pixel-hello {
  display: flex;
  justify-content: center;
  padding: 10px 0 6px;
}

.hello-card {
  width: min(900px, calc(100% - 32px));
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 20, 24, 0.55);
  box-shadow: 0 16px 55px rgba(0, 0, 0, 0.35);
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
}

.sprite-wrap {
  display: grid;
  place-items: center;
  width: 140px;
  height: 110px;
  border-radius: 14px;
  background: radial-gradient(120px 70px at 30% 30%, rgba(124, 58, 237, 0.25), rgba(255, 255, 255, 0.04));
  border: 1px solid rgba(255, 255, 255, 0.10);
}

.sprite {
  width: 92px;
  height: 92px;
  image-rendering: pixelated;
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.35));
}

.arm {
  transform-origin: 46px 26px;
  animation: wave 1s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .arm {
    animation: none;
  }
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(10deg) translateY(0);
  }
  50% {
    transform: rotate(-22deg) translateY(-1px);
  }
}

.bubble {
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 200ms ease, transform 200ms ease;
  justify-self: start;
}

.bubble--show {
  opacity: 1;
  transform: translateY(0);
}

.bubble-text {
  display: inline-block;
  font-family: var(--font-pixel);
  font-size: 13px;
  line-height: 1.35;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(180deg, rgba(124, 58, 237, 0.22), rgba(20, 20, 24, 0.62));
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.32);
  color: rgba(255, 255, 255, 0.92);
  position: relative;
}

.bubble-text::before {
  content: "";
  position: absolute;
  left: -8px;
  top: 50%;
  width: 12px;
  height: 12px;
  transform: translateY(-50%) rotate(45deg);
  background: rgba(124, 58, 237, 0.20);
  border-left: 1px solid rgba(255, 255, 255, 0.14);
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

@media (max-width: 640px) {
  .hello-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .bubble {
    justify-self: center;
  }

  .bubble-text::before {
    left: 50%;
    top: -6px;
    transform: translateX(-50%) rotate(45deg);
    border-left: none;
    border-bottom: none;
    border-right: 1px solid rgba(255, 255, 255, 0.14);
    border-top: 1px solid rgba(255, 255, 255, 0.14);
  }
}
</style>

