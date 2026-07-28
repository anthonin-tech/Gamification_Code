import { defineStore } from 'pinia'

const DEFAULT_AVATAR: AvatarCustomization = {
    corpsColor: '#7c4dff',
    accentColor: '#14a7cc',
    casqueColor: '#1a1a2e',
    pattern: 'Aucun',
    accessories: { fusee: true, lunettes: false, couronne: false, casque: false, systeme: false }
}

export const useUserStore = defineStore('user', {
    state: (): IUserState => ({
        userId: null,
        username: null,
        useremail: null,
        userXP: 0,
        userLevel: 1,
        userAvatar: null,
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
        completeMissions: [],
        editorTheme: 'codequest',
        badges: [],
        favoriteLanguages: [],
        streak: 0,
        avatarCustomization: { ...DEFAULT_AVATAR, accessories: { ...DEFAULT_AVATAR.accessories } }
    }),
    actions: {
        initUser(userData: Partial<IUserState>) {
            this.userId = userData.userId ?? null
            this.username = userData.username ?? null
            this.useremail = userData.useremail ?? null
            this.userLevel = userData.userLevel ?? 1
            this.userAvatar = userData.userAvatar ?? null
            this.isLoggedIn = true
            localStorage.setItem('isLoggedIn', 'true')
            this.editorTheme = 'codequest'

            const savedXP = localStorage.getItem('userXP')
            this.userXP = userData.userXP ?? (savedXP ? Number(savedXP) : 0)

            const savedMission = localStorage.getItem('completeMissions')
            this.completeMissions = userData.completeMissions ?? (savedMission ? JSON.parse(savedMission) : [])

            const savedEditorTheme = localStorage.getItem('editorTheme')
            this.editorTheme = userData.editorTheme ?? (savedEditorTheme ? JSON.parse(savedEditorTheme) : 'codequest')

            const savedBadge = localStorage.getItem('badges')
            this.badges = userData.badges ?? (savedBadge ? JSON.parse(savedBadge) : [])

            const savedFavoriteLangage = localStorage.getItem('favoriteLanguages')
            this.favoriteLanguages = userData.favoriteLanguages ?? (savedFavoriteLangage ? JSON.parse(savedFavoriteLangage) : [])

            const savedStreakDay = localStorage.getItem('streak')
            this.streak = userData.streak ?? (savedStreakDay ? JSON.parse(savedStreakDay) : 0)

            const saveAvatarCustomization = localStorage.getItem('avatarcustomization')
            this.avatarCustomization = userData.avatarCustomization ?? (saveAvatarCustomization ? JSON.parse(saveAvatarCustomization) : this.avatarCustomization)

            localStorage.setItem('userXP', String(this.userXP))
            localStorage.setItem('completeMissions', JSON.stringify(this.completeMissions))
            localStorage.setItem('badges', JSON.stringify(this.badges))
            localStorage.setItem('favoriteLanguages', JSON.stringify(this.favoriteLanguages))
            localStorage.setItem('streak', JSON.stringify(this.streak))
        },
        resetUser() {
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('userXP')
            localStorage.removeItem('completeMissions')
            localStorage.removeItem('badges')
            localStorage.removeItem('favoriteLanguages')
            localStorage.removeItem('streak')
            localStorage.removeItem('avatarcustomization')
            localStorage.removeItem('editorTheme')
            for (const lang of ['python','javascript','typescript','java','php','go','cpp','rust','csharp']) {
                localStorage.removeItem(`codequest_${lang}_progress`)
            }
            this.$reset()
        },
        updateXp(recompenseXP: number) {
            if (this.userXP != null) {
                this.userXP += recompenseXP
                localStorage.setItem('userXP', String(this.userXP))
                fetch('/api/user/xp', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ xp: recompenseXP })
                })
            }
        },
        updateMisssion(id: number) {
            if (this.completeMissions) {
                this.completeMissions.push(id)
                localStorage.setItem('completeMissions', JSON.stringify(this.completeMissions))
                fetch('/api/user/missions', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ missionId: id })
                })
            }
        },
        updateEditorTheme(theme: string) {
            if (this.editorTheme) {
                this.editorTheme = theme
                localStorage.setItem('editorTheme', JSON.stringify(this.editorTheme))
            }
        },
        saveAvatarCustomization(data: AvatarCustomization) {
            this.avatarCustomization = data
           if (this.avatarCustomization != null) {
                localStorage.setItem('avatarcustomization', JSON.stringify(this.avatarCustomization))
                fetch('/api/user/avatar', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ avatarCustomization: data })
                })
            }
        },
    },
})

interface AvatarCustomization {
    corpsColor: string
    accentColor: string
    casqueColor: string
    pattern: string
    accessories: { fusee: boolean; lunettes: boolean; couronne: boolean; casque: boolean; systeme: boolean }
}

interface IUserState {
    userId: number | null
    username: string | null
    useremail: string | null
    userXP: number
    userLevel: number
    userAvatar: string | null
    isLoggedIn: boolean
    completeMissions: number[]
    editorTheme: string
    badges: number[]
    favoriteLanguages: string[]
    streak: number
    avatarCustomization: AvatarCustomization
}