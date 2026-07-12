import type { CourseModule } from '@/types/cours'

export const CURRICULUM_GO: CourseModule[] = [
  {
    icon: '🐹',
    title: 'Fondations',
    lessons: [
      {
        title: 'Bienvenue dans Go',
        subtitle: 'Le langage simple et rapide de Google',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'Pourquoi Go ?',
            content: 'Go (ou Golang) a été créé par Google en 2009. Ses points forts : <strong>simplicité</strong>, <strong>performances</strong> proches du C, <strong>concurrence</strong> native avec les goroutines, et compilation ultra-rapide. Très utilisé pour les APIs, microservices et outils CLI.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Go est opinionné',
              text: 'Go impose un style de code unique via gofmt. Pas de débat sur le formatage — tout le monde écrit Go de la même façon.'
            },
            code: {
              filename: 'main.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Bonjour, monde !")\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Par quelle déclaration commence tout fichier Go ?',
            options: ['import main', 'package main', 'func main()', 'module main'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! package main indique que c\'est le point d\'entrée du programme.',
            errorMsg: 'Tout fichier Go commence par une déclaration package.'
          }
        ]
      },
      {
        title: 'Variables en Go',
        subtitle: ':= et var, l\'inférence de types',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Déclaration courte avec :=',
            content: 'Go propose deux façons de déclarer une variable : <strong>var</strong> (explicite) et <strong>:=</strong> (déclaration courte avec inférence de type). Le := ne fonctionne qu\'à l\'intérieur des fonctions. Go est fortement typé mais infère les types automatiquement.',
            code: {
              filename: 'variables.go',
              src: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Déclaration explicite\n    var prenom string = "Alice"\n\n    // Déclaration courte (inférence)\n    age := 25\n    actif := true\n\n    fmt.Println(prenom, age, actif)\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle syntaxe est la déclaration courte en Go ?',
            options: ['var x = 5', 'x := 5', 'let x = 5', 'x = 5'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! := déclare ET assigne en même temps avec inférence de type.',
            errorMsg: 'La déclaration courte en Go utilise :=, qui déclare et assigne simultanément.'
          }
        ]
      }
    ]
  },
  {
    icon: '⚙️',
    title: 'Fonctions et structs',
    lessons: [
      {
        title: 'Fonctions en Go',
        subtitle: 'Retours multiples et gestion d\'erreurs',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Retours multiples',
            content: 'Go permet à une fonction de <strong>retourner plusieurs valeurs</strong>. C\'est la façon idiomatique de gérer les erreurs : on retourne (valeur, erreur). Si erreur est nil, tout s\'est bien passé.',
            code: {
              filename: 'fonctions.go',
              src: 'func diviser(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, fmt.Errorf("division par zéro")\n    }\n    return a / b, nil\n}\n\nresultat, err := diviser(10, 2)\nif err != nil {\n    fmt.Println("Erreur:", err)\n} else {\n    fmt.Println(resultat) // 5\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Comment Go gère-t-il les erreurs de façon idiomatique ?',
            options: [
              'Avec try/catch',
              'Avec des exceptions',
              'En retournant (valeur, error)',
              'Avec des callbacks'
            ],
            correct: 2,
            xp: 20,
            successMsg: 'Exact ! Go retourne l\'erreur comme deuxième valeur — pas d\'exceptions.',
            errorMsg: 'Go n\'a pas d\'exceptions. On retourne l\'erreur comme deuxième valeur.'
          }
        ]
      }
    ]
  }
]
