<script setup lang="ts">
// Pre-generate all random values at setup time (not on every render)
const STAR_COUNT   = 150
const METEOR_COUNT = 3

const stars = Array.from({ length: STAR_COUNT }, () => ({
  top:      Math.random() * 100,
  left:     Math.random() * 100,
  size:     Math.random() * 2.5 + 0.5,
  delay:    Math.random() * 6,
  duration: Math.random() * 3 + 2,
  opacity:  Math.random() * 0.7 + 0.3,
}))

const meteors = Array.from({ length: METEOR_COUNT }, (_, i) => ({
  top:   Math.random() * 40,
  left:  Math.random() * 80,
  delay: i * 9 + Math.random() * 6,
}))
</script>

<template>
  <div class="space-bg">
    <!-- Deep space radial gradient -->
    <div class="space-base" />

    <!-- Star field -->
    <div class="star-field">
      <div
        v-for="(star, i) in stars"
        :key="`s${i}`"
        class="star"
        :style="{
          top:               `${star.top}%`,
          left:              `${star.left}%`,
          width:             `${star.size}px`,
          height:            `${star.size}px`,
          opacity:           star.opacity,
          animationDelay:    `${star.delay}s`,
          animationDuration: `${star.duration}s`,
        }"
      />
    </div>

    <!-- Shooting meteors -->
    <div
      v-for="(m, i) in meteors"
      :key="`m${i}`"
      class="meteor"
      :style="{ top: `${m.top}%`, left: `${m.left}%`, animationDelay: `${m.delay}s` }"
    />

    <!-- Nebulae -->
    <div class="nebula nebula-purple" />
    <div class="nebula nebula-blue"   style="animation-delay:2s;animation-duration:28s" />
    <div class="nebula nebula-pink"   style="animation-delay:4s;animation-duration:33s" />
    <div class="nebula nebula-cyan"   style="animation-delay:7s;animation-duration:38s" />
  </div>
</template>

<style scoped>
.space-bg {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.space-base {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, #1a0b2e 0%, #0f0420 35%, #000 100%);
}

/* Stars */
.star-field { position: absolute; inset: 0; }

@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.15; transform: scale(0.6); }
}
.star {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  animation: twinkle linear infinite;
}

/* Shooting stars */
@keyframes meteor {
  0%   { transform: rotate(-42deg) translateX(0); opacity: 1; }
  80%  { opacity: 0.8; }
  100% { transform: rotate(-42deg) translateX(900px); opacity: 0; }
}
.meteor {
  position: absolute;
  width: 2px;
  height: 120px;
  background: linear-gradient(to bottom, #fff 0%, rgba(147,210,251,0.6) 40%, transparent 100%);
  opacity: 0;
  animation: meteor 3.5s ease-out infinite;
}

/* Nebulae */
@keyframes drift {
  0%, 100% { transform: translate(0,0) scale(1); }
  33%       { transform: translate(30px,-25px) scale(1.05); }
  66%       { transform: translate(-20px,30px) scale(0.96); }
}
.nebula {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  animation: drift 22s ease-in-out infinite;
}
.nebula-purple { top: 5%;  right: 10%; width: 700px; height: 700px; background: rgba(147,51,234,0.22); }
.nebula-blue   { bottom: 5%; left: 8%; width: 600px; height: 600px; background: rgba(59,130,246,0.2); }
.nebula-pink   { top: 40%; left: 30%; width: 500px; height: 500px; background: rgba(236,72,153,0.14); }
.nebula-cyan   { bottom: 20%; right: 25%; width: 450px; height: 450px; background: rgba(34,211,238,0.12); }
</style>
