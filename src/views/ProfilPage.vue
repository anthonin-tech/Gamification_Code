<script setup lang="ts">
import SpaceBackground      from '@/components/profile/SpaceBackground.vue'
import CharacterPanel       from '@/components/profile/CharacterPanel.vue'
import XpCard               from '@/components/profile/XpCard.vue'
import StreakCard            from '@/components/profile/StreakCard.vue'
import FavoriteLanguages    from '@/components/profile/FavoriteLanguages.vue'
import CurrentLanguageCard  from '@/components/profile/CurrentLanguageCard.vue'
import { useUserStore } from '@/stores/useUserStore'
import { useXP } from '@/composables/useXP'
import { computed } from 'vue'
import { XP_PER_LEVEL } from '@/utils/constants'
import { CURRICULUM_PYTHON }     from '@/data/curriculum'
import { CURRICULUM_JAVASCRIPT } from '@/data/curriculum-javascript'
import { CURRICULUM_TYPESCRIPT } from '@/data/curriculum-typescript'
import { CURRICULUM_JAVA }       from '@/data/curriculum-java'
import { CURRICULUM_PHP }        from '@/data/curriculum-php'
import { CURRICULUM_GO }         from '@/data/curriculum-go'
import { CURRICULUM_CPP }        from '@/data/curriculum-cpp'
import { CURRICULUM_RUST }       from '@/data/curriculum-rust'
import { CURRICULUM_CSHARP }     from '@/data/curriculum-csharp'
import { useRouter } from 'vue-router'
import { BADGES } from '@/data/badges'

const userStore = useUserStore()
const { currentLevel } = useXP()

const LANG_META: Record<string, { icon: string; color: string; glow: string }> = {
  javascript: { icon: '/icons/javascript.svg', color: '#F7DC6F', glow: 'rgba(247, 220, 111, 0.4)' },
  python:     { icon: '/icons/python.webp',    color: '#3776AB', glow: 'rgba(55, 118, 171, 0.4)'  },
  typescript: { icon: '/icons/typescript.png', color: '#3178C6', glow: 'rgba(49, 120, 198, 0.4)'  },
  java:       { icon: '/icons/java.png',       color: '#b07219', glow: 'rgba(176, 114, 25, 0.4)'  },
  php:        { icon: '/icons/php.webp',       color: '#787CB5', glow: 'rgba(120, 124, 181, 0.4)' },
  go:         { icon: '/icons/go.png',         color: '#00ADD8', glow: 'rgba(0, 173, 216, 0.4)'   },
  cpp:        { icon: '/icons/cpp.webp',       color: '#093eef', glow: 'rgba(9, 62, 239, 0.4)'    },
  rust:       { icon: '/icons/rust.png',       color: '#fbd491', glow: 'rgba(251, 212, 145, 0.4)' },
  csharp:     { icon: '/icons/csharp.png',     color: '#9B4FD0', glow: 'rgba(155, 79, 208, 0.4)'  },
}

const progressionLangages = computed(() => [
  { langage: 'python',     curriculum: CURRICULUM_PYTHON },
  { langage: 'javascript', curriculum: CURRICULUM_JAVASCRIPT },
  { langage: 'typescript', curriculum: CURRICULUM_TYPESCRIPT },
  { langage: 'java',       curriculum: CURRICULUM_JAVA },
  { langage: 'php',        curriculum: CURRICULUM_PHP },
  { langage: 'go',         curriculum: CURRICULUM_GO },
  { langage: 'cpp',        curriculum: CURRICULUM_CPP },
  { langage: 'rust',       curriculum: CURRICULUM_RUST },
  { langage: 'csharp',     curriculum: CURRICULUM_CSHARP },
].map(({ langage, curriculum }) => {
  const saved = localStorage.getItem(`codequest_${langage}_progress`)
  const completedLessons: number[] = saved ? JSON.parse(saved).completedLessons ?? [] : []
  const total = curriculum.reduce((acc, module) => acc + module.lessons.length, 0)
  return { langage, completed: completedLessons.length, total }
}))

const router = useRouter()

async function logout() {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'include'})
  userStore.resetUser()
  router.push('/login')
}

const RecentBadges = computed(() => {
  return userStore.badges.map(id => BADGES.find(b => b.id === id)).filter(Boolean).slice(-3)
})

const selectedLanguages = computed(() => userStore.favoriteLanguages)

const favLangsDisplay = computed(() =>
  selectedLanguages.value.map(slug => ({
    name:  slug,
    icon:  LANG_META[slug]?.icon  ?? '',
    color: LANG_META[slug]?.color ?? '#fff',
    glow:  LANG_META[slug]?.glow  ?? 'rgba(255,255,255,0.2)',
  }))
)

async function toggleLanguage(slug: string) {
  if (selectedLanguages.value.includes(slug)) {
    userStore.favoriteLanguages = userStore.favoriteLanguages.filter(s => s !== slug)
  }
  else if (selectedLanguages.value.length < 3) {
    userStore.favoriteLanguages.push(slug)
  }
  return await fetch('/api/profil/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({ favoriteLanguages: userStore.favoriteLanguages })
  })
}

const CURRICULUM_MAP: Record<string, any[]> = {
  python: CURRICULUM_PYTHON, javascript: CURRICULUM_JAVASCRIPT,
  typescript: CURRICULUM_TYPESCRIPT, java: CURRICULUM_JAVA,
  php: CURRICULUM_PHP, go: CURRICULUM_GO,
  cpp: CURRICULUM_CPP, rust: CURRICULUM_RUST, csharp: CURRICULUM_CSHARP,
}

const currentLanguage = computed(() => {
  const best = progressionLangages.value.reduce((meilleur, actuel) => actuel.completed/actuel.total > meilleur.completed/meilleur.total ? actuel : meilleur)
  const saved = localStorage.getItem(`codequest_${best.langage}_progress`)
  const completedSet = new Set<string>(saved ? JSON.parse(saved).completedLessons ?? [] : [])
  const curriculum = CURRICULUM_MAP[best.langage] ?? []
  let nextLesson = ''
  outer: for (let mi = 0; mi < curriculum.length; mi++) {
    for (let li = 0; li < curriculum[mi].lessons.length; li++) {
      if (!completedSet.has(`${mi}-${li}`)) {
        nextLesson = curriculum[mi].lessons[li].title
        break outer
      }
    }
  }
  return {
    name:     best.langage,
    icon:     LANG_META[best.langage]?.icon  ?? '',
    color:    LANG_META[best.langage]?.color ?? '#fff',
    progress: best.total > 0 ? Math.round(best.completed / best.total * 100) : 0,
    mission:  nextLesson
  }
})
</script>

<template>
  <div class="profil-page">
    <SpaceBackground />
    <div class="profil-layout">

      <CharacterPanel
        :avatar-url="userStore.userAvatar ?? ''"
        :level="currentLevel"
      />

      <section class="profil-info">
        <header>
          <span class="profil-header__tag">PROFIL</span>
          <h1 class="profil-header__username">{{ userStore.username }}</h1>
          <p class="profil-header__title">Cosmic Developer</p>
        </header>

        <XpCard
          :xp="userStore.userXP % XP_PER_LEVEL"
          :xp-to-next="XP_PER_LEVEL"
          :level="currentLevel"
        />

        <section class="stat">
          <span class="stat__value">{{ userStore.completeMissions.length }}</span>
          <span class="stat__label">Missions terminées</span>
        </section>

        <section class="langages">
          <div 
            v-for="{ langage, completed, total } in progressionLangages"
            @click="toggleLanguage(langage)"
            :class="{ 'lang-selected': selectedLanguages.includes(langage) }"
          >
            <img :src="LANG_META[langage]?.icon" />
            {{ langage }}
            <div class="lang-bar">
              <div class="lang-bar__fill" :style="{ width: (total > 0 ? Math.round(completed/total * 100) : 0) + '%' }" />
            </div>
          </div>
        </section>

        <FavoriteLanguages :languages="favLangsDisplay" />
        
        <StreakCard :streak="userStore.streak" />

        <CurrentLanguageCard :language="currentLanguage" />

        <section class="badges">
          <h2>Badges récents</h2>
          <span v-for="badges in RecentBadges"
            :key="badges?.id" 
          >
            {{ badges?.icon }}
          </span>
          <RouterLink to="/galaxy">Voir tous</RouterLink>
        </section>
      </section>
    </div>

    <button @click="logout">Se déconnecter</button>
  </div>
</template>

<style scoped src="@/assets/styles/pages/profil.css" />
