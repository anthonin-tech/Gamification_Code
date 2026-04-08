<script setup lang="ts">
import { computed } from 'vue'
import type { UseProfile } from '../../../types/profile';
import LanguageBadge from './LanguageBadge.vue'

interface Props {
    profile: UseProfile
}

const props = defineProps<Props>()

const progressWidth = computed(() =>{
    const improvement = props.profile.biggestProgress.improvement
    return Math.min((improvement / 100), 100)
}) 
</script>

<template>
  <div class="profile-card">
    <div class="profile-header">
      <div class="avatar-container">
        <div class="avatar">
          <img 
            v-if="profile.avatarImage" 
            :src="profile.avatarImage" 
            :alt="profile.username"
            class="avatar-image"
          />
          <span v-else class="avatar-emoji">
            {{ profile.avatar }}
          </span>
        </div>
        <div class="level-badge">
          LV {{ profile.level }}
        </div>
      </div>
      <div class="profile-info">
        <h1 class="username">{{ profile.username }}</h1>
        <p class="role">{{ profile.role }}</p>
      </div>
    </div>
    <div class="languages-section">
      <h2 class="section-title">Langages favoris</h2>
      <div class="languages-grid">
        <LanguageBadge
          v-for="lang in profile.favoriteLanguages"
          :key="lang.name"
          :language="lang"
        />
      </div>
    </div>
    <div class="progress-section">
      <div class="progress-header">
        <span class="progress-icon">
          {{ profile.biggestProgress.icon }}
        </span>
        <div>
          <p class="progress-label">Plus grosse progression</p>
          <h3 class="progress-language">
            {{ profile.biggestProgress.language }}
          </h3>
        </div>
      </div>
      <div class="progress-value">
        +{{ profile.biggestProgress.improvement }}%
      </div>
      <div class="progress-bar-container">
        <div 
          class="progress-bar-fill"
          :style="{ width: progressWidth + '%' }"
        />
      </div>
    </div>
  </div>
</template>

<style src="../../assets/styles/components/Galaxie_Profil/ProfileCard.css"></style>
