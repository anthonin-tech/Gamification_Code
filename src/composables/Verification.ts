import type { IMission } from '@/types/missions'


export async function Verification (mission: IMission, code: string, langage: string) {
    const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code, langage })
    })
    const data = await response.json()
    const stdout = data.stdout

    return mission.verification.map(regle => ({ 
    taskId: regle.taskId,
    valide: regle.expectedOutput === ''
        ? code.includes(regle.wordKey)
        : code.includes(regle.wordKey) && stdout.trim() === regle.expectedOutput
    }))
}