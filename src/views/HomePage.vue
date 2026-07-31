<script lang="ts" setup>
import { ref, watch } from 'vue'
import CategoryFilter from '@/components/news/CategoryFilter.vue'
import ArticleCard from '@/components/news/ArticleCard.vue'
import type { ArticlesResponse } from '@/types'
import { API_BASE_URL } from '@/utils/constants'

  const cards = [
      { id: 1, type: 'python',     icon: 'devicon-python-plain',     title: 'Python',     tagline: 'Polyvalent, lisible, puissant' },
      { id: 2, type: 'javascript', icon: 'devicon-javascript-plain', title: 'JavaScript', tagline: 'Le langage du web' },
      { id: 3, type: 'typescript', icon: 'devicon-typescript-plain', title: 'TypeScript', tagline: 'JavaScript avec types' },
      { id: 4, type: 'java',       icon: 'devicon-java-plain',       title: 'Java',       tagline: 'Write once, run anywhere' },
      { id: 5, type: 'php',        icon: 'devicon-php-plain',        title: 'PHP',        tagline: 'Pour le web côté serveur' },
      { id: 6, type: 'go',         icon: 'devicon-go-plain',         title: 'Go',         tagline: 'Simple et très performant' },
      { id: 7, type: 'cpp',        icon: 'devicon-cplusplus-plain',  title: 'C++',        tagline: 'Puissant et très rapide' },
      { id: 8, type: 'rust',       icon: 'devicon-rust-plain',       title: 'Rust',       tagline: 'Sûr, concurrent et ultra-rapide' },
      { id: 9, type: 'csharp',     icon: 'devicon-csharp-plain',     title: 'C#',         tagline: 'Pour .NET et les jeux Unity' },
  ]

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

          <div class="hero-badge">
            <span class="hero-badge-pulse"></span>
            APPRENDRE LE CODE EN JOUANT
          </div>

          <h1 class="page-title">CodeQuest</h1>

          <p class="hero-tagline">
            Explore. Apprends. <span class="hero-tagline-accent">Level&nbsp;up.</span>
          </p>

          <p class="intro-subtitle">
            Chaque langage est une planète. Suis les leçons, accomplis des missions,
            gagne de l'XP et débloque des badges — jusqu'à conquérir toute la galaxie du code.
          </p>

          <div class="intro-actions">
            <router-link class="btn btn--primary" to="/language">EXPLORER LA GALAXIE</router-link>
            <router-link class="btn btn--ghost" to="/mission">VOIR LES MISSIONS</router-link>
          </div>

          <div class="hero-strip">
            <span class="hero-strip-item">
              <span class="hero-strip-value">9</span> langages
            </span>
            <span class="hero-strip-sep">|</span>
            <span class="hero-strip-item">
              <span class="hero-strip-value">120+</span> leçons
            </span>
            <span class="hero-strip-sep">|</span>
            <span class="hero-strip-item">
              <span class="hero-strip-value">27</span> missions
            </span>
          </div>

        </div>

        <div class="hero-visual">
          <div class="hero-orbit hero-orbit--outer">
            <span class="hero-orbit-dot" style="top:-7px;left:50%;width:14px;height:14px;background:#F7DC6F;box-shadow:0 0 12px #F7DC6F;"></span>
            <span class="hero-orbit-dot" style="bottom:40px;right:8px;width:11px;height:11px;background:#00ADD8;box-shadow:0 0 10px #00ADD8;"></span>
            <span class="hero-orbit-dot" style="bottom:60px;left:16px;width:9px;height:9px;background:#DEA584;box-shadow:0 0 10px #DEA584;"></span>
          </div>
          <div class="hero-orbit hero-orbit--inner">
            <span class="hero-orbit-dot" style="top:26px;right:14px;width:12px;height:12px;background:#3178C6;box-shadow:0 0 10px #3178C6;"></span>
            <span class="hero-orbit-dot" style="bottom:-5px;left:50%;width:10px;height:10px;background:#9B4FD0;box-shadow:0 0 10px #9B4FD0;"></span>
          </div>
          <div class="hero-planet">
            <div class="hero-planet__ring"></div>
            <span class="hero-planet__code">&lt;/&gt;</span>
          </div>
        </div>
      </div>

      <section class="choisis-section">
        <div class="choisis-header">
          <h2 class="choisis-title">CHOISIS TA PLANÈTE</h2>
          <router-link to="/language" class="choisis-link">Vue galaxie →</router-link>
        </div>
        <div class="planete-grid">
          <router-link
            v-for="card in cards"
            :key="card.id"
            :to="`/cours/${card.type}`"
            class="planete-btn"
          >
            <span class="planete-sphere" :class="`planet--${card.type}`">
              <i :class="card.icon" class="planete-icon"></i>
            </span>
            <span class="planete-info">
              <span class="planete-name">{{ card.title }}</span>
              <span class="planete-tagline">{{ card.tagline }}</span>
            </span>
          </router-link>
        </div>
      </section>

    </section>

    <section id="news" class="home-section home-section--news" aria-label="Actualités">
      <header class="hero">
        <h2 class="hero-title">
          TRANSMISSIONS <span class="accent-purple">// ACTUS DEV</span>
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

<style scoped src="./HomePage.css"></style>




