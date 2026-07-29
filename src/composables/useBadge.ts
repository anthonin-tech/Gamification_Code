import { BADGES } from "@/data/badges"
import { useUserStore } from "@/stores/useUserStore"


export function useBadge() {
    const useUser = useUserStore()

    async function unlockBadge(badgeId: number) {
        const response = await fetch('/api/badges/unlock', {
            method: 'POST',
            body: JSON.stringify({ badgeId }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            useUser.badges.push(badgeId)
        }
        return response
    }

    function isConditionMet(condition: string, value: number): boolean {
        switch (condition) {
            case 'first_connection': return value >= 1
            case 'first_lesson':    return value >= 1
            case 'lessons_10':      return value >= 10
            case 'lessons_50':      return value >= 50
            case 'first_mission':   return value >= 1
            case 'missions_all':    return value >= 9
            case 'mission_1':       return value === 1
            case 'mission_2':       return value === 2
            case 'mission_3':       return value === 3
            case 'mission_4':       return value === 4
            case 'mission_5':       return value === 5
            case 'mission_6':       return value === 6
            case 'mission_7':       return value === 7
            case 'mission_8':       return value === 8
            case 'mission_9':       return value === 9
            default:                return false
        }
    }

    async function checkAndUnlock(badgeId: number, value: number) {
        if (useUser.badges.includes(badgeId)) return
        const badge = BADGES.find(b => b.id === badgeId)
        if (!badge) return
        if (isConditionMet(badge.condition, value)) {
            await unlockBadge(badgeId)
        }
    }

    return { unlockBadge, checkAndUnlock }
}
