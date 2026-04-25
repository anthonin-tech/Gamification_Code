<script setup lang="ts">
import SpaceBackground      from '@/components/profile/SpaceBackground.vue'
import CharacterPanel       from '@/components/profile/CharacterPanel.vue'
import XpCard               from '@/components/profile/XpCard.vue'
import StreakCard            from '@/components/profile/StreakCard.vue'
import FavoriteLanguages    from '@/components/profile/FavoriteLanguages.vue'
import CurrentLanguageCard  from '@/components/profile/CurrentLanguageCard.vue'
import { USER_PROFILE } from '@/data/profil'
</script>

<template>
  <div class="profil-page">
    <SpaceBackground />
    <div class="profil-layout">

      <CharacterPanel
        :avatar-url="USER_PROFILE.avatarUrl"
        :level="USER_PROFILE.level"
      />

      <section class="profil-info">
        <header>
          <span class="profil-header__tag">PROFIL</span>
          <h1 class="profil-header__username">{{ USER_PROFILE.username }}</h1>
          <p  class="profil-header__title">{{ USER_PROFILE.title }}</p>
        </header>

        <XpCard
          :xp="USER_PROFILE.xp"
          :xp-to-next="USER_PROFILE.xpToNext"
          :level="USER_PROFILE.level"
        />

        <StreakCard :streak="USER_PROFILE.streak" />

        <FavoriteLanguages :languages="USER_PROFILE.favoriteLanguages" />

        <CurrentLanguageCard :language="USER_PROFILE.currentLanguage" />

      </section>
    </div>

  </div>
</template>

<style scoped src="@/assets/styles/pages/profil.css" />
