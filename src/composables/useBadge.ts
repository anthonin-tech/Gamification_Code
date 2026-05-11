import { useAchievementStore } from "@/stores/useAchievementStore"
import { ACHIEVEMENTS } from "@/data/achievements"
import { computed } from "vue"

export function useBadge() {
    const useAchievement = useAchievementStore()
    
    const succes = computed(() => {
        return ACHIEVEMENTS.filter(a => useAchievement.unlockedAchievements.includes(a.achievementId))
    })

    return {
        succes
    }
}