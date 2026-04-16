<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import CategoryFilter from '@/components/news/CategoryFilter.vue'
import ArticleCard from '@/components/news/ArticleCard.vue'
import CodeTypingAnimation from '@/components/home/CodeTypingAnimation.vue'
import type { ArticlesResponse } from '@/types'
import { API_BASE_URL } from '@/utils/constants'


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

  const displayedCards = computed(() => 
    [...cards, ...cards.map(c => ({ ...c, id: c.id + '_clone' }))]
  )

  const selectedCategory = ref('Tous')
  const searchQuery      = ref('')
  const currentPage      = ref(1)

  function useDebounceFn<TArgs extends unknown[]>(fn: (...args: TArgs) => void, delayMs: number) {
    let timeoutId: number | undefined
    return (...args: TArgs) => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => fn(...args), delayMs)
    }
  }

  const debouncedSearch = useDebounceFn(() => {
    currentPage.value = 1
    void fetchArticles()
  }, 400)

  watch(selectedCategory, () => {
    currentPage.value = 1
    void fetchArticles()
  })

  const data = ref<ArticlesResponse | null>(null)
  const pending = ref(false)
  const error = ref<unknown>(null)

  const apiBaseUrl = API_BASE_URL

  const fetchArticles = async () => {
    pending.value = true
    error.value = null

    try {
      const params = new URLSearchParams()
      params.set('category', selectedCategory.value)
      params.set('page', String(currentPage.value))
      params.set('limit', '12')
      if (searchQuery.value.trim()) params.set('search', searchQuery.value.trim())

      const res = await fetch(`${apiBaseUrl}/api/articles?${params.toString()}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = (await res.json()) as ArticlesResponse
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const refresh = () => fetchArticles()

  watch(currentPage, () => {
    void fetchArticles()
  })

  void fetchArticles()
</script>

<template>
  <main class="page">
    <section class="home-intro" aria-label="Intro">
      <div class="intro-hero">
        <div class="intro-copy">
          <h1 class="page-title">CodeQuest</h1>
          <p class="intro-subtitle">
            Monte de niveau en dev : découvre les technos, lis les news, et progresse chaque jour.
          </p>

          <div class="intro-actions" role="navigation" aria-label="Actions rapides">
            <a class="btn btn--primary" href="#news">Voir les news</a>
          </div>

          <div class="intro-features" aria-label="Points forts">
            <div class="feature">
              <div class="feature-title">Apprendre</div>
              <div class="feature-sub">Des repères clairs, des technos, des sujets.</div>
            </div>
            <div class="feature">
              <div class="feature-title">Suivre</div>
              <div class="feature-sub">Les actus filtrées par catégories.</div>
            </div>
            <div class="feature">
              <div class="feature-title">Progresser</div>
              <div class="feature-sub">XP, quêtes, objectifs (bientôt).</div>
            </div>
          </div>
        </div>

        <section class="home-section home-section--code" aria-label="Animation de code">
          <CodeTypingAnimation />
        </section>
      </div>

      <section id="carousel" class="home-section home-section--carousel" aria-label="Technologies">
        <div class="carousel-wrapper">
          <div class="carousel-viewport">
            <div 
              class="carousel-track"
              :class="{ paused: isPaused }"
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
      </section>
    </section>

    <section id="news" class="home-section home-section--news" aria-label="Actualités">
      <header class="hero">
        <h2 class="hero-title">
          <span class="accent">Tech</span>News
        </h2>
        <p class="hero-subtitle">
          Les dernières actualités sur les langages de programmation
        </p>

        <div class="search-bar">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un article..."
            class="search-input"
            @input="debouncedSearch"
          />
        </div>
      </header>

      <CategoryFilter v-model="selectedCategory" />
    </section>

    <div class="stats" v-if="data">
      <span>{{ data.pagination.total }} articles</span>
      <span>.</span>
      <span>Sources surveillées via serveur</span>
    </div>

    <div v-if="pending" class="loading-grid">
      <div v-for="i in 12" :key="i"
      class="skeleton-card" />
    </div>

    <div v-else-if="error" class="error-state">
      <p> Erreur lors du chargement.
        <button @click="refresh()">Réessayer</button>
      </p>
    </div>

    <div v-else-if="data?.articles.length === 0"
    class="empty-state">
      <p>Aucun article trouvé ce filtre.</p>
    </div>

    <div v-else class="article-grid">
      <ArticleCard
        v-for="article in data?.articles ?? []"
        :key="article._id"
        :article="article"
      />
    </div>

    <div v-if="data && data.pagination.totalPages > 1" class="pagination">
      <button :disabled="!data.pagination.hasPrev || currentPage <= 1" @click="currentPage = Math.max(1, currentPage - 1)" class="page-btn">
        ← Précédent
      </button>
      <span class="page-info">Page {{ currentPage }} /{{ data.pagination.totalPages }}</span>
      <button :disabled="!data.pagination.hasNext || currentPage >= data.pagination.totalPages" @click="currentPage = Math.min(data.pagination.totalPages, currentPage + 1)" class="page-btn">
         Suivant →
      </button>
    </div>
  </main>
</template>

<style scoped src="@/assets/styles/pages/home.css"></style>


