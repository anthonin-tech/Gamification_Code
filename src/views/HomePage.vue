<script lang="ts" setup>
  import { ref, computed } from 'vue'

  const cards = [
      { id: 1, type: 'python', iconSrc: '/icons/python.webp', title: 'Python', sub: 'Langage interprété, orienté objet et syntaxe épurée.' },
      { id: 2, type: 'javascript', iconSrc: '/icons/javascript.svg', title: 'JavaScript', sub: 'Langage, script, dynamique.' },
      { id: 3, type: 'angular', iconSrc: '/icons/angular.webp', title: 'Angular', sub: 'Framework JavaScript Google Open Source.' },
      { id: 4, type: 'cpp', iconSrc: '/icons/cpp.webp', title: 'C++', sub: 'Compilé, orienté objet et performant.' },
      { id: 5, type: 'php', iconSrc: '/icons/php.webp', title: 'PHP', sub: 'Langage de script côté serveur, conçu pour créer des pages web dynamiques.' },
      { id: 6, type: 'vue', iconSrc: '/icons/vue.webp', title: 'Vue', sub: 'Framework JavaScript progressif, léger et réactif.' },
      { id: 7, type: 'react', iconSrc: '/icons/react.webp', title: 'React', sub: 'Bibliothèque, JavaScript, composables.' },
  ]

  const isPaused = ref(false)
  const trackRef = ref(null)

  const displayedCards = computed(() => 
    [...cards, ...cards.map(c => ({ ...c, id: c.id + '_clone' }))]
  )

</script>

<template>
  <main class="page">
    <h1 class="page-title">CodeQuest</h1>
  </main>
  <div class="carousel-wrapper">
    <div class="carousel-viewport">
      <div 
        class="carousel-track"
        :class="{ paused: isPaused }"
        ref="trackRef"
        @mouseover="isPaused = true"
        @mouseout="isPaused = false"
      >
        <div 
          v-for="card in displayedCards"
          :key="card.id"
          :class="['card', `card--${card.type}`]"
        >
          <div class="icon">
            <img class="icon-img" :src="card.iconSrc" :alt="`${card.title} icon`" />
          </div>
          <div class="content">
            <div class="title">{{ card.title }}</div>
            <div class="sub">{{ card.sub }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/styles/pages/home.css"></style>
