<script setup lang="ts">
import { MISSIONS } from '@/data/missions'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { MissionIsLock } from '@/composables/useMissionLock'
import { CURRICULUM_JAVASCRIPT } from '@/data/curriculum-javascript'
import { CURRICULUM_PYTHON } from '@/data/curriculum'
import { CURRICULUM_JAVA } from '@/data/curriculum-java'
import { CURRICULUM_CPP } from '@/data/curriculum-cpp'
import { CURRICULUM_GO } from '@/data/curriculum-go'
import { CURRICULUM_PHP } from '@/data/curriculum-php'
import { CURRICULUM_RUST } from '@/data/curriculum-rust'
import { CURRICULUM_TYPESCRIPT } from '@/data/curriculum-typescript'
import { CURRICULUM_CSHARP } from '@/data/curriculum-csharp'

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

const curriculums: Record<string, any> = {
  javascript: CURRICULUM_JAVASCRIPT,
  python: CURRICULUM_PYTHON,
  java: CURRICULUM_JAVA,
  typescript: CURRICULUM_TYPESCRIPT,
  rust: CURRICULUM_RUST,
  csharp: CURRICULUM_CSHARP,
  go: CURRICULUM_GO,
  cpp: CURRICULUM_CPP,
  php: CURRICULUM_PHP
}

function AllerMission(id: number) {
  router.push(`/mission/${id}`)
}

function getLessonName(mission: any) {
  const curriculum = curriculums[mission.langage]
  const AllLesson = curriculum.flatMap((l: any) => l.lessons)
  const lessonRequired = AllLesson[mission.minLecons - 1]
  return lessonRequired.title 
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

<style scoped>
.missions-page {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 16px;
}

/* ── En-tête page ─────────────────────────────────────── */
.missions-toprow {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.missions-header {
  margin-bottom: 0;
}

.missions-page-title {
  margin: 0 0 6px;
  font-family: var(--font-orbitron);
  font-size: clamp(22px, 4vw, 36px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #ffffff 30%, #a78bfa 60%, #60a5fa 90%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.missions-page-sub {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.5px;
}

.lang-planet-dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: inset -3px -3px 6px rgba(0,0,0,0.45);
}

/* ── Filtres ─────────────────────────────────────────── */
.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: flex-end;
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
  font-family: var(--font-orbitron);
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  gap: 10px;
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
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #050d1a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}

.card.facile    { --accent: #00d4ff; --accent-rgb: 0, 212, 255;   border-color: rgba(0, 212, 255, 0.35);   box-shadow: 0 0 20px rgba(0, 212, 255, 0.06); }
.card.moyen     { --accent: #ffd700; --accent-rgb: 255, 215, 0;   border-color: rgba(255, 215, 0, 0.35);   box-shadow: 0 0 20px rgba(255, 215, 0, 0.06); }
.card.difficile { --accent: #ff4444; --accent-rgb: 255, 68, 68;   border-color: rgba(255, 68, 68, 0.35);   box-shadow: 0 0 20px rgba(255, 68, 68, 0.06); }

.card.facile:hover    { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0, 212, 255, 0.25), 0 0 0 1px rgba(0, 212, 255, 0.5); }
.card.moyen:hover     { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(255, 215, 0, 0.25),  0 0 0 1px rgba(255, 215, 0, 0.5); }
.card.difficile:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(255, 68, 68, 0.25),  0 0 0 1px rgba(255, 68, 68, 0.5); }

/* ── Matrix background ───────────────────────────────── */
.card-matrix {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-around;
  padding: 0 8px;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.35;
}

.card-matrix span {
  font-family: 'Courier New', monospace;
  font-size: 9px;
  line-height: 2;
  color: var(--accent);
  white-space: nowrap;
  animation: matrix-scroll linear infinite;
}

.card-matrix span:nth-child(1) { animation-duration: 8s;  animation-delay: 0s; }
.card-matrix span:nth-child(2) { animation-duration: 13s; animation-delay: -4s; }
.card-matrix span:nth-child(3) { animation-duration: 10s; animation-delay: -7s; }
.card-matrix span:nth-child(4) { animation-duration: 16s; animation-delay: -2s; }
.card-matrix span:nth-child(5) { animation-duration: 9s;  animation-delay: -5s; }
.card-matrix span:nth-child(6) { animation-duration: 14s; animation-delay: -1s; }
.card-matrix span:nth-child(7) { animation-duration: 11s; animation-delay: -8s; }
.card-matrix span:nth-child(8) { animation-duration: 7s;  animation-delay: -3s; }

@keyframes matrix-scroll {
  0%   { transform: translateY(-50%); }
  100% { transform: translateY(0%); }
}

/* ── Card header ─────────────────────────────────────── */
.card-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 8px;
  border-bottom: 1px solid rgba(var(--accent-rgb), 0.15);
}

.card-signal {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--accent);
  font-family: 'Courier New', monospace;
  opacity: 0.85;
}

/* ── Header droite ───────────────────────────────────── */
.card-header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── Badge statut ────────────────────────────────────── */
.status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.status-badge--new {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.status-badge--done {
  background: rgba(52, 211, 153, 0.12);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.4);
  text-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
}

/* ── Badge difficulté ────────────────────────────────── */
.diff {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.diff.FACILE    { background: rgba(0, 212, 255, 0.12); color: #00d4ff; border: 1px solid rgba(0, 212, 255, 0.4); text-shadow: 0 0 8px rgba(0, 212, 255, 0.9), 0 0 20px rgba(0, 212, 255, 0.5); box-shadow: 0 0 10px rgba(0, 212, 255, 0.2) inset; }
.diff.MOYEN     { background: rgba(255, 215, 0, 0.12);  color: #ffd700; border: 1px solid rgba(255, 215, 0, 0.4);  text-shadow: 0 0 8px rgba(255, 215, 0, 0.9),  0 0 20px rgba(255, 215, 0, 0.5);  box-shadow: 0 0 10px rgba(255, 215, 0, 0.2) inset; }
.diff.DIFFICILE { background: rgba(255, 68, 68, 0.12);  color: #ff4444; border: 1px solid rgba(255, 68, 68, 0.4);  text-shadow: 0 0 8px rgba(255, 68, 68, 0.9),  0 0 20px rgba(255, 68, 68, 0.5);  box-shadow: 0 0 10px rgba(255, 68, 68, 0.2) inset; }

/* ── Corps ───────────────────────────────────────────── */
.card-body {
  position: relative;
  z-index: 1;
  padding: 12px 14px 14px;
}

.card-title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 800;
  color: var(--accent);
  text-shadow: 0 0 10px rgba(var(--accent-rgb), 0.8), 0 0 25px rgba(var(--accent-rgb), 0.4);
  line-height: 1.3;
}

.card-sector {
  margin: 0 0 8px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: rgba(var(--accent-rgb), 0.5);
  font-family: 'Courier New', monospace;
}

.card-desc {
  margin: 0;
  font-size: 12px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.48);
}

.card-divider {
  margin: 12px 0;
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    rgba(var(--accent-rgb), 0.3) 0px,
    rgba(var(--accent-rgb), 0.3) 4px,
    transparent 4px,
    transparent 8px
  );
}

.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.taches-lbl {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.35);
  font-family: 'Courier New', monospace;
}

.xp {
  font-size: 13px;
  font-weight: 800;
  color: var(--accent);
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 8px rgba(var(--accent-rgb), 0.9), 0 0 20px rgba(var(--accent-rgb), 0.5);
}

/* ── Cadenas hologramme ──────────────────────────────── */
.card-lock {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 18px;
  background: rgba(0, 10, 30, 0.75);
  backdrop-filter: blur(3px);
  border: 1px solid rgba(0, 200, 255, 0.25);
}

.lock-icon {
  color: #00d4ff;
  filter: drop-shadow(0 0 6px rgba(0, 212, 255, 1))
          drop-shadow(0 0 18px rgba(0, 212, 255, 0.7))
          drop-shadow(0 0 40px rgba(0, 212, 255, 0.4));
  animation: holo-pulse 2s ease-in-out infinite;
}

.holo-lock {
  width: 56px;
  height: 68px;
}


.lesson-name {
  color: #ffd700;
  font-weight: 700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.7);
  text-transform: none;
  letter-spacing: 0;
}

.lock-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(0, 200, 255, 0.9);
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.8), 0 0 20px rgba(0, 200, 255, 0.4);
  animation: holo-pulse 2s ease-in-out infinite;
}

@keyframes holo-pulse {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1; }
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 860px) { .cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .cards { grid-template-columns: 1fr; } }
</style>
