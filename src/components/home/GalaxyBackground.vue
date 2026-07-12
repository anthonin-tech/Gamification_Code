<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref} from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let animId: number

interface Star {
    x: number; y: number; r: number
    opacity: number; speed: number; phase: number
}

onMounted(() => {
    const c = canvas.value!
    const ctx = c.getContext('2d')!

    const resize = () => {
        c.width = window.innerWidth
        c.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars: Star[] = Array.from({ length: 180 }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.4 + 0.3,
        opacity: Math.random() * 0.6 + 0.3,
        speed: Math.random() * 0.5 + 0.2,
        phase: Math.random() * 2 * Math.PI
    }))

    let t = 0
    const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height)
        t += 0.012

        stars.forEach(star => {
            const op = star.opacity * (0.65 + 0.35 * Math.sin( t * star.speed + star.phase ))
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
            ctx.fillStyle = `rgba(255, 255, 255, ${op})`
            ctx.fill()
        })
        animId = requestAnimationFrame(draw)
    }
    draw()

    onBeforeUnmount(() => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', resize)
    })
})
</script>

<template>
    <canvas ref="canvas" class="galaxy-canvas" aria-hidden="true" />
</template>

<style scoped src="@/assets/styles/components/Code_Home/GalaxyBackground.css"></style>