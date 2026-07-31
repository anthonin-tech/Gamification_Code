<script setup lang="ts">
import { MISSIONS } from '@/data/missions'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { MissionIsLock, getLessonName } from '@/composables/useMissionLock'

const filtreLangage = ref('')
const filtreDifficulte = ref('')
const router = useRouter()
const useUser = useUserStore()

const filterMission = computed(() => {
    return MISSIONS.filter(mission => {
        const matchLangage = filtreLangage.value === '' || mission.langage === filtreLangage.value
        const matchDifficulte = filtreDifficulte.value === '' || mission.difficulte === filtreDifficulte.value
        return matchLangage && matchDifficulte
    })
})

const missionParLangue = computed(() => {
    const langues = [...new Set(filterMission.value.map(m => m.langage))]
    return langues.map(langage => ({
        langage,
        missions: filterMission.value.filter(m => m.langage === langage)
    }))
})

function AllerMission(id: number) {
  router.push(`/mission/${id}`)
}
</script>

<template>
  <div class="missions-page">
    <div class="missions-toprow">
      <div class="missions-header">
        <h1 class="missions-page-title">CENTRE DE MISSIONS</h1>
        <p class="missions-page-sub">Des défis de code pour gagner de l'XP et débloquer des badges.</p>
      </div>
      <div class="filters">
        <select v-model="filtreDifficulte" class="filter-select">
          <option value="">Toutes les difficultés</option>
          <option value="FACILE">Facile</option>
          <option value="MOYEN">Moyen</option>
          <option value="DIFFICILE">Difficile</option>
        </select>
        <select v-model="filtreLangage" class="filter-select">
          <option value="">Tous les langages</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="rust">Rust</option>
          <option value="go">Go</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="cpp">C++</option>
          <option value="php">PHP</option>
        </select>
      </div>
    </div>

    <div 
        v-for="groupe in missionParLangue"
        :key="groupe.langage"
        class="separation-mission">
        <h2><span class="lang-planet-dot" :class="`planet--${groupe.langage}`"></span>{{ groupe.langage }}</h2>
        <div class="barre-separation"></div>
        <div class="cards">
        <article
            v-for="mission in groupe.missions"
            :key="mission.missionId"
            class="card"
            :class="mission.difficulte.toLowerCase()"
            @click="MissionIsLock(mission) ? AllerMission(mission.missionId) : null"
        >
          <div class="card-matrix" aria-hidden="true">
            <span>ア<br>ケ<br>ソ<br>ナ<br>ヒ<br>ム<br>ヨ<br>リ<br>ン<br>ウ<br>キ<br>ス<br>テ<br>ノ<br>ハ<br>ミ<br>ル<br>ヲ<br>ア<br>ケ<br>ソ<br>ナ<br>ヒ<br>ム<br>ヨ<br>リ<br>ン<br>ウ<br>キ<br>ス<br>テ<br>ノ<br>ハ<br>ミ<br>ル<br>ヲ</span>
            <span>イ<br>コ<br>タ<br>ニ<br>フ<br>メ<br>ラ<br>ワ<br>エ<br>ク<br>シ<br>チ<br>ヌ<br>マ<br>ユ<br>レ<br>カ<br>オ<br>イ<br>コ<br>タ<br>ニ<br>フ<br>メ<br>ラ<br>ワ<br>エ<br>ク<br>シ<br>チ<br>ヌ<br>マ<br>ユ<br>レ<br>カ<br>オ</span>
            <span>ウ<br>サ<br>チ<br>ネ<br>ヘ<br>モ<br>リ<br>ン<br>ア<br>ケ<br>ス<br>ト<br>ハ<br>ミ<br>ル<br>ヲ<br>イ<br>ウ<br>サ<br>チ<br>ネ<br>ヘ<br>モ<br>リ<br>ン<br>ア<br>ケ<br>ス<br>ト<br>ハ<br>ミ<br>ル<br>ヲ<br>イ</span>
            <span>エ<br>シ<br>ツ<br>ノ<br>ホ<br>ヤ<br>ル<br>カ<br>コ<br>セ<br>テ<br>ヒ<br>ム<br>ヨ<br>ウ<br>ケ<br>ナ<br>エ<br>シ<br>ツ<br>ノ<br>ホ<br>ヤ<br>ル<br>カ<br>コ<br>セ<br>テ<br>ヒ<br>ム<br>ヨ<br>ウ<br>ケ<br>ナ</span>
            <span>オ<br>ス<br>ト<br>ハ<br>ユ<br>ラ<br>ワ<br>キ<br>サ<br>ソ<br>ニ<br>フ<br>ン<br>ア<br>イ<br>タ<br>ヘ<br>オ<br>ス<br>ト<br>ハ<br>ユ<br>ラ<br>ワ<br>キ<br>サ<br>ソ<br>ニ<br>フ<br>ン<br>ア<br>イ<br>タ<br>ヘ</span>
            <span>カ<br>ナ<br>ヒ<br>マ<br>レ<br>ン<br>ウ<br>ク<br>チ<br>ネ<br>モ<br>ヨ<br>エ<br>シ<br>ツ<br>ホ<br>ア<br>カ<br>ナ<br>ヒ<br>マ<br>レ<br>ン<br>ウ<br>ク<br>チ<br>ネ<br>モ<br>ヨ<br>エ<br>シ<br>ツ<br>ホ<br>ア</span>
            <span>キ<br>ニ<br>ホ<br>メ<br>ヲ<br>コ<br>ス<br>テ<br>ノ<br>ラ<br>ワ<br>イ<br>サ<br>ソ<br>ナ<br>ヘ<br>ム<br>キ<br>ニ<br>ホ<br>メ<br>ヲ<br>コ<br>ス<br>テ<br>ノ<br>ラ<br>ワ<br>イ<br>サ<br>ソ<br>ナ<br>ヘ<br>ム</span>
            <span>ク<br>ヌ<br>ヘ<br>ヤ<br>ア<br>セ<br>タ<br>フ<br>リ<br>カ<br>ン<br>エ<br>ケ<br>ト<br>ハ<br>ユ<br>ク<br>ヌ<br>ヘ<br>ヤ<br>ア<br>セ<br>タ<br>フ<br>リ<br>カ<br>ン<br>エ<br>ケ<br>ト<br>ハ<br>ユ<br>ク<br>ヌ</span>
          </div>
          <div v-if="!MissionIsLock(mission)" class="card-lock">
            <div class="lock-icon">
              <svg class="holo-lock" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 32 L20 20 Q20 8 32 8 Q44 8 44 20 L44 32" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
                <rect x="7" y="30" width="50" height="40" rx="7" stroke="currentColor" stroke-width="2" fill="rgba(0,212,255,0.04)"/>
                <circle cx="32" cy="47" r="5.5" stroke="currentColor" stroke-width="2"/>
                <path d="M29 52 L29 59 Q29 61 32 61 Q35 61 35 59 L35 52 Z" fill="currentColor" opacity="0.8"/>
              </svg>
            </div>
            <span class="lock-label"><span class="lesson-name">{{ getLessonName(mission )}} </span> leçons requises</span>
          </div>
          <div class="card-header">
            <span class="card-signal">
              <svg width="12" height="10" viewBox="0 0 14 10" fill="currentColor">
                <rect x="0" y="6" width="2" height="4" rx="0.5"/>
                <rect x="4" y="4" width="2" height="6" rx="0.5"/>
                <rect x="8" y="2" width="2" height="8" rx="0.5"/>
                <rect x="12" y="0" width="2" height="10" rx="0.5"/>
              </svg>
              SIGNAL · {{ mission.langage.slice(0,2).toUpperCase() }}-{{ String(mission.missionId).padStart(2, '0') }}
            </span>
            <div class="card-header-right">
              <span v-if="useUser.completeMissions.includes(mission.missionId)" class="status-badge status-badge--done">Terminé</span>
              <span v-else class="status-badge status-badge--new">Nouveau</span>
              <span class="diff" :class="mission.difficulte">{{ mission.difficulte }}</span>
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ mission.missionTitre }}</h3>
            <p class="card-sector">// SECTEUR {{ mission.langage.toUpperCase() }}</p>
            <p class="card-desc">{{ mission.description }}</p>
            <div class="card-divider"></div>
            <div class="card-foot">
              <span class="taches-lbl">{{ mission.taches.length }} OBJECTIFS</span>
              <span class="xp">+{{ mission.xpRecompense }} XP</span>
            </div>
          </div>
        </article>
        </div>
    </div>
  </div>
</template>

<style scoped src="./MissionPage.css"></style>
