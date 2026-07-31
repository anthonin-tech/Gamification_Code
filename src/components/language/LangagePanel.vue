<script setup lang="ts">
import type { Framework, Langage } from "@/types/langage"
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from "@/stores/useUserStore"

const router = useRouter()
const userStore = useUserStore()

const isFavorite = computed(() => !!props.language && userStore.favoriteLanguages.includes(props.language.slug))

async function toggleFavorite() {
  if (!props.language) return
  const slug = props.language.slug
  if (isFavorite.value) {
    userStore.favoriteLanguages = userStore.favoriteLanguages.filter(s => s !== slug)
  } else if (userStore.favoriteLanguages.length < 3) {
    userStore.favoriteLanguages.push(slug)
  }
  await fetch('/api/profil/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ favoriteLanguages: userStore.favoriteLanguages })
  })
}

function allerAuCours(langage: Langage) {
  router.push(`/cours/${langage.slug}`)
}
const props = defineProps<{
  language: Langage | null
  framework: Framework | null
}>()

defineEmits<{
  fermer: []
  fermerFramework: []
}>()

</script>

<template>
  <Transition name="panneau">
    <aside v-if="language" class="lang-panel" :style="{ '--lc': language.couleur }">

      <template v-if="framework">
        <button class="lang-panel__back-fw" @click="$emit('fermerFramework')">
          ← {{ language.nom }}
        </button>

        <div
          class="lang-panel__sym"
          :style="{ color: framework.couleur, background: `${framework.couleur}22` }"
        >
          {{ framework.sym }}
        </div>
        <h2 class="lang-panel__name">{{ framework.nom }}</h2>
        <p class="lang-panel__meta lang-panel__meta--badge">
          <span class="lang-panel__badge" :style="{ background: `${language.couleur}22`, color: language.couleur }">
            {{ language.nom }}
          </span>
          Framework
        </p>

        <p class="lang-panel__desc">{{ framework.description }}</p>

        <div v-if="framework.site" class="lang-panel__section">
          <span class="lang-panel__label">Site officiel</span>
          <div class="lang-panel__links">
            <a
              :href="framework.site"
              target="_blank"
              rel="noopener noreferrer"
              class="lang-panel__link"
            >
              {{ framework.site.replace('https://', '') }} ↗
            </a>
          </div>
        </div>
      </template>

      <template v-else>
        <button class="lang-panel__close" @click="$emit('fermer')">×</button>

        <div
          class="lang-panel__sym"
          :style="{ color: language.couleur, background: `${language.couleur}22` }"
        >
          {{ language.sym }}
        </div>
        <div class="lang-panel__name-row">
          <h2 class="lang-panel__name">{{ language.nom }}</h2>
          <button class="lang-panel__favorite" @click="toggleFavorite">{{ isFavorite ? '★' : '☆' }}</button>
        </div>
        <p class="lang-panel__meta">Créé en {{ language.annee }} • {{ language.createur }}</p>

        <p class="lang-panel__desc">{{ language.description }}</p>

        <div class="lang-panel__section">
          <span class="lang-panel__label">Utilisé pour</span>
          <p class="lang-panel__value">{{ language.usage }}</p>
        </div>

        <div class="lang-panel__section">
          <span class="lang-panel__label">Popularité</span>
          <div class="lang-panel__bar">
            <div
              class="lang-panel__bar-fill"
              :style="{ width: language.popularite + '%', background: language.couleur }"
            />
          </div>
          <p class="lang-panel__stat">{{ language.popularite }}% des devs l'utilisent</p>
        </div>

        <div class="lang-panel__section">
          <span class="lang-panel__label">Difficulté</span>
          <div class="lang-panel__bar">
            <div
              class="lang-panel__bar-fill"
              :style="{ width: language.difficulte + '%', background: 'linear-gradient(90deg, #34d399, #fbbf24 50%, #ef4444)' }"
            />
          </div>
          <p class="lang-panel__stat">{{ language.difficulte }}/100</p>
        </div>

        <div v-if="language.frameworks.length" class="lang-panel__section">
          <span class="lang-panel__label">Frameworks ({{ language.frameworks.length }})</span>
          <div class="lang-panel__frameworks">
            <div
              v-for="fw in language.frameworks"
              :key="fw.nom"
              class="lang-panel__fw-chip"
              :style="{ borderColor: `${fw.couleur}55`, background: `${fw.couleur}18` }"
            >
              <span class="lang-panel__fw-dot" :style="{ background: fw.couleur }" />
              {{ fw.nom }}
            </div>
          </div>
          <p class="lang-panel__hint">Cliquez sur une planète pour explorer un framework</p>
        </div>

        <div class="lang-panel__cours">
          <button @click="allerAuCours(language)">
            COMMENCER LE COURS →
          </button>
        </div>
      </template>

    </aside>
  </Transition>
</template>

<style scoped src="./LangagePanel.css"></style>
