import type { CourseModule } from '@/types/cours'

export const CURRICULUM_JAVA: CourseModule[] = [
  {
    icon: '☕',
    title: 'Fondations',
    lessons: [
      {
        title: 'Hello World en Java',
        subtitle: 'Comprendre la structure d\'un programme Java',
        type: 'theory',
        time: '10 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'La structure de base',
            content: 'Un programme Java est organisé en <strong>classes</strong>. Le point d\'entrée est toujours la méthode <strong>main</strong> avec la signature exacte <code>public static void main(String[] args)</code>. Java est un langage <strong>fortement typé</strong> et <strong>orienté objet</strong>.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Le nom du fichier doit correspondre à la classe',
              text: 'Si ta classe s\'appelle Main, le fichier doit s\'appeler Main.java. Java est strict là-dessus.'
            },
            code: {
              filename: 'Main.java',
              src: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Bonjour, monde !");\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle méthode est le point d\'entrée d\'un programme Java ?',
            options: ['start()', 'run()', 'main()', 'init()'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! main() est toujours le point d\'entrée en Java.',
            errorMsg: 'C\'est main() avec la signature public static void main(String[] args).'
          }
        ]
      },
      {
        title: 'Variables et types',
        subtitle: 'int, String, double, boolean',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Typage statique fort',
            content: 'En Java, chaque variable doit avoir un type déclaré explicitement. Les types primitifs principaux sont : <strong>int</strong> (entier), <strong>double</strong> (décimal), <strong>boolean</strong> (vrai/faux), <strong>char</strong> (caractère). Les objets comme <strong>String</strong> commencent par une majuscule.',
            code: {
              filename: 'Variables.java',
              src: 'int age = 25;\ndouble prix = 19.99;\nboolean actif = true;\nString prenom = "Alice";\n\nSystem.out.println(prenom + " a " + age + " ans");'
            }
          },
          {
            type: 'quiz',
            question: 'Quel type Java utilise-t-on pour un nombre entier ?',
            options: ['integer', 'int', 'number', 'Integer'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! int est le type primitif pour les entiers.',
            errorMsg: 'Le type primitif entier en Java est int (en minuscules).'
          }
        ]
      }
    ]
  },
  {
    icon: '🏗️',
    title: 'Orienté Objet',
    lessons: [
      {
        title: 'Classes et objets',
        subtitle: 'Créer ses propres types avec class',
        type: 'theory',
        time: '15 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Définir une classe',
            content: 'Une <strong>classe</strong> est un modèle pour créer des objets. Elle contient des <strong>attributs</strong> (données) et des <strong>méthodes</strong> (comportements). On crée un objet (instance) avec le mot-clé <strong>new</strong>.',
            code: {
              filename: 'Chien.java',
              src: 'public class Chien {\n    String nom;\n    int age;\n\n    public void aboyer() {\n        System.out.println(nom + " dit : Woof !");\n    }\n}\n\n// Utilisation\nChien monChien = new Chien();\nmonChien.nom = "Rex";\nmonChien.aboyer(); // Rex dit : Woof !'
            }
          },
          {
            type: 'quiz',
            question: 'Quel mot-clé crée une instance d\'une classe ?',
            options: ['create', 'instance', 'new', 'make'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! new alloue la mémoire et crée l\'objet.',
            errorMsg: 'C\'est new qui instancie une classe en Java.'
          }
        ]
      }
    ]
  }
]
