<script setup lang="ts">
import { computed } from 'vue'
import type { Achievement } from '@/types'
import AchievementStar from '@/components/profile/AchievementStar.vue'

interface Props {
  achievements: Achievement[]
}

const props = defineProps<Props>()

interface ConstellationLine {
  key: string
  x1: number
  y1: number
  x2: number
  y2: number
  active: boolean
}

// Build connection lines between achievements
// We need connections data — we embed them here based on HTML
const CONNECTIONS: [number, number][] = [
  [1, 3], [3, 5], [4, 5], [4, 6], [5, 6],
  [1, 3], [2, 4], [3, 5],
]

const achievementMap = computed(() =>
  new Map(props.achievements.map((a) => [a.id, a]))
)

const lines = computed<ConstellationLine[]>(() => {
  const seen = new Set<string>()
  return CONNECTIONS.flatMap(([fromId, toId]) => {
    const key = `${Math.min(fromId, toId)}-${Math.max(fromId, toId)}`
    if (seen.has(key)) return []
    seen.add(key)

    const from = achievementMap.value.get(fromId)
    const to = achievementMap.value.get(toId)
    if (!from || !to) return []

    return [{
      key,
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
      active: from.unlocked && to.unlocked,
    }]
  })
})
</script>

<template>
  <div class="constellation-board">
    <!-- SVG connection lines -->
    <svg
      class="constellation-board__lines"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        v-for="line in lines"
        :key="line.key"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        :stroke="line.active ? 'rgba(175,88,255,0.55)' : 'rgba(67,78,102,0.45)'"
        :stroke-width="line.active ? 0.7 : 0.5"
      />
    </svg>

    <!-- Achievement nodes -->
    <AchievementStar
      v-for="achievement in achievements"
      :key="achievement.id"
      :achievement="achievement"
    />
  </div>
</template>

<style scoped>
.constellation-board {
  position: relative;
  min-height: 32rem;
  border: 1px solid rgba(90, 38, 158, 0.5);
  border-radius: 1.6rem;
  background: linear-gradient(180deg, rgba(0, 6, 21, 0.94), rgba(0, 0, 7, 0.9));
  overflow: hidden;
}

.constellation-board::before {
  content: '';
  position: absolute;
  inset: -12% auto auto 8%;
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 193, 33, 0.14) 0%, transparent 70%);
  filter: blur(8px);
}

.constellation-board::after {
  content: '';
  position: absolute;
  inset: auto 18% -12% auto;
  width: 22rem;
  height: 22rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(110, 61, 255, 0.18) 0%, transparent 72%);
  filter: blur(10px);
}

.constellation-board__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 780px) {
  .constellation-board { min-height: 24rem; }
}
</style>
