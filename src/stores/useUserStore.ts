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
        completeMissions: [],
        editorTheme: 'codequest',
        badges: [],
        favoriteLanguages: [],
        streak: 0
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
            this.editorTheme = 'codequest'

            const savedXP = localStorage.getItem('userXP')
            this.userXP = savedXP ? Number(savedXP) : (userData.userXP ?? 0)
            
            const savedMission = localStorage.getItem('completeMissions')
            this.completeMissions = savedMission ? JSON.parse(savedMission) : (userData.completeMissions ?? [])

            const savedEditorTheme = localStorage.getItem('editorTheme')
            this.editorTheme = savedEditorTheme ? JSON.parse(savedEditorTheme) : 'codequest'

            const savedBadge = localStorage.getItem('badges')
            this.badges = userData.badges ?? (savedBadge ? JSON.parse(savedBadge) : [])

            const savedFavoriteLangage = localStorage.getItem('favoriteLanguages')
            this.favoriteLanguages = userData.favoriteLanguages ?? (savedFavoriteLangage ? JSON.parse(savedFavoriteLangage) : [])

            const savedStreakDay = localStorage.getItem('streak')
            this.streak = userData.streak ?? (savedStreakDay ? JSON.parse(savedStreakDay) : 0)

            localStorage.setItem('userXP', String(this.userXP))
            localStorage.setItem('completeMissions', JSON.stringify(this.completeMissions))
            localStorage.setItem('badges', JSON.stringify(this.badges))
            localStorage.setItem('favoriteLanguages', JSON.stringify(this.favoriteLanguages))
            localStorage.setItem('streak', JSON.stringify(this.streak))
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
        },
        updateEditorTheme(theme: string) {
            if (this.editorTheme) {
                this.editorTheme = theme
                localStorage.setItem('editorTheme', JSON.stringify(this.editorTheme))
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
    editorTheme: string
    badges: number[]
    favoriteLanguages: string[]
    streak: number
}