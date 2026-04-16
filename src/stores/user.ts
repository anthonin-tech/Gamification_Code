import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Store pour les préférences utilisateur
 */
export const useUserStore = defineStore('user', () => {
  // État
  const theme = ref<'dark' | 'light'>('dark')
  const language = ref<'fr' | 'en'>('fr')
  const soundEnabled = ref(true)
  const notificationsEnabled = ref(true)

  // Charger les préférences au démarrage
  function loadPreferences() {
    const saved = localStorage.getItem('codequest_preferences')
    
    if (saved) {
      try {
        const prefs = JSON.parse(saved)
        theme.value = prefs.theme || 'dark'
        language.value = prefs.language || 'fr'
        soundEnabled.value = prefs.soundEnabled ?? true
        notificationsEnabled.value = prefs.notificationsEnabled ?? true
      } catch (e) {
        console.error('Erreur de chargement des préférences', e)
      }
    }
    
    // Appliquer le thème
    applyTheme()
  }

  // Sauvegarder les préférences
  function savePreferences() {
    const prefs = {
      theme: theme.value,
      language: language.value,
      soundEnabled: soundEnabled.value,
      notificationsEnabled: notificationsEnabled.value
    }
    
    localStorage.setItem('codequest_preferences', JSON.stringify(prefs))
  }

  // Changer le thème
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme()
    savePreferences()
  }

  function setTheme(newTheme: 'dark' | 'light') {
    theme.value = newTheme
    applyTheme()
    savePreferences()
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  // Changer la langue
  function setLanguage(newLanguage: 'fr' | 'en') {
    language.value = newLanguage
    savePreferences()
  }

  // Activer/désactiver le son
  function toggleSound() {
    soundEnabled.value = !soundEnabled.value
    savePreferences()
  }

  // Activer/désactiver les notifications
  function toggleNotifications() {
    notificationsEnabled.value = !notificationsEnabled.value
    savePreferences()
  }

  return {
    // État
    theme,
    language,
    soundEnabled,
    notificationsEnabled,
    
    // Actions
    loadPreferences,
    toggleTheme,
    setTheme,
    setLanguage,
    toggleSound,
    toggleNotifications
  }
})
