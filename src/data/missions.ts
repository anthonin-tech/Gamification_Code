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
        verification: [
            { taskId: 1, wordKey: 'let' },
            { taskId: 2, wordKey: 'const' },
            { taskId: 3, wordKey: 'console.log' }
        ],
        indices: [
            { niveau: 1, texte: "Une variable se déclare avec le mot-clé `let` suivi d'un nom, puis d'un `=` et d'une valeur.", xpCout: 10 },
            { niveau: 2, texte: "La différence entre `let` et `const` : `let` peut être réassigné, `const` non. Utilise `const` dès que la valeur ne change pas.", xpCout: 20 },
            { niveau: 3, texte: "Déclare une variable `score` avec `let` valant 0, une constante `NOM` avec `const` valant ton prénom, puis affiche les deux avec `console.log`.", xpCout: 40 }
        ],
        xpRecompense: 150,
        difficulte: 'FACILE',
        langage: 'javascript',
        description: 'Apprends à déclarer et manipuler tes premières variables en JavaScript.',
        image: '/missions/variables.png',
        minLecons: 1
    },
    {
        missionId: 2,
        missionTitre: "Orbite des conditions",
        taches: [
            { taskId: 4, taskTitre: "Écrire un if / else basique" },
            { taskId: 5, taskTitre: "Utiliser un opérateur de comparaison" },
            { taskId: 6, taskTitre: "Imbriquer deux conditions" }
        ],
        verification: [
            { taskId: 4, wordKey: 'else' },
            { taskId: 5, wordKey: '===' },
            { taskId: 6, wordKey: 'else if' }
        ],
        indices: [
            { niveau: 1, texte: "Un `if` exécute un bloc de code seulement si la condition entre parenthèses est vraie.", xpCout: 10 },
            { niveau: 2, texte: "Les opérateurs de comparaison : `===` (égal strict), `!==` (différent), `>`, `<`, `>=`, `<=`. Préfère toujours `===` à `==`.", xpCout: 20 },
            { niveau: 3, texte: "Déclare une variable `age` à 17, puis écris un `if / else if / else` qui affiche 'mineur', 'jeune adulte' (entre 18 et 25), ou 'adulte'.", xpCout: 40 }
        ],
        xpRecompense: 200,
        difficulte: 'FACILE',
        langage: 'javascript',
        description: 'Maîtrise les conditions if/else pour contrôler le flux de ton programme.',
        image: '/missions/conditions.png',
        minLecons: 1
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
        verification: [
            { taskId: 7, wordKey: 'function' },
            { taskId: 8, wordKey: '(' },
            { taskId: 9, wordKey: 'return' },
            { taskId: 10, wordKey: '(' }
        ],
        indices: [
            { niveau: 1, texte: "Une fonction se déclare avec `function nomFonction() { }`. Le code à l'intérieur ne s'exécute que quand on l'appelle.", xpCout: 10 },
            { niveau: 2, texte: "Les paramètres sont des variables locales à la fonction. On les passe entre parenthèses : `function addition(a, b) { }`.", xpCout: 20 },
            { niveau: 3, texte: "Écris une fonction `multiplier(a, b)` qui retourne le produit de deux nombres, appelle-la avec 6 et 7, et affiche le résultat.", xpCout: 40 }
        ],
        xpRecompense: 280,
        difficulte: 'FACILE',
        langage: 'javascript',
        description: 'Découvre les fonctions pour organiser et réutiliser ton code.',
        image: '/missions/fonctions.png',
        minLecons: 2
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
        verification: [
            { taskId: 11, wordKey: '[' },
            { taskId: 12, wordKey: 'for' },
            { taskId: 13, wordKey: '.map(' },
            { taskId: 14, wordKey: '.filter(' }
        ],
        indices: [
            { niveau: 1, texte: "Un tableau se déclare avec des crochets : `const fruits = ['pomme', 'banane']`. On accède aux éléments avec leur index depuis 0.", xpCout: 15 },
            { niveau: 2, texte: "`map()` retourne un nouveau tableau transformé. `filter()` retourne un nouveau tableau avec seulement les éléments qui passent le test.", xpCout: 30 },
            { niveau: 3, texte: "Crée un tableau de nombres, utilise `.map()` pour doubler chaque valeur, puis `.filter()` pour ne garder que les pairs. Affiche les deux résultats.", xpCout: 50 }
        ],
        xpRecompense: 350,
        difficulte: 'MOYEN',
        langage: 'javascript',
        description: 'Explore les tableaux et leurs méthodes puissantes : map, filter, reduce.',
        image: '/missions/tableaux.png',
        minLecons: 3
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
        verification: [
            { taskId: 15, wordKey: '{' },
            { taskId: 16, wordKey: '.' },
            { taskId: 17, wordKey: '=' },
            { taskId: 18, wordKey: 'const {' }
        ],
        indices: [
            { niveau: 1, texte: "Un objet se déclare avec des accolades : `const user = { nom: 'Alice', age: 25 }`. Chaque entrée est une paire clé/valeur.", xpCout: 15 },
            { niveau: 2, texte: "Pour accéder à une propriété : `user.nom` ou `user['nom']`. Pour modifier : `user.age = 26`.", xpCout: 30 },
            { niveau: 3, texte: "Crée un objet `user` avec `nom` et `age`, modifie son `age`, puis utilise la déstructuration pour extraire les deux propriétés dans des variables séparées.", xpCout: 50 }
        ],
        xpRecompense: 380,
        difficulte: 'MOYEN',
        langage: 'javascript',
        description: 'Comprends les objets JavaScript et la déstructuration pour manipuler des données complexes.',
        image: '/missions/objets.png',
        minLecons: 4
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
        verification: [
            { taskId: 19, wordKey: 'new Promise' },
            { taskId: 20, wordKey: '.then(' },
            { taskId: 21, wordKey: 'await' },
            { taskId: 22, wordKey: 'try' }
        ],
        indices: [
            { niveau: 1, texte: "Une Promise représente une valeur qui sera disponible dans le futur. Elle a 3 états : pending, fulfilled, rejected.", xpCout: 20 },
            { niveau: 2, texte: "`.then(résultat => ...)` s'exécute si la Promise réussit. `.catch(erreur => ...)` s'exécute si elle échoue.", xpCout: 35 },
            { niveau: 3, texte: "Écris une fonction `async` nommée `charger` qui utilise `await` sur une Promise simulée, gère le résultat avec `try/catch`, et appelle-la.", xpCout: 60 }
        ],
        xpRecompense: 450,
        difficulte: 'MOYEN',
        langage: 'javascript',
        description: 'Maîtrise la programmation asynchrone avec les Promises et async/await.',
        image: '/missions/promises.png',
        minLecons: 5
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
        verification: [
            { taskId: 23, wordKey: ': number' },
            { taskId: 24, wordKey: 'interface' },
            { taskId: 25, wordKey: '|' },
            { taskId: 26, wordKey: '): ' }
        ],
        indices: [
            { niveau: 1, texte: "En TypeScript, on annote les types après le nom : `let score: number = 0`. Les types primitifs sont `string`, `number`, `boolean`.", xpCout: 15 },
            { niveau: 2, texte: "Une interface décrit la forme d'un objet : `interface User { nom: string; age: number }`. Un type union accepte plusieurs types : `string | number`.", xpCout: 30 },
            { niveau: 3, texte: "Crée une `interface User` avec `nom: string` et `age: number`, déclare une variable `string | number`, puis écris une fonction avec ses types de paramètre et de retour.", xpCout: 50 }
        ],
        xpRecompense: 420,
        difficulte: 'MOYEN',
        langage: 'typescript',
        description: 'Découvre le système de types TypeScript pour écrire un code plus robuste et sûr.',
        image: '/missions/typescript.png',
        minLecons: 1
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
        verification: [
            { taskId: 27, wordKey: 'def' },
            { taskId: 28, wordKey: 'pivot' },
            { taskId: 29, wordKey: 'O(' },
            { taskId: 30, wordKey: 'def' }
        ],
        indices: [
            { niveau: 1, texte: "Le tri à bulles compare deux éléments adjacents et les échange si nécessaire, en répétant jusqu'à ce que le tableau soit trié.", xpCout: 25 },
            { niveau: 2, texte: "Le quicksort choisit un pivot, place les éléments plus petits à gauche et plus grands à droite, puis récurse sur chaque partie.", xpCout: 45 },
            { niveau: 3, texte: "Implémente le quicksort en Python : choisis un pivot, sépare le tableau en gauche/droite avec des list comprehensions, et récurse sur chaque partie.", xpCout: 70 }
        ],
        xpRecompense: 600,
        difficulte: 'DIFFICILE',
        langage: 'python',
        description: 'Plonge dans les algorithmes de tri et compare leurs performances.',
        image: '/missions/alghorithmes.png',
        minLecons: 3
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
        verification: [
            { taskId: 31, wordKey: 'def' },
            { taskId: 32, wordKey: 'return' },
            { taskId: 33, wordKey: 'memo' },
            { taskId: 34, wordKey: 'fib' }
        ],
        indices: [
            { niveau: 1, texte: "Une fonction récursive s'appelle elle-même. Elle doit toujours avoir un cas de base (condition d'arrêt) pour éviter une boucle infinie.", xpCout: 25 },
            { niveau: 2, texte: "La mémoïsation consiste à stocker les résultats déjà calculés dans un objet/cache pour ne pas recalculer deux fois la même chose.", xpCout: 45 },
            { niveau: 3, texte: "Implémente Fibonacci avec mémoïsation en Python : utilise un dictionnaire `memo` pour stocker les résultats déjà calculés et éviter les recalculs.", xpCout: 70 }
        ],
        xpRecompense: 700,
        difficulte: 'DIFFICILE',
        langage: 'python',
        description: 'Résous des problèmes complexes grâce à la récursion et optimise avec la mémoïsation.',
        image: '/missions/recursion.png',
        minLecons: 5
    }
]
