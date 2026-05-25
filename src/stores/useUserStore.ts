import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: (): IUserState => ({
        userId: null,
        username: null,
        useremail: null,
        userXP: 0,
        userLevel: 1,
        userAvatar: null,
        userFavoriteLanguage: null,
        isLoggedIn: false,
        completeMissions: []
    }),
    actions: {
        initUser(userData: Partial<IUserState>) {
            this.userId = userData.userId ?? null
            this.username = userData.username ?? null
            this.useremail = userData.useremail ?? null
            this.userLevel = userData.userLevel ?? 1
            this.userAvatar = userData.userAvatar ?? null
            this.userFavoriteLanguage = userData.userFavoriteLanguage ?? null
            this.isLoggedIn = true

            const savedXP = localStorage.getItem('userXP')
            this.userXP = savedXP ? Number(savedXP) : (userData.userXP ?? 0)
            
            const savedMission = localStorage.getItem('completeMissions')
            this.completeMissions = savedMission ? JSON.parse(savedMission) : (userData.completeMissions ?? [])

            localStorage.setItem('userXP', String(this.userXP))
            localStorage.setItem('completeMissions', JSON.stringify(this.completeMissions))
        },
        resetUser() {
            this.$reset()
        },
        updateXp(recompenseXP: number) {
            if (this.userXP != null) {
                this.userXP += recompenseXP
                localStorage.setItem('userXP', String(this.userXP) )
            }
        },
        updateAvatar(avatarUrl: string) {
            this.userAvatar = avatarUrl
        },
        updateFavoriteLanguage(language: string | null) {
            this.userFavoriteLanguage = language
        },
        updateMisssion(id: number) {
            if (this.completeMissions) {
                this.completeMissions.push(id)
                localStorage.setItem('completeMissions', JSON.stringify(this.completeMissions))
            }
        }
        
    },
    getters: {
        computedLevel() {
            return null
        }
    },
})

interface IUserState {
    userId: number | null
    username: string | null
    useremail: string | null
    userXP: number 
    userLevel: number 
    userAvatar: string | null
    userFavoriteLanguage: string | null
    isLoggedIn: boolean
    completeMissions: number[]
}