import type { CourseModule } from '@/types/cours'

export const CURRICULUM_CSHARP: CourseModule[] = [
  {
    icon: '💜',
    title: 'Fondations',
    lessons: [
      {
        title: 'Introduction à C#',
        subtitle: 'Le langage de Microsoft et .NET',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'C# et l\'écosystème .NET',
            content: 'C# (C Sharp) est créé par Microsoft et tourne sur la plateforme <strong>.NET</strong>. C\'est un langage orienté objet, fortement typé, avec une syntaxe proche de Java. Il est utilisé pour les applications Windows, jeux vidéo (Unity), APIs web (ASP.NET), et applications mobiles (Xamarin/MAUI).',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'C# = Java version Microsoft',
              text: 'Si tu connais Java, C# sera très familier. La syntaxe est très similaire mais C# a des features plus modernes comme LINQ et les async/await natifs.'
            },
            code: {
              filename: 'Program.cs',
              src: 'using System;\n\nclass Program {\n    static void Main(string[] args) {\n        Console.WriteLine("Bonjour, monde !");\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Sur quelle plateforme tourne C# ?',
            options: ['JVM (Java Virtual Machine)', '.NET', 'V8', 'LLVM'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! .NET est la plateforme d\'exécution de C#.',
            errorMsg: 'C# tourne sur .NET (anciennement .NET Framework, maintenant .NET Core/5+).'
          }
        ]
      },
      {
        title: 'Types et variables',
        subtitle: 'Types valeur, types référence et var',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Typage fort avec inférence',
            content: 'C# est fortement typé. On peut déclarer le type explicitement ou utiliser <strong>var</strong> pour l\'inférence. Les types primitifs comme <strong>int</strong>, <strong>double</strong>, <strong>bool</strong> sont des <strong>types valeur</strong>. Les classes comme <strong>string</strong> sont des <strong>types référence</strong>.',
            code: {
              filename: 'types.cs',
              src: 'int age = 25;\ndouble prix = 19.99;\nbool actif = true;\nstring prenom = "Alice";\n\n// Inférence avec var\nvar score = 100;          // int\nvar message = "Bonjour";  // string\n\nConsole.WriteLine($"{prenom} a {age} ans");'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait le mot-clé var en C# ?',
            options: [
              'Crée une variable sans type',
              'Crée une variable dynamique',
              'Infère le type à la compilation',
              'Crée une variable globale'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! var est de l\'inférence de type — le compilateur devine le type.',
            errorMsg: 'var en C# est de l\'inférence de type statique (pas du typage dynamique).'
          }
        ]
      }
    ]
  },
  {
    icon: '🏛️',
    title: 'POO en C#',
    lessons: [
      {
        title: 'Classes et propriétés',
        subtitle: 'Encapsulation avec les accesseurs',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Properties : getters et setters',
            content: 'C# utilise des <strong>propriétés</strong> (properties) pour l\'encapsulation — plus élégant que les méthodes getXxx/setXxx de Java. Une propriété avec <strong>{ get; set; }</strong> génère automatiquement le stockage. On peut aussi définir des validations dans le setter.',
            code: {
              filename: 'Personne.cs',
              src: 'public class Personne {\n    public string Nom { get; set; }\n    public int Age { get; private set; }  // lecture seule en dehors\n\n    public Personne(string nom, int age) {\n        Nom = nom;\n        Age = age;\n    }\n\n    public string Presenter() {\n        return $"Je suis {Nom}, j\'ai {Age} ans.";\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que signifie { get; private set; } sur une propriété C# ?',
            options: [
              'La propriété est en lecture seule partout',
              'Lecture publique, écriture seulement depuis la classe',
              'Lecture privée, écriture publique',
              'La propriété est abstraite'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! get public + set private = lecture partout, écriture restreinte à la classe.',
            errorMsg: 'private set signifie que seule la classe peut modifier la valeur. get est public donc lisible partout.'
          }
        ]
      }
    ]
  }
]
