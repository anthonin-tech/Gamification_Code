<template>
  <div class="profile-header">
    <!-- Avatar avec effet black hole -->
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

    <!-- Informations utilisateur -->
    <div class="profile-info">
      <h1 class="profile-username">{{ profile.username }}</h1>
      <p class="profile-title">{{ profile.title }}</p>
      
      <!-- Barre de progression XP -->
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
import { computed } from 'vue'
import type { UserProfile } from '@/types'

/**
 * Composant ProfileHeader
 * 
 * Affiche les informations principales du profil utilisateur
 * avec des animations et effets visuels modernes.
 * 
 * Props:
 * - profile: Objet UserProfile avec toutes les données
 * - levelProgress: Pourcentage de progression vers le niveau suivant
 */

interface Props {
  profile: UserProfile
  levelProgress: number
}

const props = defineProps<Props>()

/**
 * Convertit les noms d'icônes en emojis
 * En production, utiliser une bibliothèque d'icônes comme lucide-vue
 */
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

<style scoped>
/* Container principal */
.profile-header {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 0.5s ease-out;
}

/* Avatar avec effet black hole */
.profile-avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto var(--spacing-lg);
}

.black-hole-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  background: radial-gradient(
    circle,
    rgba(124, 58, 237, 0.4) 0%,
    rgba(59, 130, 246, 0.2) 50%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pulse 3s infinite;
}

.profile-avatar {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid var(--primary);
  object-fit: cover;
  box-shadow: 0 0 30px rgba(124, 58, 237, 0.6);
  z-index: 1;
}

.level-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--gradient-primary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--bg);
  box-shadow: var(--shadow-glow);
  z-index: 2;
}

.level-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

/* Informations utilisateur */
.profile-info {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.profile-username {
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-xs);
}

.profile-title {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-bottom: var(--spacing-lg);
}

/* Section XP */
.xp-section {
  max-width: 400px;
  margin: 0 auto;
}

.xp-bar {
  margin-bottom: var(--spacing-sm);
}

.xp-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.xp-label {
  color: var(--text-muted);
}

.xp-value {
  color: var(--primary);
  font-weight: 600;
}

/* Stats rapides */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.quick-stat {
  background: var(--surface);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: transform var(--transition-fast);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.quick-stat:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  font-size: 2rem;
  filter: drop-shadow(0 0 10px rgba(124, 58, 237, 0.5));
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-header {
    padding: var(--spacing-lg);
  }

  .profile-avatar-container {
    width: 120px;
    height: 120px;
  }

  .black-hole-effect {
    width: 150px;
    height: 150px;
  }

  .profile-username {
    font-size: 1.5rem;
  }

  .quick-stats {
    grid-template-columns: 1fr;
  }
}
</style>
