<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import CategoryFilter from '@/components/news/CategoryFilter.vue'
import ArticleCard from '@/components/news/ArticleCard.vue'
import GalaxyBackground from '@/components/home/GalaxyBackground.vue'
import type { ArticlesResponse } from '@/types'
import { API_BASE_URL } from '@/utils/constants'

  const cards = [
      { id: 1, type: 'python', iconSrc: '/icons/python.webp', title: 'Python', sub: 'Langage interprété, orienté objet et syntaxe épurée.' },
      { id: 2, type: 'javascript', iconSrc: '/icons/javascript.svg', title: 'JavaScript', sub: 'Langage de script dynamique pour le web.' },
      { id: 3, type: 'java', iconSrc: '/icons/java.png', title: 'Java', sub: 'Langage orienté objet, robuste et portable.' },
      { id: 4, type: 'csharp', iconSrc: '/icons/csharp.png', title: 'C#', sub: 'Langage moderne pour le développement .NET.' },
      { id: 5, type: 'php', iconSrc: '/icons/php.webp', title: 'PHP', sub: 'Langage de script côté serveur pour le web dynamique.' },
      { id: 6, type: 'rust', iconSrc: '/icons/rust.png', title: 'Rust', sub: 'Langage système performant et sécurisé.' },
      { id: 7, type: 'go', iconSrc: '/icons/go.png', title: 'Go', sub: 'Langage de programmation simple et efficace pour les systèmes distribués.' },
      { id: 8, type: 'typescript', iconSrc: '/icons/typescript.png', title: 'TypeScript', sub: 'Superset de JavaScript avec typage statique.' },
      { id: 9, type: 'cpp', iconSrc: '/icons/cpp.webp', title: 'C++', sub: 'Langage de programmation puissant pour les applications performantes.' },

  ]

  const currentIndex = ref(0)
  let autoTimer: ReturnType<typeof setInterval> | null = null

  function prevPlanet() {
    currentIndex.value = (currentIndex.value - 1 + cards.length) % cards.length
    resetTimer()
  }
  function nextPlanet() {
    currentIndex.value = (currentIndex.value + 1) % cards.length
    resetTimer()
  }

  function resetTimer() {
    if (autoTimer) clearInterval(autoTimer)
    autoTimer = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % cards.length
    }, 3000)
  }

  onMounted(() => { resetTimer() })
  onBeforeUnmount(() => { if (autoTimer) clearInterval(autoTimer) })

  const currentCard = computed(() => cards[currentIndex.value])

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
  <GalaxyBackground />

  <div class="deco-planet-wrapper" aria-hidden="true">
    <div class="deco-planet" />
  </div>

  <main class="page">
    <section class="home-intro" aria-label="Intro">

      <div class="intro-hero">
        <div class="intro-copy">

          <!-- Badge eyebrow -->
          <div class="hero-badge">
            <span class="hero-badge-pulse"></span>
            Gamification du développement
          </div>

          <!-- Titre principal -->
          <h1 class="page-title">CodeQuest</h1>

          <!-- Accroche courte -->
          <p class="hero-tagline">
            Explore. Apprends. <span class="hero-tagline-accent">Level&nbsp;up.</span>
          </p>

          <!-- Description -->
          <p class="intro-subtitle">
            Découvre les technologies, suis les actus dev en temps réel<br class="br-desktop" />
            et progresse chaque jour grâce à la gamification.
          </p>

          <!-- CTA -->
          <div class="intro-actions">
            <a class="btn btn--primary" href="#carousel">Explorer les technos</a>
            <a class="btn btn--ghost" href="#news">Voir les news</a>
          </div>

          <!-- Strip de stats minimaliste -->
          <div class="hero-strip">
            <span class="hero-strip-item">
              <span class="hero-strip-value">9</span> technologies
            </span>
            <span class="hero-strip-sep">·</span>
            <span class="hero-strip-item">Actus en temps réel</span>
            <span class="hero-strip-sep">·</span>
            <span class="hero-strip-item">XP &amp; quêtes <span class="hero-strip-soon">bientôt</span></span>
          </div>

        </div>
      </div>

      <!-- Carrousel : une planète à la fois -->
      <section id="carousel" class="home-section home-section--carousel" aria-label="Technologies">
        <div class="planet-carousel">
          <button class="planet-nav planet-nav--prev" @click="prevPlanet" aria-label="Planète précédente">‹</button>

          <div class="planet-stage">
            <Transition name="planet-fade" mode="out-in">
              <div class="planet-single" :key="currentCard.type">
                <div class="planet-orbit">
                  <div :class="['planet-sphere', `planet--${currentCard.type}`]">
                    <img class="planet-icon" :src="currentCard.iconSrc" :alt="currentCard.title" />
                  </div>
                </div>
                <div class="planet-label">{{ currentCard.title }}</div>
                <div class="planet-desc">{{ currentCard.sub }}</div>
              </div>
            </Transition>
          </div>

          <button class="planet-nav planet-nav--next" @click="nextPlanet" aria-label="Planète suivante">›</button>
        </div>

        <!-- Points de navigation -->
        <div class="planet-dots" role="tablist" aria-label="Navigation planètes">
          <button
            v-for="(card, i) in cards"
            :key="card.id"
            class="planet-dot"
            :class="{ 'planet-dot--active': i === currentIndex }"
            @click="currentIndex = i"
            :aria-label="`Aller à ${card.title}`"
          />
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




