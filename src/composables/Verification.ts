import type { IMission } from '@/types/missions'


export function Verification (mission: IMission, code: string) {
    const resultat = mission.verification.map(regle => ({
        taskId: regle.taskId,
        valide: code.includes(regle.wordKey)
    }))

    return resultat
}