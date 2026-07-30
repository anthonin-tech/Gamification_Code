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
            case 'missions_all':    return value >= 90
            case 'mission_10':      return value === 10
            case 'mission_20':      return value === 20
            case 'mission_30':      return value === 30
            case 'mission_40':      return value === 40
            case 'mission_50':      return value === 50
            case 'mission_60':      return value === 60
            case 'mission_70':      return value === 70
            case 'mission_80':      return value === 80
            case 'mission_90':      return value === 90
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
