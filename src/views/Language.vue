<script setup lang="ts">
import { ref, computed, watch } from "vue"
import LangagePanel from "../components/Galaxie_Langage/LangagePanel.vue"
import { useGalaxie } from "../composables/useGalaxie"
import { TOUS_LES_LANGAGES } from "../data/langages"

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { scene, planeteActive, langageActif, allerA, retour } = useGalaxie(canvasRef)
const recherche = ref("")
const rechercheActive = ref(false)

const resultats = computed(() => {
  if (!recherche.value.trim()) return []
  const q = recherche.value.toLowerCase()
  return TOUS_LES_LANGAGES
    .filter(l =>
      l.nom.toLowerCase().includes(q) ||
      l.sym.toLowerCase().includes(q) ||
      l.usage.toLowerCase().includes(q)
    )
    .slice(0, 8)
})

function naviguerVers(item: typeof TOUS_LES_LANGAGES[0]) {
  allerA("planete", item.planete)
  setTimeout(() => { langageActif.value = item }, 700)
  recherche.value= ""
  rechercheActive.value = false
}

watch(rechercheActive, (active) => {
  if (!active) setTimeout(() => { rechercheActive.value = false }, 200)
})
</script>

<template>
  <div class="galaxie-page">
    <canvas ref="canvasRef" class="galaxie-canvas" />
    <div class="galaxie-ui">
      <div class="galaxie-topbar">
        <button v-if="scene !== 'galaxie'" class="galaxie-back" @click="retour">
          retour
        </button>
        <span class="galaxie-crumb">
          {{ scene === 'planete' ? planeteActive?.nom : '' }}
        </span>
      </div>

      <div class="galaxie-search-wrap">
        <span class="galaxie-search-icon">🔍</span>
        <input
          v-model="recherche"
          class="galaxie-search"
          type="text"
          placeholder="Rechercher un langage..."
          @focus="rechercheActive = true"
        />
        <div v-if="rechercheActive && resultats.length" class="galaxie-results">
          <div
            v-for="item in resultats"
            :key="item.nom"
            class="galaxie-resultat-item"
            @click="naviguerVers(item)"
          >
          <span class="galaxie-result-sym" :style="{ color: item.couleur }">
            {{ item.sym }}
          </span>
          <span class="galaxie-result-cat">{{ item.planete.nom }}</span>
          </div>
        </div>
      </div>
    </div>

    <LangagePanel
      :langage="langageActif"
      @fermer="langageActif = null"
    />
  </div>
</template>

<style src="../assets/styles/pages/langage.css"></style>
