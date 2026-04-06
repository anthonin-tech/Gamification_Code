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

function nextDelay(char: string) {
  if (char === '\n') return 120
  if (char === ' ') return 12
  if (char === '{' || char === '}' || char === '(' || char === ')' || char === ';') return 35
  return 22
}

function resetAndStart() {
  typedText.value = ''
  isDone.value = false
  showResult.value = false
  index = 0

  if (rafId) window.cancelAnimationFrame(rafId)
  startMs = performance.now()
  tick()
}

function typeNext() {
  if (index >= fullText.length) {
    isDone.value = true
    if (shouldReduceMotion) return
    timeoutId = window.setTimeout(() => resetAndStart(), 1200)
    return
  }

  const ch = fullText[index]!
  typedText.value += ch
  index += 1

  timeoutId = window.setTimeout(typeNext, nextDelay(ch))
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
  if (timeoutId) window.clearTimeout(timeoutId)
  if (rafId) window.cancelAnimationFrame(rafId)
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

<style scoped>
.code-typing {
  display: flex;
  justify-content: center;
  margin: 18px 0 12px;
}

.code-card {
  width: min(520px, calc(100% - 32px));
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(180deg, rgba(20, 20, 30, 0.92), rgba(14, 14, 20, 0.92));
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  opacity: 0.9;
}
.dot--red {
  background: #ff5f56;
}
.dot--yellow {
  background: #ffbd2e;
}
.dot--green {
  background: #27c93f;
}

.code-title {
  margin-left: 6px;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.72);
}

.code-body {
  margin: 0;
  padding: 14px 16px 16px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  color: rgba(225, 245, 255, 0.92);
  flex: 1 1 auto;
  overflow: auto;
}

.code-body::-webkit-scrollbar {
  width: 10px;
}
.code-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
}
.code-body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.04);
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  transform: translateY(1px);
  animation: blink 0.9s steps(1) infinite;
  color: rgba(140, 255, 205, 0.95);
}

.cursor--idle {
  animation: blink 1.2s steps(1) infinite;
  color: rgba(255, 255, 255, 0.55);
}

@keyframes blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }
}

.result-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: radial-gradient(600px 400px at 50% 30%, rgba(124, 58, 237, 0.26), rgba(0, 0, 0, 0.55));
  animation: overlay-fade 360ms ease-out both;
}

.result-card {
  width: min(420px, calc(100% - 40px));
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(10, 10, 16, 0.72);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
  padding: 14px 14px 16px;
  transform-origin: 50% 70%;
  animation: result-pop 520ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 12px;
}

.sprite-wrap {
  display: grid;
  place-items: center;
  width: 130px;
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

.bubble {
  justify-self: start;
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

@keyframes wave {
  0%,
  100% {
    transform: rotate(10deg) translateY(0);
  }
  50% {
    transform: rotate(-22deg) translateY(-1px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .arm {
    animation: none;
  }
}

@media (max-width: 520px) {
  .result-card {
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

@keyframes result-pop {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.96);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes overlay-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
