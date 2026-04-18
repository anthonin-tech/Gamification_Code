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
    <div class="hex-outer" :style="{ background: gradient }">
      <div class="hex-inner group-hover:bg-[#0d0120]">
        <div class="hex-content">
          <span class="hex-icon" :style="{ color: iconColor }">{{ icon }}</span>
          <div class="stat-value text-white font-bold">{{ stat.value }}</div>
          <div class="stat-label text-purple-300">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <div class="hex-glow group-hover:opacity-30" :style="{ background: gradient }" />
  </div>
</template>

<style src="@/assets/styles/components/Galaxie_Profil/HexagonStat.css"></style>
