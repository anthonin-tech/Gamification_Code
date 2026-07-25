<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { Vector3, Group } from 'three'
import { makePatternTexture, buildAccessories } from '@/utils/avatarScene'
import { useXP } from '@/composables/useXP'

const userStore = useUserStore()
const router = useRouter()
const { currentLevel } = useXP()

const RING_LEVELS = [
    { c: '#3b82f6' }, { c: '#06b6d4' }, { c: '#14b8a6' }, { c: '#22c55e' },
    { c: '#a3e635' }, { c: '#facc15' }, { c: '#fb923c' }, { c: '#f43f5e' },
    { c: '#c084fc' }, { c: '#fbbf24' },
]
const ringIndex = computed(() => Math.min(Math.floor((currentLevel.value - 1) / 5), RING_LEVELS.length - 1))
const camPosition   = new Vector3(0, 3.5, 7)
const lightPosition = new Vector3(0, 6, 4)
const { state } = useGLTF('/avatar-codequest.glb')
const modelScene = computed(() => state.value?.scene ?? null)

const accGroups: Record<string, Group> = {}

function setMaterialColor(name: string, color: string) {
    modelScene.value?.traverse((obj: any) => {
        if (obj.isMesh && obj.material?.name === name) {
            obj.material.color.set(color); obj.material.needsUpdate = true
        }
    })
}

function applyRings() {
    const color = RING_LEVELS[ringIndex.value].c
    modelScene.value?.traverse((obj: any) => {
        if (obj.name === 'AnneauxEnergie') {
            obj.traverse((child: any) => {
                if (!child.isMesh) return
                const mats = Array.isArray(child.material) ? child.material : [child.material]
                mats.forEach((m: any) => {
                    m.color.set(color)
                    if ('emissive' in m) { m.emissive.set(color); m.emissiveIntensity = 1.1 }
                    m.transparent = true; m.needsUpdate = true
                })
            })
        }
        if (obj.isMesh && obj.material?.name === 'Yeux.002') {
            obj.material.color.set(color)
            if ('emissive' in obj.material) { obj.material.emissive.set(color); obj.material.emissiveIntensity = 0.9 }
            obj.material.needsUpdate = true
        }
    })
}

function applyAll() {
    const { corpsColor, accentColor, casqueColor, pattern, accessories } = userStore.avatarCustomization
    setMaterialColor('Bleu.002', accentColor)
    setMaterialColor('Noir.002', casqueColor)
    modelScene.value?.traverse((obj: any) => {
        if (obj.isMesh && obj.material?.name === 'Couleur Violet.003') {
            if (pattern === 'Aucun') {
                obj.material.map = null
                obj.material.color.set(corpsColor)
            } else {
                obj.material.map = makePatternTexture(corpsColor, accentColor, pattern)
                obj.material.color.set('#ffffff')
            }
            obj.material.needsUpdate = true
        }
        if (obj.name === 'Fusée' || obj.name === 'Bout_de_fusée') obj.visible = accessories.fusee
    })
    Object.entries(accGroups).forEach(([k, g]) => {
        g.visible = (accessories as any)[k] ?? false
    })
}

let ringsNode: any = null
let persoNode: any = null
let persoBaseY: number | null = null

watch(modelScene, (scene) => {
    if (!scene) return
    scene.traverse((obj: any) => {
        if (obj.name === 'AnneauxEnergie') { ringsNode = obj; obj.visible = true }
        if (obj.name === 'PersonnageVolant') { persoNode = obj; persoBaseY = obj.position.y }
    })
    buildAccessories(scene, accGroups)
    applyAll()
    applyRings()
}, { immediate: true })

watch(() => userStore.avatarCustomization, () => {
    if (modelScene.value) applyAll()
}, { deep: true })

watch(ringIndex, () => {
    if (modelScene.value) applyRings()
})

let frameId = 0
const startTime = Date.now()

function tick() {
    const t = (Date.now() - startTime) / 1000
    if (persoNode && persoBaseY !== null) {
        persoNode.position.y = persoBaseY + Math.sin(t * 1.4) * 0.12
        persoNode.rotation.z = Math.sin(t * 1.1) * 0.02
    }
    if (ringsNode?.children.length > 0) {
        const yBot = -0.5, yTop = 0.85, n = ringsNode.children.length
        ringsNode.children.forEach((r: any, i: number) => {
            const p = ((t * 0.9) + i / n) % 1
            r.position.y = yBot + (yTop - yBot) * p
            const s = 0.12 + p * 0.62; r.scale.set(s, s, s)
            r.traverse((m: any) => {
                if (m.material) {
                    const mats = Array.isArray(m.material) ? m.material : [m.material]
                    mats.forEach((mm: any) => { mm.opacity = Math.min(1, (1 - p) * 1.6) })
                }
            })
        })
    }
    frameId = requestAnimationFrame(tick)
}

onMounted(() => { frameId = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(frameId))
</script>

<template>
    <div class="avatar-preview" @click="router.push('/avatar')">
        <TresCanvas :renderer-options="{ alpha: true }">
            <TresPerspectiveCamera :position="camPosition" />
            <TresAmbientLight :intensity="1.2" />
            <TresPointLight :position="lightPosition" :intensity="25" />
            <primitive v-if="modelScene" :object="modelScene" />
        </TresCanvas>
    </div>
</template>

<style scoped>
.avatar-preview {
    width: 100%;
    height: 100%;
    cursor: pointer;
}
</style>
