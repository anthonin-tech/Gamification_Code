import type { CourseModule } from '@/types/cours'

export const CURRICULUM_TYPESCRIPT: CourseModule[] = [
  {
    icon: '🔷',
    title: 'Introduction à TypeScript',
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
              src: '// JavaScript — bug silencieux\nfunction additionner(a, b) {\n  return a + b\n}\nadditionner("5", 3) // "53" au lieu de 8 !\n\n// TypeScript — erreur détectée immédiatement\nfunction additionner(a: number, b: number): number {\n  return a + b\n}\nadditionner("5", 3) // ❌ Erreur : Argument de type string...'
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
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction multiplier(a: number, b: number) qui retourne le produit. Affiche le résultat avec console.log().',
            placeholder: '// Écris ta fonction typée ici\n',
            filename: 'main.ts',
            xp: 25,
            validator: (code: string) => code.includes('number') && code.includes('return') && code.includes('console.log'),
            hint: 'Ajoute : number après chaque paramètre et après la parenthèse fermante pour le type de retour.'
          }
        ]
      },
      {
        title: 'Installer et compiler TypeScript',
        subtitle: 'tsc, tsconfig.json et ts-node',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Le compilateur tsc',
            content: 'TypeScript s\'installe via npm : <code>npm install -g typescript</code>. La commande <code>tsc fichier.ts</code> compile un fichier en JavaScript. Pour un projet entier, on crée un fichier <code>tsconfig.json</code> qui configure le compilateur (version JS cible, répertoire de sortie, vérifications strictes).',
            code: {
              filename: 'tsconfig.json',
              src: '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "strict": true,\n    "outDir": "./dist",\n    "rootDir": "./src"\n  }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait la commande "tsc" ?',
            options: [
              'Exécute le code TypeScript directement',
              'Compile le TypeScript en JavaScript',
              'Installe TypeScript',
              'Lance les tests TypeScript'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! tsc = TypeScript Compiler, il produit du JavaScript.',
            errorMsg: 'tsc compile le TypeScript en JavaScript — c\'est le rôle du compilateur.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la commande pour compiler un fichier TypeScript :',
            xp: 20,
            parts: [
              { type: 'blank', placeholder: 'commande', correct: 'tsc' },
              { type: 'text', value: ' main.ts' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '📌',
    title: 'Types primitifs',
    lessons: [
      {
        title: 'Annoter les types de base',
        subtitle: 'string, number, boolean, null, undefined',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Annotations de type',
            content: 'Pour typer une variable, on ajoute <strong>: type</strong> après son nom. TypeScript peut aussi <strong>inférer</strong> le type automatiquement — si tu écris <code>const age = 25</code>, TypeScript sait que c\'est un <code>number</code> sans que tu le précises.',
            code: {
              filename: 'types.ts',
              src: '// Typage explicite\nconst prenom: string = "Alice"\nconst age: number = 25\nconst actif: boolean = true\nconst rien: null = null\nlet inconnu: undefined\n\n// Inférence (TypeScript devine)\nconst score = 100      // TypeScript infère : number\nconst message = "ok"   // TypeScript infère : string\n\n// Erreur détectée\nconst points: number = "cent" // ❌ Type string pas assignable à number'
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
              { type: 'text', value: ' = 30\nconst actif: ' },
              { type: 'blank', placeholder: 'type', correct: 'boolean' },
              { type: 'text', value: ' = true' }
            ]
          }
        ]
      },
      {
        title: 'any, unknown et never',
        subtitle: 'Les types spéciaux de TypeScript',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'any — désactiver le typage',
            content: '<code>any</code> est le type de secours : il accepte n\'importe quelle valeur et désactive toutes les vérifications TypeScript. À utiliser avec parcimonie — c\'est l\'équivalent de revenir à JavaScript sans types. Préfère <code>unknown</code> quand tu ne sais pas le type à l\'avance.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'any est une fuite dans le système de types',
              text: 'Chaque any que tu écris est une zone où TypeScript ne peut plus t\'aider. Utilise unknown à la place — il force à vérifier le type avant d\'utiliser la valeur.'
            },
            code: {
              filename: 'any-unknown.ts',
              src: '// any — dangereux, pas de vérification\nlet donnee: any = "texte"\ndonnee = 42        // ok\ndonnee = true      // ok\ndonnee.nimporte()  // ok pour TS, crash à l\'exécution !\n\n// unknown — sûr, force la vérification\nlet valeur: unknown = "texte"\nif (typeof valeur === "string") {\n  console.log(valeur.toUpperCase()) // ok — on a vérifié\n}'
            }
          },
          {
            type: 'theory',
            title: 'never — code inaccessible',
            content: '<code>never</code> représente un type qui ne peut jamais avoir de valeur. Il apparaît dans les fonctions qui ne retournent jamais (throw ou boucle infinie) et dans les branches de code inaccessibles. TypeScript l\'utilise pour vérifier que tous les cas d\'un switch/if sont traités.',
            code: {
              filename: 'never.ts',
              src: '// Fonction qui ne retourne jamais\nfunction erreurFatale(msg: string): never {\n  throw new Error(msg)\n}\n\n// Vérification exhaustive avec never\ntype Direction = "nord" | "sud" | "est"\nfunction aller(d: Direction): string {\n  switch (d) {\n    case "nord": return "Cap au nord"\n    case "sud":  return "Cap au sud"\n    case "est":  return "Cap à l\'est"\n    default:\n      const _check: never = d // ❌ si on oublie un cas\n      return _check\n  }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre any et unknown ?',
            options: [
              'Il n\'y a aucune différence',
              'any est plus strict que unknown',
              'unknown force à vérifier le type avant utilisation, any non',
              'unknown n\'existe qu\'en TypeScript 5+'
            ],
            correct: 2,
            xp: 20,
            successMsg: 'Exact ! unknown est le any sûr — il t\'oblige à vérifier avant d\'utiliser.',
            errorMsg: 'unknown force une vérification de type (typeof, instanceof) avant de pouvoir utiliser la valeur.'
          }
        ]
      }
    ]
  },
  {
    icon: '📐',
    title: 'Interfaces et objets',
    lessons: [
      {
        title: 'Créer une interface',
        subtitle: 'Définir la forme attendue d\'un objet',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Le mot-clé interface',
            content: 'Une <strong>interface</strong> décrit la structure attendue d\'un objet : quelles propriétés il doit avoir et leurs types. C\'est l\'outil principal pour typer les objets en TypeScript. Si un objet ne respecte pas l\'interface, TypeScript signale une erreur.',
            code: {
              filename: 'interface.ts',
              src: 'interface Utilisateur {\n  nom: string\n  age: number\n  actif: boolean\n}\n\nconst user: Utilisateur = {\n  nom: "Alice",\n  age: 25,\n  actif: true\n}\n\n// Erreur — propriété manquante\nconst user2: Utilisateur = {\n  nom: "Bob"  // ❌ Manque age et actif\n}'
            }
          },
          {
            type: 'theory',
            title: 'Propriétés optionnelles et readonly',
            content: 'Ajouter <strong>?</strong> après un nom de propriété la rend optionnelle — elle peut être absente. Le mot-clé <strong>readonly</strong> empêche de modifier la propriété après sa création, comme une constante d\'objet.',
            code: {
              filename: 'optional.ts',
              src: 'interface Produit {\n  readonly id: number   // ne peut pas être modifié\n  nom: string\n  description?: string  // optionnel\n  prix: number\n}\n\nconst p: Produit = { id: 1, nom: "Clavier", prix: 79.99 }\n\np.nom = "Souris"  // ✅ ok\np.id = 2          // ❌ Cannot assign to readonly property'
            }
          },
          {
            type: 'quiz',
            question: 'Que signifie une propriété "nom?" dans une interface ?',
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
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une interface "Article" avec : id (number, readonly), titre (string), auteur (string), publie (boolean optionnel). Puis déclare un objet qui la respecte.',
            placeholder: 'interface Article {\n  // complète ici\n}\n',
            filename: 'main.ts',
            xp: 35,
            validator: (code: string) => code.includes('interface') && code.includes('readonly') && code.includes('?') && code.includes('boolean'),
            hint: 'readonly id: number, et publie?: boolean pour l\'optionnel.'
          }
        ]
      },
      {
        title: 'Étendre les interfaces',
        subtitle: 'Héritage d\'interfaces et fusion de déclarations',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'extends sur les interfaces',
            content: 'Une interface peut <strong>étendre</strong> une ou plusieurs autres interfaces avec le mot-clé <code>extends</code>. L\'interface résultante hérite de toutes les propriétés des interfaces parentes et peut en ajouter de nouvelles.',
            code: {
              filename: 'extends.ts',
              src: 'interface Personne {\n  nom: string\n  age: number\n}\n\ninterface Employe extends Personne {\n  poste: string\n  salaire: number\n}\n\nconst dev: Employe = {\n  nom: "Lena",\n  age: 28,\n  poste: "Développeuse",\n  salaire: 45000\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Peut-on étendre plusieurs interfaces à la fois ?',
            options: [
              'Non, une seule interface parente maximum',
              'Oui, avec extends A, B, C',
              'Oui, mais seulement en TypeScript 5+',
              'Non, il faut utiliser type à la place'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! interface C extends A, B fusionne les deux interfaces.',
            errorMsg: 'On peut étendre plusieurs interfaces : interface C extends A, B { }'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une interface "Animal" (nom: string, age: number) puis une interface "Chien" qui étend Animal avec une propriété race (string). Déclare un objet Chien.',
            placeholder: 'interface Animal {\n\n}\n\ninterface Chien extends Animal {\n\n}\n',
            filename: 'main.ts',
            xp: 30,
            validator: (code: string) => code.includes('extends Animal') && code.includes('race') && code.includes('string'),
            hint: 'Chien extends Animal ajoute les propriétés de Animal automatiquement.'
          }
        ]
      }
    ]
  },
  {
    icon: '🏷️',
    title: 'Types alias et union',
    lessons: [
      {
        title: 'type alias',
        subtitle: 'Nommer et réutiliser des types complexes',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Le mot-clé type',
            content: 'Un <strong>alias de type</strong> permet de donner un nom à n\'importe quel type, même complexe. Contrairement à <code>interface</code>, <code>type</code> peut représenter des unions, des intersections, des tuples, et des types primitifs renommés.',
            code: {
              filename: 'type-alias.ts',
              src: '// Alias simple\ntype ID = string | number\ntype NombrePositif = number\n\n// Alias d\'objet (similaire à interface)\ntype Point = {\n  x: number\n  y: number\n}\n\n// Alias de literal type (valeurs exactes)\ntype Statut = "actif" | "inactif" | "suspendu"\ntype Note = 1 | 2 | 3 | 4 | 5\n\nconst etat: Statut = "actif"\nconst note: Note = 3'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la principale différence entre interface et type ?',
            options: [
              'interface est plus rapide à la compilation',
              'type peut représenter des unions et primitives, interface non',
              'interface est obsolète en TypeScript moderne',
              'Il n\'y a aucune différence'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! type est plus flexible : il peut nommer une union, un tuple, un primitif.',
            errorMsg: 'type peut nommer des unions (A | B), des tuples [string, number], des primitives — interface ne peut pas.'
          },
          {
            type: 'fill-blank',
            instructions: 'Crée un alias de type pour une direction :',
            xp: 20,
            parts: [
              { type: 'text', value: '' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'type' },
              { type: 'text', value: ' Direction = "nord" | "sud" | "est" | "ouest"' }
            ]
          }
        ]
      },
      {
        title: 'Union et intersection',
        subtitle: 'Combiner des types avec | et &',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Types union (|)',
            content: 'Un <strong>type union</strong> permet à une valeur d\'être de plusieurs types. On les combine avec <code>|</code>. Pour utiliser une propriété spécifique à un type dans l\'union, il faut d\'abord <strong>réduire</strong> le type avec <code>typeof</code>, <code>instanceof</code>, ou une propriété discriminante.',
            code: {
              filename: 'union.ts',
              src: 'type ID = string | number\n\nlet id: ID = "abc-123"\nid = 42  // aussi valide\n\nfunction afficherID(id: string | number) {\n  if (typeof id === "string") {\n    console.log(id.toUpperCase()) // string ici\n  } else {\n    console.log(id.toFixed(2))    // number ici\n  }\n}'
            }
          },
          {
            type: 'theory',
            title: 'Types intersection (&)',
            content: 'Un <strong>type intersection</strong> combine plusieurs types en un seul qui doit satisfaire <em>tous</em> les types en même temps. C\'est l\'équivalent d\'un extends multiple pour les types objets.',
            code: {
              filename: 'intersection.ts',
              src: 'type Identifiable = { id: number }\ntype Nommable = { nom: string }\n\ntype Entite = Identifiable & Nommable\n\nconst entite: Entite = {\n  id: 1,\n  nom: "Alice"\n  // les deux sont obligatoires\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Comment déclare-t-on un type qui peut être string ou number ?',
            options: ['string + number', 'string & number', 'string | number', 'string || number'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Le | crée un type union en TypeScript.',
            errorMsg: 'Le symbole union en TypeScript est |, comme dans string | number.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un type "Resultat" qui peut être soit { succes: true, données: string } soit { succes: false, erreur: string }. C\'est un union discriminant.',
            placeholder: 'type Resultat = \n',
            filename: 'main.ts',
            xp: 35,
            validator: (code: string) => code.includes('succes') && code.includes('|') && code.includes('true') && code.includes('false'),
            hint: 'type Resultat = { succes: true, données: string } | { succes: false, erreur: string }'
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
        title: 'Typer paramètres et retour',
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
              src: '// Paramètres typés + type de retour\nfunction saluer(prenom: string, age: number): string {\n  return `Bonjour ${prenom}, tu as ${age} ans`\n}\n\n// Fonction sans retour\nfunction afficher(message: string): void {\n  console.log(message)\n}\n\n// Paramètre optionnel\nfunction saluerOptional(prenom: string, titre?: string): string {\n  return titre ? `${titre} ${prenom}` : prenom\n}\n\n// Erreur détectée\nsaluer(42, "Alice") // ❌ Types inversés'
            }
          },
          {
            type: 'theory',
            title: 'Types de fonctions et callbacks',
            content: 'Une fonction est elle-même un type en TypeScript. On peut typer une variable qui contient une fonction avec la syntaxe <code>(param: type) => typeRetour</code>. Très utile pour typer les callbacks et les paramètres de fonctions d\'ordre supérieur.',
            code: {
              filename: 'callback.ts',
              src: '// Type de fonction\ntype Operation = (a: number, b: number) => number\n\nconst addition: Operation = (a, b) => a + b\nconst soustraction: Operation = (a, b) => a - b\n\n// Callback typé\nfunction appliquer(op: Operation, x: number, y: number): number {\n  return op(x, y)\n}\n\nconsole.log(appliquer(addition, 5, 3))      // 8\nconsole.log(appliquer(soustraction, 10, 4)) // 6'
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
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction "filtrer" qui prend un tableau de nombres (number[]) et un callback (predicate: (n: number) => boolean) et retourne un number[]. Utilise le tableau .filter() en interne.',
            placeholder: 'function filtrer(tableau: number[], predicate: (n: number) => boolean): number[] {\n  \n}\n',
            filename: 'main.ts',
            xp: 40,
            validator: (code: string) => code.includes('number[]') && code.includes('=>') && code.includes('boolean') && code.includes('filter'),
            hint: 'Le body peut être simplement : return tableau.filter(predicate)'
          }
        ]
      },
      {
        title: 'Surcharge de fonctions',
        subtitle: 'Plusieurs signatures pour une même fonction',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Overloads',
            content: 'La <strong>surcharge de fonctions</strong> permet de déclarer plusieurs signatures pour une même fonction selon les types d\'entrée. On déclare d\'abord les signatures de surcharge, puis l\'implémentation réelle qui gère tous les cas.',
            code: {
              filename: 'overload.ts',
              src: '// Déclarations de surcharge\nfunction formater(valeur: string): string\nfunction formater(valeur: number): string\nfunction formater(valeur: Date): string\n\n// Implémentation\nfunction formater(valeur: string | number | Date): string {\n  if (typeof valeur === "string") return valeur.toUpperCase()\n  if (typeof valeur === "number") return valeur.toFixed(2)\n  return valeur.toLocaleDateString()\n}\n\nconsole.log(formater("hello"))  // HELLO\nconsole.log(formater(3.14159)) // 3.14'
            }
          },
          {
            type: 'quiz',
            question: 'Dans un overload, l\'implémentation réelle est-elle visible à l\'appelant ?',
            options: [
              'Oui, elle apparaît dans l\'autocomplétion',
              'Non, seules les signatures de surcharge sont visibles',
              'Oui mais seulement en mode strict',
              'Non, et il faut la déclarer private'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! L\'implémentation est "cachée" — l\'appelant ne voit que les surcharges déclarées.',
            errorMsg: 'L\'appelant ne voit que les signatures de surcharge, pas l\'implémentation générique.'
          }
        ]
      }
    ]
  },
  {
    icon: '🏗️',
    title: 'Classes typées',
    lessons: [
      {
        title: 'Classes et modificateurs d\'accès',
        subtitle: 'public, private, protected et readonly',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Modificateurs d\'accès',
            content: 'TypeScript ajoute des <strong>modificateurs d\'accès</strong> aux classes : <code>public</code> (accessible partout, défaut), <code>private</code> (seulement dans la classe), <code>protected</code> (classe + sous-classes). Contrairement à JavaScript, ils sont vérifiés à la compilation.',
            code: {
              filename: 'classe.ts',
              src: 'class CompteBancaire {\n  public titulaire: string\n  private solde: number\n  protected numeroCompte: string\n\n  constructor(titulaire: string, soldeInitial: number) {\n    this.titulaire = titulaire\n    this.solde = soldeInitial\n    this.numeroCompte = Math.random().toString(36).slice(2)\n  }\n\n  public deposer(montant: number): void {\n    if (montant > 0) this.solde += montant\n  }\n\n  public getSolde(): number {\n    return this.solde\n  }\n}\n\nconst compte = new CompteBancaire("Alice", 1000)\ncompte.deposer(500)\nconsole.log(compte.getSolde())   // 1500\nconsole.log(compte.solde)        // ❌ Property solde is private'
            }
          },
          {
            type: 'theory',
            title: 'Raccourci de constructeur',
            content: 'TypeScript propose un raccourci pratique : on peut déclarer et initialiser les propriétés directement dans les paramètres du constructeur en ajoutant le modificateur d\'accès devant.',
            code: {
              filename: 'shorthand.ts',
              src: '// Façon longue\nclass Produit1 {\n  public nom: string\n  public prix: number\n  constructor(nom: string, prix: number) {\n    this.nom = nom\n    this.prix = prix\n  }\n}\n\n// Raccourci TypeScript (équivalent)\nclass Produit2 {\n  constructor(\n    public nom: string,\n    public prix: number\n  ) {}\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle différence entre private et protected ?',
            options: [
              'Aucune différence',
              'private : classe uniquement. protected : classe + sous-classes',
              'protected : classe uniquement. private : classe + sous-classes',
              'private empêche aussi la lecture, protected uniquement l\'écriture'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! protected permet l\'accès aux sous-classes via héritage.',
            errorMsg: 'private bloque tout accès externe. protected autorise les sous-classes.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une classe "Voiture" avec private marque et private annee. Ajoute un constructor avec le raccourci (private marque: string, private annee: number) et une méthode publique getDescription() qui retourne une string.',
            placeholder: 'class Voiture {\n  constructor(\n    // raccourci ici\n  ) {}\n\n  // méthode ici\n}\n',
            filename: 'main.ts',
            xp: 40,
            validator: (code: string) => code.includes('private marque') && code.includes('private annee') && code.includes('getDescription') && code.includes('return'),
            hint: 'constructor(private marque: string, private annee: number) {} déclare ET initialise.'
          }
        ]
      },
      {
        title: 'implements et classes abstraites',
        subtitle: 'Contrats et classes de base non instanciables',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'implements',
            content: 'Une classe peut <strong>implémenter</strong> une interface avec <code>implements</code>. Cela garantit que la classe respecte le contrat de l\'interface. Une classe peut implémenter plusieurs interfaces.',
            code: {
              filename: 'implements.ts',
              src: 'interface Affichable {\n  afficher(): void\n}\n\ninterface Serializable {\n  toJSON(): string\n}\n\nclass Utilisateur implements Affichable, Serializable {\n  constructor(public nom: string, public age: number) {}\n\n  afficher(): void {\n    console.log(`${this.nom} (${this.age} ans)`)\n  }\n\n  toJSON(): string {\n    return JSON.stringify({ nom: this.nom, age: this.age })\n  }\n}'
            }
          },
          {
            type: 'theory',
            title: 'Classes abstraites',
            content: 'Une <strong>classe abstraite</strong> est une classe qu\'on ne peut pas instancier directement — elle sert uniquement de base pour d\'autres classes. Les méthodes abstraites sont déclarées sans implémentation et doivent être définies dans les sous-classes.',
            code: {
              filename: 'abstract.ts',
              src: 'abstract class Forme {\n  abstract calculerAire(): number  // doit être implémentée\n\n  // méthode normale disponible dans toutes les sous-classes\n  afficher(): void {\n    console.log(`Aire : ${this.calculerAire()}`)\n  }\n}\n\nclass Cercle extends Forme {\n  constructor(private rayon: number) { super() }\n\n  calculerAire(): number {\n    return Math.PI * this.rayon ** 2\n  }\n}\n\nconst c = new Cercle(5)\nc.afficher() // Aire : 78.53...\nnew Forme()  // ❌ Cannot create an instance of an abstract class'
            }
          },
          {
            type: 'quiz',
            question: 'Peut-on instancier une classe abstraite directement ?',
            options: [
              'Oui, comme n\'importe quelle classe',
              'Non, elle sert uniquement de classe de base',
              'Oui, mais seulement si toutes les méthodes abstraites ont une implémentation',
              'Non, et ses sous-classes non plus'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! abstract class ne peut pas être instanciée — c\'est son but.',
            errorMsg: 'On ne peut pas faire new ClasseAbstraite() — elle existe seulement pour être étendue.'
          }
        ]
      }
    ]
  },
  {
    icon: '🔮',
    title: 'Generics',
    lessons: [
      {
        title: 'Fonctions génériques',
        subtitle: 'Écrire du code réutilisable pour n\'importe quel type',
        type: 'theory',
        time: '14 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'Le paramètre de type <T>',
            content: 'Les <strong>generics</strong> permettent d\'écrire du code qui fonctionne avec n\'importe quel type tout en conservant la sécurité du typage. On utilise des paramètres de type entre chevrons, nommés par convention <code>T</code>, <code>U</code>, <code>K</code>, <code>V</code>.',
            code: {
              filename: 'generics.ts',
              src: '// Sans generics — perd le type\nfunction premierElement1(arr: any[]): any {\n  return arr[0]\n}\n\n// Avec generics — conserve le type\nfunction premierElement<T>(arr: T[]): T {\n  return arr[0]\n}\n\nconst num = premierElement([1, 2, 3])       // TypeScript sait que c\'est number\nconst str = premierElement(["a", "b", "c"]) // TypeScript sait que c\'est string\n\nconsole.log(num.toFixed(2)) // ✅ méthode number disponible'
            }
          },
          {
            type: 'theory',
            title: 'Contraintes sur les generics',
            content: 'On peut <strong>contraindre</strong> un type générique pour qu\'il respecte une interface ou ait certaines propriétés. On utilise <code>extends</code> dans la déclaration du générique : <code>T extends Interface</code>.',
            code: {
              filename: 'constraints.ts',
              src: '// T doit avoir une propriété length\nfunction afficherTaille<T extends { length: number }>(valeur: T): void {\n  console.log(`Taille : ${valeur.length}`)\n}\n\nafficherTaille("Bonjour")      // Taille : 7\nafficherTaille([1, 2, 3, 4])   // Taille : 4\nafficherTaille(42)             // ❌ number n\'a pas de .length\n\n// Contrainte avec keyof\nfunction getValeur<T, K extends keyof T>(obj: T, cle: K): T[K] {\n  return obj[cle]\n}\n\nconst user = { nom: "Alice", age: 25 }\nconsole.log(getValeur(user, "nom")) // "Alice"'
            }
          },
          {
            type: 'quiz',
            question: 'À quoi sert <T extends string> dans un générique ?',
            options: [
              'T ne peut être que le type string exactement',
              'T peut être string ou n\'importe quel sous-type de string',
              'T doit hériter de la classe String',
              'T peut être n\'importe quel type'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! extends dans les generics contraint T à être compatible avec string.',
            errorMsg: 'T extends string signifie que T doit être string ou un de ses sous-types (literal types).'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction générique "envelopper<T>" qui prend une valeur de type T et retourne un objet { valeur: T, timestamp: number }. Le timestamp est Date.now().',
            placeholder: 'function envelopper<T>(valeur: T): { valeur: T, timestamp: number } {\n  \n}\n',
            filename: 'main.ts',
            xp: 40,
            validator: (code: string) => code.includes('<T>') && code.includes('valeur: T') && code.includes('Date.now()'),
            hint: 'return { valeur, timestamp: Date.now() }'
          }
        ]
      },
      {
        title: 'Utility Types',
        subtitle: 'Partial, Required, Readonly, Pick, Omit, Record',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Partial et Required',
            content: '<code>Partial&lt;T&gt;</code> rend toutes les propriétés de T optionnelles. <code>Required&lt;T&gt;</code> fait l\'inverse — rend toutes les propriétés obligatoires. Très utiles pour les mises à jour partielles d\'objets (PATCH API).',
            code: {
              filename: 'partial.ts',
              src: 'interface Utilisateur {\n  nom: string\n  age: number\n  email: string\n}\n\n// Pour une mise à jour PATCH — tous les champs optionnels\ntype MiseAJour = Partial<Utilisateur>\n// { nom?: string, age?: number, email?: string }\n\nfunction mettreAJour(id: number, data: Partial<Utilisateur>): void {\n  console.log(`Mise à jour ${id}:`, data)\n}\n\nmettreAJour(1, { nom: "Alice" }) // ok — seulement le nom'
            }
          },
          {
            type: 'theory',
            title: 'Pick, Omit et Record',
            content: '<code>Pick&lt;T, K&gt;</code> sélectionne certaines propriétés de T. <code>Omit&lt;T, K&gt;</code> en exclut certaines. <code>Record&lt;K, V&gt;</code> crée un objet dont les clés sont de type K et les valeurs de type V.',
            code: {
              filename: 'pick-omit-record.ts',
              src: 'interface Article {\n  id: number\n  titre: string\n  contenu: string\n  auteur: string\n}\n\n// Seulement id et titre\ntype ArticleResume = Pick<Article, "id" | "titre">\n\n// Tout sauf contenu\ntype ArticleSansContenu = Omit<Article, "contenu">\n\n// Dictionnaire langage -> popularité\ntype Popularite = Record<string, number>\nconst stats: Popularite = {\n  javascript: 98,\n  typescript: 85,\n  python: 92\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne Omit<{ a: string, b: number, c: boolean }, "b"> ?',
            options: [
              '{ b: number }',
              '{ a: string, c: boolean }',
              '{ a: string, b: number }',
              '{ c: boolean }'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! Omit exclut la propriété "b" et garde les autres.',
            errorMsg: 'Omit<T, K> retourne T SANS les propriétés listées dans K.'
          },
          {
            type: 'code-challenge',
            instructions: 'Tu as une interface "Tache" avec : id, titre, description, priorite, termine. Crée deux types : "TacheResume" avec seulement id et titre, et "TacheMaj" qui rend tous les champs optionnels sauf id.',
            placeholder: 'interface Tache {\n  id: number\n  titre: string\n  description: string\n  priorite: number\n  termine: boolean\n}\n\ntype TacheResume = // Pick...\ntype TacheMaj = // Omit + Partial...\n',
            filename: 'main.ts',
            xp: 45,
            validator: (code: string) => code.includes('Pick') && code.includes('Partial') && code.includes('Omit'),
            hint: 'TacheMaj = { id: number } & Partial<Omit<Tache, "id">>'
          }
        ]
      }
    ]
  },
  {
    icon: '🛠️',
    title: 'Types avancés',
    lessons: [
      {
        title: 'keyof et typeof',
        subtitle: 'Extraire des types depuis le code',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'keyof — les clés d\'un objet',
            content: '<code>keyof T</code> produit une union des noms de propriétés de T. C\'est très utile pour typer des fonctions qui accèdent à des propriétés d\'un objet de manière générique.',
            code: {
              filename: 'keyof.ts',
              src: 'interface Utilisateur {\n  nom: string\n  age: number\n  email: string\n}\n\ntype ClesUtilisateur = keyof Utilisateur\n// "nom" | "age" | "email"\n\nfunction getPropriete<T, K extends keyof T>(obj: T, cle: K): T[K] {\n  return obj[cle]\n}\n\nconst user = { nom: "Alice", age: 25, email: "alice@cq.dev" }\nconst nom = getPropriete(user, "nom")   // TypeScript sait : string\nconst age = getPropriete(user, "age")   // TypeScript sait : number\nconst _ = getPropriete(user, "photo")  // ❌ "photo" n\'est pas une clé'
            }
          },
          {
            type: 'theory',
            title: 'typeof — type depuis une valeur',
            content: '<code>typeof</code> en position de type (pas en condition) extrait le type d\'une variable existante. Très pratique pour créer un type à partir d\'un objet déjà déclaré.',
            code: {
              filename: 'typeof.ts',
              src: 'const config = {\n  host: "localhost",\n  port: 3000,\n  debug: true\n}\n\ntype Config = typeof config\n// { host: string, port: number, debug: boolean }\n\nfunction appliquerConfig(c: typeof config): void {\n  console.log(`${c.host}:${c.port}`)\n}\n\n// ReturnType — type de retour d\'une fonction\nfunction creerUser() {\n  return { id: 1, nom: "Alice" }\n}\ntype Utilisateur = ReturnType<typeof creerUser>\n// { id: number, nom: string }'
            }
          },
          {
            type: 'quiz',
            question: 'Que produit keyof { a: string, b: number } ?',
            options: [
              'string | number',
              '"a" | "b"',
              '{ a: string, b: number }',
              'string'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! keyof retourne une union des noms de propriétés.',
            errorMsg: 'keyof extrait les noms (clés) d\'un type objet, pas leurs types.'
          }
        ]
      },
      {
        title: 'Types conditionnels et mapped types',
        subtitle: 'Types qui dépendent d\'autres types',
        type: 'theory',
        time: '14 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'Types conditionnels',
            content: 'Un <strong>type conditionnel</strong> fonctionne comme un if/else au niveau des types : <code>T extends U ? X : Y</code> — si T est compatible avec U, le type résultant est X, sinon Y. C\'est la base de nombreux utility types avancés.',
            code: {
              filename: 'conditional.ts',
              src: '// Si T est un tableau, retourner le type des éléments\ntype Decontenur<T> = T extends Array<infer U> ? U : T\n\ntype A = Decontenur<number[]>  // number\ntype B = Decontenur<string>    // string (pas un tableau)\n\n// NonNullable — enlève null et undefined\ntype NonNullable<T> = T extends null | undefined ? never : T\n\ntype C = NonNullable<string | null>  // string'
            }
          },
          {
            type: 'theory',
            title: 'Mapped types',
            content: 'Les <strong>mapped types</strong> créent un nouveau type en itérant sur les propriétés d\'un type existant. La syntaxe <code>[K in keyof T]: ...</code> transforme chaque propriété.',
            code: {
              filename: 'mapped.ts',
              src: '// Rendre toutes les propriétés en string\ntype ToutEnString<T> = {\n  [K in keyof T]: string\n}\n\n// Rendre toutes les propriétés nullables\ntype Nullable<T> = {\n  [K in keyof T]: T[K] | null\n}\n\ninterface Point { x: number, y: number }\ntype PointString = ToutEnString<Point>   // { x: string, y: string }\ntype PointNull = Nullable<Point>         // { x: number|null, y: number|null }'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait [K in keyof T]: T[K] | null ?',
            options: [
              'Supprime toutes les propriétés nullables',
              'Rend toutes les propriétés nullable (T[K] ou null)',
              'Copie T sans modification',
              'Convertit toutes les valeurs en null'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! C\'est la définition d\'un Nullable<T> maison.',
            errorMsg: 'T[K] | null signifie que chaque propriété peut être son type original OU null.'
          }
        ]
      }
    ]
  },
  {
    icon: '📦',
    title: 'Modules et déclarations',
    lessons: [
      {
        title: 'Modules TypeScript',
        subtitle: 'import/export et organisation du code',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Importer et exporter des types',
            content: 'TypeScript permet d\'importer et exporter des <strong>types</strong> en plus des valeurs. Depuis TypeScript 3.8, on peut utiliser <code>import type</code> pour signaler explicitement qu\'on importe uniquement un type (optimise le tree-shaking et évite les imports circulaires).',
            code: {
              filename: 'modules.ts',
              src: '// types.ts\nexport interface Utilisateur {\n  id: number\n  nom: string\n}\n\nexport type ID = string | number\n\n// app.ts\nimport type { Utilisateur, ID } from "./types"\nimport { creerUtilisateur } from "./factory"\n\nconst user: Utilisateur = creerUtilisateur("Alice")'
            }
          },
          {
            type: 'theory',
            title: 'Fichiers de déclaration .d.ts',
            content: 'Les <strong>fichiers .d.ts</strong> contiennent uniquement des déclarations de types, sans implémentation. Ils permettent à TypeScript de comprendre des bibliothèques JavaScript non typées. Les packages <code>@types/xxx</code> sur npm sont des fichiers .d.ts communautaires.',
            callout: {
              kind: 'info',
              icon: '📖',
              title: '@types/react, @types/node...',
              text: 'Quand tu installes une librairie JS non typée, cherche son package @types sur npm : npm install -D @types/lodash. TypeScript utilisera alors ces déclarations.'
            },
            code: {
              filename: 'declaration.d.ts',
              src: '// Déclaration d\'un module externe non typé\ndeclare module "ma-librairie" {\n  export function initialiser(options: { debug: boolean }): void\n  export const version: string\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre "import" et "import type" ?',
            options: [
              'Aucune différence en pratique',
              'import type importe uniquement des types, effacés à la compilation',
              'import type est disponible seulement en TypeScript 5+',
              'import type empêche les imports circulaires dans tous les cas'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! import type est effacé à la compilation — aucun impact sur le bundle JS.',
            errorMsg: 'import type garantit que seuls les types (effacés à la compilation) sont importés.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une interface "Config" avec host (string) et port (number), exporte-la avec "export interface". Puis dans le même fichier, crée et exporte une constante configDefaut qui respecte cette interface.',
            placeholder: '// types et valeurs dans le même fichier\n',
            filename: 'config.ts',
            xp: 30,
            validator: (code: string) => code.includes('export interface Config') && code.includes('export const') && code.includes('host') && code.includes('port'),
            hint: 'export interface Config { host: string; port: number } puis export const configDefaut: Config = {...}'
          }
        ]
      }
    ]
  }
]
