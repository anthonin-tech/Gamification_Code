import type { IMission } from '@/types/missions'

export const MISSIONS: IMission[] = [
    {
        missionId: 1,
        missionTitre: "Décollage : les variables",
        taches: [
            { taskId: 1, taskTitre: "Déclarer une variable avec let" },
            { taskId: 2, taskTitre: "Déclarer une constante avec const" },
            { taskId: 3, taskTitre: "Afficher les valeurs dans la console" }
        ],
        xpRecompense: 150,
        difficulte: 'FACILE'
    },
    {
        missionId: 2,
        missionTitre: "Orbite des conditions",
        taches: [
            { taskId: 4, taskTitre: "Écrire un if / else basique" },
            { taskId: 5, taskTitre: "Utiliser un opérateur de comparaison" },
            { taskId: 6, taskTitre: "Imbriquer deux conditions" }
        ],
        xpRecompense: 200,
        difficulte: 'FACILE'
    },
    {
        missionId: 3,
        missionTitre: "Propulseurs : les fonctions",
        taches: [
            { taskId: 7, taskTitre: "Déclarer une fonction nommée" },
            { taskId: 8, taskTitre: "Passer des paramètres" },
            { taskId: 9, taskTitre: "Retourner une valeur avec return" },
            { taskId: 10, taskTitre: "Appeler la fonction depuis le programme" }
        ],
        xpRecompense: 280,
        difficulte: 'FACILE'
    },
    {
        missionId: 4,
        missionTitre: "Champ d'astéroïdes : les tableaux",
        taches: [
            { taskId: 11, taskTitre: "Créer un tableau de données" },
            { taskId: 12, taskTitre: "Parcourir avec une boucle for" },
            { taskId: 13, taskTitre: "Utiliser map() pour transformer" },
            { taskId: 14, taskTitre: "Filtrer avec filter()" }
        ],
        xpRecompense: 350,
        difficulte: 'MOYEN'
    },
    {
        missionId: 5,
        missionTitre: "Station spatiale : les objets",
        taches: [
            { taskId: 15, taskTitre: "Créer un objet avec des propriétés" },
            { taskId: 16, taskTitre: "Accéder à une propriété" },
            { taskId: 17, taskTitre: "Modifier une propriété" },
            { taskId: 18, taskTitre: "Utiliser la déstructuration" }
        ],
        xpRecompense: 380,
        difficulte: 'MOYEN'
    },
    {
        missionId: 6,
        missionTitre: "Signal asynchrone : les Promises",
        taches: [
            { taskId: 19, taskTitre: "Créer une Promise basique" },
            { taskId: 20, taskTitre: "Utiliser .then() et .catch()" },
            { taskId: 21, taskTitre: "Réécrire avec async / await" },
            { taskId: 22, taskTitre: "Gérer une erreur avec try / catch" }
        ],
        xpRecompense: 450,
        difficulte: 'MOYEN'
    },
    {
        missionId: 7,
        missionTitre: "Nébuleuse TypeScript : les types",
        taches: [
            { taskId: 23, taskTitre: "Typer une variable primitive" },
            { taskId: 24, taskTitre: "Créer une interface" },
            { taskId: 25, taskTitre: "Utiliser un type union" },
            { taskId: 26, taskTitre: "Typer les paramètres d'une fonction" }
        ],
        xpRecompense: 420,
        difficulte: 'MOYEN'
    },
    {
        missionId: 8,
        missionTitre: "Trou noir : les algorithmes de tri",
        taches: [
            { taskId: 27, taskTitre: "Implémenter le tri à bulles" },
            { taskId: 28, taskTitre: "Implémenter le tri rapide (quicksort)" },
            { taskId: 29, taskTitre: "Comparer les complexités O(n)" },
            { taskId: 30, taskTitre: "Choisir le bon algo selon le contexte" }
        ],
        xpRecompense: 600,
        difficulte: 'DIFFICILE'
    },
    {
        missionId: 9,
        missionTitre: "Singularité : récursion et memoization",
        taches: [
            { taskId: 31, taskTitre: "Écrire une fonction récursive" },
            { taskId: 32, taskTitre: "Identifier le cas de base" },
            { taskId: 33, taskTitre: "Optimiser avec la mémoïsation" },
            { taskId: 34, taskTitre: "Résoudre Fibonacci de façon optimisée" }
        ],
        xpRecompense: 700,
        difficulte: 'DIFFICILE'
    }
]
