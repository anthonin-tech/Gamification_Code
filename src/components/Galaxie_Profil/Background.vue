<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null

class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.3
  }

  update(): void {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > this.canvas.width) this.x = 0
    if (this.x < 0) this.x = this.canvas.width
    if (this.y > this.canvas.height) this.y = 0
    if (this.y < 0) this.y = this.canvas.height
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const initParticles = (): void => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles: Particle[] = []
  const particleCount = 100

  for (let i = 0; i < particleCount; i += 1) {
    particles.push(new Particle(canvas))
  }

  const animate = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach((particle) => {
      particle.update()
      particle.draw(ctx)
    })
    animationId = requestAnimationFrame(animate)
  }

  animate()
}

const handleResize = (): void => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  initParticles()
}

onMounted(() => {
  nextTick(() => {
    initParticles()
  })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
    <div class="background">
        <canvas ref="canvasRef" class="particle-canvas" />
    </div>
</template>

<style src="../../assets/styles/components/Galaxie_Profil/Background.css"></style>
