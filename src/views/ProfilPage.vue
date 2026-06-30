<script setup lang="ts">
import SpaceBackground      from '@/components/profile/SpaceBackground.vue'
import CharacterPanel       from '@/components/profile/CharacterPanel.vue'
import XpCard               from '@/components/profile/XpCard.vue'
import StreakCard            from '@/components/profile/StreakCard.vue'
import FavoriteLanguages    from '@/components/profile/FavoriteLanguages.vue'
import CurrentLanguageCard  from '@/components/profile/CurrentLanguageCard.vue'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
</script>

<template>
  <div class="profil-page">
    <SpaceBackground />
    <div class="profil-layout">

      <CharacterPanel
        :avatar-url="userStore.userAvatar ?? ''"
        :level="userStore.userLevel"
      />

      <section class="profil-info">
        <header>
          <span class="profil-header__tag">PROFIL</span>
          <h1 class="profil-header__username">{{ userStore.username }}</h1>
          <p class="profil-header__title">Cosmic Developer</p>
        </header>

        <XpCard
          :xp="userStore.userXP"
          :xp-to-next="1000"
          :level="userStore.userLevel"
        />

        <StreakCard :streak="0" />

        <FavoriteLanguages :languages="[]" />

        <CurrentLanguageCard :language="{ name: userStore.userFavoriteLanguage ?? '', icon: '', color: '#7c3aed', progress: 0, mission: '' }" />

      </section>
    </div>

  </div>
</template>

<style scoped src="@/assets/styles/pages/profil.css" />
