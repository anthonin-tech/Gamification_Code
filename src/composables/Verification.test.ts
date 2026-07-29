import { describe, it, expect } from 'vitest'
import { Verification } from './Verification'

describe('Verification', () => {
    it('retourne valide true si le mot clé est dans le code', async () => {
        const mission = {
            verification: [{ taskId: 1, wordKey: 'let' }]
        } as any

        const résultat = await Verification(mission, 'let score = 0', 'javascript')

        expect(résultat[0].valide).toBe(true)
    })

    it('retourne valide false si le mot clé est absent du code', async () => {
        const mission = {
            verification: [{ taskId: 1, wordKey: 'let' }]
        } as any

        const résultat = await Verification(mission, 'const score = 0', 'javascript')

        expect(résultat[0].valide).toBe(false)
    })

    it('gère plusieurs règles avec des résultats mixtes', async () => {
        const mission = {
            verification: [
                { taskId: 1, wordKey: 'let' },
                { taskId: 2, wordKey: 'const' },
                { taskId: 3, wordKey: 'console.log' }
            ]
        } as any

        const résultat = await Verification(mission, 'let score = 0', 'javascript')

        expect(résultat[0].valide).toBe(true)
        expect(résultat[1].valide).toBe(false)
        expect(résultat[2].valide).toBe(false)
    })

    it('retourne tout false si le code est vide', async () => {
        const mission = {
            verification: [
                { taskId: 1, wordKey: 'let' },
                { taskId: 2, wordKey: 'const' }
            ]
        } as any

        const résultat = await Verification(mission, '', 'javascript')

        expect(résultat.every(r => r.valide === false)).toBe(true)
    })

    it('retourne un tableau vide si la mission n\'a pas de règles', async () => {
        const mission = { verification: [] } as any

        const résultat = await Verification(mission, 'let score = 0', 'javascript')

        expect(résultat).toHaveLength(0)
    })
})