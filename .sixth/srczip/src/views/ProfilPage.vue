<script setup lang="ts">
import SpaceBackground    from '@/components/Galaxie_Profil/SpaceBackground.vue'
import BlackHoleAvatar    from '@/components/Galaxie_Profil/BlackHoleAvatar.vue'
import OrbitStage         from '@/components/Galaxie_Profil/OrbitStage.vue'
import HeroBadge          from '@/components/Galaxie_Profil/HeroBadge.vue'
import HexagonStat        from '@/components/Galaxie_Profil/HexagonStat.vue'
import SectionCard        from '@/components/Galaxie_Profil/SectionCard.vue'
import WormholeActivity   from '@/components/Galaxie_Profil/WormholeActivity.vue'
import ConstellationBoard from '@/components/Galaxie_Profil/ConstellationBoard.vue'
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

<style scoped>
.profil-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

.profil-hero__text {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
}

.profil-hero__name {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  background: linear-gradient(90deg, #ff5ccc 0%, #d380ff 35%, #7f96ff 72%, #61c8ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
}

.profil-hero__title {
  color: #c9a8ff;
  font-size: clamp(0.95rem, 1.6vw, 1.35rem);
  letter-spacing: -0.01em;
  margin: 0;
}

.profil-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3.5rem;
}

.activities-stack {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.profil-section--last {
  margin-bottom: 0 !important;
}

@media (max-width: 1100px) { .profil-stats { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px)  { .profil-stats { grid-template-columns: 1fr 1fr; } }
</style>
