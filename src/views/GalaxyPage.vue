<script setup lang="ts">
import { BADGES } from '@/data/badges'
import { useUserStore } from '@/stores/useUserStore'
import { computed, ref } from 'vue'

const userStore = useUserStore()

type BadgeWithStatus = typeof BADGES[0] & { valide: boolean }

const badgesWithStats = computed(() =>
    BADGES.map(b => ({ ...b, valide: userStore.badges.includes(b.id) }))
)

const completionPercentage = computed(() =>
    Math.round(userStore.badges.length / BADGES.length * 100)
)

const NODE_POSITIONS: Record<number, { x: number; y: number }> = {
    1: { x: 240, y: 225 },
    2: { x: 240, y: 105 },
    3: { x: 344, y: 285 },
    4: { x: 136, y: 285 },

    5:   { x: 780, y: 225 },
    6:   { x: 780, y:  70 },
    101: { x: 871, y: 100 },
    102: { x: 927, y: 177 },
    103: { x: 927, y: 273 },
    104: { x: 871, y: 350 },
    105: { x: 780, y: 380 },
    106: { x: 689, y: 350 },
    107: { x: 633, y: 273 },
    108: { x: 633, y: 177 },
    109: { x: 689, y: 100 },
}

const CONNECTIONS = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 5, to: 6   },
    { from: 5, to: 101 },
    { from: 5, to: 102 },
    { from: 5, to: 103 },
    { from: 5, to: 104 },
    { from: 5, to: 105 },
    { from: 5, to: 106 },
    { from: 5, to: 107 },
    { from: 5, to: 108 },
    { from: 5, to: 109 },
]

const badgesWithPosition = computed(() =>
    badgesWithStats.value.map(b => ({
        ...b,
        x: NODE_POSITIONS[b.id]?.x ?? 0,
        y: NODE_POSITIONS[b.id]?.y ?? 0,
    }))
)

const connectionsWithStatus = computed(() =>
    CONNECTIONS.map(conn => {
        const fromBadge = badgesWithStats.value.find(b => b.id === conn.from)
        return {
            active: fromBadge?.valide ?? false,
            x1: NODE_POSITIONS[conn.from]?.x ?? 0,
            y1: NODE_POSITIONS[conn.from]?.y ?? 0,
            x2: NODE_POSITIONS[conn.to]?.x   ?? 0,
            y2: NODE_POSITIONS[conn.to]?.y   ?? 0,
        }
    })
)

const selectedIndex = ref(-1)
const selectedBadge = computed(() =>
    selectedIndex.value >= 0 ? badgesWithStats.value[selectedIndex.value] : null
)

function selectBadge(badge: BadgeWithStatus) {
    const idx = badgesWithStats.value.findIndex(b => b.id === badge.id)
    selectedIndex.value = selectedIndex.value === idx ? -1 : idx
}

function closeBadge() { selectedIndex.value = -1 }
</script>

<template>
    <div class="galaxy-page">

        <div class="galaxy-header">
            <h1 class="galaxy-title">✦ GALAXIE DES SUCCÈS ✦</h1>
            <p class="galaxy-subtitle">
                {{ userStore.badges.length }} badges débloqués ·
                <span class="galaxy-pct">{{ completionPercentage }}%</span> de la constellation
            </p>
        </div>

        <div class="galaxy-scroll">
            <div class="galaxy-canvas">
                <svg class="galaxy-svg" viewBox="0 0 980 440">
                    <defs>
                        <filter id="glow-line">
                            <feGaussianBlur stdDeviation="2" result="blur"/>
                            <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    <circle cx="240" cy="225" r="120" class="circle-guide circle-guide--parcours" />
                    <circle cx="780" cy="225" r="155" class="circle-guide circle-guide--missions" />

                    <text x="240" y="40" text-anchor="middle" class="family-text family-text--parcours">PARCOURS</text>
                    <text x="780" y="40" text-anchor="middle" class="family-text family-text--missions">MISSIONS</text>

                    <line
                        v-for="(conn, i) in connectionsWithStatus"
                        :key="i"
                        :x1="conn.x1" :y1="conn.y1"
                        :x2="conn.x2" :y2="conn.y2"
                        class="galaxy-line"
                        :class="{ 'galaxy-line--active': conn.active }"
                    />
                </svg>

                <button
                    v-for="badge in badgesWithPosition"
                    :key="badge.id"
                    class="badge-node"
                    :class="{
                        'badge-node--unlocked': badge.valide,
                        'badge-node--selected': selectedBadge?.id === badge.id,
                        'badge-node--hub': badge.id === 5 || badge.id === 1,
                    }"
                    :style="{ left: badge.x + 'px', top: badge.y + 'px' }"
                    @click="selectBadge(badge)"
                >
                    <span class="badge-node__icon">{{ badge.icon }}</span>
                </button>
            </div>
        </div>

        <Transition name="slide-up">
            <div v-if="selectedBadge" class="badge-detail">
                <span
                    class="badge-detail__icon"
                    :class="{ 'badge-detail__icon--locked': !selectedBadge.valide }"
                >{{ selectedBadge.icon }}</span>
                <div class="badge-detail__info">
                    <h3 class="badge-detail__name">{{ selectedBadge.name }}</h3>
                    <p class="badge-detail__desc">{{ selectedBadge.description }}</p>
                    <p class="badge-detail__status" :class="selectedBadge.valide ? 'status--done' : 'status--locked'">
                        {{ selectedBadge.valide ? '✓ DÉBLOQUÉ' : '🔒 PAS ENCORE DÉBLOQUÉ' }}
                    </p>
                </div>
                <button class="badge-detail__close" @click="closeBadge">✕</button>
            </div>
        </Transition>

    </div>
</template>

<style scoped>
.galaxy-page {
    padding: 40px 0 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    position: relative;
}

/* ── En-tête ───────────────────────────────────────────── */
.galaxy-header {
    text-align: center;
    margin-bottom: 4px;
}

.galaxy-title {
    font-family: var(--font-orbitron);
    font-size: clamp(20px, 3vw, 30px);
    font-weight: 800;
    letter-spacing: 2px;
    text-align: center;
    background: linear-gradient(90deg, #ffffff 20%, #a78bfa 55%, #60a5fa 90%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    margin: 0 0 8px;
}

.galaxy-subtitle {
    margin: 0;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.6);
}

.galaxy-pct {
    color: #a78bfa;
    font-weight: 600;
}

/* ── Canvas ────────────────────────────────────────────── */
.galaxy-scroll {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(124, 58, 237, 0.3) transparent;
}

.galaxy-canvas {
    position: relative;
    width: 980px;
    height: 440px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 22px;
    overflow: hidden;
}

/* ── SVG ───────────────────────────────────────────────── */
.galaxy-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.circle-guide {
    fill: none;
    stroke-width: 1;
    stroke-dasharray: 4 6;
}

.circle-guide--parcours { stroke: rgba(167, 139, 250, 0.2); }
.circle-guide--missions  { stroke: rgba(96, 165, 250, 0.2); }

.family-text {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 4px;
    font-family: var(--font-orbitron, sans-serif);
}

.family-text--parcours { fill: rgba(167, 139, 250, 0.6); }
.family-text--missions  { fill: rgba(96, 165, 250, 0.6); }

.galaxy-line {
    stroke: rgba(167, 139, 250, 0.12);
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-dasharray: 5 5;
    animation: cqDash 1.4s linear infinite;
}

.galaxy-line--active {
    stroke: rgba(124, 58, 237, 0.65);
    stroke-width: 2;
    filter: url(#glow-line);
}

@keyframes cqDash {
    to { stroke-dashoffset: -20; }
}

/* ── Nœuds ─────────────────────────────────────────────── */
.badge-node {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 62px;
    height: 62px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    filter: grayscale(1);
    opacity: 0.25;
    padding: 0;
    z-index: 3;
}

.badge-node--hub {
    width: 72px;
    height: 72px;
}

.badge-node--unlocked {
    filter: none;
    opacity: 1;
    border-color: rgba(124, 58, 237, 0.4);
    background: rgba(124, 58, 237, 0.07);
    box-shadow: 0 0 14px rgba(124, 58, 237, 0.2);
}

.badge-node--unlocked:hover {
    transform: translate(-50%, -50%) scale(1.18);
    box-shadow: 0 0 30px rgba(124, 58, 237, 0.6);
    border-color: rgba(124, 58, 237, 0.9);
}

.badge-node--selected {
    transform: translate(-50%, -50%) scale(1.25) !important;
    box-shadow: 0 0 44px rgba(124, 58, 237, 0.8) !important;
    border-color: rgba(167, 139, 250, 1) !important;
}

.badge-node__icon {
    font-size: 1.6rem;
    pointer-events: none;
}

.badge-node--hub .badge-node__icon {
    font-size: 1.85rem;
}

/* ── Carte détail inline ────────────────────────────────── */
.badge-detail {
    max-width: 520px;
    width: calc(100% - 40px);
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(167, 139, 250, 0.35);
    border-radius: 18px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 18px;
    animation: cqFadeUp 0.3s ease;
}

.badge-detail__icon {
    font-size: 3.5rem;
    line-height: 1;
    flex-shrink: 0;
    filter:
        drop-shadow(0 0 10px rgba(167, 139, 250, 0.8))
        drop-shadow(0 0 24px rgba(167, 139, 250, 0.4));
}

.badge-detail__icon--locked {
    filter: grayscale(1);
    opacity: 0.3;
}

.badge-detail__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.badge-detail__name {
    font-family: var(--font-orbitron);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin: 0 0 4px;
    color: #fff;
}

.badge-detail__desc {
    font-size: 13.5px;
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
    line-height: 1.5;
}

.badge-detail__status {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 1px;
    margin: 6px 0 0;
}

.status--done   { color: #4ade80; }
.status--locked { color: rgba(255, 255, 255, 0.35); }

.badge-detail__close {
    flex-shrink: 0;
    align-self: flex-start;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    font-size: 18px;
    cursor: pointer;
    padding: 2px 6px;
    transition: color 0.2s;
}

.badge-detail__close:hover { color: #fff; }

/* ── Transition slide-up ───────────────────────────────── */
.slide-up-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.slide-up-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.slide-up-enter-from   { opacity: 0; transform: translateY(12px); }
.slide-up-leave-to     { opacity: 0; transform: translateY(6px); }
</style>
