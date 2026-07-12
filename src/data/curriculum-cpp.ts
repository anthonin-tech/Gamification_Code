import type { CourseModule } from '@/types/cours'

export const CURRICULUM_CPP: CourseModule[] = [
  {
    icon: '⚡',
    title: 'Fondations',
    lessons: [
      {
        title: 'Introduction au C++',
        subtitle: 'Performance et contrôle mémoire',
        type: 'theory',
        time: '10 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'C++ : puissance et responsabilité',
            content: 'C++ est une extension du langage C, créé par Bjarne Stroustrup. Il combine la <strong>performance du C</strong> (accès direct à la mémoire) avec la <strong>programmation orientée objet</strong>. Utilisé dans les jeux vidéo, systèmes embarqués, moteurs et logiciels haute performance.',
            callout: {
              kind: 'tip',
              icon: '⚠️',
              title: 'Gestion manuelle de la mémoire',
              text: 'En C++, tu es responsable d\'allouer (new) et libérer (delete) la mémoire. Un oubli provoque une fuite mémoire.'
            },
            code: {
              filename: 'main.cpp',
              src: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Bonjour, monde !" << endl;\n    return 0;\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quel header faut-il inclure pour utiliser cout en C++ ?',
            options: ['<stdio.h>', '<print>', '<iostream>', '<output>'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! <iostream> fournit cout et cin pour les entrées/sorties.',
            errorMsg: 'C\'est #include <iostream> qui donne accès à cout.'
          }
        ]
      },
      {
        title: 'Types et variables',
        subtitle: 'Typage statique et pointeurs',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Types de base',
            content: 'C++ est fortement typé. Types principaux : <strong>int</strong>, <strong>double</strong>, <strong>float</strong>, <strong>char</strong>, <strong>bool</strong>, <strong>string</strong> (avec #include &lt;string&gt;). La déclaration doit spécifier le type. Les <strong>pointeurs</strong> stockent une adresse mémoire.',
            code: {
              filename: 'types.cpp',
              src: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int age = 25;\n    double prix = 9.99;\n    bool actif = true;\n    string prenom = "Alice";\n\n    cout << prenom << " a " << age << " ans" << endl;\n    return 0;\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quel type C++ stocke un nombre décimal avec double précision ?',
            options: ['float', 'decimal', 'double', 'real'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! double offre plus de précision que float.',
            errorMsg: 'double est le type à virgule flottante double précision en C++.'
          }
        ]
      }
    ]
  },
  {
    icon: '🎯',
    title: 'Pointeurs et mémoire',
    lessons: [
      {
        title: 'Les pointeurs',
        subtitle: 'Adresses mémoire et déréférencement',
        type: 'theory',
        time: '15 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: '* et &',
            content: 'Un <strong>pointeur</strong> est une variable qui stocke l\'adresse mémoire d\'une autre variable. L\'opérateur <strong>&</strong> obtient l\'adresse d\'une variable, et <strong>*</strong> accède à la valeur à cette adresse (déréférencement).',
            code: {
              filename: 'pointeurs.cpp',
              src: 'int age = 25;\nint* ptr = &age;    // ptr contient l\'adresse de age\n\ncout << age;        // 25 (la valeur)\ncout << &age;       // 0x7ffd... (l\'adresse)\ncout << ptr;        // 0x7ffd... (même adresse)\ncout << *ptr;       // 25 (déréférencement)\n\n*ptr = 30;         // modifie age via le pointeur\ncout << age;       // 30'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait l\'opérateur * devant un pointeur ?',
            options: [
              'Calcule la multiplication',
              'Déclare un pointeur',
              'Accède à la valeur pointée (déréférencement)',
              'Retourne l\'adresse'
            ],
            correct: 2,
            xp: 25,
            successMsg: 'Exact ! * devant un pointeur existant accède à la valeur à cette adresse.',
            errorMsg: '* devant un pointeur est le déréférencement — il accède à la valeur stockée à l\'adresse.'
          }
        ]
      }
    ]
  }
]
