<script setup lang="ts">
import type { HexStat } from '@/types/profil'

interface Props { stat: HexStat }
const props = defineProps<Props>()

const COLOR_MAP: Record<string, string> = {
  'yellow-400': '#facc15', 'orange-500': '#f97316',
  'purple-400': '#c084fc', 'pink-500':   '#ec4899',
  'blue-400':   '#60a5fa', 'cyan-500':   '#06b6d4',
  'green-400':  '#4ade80', 'emerald-500':'#10b981',
}
const ICON_MAP: Record<string, string> = {
  zap: '⚡', layers: '🧱', globe: '🌍', 'trending-up': '📈',
}

const parse = (key: string) => COLOR_MAP[key] ?? '#ffffff'
const parts  = props.stat.color.split(' ')
const from   = parse(parts[0].replace('from-', ''))
const to     = parse(parts[1].replace('to-', ''))
const gradient = `linear-gradient(135deg, ${from}, ${to})`
const iconColor = from
const icon  = ICON_MAP[props.stat.icon] ?? '✦'
</script>

<template>
  <div class="hex-card group">
    <!-- Outer hex = colored "border" via gradient bg -->
    <div class="hex-outer" :style="{ background: gradient }">
      <!-- Inner hex = dark content area -->
      <div class="hex-inner group-hover:bg-[#0d0120]">
        <div class="hex-content">
          <span class="hex-icon" :style="{ color: iconColor }">{{ icon }}</span>
          <div class="stat-value text-white font-bold">{{ stat.value }}</div>
          <div class="stat-label text-purple-300">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Glow on hover -->
    <div class="hex-glow group-hover:opacity-30" :style="{ background: gradient }" />
  </div>
</template>

<style scoped>
/* Hexagon clip-path */
.hex-outer,
.hex-inner,
.hex-glow {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.hex-card {
  position: relative;
  aspect-ratio: 1;
  transition: transform 0.4s;
}
.hex-card:hover { transform: scale(1.08); }

/* Outer = colored border (3px = padding equivalent) */
.hex-outer {
  position: absolute;
  inset: 0;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Inner = dark fill */
.hex-inner {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background: rgba(5, 0, 20, 0.9);
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hex-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 1rem;
}

.hex-icon   { font-size: 2rem; line-height: 1; }
.stat-value { font-size: 2.25rem; line-height: 1.1; }
.stat-label { font-size: 0.8rem; text-align: center; }

/* Blur glow behind card */
.hex-glow {
  position: absolute;
  inset: -8px;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.4s;
  z-index: -1;
}
</style>
