import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserProfile } from '@/types'

/**
 * Store Pinia pour le profil utilisateur
 * 
 * Gère l'état global du profil accessible partout dans l'application
 */
export const useProfileStore = defineStore('profile', () => {
  // État
  const profile = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters (computed)
  const isAuthenticated = computed(() => profile.value !== null)
  
  const level = computed(() => profile.value?.level || 0)
  
  const totalXP = computed(() => {
    if (!profile.value) return 0
    return parseInt(profile.value.energy.replace('K', '')) * 1000
  })

  const topSkills = computed(() => {
    if (!profile.value) return []
    return [...profile.value.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 5)
  })

  const unlockedAchievementsCount = computed(() => {
    if (!profile.value) return 0
    return profile.value.achievements.filter(a => a.unlocked).length
  })

  // Actions
  async function loadProfile() {
    loading.value = true
    error.value = null

    try {
      // Charger depuis localStorage ou API
      const saved = localStorage.getItem('codequest_profile')
      
      if (saved) {
        profile.value = JSON.parse(saved)
      } else {
        // Charger le profil par défaut
        const { USER_PROFILE } = await import('@/data/profil')
        profile.value = USER_PROFILE
        saveProfile()
      }
    } catch (e) {
      error.value = 'Impossible de charger le profil'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  function saveProfile() {
    if (profile.value) {
      localStorage.setItem('codequest_profile', JSON.stringify(profile.value))
    }
  }

  function updateUsername(newUsername: string) {
    if (profile.value) {
      profile.value.username = newUsername
      saveProfile()
    }
  }

  function updateAvatar(newAvatarUrl: string) {
    if (profile.value) {
      profile.value.avatarUrl = newAvatarUrl
      saveProfile()
    }
  }

  function addXP(amount: number) {
    if (profile.value) {
      const currentXP = totalXP.value
      const newXP = currentXP + amount
      
      // Convertir en format "XX.XK"
      profile.value.energy = `${(newXP / 1000).toFixed(1)}K`
      
      // Vérifier si on monte de niveau
      const xpPerLevel = 1000
      const newLevel = Math.floor(newXP / xpPerLevel)
      
      if (newLevel > profile.value.level) {
        profile.value.level = newLevel
        console.log(`🎉 Niveau ${newLevel} atteint !`)
      }
      
      saveProfile()
    }
  }

  function updateSkillLevel(skillName: string, newLevel: number) {
    if (!profile.value) return

    const skill = profile.value.skills.find(s => s.name === skillName)
    if (skill) {
      skill.level = Math.min(100, Math.max(0, newLevel))
      saveProfile()
    }
  }

  function unlockAchievement(achievementId: number) {
    if (!profile.value) return

    const achievement = profile.value.achievements.find(a => a.id === achievementId)
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true
      saveProfile()
      
      // Ajouter de l'XP pour l'achievement
      const xpReward = {
        common: 100,
        rare: 250,
        epic: 500,
        legendary: 1000
      }[achievement.rarity]
      
      addXP(xpReward)
      
      return achievement
    }
  }

  function resetProfile() {
    localStorage.removeItem('codequest_profile')
    profile.value = null
  }

  return {
    // État
    profile,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    level,
    totalXP,
    topSkills,
    unlockedAchievementsCount,
    
    // Actions
    loadProfile,
    saveProfile,
    updateUsername,
    updateAvatar,
    addXP,
    updateSkillLevel,
    unlockAchievement,
    resetProfile
  }
})
