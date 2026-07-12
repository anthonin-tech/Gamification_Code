import type { CourseModule } from '@/types/cours'

export const CURRICULUM_TYPESCRIPT: CourseModule[] = [
  {
    icon: '🔷',
    title: 'Typage de base',
    lessons: [
      {
        title: 'Pourquoi TypeScript ?',
        subtitle: 'Comprendre l\'utilité du typage statique',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'JavaScript avec des types',
            content: 'TypeScript est un <strong>superset de JavaScript</strong> : tout code JavaScript valide est aussi du TypeScript. Il ajoute un système de types qui détecte les erreurs <strong>avant l\'exécution</strong>. Le compilateur TypeScript transforme ensuite le code en JavaScript classique.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'TypeScript = JavaScript + types',
              text: 'On écrit du TypeScript, le compilateur tsc le transforme en JavaScript. Le navigateur n\'exécute jamais directement du TypeScript.'
            },
            code: {
              filename: 'exemple.ts',
              src: '// JavaScript — aucune erreur détectée avant l\'exécution\nfunction additionner(a, b) {\n  return a + b\n}\nadditionner("5", 3) // "53" — bug silencieux !\n\n// TypeScript — erreur détectée immédiatement\nfunction additionner(a: number, b: number): number {\n  return a + b\n}\nadditionner("5", 3) // Erreur : Argument de type string...'
            }
          },
          {
            type: 'quiz',
            question: 'Quand TypeScript détecte-t-il les erreurs de type ?',
            options: [
              'Pendant l\'exécution dans le navigateur',
              'Avant l\'exécution, à la compilation',
              'Seulement en production',
              'Jamais automatiquement'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! C\'est tout l\'intérêt : détecter les bugs avant qu\'ils arrivent.',
            errorMsg: 'TypeScript détecte les erreurs à la compilation, pas à l\'exécution.'
          }
        ]
      },
      {
        title: 'Types primitifs',
        subtitle: 'Typer string, number, boolean',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Annoter les types',
            content: 'Pour typer une variable, on ajoute <strong>: type</strong> après son nom. TypeScript peut aussi <strong>inférer</strong> le type automatiquement — si tu écris <code>const age = 25</code>, TypeScript sait que c\'est un <code>number</code> sans que tu le précises.',
            code: {
              filename: 'types.ts',
              src: '// Typage explicite\nconst prenom: string = "Alice"\nconst age: number = 25\nconst actif: boolean = true\n\n// Inférence (TypeScript devine le type)\nconst score = 100      // TypeScript infère : number\nconst message = "ok"   // TypeScript infère : string\n\n// Erreur détectée\nconst points: number = "cent" // ❌ Type string pas assignable à number'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle syntaxe type une variable "score" comme number ?',
            options: [
              'const score = number 0',
              'number score = 0',
              'const score: number = 0',
              'const score<number> = 0'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Parfait ! Le type s\'annote avec : après le nom de la variable.',
            errorMsg: 'La syntaxe est nomVariable: type — le : vient après le nom.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète les annotations de type.',
            xp: 25,
            parts: [
              { type: 'text', value: 'const nom: ' },
              { type: 'blank', placeholder: 'type', correct: 'string' },
              { type: 'text', value: ' = "Bob"\nconst age: ' },
              { type: 'blank', placeholder: 'type', correct: 'number' },
              { type: 'text', value: ' = 30' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '📐',
    title: 'Interfaces et types',
    lessons: [
      {
        title: 'Créer une interface',
        subtitle: 'Définir la forme d\'un objet',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'interface',
            content: 'Une <strong>interface</strong> décrit la structure attendue d\'un objet : quelles propriétés il doit avoir et leurs types. C\'est l\'outil principal pour typer les objets en TypeScript. Si un objet ne respecte pas l\'interface, TypeScript signale une erreur.',
            code: {
              filename: 'interface.ts',
              src: 'interface Utilisateur {\n  nom: string\n  age: number\n  actif: boolean\n}\n\nconst user: Utilisateur = {\n  nom: "Alice",\n  age: 25,\n  actif: true\n}\n\n// Erreur — propriété manquante\nconst user2: Utilisateur = {\n  nom: "Bob"  // ❌ Manque age et actif\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que signifie une propriété optionnelle "nom?" dans une interface ?',
            options: [
              'La propriété est obligatoire',
              'La propriété peut être absente (string | undefined)',
              'La propriété est en lecture seule',
              'La propriété peut être null uniquement'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! Le ? rend la propriété optionnelle — elle peut ne pas être présente.',
            errorMsg: 'Le ? signifie optionnel : la propriété peut être absente ou undefined.'
          }
        ]
      },
      {
        title: 'Types union et alias',
        subtitle: 'Combiner plusieurs types avec |',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Union types',
            content: 'Un <strong>type union</strong> permet à une valeur d\'être de plusieurs types différents. On les combine avec <strong>|</strong>. On peut aussi créer un <strong>alias de type</strong> avec le mot-clé <code>type</code> pour réutiliser une définition complexe.',
            code: {
              filename: 'union.ts',
              src: '// Union type — string OU number\nlet id: string | number = "abc-123"\nid = 42  // aussi valide\n\n// Alias de type\ntype Difficulte = "FACILE" | "MOYEN" | "DIFFICILE"\n\nconst niveau: Difficulte = "FACILE"\nconst erreur: Difficulte = "EXPERT" // ❌ Pas dans l\'union'
            }
          },
          {
            type: 'quiz',
            question: 'Comment déclare-t-on un type qui peut être string ou number ?',
            options: [
              'string + number',
              'string & number',
              'string | number',
              'string || number'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Le | crée un type union en TypeScript.',
            errorMsg: 'Le symbole union en TypeScript est |, comme dans string | number.'
          }
        ]
      }
    ]
  },
  {
    icon: '🧩',
    title: 'Fonctions typées',
    lessons: [
      {
        title: 'Typer les paramètres et le retour',
        subtitle: 'Sécuriser les fonctions avec les types',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Paramètres et type de retour',
            content: 'En TypeScript, on type les <strong>paramètres</strong> et le <strong>type de retour</strong> d\'une fonction. Si la fonction ne retourne rien, le type de retour est <code>void</code>. Ça permet à TypeScript de vérifier que tu utilises correctement la fonction.',
            code: {
              filename: 'fonctions.ts',
              src: '// Paramètres typés + type de retour\nfunction saluer(prenom: string, age: number): string {\n  return `Bonjour ${prenom}, tu as ${age} ans`\n}\n\n// Fonction sans retour\nfunction afficher(message: string): void {\n  console.log(message)\n}\n\n// Erreur détectée\nsaluer(42, "Alice") // ❌ Types inversés'
            }
          },
          {
            type: 'quiz',
            question: 'Quel type de retour utilise-t-on pour une fonction qui ne retourne rien ?',
            options: ['null', 'undefined', 'void', 'none'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! void signifie que la fonction ne retourne aucune valeur.',
            errorMsg: 'En TypeScript, une fonction sans retour a le type void.'
          }
        ]
      }
    ]
  }
]
