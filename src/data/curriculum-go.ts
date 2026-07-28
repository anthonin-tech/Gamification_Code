import type { CourseModule } from '@/types/cours'

export const CURRICULUM_GO: CourseModule[] = [
  {
    icon: '🐹',
    title: 'Introduction à Go',
    lessons: [
      {
        title: 'Philosophie et structure',
        subtitle: 'package main, import, fmt.Println',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Pourquoi Go ?',
            content: 'Go (ou Golang) est un langage créé par Google en 2009. Ses atouts : <strong>compilation ultra-rapide</strong>, <strong>performances proches du C</strong>, <strong>concurrence native</strong> via les goroutines et une syntaxe volontairement simple. Très utilisé pour les APIs REST, microservices et outils CLI.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Go est opinionné',
              text: 'Go impose un unique style via gofmt. Tout le monde écrit Go de la même façon — plus de débats sur le formatage.'
            },
            code: {
              filename: 'main.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Bonjour, monde !")\n    fmt.Printf("Version Go : %s\\n", "1.22")\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Par quelle déclaration commence obligatoirement tout fichier Go ?',
            options: ['import main', 'package main', 'func main()', 'module main'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! package indique le nom du paquet. main est réservé au point d\'entrée.',
            errorMsg: 'Tout fichier Go commence par une déclaration package.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un programme Go complet qui affiche "Go est génial !" avec fmt.Println.',
            placeholder: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // ton code ici\n}',
            filename: 'main.go',
            xp: 30,
            validator: (code: string) => code.includes('fmt.Println') && code.includes('package main'),
            hint: 'N\'oublie pas package main et import "fmt" avant func main().'
          }
        ]
      },
      {
        title: 'go run et go build',
        subtitle: 'Compiler et exécuter un programme Go',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'Deux façons d\'exécuter Go',
            content: '<code>go run main.go</code> compile et exécute directement (idéal pour le développement). <code>go build</code> produit un <strong>binaire natif</strong> optimisé (idéal pour la production). <code>go build -o monapp</code> nomme le binaire. Le binaire Go est autosuffisant — aucune dépendance runtime.',
            callout: {
              kind: 'info',
              icon: 'ℹ️',
              title: 'fmt.Printf vs fmt.Println',
              text: 'Println ajoute un retour à la ligne automatique. Printf utilise des verbes de format : %s (string), %d (int), %f (float), %v (valeur générique), %T (type).'
            },
            code: {
              filename: 'main.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    nom := "Go"\n    version := 1.22\n    fmt.Printf("Langage : %s, version : %.2f\\n", nom, version)\n    fmt.Println("Compilation rapide !")\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle commande produit un binaire natif optimisé pour la production ?',
            options: ['go run', 'go build', 'go compile', 'go exec'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! go build génère un binaire standalone sans dépendance runtime.',
            errorMsg: 'go build produit le binaire natif. go run compile et exécute en une étape mais ne garde pas le binaire.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète le verbe de format correct pour afficher un entier avec fmt.Printf.',
            xp: 20,
            parts: [
              { type: 'text', value: 'fmt.Printf("Score : ' },
              { type: 'blank', placeholder: 'verbe', correct: '%d' },
              { type: 'text', value: '\\n", 42)' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '📦',
    title: 'Variables et types',
    lessons: [
      {
        title: 'var, := et types de base',
        subtitle: 'int, float64, string, bool, byte, rune',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Deux façons de déclarer',
            content: 'Go offre <strong>var</strong> (déclaration explicite, possible hors fonction) et <strong>:=</strong> (déclaration courte avec inférence, uniquement dans une fonction). Les types principaux : <code>int</code>, <code>int64</code>, <code>float64</code>, <code>string</code>, <code>bool</code>, <code>byte</code> (alias uint8), <code>rune</code> (alias int32, pour les caractères Unicode).',
            code: {
              filename: 'variables.go',
              src: 'package main\n\nimport "fmt"\n\nvar globale string = "je suis globale"\n\nfunc main() {\n    var age int = 25\n    prenom := "Alice"       // inférence : string\n    prix := 19.99           // inférence : float64\n    actif := true\n    lettre := \'A\'           // rune (int32)\n\n    fmt.Println(age, prenom, prix, actif, lettre)\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle syntaxe fonctionne uniquement à l\'intérieur d\'une fonction ?',
            options: ['var x int = 5', 'x := 5', 'const x = 5', 'var x = 5'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! := ne peut pas être utilisé au niveau du package, seulement dans une fonction.',
            errorMsg: 'La déclaration courte := est réservée aux corps de fonctions.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare une variable "langage" avec := valant "Go", et une variable "annee" avec var valant 2009. Affiche les deux.',
            placeholder: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // déclare langage avec :=\n    // déclare annee avec var\n    fmt.Println(langage, annee)\n}',
            filename: 'main.go',
            xp: 35,
            validator: (code: string) => code.includes(':=') && code.includes('var') && code.includes('fmt.Println'),
            hint: 'Utilise langage := "Go" et var annee int = 2009.'
          }
        ]
      },
      {
        title: 'Constantes et zero values',
        subtitle: 'const, iota et valeurs par défaut',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'const et iota',
            content: '<code>const</code> déclare une valeur immuable connue à la compilation. <code>iota</code> est un compteur automatique dans un bloc <code>const</code> — parfait pour les énumérations. En Go, chaque type a une <strong>zero value</strong> : 0 pour les numériques, "" pour string, false pour bool, nil pour les pointeurs/slices/maps.',
            code: {
              filename: 'constantes.go',
              src: 'package main\n\nimport "fmt"\n\nconst Pi = 3.14159\n\nconst (\n    Lundi = iota + 1  // 1\n    Mardi             // 2\n    Mercredi          // 3\n    Jeudi             // 4\n    Vendredi          // 5\n)\n\nfunc main() {\n    var x int       // zero value : 0\n    var s string    // zero value : ""\n    var b bool      // zero value : false\n    fmt.Println(x, s, b, Lundi, Vendredi)\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la zero value d\'une variable string en Go ?',
            options: ['null', 'nil', '""', 'undefined'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Une string non initialisée vaut "" (chaîne vide).',
            errorMsg: 'Go initialise automatiquement les strings à "" (chaîne vide), pas null ou nil.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la déclaration de constante avec iota.',
            xp: 20,
            parts: [
              { type: 'text', value: 'const (\n    Premier = ' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'iota' },
              { type: 'text', value: '\n    Deuxieme\n    Troisieme\n)' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '⚡',
    title: 'Opérateurs et conversions',
    lessons: [
      {
        title: 'Opérateurs',
        subtitle: 'Arithmétiques, comparaison, logiques',
        type: 'theory',
        time: '8 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Les opérateurs Go',
            content: 'Go supporte les opérateurs classiques : <strong>arithmétiques</strong> (+, -, *, /, %), <strong>comparaison</strong> (==, !=, <, >, <=, >=) et <strong>logiques</strong> (&&, ||, !). L\'opérateur <code>%</code> donne le reste de la division. Go n\'a pas d\'opérateur ** pour la puissance — utiliser <code>math.Pow</code>.',
            code: {
              filename: 'operateurs.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    a, b := 17, 5\n    fmt.Println(a + b)   // 22\n    fmt.Println(a - b)   // 12\n    fmt.Println(a * b)   // 85\n    fmt.Println(a / b)   // 3  (division entière)\n    fmt.Println(a % b)   // 2  (reste)\n\n    fmt.Println(a > b)   // true\n    fmt.Println(a == b)  // false\n    fmt.Println(a != b && b > 0) // true\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que vaut 17 % 5 en Go ?',
            options: ['3', '2', '3.4', '0'],
            correct: 1,
            xp: 15,
            successMsg: 'Correct ! 17 = 3×5 + 2, donc le reste est 2.',
            errorMsg: '% donne le reste de la division entière : 17 / 5 = 3 reste 2.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète l\'opérateur logique pour vérifier que x est positif ET inférieur à 100.',
            xp: 20,
            parts: [
              { type: 'text', value: 'if x > 0 ' },
              { type: 'blank', placeholder: 'opérateur', correct: '&&' },
              { type: 'text', value: ' x < 100 {' }
            ]
          }
        ]
      },
      {
        title: 'Conversions explicites',
        subtitle: 'int(x), float64(x) — pas de cast implicite',
        type: 'theory',
        time: '8 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Go n\'a pas de conversion implicite',
            content: 'Contrairement à C ou JavaScript, Go <strong>n\'effectue jamais de conversion automatique</strong> entre types numériques. Mixer int et float64 dans une expression est une erreur de compilation. Il faut convertir explicitement : <code>float64(monInt)</code> ou <code>int(monFloat)</code>.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Perte de données',
              text: 'int(3.9) donne 3 — la partie décimale est tronquée, pas arrondie. Utilise math.Round si tu veux arrondir.'
            },
            code: {
              filename: 'conversion.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    var i int = 42\n    var f float64 = float64(i)   // int -> float64\n    var u uint = uint(f)         // float64 -> uint\n\n    fmt.Println(i, f, u)  // 42 42 42\n\n    // Conversion string <-> int via strconv\n    // strconv.Itoa(42)  -> "42"\n    // strconv.Atoi("42") -> 42, nil\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que se passe-t-il si on écrit : var x int = 5; var y float64 = x + 1.0 ?',
            options: [
              'y vaut 6.0',
              'Erreur de compilation : types incompatibles',
              'y vaut 6',
              'Go convertit automatiquement'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! Go refuse de mélanger int et float64 sans conversion explicite.',
            errorMsg: 'Go interdit les conversions implicites. Il faut écrire float64(x) + 1.0.'
          },
          {
            type: 'code-challenge',
            instructions: 'Convertis la variable entière "points" (valant 7) en float64 et divise-la par 3.0. Affiche le résultat.',
            placeholder: 'package main\n\nimport "fmt"\n\nfunc main() {\n    points := 7\n    // convertis et divise\n}',
            filename: 'main.go',
            xp: 30,
            validator: (code: string) => code.includes('float64') && code.includes('fmt.Println'),
            hint: 'Utilise float64(points) / 3.0 pour obtenir un résultat décimal.'
          }
        ]
      }
    ]
  },
  {
    icon: '🔀',
    title: 'Conditions et boucles',
    lessons: [
      {
        title: 'if/else et switch',
        subtitle: 'Conditions avec initialisation, switch sans fallthrough',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'if avec initialisation',
            content: 'Le <code>if</code> en Go peut inclure une <strong>instruction d\'initialisation</strong> avant la condition, séparée par un point-virgule. La variable déclarée est scoped au bloc if/else. Le <code>switch</code> Go est plus puissant qu\'en C : pas de <code>break</code> implicite nécessaire, et les cases peuvent contenir des expressions.',
            code: {
              filename: 'conditions.go',
              src: 'package main\n\nimport (\n    "fmt"\n    "strconv"\n)\n\nfunc main() {\n    // if avec initialisation\n    if n, err := strconv.Atoi("42"); err == nil {\n        fmt.Println("Nombre :", n)\n    }\n\n    // switch sans fallthrough par défaut\n    jour := "lundi"\n    switch jour {\n    case "lundi", "mardi":\n        fmt.Println("Début de semaine")\n    case "vendredi":\n        fmt.Println("Fin de semaine !")\n    default:\n        fmt.Println("Milieu de semaine")\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'En Go, faut-il ajouter break à la fin de chaque case dans un switch ?',
            options: [
              'Oui, comme en C',
              'Non, Go break automatiquement sauf avec fallthrough',
              'Oui, sinon tous les cases s\'exécutent',
              'Non, fallthrough est toujours actif'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! En Go, chaque case break automatiquement. fallthrough est explicite et rare.',
            errorMsg: 'Go n\'a pas de fallthrough implicite. Chaque case s\'arrête seul — pas besoin de break.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un switch sur une variable "note" (int). Si note >= 90 : "A", >= 80 : "B", >= 70 : "C", sinon "F". Affiche le résultat.',
            placeholder: 'package main\n\nimport "fmt"\n\nfunc main() {\n    note := 85\n    // écris ton switch ici\n}',
            filename: 'main.go',
            xp: 40,
            validator: (code: string) => code.includes('switch') && code.includes('fmt.Println'),
            hint: 'Un switch sans expression vaut switch true {} — chaque case peut être une condition.'
          }
        ]
      },
      {
        title: 'La boucle for',
        subtitle: 'La seule boucle Go : for classique, range, while-like',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'for : la seule boucle en Go',
            content: 'Go n\'a <strong>qu\'un seul mot-clé de boucle</strong> : <code>for</code>. Il couvre trois patterns : la boucle classique (init ; condition ; post), le style "while" (condition seule) et la boucle infinie (pas de condition). <code>for range</code> itère sur slices, maps, strings et channels.',
            code: {
              filename: 'boucles.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Boucle classique\n    for i := 0; i < 5; i++ {\n        fmt.Print(i, " ")\n    }\n    fmt.Println()\n\n    // Style while\n    n := 1\n    for n < 100 {\n        n *= 2\n    }\n    fmt.Println(n) // 128\n\n    // for range sur slice\n    fruits := []string{"pomme", "banane", "cerise"}\n    for i, fruit := range fruits {\n        fmt.Printf("%d: %s\\n", i, fruit)\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Comment écrit-on une boucle infinie en Go ?',
            options: ['while(true) {}', 'loop {}', 'for {}', 'for true {}'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! for sans condition est la boucle infinie idiomatique en Go.',
            errorMsg: 'En Go, for sans condition est une boucle infinie. Utilisez break pour en sortir.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la boucle for range qui itère sur une slice de nombres.',
            xp: 20,
            parts: [
              { type: 'text', value: 'for i, v := ' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'range' },
              { type: 'text', value: ' nombres {\n    fmt.Println(i, v)\n}' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🔤',
    title: 'Chaînes et bytes',
    lessons: [
      {
        title: 'string, rune et byte',
        subtitle: 'Immutabilité, Unicode et le package strings',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Les strings en Go',
            content: 'En Go, une <code>string</code> est une <strong>séquence immuable d\'octets</strong> encodée en UTF-8. Un <code>byte</code> (uint8) représente un octet. Un <code>rune</code> (int32) représente un caractère Unicode complet. <code>len(s)</code> retourne le nombre d\'octets, pas de caractères — attention avec les accents et emojis !',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'len() et Unicode',
              text: 'len("café") retourne 5 octets, pas 4 caractères ! Pour compter les caractères Unicode, utilise len([]rune("café")).'
            },
            code: {
              filename: 'strings.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    s := "café"\n    fmt.Println(len(s))          // 5 (octets)\n    fmt.Println(len([]rune(s)))  // 4 (caractères)\n\n    // Itérer sur les runes\n    for i, r := range s {\n        fmt.Printf("%d : %c\\n", i, r)\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne len("héllo") en Go ?',
            options: ['5', '6', '4', '7'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! "é" occupe 2 octets en UTF-8, donc len retourne 6.',
            errorMsg: 'len() compte les octets UTF-8, pas les caractères. "é" occupe 2 octets.'
          },
          {
            type: 'code-challenge',
            instructions: 'Utilise strings.ToUpper() pour afficher "bonjour go" en majuscules. N\'oublie pas d\'importer "strings".',
            placeholder: 'package main\n\nimport (\n    "fmt"\n    "strings"\n)\n\nfunc main() {\n    msg := "bonjour go"\n    // affiche en majuscules\n}',
            filename: 'main.go',
            xp: 30,
            validator: (code: string) => code.includes('strings.ToUpper') && code.includes('fmt.Println'),
            hint: 'strings.ToUpper(msg) retourne la version en majuscules.'
          }
        ]
      },
      {
        title: 'fmt.Sprintf et strconv',
        subtitle: 'Formater et convertir des chaînes',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Construire des strings',
            content: '<code>fmt.Sprintf</code> retourne une string formatée (comme Printf mais sans afficher). Le package <code>strings</code> offre : <code>Contains</code>, <code>Split</code>, <code>Join</code>, <code>Replace</code>, <code>TrimSpace</code>, <code>HasPrefix</code>, <code>HasSuffix</code>. Le package <code>strconv</code> convertit entre strings et types numériques : <code>Itoa</code> (int→string), <code>Atoi</code> (string→int), <code>FormatFloat</code>.',
            code: {
              filename: 'sprintf.go',
              src: 'package main\n\nimport (\n    "fmt"\n    "strings"\n    "strconv"\n)\n\nfunc main() {\n    // fmt.Sprintf\n    label := fmt.Sprintf("Score: %d pts", 1500)\n    fmt.Println(label)\n\n    // strings\n    phrase := "  Bonjour, Go !  "\n    fmt.Println(strings.TrimSpace(phrase))\n    mots := strings.Split("a,b,c", ",")\n    fmt.Println(strings.Join(mots, " - "))\n\n    // strconv\n    n, _ := strconv.Atoi("42")\n    fmt.Println(n + 8) // 50\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle fonction convertit un int en string en Go ?',
            options: ['string(42)', 'strconv.Itoa(42)', 'fmt.String(42)', 'int.ToString(42)'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! strconv.Itoa convertit un int en sa représentation décimale string.',
            errorMsg: 'string(42) convertit un int en rune (caractère), pas en sa représentation décimale. Utilise strconv.Itoa.'
          },
          {
            type: 'fill-blank',
            instructions: 'Utilise fmt.Sprintf pour créer le message "Niveau 5".',
            xp: 20,
            parts: [
              { type: 'text', value: 'msg := fmt.Sprintf("Niveau ' },
              { type: 'blank', placeholder: 'verbe', correct: '%d' },
              { type: 'text', value: '", 5)' }
            ]
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
        title: 'Retours multiples et defer',
        subtitle: 'Valeurs de retour, nommées et defer',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Retours multiples',
            content: 'Go permet de <strong>retourner plusieurs valeurs</strong> depuis une fonction. Le pattern idiomatique est (valeur, error). Les <strong>retours nommés</strong> permettent de nommer les valeurs de retour et d\'utiliser un <code>return</code> nu. <code>defer</code> exécute une fonction quand le scope courant se termine — idéal pour les ressources à libérer.',
            code: {
              filename: 'fonctions.go',
              src: 'package main\n\nimport (\n    "fmt"\n    "errors"\n)\n\nfunc diviser(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New("division par zéro")\n    }\n    return a / b, nil\n}\n\nfunc ouvrirFichier(nom string) {\n    fmt.Println("ouverture:", nom)\n    defer fmt.Println("fermeture:", nom) // exécuté à la fin\n    fmt.Println("traitement:", nom)\n}\n\nfunc main() {\n    res, err := diviser(10, 3)\n    if err != nil {\n        fmt.Println("Erreur:", err)\n    } else {\n        fmt.Printf("%.4f\\n", res)\n    }\n    ouvrirFichier("data.txt")\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quand est exécutée une fonction différée avec defer ?',
            options: [
              'Immédiatement',
              'Au prochain appel de fonction',
              'Quand la fonction englobante retourne',
              'Dans une goroutine séparée'
            ],
            correct: 2,
            xp: 20,
            successMsg: 'Exact ! defer s\'exécute juste avant que la fonction englobante retourne.',
            errorMsg: 'defer reporte l\'exécution à la fin de la fonction englobante (LIFO si plusieurs defers).'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction max(a, b int) int qui retourne le plus grand des deux. Appelle-la depuis main et affiche le résultat.',
            placeholder: 'package main\n\nimport "fmt"\n\nfunc max(a, b int) int {\n    // ton code\n}\n\nfunc main() {\n    fmt.Println(max(7, 12))\n}',
            filename: 'main.go',
            xp: 40,
            validator: (code: string) => code.includes('func max') && code.includes('return') && code.includes('fmt.Println'),
            hint: 'Utilise if a > b { return a } return b.'
          }
        ]
      },
      {
        title: 'Closures et fonctions variadic',
        subtitle: 'Fonctions first-class, closures, ...args',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Fonctions comme valeurs',
            content: 'En Go, les fonctions sont des <strong>valeurs de première classe</strong> : on peut les stocker dans des variables, les passer en argument, les retourner. Une <strong>closure</strong> capture les variables de son scope. Les fonctions <strong>variadic</strong> acceptent un nombre variable d\'arguments avec <code>...Type</code>.',
            code: {
              filename: 'closures.go',
              src: 'package main\n\nimport "fmt"\n\n// Fonction variadic\nfunc somme(nums ...int) int {\n    total := 0\n    for _, n := range nums {\n        total += n\n    }\n    return total\n}\n\n// Closure : compteur\nfunc compteur() func() int {\n    n := 0\n    return func() int {\n        n++\n        return n\n    }\n}\n\nfunc main() {\n    fmt.Println(somme(1, 2, 3, 4, 5)) // 15\n\n    c := compteur()\n    fmt.Println(c(), c(), c()) // 1 2 3\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Qu\'est-ce qu\'une closure en Go ?',
            options: [
              'Une fonction sans paramètres',
              'Une fonction qui capture les variables de son scope',
              'Un alias de fonction',
              'Une fonction déclarée dans un struct'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! Une closure "ferme" sur les variables de son environnement lexical.',
            errorMsg: 'Une closure est une fonction qui garde accès aux variables du scope où elle a été créée.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la signature d\'une fonction variadic qui accepte des strings.',
            xp: 20,
            parts: [
              { type: 'text', value: 'func afficher(mots ...' },
              { type: 'blank', placeholder: 'type', correct: 'string' },
              { type: 'text', value: ') {\n    fmt.Println(mots)\n}' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '📋',
    title: 'Slices et arrays',
    lessons: [
      {
        title: 'Arrays et slices',
        subtitle: 'make(), append(), cap vs len',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Array fixe vs slice dynamique',
            content: 'Un <strong>array</strong> en Go a une taille fixe connue à la compilation : <code>[3]int</code>. Une <strong>slice</strong> est une vue dynamique sur un tableau sous-jacent : taille variable, allocation avec <code>make([]int, longueur, capacité)</code>. <code>append</code> ajoute des éléments et réalloue si nécessaire. <code>len</code> donne la longueur, <code>cap</code> la capacité.',
            code: {
              filename: 'slices.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Array fixe\n    arr := [3]int{10, 20, 30}\n    fmt.Println(arr[1]) // 20\n\n    // Slice dynamique\n    s := make([]int, 0, 5) // len=0, cap=5\n    s = append(s, 1, 2, 3)\n    fmt.Println(len(s), cap(s)) // 3 5\n\n    // Slice literal\n    fruits := []string{"pomme", "banane"}\n    fruits = append(fruits, "cerise")\n    fmt.Println(fruits)\n\n    // Sous-slice\n    fmt.Println(fruits[1:3]) // [banane cerise]\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait append() quand la capacité d\'une slice est dépassée ?',
            options: [
              'Retourne une erreur',
              'Tronque la slice',
              'Alloue un nouveau tableau sous-jacent plus grand',
              'Augmente la capacité de 1'
            ],
            correct: 2,
            xp: 20,
            successMsg: 'Exact ! Go double généralement la capacité lors d\'une réallocation.',
            errorMsg: 'append alloue automatiquement un nouveau tableau (souvent 2x) et copie les données.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une slice vide d\'entiers avec make, ajoute 5 valeurs avec append dans une boucle for, puis affiche la slice finale.',
            placeholder: 'package main\n\nimport "fmt"\n\nfunc main() {\n    s := make([]int, 0)\n    // ajoute 1, 2, 3, 4, 5 avec une boucle\n    fmt.Println(s)\n}',
            filename: 'main.go',
            xp: 40,
            validator: (code: string) => code.includes('make') && code.includes('append') && code.includes('for'),
            hint: 'for i := 1; i <= 5; i++ { s = append(s, i) }'
          }
        ]
      },
      {
        title: 'copy et slices 2D',
        subtitle: 'Copie de slices, range et matrices',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'copy() et slices multidimensionnelles',
            content: '<code>copy(dst, src)</code> copie les éléments d\'une slice dans une autre (le minimum de len(dst) et len(src) éléments). Les slices sont des <strong>références</strong> — modifier une sous-slice modifie l\'original. Pour une copie indépendante, utiliser copy. Les slices 2D sont des slices de slices.',
            code: {
              filename: 'copy2d.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // copy\n    src := []int{1, 2, 3, 4, 5}\n    dst := make([]int, 3)\n    n := copy(dst, src)\n    fmt.Println(dst, n) // [1 2 3] 3\n\n    // Slice 2D (matrice 3x3)\n    mat := [][]int{\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9},\n    }\n    fmt.Println(mat[1][2]) // 6\n\n    for _, ligne := range mat {\n        fmt.Println(ligne)\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Si s1 := []int{1,2,3} et s2 := s1, que se passe-t-il quand on modifie s2[0] ?',
            options: [
              's1[0] reste inchangé',
              's1[0] est aussi modifié',
              'Une erreur de compilation',
              'Une panique à l\'exécution'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! s2 partage le même tableau sous-jacent que s1. Pour isoler, utilise copy.',
            errorMsg: 'Les slices sont des références. s2 := s1 crée une vue sur le même tableau sous-jacent.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète pour copier src dans dst.',
            xp: 15,
            parts: [
              { type: 'text', value: 'dst := make([]int, len(src))\n' },
              { type: 'blank', placeholder: 'fonction', correct: 'copy' },
              { type: 'text', value: '(dst, src)' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🗺️',
    title: 'Maps',
    lessons: [
      {
        title: 'Création et accès',
        subtitle: 'make, literal, vérification d\'existence',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Les maps en Go',
            content: 'Une <code>map</code> est une table de hachage clé/valeur. On la crée avec <code>make(map[K]V)</code> ou un littéral. L\'accès retourne une <strong>zero value</strong> si la clé n\'existe pas — utiliser le pattern <code>val, ok := m[key]</code> pour vérifier l\'existence. Les maps ne sont pas ordonnées.',
            code: {
              filename: 'maps.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Création avec make\n    scores := make(map[string]int)\n    scores["Alice"] = 95\n    scores["Bob"] = 87\n\n    // Littéral\n    capitales := map[string]string{\n        "France": "Paris",\n        "Japon":  "Tokyo",\n    }\n\n    // Vérification d\'existence\n    if ville, ok := capitales["France"]; ok {\n        fmt.Println("Capitale:", ville)\n    }\n\n    fmt.Println(scores["Alice"])  // 95\n    fmt.Println(scores["Inconnu"]) // 0 (zero value)\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne m["clé"] si la clé n\'existe pas dans la map ?',
            options: [
              'nil',
              'Une erreur',
              'La zero value du type valeur',
              'Une panique'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Pour une map[string]int, une clé absente retourne 0. D\'où l\'importance du pattern val, ok.',
            errorMsg: 'Go retourne silencieusement la zero value. Utilise val, ok := m[key] pour différencier 0 de "absent".'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une map qui compte les occurrences de chaque mot dans une slice. Parcours la slice ["go", "est", "go", "cool"] et comptes les occurrences.',
            placeholder: 'package main\n\nimport "fmt"\n\nfunc main() {\n    mots := []string{"go", "est", "go", "cool"}\n    compteur := make(map[string]int)\n    // compte les occurrences\n    fmt.Println(compteur)\n}',
            filename: 'main.go',
            xp: 40,
            validator: (code: string) => code.includes('make(map') && code.includes('range') && code.includes('fmt.Println'),
            hint: 'compteur[mot]++ fonctionne même si le mot n\'est pas encore dans la map (zero value = 0).'
          }
        ]
      },
      {
        title: 'delete et itération',
        subtitle: 'Supprimer des clés, itérer avec range',
        type: 'theory',
        time: '8 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Manipuler les maps',
            content: '<code>delete(m, key)</code> supprime une clé (pas d\'erreur si elle n\'existe pas). Itérer sur une map avec <code>for k, v := range m</code> — mais l\'ordre est <strong>aléatoire</strong> à chaque exécution, intentionnellement. Les maps ne sont pas thread-safe par défaut — utiliser <code>sync.Map</code> ou un Mutex pour la concurrence.',
            code: {
              filename: 'delete_map.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    ages := map[string]int{\n        "Alice": 30,\n        "Bob":   25,\n        "Carol": 35,\n    }\n\n    delete(ages, "Bob")\n\n    for nom, age := range ages {\n        fmt.Printf("%s : %d ans\\n", nom, age)\n    }\n    // Ordre non garanti !\n}'
            }
          },
          {
            type: 'quiz',
            question: 'L\'itération sur une map avec for range retourne les clés dans quel ordre ?',
            options: [
              'Ordre d\'insertion',
              'Ordre alphabétique',
              'Ordre aléatoire (non déterministe)',
              'Ordre de la valeur'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Go randomise intentionnellement l\'ordre pour éviter les dépendances accidentelles.',
            errorMsg: 'L\'ordre d\'itération des maps est délibérément aléatoire en Go. Trier les clés si l\'ordre est important.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète pour supprimer la clé "ancien" de la map.',
            xp: 15,
            parts: [
              { type: 'blank', placeholder: 'fonction', correct: 'delete' },
              { type: 'text', value: '(m, "ancien")' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🏗️',
    title: 'Structs et méthodes',
    lessons: [
      {
        title: 'Structs et méthodes',
        subtitle: 'Receiver valeur vs pointeur, embedding',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Struct et méthodes avec receiver',
            content: 'Une <code>struct</code> regroupe des champs typés. Les <strong>méthodes</strong> sont des fonctions avec un <strong>receiver</strong>. Receiver <strong>valeur</strong> (<code>func (p Personne)</code>) : travaille sur une copie. Receiver <strong>pointeur</strong> (<code>func (p *Personne)</code>) : modifie l\'original. Utiliser le receiver pointeur si la méthode doit modifier l\'état ou si la struct est grande.',
            code: {
              filename: 'structs.go',
              src: 'package main\n\nimport "fmt"\n\ntype Personne struct {\n    Nom  string\n    Age  int\n}\n\n// Receiver valeur : copie\nfunc (p Personne) Saluer() string {\n    return "Bonjour, je suis " + p.Nom\n}\n\n// Receiver pointeur : modifie l\'original\nfunc (p *Personne) Vieillir() {\n    p.Age++\n}\n\nfunc main() {\n    alice := Personne{Nom: "Alice", Age: 30}\n    fmt.Println(alice.Saluer())\n    alice.Vieillir()\n    fmt.Println(alice.Age) // 31\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quel type de receiver faut-il utiliser pour modifier les champs d\'une struct ?',
            options: [
              'Receiver valeur (p Personne)',
              'Receiver pointeur (p *Personne)',
              'Les deux fonctionnent',
              'Aucun receiver nécessaire'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! Le receiver pointeur est nécessaire pour modifier l\'état de la struct.',
            errorMsg: 'Avec un receiver valeur, on travaille sur une copie. Les modifications ne se propagent pas.'
          },
          {
            type: 'code-challenge',
            instructions: 'Définis une struct Rectangle avec Largeur et Hauteur (float64). Ajoute une méthode Aire() float64 qui retourne la surface. Instancie-la et affiche l\'aire.',
            placeholder: 'package main\n\nimport "fmt"\n\ntype Rectangle struct {\n    // tes champs\n}\n\nfunc (r Rectangle) Aire() float64 {\n    // ton code\n}\n\nfunc main() {\n    rect := Rectangle{Largeur: 5, Hauteur: 3}\n    fmt.Println(rect.Aire())\n}',
            filename: 'main.go',
            xp: 45,
            validator: (code: string) => code.includes('type Rectangle struct') && code.includes('func (r') && code.includes('return') && code.includes('fmt.Println'),
            hint: 'Largeur * Hauteur dans la méthode Aire().'
          }
        ]
      },
      {
        title: 'Embedding et structs anonymes',
        subtitle: 'Composition par embedding',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Embedding : composition sans héritage',
            content: 'Go n\'a pas d\'héritage. À la place, il propose l\'<strong>embedding</strong> : inclure un type dans un autre sans nom de champ. Les méthodes et champs du type embarqué sont <strong>promus</strong> au type englobant. Les <strong>structs anonymes</strong> sont pratiques pour les données temporaires ou les configs.',
            code: {
              filename: 'embedding.go',
              src: 'package main\n\nimport "fmt"\n\ntype Animal struct {\n    Nom string\n}\n\nfunc (a Animal) Parler() {\n    fmt.Println(a.Nom, "fait un son")\n}\n\ntype Chien struct {\n    Animal          // embedding\n    Race string\n}\n\nfunc main() {\n    rex := Chien{\n        Animal: Animal{Nom: "Rex"},\n        Race:   "Berger",\n    }\n    rex.Parler()            // méthode promue\n    fmt.Println(rex.Nom)    // champ promu\n\n    // Struct anonyme\n    config := struct {\n        Debug bool\n        Port  int\n    }{Debug: true, Port: 8080}\n    fmt.Println(config)\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que signifie "embedding" en Go ?',
            options: [
              'L\'héritage classique orienté objet',
              'Inclure un type dans un autre pour promouvoir ses méthodes et champs',
              'Déclarer des méthodes privées',
              'Copier les champs d\'une struct'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! L\'embedding promeut les méthodes et champs du type embarqué. C\'est la composition Go.',
            errorMsg: 'L\'embedding n\'est pas de l\'héritage — Go n\'en a pas. C\'est un mécanisme de composition.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète le type Employe qui embed la struct Personne.',
            xp: 20,
            parts: [
              { type: 'text', value: 'type Employe struct {\n    ' },
              { type: 'blank', placeholder: 'type embarqué', correct: 'Personne' },
              { type: 'text', value: '\n    Poste string\n}' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🎭',
    title: 'Interfaces',
    lessons: [
      {
        title: 'Duck typing et interfaces',
        subtitle: 'Interfaces implicites, type assertion, Stringer',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Les interfaces en Go',
            content: 'Une <code>interface</code> Go définit un ensemble de méthodes. Tout type qui implémente ces méthodes <strong>satisfait l\'interface implicitement</strong> — pas de <code>implements</code> requis (duck typing). <code>any</code> (ou <code>interface{}</code>) accepte n\'importe quelle valeur. La <code>fmt.Stringer</code> interface (<code>String() string</code>) permet de personnaliser l\'affichage.',
            code: {
              filename: 'interfaces.go',
              src: 'package main\n\nimport "fmt"\n\ntype Forme interface {\n    Aire() float64\n    Perimetre() float64\n}\n\ntype Cercle struct{ Rayon float64 }\nfunc (c Cercle) Aire() float64      { return 3.14 * c.Rayon * c.Rayon }\nfunc (c Cercle) Perimetre() float64 { return 2 * 3.14 * c.Rayon }\n\n// Stringer interface\nfunc (c Cercle) String() string {\n    return fmt.Sprintf("Cercle(r=%.2f)", c.Rayon)\n}\n\nfunc afficherForme(f Forme) {\n    fmt.Printf("Aire: %.2f\\n", f.Aire())\n}\n\nfunc main() {\n    c := Cercle{Rayon: 5}\n    afficherForme(c)\n    fmt.Println(c) // utilise String()\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Comment un type satisfait-il une interface en Go ?',
            options: [
              'Avec le mot-clé implements',
              'En héritant de l\'interface',
              'Implicitement, en implémentant toutes les méthodes',
              'En déclarant var _ Interface = Type{}'
            ],
            correct: 2,
            xp: 20,
            successMsg: 'Exact ! Go utilise le duck typing : si un type a toutes les méthodes, il satisfait l\'interface.',
            errorMsg: 'Go n\'a pas de mot-clé implements. L\'implémentation est implicite — duck typing.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une interface Saluteur avec une méthode Saluer() string. Crée un type Robot qui l\'implémente et retourne "Bip boop". Affiche le résultat.',
            placeholder: 'package main\n\nimport "fmt"\n\ntype Saluteur interface {\n    // ta méthode\n}\n\ntype Robot struct{ Nom string }\n\n// implémente Saluer()\n\nfunc main() {\n    var s Saluteur = Robot{Nom: "R2D2"}\n    fmt.Println(s.Saluer())\n}',
            filename: 'main.go',
            xp: 45,
            validator: (code: string) => code.includes('interface') && code.includes('func (') && code.includes('return') && code.includes('fmt.Println'),
            hint: 'func (r Robot) Saluer() string { return "Bip boop" }'
          }
        ]
      },
      {
        title: 'Type assertion et type switch',
        subtitle: 'Inspecter le type concret d\'une interface',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Type assertion et type switch',
            content: 'La <strong>type assertion</strong> extrait la valeur concrète d\'une interface : <code>v, ok := i.(string)</code>. Dangereuse sans ok : panique si le type est faux. Le <strong>type switch</strong> branche selon le type dynamique d\'une valeur <code>any</code>.',
            code: {
              filename: 'typeswitch.go',
              src: 'package main\n\nimport "fmt"\n\nfunc decrire(v any) {\n    switch t := v.(type) {\n    case int:\n        fmt.Printf("entier : %d\\n", t)\n    case string:\n        fmt.Printf("string : %q\\n", t)\n    case bool:\n        fmt.Printf("bool : %v\\n", t)\n    default:\n        fmt.Printf("type inconnu : %T\\n", t)\n    }\n}\n\nfunc main() {\n    decrire(42)\n    decrire("bonjour")\n    decrire(true)\n    decrire(3.14)\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que se passe-t-il si on fait i.(string) sur une valeur any qui contient un int (sans le ok) ?',
            options: [
              'Retourne "" (zero value)',
              'Retourne nil',
              'Panique à l\'exécution',
              'Erreur de compilation'
            ],
            correct: 2,
            xp: 20,
            successMsg: 'Exact ! Une type assertion sans ok panique si le type est incorrect.',
            errorMsg: 'Sans le pattern val, ok := i.(Type), une assertion incorrecte cause une panique runtime.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la type assertion sécurisée pour extraire une string d\'une interface any.',
            xp: 20,
            parts: [
              { type: 'text', value: 'val, ' },
              { type: 'blank', placeholder: 'variable', correct: 'ok' },
              { type: 'text', value: ' := i.(string)' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🚨',
    title: 'Gestion des erreurs',
    lessons: [
      {
        title: 'error, Errorf et wrapping',
        subtitle: 'error interface, fmt.Errorf, errors.Is/As',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Le pattern error en Go',
            content: '<code>error</code> est une interface simple avec une méthode <code>Error() string</code>. Créer avec <code>errors.New("msg")</code> ou <code>fmt.Errorf("contexte : %w", err)</code> (wrapping). <code>errors.Is(err, target)</code> vérifie si err contient target dans sa chaîne. <code>errors.As(err, &target)</code> extrait un type d\'erreur spécifique.',
            code: {
              filename: 'erreurs.go',
              src: 'package main\n\nimport (\n    "errors"\n    "fmt"\n)\n\nvar ErrNonTrouve = errors.New("non trouvé")\n\nfunc chercher(id int) (string, error) {\n    if id != 42 {\n        return "", fmt.Errorf("chercher(%d): %w", id, ErrNonTrouve)\n    }\n    return "La Réponse", nil\n}\n\nfunc main() {\n    res, err := chercher(1)\n    if err != nil {\n        fmt.Println("Erreur:", err)\n        if errors.Is(err, ErrNonTrouve) {\n            fmt.Println("=> élément non trouvé dans la base")\n        }\n        return\n    }\n    fmt.Println(res)\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quel verbe de fmt.Errorf permet d\'envelopper une erreur existante ?',
            options: ['%v', '%s', '%e', '%w'],
            correct: 3,
            xp: 20,
            successMsg: 'Exact ! %w wrap l\'erreur, ce qui permet à errors.Is et errors.As de la retrouver dans la chaîne.',
            errorMsg: 'Le verbe %w est spécial : il embed l\'erreur pour la chaîne d\'unwrapping.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une fonction diviser(a, b int) (int, error) qui retourne une erreur si b == 0, sinon retourne a/b. Teste les deux cas dans main.',
            placeholder: 'package main\n\nimport (\n    "errors"\n    "fmt"\n)\n\nfunc diviser(a, b int) (int, error) {\n    // ton code\n}\n\nfunc main() {\n    fmt.Println(diviser(10, 2))\n    fmt.Println(diviser(10, 0))\n}',
            filename: 'main.go',
            xp: 45,
            validator: (code: string) => code.includes('errors.New') && code.includes('return') && code.includes('nil'),
            hint: 'if b == 0 { return 0, errors.New("division par zéro") }\nreturn a / b, nil'
          }
        ]
      },
      {
        title: 'panic et recover',
        subtitle: 'Gestion des situations exceptionnelles',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'panic, recover et defer',
            content: '<code>panic</code> arrête l\'exécution normale et remonte la pile — réservé aux erreurs irrecupérables (bug de programmation). <code>recover</code> intercepte une panique dans un <code>defer</code>. Ce n\'est <strong>pas</strong> un mécanisme de gestion d\'erreurs standard — pour les erreurs prévisibles, utiliser error.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'N\'abuse pas de panic',
              text: 'panic est réservé aux bugs irrecupérables : index out of range, nil pointer, invariant cassé. Pour tout le reste, retourne une erreur.'
            },
            code: {
              filename: 'panic.go',
              src: 'package main\n\nimport "fmt"\n\nfunc sécurisé() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println("Récupéré:", r)\n        }\n    }()\n    panic("quelque chose s\'est mal passé !")\n}\n\nfunc main() {\n    sécurisé()\n    fmt.Println("Le programme continue")\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Dans quel cas utiliser panic en Go ?',
            options: [
              'Pour toutes les erreurs réseau',
              'Quand une fonction retourne une erreur',
              'Pour les bugs irrecuperables qui ne devraient jamais arriver',
              'Comme remplacement des exceptions'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! panic pour les invariants cassés et bugs de programmation, error pour les cas prévisibles.',
            errorMsg: 'panic n\'est pas un mécanisme d\'erreur classique. Utiliser error pour les cas normaux.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète le recover dans le defer pour intercepter une panique.',
            xp: 20,
            parts: [
              { type: 'text', value: 'defer func() {\n    if r := ' },
              { type: 'blank', placeholder: 'fonction', correct: 'recover' },
              { type: 'text', value: '(); r != nil {\n        fmt.Println("panique:", r)\n    }\n}()' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '⚡',
    title: 'Goroutines et channels',
    lessons: [
      {
        title: 'Goroutines et channels',
        subtitle: 'go keyword, chan, buffered channels',
        type: 'theory',
        time: '16 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'La concurrence Go',
            content: 'Une <strong>goroutine</strong> est une fonction exécutée de façon concurrente avec le mot-clé <code>go</code>. Légères (~2 KB), on peut en lancer des milliers. Les <strong>channels</strong> sont des tuyaux typés pour la communication entre goroutines : <code>make(chan int)</code>. Un channel non-bufferisé bloque l\'envoi jusqu\'à ce qu\'un destinataire lise. Un channel bufferisé autorise un certain nombre de valeurs en attente.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Share memory by communicating',
              text: 'La philosophie Go : "Ne communique pas en partageant de la mémoire ; partage de la mémoire en communiquant."'
            },
            code: {
              filename: 'goroutines.go',
              src: 'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc compter(nom string, ch chan<- string) {\n    for i := 1; i <= 3; i++ {\n        time.Sleep(100 * time.Millisecond)\n        ch <- fmt.Sprintf("%s: %d", nom, i)\n    }\n    close(ch)\n}\n\nfunc main() {\n    ch := make(chan string, 6) // bufferisé\n    go compter("A", ch)\n\n    for msg := range ch {\n        fmt.Println(msg)\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que se passe-t-il quand on envoie dans un channel non-bufferisé sans lecteur ?',
            options: [
              'La valeur est ignorée',
              'Une erreur est retournée',
              'La goroutine se bloque jusqu\'à ce qu\'un lecteur lise',
              'La valeur est mise en file d\'attente'
            ],
            correct: 2,
            xp: 25,
            successMsg: 'Exact ! Les channels non-bufferisés sont synchrones — l\'envoi bloque jusqu\'à la réception.',
            errorMsg: 'Un channel non-bufferisé est un rendez-vous : envoi et réception doivent être prêts simultanément.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une goroutine qui envoie les nombres 1 à 5 dans un channel d\'entiers. Dans main, lis et affiche chaque valeur reçue.',
            placeholder: 'package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int)\n    go func() {\n        // envoie 1 à 5 puis ferme le channel\n    }()\n    // lis et affiche les valeurs\n}',
            filename: 'main.go',
            xp: 50,
            validator: (code: string) => code.includes('go func') && code.includes('chan') && code.includes('close') && code.includes('range'),
            hint: 'Envoie avec ch <- i dans la goroutine, puis close(ch). Lis avec for v := range ch.'
          }
        ]
      },
      {
        title: 'select, WaitGroup et Mutex',
        subtitle: 'Orchestration avancée de la concurrence',
        type: 'theory',
        time: '14 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'select, sync.WaitGroup et sync.Mutex',
            content: '<code>select</code> attend sur plusieurs channels simultanément — comme un switch pour les channels. <code>sync.WaitGroup</code> attend la fin d\'un groupe de goroutines (Add, Done, Wait). <code>sync.Mutex</code> protège une section critique contre les accès concurrents (Lock/Unlock).',
            code: {
              filename: 'sync.go',
              src: 'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    var mu sync.Mutex\n    compteur := 0\n\n    for i := 0; i < 5; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            mu.Lock()\n            compteur++\n            mu.Unlock()\n        }()\n    }\n\n    wg.Wait()\n    fmt.Println("Compteur final:", compteur) // 5\n}'
            }
          },
          {
            type: 'quiz',
            question: 'À quoi sert sync.WaitGroup en Go ?',
            options: [
              'Limiter le nombre de goroutines',
              'Attendre la fin de plusieurs goroutines',
              'Protéger une variable partagée',
              'Créer un channel bufferisé'
            ],
            correct: 1,
            xp: 25,
            successMsg: 'Exact ! WaitGroup.Wait() bloque jusqu\'à ce que le compteur atteigne 0 (après tous les Done()).',
            errorMsg: 'WaitGroup sert à attendre un groupe de goroutines. Pour protéger une variable, utilise Mutex.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète le pattern WaitGroup pour lancer une goroutine et attendre sa fin.',
            xp: 25,
            parts: [
              { type: 'text', value: 'var wg sync.WaitGroup\nwg.' },
              { type: 'blank', placeholder: 'méthode', correct: 'Add' },
              { type: 'text', value: '(1)\ngo func() {\n    defer wg.' },
              { type: 'blank', placeholder: 'méthode', correct: 'Done' },
              { type: 'text', value: '()\n    // travail\n}()\nwg.Wait()' }
            ]
          }
        ]
      }
    ]
  }
]
