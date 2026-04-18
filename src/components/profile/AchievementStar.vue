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
    <div v-if="achievement.unlocked" class="star-glow animate-pulse" :style="{ background: c.glow }" />
    <div
      class="star-disc"
      :style="{
        borderColor: c.border,
        background: c.bg,
        boxShadow: achievement.unlocked ? c.shadow : 'none',
      }"
    >
      <span v-if="achievement.unlocked" class="star-icon">{{ glyph }}</span>

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

<style src="@/assets/styles/components/Galaxie_Profil/AchievementStar.css"></style>