<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const fullText = [
  'type Quest = {',
  '  id: string',
  '  title: string',
  '  difficulty: 1 | 2 | 3 | 4 | 5',
  '  rewardXp: number',
  '  tags: string[]',
  '}',
  '',
  'type Player = {',
  '  id: string',
  '  username: string',
  '  xp: number',
  '  unlocked: Set<string>',
  '}',
  '',
  'const QUESTS: Quest[] = [',
  "  { id: 'q1', title: 'Hello World', difficulty: 1, rewardXp: 25, tags: ['basics'] },",
  "  { id: 'q2', title: 'Fetch + Pagination', difficulty: 2, rewardXp: 60, tags: ['api', 'ui'] },",
  "  { id: 'q3', title: 'Router Guard', difficulty: 3, rewardXp: 90, tags: ['security'] },",
  "  { id: 'q4', title: 'Cache + Retry', difficulty: 4, rewardXp: 130, tags: ['perf'] },",
  "  { id: 'q5', title: 'Boss: Refactor', difficulty: 5, rewardXp: 200, tags: ['architecture'] },",
  ']',
  '',
  'function levelFromXp(xp: number) {',
  '  return Math.floor(xp / 100) + 1',
  '}',
  '',
  'function unlock(player: Player, feature: string) {',
  '  player.unlocked.add(feature)',
  '}',
  '',
  'function awardXp(player: Player, amount: number) {',
  '  player.xp += Math.max(0, amount)',
  '  const level = levelFromXp(player.xp)',
  '',
  '  if (level >= 3) unlock(player, "Streaks")',
  '  if (level >= 5) unlock(player, "Daily Challenges")',
  '  if (level >= 8) unlock(player, "Ranked Mode")',
  '',
  '  return level',
  '}',
  '',
  'function completeQuest(player: Player, questId: string) {',
  '  const quest = QUESTS.find(q => q.id === questId)',
  '  if (!quest) throw new Error("Quest not found")',
  '',
  '  const before = levelFromXp(player.xp)',
  '  const after = awardXp(player, quest.rewardXp)',
  '',
  '  return {',
  '    quest: quest.title,',
  '    gainedXp: quest.rewardXp,',
  '    levelUp: after > before,',
  '    level: after,',
  '  }',
  '}',
  '',
  '// Demo run',
  'const player: Player = {',
  "  id: 'p1',",
  "  username: 'coder',",
  '  xp: 240,',
  '  unlocked: new Set(),',
  '}',
  '',
  "console.log(completeQuest(player, 'q4'))",
].join('\n')

const typedText = ref('')
const isDone = ref(false)
const showResult = ref(false)

let timeoutId: number | undefined
let index = 0
let shouldReduceMotion = false
let rafId: number | undefined
let startMs = 0

const TYPING_TOTAL_MS = 30_000
const RESULT_MS = 5_000

function resetAndStart() {
  typedText.value = ''
  isDone.value = false
  showResult.value = false
  index = 0

  if (rafId != null) window.cancelAnimationFrame(rafId)
  startMs = performance.now()
  tick()
}

function tick() {
  const now = performance.now()
  const elapsed = now - startMs
  const progress = Math.min(1, elapsed / TYPING_TOTAL_MS)

  const targetIndex = Math.floor(progress * fullText.length)
  if (targetIndex !== index) {
    index = targetIndex
    typedText.value = fullText.slice(0, index)
  }

  if (progress >= 1) {
    isDone.value = true
    showResult.value = true
    timeoutId = window.setTimeout(() => resetAndStart(), RESULT_MS)
    return
  }

  rafId = window.requestAnimationFrame(tick)
}

onMounted(() => {
  shouldReduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  if (shouldReduceMotion) {
    typedText.value = fullText
    isDone.value = true
    showResult.value = true
    return
  }

  resetAndStart()
})

onBeforeUnmount(() => {
  if (timeoutId != null) window.clearTimeout(timeoutId)
  if (rafId != null) window.cancelAnimationFrame(rafId)
})
</script>

<template>
  <section class="code-typing" aria-label="Animation: écriture de code">
    <div class="code-card">
      <div class="code-header">
        <span class="dot dot--red" aria-hidden="true" />
        <span class="dot dot--yellow" aria-hidden="true" />
        <span class="dot dot--green" aria-hidden="true" />
        <span class="code-title">quest.ts</span>
      </div>

      <pre class="code-body">
<code>{{ typedText }}</code><span class="cursor" :class="{ 'cursor--idle': isDone }" aria-hidden="true">▍</span>
      </pre>

      <div v-if="showResult" class="result-overlay" aria-label="Personnage pixel art">
        <div class="result-card">
          <div class="sprite-wrap" aria-hidden="true">
            <svg class="sprite" viewBox="0 0 64 64" role="img" aria-label="Pixel character">
              <g shape-rendering="crispEdges">
                <rect x="24" y="22" width="16" height="18" fill="#3b82f6" />
                <rect x="24" y="22" width="16" height="4" fill="#2563eb" />
                <rect x="24" y="10" width="16" height="12" fill="#f6c7a5" />
                <rect x="24" y="10" width="16" height="3" fill="#eab08f" />
                <rect x="24" y="8" width="16" height="4" fill="#111827" />
                <rect x="24" y="12" width="4" height="2" fill="#111827" />
                <rect x="36" y="12" width="4" height="2" fill="#111827" />
                <rect x="28" y="14" width="2" height="2" fill="#111827" />
                <rect x="34" y="14" width="2" height="2" fill="#111827" />
                <rect x="30" y="18" width="4" height="1" fill="#b45309" />
                <rect x="26" y="40" width="5" height="10" fill="#111827" />
                <rect x="33" y="40" width="5" height="10" fill="#111827" />
                <rect x="24" y="50" width="9" height="3" fill="#1f2937" />
                <rect x="32" y="50" width="9" height="3" fill="#1f2937" />
                <rect x="18" y="24" width="6" height="4" fill="#2563eb" />
                <rect x="16" y="28" width="8" height="4" fill="#2563eb" />
                <g class="arm">
                  <rect x="40" y="24" width="6" height="4" fill="#2563eb" />
                  <rect x="44" y="20" width="4" height="8" fill="#2563eb" />
                  <rect x="46" y="18" width="4" height="4" fill="#2563eb" />
                  <rect x="48" y="16" width="6" height="4" fill="#f6c7a5" />
                </g>
              </g>
            </svg>
          </div>

          <div class="bubble" role="status" aria-live="polite">
            <span class="bubble-text">Bonjour !</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style src="./CodeTypingAnimation.css"></style>

