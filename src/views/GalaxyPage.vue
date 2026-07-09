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

// Parcours : badge 1 au centre, badges 2/3/4 en orbite (120° d'écart, rayon 120)
// Missions : badge 5 au centre, badges 6 + 101–109 en orbite (36° d'écart, rayon 155)
const NODE_POSITIONS: Record<number, { x: number; y: number }> = {
    // Parcours — hub au centre
    1: { x: 240, y: 225 },  // centre
    2: { x: 240, y: 105 },  // -90°
    3: { x: 344, y: 285 },  //  30°
    4: { x: 136, y: 285 },  // 150°

    // Missions — hub au centre
    5:   { x: 780, y: 225 },
    // orbite (360°/10 = 36°, départ -90°)
    6:   { x: 780, y:  70 },  // -90°
    101: { x: 871, y: 100 },  // -54°
    102: { x: 927, y: 177 },  // -18°
    103: { x: 927, y: 273 },  //  18°
    104: { x: 871, y: 350 },  //  54°
    105: { x: 780, y: 380 },  //  90°
    106: { x: 689, y: 350 },  // 126°
    107: { x: 633, y: 273 },  // 162°
    108: { x: 633, y: 177 },  // 198°
    109: { x: 689, y: 100 },  // 234°
}

const CONNECTIONS = [
    // Parcours — rayons depuis le hub
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    // Missions — rayons depuis le hub
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
    selectedIndex.value = badgesWithStats.value.findIndex(b => b.id === badge.id)
}

function closeBadge() { selectedIndex.value = -1 }
function prevBadge()  { if (selectedIndex.value > 0) selectedIndex.value-- }
function nextBadge()  { if (selectedIndex.value < badgesWithStats.value.length - 1) selectedIndex.value++ }

const hasPrev = computed(() => selectedIndex.value > 0)
const hasNext = computed(() => selectedIndex.value < badgesWithStats.value.length - 1)
</script>

<template>
    <div class="galaxy-page">
        <h1 class="galaxy-title">✦ Galaxie des succès ✦</h1>

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

                    <!-- Cercles guides -->
                    <circle cx="240" cy="225" r="120" class="circle-guide" />
                    <circle cx="780" cy="225" r="155" class="circle-guide" />

                    <!-- Labels familles -->
                    <text x="240" y="26" text-anchor="middle" class="family-text">PARCOURS</text>
                    <text x="780" y="26" text-anchor="middle" class="family-text">MISSIONS</text>

                    <!-- Connexions -->
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

        <!-- Vue hologramme -->
        <Transition name="zoom">
            <div v-if="selectedBadge" class="badge-overlay" @click.self="closeBadge">
                <button class="nav-btn nav-btn--left" :disabled="!hasPrev" @click="prevBadge">‹</button>

                <div class="holo-stage">
                    <button class="holo-close" @click="closeBadge">✕</button>

                    <div class="holo-badge" :class="{ 'holo-badge--locked': !selectedBadge.valide }">
                        <div class="holo-scanlines" />
                        <span class="holo-icon">{{ selectedBadge.icon }}</span>
                        <div class="holo-ring" />
                    </div>

                    <div class="holo-pedestal">
                        <div class="holo-pedestal__neck" />
                        <div class="holo-pedestal__base" />
                        <div class="holo-pedestal__glow" />
                    </div>

                    <div class="holo-info">
                        <p class="holo-name">{{ selectedBadge.name }}</p>
                        <p class="holo-desc">{{ selectedBadge.description }}</p>
                        <span
                            class="holo-status"
                            :class="selectedBadge.valide ? 'status--done' : 'status--locked'"
                        >
                            {{ selectedBadge.valide ? '✓ Débloqué' : '🔒 Pas encore débloqué' }}
                        </span>
                    </div>
                </div>

                <button class="nav-btn nav-btn--right" :disabled="!hasNext" @click="nextBadge">›</button>
            </div>
        </Transition>

        <div class="completion-counter">{{ completionPercentage }}%</div>
    </div>
</template>

<style scoped>
.galaxy-page {
    padding: 40px 0 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.galaxy-title {
    font-family: var(--font-pixel);
    font-size: clamp(0.72rem, 1.6vw, 0.9rem);
    text-align: center;
    background: linear-gradient(90deg, var(--primary), var(--primary-2));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin: 0 0 28px;
    letter-spacing: 3px;
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
    stroke: rgba(255, 255, 255, 0.05);
    stroke-width: 1;
    stroke-dasharray: 5 10;
}

.family-text {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    fill: rgba(255, 255, 255, 0.18);
    font-family: var(--font-pixel, monospace);
}

.galaxy-line {
    stroke: rgba(255, 255, 255, 0.06);
    stroke-width: 1.5;
    stroke-linecap: round;
}

.galaxy-line--active {
    stroke: rgba(124, 58, 237, 0.5);
    stroke-width: 2;
    filter: url(#glow-line);
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

/* ── Overlay ───────────────────────────────────────────── */
.badge-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    z-index: 200;
}

.nav-btn {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid rgba(0, 212, 255, 0.25);
    background: rgba(0, 212, 255, 0.06);
    color: rgba(0, 212, 255, 0.8);
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-btn:not(:disabled):hover {
    background: rgba(0, 212, 255, 0.14);
    border-color: rgba(0, 212, 255, 0.6);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}

.nav-btn:disabled {
    opacity: 0.15;
    cursor: not-allowed;
}

/* ── Hologramme ────────────────────────────────────────── */
.holo-stage {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.holo-close {
    position: absolute;
    top: -36px;
    right: -16px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.3);
    font-size: 16px;
    cursor: pointer;
    transition: color 0.2s;
    padding: 4px 8px;
}

.holo-close:hover { color: rgba(255, 255, 255, 0.7); }

.holo-badge {
    position: relative;
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.holo-icon {
    font-size: 6rem;
    position: relative;
    z-index: 2;
    filter:
        drop-shadow(0 0 16px rgba(0, 212, 255, 1))
        drop-shadow(0 0 40px rgba(0, 212, 255, 0.7))
        drop-shadow(0 0 80px rgba(0, 212, 255, 0.3));
    animation: holo-float 3.5s ease-in-out infinite;
}

.holo-badge--locked .holo-icon {
    filter: grayscale(1) drop-shadow(0 0 6px rgba(255,255,255,0.1));
    opacity: 0.3;
    animation: none;
}

.holo-scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 3px,
        rgba(0, 212, 255, 0.022) 3px,
        rgba(0, 212, 255, 0.022) 4px
    );
    z-index: 3;
    pointer-events: none;
    border-radius: 50%;
    animation: scan-move 6s linear infinite;
}

.holo-ring {
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    border: 1px solid rgba(0, 212, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 212, 255, 0.05);
    animation: ring-pulse 3.5s ease-in-out infinite;
    z-index: 1;
}

.holo-badge--locked .holo-ring { display: none; }

.holo-pedestal {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -8px;
}

.holo-pedestal__neck {
    width: 88px;
    height: 20px;
    background: linear-gradient(to bottom, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.06));
    clip-path: polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%);
}

.holo-pedestal__base {
    width: 136px;
    height: 12px;
    background: linear-gradient(to bottom, rgba(0, 212, 255, 0.14), rgba(0, 212, 255, 0.04));
    border-radius: 2px;
}

.holo-pedestal__glow {
    width: 180px;
    height: 10px;
    background: radial-gradient(ellipse, rgba(0, 212, 255, 0.35) 0%, transparent 70%);
    border-radius: 50%;
    margin-top: 2px;
    animation: base-glow 3.5s ease-in-out infinite;
}

.holo-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    text-align: center;
}

.holo-name {
    font-size: 20px;
    font-weight: 800;
    color: #fff;
    margin: 0;
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}

.holo-desc {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.65;
    max-width: 260px;
    margin: 0;
}

.holo-status {
    margin-top: 4px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 5px 16px;
    border-radius: 999px;
}

.status--done {
    color: #34d399;
    background: rgba(52, 211, 153, 0.08);
    border: 1px solid rgba(52, 211, 153, 0.3);
}

.status--locked {
    color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

/* ── Compteur ──────────────────────────────────────────── */
.completion-counter {
    position: fixed;
    bottom: 28px;
    right: 28px;
    font-family: var(--font-pixel);
    font-size: clamp(0.65rem, 1.3vw, 0.8rem);
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.95), rgba(59, 130, 246, 0.85));
    color: #fff;
    padding: 10px 22px;
    border-radius: 999px;
    box-shadow: 0 4px 24px rgba(124, 58, 237, 0.45);
    letter-spacing: 1.5px;
}

/* ── Animations ────────────────────────────────────────── */
@keyframes holo-float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-14px); }
}

@keyframes ring-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.9; transform: scale(1.04); }
}

@keyframes base-glow {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
}

@keyframes scan-move {
    0%   { background-position: 0 0; }
    100% { background-position: 0 80px; }
}

/* ── Transition ────────────────────────────────────────── */
.zoom-enter-active { transition: opacity 0.25s ease; }
.zoom-leave-active { transition: opacity 0.2s ease; }
.zoom-enter-from, .zoom-leave-to { opacity: 0; }

.zoom-enter-active .holo-stage {
    animation: stage-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes stage-in {
    from { transform: scale(0.65); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
}
</style>
