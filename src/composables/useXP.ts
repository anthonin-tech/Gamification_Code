import { computed } from "vue"
import { useUserStore } from "@/stores/useUserStore"
import { XP_PER_LEVEL } from "@/utils/constants"

export function useXP() {
    const userStore = useUserStore()

    const currentLevel = computed(() => {
        return Math.floor( userStore.userXP / XP_PER_LEVEL ) + 1
    })

    const progressPercent = computed(() => {
        return Math.floor( userStore.userXP % XP_PER_LEVEL ) / XP_PER_LEVEL * 100
    })

    return {
        currentLevel, progressPercent
    }
}