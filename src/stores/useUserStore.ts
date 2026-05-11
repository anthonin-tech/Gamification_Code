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
    }),
    actions: {
        initUser(userData: Partial<IUserState>) {
            this.userId = userData.userId ?? null
            this.username = userData.username ?? null
            this.useremail = userData.useremail ?? null
            this.userXP = userData.userXP ?? 0
            this.userLevel = userData.userLevel ?? 1
            this.userAvatar = userData.userAvatar ?? null
            this.userFavoriteLanguage = userData.userFavoriteLanguage ?? null
            this.isLoggedIn = true
        },
        resetUser() {
            this.$reset()
        },
        updateXp(recompenseXP: number) {
            if (this.userXP != null) {
                this.userXP += recompenseXP
            }
        },
        updateAvatar(avatarUrl: string) {
            this.userAvatar = avatarUrl
        },
        updateFavoriteLanguage(language: string) {
            this.userFavoriteLanguage = language
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
}