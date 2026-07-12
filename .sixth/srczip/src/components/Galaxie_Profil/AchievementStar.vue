<script setup lang="ts">
import type { Achievement } from '@/types/profil'
import { computed } from 'vue'

interface Props { achievement: Achievement }
const props = defineProps<Props>()

const CFG = {
  legendary: { border:'#eab308', bg:'linear-gradient(135deg,rgba(234,179,8,.3),rgba(249,115,22,.3))', shadow:'0 0 40px rgba(234,179,8,.8)', glow:'rgba(234,179,8,.5)', text:'#eab308' },
  epic:      { border:'#a855f7', bg:'linear-gradient(135deg,rgba(168,85,247,.3),rgba(236,72,153,.3))', shadow:'0 0 30px rgba(168,85,247,.6)', glow:'rgba(168,85,247,.4)', text:'#a855f7' },
  rare:      { border:'#3b82f6', bg:'linear-gradient(135deg,rgba(59,130,246,.3),rgba(34,211,238,.3))', shadow:'0 0 20px rgba(59,130,246,.5)', glow:'rgba(59,130,246,.3)', text:'#3b82f6' },
  common:    { border:'#4b5563', bg:'rgba(31,41,55,.3)', shadow:'none', glow:'transparent', text:'#6b7280' },
}
const ICONS: Record<string, string> = { rocket:'🚀', star:'⭐', moon:'🌙', telescope:'🔭', satellite:'🛰️', globe:'🌍' }

const c = computed(() => CFG[props.achievement.rarity])
const glyph = computed(() => ICONS[props.achievement.icon] ?? '✦')
</script>

<template>
  <div
    class="star-wrap group"
    :style="{ left: `${achievement.x}%`, top: `${achievement.y}%` }"
  >
    <!-- Outer glow -->
    <div v-if="achievement.unlocked" class="star-glow animate-pulse" :style="{ background: c.glow }" />

    <!-- Star disc -->
    <div
      class="star-disc"
      :style="{
        borderColor: c.border,
        background: c.bg,
        boxShadow: achievement.unlocked ? c.shadow : 'none',
      }"
    >
      <span v-if="achievement.unlocked" class="star-icon">{{ glyph }}</span>

      <!-- Orbiting dots -->
      <template v-if="achievement.unlocked">
        <div
          v-for="i in 3"
          :key="`od${i}`"
          class="orbit-dot"
          :style="{
            transform: `rotate(${(i-1)*120}deg) translateX(38px)`,
            animationDuration: `${3+i}s`,
          }"
        />
      </template>

      <!-- Locked -->
      <div v-if="!achievement.unlocked" class="star-locked">
        <span class="text-gray-500 text-xs">???</span>
      </div>
    </div>

    <!-- Tooltip -->
    <div class="star-tooltip opacity-0 group-hover:opacity-100">
      <div class="text-white font-semibold">{{ achievement.name }}</div>
      <div class="text-sm capitalize" :style="{ color: c.text }">{{ achievement.rarity }}</div>
    </div>
  </div>
</template>

<style scoped>
.star-wrap {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 10;
  cursor: pointer;
}

.star-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  filter: blur(12px);
  opacity: 0.55;
}

.star-disc {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid;
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}
.star-disc:hover { transform: scale(1.25); }

.star-icon { font-size: 1.75rem; z-index: 2; }

/* Orbit dots */
@keyframes orbit-dot {
  from { transform: rotate(var(--start)) translateX(38px) rotate(calc(-1 * var(--start))); }
  to   { transform: rotate(calc(var(--start) + 360deg)) translateX(38px) rotate(calc(-1 * (var(--start) + 360deg))); }
}
.orbit-dot {
  position: absolute;
  width: 7px;
  height: 7px;
  background: rgba(255,255,255,0.85);
  border-radius: 50%;
  transform-origin: 0 0;
  top: 50%;
  left: 50%;
  margin: -3.5px 0 0 -3.5px;
  animation: spin-dot linear infinite;
}
@keyframes spin-dot {
  to { transform: var(--transform-end, rotate(360deg) translateX(38px) rotate(-360deg)); }
}

/* Simpler approach: just animate rotation of a wrapper */
.orbit-dot:nth-child(2) { animation: orb1 3s linear infinite; }
.orbit-dot:nth-child(3) { animation: orb2 4s linear infinite; }
.orbit-dot:nth-child(4) { animation: orb3 5s linear infinite; }

@keyframes orb1 { from{transform:rotate(0deg)   translateX(38px) rotate(0deg);}   to{transform:rotate(360deg)   translateX(38px) rotate(-360deg);} }
@keyframes orb2 { from{transform:rotate(120deg)  translateX(38px) rotate(-120deg);} to{transform:rotate(480deg)  translateX(38px) rotate(-480deg);} }
@keyframes orb3 { from{transform:rotate(240deg)  translateX(38px) rotate(-240deg);} to{transform:rotate(600deg)  translateX(38px) rotate(-600deg);} }

.star-locked {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.88);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.star-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.92);
  backdrop-filter: blur(8px);
  padding: 8px 14px;
  border-radius: 10px;
  border: 2px solid rgba(168,85,247,0.5);
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.25s;
  z-index: 50;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
</style>
