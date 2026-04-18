<template>
  <div class="profile-header">
    <div class="profile-avatar-container">
      <div class="black-hole-effect"></div>
      <img 
        :src="profile.avatarUrl" 
        :alt="`Avatar de ${profile.username}`"
        class="profile-avatar"
      />
      <div class="level-badge">
        <span class="level-number">{{ profile.level }}</span>
      </div>
    </div>

    <div class="profile-info">
      <h1 class="profile-username">{{ profile.username }}</h1>
      <p class="profile-title">{{ profile.title }}</p>

      <div class="xp-section">
        <div class="xp-bar">
          <div class="progress-bar">
            <div 
              class="progress-bar-fill" 
              :style="{ width: `${levelProgress}%` }"
            ></div>
          </div>
        </div>
        <div class="xp-info">
          <span class="xp-label">Niveau {{ profile.level }}</span>
          <span class="xp-value">{{ profile.energy }} XP</span>
        </div>
      </div>
    </div>

    <!-- Stats rapides -->
    <div class="quick-stats">
      <div 
        v-for="stat in profile.stats" 
        :key="stat.label"
        class="quick-stat"
        :class="`gradient-${stat.color}`"
      >
        <div class="stat-icon">{{ getIcon(stat.icon) }}</div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserProfile } from '@/types'

interface Props {
  profile: UserProfile
  levelProgress: number
}

const props = defineProps<Props>()

const getIcon = (iconName: string): string => {
  const icons: Record<string, string> = {
    'zap': '⚡',
    'layers': '📚',
    'globe': '🌍',
    'trending-up': '📈'
  }
  return icons[iconName] || '✨'
}
</script>

<style src="@/assets/styles/components/Galaxie_Profil/ProfileHeader.css"></style>