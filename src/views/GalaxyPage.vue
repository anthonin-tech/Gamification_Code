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

<style scoped src="./GalaxyPage.css"></style>
