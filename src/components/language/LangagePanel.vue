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

<style scoped>
.lang-panel__name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 4px;
}
.lang-panel__name-row .lang-panel__name {
  margin: 0;
}
.lang-panel__favorite {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: transform 0.15s;
  color: rgba(255, 255, 255, 0.35);
}
.lang-panel__favorite:hover {
  transform: scale(1.2);
  color: #fbbf24;
}

.lang-panel__close {
  position: sticky;
  top: 0;
  margin-left: auto;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
  font-size: 17px;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
}
.lang-panel__close:hover {
  background: rgba(255, 255, 255, 0.11);
  transform: scale(1.06);
}

.lang-panel__back-fw {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.65);
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background 0.15s, color 0.15s;
}
.lang-panel__back-fw:hover {
  background: rgba(255, 255, 255, 0.09);
  color: rgba(255, 255, 255, 0.95);
}

.lang-panel__sym {
  display: inline-grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  margin: 10px 0 14px;
  font-family: var(--font-pixel);
  font-size: 17px;
  box-shadow:
    0 6px 22px rgba(0, 0, 0, 0.4),
    0 0 22px color-mix(in srgb, var(--lc, #7c3aed) 22%, transparent);
}

.lang-panel__name {
  margin: 0 0 4px;
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.3px;
}

.lang-panel__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin: 0 0 18px;
  color: rgba(255, 255, 255, 0.44);
  font-size: 12px;
}
.lang-panel__meta--badge { margin-bottom: 12px; }

.lang-panel__badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid color-mix(in srgb, var(--lc, #7c3aed) 45%, transparent);
}

.lang-panel__desc {
  margin: 0 0 16px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-left: 3px solid var(--lc, rgba(255, 255, 255, 0.25));
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.78);
  font-size: 13.5px;
  line-height: 1.8;
}

.lang-panel__section {
  margin-top: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.03);
}

.lang-panel__label {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--lc, rgba(255, 255, 255, 0.5));
  font-family: var(--font-pixel);
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
  opacity: 0.9;
}
.lang-panel__label::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lc, rgba(255, 255, 255, 0.4));
  flex-shrink: 0;
  box-shadow: 0 0 7px var(--lc, rgba(255, 255, 255, 0.3));
}

.lang-panel__value {
  margin: 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: 13px;
  line-height: 1.65;
}

.lang-panel__bar {
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
  margin-bottom: 8px;
}
.lang-panel__bar-fill {
  height: 100%;
  border-radius: 999px;
  box-shadow: 0 0 10px var(--lc, rgba(255, 255, 255, 0.3));
}
.lang-panel__stat {
  margin: 0;
  color: rgba(255, 255, 255, 0.45);
  font-size: 11.5px;
}

.lang-panel__cours { margin: 14px 0 0; }
.lang-panel__cours button {
  width: 100%;
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  font-family: var(--font-orbitron);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #0b1020;
  cursor: pointer;
  background: linear-gradient(90deg, #a78bfa, #60a5fa);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset, 0 8px 28px rgba(124, 58, 237, 0.4);
  transition: transform 0.15s, box-shadow 0.15s;
}
.lang-panel__cours button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) inset, 0 14px 40px rgba(124, 58, 237, 0.55);
}

.lang-panel__frameworks {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.lang-panel__fw-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.82);
  cursor: default;
  transition: transform 0.15s, filter 0.15s;
}
.lang-panel__fw-chip:hover {
  transform: translateY(-1px);
  filter: brightness(1.25);
}
.lang-panel__fw-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.lang-panel__hint {
  margin: 10px 0 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.28);
  font-style: italic;
}

.lang-panel__links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.lang-panel__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 13px;
  transition: background 0.15s, border-color 0.15s, transform 0.15s;
}
.lang-panel__link:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
}
</style>
