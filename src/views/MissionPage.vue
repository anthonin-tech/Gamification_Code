<script setup lang="ts">
import { MISSIONS } from '@/data/missions'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const filtreLangage = ref('')
const filtreDifficulte = ref('')
const router = useRouter()

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
        <option value="c++">C++</option>
      </select>
    </div>

    <div 
        v-for="groupe in missionParLangue"
        :key="groupe.langage"
        class="separation-mission">
        <h2>{{ groupe.langage }}</h2>
        <div class="barre-separation"></div>
        <div class="cards">
        <article
            v-for="mission in groupe.missions"
            :key="mission.missionId"
            class="card"
            @click="AllerMission(mission.missionId)"
        >
            <div class="card-banner" :class="mission.difficulte">
            <span class="diff" :class="mission.difficulte">{{ mission.difficulte }}</span>
            <span class="card-tag">{{ mission.langage }}</span>
            </div>
            <div class="card-body">
            <h3 class="card-title">{{ mission.missionTitre }}</h3>
            <p class="card-desc">{{ mission.description }}</p>
            <div class="card-foot">
                <span class="taches-lbl">{{ mission.taches.length }} tâches</span>
                <span class="xp">+{{ mission.xpRecompense }} XP</span>
            </div>
            </div>
        </article>
        </div>
    </div>
  </div>
</template>

<style scoped>
.missions-page {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 16px;
}

/* ── Filtres ─────────────────────────────────────────── */
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 9px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.80);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 34px;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.filter-select:hover {
  border-color: rgba(124, 58, 237, 0.4);
  background-color: rgba(255, 255, 255, 0.08);
}

.filter-select:focus {
  border-color: rgba(124, 58, 237, 0.6);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}

.filter-select option { background: #0f1120; color: #fff; }

/* ── Groupe langage ──────────────────────────────────── */
.separation-mission {
  margin-bottom: 36px;
}

.separation-mission h2 {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-pixel);
}

.barre-separation {
  height: 1px;
  background: linear-gradient(90deg, rgba(124, 58, 237, 0.6), rgba(59, 130, 246, 0.4), transparent);
  margin-bottom: 16px;
}

/* ── Grille ──────────────────────────────────────────── */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

/* ── Card ────────────────────────────────────────────── */
.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s, transform 0.25s;
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.20);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-3px);
}

/* ── Bannière ────────────────────────────────────────── */
.card-banner {
  height: 72px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8px 12px;
}

.card-banner.FACILE   { background: linear-gradient(135deg, rgba(52,211,153,0.25), rgba(52,211,153,0.08)); }
.card-banner.MOYEN    { background: linear-gradient(135deg, rgba(251,191,36,0.25), rgba(251,191,36,0.08)); }
.card-banner.DIFFICILE { background: linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.08)); }

/* ── Badge difficulté ────────────────────────────────── */
.diff {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.diff.FACILE   { background: rgba(52,211,153,0.15); color: #34d399; border: 1px solid rgba(52,211,153,0.35); }
.diff.MOYEN    { background: rgba(251,191,36,0.15);  color: #fbbf24; border: 1px solid rgba(251,191,36,0.35); }
.diff.DIFFICILE { background: rgba(239,68,68,0.15);  color: #ef4444; border: 1px solid rgba(239,68,68,0.35); }

.card-tag {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ── Corps ───────────────────────────────────────────── */
.card-body { padding: 12px 14px 15px; }

.card-title {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
}

.card-desc {
  margin: 0 0 12px;
  font-size: 12px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.48);
}

.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.taches-lbl {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
}

.xp {
  font-size: 12px;
  font-weight: 700;
  color: #fbbf24;
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 860px) { .cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .cards { grid-template-columns: 1fr; } }
</style>
