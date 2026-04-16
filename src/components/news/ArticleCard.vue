<script setup lang="ts">
  import { computed } from 'vue'
  import type { Article } from '@/types/article'

  const props = defineProps<{
    article: Article
  }>()

  const truncatedSummary = computed(() => {
    if (!props.article.summary) return ''
    return props.article.summary.length > 150 ? props.article.summary.substring(0, 150) + '...' : props.article.summary
  })

  const formattedDate = computed(() => {
    return new Date(props.article.publishedAt).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  })

  const categoryColors: Record<string, string> = {
    'JavaScript': '#f0db4f', 'TypeScript': '#3178c6', 'Vue.js':    '#42b883',
    'React':      '#61dafb', 'Python':     '#3776ab', 'Rust':      '#ce422b',
    'Go':         '#00add8', 'CSS / Web':  '#2965f1', 'DevOps':    '#ff6b35',
    'Base de données': '#4db33d', 'Open Source': '#8b5cf6', 'Général': '#6b7280',
  }

  const categoryColor = computed(() => categoryColors[props.article.category] || '#6b7280')

  const categoryIcons: Record<string, string> = {
    'JavaScript': '⚡', 'TypeScript': '🔷', 'Vue.js': '💚', 'React': '⚛️',
    'Python': '🐍', 'Rust': '🦀', 'Go': '🐹', 'CSS / Web': '🎨',
    'DevOps': '🐳', 'Base de données': '🍃', 'Open Source': '🔓', 'Général': '📰',
  }

  const categoryIcon = computed(() => categoryIcons[props.article.category] || '📰')

  const handleImageError = (e: Event) => {
    const img = e.target as HTMLImageElement
    img.style.display = 'none'
  }
</script>

<template>
  <a 
    :href="article.link"
    target="_blank"
    rel="noopener noreferrer"
    class="article-card"
  >
    <div class="card-image">
      <img
        v-if="article.imageUrl"
        :src="article.imageUrl"
        :alt="article.title"
        loading="lazy"
        @error="handleImageError"
      />
      <div v-else class="card-image-placeholder">
        <span>{{ categoryIcon }}</span>
      </div>
    </div>

    <div class="card-body">
      <span class="card-category" :style="{ backgroundColor: categoryColor }">
        {{ article.category }}
      </span>

      <h3 class="card-title">{{ article.title }}</h3>

      <p class="card-summary">{{ truncatedSummary }}</p>

      <div class="card-meta">
        <span class="card-source">{{ article.source }}</span>
        <span class="card-date">{{ formattedDate }}</span>
      </div>

      <div v-if="article.tags.length" class="card-tags">
        <span
          v-for="tag in article.tags.slice(0, 3)"
          :key="tag"
          class="tag"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>

<style src="@/assets/styles/components/articlecard.css"></style>
