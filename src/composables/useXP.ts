import { computed } from "vue"
import { useUserStore } from "@/stores/useUserStore"

export function useXP() {
    const userStore = useUserStore()
    
    const currentLevel = computed(() => {
        return Math.floor( userStore.userXP / 500 ) + 1
    })

    const progressPercent = computed(() => {
        return Math.floor( userStore.userXP % 500 ) / 500 * 100
    })

    return {
        currentLevel, progressPercent
    }
}