<script setup lang="ts">
import SpaceBackground    from '@/components/profile/SpaceBackground.vue'
import BlackHoleAvatar    from '@/components/profile/BlackHoleAvatar.vue'
import OrbitStage         from '@/components/profile/OrbitStage.vue'
import HeroBadge          from '@/components/profile/HeroBadge.vue'
import HexagonStat        from '@/components/profile/HexagonStat.vue'
import SectionCard        from '@/components/profile/SectionCard.vue'
import WormholeActivity   from '@/components/profile/WormholeActivity.vue'
import ConstellationBoard from '@/components/profile/ConstellationBoard.vue'
import { USER_PROFILE }   from '@/data/profil'
</script>

<template>
  <div class="profil-page">
    <SpaceBackground />

    <main class="profil-shell">

      <!-- HERO -->
      <section class="profil-hero">
        <OrbitStage :skills="USER_PROFILE.skills">
          <BlackHoleAvatar :avatar-url="USER_PROFILE.avatarUrl" />
        </OrbitStage>

        <div class="profil-hero__text">
          <h1 class="profil-hero__name">{{ USER_PROFILE.username }}</h1>
          <p class="profil-hero__title">{{ USER_PROFILE.title }}</p>
          <HeroBadge :level="USER_PROFILE.level" :energy="USER_PROFILE.energy" />
        </div>
      </section>

      <!-- HEX STATS -->
      <div class="profil-stats" aria-label="Statistiques du profil">
        <HexagonStat
          v-for="stat in USER_PROFILE.stats"
          :key="stat.label"
          :stat="stat"
        />
      </div>

      <!-- ACTIVITIES -->
      <SectionCard title="Interdimensional Activities" icon-color="#08d8ff">
        <template #icon>
          <svg viewBox="0 0 24 24">
            <path d="M10 4.5c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5c3.2 0 5.9-2.3 6.4-5.4"/>
            <path d="M14.2 6.5a4 4 0 0 1 4.3 3.3"/>
            <circle cx="6"    cy="6"    r="1.2" fill="currentColor" stroke="none"/>
            <circle cx="18.5" cy="9"    r="1.2" fill="currentColor" stroke="none"/>
            <circle cx="15"   cy="18.5" r="1.2" fill="currentColor" stroke="none"/>
          </svg>
        </template>
        <div class="activities-stack">
          <WormholeActivity
            v-for="activity in USER_PROFILE.activites"
            :key="activity.title"
            :activity="activity"
          />
        </div>
      </SectionCard>

      <!-- ACHIEVEMENTS -->
      <SectionCard title="Achievement Constellation" icon-color="#ffcd1e" class="profil-section--last">
        <template #icon>
          <svg viewBox="0 0 24 24">
            <path d="M8 3.5h8v5.8a4 4 0 0 1-8 0V3.5Z"/>
            <path d="M9.4 13.2L8.4 20l3.6-2.2l3.6 2.2l-1-6.8"/>
          </svg>
        </template>
        <ConstellationBoard :achievements="USER_PROFILE.achievements" />
      </SectionCard>

    </main>
  </div>
</template>

<style scoped src="@/assets/styles/pages/profil.css"></style>
