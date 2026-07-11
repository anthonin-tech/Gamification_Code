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
          :xp="userStore.userXP % 500
          "
          :xp-to-next="500"
          :level="currentLevel"
        />

        <section class="stat">
          <span class="stat__value">{{ userStore.completeMissions.length }}</span>
          <span class="stat__label">Missions terminées</span>
        </section>

        <section class="langages">
          <div v-for="{ langage, completed, total } in progressionLangages">
            {{ langage }}
            <div class="lang-bar">
              <div class="lang-bar__fill" :style="{ width: (total > 0 ? Math.round(completed/total * 100) : 0) + '%' }" />
            </div>
          </div>
        </section>

        <StreakCard :streak="0" />

        <FavoriteLanguages :languages="[]" />

        <CurrentLanguageCard :language="{ name: userStore.userFavoriteLanguage ?? '', icon: '', color: '#7c3aed', progress: 0, mission: '' }" />

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
