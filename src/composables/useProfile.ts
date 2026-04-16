import { ref, computed } from 'vue'
import type { UserProfile } from '@/types'

/**
 * Composable pour gérer le profil utilisateur
 * 
 * Ce composable centralise toute la logique du profil :
 * - Chargement des données
 * - Calculs dérivés (niveau suivant, XP manquant, etc.)
 * - Méthodes pour mettre à jour le profil
 * 
 * Avantages :
 * - Logique réutilisable dans plusieurs composants
 * - Testable facilement
 * - Séparation des responsabilités (logique VS présentation)
 */
export function useProfile() {
  // État réactif
  const profile = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Charge le profil depuis l'API ou le localStorage
   */
  async function loadProfile() {
    loading.value = true
    error.value = null

    try {
      // Simulation d'un appel API
      // En production, remplacer par : await fetch('/api/profile')
      const savedProfile = localStorage.getItem('codequest_profile')
      
      if (savedProfile) {
        profile.value = JSON.parse(savedProfile)
      } else {
        // Charger le profil par défaut
        profile.value = await import('@/data/profil').then(m => m.USER_PROFILE)
      }
    } catch (e) {
      error.value = 'Impossible de charger le profil'
      console.error('Erreur de chargement du profil:', e)
    } finally {
      loading.value = false
    }
  }

  /**
   * Sauvegarde le profil dans le localStorage
   */
  function saveProfile() {
    if (profile.value) {
      localStorage.setItem('codequest_profile', JSON.stringify(profile.value))
    }
  }

  /**
   * Calcule le pourcentage de progression vers le niveau suivant
   */
  const levelProgress = computed(() => {
    if (!profile.value) return 0
    
    const currentLevel = profile.value.level
    const xpForNextLevel = currentLevel * 1000 // Exemple : 1000 XP par niveau
    const currentXP = parseInt(profile.value.energy.replace('K', '')) * 1000
    
    return Math.min(100, (currentXP % xpForNextLevel) / xpForNextLevel * 100)
  })

  /**
   * Retourne les compétences triées par niveau
   */
  const topSkills = computed(() => {
    if (!profile.value) return []
    
    return [...profile.value.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 5)
  })

  /**
   * Calcule le nombre total de achievements débloqués
   */
  const unlockedAchievements = computed(() => {
    if (!profile.value) return 0
    return profile.value.achievements.filter(a => a.unlocked).length
  })

  /**
   * Met à jour une compétence
   */
  function updateSkill(skillName: string, newLevel: number) {
    if (!profile.value) return

    const skill = profile.value.skills.find(s => s.name === skillName)
    if (skill) {
      skill.level = Math.min(100, Math.max(0, newLevel))
      saveProfile()
    }
  }

  /**
   * Débloque un achievement
   */
  function unlockAchievement(achievementId: number) {
    if (!profile.value) return

    const achievement = profile.value.achievements.find(a => a.id === achievementId)
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true
      saveProfile()
      
      // Déclencher une notification
      console.log(`🎉 Achievement débloqué : ${achievement.name}`)
    }
  }

  return {
    // État
    profile,
    loading,
    error,
    
    // Computed
    levelProgress,
    topSkills,
    unlockedAchievements,
    
    // Méthodes
    loadProfile,
    saveProfile,
    updateSkill,
    unlockAchievement
  }
}
