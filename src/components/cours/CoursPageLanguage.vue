<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LANGAGES } from '@/data/langages'
import type { Langage } from '@/types/langage'
import type { PlaneteCoursData, Difficulte } from '@/types/cours'
import "@/assets/styles/components/Cours/CoursPageLanguage.css"

const props = defineProps<{
  langage: Langage
  cours: PlaneteCoursData
}>()

const router = useRouter()

const SLUGS = ['javascript', 'python', 'typescript', 'go', 'rust', 'C++', 'C#', 'Java', 'PHP']

function goTo(slug: string) {
  router.push(`/cours/${slug}`)
}

function labelFor(slug: string) {
  return LANGAGES.find(l => l.nom.toLowerCase() === slug)?.nom ?? slug
}

function badgeClass(d: Difficulte) {
  return {
    'FACILE': 'badge--facile',
    'MOYEN': 'badge--moyen',
    'DIFFICILE': 'badge--difficile',
  }[d]
}

function startLesson() {
  router.push(`/cours/${props.langage.nom.toLowerCase()}/learn`)
}
</script>

<template>
  <div class="cp" :style="{ '--lc': langage.couleur }">

    <nav class="switcher">
      <button
        v-for="slug in SLUGS"
        :key="slug"
        class="sw-btn"
        :class="{ 'sw-btn--active': langage.nom.toLowerCase() === slug }"
        @click="goTo(slug)"
      >
        {{ labelFor(slug) }}
      </button>
    </nav>

    <section class="hero">
      <div class="hero-left">
        <p class="hero-eyebrow">COURS {{ langage.nom.toUpperCase() }}</p>
        <h1 class="hero-h1">
          Apprends le code,<br>
          <span class="hero-gradient">explore {{ langage.nom }}.</span>
        </h1>
        <p class="hero-desc">{{ langage.description }}</p>
        <div class="hero-btns">
          <button class="btn btn--primary" @click="startLesson">Démarrer la mission #001</button>
          <a href="/language"><button class="btn btn--ghost">Voir la carte</button></a>
        </div>
        <p class="hero-meta">
          <strong>{{ langage.popularite }}%</strong> popularité
          &nbsp;·&nbsp;
          <strong>{{ cours.totalMissions }}</strong> missions
          &nbsp;·&nbsp;
          <strong>{{ langage.frameworks.length }}</strong> frameworks
        </p>
      </div>

      <div class="hero-right">
        <div class="planet-scene">
          <div class="orbit orbit--1"></div>
          <div class="orbit orbit--2"></div>
          <div class="planet">{{ langage.sym }}</div>
          <div
            v-for="(fw, i) in langage.frameworks.slice(0, 3)"
            :key="fw.nom"
            class="fw-orbit"
            :style="{ '--delay': `${i * -3}s`, '--radius': `${58 + i * 22}px`, '--speed': `${8 + i * 3}s` }"
          >
            <div
              class="fw-dot"
              :style="{ color: fw.couleur, borderColor: fw.couleur + '99', boxShadow: `0 0 8px ${fw.couleur}44` }"
            >
              {{ fw.sym }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-bar">
      <div class="stat">
        <span class="stat-v">Niv. 14</span>
        <span class="stat-k">ASTRONAUTE</span>
      </div>
      <div class="stat">
        <span class="stat-v">27</span>
        <span class="stat-k">BADGES</span>
      </div>
      <div class="stat">
        <span class="stat-v">{{ cours.missionsTerminees }} / {{ cours.totalMissions }}</span>
        <span class="stat-k">MISSIONS</span>
      </div>
      <div class="stat">
        <span class="stat-v">32</span>
        <span class="stat-k">JOURS D'AFFILÉE</span>
      </div>
    </section>

    <section class="missions">
      <header class="missions-head">
        <span class="missions-tag">MISSIONS ACTIVES</span>
        <h2 class="missions-title">Quêtes du quadrant</h2>
        <a class="missions-link">Tout voir →</a>
      </header>

      <div class="cards">
        <article v-for="m in cours.missions" :key="m.id" class="card">
          <div
            class="card-banner"
            :style="{ background: `linear-gradient(135deg, ${m.couleurTag}44, ${m.couleurTag}18)` }"
          >
            <span class="diff" :class="badgeClass(m.difficulte)">{{ m.difficulte }}</span>
            <span class="card-tag" :style="{ color: m.couleurTag }">{{ m.tag }}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ m.titre }}</h3>
            <p class="card-desc">{{ m.description }}</p>
            <div class="card-foot">
              <span class="prog-lbl">Progression</span>
              <span class="xp">+{{ m.xp }} XP</span>
            </div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: m.progression + '%', background: m.couleurTag }"></div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="cta">
      <h2 class="cta-title">Prêt pour le décollage ?</h2>
      <p class="cta-sub">Rejoins l'académie spatiale et écris ta première ligne de code en moins de 60 secondes.</p>
      <button class="btn btn--primary">Commencer gratuitement</button>
    </section>

  </div>
</template>

