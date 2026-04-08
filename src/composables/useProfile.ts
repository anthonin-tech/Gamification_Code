import { computed, ref } from 'vue'
import type { UseProfile } from "../../types/profile";

export const useProfile = () => {
    const profile = ref<UseProfile | null>(null)
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)
    const defaultProfile: UseProfile = {
            username: 'CodeMaster_Dev',
    avatar: '👨‍💻',
    role: 'Full Stack Developer',
    level: 42,
    favoriteLanguages: [
        {
            name: 'JavaScript',
            icon: '🟨',
            proficiency: 85,
            color: '#f7df1e'
        },
        {
            name: 'Python',
            icon: '🐍',
            proficiency: 78,
            color: '#3776ab'
        },
        {
            name: 'React',
            icon: '⚛️',
            proficiency: 82,
            color: '#61dafb'
        },
        {
            name: 'Vue.js',
            icon: '💚',
            proficiency: 74,
            color: '#4ade80'
        }
        ],
        biggestProgress: {
        language: 'Vue.js',
        improvement: 847,
        icon: '🚀'
        }
    }

    const fetchProfile = async () => {
        loading.value = true
        error.value = null

        try {
            await new Promise(resolve => setTimeout(resolve, 500))
            profile.value = defaultProfile
        } catch (err) {
            console.error('Erreur de chargement profil:', err)
            error.value = 'Impossible de charger le profil'
            profile.value = defaultProfile
        } finally {
            loading.value = false
        }
    }

    const getProgressWidth = computed(() => {
        if (!profile.value) return 0
        const improvement = profile.value.biggestProgress.improvement
        return Math.min((improvement / 10), 100)
    })

    return {
        profile,
        loading,
        error,
        fetchProfile,
        getProgressWidth
    }
}
