<script setup lang="ts">
import { ref, computed, watch } from "vue"
import LangagePanel from "@/components/language/LangagePanel.vue"
import { useGalaxie } from "@/composables/useGalaxie"

const canvasRef = ref<HTMLCanvasElement | null>(null)
const {
  scene,
  langageActif,
  frameworkActif,
  allerA,
  retour,
  LANGAGES,
} = useGalaxie(canvasRef)

const recherche = ref("")
const rechercheActive = ref(false)

const resultats = computed(() => {
  if (!recherche.value.trim()) return []
  const q = recherche.value.toLowerCase()
  const res: { nom: string; sym: string; couleur: string; type: "langage" | "framework"; langIdx: number; fwIdx?: number }[] = []

  LANGAGES.forEach((lang, li) => {
    if (
      lang.nom.toLowerCase().includes(q) ||
      lang.sym.toLowerCase().includes(q) ||
      lang.usage.toLowerCase().includes(q)
    ) {
      res.push({ nom: lang.nom, sym: lang.sym, couleur: lang.couleur, type: "langage", langIdx: li })
    }
    lang.frameworks.forEach((fw, fi) => {
      if (fw.nom.toLowerCase().includes(q) || fw.sym.toLowerCase().includes(q)) {
        res.push({ nom: fw.nom, sym: fw.sym, couleur: fw.couleur, type: "framework", langIdx: li, fwIdx: fi })
      }
    })
  })
  return res.slice(0, 8)
})

function naviguerVers(item: typeof resultats.value[0]) {
  const lang = LANGAGES[item.langIdx]
  allerA("solaire", lang)
  if (item.type === "framework") {
    const fw = lang.frameworks[item.fwIdx!]
    setTimeout(() => { frameworkActif.value = fw }, 700)
  }
  recherche.value = ""
  rechercheActive.value = false
}

const breadcrumb = computed(() => {
  if (scene.value === "galaxie")  return ""
  if (scene.value === "systemes") return "Galaxie des langages"
  if (scene.value === "solaire" && langageActif.value) {
    return frameworkActif.value
      ? `${langageActif.value.nom} › ${frameworkActif.value.nom}`
      : langageActif.value.nom
  }
  return ""
})

function fermerPanneau() {
  frameworkActif.value = null
  retour()
}

function fermerFramework() {
  frameworkActif.value = null
}

watch(rechercheActive, (active) => {
  if (!active) setTimeout(() => { rechercheActive.value = false }, 200)
})

const TAGLINES: Record<string, string> = {
  javascript: 'Le langage universel du web',
  python:     'Syntaxe épurée, usages infinis',
  typescript: 'JavaScript avec des super-typages',
  java:       'Robuste, portable, incontournable',
  php:        'Le moteur historique du web',
  go:         'Simple, rapide, concurrent',
  cpp:        'Puissance et contrôle total',
  rust:       'Performant et sans crash',
  csharp:     'Le couteau suisse de .NET',
}

function orbitDur(li: number): string {
  const durs = [20, 16, 24, 18, 22, 14, 26, 17, 21]
  return (durs[li] ?? 20) + 's'
}
</script>

<template>
  <div class="galaxie-page">
    <canvas ref="canvasRef" class="galaxie-canvas" />

    <Transition name="fade">
      <div v-if="scene === 'systemes'" class="lang-systemes-overlay">
        <div class="lang-systemes-header">
          <h1 class="lang-systemes-title">9 SYSTÈMES DÉTECTÉS</h1>
          <p class="lang-systemes-sub">Chaque planète est un langage. Clique pour scanner son système.</p>
        </div>
        <div class="lang-systemes-grid">
          <div
            v-for="(lang, li) in LANGAGES"
            :key="lang.slug"
            class="lang-card"
            @click="allerA('solaire', lang)"
          >
            <div class="lang-planet-wrap" :style="{ '--orbit-dur': orbitDur(li) }">
              <div class="lang-orbit-ring">
                <span
                  v-for="(fw, fi) in lang.frameworks"
                  :key="fw.nom"
                  class="lang-sat-arm"
                  :style="{ '--slot-angle': (fi * 360 / lang.frameworks.length) + 'deg' }"
                >
                  <span class="lang-satellite" :style="{ '--fw-color': fw.couleur }">{{ fw.sym }}</span>
                </span>
              </div>
              <div class="lang-planet" :style="{ '--lang-color': lang.couleur }">
                <span class="lang-planet__sym">{{ lang.sym }}</span>
              </div>
            </div>
            <h3 class="lang-card__name">{{ lang.nom }}</h3>
            <p class="lang-card__tagline">{{ TAGLINES[lang.slug] }}</p>
            <div class="lang-card__tags">
              <template v-for="(fw, fi) in lang.frameworks" :key="fw.nom">
                <span class="lang-card__tag" :style="{ color: fw.couleur }">{{ fw.nom.toUpperCase() }}</span>
                <span v-if="fi < lang.frameworks.length - 1" class="lang-card__tag-sep">·</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div class="galaxie-ui">
      <div class="galaxie-topbar">
        <button v-if="scene !== 'galaxie'" class="galaxie-back" @click="fermerPanneau">
          ← Retour
        </button>
        <span v-if="breadcrumb" class="galaxie-crumb">{{ breadcrumb }}</span>

        <div class="galaxie-scene-dots">
          <span
            class="galaxie-scene-dot"
            :class="{ active: scene === 'galaxie' }"
            title="Galaxie"
          />
          <span
            class="galaxie-scene-dot"
            :class="{ active: scene === 'systemes' }"
            title="Langages"
          />
          <span
            class="galaxie-scene-dot"
            :class="{ active: scene === 'solaire' }"
            title="Détail"
          />
        </div>
      </div>

      <div v-if="scene !== 'systemes'" class="galaxie-search-wrap">
        <span class="galaxie-search-icon">🔍</span>
        <input
          v-model="recherche"
          class="galaxie-search"
          type="text"
          placeholder="Rechercher un langage ou framework..."
          @focus="rechercheActive = true"
          @blur="rechercheActive = false"
        />
        <Transition name="results">
          <div v-if="rechercheActive && resultats.length" class="galaxie-results">
            <div
              v-for="item in resultats"
              :key="`${item.type}-${item.nom}`"
              class="galaxie-resultat-item"
              @mousedown.prevent="naviguerVers(item)"
            >
              <span class="galaxie-result-sym" :style="{ color: item.couleur }">
                {{ item.sym }}
              </span>
              <span class="galaxie-result-nom">{{ item.nom }}</span>
              <span class="galaxie-result-type" :class="`type--${item.type}`">
                {{ item.type === "langage" ? "Langage" : "Framework" }}
              </span>
            </div>
          </div>
        </Transition>
      </div>

    </div>

    <LangagePanel
      :language="langageActif"
      :framework="frameworkActif"
      @fermer="fermerPanneau"
      @fermer-framework="fermerFramework"
    />
  </div>
</template>

<style scoped src="@/assets/styles/pages/galaxie.css"></style>
