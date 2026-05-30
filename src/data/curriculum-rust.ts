import type { CourseModule } from '@/types/cours'

export const CURRICULUM_RUST: CourseModule[] = [
  {
    icon: '🦀',
    title: 'Fondations',
    lessons: [
      {
        title: 'Pourquoi Rust ?',
        subtitle: 'Sécurité mémoire sans garbage collector',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Le langage le plus aimé des développeurs',
            content: 'Rust est un langage système créé par Mozilla. Son innovation majeure : la <strong>sécurité mémoire garantie à la compilation</strong> sans garbage collector. Il est impossible d\'avoir des dangling pointers ou des data races — le compilateur les empêche. Utilisé dans les navigateurs, OS, WebAssembly.',
            callout: {
              kind: 'tip',
              icon: '🦀',
              title: 'Le borrow checker',
              text: 'Le compilateur Rust vérifie que tu ne peux pas utiliser une valeur après l\'avoir transférée. C\'est déroutant au début, mais ça élimine une classe entière de bugs.'
            },
            code: {
              filename: 'main.rs',
              src: 'fn main() {\n    let message = "Bonjour, monde !";\n    println!("{}", message);\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que garantit Rust à la compilation ?',
            options: [
              'Performance maximale',
              'Sécurité mémoire sans garbage collector',
              'Syntaxe simple',
              'Compatibilité avec tous les OS'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! C\'est la proposition unique de Rust : sécurité mémoire sans GC.',
            errorMsg: 'La garantie principale de Rust est la sécurité mémoire à la compilation, sans GC.'
          }
        ]
      },
      {
        title: 'Variables et mutabilité',
        subtitle: 'let, mut et l\'immuabilité par défaut',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Immuable par défaut',
            content: 'En Rust, les variables sont <strong>immuables par défaut</strong>. Pour pouvoir modifier une variable, il faut explicitement déclarer <strong>mut</strong>. C\'est une décision délibérée pour encourager la sécurité. On déclare avec <strong>let</strong>.',
            code: {
              filename: 'variables.rs',
              src: 'fn main() {\n    let x = 5;          // immuable\n    // x = 6;          // ❌ Erreur ! x est immuable\n\n    let mut score = 0;  // mutable\n    score += 10;        // ✅ OK\n\n    println!("score: {}", score);\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Comment rendre une variable modifiable en Rust ?',
            options: ['var x = 5', 'let x = 5', 'let mut x = 5', 'mutable x = 5'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! mut rend la variable mutable.',
            errorMsg: 'Il faut ajouter mut après let pour rendre une variable modifiable.'
          }
        ]
      }
    ]
  },
  {
    icon: '🔐',
    title: 'Ownership',
    lessons: [
      {
        title: 'Le système d\'ownership',
        subtitle: 'La règle des trois : chaque valeur a un seul propriétaire',
        type: 'theory',
        time: '15 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Move semantics',
            content: 'En Rust, chaque valeur a un <strong>unique propriétaire</strong>. Quand le propriétaire sort du scope, la valeur est libérée automatiquement. Si tu assignes une valeur à une autre variable, la <strong>propriété est transférée</strong> (move) — l\'originale n\'est plus accessible.',
            code: {
              filename: 'ownership.rs',
              src: 'fn main() {\n    let s1 = String::from("bonjour");\n    let s2 = s1;    // s1 est "moved" dans s2\n\n    // println!("{}", s1); // ❌ s1 n\'existe plus !\n    println!("{}", s2);    // ✅ OK\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que se passe-t-il quand on assigne une String à une nouvelle variable en Rust ?',
            options: [
              'Les deux variables pointent vers la même valeur',
              'La valeur est copiée',
              'La propriété est transférée (move)',
              'Une erreur est levée'
            ],
            correct: 2,
            xp: 25,
            successMsg: 'Exact ! La propriété est transférée — l\'ancienne variable n\'est plus valide.',
            errorMsg: 'Rust transfère (move) la propriété. L\'ancienne variable devient invalide.'
          }
        ]
      }
    ]
  }
]
