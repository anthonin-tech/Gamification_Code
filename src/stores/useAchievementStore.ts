import { defineStore } from 'pinia'
import { useMissionStore } from '@/stores/useMissionStore'
import { ACHIEVEMENTS } from '@/data/achievements'

export const useAchievementStore = defineStore('achievement', {
    state:(): IAchievementStore => ({
        unlockedAchievements: []
    }),
    actions: {
        unlock(missionId: number) {
            const missionStore = useMissionStore()
            if (missionStore.missionSucceed === true) {
                const achievement = ACHIEVEMENTS.find(a => a.missionId === missionId)
                if (achievement) {
                    this.unlockedAchievements.push(achievement.achievementId)
                }
            }
        }
    }
})

interface IAchievementStore { 
    unlockedAchievements: number[]
}