import type { CourseModule } from '@/types/cours'

export const CURRICULUM_JAVASCRIPT: CourseModule[] = [
  {
    icon: '🌱',
    title: 'Fondations',
    lessons: [
      {
        title: 'Les variables',
        subtitle: 'Déclarer et utiliser des variables en JavaScript',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'let, const et var',
            content: 'En JavaScript, il existe trois façons de déclarer une variable : <strong>var</strong> (ancienne méthode), <strong>let</strong> (variable modifiable) et <strong>const</strong> (valeur fixe). Aujourd\'hui on utilise principalement <strong>let</strong> et <strong>const</strong>.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Préfère const par défaut',
              text: 'Utilise const sauf si tu sais que la valeur va changer. Ça rend le code plus lisible et évite les bugs.'
            },
            code: {
              filename: 'variables.js',
              src: 'const prenom = "Alice"  // ne changera pas\nlet score = 0           // peut changer\n\nscore = score + 10\nconsole.log(prenom, score) // Alice 10'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle déclaration utilise-t-on pour une valeur qui ne changera jamais ?',
            options: ['var', 'let', 'const', 'fixed'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! const garantit que la valeur ne sera pas réassignée.',
            errorMsg: 'Non — c\'est const qui empêche la réassignation.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare une constante "nom" avec ta valeur, et une variable "age" avec un nombre. Affiche les deux avec console.log().',
            hint: 'Utilise const pour nom et let pour age.',
            filename: 'main.js',
            placeholder: '// Écris ton code ici',
            xp: 30,
            validator: (code: string) => code.includes('const') && code.includes('let') && code.includes('console.log')
          }
        ]
      },
      {
        title: 'Les types de données',
        subtitle: 'String, Number, Boolean, null et undefined',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Les types primitifs',
            content: 'JavaScript a plusieurs types de base : <strong>string</strong> (texte), <strong>number</strong> (nombre), <strong>boolean</strong> (vrai/faux), <strong>null</strong> (vide intentionnel) et <strong>undefined</strong> (non défini). Contrairement à TypeScript, JavaScript ne force pas le type — une variable peut changer de type.',
            code: {
              filename: 'types.js',
              src: 'const nom = "Alice"        // string\nconst age = 25             // number\nconst actif = true         // boolean\nconst inconnu = null       // null\nlet resultat               // undefined\n\nconsole.log(typeof nom)    // "string"\nconsole.log(typeof age)    // "number"'
            }
          },
          {
            type: 'quiz',
            question: 'Quel est le type de la valeur "42" (avec guillemets) ?',
            options: ['number', 'string', 'boolean', 'integer'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui ! Les guillemets font de 42 une string, pas un number.',
            errorMsg: 'Les guillemets transforment n\'importe quelle valeur en string.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète les déclarations avec les bons mots-clés.',
            xp: 25,
            parts: [
              { type: 'text', value: '' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'const' },
              { type: 'text', value: ' message = "Bonjour"\n' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'let' },
              { type: 'text', value: ' compteur = 0' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '⚡',
    title: 'Fonctions',
    lessons: [
      {
        title: 'Déclarer une fonction',
        subtitle: 'Créer des blocs de code réutilisables',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'La syntaxe function',
            content: 'Une fonction est un bloc de code qu\'on peut appeler plusieurs fois. On la déclare avec le mot-clé <strong>function</strong>, un nom, des paramètres entre parenthèses et un corps entre accolades. Le mot-clé <strong>return</strong> renvoie une valeur.',
            code: {
              filename: 'fonctions.js',
              src: 'function saluer(prenom) {\n  return "Bonjour, " + prenom + " !"\n}\n\nconst message = saluer("Alice")\nconsole.log(message) // Bonjour, Alice !'
            }
          },
          {
            type: 'quiz',
            question: 'Quel mot-clé permet de renvoyer une valeur depuis une fonction ?',
            options: ['send', 'output', 'return', 'yield'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! return sort de la fonction et renvoie la valeur.',
            errorMsg: 'C\'est return qui renvoie une valeur depuis une fonction.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction additionner(a, b) qui retourne la somme de a et b. Affiche le résultat avec console.log(additionner(3, 4)).',
            hint: 'La fonction doit avoir deux paramètres et utiliser return.',
            filename: 'main.js',
            placeholder: '// Écris ta fonction ici',
            xp: 40,
            validator: (code: string) => code.includes('function') && code.includes('return') && code.includes('console.log')
          }
        ]
      },
      {
        title: 'Fonctions fléchées',
        subtitle: 'La syntaxe moderne avec =>',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Arrow functions',
            content: 'Les fonctions fléchées (arrow functions) sont une syntaxe plus courte introduite en ES6. Au lieu de <code>function</code>, on utilise <code>=></code>. Pour les fonctions d\'une seule ligne, on peut même omettre les accolades et <code>return</code>.',
            code: {
              filename: 'arrow.js',
              src: '// Fonction classique\nfunction double(n) { return n * 2 }\n\n// Fonction fléchée équivalente\nconst double2 = (n) => n * 2\n\n// Encore plus court (un seul paramètre)\nconst double3 = n => n * 2\n\nconsole.log(double3(5)) // 10'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle syntaxe est correcte pour une arrow function ?',
            options: ['const f = (x) -> x * 2', 'const f = (x) => x * 2', 'const f = function => x * 2', 'arrow f(x) { x * 2 }'],
            correct: 1,
            xp: 15,
            successMsg: 'Parfait ! La flèche => sépare les paramètres du corps.',
            errorMsg: 'La syntaxe arrow function utilise =>, pas ->.'
          }
        ]
      }
    ]
  },
  {
    icon: '🔁',
    title: 'Tableaux et boucles',
    lessons: [
      {
        title: 'Les tableaux',
        subtitle: 'Stocker et accéder à des listes de valeurs',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Créer et accéder à un tableau',
            content: 'Un tableau (array) est une liste ordonnée de valeurs. On y accède par leur index, qui commence à <strong>0</strong>. La propriété <strong>.length</strong> donne le nombre d\'éléments. On peut ajouter avec <strong>.push()</strong> et enlever le dernier avec <strong>.pop()</strong>.',
            code: {
              filename: 'tableaux.js',
              src: 'const fruits = ["pomme", "banane", "cerise"]\n\nconsole.log(fruits[0])      // "pomme"\nconsole.log(fruits.length)  // 3\n\nfruits.push("mangue")\nconsole.log(fruits.length)  // 4'
            }
          },
          {
            type: 'quiz',
            question: 'Quel est l\'index du premier élément d\'un tableau ?',
            options: ['1', '0', '-1', 'start'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! En JavaScript (et dans la plupart des langages), les index commencent à 0.',
            errorMsg: 'Les index commencent à 0, pas à 1.'
          }
        ]
      }
    ]
  }
]
