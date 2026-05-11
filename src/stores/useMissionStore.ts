import { defineStore } from 'pinia'
import { useUserStore } from './useUserStore'
import { MISSIONS } from '@/data/missions'

export const useMissionStore = defineStore('mission', {
    state:(): IMissionState => ({
        missionEnCoursId: null,
        missionFailed: false,
        missionSucceed: false,
        taskCompletes: []
    }),
    actions: {
        startMission(missionId: number) {
            this.missionEnCoursId = missionId
        },
        taskCheck(check: boolean, task: number) {
            if (check === true) {
                this.taskCompletes.push(task)
            }
        },
        result(win: boolean) {
            if (win === true) {
                const userStore = useUserStore()
                this.missionSucceed = true
                const xpRecompense = MISSIONS.find(m => m.missionId === this.missionEnCoursId)?.xpRecompense ?? 0
                userStore.updateXp(xpRecompense)
            } else {
                this.missionFailed = true
                this.replay()
            }
        },
        replay() {
            if (this.missionFailed === true) {
                return this.missionFailed = false 
            }
        }
    }
})

interface IMissionState {
    missionEnCoursId: number | null
    missionFailed: boolean
    missionSucceed: boolean
    taskCompletes: number[]
}