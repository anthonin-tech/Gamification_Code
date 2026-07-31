<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { Vector3, Group } from 'three'
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import { makePatternTexture, buildAccessories, buildStarfield, buildSocle, setupCasque, createAnimLoop } from '@/utils/avatarScene'
import { useXP } from '@/composables/useXP'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
const { state } = useGLTF('/avatar-codequest.glb')
const modelScene = computed(() => state.value?.scene ?? null)
const { currentLevel } = useXP()

const { state: casqueState } = useGLTF('/personnage-codequest.glb')
const casqueGLBScene = computed(() => casqueState.value?.scene ?? null)

const camPosition   = new Vector3(0, 4, 10)
const lightPosition = new Vector3(0, 6, 4)
let isDragging = false
let prevX = 0

function onMouseDown(e: MouseEvent) { isDragging = true; prevX = e.clientX }
function onMouseMove(e: MouseEvent) {
    if (!isDragging || !modelScene.value) return
    const delta = e.clientX - prevX
    modelScene.value.rotation.y += delta * 0.01
    prevX = e.clientX
}
function onMouseUp() { isDragging = false }

const currentCorpsColor  = ref(userStore.avatarCustomization.corpsColor)
const currentAccentColor = ref(userStore.avatarCustomization.accentColor)
const currentCasqueColor = ref(userStore.avatarCustomization.casqueColor)

const PALETTE_CORPS  = [
    { c: '#7c4dff', lvl: 1  }, { c: '#14a7cc', lvl: 5  }, { c: '#ff5d8f', lvl: 10 },
    { c: '#22c55e', lvl: 15 }, { c: '#f59e0b', lvl: 20 }, { c: '#e8ecf5', lvl: 25 },
    { c: '#1e2636', lvl: 30 },
]
const PALETTE_ACCENT = [
    { c: '#14a7cc', lvl: 1  }, { c: '#7c4dff', lvl: 5  }, { c: '#ff5d8f', lvl: 10 },
    { c: '#22c55e', lvl: 15 }, { c: '#f59e0b', lvl: 20 }, { c: '#ff6600', lvl: 25 },
    { c: '#ffffff', lvl: 30 },
]
const PALETTE_CASQUE = [
    { c: '#1a1a2e', lvl: 1  }, { c: '#2d2d44', lvl: 5  }, { c: '#4a4a6a', lvl: 10 },
    { c: '#6b6b9a', lvl: 15 }, { c: '#8888bb', lvl: 20 }, { c: '#aaaacc', lvl: 25 },
    { c: '#ffffff', lvl: 30 },
]

function setMaterialColor(name: string, color: string) {
    modelScene.value?.traverse((obj: any) => {
        if (obj.isMesh && obj.material?.name === name) {
            obj.material.color.set(color); obj.material.needsUpdate = true
        }
    })
}

const PATTERNS = ['Aucun', 'Rayures', 'Points', 'Chevrons', 'Circuit'] as const
type Pattern = typeof PATTERNS[number]
const currentPattern = ref<Pattern>(userStore.avatarCustomization.pattern as Pattern)

const PATTERN_LEVELS: Record<string, number> = {
    Aucun: 1, Rayures: 5, Points: 10, Chevrons: 20, Circuit: 30,
}

function changeCorps(color: string) {
    currentCorpsColor.value = color
    if (currentPattern.value !== 'Aucun') { applyPattern(); return }
    setMaterialColor('Couleur Violet.003', color)
}

function changeAccent(color: string) {
    currentAccentColor.value = color
    setMaterialColor('Bleu.002', color)
    if (currentPattern.value !== 'Aucun') applyPattern()
}

function applyPattern() {
    modelScene.value?.traverse((obj: any) => {
        if (obj.isMesh && obj.material?.name === 'Couleur Violet.003') {
            if (currentPattern.value === 'Aucun') {
                obj.material.map = null; obj.material.color.set(currentCorpsColor.value)
            } else {
                obj.material.map = makePatternTexture(currentCorpsColor.value, currentAccentColor.value, currentPattern.value)
                obj.material.color.set('#ffffff')
            }
            obj.material.needsUpdate = true
        }
    })
}

const currentPose = ref<'debout' | 'volant'>('volant')

function togglePose(pose: 'debout' | 'volant') {
    currentPose.value = pose
    modelScene.value?.traverse((obj: any) => {
        if (obj.name === 'AnneauxEnergie') obj.visible = pose === 'volant'
    })
}

const RING_LEVELS = [
    { c: '#3b82f6', r: 'Novice'      }, { c: '#06b6d4', r: 'Apprenti'    },
    { c: '#14b8a6', r: 'Codeur'      }, { c: '#22c55e', r: 'Explorateur' },
    { c: '#a3e635', r: 'Bâtisseur'   }, { c: '#facc15', r: 'Tacticien'   },
    { c: '#fb923c', r: 'Expert'      }, { c: '#f43f5e', r: 'Maître'      },
    { c: '#c084fc', r: 'Champion'    }, { c: '#fbbf24', r: 'Légende'     },
]
const ringIndex = computed(() => Math.min(Math.floor((currentLevel.value - 1) / 5), RING_LEVELS.length - 1))

function applyRings() {
    const lvl = RING_LEVELS[ringIndex.value]
    modelScene.value?.traverse((obj: any) => {
        if (obj.name === 'AnneauxEnergie') {
            obj.traverse((child: any) => {
                if (!child.isMesh) return
                const mats = Array.isArray(child.material) ? child.material : [child.material]
                mats.forEach((m: any) => {
                    m.color.set(lvl.c)
                    if ('emissive' in m) { m.emissive.set(lvl.c); m.emissiveIntensity = 1.1 }
                    m.transparent = true; m.needsUpdate = true
                })
            })
        }
        if (obj.isMesh && obj.material?.name === 'Yeux.002') {
            obj.material.color.set(lvl.c)
            if ('emissive' in obj.material) { obj.material.emissive.set(lvl.c); obj.material.emissiveIntensity = 0.9 }
            obj.material.needsUpdate = true
        }
    })
}

const ACC_LIST = [
    { key: 'fusee',    label: 'Fusée',               lvl: 1, badge: 1, badgeName: 'Premier pas' },
    { key: 'lunettes', label: 'Lunettes',            lvl: 2, badge: 2, badgeName: 'Première leçon' },
    { key: 'couronne', label: 'Couronne',            lvl: 4, badge: 3, badgeName: 'Décollage confirmé' },
    { key: 'casque',   label: "Casque d'astronaute", lvl: 6, badge: 4, badgeName: 'Astronaute confirmé' },
    { key: 'systeme',  label: 'Système solaire',     lvl: 8, badge: 5, badgeName: 'Première mission' },
] as const

const unlockMsg = ref('')
let unlockTimer = 0
function showUnlock(text: string) {
    unlockMsg.value = text
    clearTimeout(unlockTimer)
    unlockTimer = window.setTimeout(() => { unlockMsg.value = '' }, 3000)
}

function isUnlocked(lvl: number, badge: number): boolean {
    return currentLevel.value >= lvl || userStore.badges.includes(badge)
}

const accGroups: Record<string, Group> = {}
const accState  = ref({ ...userStore.avatarCustomization.accessories })
const sceneNodes: Record<string, any> = {}
const accBaseY:   Record<string, number> = {}
let persoBaseY: number | null = null

watch(modelScene, (scene) => {
    if (!scene) return
    scene.traverse((obj: any) => { if (obj.name) sceneNodes[obj.name] = obj })
    const perso = sceneNodes['PersonnageVolant']
    if (perso) persoBaseY = perso.position.y
    buildAccessories(scene, accGroups)
    Object.entries(accGroups).forEach(([k, g]) => { accBaseY[k] = (g as any).position.y })
    setupCasque(scene, casqueGLBScene.value, accGroups, accBaseY)

    setMaterialColor('Bleu.002', currentAccentColor.value)
    setMaterialColor('Noir.002', currentCasqueColor.value)
    if (currentPattern.value !== 'Aucun') {
        applyPattern()
    } else {
        setMaterialColor('Couleur Violet.003', currentCorpsColor.value)
    }
    const acc = accState.value
    scene.traverse((obj: any) => {
        if (obj.name === 'Fusée' || obj.name === 'Bout_de_fusée') obj.visible = acc.fusee
    })
    Object.entries(accGroups).forEach(([k, g]) => {
        g.visible = (acc as any)[k] ?? false
    })
    applyRings()
}, { immediate: true })

watch(casqueGLBScene, (helmetScene) => {
    if (modelScene.value) setupCasque(modelScene.value, helmetScene, accGroups, accBaseY)
}, { immediate: true })

watch(ringIndex, () => applyRings())

function toggleAccessoire(key: keyof typeof accState.value) {
    const acc = ACC_LIST.find(a => a.key === key)
    if (acc && !isUnlocked(acc.lvl, acc.badge)) return
    accState.value[key] = !accState.value[key]
    const val = accState.value[key]
    if (key === 'fusee') {
        modelScene.value?.traverse((obj: any) => {
            if (obj.name === 'Fusée' || obj.name === 'Bout_de_fusée') obj.visible = val
        })
    } else if (accGroups[key]) {
        accGroups[key].visible = val
    }
}

const anim = createAnimLoop({
    getPose:       () => currentPose.value,
    getPersoBaseY: () => persoBaseY,
    sceneNodes,
    accGroups,
    accBaseY,
    startTime: Date.now(),
})

const starsRef = buildStarfield()
const socleRef = buildSocle()

onMounted(() => anim.start())
onUnmounted(() => anim.stop())

let saveTimer: ReturnType<typeof setTimeout> | null = null

function saveCurrentAvatar() {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
        userStore.saveAvatarCustomization({
            corpsColor: currentCorpsColor.value,
            accentColor: currentAccentColor.value,
            casqueColor: currentCasqueColor.value,
            pattern: currentPattern.value,
            accessories: { ...accState.value }
        })
    }, 800)
}

function handleCorpsClick(color: { c: string, lvl: number }) {
    if (currentLevel.value < color.lvl) { 
        showUnlock('Niveau ' + color.lvl + ' requis')
        return 
    }
    changeCorps(color.c)
    saveCurrentAvatar()
}
function handleAccentClick(color: { c: string, lvl: number }) {
    if (currentLevel.value < color.lvl) { 
        showUnlock('Niveau ' + color.lvl + ' requis') 
        return
    }
    changeAccent(color.c)
    saveCurrentAvatar()
}
function handleCasqueClick(color: { c: string, lvl: number }) {
    if (currentLevel.value < color.lvl) { 
        showUnlock('Niveau ' + color.lvl + ' requis')
        return 
    }
    setMaterialColor('Noir.002', color.c)
    currentCasqueColor.value = color.c
    saveCurrentAvatar()
}

function handlePatternClick(pat: Pattern) {
    if (currentLevel.value < PATTERN_LEVELS[pat]) {
        showUnlock('Niveau ' + PATTERN_LEVELS[pat] + ' requis')
        return
    }
    currentPattern.value = pat
    applyPattern()
    saveCurrentAvatar()
}

function handleAccClick(acc: typeof ACC_LIST[number]) {
    if (!userStore.badges.includes(acc.badge)) {
        showUnlock('Badges ' + acc.badgeName + ' requis')
        return
    }
    toggleAccessoire(acc.key)
    saveCurrentAvatar()
}
</script>

<template>
    <div class="avatar-page">
        <div class="avatar-scene">
            <TresCanvas
                @mousedown="onMouseDown"
                @mousemove="onMouseMove"
                @mouseup="onMouseUp"
            >
                <TresPerspectiveCamera :position="camPosition" :look-at="[0, 3, 0]" />
                <TresAmbientLight :intensity="1" />
                <TresPointLight :position="lightPosition" :intensity="30" color="#ffffff" />
                <primitive :object="starsRef" />
                <primitive :object="socleRef" />
                <primitive v-if="modelScene" :object="modelScene" />
            </TresCanvas>
        </div>

        <div class="avatar-panel">
            <p>Pose</p>
            <div class="chips">
                <button class="chip" :class="{ active: currentPose === 'debout' }" @click="togglePose('debout')">Debout</button>
                <button class="chip" :class="{ active: currentPose === 'volant' }" @click="togglePose('volant')">Volant</button>
            </div>

            <p>Corps</p>
            <div class="color-swatches">
                <button v-for="color in PALETTE_CORPS" :key="color.c" :style="{ background: color.c }"
                    :class="{ locked: currentLevel < color.lvl }"
                    @click="handleCorpsClick(color)" />
            </div>

            <p>Accent</p>
            <div class="color-swatches">
                <button v-for="color in PALETTE_ACCENT" :key="color.c" :style="{ background: color.c }"
                    :class="{ locked: currentLevel < color.lvl }"
                    @click="handleAccentClick(color)" />
            </div>

            <p>Casque</p>
            <div class="color-swatches">
                <button v-for="color in PALETTE_CASQUE" :key="color.c" :style="{ background: color.c }"
                    :class="{ locked: currentLevel < color.lvl }"
                    @click="handleCasqueClick(color)" />
            </div>

            <p>Motif du corps</p>
            <div class="chips">
                <button v-for="pat in PATTERNS" :key="pat" class="chip"
                    :class="{ active: currentPattern === pat, locked: currentLevel < PATTERN_LEVELS[pat] }"
                    @click="handlePatternClick(pat)">{{ pat }}</button>
            </div>

            <p>Accessoires</p>
            <div class="acc-list">
                <div v-for="acc in ACC_LIST" :key="acc.key"
                    class="acc-toggle" :class="{ locked: !userStore.badges.includes(acc.badge) }"
                    @click="handleAccClick(acc)">
                    <span>{{ acc.label }}</span>
                    <button class="toggle-btn"
                        :class="{ on: accState[acc.key] }"
                        @click.stop="handleAccClick(acc)" />
                </div>
            </div>

            <div v-if="unlockMsg" class="unlock-toast">🔒 {{ unlockMsg }}</div>

            <p>Niveau — Anneaux</p>
            <div class="level-head">
                <div class="level-num">{{ currentLevel }}<small>/10</small></div>
                <div class="rank-label">rang<br><b>{{ RING_LEVELS[ringIndex].r }}</b></div>
            </div>
            <div class="level-track">
                <div v-for="(_, i) in RING_LEVELS" :key="i" class="level-seg"
                    :style="{ background: i <= ringIndex ? RING_LEVELS[ringIndex].c : 'rgba(255,255,255,0.1)' }" />
            </div>
            <span class="level-note">Les anneaux changent de couleur à chaque niveau. Choisis « Volant » pour les voir.</span>
        </div>
    </div>
</template>

<style scoped src="./AvatarPage.css"></style>
