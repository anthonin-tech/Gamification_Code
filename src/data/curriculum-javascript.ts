import type { CourseModule } from '@/types/cours'

export const CURRICULUM_JAVASCRIPT: CourseModule[] = [
  {
    icon: '🌱',
    title: 'Fondations',
    lessons: [
      {
        title: 'Variables : let, const et var',
        subtitle: 'Déclarer et stocker des données',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'let, const et var',
            content: 'JavaScript propose trois mots-clés pour déclarer des variables : <strong>var</strong> (ancienne méthode, portée de fonction), <strong>let</strong> (portée de bloc, modifiable) et <strong>const</strong> (portée de bloc, non réassignable). En pratique moderne on utilise <strong>const</strong> par défaut et <strong>let</strong> quand la valeur doit changer. <code>var</code> est à éviter dans tout nouveau code.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Règle d\'or',
              text: 'Commence toujours par const. Si tu dois réassigner la variable, passe à let. N\'utilise jamais var dans du code moderne.'
            },
            code: {
              filename: 'variables.js',
              src: 'const prenom = "Alice"   // fixe — ne changera jamais\nlet score = 0            // peut changer\n\nscore = score + 10\nconsole.log(prenom, score)  // Alice 10\n\n// var : portée de fonction, hoisting — à éviter\nfunction exemple() {\n  var x = 5\n  // x est accessible dans toute la fonction\n}'
            }
          },
          {
            type: 'theory',
            title: 'Le hoisting avec var',
            content: 'Le <strong>hoisting</strong> remonte les déclarations <code>var</code> en haut de leur portée avant l\'exécution. Résultat : accéder à un <code>var</code> avant sa ligne de déclaration retourne <code>undefined</code> sans erreur. Avec <code>let</code> et <code>const</code>, la même situation lève une <strong>ReferenceError</strong>, ce qui est bien plus sûr et explicite.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Hoisting = bugs silencieux',
              text: 'Avec var, JavaScript hisse la déclaration mais pas l\'initialisation. Le résultat est undefined au lieu d\'une erreur visible.'
            },
            code: {
              filename: 'hoisting.js',
              src: 'console.log(age)    // undefined — pas d\'erreur !\nvar age = 25\n\n// Avec let :\n// console.log(nom)  // ReferenceError: Cannot access \'nom\' before initialization\nlet nom = "Alice"'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle déclaration utilise-t-on pour une valeur qui ne changera jamais ?',
            options: ['var', 'let', 'const', 'final'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! const empêche la réassignation et signale clairement l\'intention au lecteur.',
            errorMsg: 'C\'est const qui empêche la réassignation. var et let permettent tous deux de réassigner.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare une constante "pseudo" avec une chaîne de caractères, et une variable "niveau" initialisée à 1. Incrémente niveau de 1, puis affiche les deux avec console.log().',
            hint: 'Utilise const pour pseudo et let pour niveau. Incrémente avec niveau++ ou niveau = niveau + 1.',
            filename: 'main.js',
            placeholder: '// Déclare tes variables ici\n',
            xp: 30,
            validator: (code: string) => code.includes('const') && code.includes('let') && code.includes('console.log')
          }
        ]
      },
      {
        title: 'Types primitifs et coercion',
        subtitle: 'Les 6 types de base et leurs pièges',
        type: 'theory',
        time: '14 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Les types primitifs',
            content: 'JavaScript possède six types primitifs : <strong>string</strong> (texte), <strong>number</strong> (entier ou flottant), <strong>boolean</strong> (true/false), <strong>null</strong> (vide intentionnel), <strong>undefined</strong> (non défini) et <strong>symbol</strong> (valeur unique). L\'opérateur <code>typeof</code> renvoie le type sous forme de string. Attention : <code>typeof null</code> retourne <code>"object"</code> — c\'est un bug historique conservé par compatibilité.',
            code: {
              filename: 'types.js',
              src: 'const nom = "Alice"        // string\nconst age = 25             // number\nconst actif = true         // boolean\nconst vide = null          // null\nlet resultat               // undefined\nconst uid = Symbol("id")   // symbol\n\nconsole.log(typeof nom)    // "string"\nconsole.log(typeof age)    // "number"\nconsole.log(typeof null)   // "object" (bug JS historique !)\nconsole.log(typeof uid)    // "symbol"'
            }
          },
          {
            type: 'theory',
            title: 'Coercion implicite et template literals',
            content: 'La <strong>coercion implicite</strong> est la conversion automatique de types effectuée par JavaScript. Elle peut donner des résultats surprenants. Les <strong>template literals</strong> (délimités par des backticks) offrent une alternative propre à la concaténation avec <code>${expression}</code> pour insérer des variables ou des expressions.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Coercion : piège classique',
              text: '"5" + 3 donne "53" (concaténation). "5" - 3 donne 2 (conversion numérique). L\'opérateur + avec une string fait toujours de la concaténation.'
            },
            code: {
              filename: 'coercion.js',
              src: 'console.log("5" + 3)     // "53" (concaténation !)\nconsole.log("5" - 3)     // 2   (conversion numérique)\nconsole.log(true + 1)    // 2   (boolean → number)\n\n// Template literal — propre et lisible\nconst prenom = "Alice"\nconst age = 25\nconsole.log(`Bonjour ${prenom}, tu as ${age} ans`)\nconsole.log(`Résultat : ${2 + 2}`)  // expressions autorisées'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne l\'expression "10" + 5 en JavaScript ?',
            options: ['15', '"105"', '"10"', 'NaN'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! L\'opérateur + avec une string fait de la concaténation : "10" + 5 = "105".',
            errorMsg: 'L\'opérateur + avec une string fait de la concaténation. "10" + 5 donne "105", pas 15.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète le template literal pour afficher le bon message.',
            xp: 20,
            parts: [
              { type: 'text', value: 'const joueur = "Max"\nconst pts = 500\nconst msg = `Le joueur ' },
              { type: 'blank', placeholder: '${...}', correct: '${joueur}' },
              { type: 'text', value: ' a gagné ' },
              { type: 'blank', placeholder: '${...}', correct: '${pts}' },
              { type: 'text', value: ' points`' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '⚡',
    title: 'Opérateurs et conditions',
    lessons: [
      {
        title: 'Opérateurs et égalité stricte',
        subtitle: 'Arithmétique, comparaison et === vs ==',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Opérateurs arithmétiques et de comparaison',
            content: 'JavaScript dispose des opérateurs arithmétiques classiques : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (modulo) et <code>**</code> (puissance). Les opérateurs de comparaison retournent un boolean : <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Pour l\'égalité, <code>==</code> fait de la coercion tandis que <code>===</code> vérifie le type ET la valeur.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Toujours === jamais ==',
              text: 'L\'opérateur == fait de la coercion ("1" == 1 est true). === vérifie le type ET la valeur ("1" === 1 est false). Utilise toujours ===.'
            },
            code: {
              filename: 'operateurs.js',
              src: 'console.log(10 % 3)        // 1 (reste de la division)\nconsole.log(2 ** 8)        // 256 (puissance)\n\nconsole.log(1 == "1")      // true (coercion — dangereux !)\nconsole.log(1 === "1")     // false (types différents)\nconsole.log(1 === 1)       // true\n\nconsole.log(true && false)  // false (ET logique)\nconsole.log(true || false)  // true  (OU logique)\nconsole.log(!true)          // false (NON logique)'
            }
          },
          {
            type: 'quiz',
            question: 'Pourquoi faut-il toujours utiliser === plutôt que == ?',
            options: [
              '=== est plus rapide',
              '== n\'existe pas en JavaScript',
              '=== vérifie aussi le type, évitant les bugs de coercion',
              '=== fonctionne avec les objets, == non'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! === vérifie type ET valeur. "1" == 1 est true, mais "1" === 1 est false.',
            errorMsg: '=== vérifie le type ET la valeur, ce qui évite les surprises de la coercion implicite.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare deux variables a = 10 et b = "10". Affiche le résultat de a == b et a === b avec console.log(). Observe la différence.',
            hint: 'a == b retourne true (coercion), a === b retourne false (types différents).',
            filename: 'main.js',
            placeholder: '// Déclare a et b, compare-les\n',
            xp: 25,
            validator: (code: string) => code.includes('===') && code.includes('==') && code.includes('console.log')
          }
        ]
      },
      {
        title: 'Structures conditionnelles',
        subtitle: 'if/else, switch, ternaire et ??',
        type: 'theory',
        time: '14 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'if, else if, else et valeurs falsy',
            content: 'La structure <strong>if / else if / else</strong> exécute du code selon une condition. JavaScript évalue la condition en boolean : les valeurs <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code> et <code>false</code> sont <strong>falsy</strong>. Tout le reste est <strong>truthy</strong>.',
            code: {
              filename: 'conditions.js',
              src: 'const note = 75\n\nif (note >= 90) {\n  console.log("Excellent")\n} else if (note >= 70) {\n  console.log("Bien")        // affiché\n} else if (note >= 50) {\n  console.log("Passable")\n} else {\n  console.log("Insuffisant")\n}\n\n// Valeurs falsy en pratique\nconst nom = ""\nif (!nom) console.log("Nom vide !")  // affiché car "" est falsy'
            }
          },
          {
            type: 'theory',
            title: 'switch, opérateur ternaire et ??',
            content: 'Le <strong>switch</strong> compare une valeur à plusieurs cas avec break pour éviter le fall-through. L\'opérateur <strong>ternaire</strong> (<code>condition ? siVrai : siFaux</code>) condense un if/else sur une ligne. L\'opérateur <strong>nullish coalescing</strong> (<code>??</code>) retourne la valeur de droite seulement si la gauche est <code>null</code> ou <code>undefined</code>.',
            callout: {
              kind: 'info',
              icon: 'ℹ️',
              title: '?? vs ||',
              text: 'a ?? b retourne b seulement si a est null/undefined. a || b retourne b si a est falsy (0, "", false...). Préfère ?? quand 0 ou "" sont des valeurs légitimes.'
            },
            code: {
              filename: 'ternaire.js',
              src: '// Ternaire\nconst age = 20\nconst statut = age >= 18 ? "Majeur" : "Mineur"\nconsole.log(statut)  // "Majeur"\n\n// Nullish coalescing\nconst pseudo = null\nconsole.log(pseudo ?? "Anonyme")   // "Anonyme"\n\nconst score = 0\nconsole.log(score ?? 100)   // 0 (score n\'est pas null/undefined)\nconsole.log(score || 100)   // 100 (0 est falsy avec ||)'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre ?? et || ?',
            options: [
              'Il n\'y a aucune différence',
              '?? remplace uniquement null/undefined, || remplace toutes les valeurs falsy',
              '|| remplace uniquement null/undefined, ?? remplace toutes les valeurs falsy',
              '?? est déprécié en faveur de ||'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! ?? est plus précis : il ne remplace que null et undefined, pas 0 ni "".',
            errorMsg: '?? ne court-circuite que pour null et undefined, pas pour 0 ou "" comme le ferait ||.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction verifierAge(age) qui retourne "Majeur" si age >= 18, sinon "Mineur". Utilise l\'opérateur ternaire. Affiche le résultat pour 20 et 15.',
            hint: 'const verifierAge = (age) => age >= 18 ? "Majeur" : "Mineur"',
            filename: 'main.js',
            placeholder: '// Fonction verifierAge avec opérateur ternaire\n',
            xp: 30,
            validator: (code: string) => code.includes('?') && code.includes(':') && code.includes('18')
          }
        ]
      }
    ]
  },
  {
    icon: '🔁',
    title: 'Boucles',
    lessons: [
      {
        title: 'for, while et do...while',
        subtitle: 'Répéter du code avec les boucles classiques',
        type: 'theory',
        time: '13 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'La boucle for classique et while',
            content: 'La boucle <strong>for</strong> répète un bloc de code un nombre déterminé de fois. Elle se compose de l\'initialisation (<code>let i = 0</code>), la condition (<code>i &lt; 5</code>) et l\'incrément (<code>i++</code>). La boucle <strong>while</strong> s\'exécute tant que la condition est vraie — pratique quand on ne connaît pas le nombre d\'itérations à l\'avance.',
            code: {
              filename: 'boucles.js',
              src: '// for classique\nfor (let i = 0; i < 3; i++) {\n  console.log("Tour " + i)   // Tour 0, Tour 1, Tour 2\n}\n\n// while\nlet count = 3\nwhile (count > 0) {\n  console.log(count)         // 3, 2, 1\n  count--\n}\n\n// do...while — s\'exécute au moins une fois\nlet val = 10\ndo {\n  console.log(val)           // 10 (affiché même si condition fausse dès le départ)\n  val++\n} while (val < 5)'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle boucle s\'exécute toujours au moins une fois ?',
            options: ['for', 'while', 'do...while', 'for...in'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! do...while évalue la condition après le premier passage, garantissant une exécution.',
            errorMsg: 'do...while exécute le bloc une première fois, puis vérifie la condition pour continuer.'
          },
          {
            type: 'code-challenge',
            instructions: 'Utilise une boucle for pour calculer la somme des nombres de 1 à 10. Affiche le résultat avec console.log().',
            hint: 'Déclare let somme = 0 avant la boucle, puis somme += i à chaque tour.',
            filename: 'main.js',
            placeholder: '// Calcule la somme de 1 à 10\n',
            xp: 25,
            validator: (code: string) => code.includes('for') && code.includes('console.log')
          }
        ]
      },
      {
        title: 'for...of, for...in et contrôle de flux',
        subtitle: 'Itérer sur des collections et contrôler les boucles',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'for...of et for...in',
            content: 'La boucle <strong>for...of</strong> parcourt les <em>valeurs</em> d\'un itérable (tableau, string, Map, Set...). La boucle <strong>for...in</strong> parcourt les <em>clés</em> d\'un objet. Règle simple : <code>for...of</code> pour les tableaux, <code>for...in</code> pour les objets.',
            code: {
              filename: 'forin-forof.js',
              src: 'const fruits = ["pomme", "banane", "cerise"]\n\n// for...of — valeurs\nfor (const fruit of fruits) {\n  console.log(fruit)   // pomme, banane, cerise\n}\n\nconst joueur = { nom: "Alice", niveau: 3, xp: 500 }\n\n// for...in — clés\nfor (const cle in joueur) {\n  console.log(cle, joueur[cle])  // nom Alice, niveau 3, xp 500\n}'
            }
          },
          {
            type: 'theory',
            title: 'break et continue',
            content: '<strong>break</strong> sort immédiatement de la boucle. <strong>continue</strong> passe à l\'itération suivante sans exécuter le reste du bloc courant. Ces deux mots-clés permettent de contrôler finement le déroulement d\'une boucle.',
            code: {
              filename: 'break-continue.js',
              src: '// break — sortir de la boucle\nfor (let i = 0; i < 10; i++) {\n  if (i === 3) break\n  console.log(i)   // 0, 1, 2 (s\'arrête avant 3)\n}\n\n// continue — sauter une itération\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) continue\n  console.log(i)   // 0, 1, 3, 4 (2 est sauté)\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle boucle est la mieux adaptée pour parcourir un tableau ?',
            options: ['for...in', 'for...of', 'do...while', 'while'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! for...of itère sur les valeurs d\'un itérable de manière claire et lisible.',
            errorMsg: 'for...of est conçu pour les itérables (tableaux, strings...). for...in est pour les clés d\'objets.'
          },
          {
            type: 'code-challenge',
            instructions: 'Utilise for...of pour parcourir ["HTML", "CSS", "JavaScript"] et affiche chaque élément avec console.log(). Utilise continue pour sauter "CSS".',
            hint: 'if (langage === "CSS") continue',
            filename: 'main.js',
            placeholder: 'const langages = ["HTML", "CSS", "JavaScript"]\n',
            xp: 30,
            validator: (code: string) => code.includes('for') && code.includes('of') && code.includes('continue')
          }
        ]
      }
    ]
  },
  {
    icon: '🧩',
    title: 'Fonctions',
    lessons: [
      {
        title: 'Déclaration, expression et arrow functions',
        subtitle: 'Les trois façons d\'écrire une fonction',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Déclaration vs expression de fonction',
            content: 'Une <strong>function declaration</strong> est hoistée — on peut l\'appeler avant sa ligne de déclaration dans le code. Une <strong>function expression</strong> assigne une fonction anonyme à une variable — elle n\'est pas hoistée. Les deux syntaxes sont valides mais ont des comportements différents.',
            code: {
              filename: 'fonctions.js',
              src: '// Déclaration — hoistée\nconsole.log(double(4))  // 8 — fonctionne avant la déclaration !\n\nfunction double(n) {\n  return n * 2\n}\n\n// Expression — non hoistée\nconst triple = function(n) {\n  return n * 3\n}\nconsole.log(triple(4))  // 12'
            }
          },
          {
            type: 'theory',
            title: 'Arrow functions',
            content: 'Les <strong>arrow functions</strong> (ES6) sont une syntaxe plus courte : <code>const fn = (params) => expression</code>. Si le corps tient sur une ligne, les accolades et <code>return</code> sont implicites. Différence clé : les arrow functions n\'ont pas leur propre <code>this</code> — elles héritent du <code>this</code> du contexte englobant.',
            code: {
              filename: 'arrow.js',
              src: '// Syntaxes équivalentes\nfunction carre(n) { return n * n }\nconst carre2 = function(n) { return n * n }\nconst carre3 = (n) => n * n\nconst carre4 = n => n * n   // parenthèses optionnelles si 1 seul paramètre\n\nconsole.log(carre4(5))    // 25\n\n// Corps multi-lignes\nconst somme = (a, b) => {\n  const resultat = a + b\n  return resultat\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle propriété les arrow functions n\'ont-elles PAS comparé aux fonctions classiques ?',
            options: ['Un corps de fonction', 'Des paramètres', 'Leur propre this', 'Une valeur de retour'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Les arrow functions héritent du this du contexte englobant — elles n\'ont pas le leur.',
            errorMsg: 'Les arrow functions n\'ont pas leur propre this. C\'est la différence fondamentale avec function.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une arrow function "multiplier" qui prend deux paramètres a et b et retourne leur produit. Affiche multiplier(6, 7) avec console.log().',
            hint: 'const multiplier = (a, b) => a * b',
            filename: 'main.js',
            placeholder: '// Arrow function multiplier\n',
            xp: 30,
            validator: (code: string) => code.includes('=>') && code.includes('console.log') && code.includes('multiplier')
          }
        ]
      },
      {
        title: 'Paramètres avancés et closures',
        subtitle: 'Valeurs par défaut, rest params et portée',
        type: 'theory',
        time: '15 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'Paramètres par défaut et rest',
            content: 'Les <strong>paramètres par défaut</strong> définissent une valeur de secours si l\'argument n\'est pas fourni lors de l\'appel. Le <strong>rest parameter</strong> (<code>...args</code>) capture tous les arguments restants dans un tableau. Il doit toujours être le dernier paramètre de la liste.',
            code: {
              filename: 'params.js',
              src: '// Paramètre par défaut\nfunction saluer(prenom, salutation = "Bonjour") {\n  return `${salutation} ${prenom} !`\n}\nconsole.log(saluer("Alice"))           // Bonjour Alice !\nconsole.log(saluer("Bob", "Salut"))    // Salut Bob !\n\n// Rest parameter\nfunction somme(...nombres) {\n  return nombres.reduce((acc, n) => acc + n, 0)\n}\nconsole.log(somme(1, 2, 3, 4, 5))     // 15'
            }
          },
          {
            type: 'theory',
            title: 'Scope et closures',
            content: 'Le <strong>scope</strong> (portée) définit où une variable est accessible. <code>let</code> et <code>const</code> ont une portée de bloc. Une <strong>closure</strong> est une fonction qui "capture" les variables de son contexte englobant, même après que ce contexte ait terminé son exécution. C\'est un mécanisme fondamental de JavaScript.',
            callout: {
              kind: 'info',
              icon: 'ℹ️',
              title: 'La closure en pratique',
              text: 'Les closures permettent de créer des fonctions avec état privé — comme un compteur qui retient sa valeur entre les appels.'
            },
            code: {
              filename: 'closures.js',
              src: 'function creerCompteur() {\n  let compte = 0    // variable capturée par la closure\n\n  return function() {\n    compte++\n    return compte\n  }\n}\n\nconst compteur = creerCompteur()\nconsole.log(compteur())  // 1\nconsole.log(compteur())  // 2\nconsole.log(compteur())  // 3 (compte est préservé entre les appels !)'
            }
          },
          {
            type: 'quiz',
            question: 'Que capture une closure ?',
            options: [
              'Uniquement les paramètres de la fonction interne',
              'Les variables du scope englobant au moment de sa définition',
              'Uniquement les variables globales',
              'Les propriétés de l\'objet window'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Une closure ferme sur les variables du scope dans lequel elle a été définie.',
            errorMsg: 'Une closure capture les variables du scope englobant — même après que la fonction externe ait terminé.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une fonction "creerMultiplieur(facteur)" qui retourne une fonction prenant un nombre et le multipliant par facteur. Ex : creerMultiplieur(3)(5) doit donner 15.',
            hint: 'La fonction retournée forme une closure sur le paramètre facteur.',
            filename: 'main.js',
            placeholder: '// creerMultiplieur retourne une fonction\n',
            xp: 40,
            validator: (code: string) => code.includes('return') && (code.includes('function') || code.includes('=>')) && code.includes('facteur')
          }
        ]
      }
    ]
  },
  {
    icon: '📦',
    title: 'Tableaux',
    lessons: [
      {
        title: 'Méthodes essentielles des tableaux',
        subtitle: 'Créer, accéder et modifier des tableaux',
        type: 'theory',
        time: '13 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Créer, accéder et modifier un tableau',
            content: 'Un tableau (array) est une liste ordonnée. Les index commencent à <strong>0</strong>. La propriété <code>.length</code> donne le nombre d\'éléments. Méthodes de modification : <code>push()</code> ajoute en fin, <code>pop()</code> retire le dernier, <code>shift()</code> retire le premier, <code>unshift()</code> ajoute en début, <code>splice(index, count)</code> supprime ou insère à une position précise.',
            code: {
              filename: 'tableaux.js',
              src: 'const fruits = ["pomme", "banane"]\n\nfruits.push("cerise")          // ajoute en fin\nfruits.unshift("ananas")       // ajoute en début\n\nconst dernier = fruits.pop()   // retire et retourne "cerise"\nconst premier = fruits.shift() // retire et retourne "ananas"\n\nconsole.log(fruits)            // ["pomme", "banane"]\nconsole.log(fruits.length)     // 2\n\n// splice(index, nombreASupprimer, ...elementsAInserer)\nfruits.splice(1, 0, "kiwi")    // insère "kiwi" à l\'index 1\nconsole.log(fruits)            // ["pomme", "kiwi", "banane"]'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle méthode supprime le premier élément d\'un tableau ?',
            options: ['pop()', 'shift()', 'splice()', 'remove()'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! shift() retire et retourne le premier élément. pop() retire le dernier.',
            errorMsg: 'shift() retire le premier élément. pop() retire le dernier. Il n\'existe pas de remove() natif.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un tableau "langages" avec ["HTML", "CSS"]. Ajoute "JavaScript" avec push(). Retire le premier élément avec shift(). Affiche le tableau final.',
            hint: 'langages.push("JavaScript") puis langages.shift()',
            filename: 'main.js',
            placeholder: 'const langages = ["HTML", "CSS"]\n',
            xp: 25,
            validator: (code: string) => code.includes('push') && code.includes('shift') && code.includes('console.log')
          }
        ]
      },
      {
        title: 'Méthodes fonctionnelles et spread',
        subtitle: 'map, filter, reduce et la déstructuration',
        type: 'theory',
        time: '16 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'map, filter et reduce',
            content: 'Ces trois méthodes transforment un tableau sans le modifier — elles retournent un nouveau tableau ou une valeur. <strong>map()</strong> transforme chaque élément via une fonction. <strong>filter()</strong> garde seulement les éléments qui passent un test. <strong>reduce()</strong> accumule les éléments en une valeur unique en partant d\'un accumulateur.',
            code: {
              filename: 'fonctionnel.js',
              src: 'const nombres = [1, 2, 3, 4, 5]\n\nconst doubles = nombres.map(n => n * 2)\nconsole.log(doubles)     // [2, 4, 6, 8, 10]\n\nconst pairs = nombres.filter(n => n % 2 === 0)\nconsole.log(pairs)       // [2, 4]\n\nconst total = nombres.reduce((acc, n) => acc + n, 0)\nconsole.log(total)       // 15\n\n// Chaîner les méthodes\nconst resultat = nombres\n  .filter(n => n > 2)\n  .map(n => n * 10)\nconsole.log(resultat)    // [30, 40, 50]'
            }
          },
          {
            type: 'theory',
            title: 'find, some, every, spread et déstructuration',
            content: '<code>find()</code> retourne le premier élément satisfaisant le test. <code>some()</code> retourne true si au moins un élément passe. <code>every()</code> retourne true si tous les éléments passent. Le <strong>spread operator</strong> (<code>...</code>) copie ou fusionne des tableaux. La <strong>déstructuration</strong> extrait des éléments en variables.',
            code: {
              filename: 'avance.js',
              src: 'const scores = [45, 87, 62, 91, 38]\n\nconsole.log(scores.find(s => s > 80))    // 87\nconsole.log(scores.some(s => s > 90))    // true\nconsole.log(scores.every(s => s > 30))   // true\n\n// Spread — copier et fusionner\nconst copie = [...scores]\nconst fusion = [...scores, 100, 200]\n\n// Déstructuration\nconst [premier, second, ...reste] = scores\nconsole.log(premier)   // 45\nconsole.log(second)    // 87\nconsole.log(reste)     // [62, 91, 38]'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle méthode retourne true si AU MOINS UN élément satisfait le test ?',
            options: ['every()', 'find()', 'some()', 'includes()'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! some() retourne true dès qu\'un élément satisfait le prédicat. every() exige que TOUS le satisfassent.',
            errorMsg: 'some() teste si au moins un élément passe. every() teste si tous les éléments passent.'
          },
          {
            type: 'code-challenge',
            instructions: 'À partir du tableau [3, 7, 2, 9, 1], utilise filter() pour garder les nombres > 4, puis map() pour les multiplier par 2. Affiche le résultat.',
            hint: 'Enchaîne .filter(n => n > 4).map(n => n * 2)',
            filename: 'main.js',
            placeholder: 'const nombres = [3, 7, 2, 9, 1]\n',
            xp: 35,
            validator: (code: string) => code.includes('filter') && code.includes('map') && code.includes('console.log')
          }
        ]
      }
    ]
  },
  {
    icon: '🗂️',
    title: 'Objets',
    lessons: [
      {
        title: 'Créer et parcourir un objet',
        subtitle: 'Dot notation, bracket et Object methods',
        type: 'theory',
        time: '13 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Créer un objet et accéder à ses propriétés',
            content: 'Un objet est une collection de paires <strong>clé : valeur</strong>. On accède aux propriétés avec la <strong>dot notation</strong> (<code>objet.propriete</code>) ou la <strong>bracket notation</strong> (<code>objet["propriete"]</code>). La bracket notation est indispensable quand la clé est dynamique (stockée dans une variable) ou contient des caractères spéciaux.',
            code: {
              filename: 'objets.js',
              src: 'const joueur = {\n  nom: "Alice",\n  niveau: 5,\n  xp: 1250,\n  actif: true\n}\n\nconsole.log(joueur.nom)        // "Alice" (dot notation)\nconsole.log(joueur["niveau"])  // 5 (bracket notation)\n\n// Clé dynamique — bracket obligatoire\nconst cle = "xp"\nconsole.log(joueur[cle])       // 1250\n\n// Modifier et ajouter\njoueur.niveau = 6\njoueur.classe = "Guerrière"    // nouvelle propriété'
            }
          },
          {
            type: 'theory',
            title: 'Object.keys, Object.values et Object.entries',
            content: '<code>Object.keys(obj)</code> retourne un tableau des clés. <code>Object.values(obj)</code> retourne un tableau des valeurs. <code>Object.entries(obj)</code> retourne un tableau de paires <code>[clé, valeur]</code>. Ces trois méthodes sont très utiles pour itérer sur un objet avec for...of.',
            code: {
              filename: 'object-methods.js',
              src: 'const config = { theme: "dark", lang: "fr", volume: 80 }\n\nconsole.log(Object.keys(config))\n// ["theme", "lang", "volume"]\n\nconsole.log(Object.values(config))\n// ["dark", "fr", 80]\n\nfor (const [cle, valeur] of Object.entries(config)) {\n  console.log(`${cle} = ${valeur}`)\n}\n// theme = dark\n// lang = fr\n// volume = 80'
            }
          },
          {
            type: 'quiz',
            question: 'Quand utilise-t-on obligatoirement la bracket notation ?',
            options: [
              'Jamais — dot notation suffit toujours',
              'Quand la clé contient un tiret ou est stockée dans une variable',
              'Uniquement pour les tableaux',
              'Quand l\'objet a plus de 5 propriétés'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Les clés avec tirets ou les clés dynamiques (variables) nécessitent la bracket notation.',
            errorMsg: 'La bracket notation est nécessaire pour les clés avec des caractères spéciaux et les clés dynamiques.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un objet "profil" avec les propriétés nom, age et ville. Itère dessus avec Object.entries() et une boucle for...of pour afficher chaque paire clé/valeur.',
            hint: 'for (const [cle, valeur] of Object.entries(profil)) { console.log(...) }',
            filename: 'main.js',
            placeholder: 'const profil = { /* tes données */ }\n',
            xp: 30,
            validator: (code: string) => code.includes('Object.entries') && code.includes('for') && code.includes('console.log')
          }
        ]
      },
      {
        title: 'Spread, déstructuration et méthodes d\'objet',
        subtitle: 'Techniques modernes et le mot-clé this',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Spread et déstructuration d\'objet',
            content: 'Le <strong>spread operator</strong> sur un objet (<code>{ ...obj }</code>) crée une copie superficielle ou fusionne deux objets. La <strong>déstructuration</strong> extrait des propriétés en variables locales. On peut renommer à la déstructuration et définir des valeurs par défaut.',
            code: {
              filename: 'spread-obj.js',
              src: 'const base = { nom: "Alice", niveau: 3 }\n\n// Spread — copier et enrichir\nconst enrichi = { ...base, xp: 500, actif: true }\nconsole.log(enrichi)\n// { nom: "Alice", niveau: 3, xp: 500, actif: true }\n\n// Déstructuration avec valeur par défaut et renommage\nconst { nom, niveau, classe = "Mage" } = enrichi\nconsole.log(nom)     // "Alice"\nconsole.log(classe)  // "Mage" (valeur par défaut)\n\nconst { nom: pseudo } = base   // renommage\nconsole.log(pseudo)  // "Alice"'
            }
          },
          {
            type: 'theory',
            title: 'Méthodes dans un objet et this',
            content: 'Un objet peut contenir des fonctions appelées <strong>méthodes</strong>. À l\'intérieur d\'une méthode, <code>this</code> fait référence à l\'objet appelant. Utilise la syntaxe courte <code>methode() { ... }</code> — les arrow functions n\'ont pas leur propre <code>this</code> et ne conviennent pas comme méthodes.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Arrow function et this',
              text: 'N\'utilise pas les arrow functions comme méthodes d\'objet si tu as besoin de this. Utilise la syntaxe courte methode() { ... }.'
            },
            code: {
              filename: 'methodes.js',
              src: 'const compteur = {\n  valeur: 0,\n  incrementer() {          // syntaxe courte — this fonctionne\n    this.valeur++\n  },\n  getValeur() {\n    return this.valeur\n  }\n}\n\ncompteur.incrementer()\ncompteur.incrementer()\nconsole.log(compteur.getValeur())  // 2'
            }
          },
          {
            type: 'quiz',
            question: 'Dans une méthode d\'objet (syntaxe courte), à quoi fait référence this ?',
            options: [
              'À la fonction elle-même',
              'À l\'objet global window',
              'À l\'objet qui contient la méthode',
              'À undefined en mode strict'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! this dans une méthode (syntaxe courte) référence l\'objet qui contient la méthode.',
            errorMsg: 'Dans une méthode classique (syntaxe courte), this référence l\'objet contenant la méthode.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la déstructuration de l\'objet personnage.',
            xp: 20,
            parts: [
              { type: 'text', value: 'const personnage = { nom: "Zoe", classe: "Archer", niveau: 7 }\nconst { ' },
              { type: 'blank', placeholder: 'propriété', correct: 'nom' },
              { type: 'text', value: ', ' },
              { type: 'blank', placeholder: 'propriété', correct: 'classe' },
              { type: 'text', value: ' } = personnage\nconsole.log(nom, classe)  // Zoe Archer' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🏗️',
    title: 'Classes',
    lessons: [
      {
        title: 'Classes et héritage',
        subtitle: 'POO avec la syntaxe class ES6',
        type: 'theory',
        time: '15 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'class et constructor',
            content: 'Les <strong>classes</strong> ES6 offrent une syntaxe claire pour la programmation orientée objet. Le <strong>constructor</strong> est appelé automatiquement lors de la création d\'une instance avec <code>new</code>. Il initialise les propriétés de l\'instance avec <code>this.propriete</code>. Les méthodes sont définies directement dans le corps de la classe.',
            code: {
              filename: 'classes.js',
              src: 'class Joueur {\n  constructor(nom, classe) {\n    this.nom = nom\n    this.classe = classe\n    this.niveau = 1\n    this.xp = 0\n  }\n\n  gagnerXP(points) {\n    this.xp += points\n    console.log(`${this.nom} gagne ${points} XP !`)\n  }\n\n  toString() {\n    return `${this.nom} (${this.classe}) — Niveau ${this.niveau}`\n  }\n}\n\nconst alice = new Joueur("Alice", "Mage")\nalice.gagnerXP(50)\nconsole.log(alice.toString())  // Alice (Mage) — Niveau 1'
            }
          },
          {
            type: 'theory',
            title: 'Héritage avec extends et super',
            content: '<code>extends</code> permet à une classe enfant de reprendre les propriétés et méthodes d\'une classe parent. <code>super()</code> dans le constructor enfant appelle le constructor parent — c\'est obligatoire avant d\'utiliser <code>this</code>. La classe enfant peut <strong>surcharger</strong> (override) les méthodes du parent.',
            code: {
              filename: 'heritage.js',
              src: 'class Entite {\n  constructor(nom, pv) {\n    this.nom = nom\n    this.pv = pv\n  }\n  estVivant() {\n    return this.pv > 0\n  }\n}\n\nclass Heros extends Entite {\n  constructor(nom, pv, classe) {\n    super(nom, pv)        // appelle Entite(nom, pv)\n    this.classe = classe\n  }\n  attaquer(cible) {\n    console.log(`${this.nom} attaque ${cible.nom} !`)\n  }\n}\n\nconst heros = new Heros("Alice", 100, "Guerrière")\nconsole.log(heros.estVivant())  // true — méthode héritée'
            }
          },
          {
            type: 'quiz',
            question: 'À quoi sert super() dans le constructor d\'une classe enfant ?',
            options: [
              'Créer une nouvelle instance de la classe enfant',
              'Appeler le constructor de la classe parent',
              'Copier toutes les méthodes du parent',
              'Accéder aux propriétés statiques'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! super() dans le constructor enfant appelle le constructor du parent.',
            errorMsg: 'super() dans un constructor enfant appelle le constructor de la classe parent — obligatoire avec extends.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une classe "Animal" avec un constructor(nom, son) et une méthode parler() qui affiche "${this.nom} dit ${this.son}". Crée une instance et appelle parler().',
            hint: 'class Animal { constructor(nom, son) { ... } parler() { console.log(...) } }',
            filename: 'main.js',
            placeholder: '// Définis la classe Animal\n',
            xp: 40,
            validator: (code: string) => code.includes('class') && code.includes('constructor') && code.includes('console.log')
          }
        ]
      },
      {
        title: 'Getters, setters et méthodes statiques',
        subtitle: 'Accesseurs et méthodes de classe',
        type: 'theory',
        time: '13 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Getters et setters',
            content: 'Un <strong>getter</strong> (<code>get</code>) est une méthode qu\'on utilise comme une propriété en lecture. Un <strong>setter</strong> (<code>set</code>) est déclenché lors d\'une affectation. Ils permettent d\'ajouter de la logique (validation, calcul) tout en gardant une interface propre.',
            code: {
              filename: 'getset.js',
              src: 'class Cercle {\n  constructor(rayon) {\n    this._rayon = rayon\n  }\n\n  get rayon() {\n    return this._rayon\n  }\n\n  set rayon(val) {\n    if (val <= 0) throw new Error("Rayon invalide")\n    this._rayon = val\n  }\n\n  get aire() {\n    return Math.PI * this._rayon ** 2\n  }\n}\n\nconst c = new Cercle(5)\nconsole.log(c.aire)     // 78.539...\nc.rayon = 10\nconsole.log(c.rayon)    // 10'
            }
          },
          {
            type: 'theory',
            title: 'Méthodes statiques',
            content: 'Une méthode <strong>static</strong> appartient à la classe elle-même, pas à ses instances. On l\'appelle directement : <code>MaClasse.methode()</code>. Idéale pour les fonctions utilitaires liées au domaine de la classe mais qui n\'ont pas besoin d\'accéder aux données d\'une instance particulière.',
            code: {
              filename: 'static.js',
              src: 'class Mathutils {\n  static PI = 3.14159\n\n  static aireDisque(rayon) {\n    return Mathutils.PI * rayon ** 2\n  }\n\n  static estPair(n) {\n    return n % 2 === 0\n  }\n}\n\nconsole.log(Mathutils.aireDisque(5))   // 78.539...\nconsole.log(Mathutils.estPair(4))      // true\n\n// Sur les instances, les méthodes static ne sont pas disponibles\nconst m = new Mathutils()\nconsole.log(m.aireDisque)   // undefined'
            }
          },
          {
            type: 'quiz',
            question: 'Comment appelle-t-on une méthode static ?',
            options: [
              'Sur une instance : monInstance.methode()',
              'Directement sur la classe : Classe.methode()',
              'Avec super.methode() depuis une classe enfant',
              'Avec new Classe.methode()'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Les méthodes static s\'appellent sur la classe elle-même, pas sur une instance.',
            errorMsg: 'Les méthodes static appartiennent à la classe. On les appelle avec Classe.methode(), pas instance.methode().'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la déclaration de la méthode statique.',
            xp: 20,
            parts: [
              { type: 'text', value: 'class Calculatrice {\n  ' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'static' },
              { type: 'text', value: ' additionner(a, b) {\n    return a + b\n  }\n}\nconsole.log(Calculatrice.additionner(3, 4))  // ' },
              { type: 'blank', placeholder: 'résultat', correct: '7' },
              { type: 'text', value: '' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '⏳',
    title: 'Asynchrone',
    lessons: [
      {
        title: 'Callbacks et Promises',
        subtitle: 'Gérer les opérations asynchrones',
        type: 'theory',
        time: '15 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Le problème du code asynchrone',
            content: 'JavaScript est <strong>single-threaded</strong> : il exécute une seule chose à la fois. Les opérations longues (réseau, timers...) sont asynchrones — elles se terminent plus tard sans bloquer le reste. Les <strong>callbacks</strong> étaient la première solution : une fonction passée en argument pour être appelée quand l\'opération se termine.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Callback hell',
              text: 'Imbriquer des callbacks mène à du code illisible avec des niveaux d\'imbrication croissants. Les Promises et async/await ont résolu ce problème.'
            },
            code: {
              filename: 'async.js',
              src: 'console.log("Début")\n\nsetTimeout(() => {\n  console.log("Après 2 secondes")\n}, 2000)\n\nconsole.log("Fin")\n// Ordre : Début → Fin → Après 2 secondes\n\n// Callback hell — à éviter\nchargerUtilisateur(id, user => {\n  chargerProfil(user, profil => {\n    chargerPermissions(profil, perms => {\n      // code illisible et difficile à maintenir\n    })\n  })\n})'
            }
          },
          {
            type: 'theory',
            title: 'Promises : then, catch, finally',
            content: 'Une <strong>Promise</strong> représente une valeur future. Elle est soit <em>pending</em> (en attente), soit <em>fulfilled</em> (résolue), soit <em>rejected</em> (rejetée). <code>.then()</code> reçoit la valeur en cas de succès, <code>.catch()</code> gère les erreurs, <code>.finally()</code> s\'exécute dans tous les cas.',
            code: {
              filename: 'promises.js',
              src: 'function chargerDonnees(id) {\n  return new Promise((resolve, reject) => {\n    if (id > 0) {\n      resolve({ id, nom: "Joueur" + id })\n    } else {\n      reject(new Error("ID invalide"))\n    }\n  })\n}\n\nchargerDonnees(42)\n  .then(data => console.log("Succès :", data))\n  .catch(err => console.error("Erreur :", err.message))\n  .finally(() => console.log("Opération terminée"))'
            }
          },
          {
            type: 'quiz',
            question: 'Quel est l\'état initial d\'une Promise ?',
            options: ['fulfilled', 'rejected', 'pending', 'resolved'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Une Promise commence en état "pending" avant d\'être résolue (fulfilled) ou rejetée (rejected).',
            errorMsg: 'Une Promise est d\'abord "pending", puis soit "fulfilled" (succès) soit "rejected" (échec).'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une Promise qui se résout avec "Chargement OK". Utilise .then() pour afficher le message et .catch() pour gérer les erreurs.',
            hint: 'new Promise((resolve, reject) => { resolve("Chargement OK") })',
            filename: 'main.js',
            placeholder: '// Crée et utilise une Promise\n',
            xp: 35,
            validator: (code: string) => code.includes('Promise') && code.includes('resolve') && code.includes('then')
          }
        ]
      },
      {
        title: 'async/await et fetch API',
        subtitle: 'La syntaxe moderne du code asynchrone',
        type: 'theory',
        time: '16 min',
        xp: 85,
        steps: [
          {
            type: 'theory',
            title: 'async et await',
            content: '<code>async</code> devant une fonction la transforme en fonction qui retourne toujours une Promise. <code>await</code> (utilisable uniquement dans une fonction async) suspend l\'exécution jusqu\'à ce qu\'une Promise soit résolue. Le code ressemble à du synchrone tout en étant asynchrone.',
            code: {
              filename: 'async-await.js',
              src: '// Avec Promises (chaînage)\nfunction charger() {\n  return fetch("/api/user")\n    .then(res => res.json())\n    .then(data => data.nom)\n}\n\n// Avec async/await — plus lisible\nasync function charger() {\n  const res = await fetch("/api/user")\n  const data = await res.json()\n  return data.nom\n}\n\n// Une fonction async retourne toujours une Promise\ncharger().then(nom => console.log(nom))'
            }
          },
          {
            type: 'theory',
            title: 'Gestion d\'erreurs et Promise.all',
            content: 'Dans une fonction async, <strong>try/catch</strong> remplace <code>.catch()</code> pour gérer les erreurs. <code>Promise.all()</code> attend plusieurs Promises en <strong>parallèle</strong> — plus performant qu\'attendre chacune séquentiellement.',
            code: {
              filename: 'async-avance.js',
              src: 'async function chargerProfil(id) {\n  try {\n    const res = await fetch(`/api/profils/${id}`)\n    if (!res.ok) throw new Error(`HTTP ${res.status}`)\n    return await res.json()\n  } catch (erreur) {\n    console.error("Erreur :", erreur.message)\n    return null\n  }\n}\n\n// Promise.all — appels parallèles (plus rapide)\nasync function chargerTout() {\n  const [user, config] = await Promise.all([\n    fetch("/api/user").then(r => r.json()),\n    fetch("/api/config").then(r => r.json())\n  ])\n  console.log(user, config)\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne toujours une fonction marquée async ?',
            options: ['undefined', 'La valeur retournée directement', 'Une Promise', 'Un callback'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! async enveloppe automatiquement la valeur de retour dans une Promise.',
            errorMsg: 'Une fonction async retourne toujours une Promise — même si tu retournes une valeur simple.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction async "attendre(ms)" qui retourne une Promise résolue après ms millisecondes. Utilise-la avec await dans une autre fonction async et affiche un message avant et après.',
            hint: 'return new Promise(resolve => setTimeout(resolve, ms))',
            filename: 'main.js',
            placeholder: 'async function attendre(ms) {\n  // implémente ici\n}\n\nasync function main() {\n  // utilise attendre avec await\n}\n',
            xp: 40,
            validator: (code: string) => code.includes('async') && code.includes('await') && code.includes('Promise')
          }
        ]
      }
    ]
  },
  {
    icon: '🛡️',
    title: 'Gestion d\'erreurs',
    lessons: [
      {
        title: 'try, catch et finally',
        subtitle: 'Capturer et traiter les erreurs proprement',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'try/catch/finally et throw',
            content: 'Le bloc <strong>try</strong> contient le code susceptible de lever une erreur. Si une erreur survient, le contrôle passe au bloc <strong>catch</strong> qui reçoit l\'objet erreur. Le bloc <strong>finally</strong> s\'exécute toujours, qu\'il y ait eu erreur ou non. Le mot-clé <strong>throw</strong> lève manuellement une erreur.',
            code: {
              filename: 'try-catch.js',
              src: 'function diviser(a, b) {\n  if (b === 0) throw new Error("Division par zéro impossible")\n  return a / b\n}\n\ntry {\n  console.log(diviser(10, 2))    // 5\n  console.log(diviser(10, 0))    // lance une erreur\n} catch (erreur) {\n  console.error("Erreur :", erreur.message)\n  // "Erreur : Division par zéro impossible"\n} finally {\n  console.log("Calcul terminé")  // toujours affiché\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quand le bloc finally s\'exécute-t-il ?',
            options: [
              'Seulement en cas d\'erreur dans try',
              'Seulement si try se termine sans erreur',
              'Toujours, qu\'il y ait eu erreur ou non',
              'Seulement si on utilise throw explicitement'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! finally s\'exécute TOUJOURS — c\'est son utilité pour le nettoyage de ressources.',
            errorMsg: 'finally s\'exécute toujours, peu importe si une erreur a été levée ou non dans try.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction "parserJSON(texte)" qui parse le texte avec JSON.parse() dans un try/catch. Si le parsing échoue, affiche l\'erreur et retourne null. Teste avec un JSON valide et un invalide.',
            hint: 'JSON.parse() lève une SyntaxError si le JSON est invalide.',
            filename: 'main.js',
            placeholder: 'function parserJSON(texte) {\n  // try/catch ici\n}\n',
            xp: 35,
            validator: (code: string) => code.includes('try') && code.includes('catch') && code.includes('JSON.parse')
          }
        ]
      },
      {
        title: 'Types d\'erreurs et erreurs personnalisées',
        subtitle: 'TypeError, RangeError et classes d\'erreur custom',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Types d\'erreurs natifs',
            content: 'JavaScript fournit plusieurs types d\'erreurs natifs : <strong>Error</strong> (générique), <strong>TypeError</strong> (mauvais type), <strong>RangeError</strong> (valeur hors plage), <strong>ReferenceError</strong> (variable inexistante), <strong>SyntaxError</strong> (code invalide). On peut tester le type avec <code>instanceof</code> pour les traiter différemment.',
            code: {
              filename: 'types-erreurs.js',
              src: 'try {\n  null.propriete      // TypeError\n} catch (e) {\n  console.log(e instanceof TypeError)    // true\n  console.log(e.name)                    // "TypeError"\n}\n\ntry {\n  new Array(-1)       // RangeError\n} catch (e) {\n  console.log(e instanceof RangeError)   // true\n  console.log(e.name)                    // "RangeError"\n}'
            }
          },
          {
            type: 'theory',
            title: 'Créer ses propres classes d\'erreur',
            content: 'On peut créer des erreurs métier personnalisées en étendant la classe <code>Error</code>. Cela permet de créer des types d\'erreurs explicites et de les distinguer facilement dans les blocs catch. Il faut appeler <code>super(message)</code> et définir <code>this.name</code>.',
            code: {
              filename: 'custom-error.js',
              src: 'class ErreurValidation extends Error {\n  constructor(champ, message) {\n    super(message)\n    this.name = "ErreurValidation"\n    this.champ = champ\n  }\n}\n\nfunction validerAge(age) {\n  if (typeof age !== "number") {\n    throw new TypeError("L\'âge doit être un nombre")\n  }\n  if (age < 0 || age > 150) {\n    throw new ErreurValidation("age", "Âge hors plage valide")\n  }\n}\n\ntry {\n  validerAge(-5)\n} catch (e) {\n  if (e instanceof ErreurValidation) {\n    console.log(`Champ invalide : ${e.champ}`)  // "age"\n  }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle erreur est levée quand on accède à une propriété sur null ?',
            options: ['ReferenceError', 'SyntaxError', 'TypeError', 'RangeError'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Accéder à une propriété sur null ou undefined lève une TypeError.',
            errorMsg: 'null.propriete lève une TypeError : impossible d\'accéder à des propriétés d\'une valeur null.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la classe d\'erreur personnalisée.',
            xp: 25,
            parts: [
              { type: 'text', value: 'class ErreurReseau ' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'extends' },
              { type: 'text', value: ' Error {\n  constructor(code, msg) {\n    ' },
              { type: 'blank', placeholder: 'appel parent', correct: 'super(msg)' },
              { type: 'text', value: '\n    this.name = "ErreurReseau"\n    this.code = code\n  }\n}' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🔧',
    title: 'Modules ES6',
    lessons: [
      {
        title: 'export et import nommé',
        subtitle: 'Organiser le code en fichiers réutilisables',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'export nommé et import',
            content: 'Les <strong>modules ES6</strong> permettent de diviser le code en fichiers. On exporte avec <code>export</code> devant une déclaration. On importe avec <code>import { nom } from "./fichier.js"</code>. Un fichier peut avoir autant d\'exports nommés qu\'il veut. On peut renommer à l\'import avec <code>as</code>.',
            code: {
              filename: 'maths.js',
              src: '// maths.js — exports nommés\nexport const PI = 3.14159\n\nexport function additionner(a, b) {\n  return a + b\n}\n\nexport function multiplier(a, b) {\n  return a * b\n}\n\n// main.js\nimport { PI, additionner } from "./maths.js"\nimport { multiplier as mult } from "./maths.js"   // alias\n\nconsole.log(PI)                // 3.14159\nconsole.log(additionner(3, 4)) // 7\nconsole.log(mult(3, 4))        // 12'
            }
          },
          {
            type: 'theory',
            title: 'export default',
            content: '<code>export default</code> exporte une valeur principale par fichier — typiquement une classe ou une fonction. On l\'importe sans accolades avec le nom de son choix. Un fichier peut combiner un export default et plusieurs exports nommés.',
            code: {
              filename: 'joueur.js',
              src: '// joueur.js\nexport default class Joueur {\n  constructor(nom) { this.nom = nom }\n  toString() { return this.nom }\n}\n\nexport const VERSION = "1.0"\n\n// main.js\nimport Joueur from "./joueur.js"            // default — sans accolades\nimport { VERSION } from "./joueur.js"       // nommé\nimport Hero, { VERSION as V } from "./joueur.js"  // les deux ensemble\n\nconst j = new Joueur("Alice")\nconsole.log(j.toString(), VERSION)          // Alice 1.0'
            }
          },
          {
            type: 'quiz',
            question: 'Comment importe-t-on un export default ?',
            options: [
              'import { MaClasse } from "./fichier"',
              'import default MaClasse from "./fichier"',
              'import MaClasse from "./fichier"',
              'import * MaClasse from "./fichier"'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! L\'export default s\'importe sans accolades, avec le nom de son choix.',
            errorMsg: 'L\'export default s\'importe sans accolades : import NomAuChoix from "./fichier".'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un module avec une constante "SALUTATION" exportée nommée, et une fonction "saluer(nom)" exportée par défaut qui retourne `${SALUTATION} ${nom}`.',
            hint: 'export const SALUTATION = "Bonjour" puis export default function saluer(nom) { ... }',
            filename: 'module.js',
            placeholder: '// Exporte SALUTATION (nommé) et saluer (default)\n',
            xp: 30,
            validator: (code: string) => code.includes('export const') && code.includes('export default')
          }
        ]
      },
      {
        title: 'Import dynamique et namespace',
        subtitle: 'Chargement conditionnel et import *',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'import() dynamique',
            content: 'L\'<strong>import dynamique</strong> (<code>import()</code>) charge un module à la demande et retourne une Promise. C\'est utile pour le <em>code splitting</em> — charger du code seulement quand il est nécessaire, améliorant les performances initiales. On l\'utilise avec <code>await</code> dans une fonction async.',
            code: {
              filename: 'dynamic.js',
              src: '// Import statique — chargé au démarrage (en haut du fichier)\nimport { additionner } from "./maths.js"\n\n// Import dynamique — chargé à la demande\nasync function chargerGraphique() {\n  const module = await import("./graphique.js")\n  module.dessiner()\n}\n\n// Conditionnellement\nasync function initAdmin() {\n  if (utilisateur.estAdmin) {\n    const { AdminPanel } = await import("./admin.js")\n    AdminPanel.init()\n  }\n}'
            }
          },
          {
            type: 'theory',
            title: 'import * as namespace',
            content: '<code>import * as alias</code> importe tous les exports d\'un module dans un objet. Pratique pour regrouper les exports sous un préfixe clair. On peut aussi réexporter depuis un fichier index pour centraliser les imports.',
            code: {
              filename: 'namespace.js',
              src: '// Tout importer dans un namespace\nimport * as Maths from "./maths.js"\n\nconsole.log(Maths.PI)                   // 3.14159\nconsole.log(Maths.additionner(2, 3))    // 5\nconsole.log(Maths.multiplier(4, 5))     // 20\n\n// index.js — réexporter pour centraliser\nexport { additionner, multiplier } from "./maths.js"\nexport { default as Joueur } from "./joueur.js"'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est l\'utilité principale de l\'import dynamique ?',
            options: [
              'Importer des modules côté serveur uniquement',
              'Charger du code à la demande pour améliorer les performances initiales',
              'Remplacer totalement les imports statiques',
              'Contourner les erreurs de CORS'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! L\'import dynamique permet le code splitting — charger du code seulement quand nécessaire.',
            errorMsg: 'L\'import dynamique sert à charger des modules à la demande (lazy loading), améliorant les performances.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète l\'import dynamique dans cette fonction async.',
            xp: 20,
            parts: [
              { type: 'text', value: 'async function charger() {\n  const module = ' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'await' },
              { type: 'text', value: ' ' },
              { type: 'blank', placeholder: 'fonction', correct: 'import' },
              { type: 'text', value: '("./utils.js")\n  module.init()\n}' }
            ]
          }
        ]
      }
    ]
  }
]
