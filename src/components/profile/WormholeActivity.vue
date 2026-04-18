<script setup lang="ts">
import type { WormholeActivity } from '@/types/profil'
interface Props { activity: WormholeActivity }
const props = defineProps<Props>()

const GRAD: Record<string, { css: string; glow: string }> = {
  'from-purple-500 to-pink-500':   { css: 'linear-gradient(135deg,#a855f7,#ec4899)', glow: 'rgba(168,85,247,0.3)' },
  'from-blue-500 to-cyan-500':     { css: 'linear-gradient(135deg,#3b82f6,#06b6d4)', glow: 'rgba(59,130,246,0.3)' },
  'from-green-500 to-emerald-500': { css: 'linear-gradient(135deg,#22c55e,#10b981)', glow: 'rgba(34,197,94,0.3)' },
}
const g = GRAD[props.activity.color] ?? GRAD['from-purple-500 to-pink-500']
</script>

<template>
  <div class="activity-row group">
    <div class="portal-glow">
      <div class="portal-core" :style="{ background: g.css }" />
      <div
        v-for="i in 4"
        :key="`pr${i}`"
        class="portal-ring"
        :style="{ borderColor: g.glow, animationDelay: `${i * 0.3}s` }"
      />
    </div>

    <div class="activity-card group-hover:border-cyan-400/50">
      <div class="card-hover-bg opacity-0 group-hover:opacity-10" :style="{ background: g.css }" />

      <div class="card-body">
        <div class="card-left">
          <h3 class="activity-title">
            {{ activity.title }}
            <span class="sparkle">✨</span>
          </h3>
          <div class="activity-meta">
            <span class="dimension">🌍 {{ activity.dimension }}</span>
            <span class="time">{{ activity.time }}</span>
          </div>
        </div>

        <div class="card-right">
          <div class="energy-value" :style="{ background: g.css, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }">
            +{{ activity.energy }}
          </div>
          <div class="energy-label">Energy Gained</div>
        </div>
      </div>

      <div class="particles-wrap">
        <div
          v-for="i in 10"
          :key="`p${i}`"
          class="particle opacity-0 group-hover:animate-particle"
          :style="{
            top:            `${Math.random()*100}%`,
            left:           `${Math.random()*100}%`,
            background:     g.css,
            animationDelay: `${Math.random()*2}s`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style src="@/assets/styles/components/Galaxie_Profil/wormhole-activity.css"></style>