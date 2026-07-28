import type { CourseModule } from '@/types/cours'

export const CURRICULUM_JAVA: CourseModule[] = [
  {
    icon: '☕',
    title: 'Introduction à Java',
    lessons: [
      {
        title: 'La JVM, JDK et JRE',
        subtitle: 'Comprendre l\'écosystème Java',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'L\'écosystème Java',
            content: 'Java repose sur trois composants. Le <strong>JDK</strong> (Java Development Kit) inclut le compilateur <code>javac</code> et tous les outils de développement. Le <strong>JRE</strong> (Java Runtime Environment) permet d\'exécuter les programmes. La <strong>JVM</strong> (Java Virtual Machine) exécute le <strong>bytecode</strong> Java sur n\'importe quelle plateforme.',
            callout: {
              kind: 'info',
              icon: '🌍',
              title: 'Write once, run anywhere',
              text: 'Le bytecode Java est portable : un programme compilé sur Windows tourne aussi sur Linux ou macOS grâce à la JVM.'
            }
          },
          {
            type: 'quiz',
            question: 'Quel outil compile un fichier .java en bytecode ?',
            options: ['java', 'javac', 'jvm'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! javac est le compilateur Java qui produit des fichiers .class.',
            errorMsg: 'C\'est javac (avec un "c" pour compiler) qui compile le code Java.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la chaîne de compilation Java :',
            xp: 20,
            parts: [
              { type: 'text', value: 'Code source (.java) → ' },
              { type: 'blank', placeholder: 'outil', correct: 'javac' },
              { type: 'text', value: ' → Bytecode (.class) → ' },
              { type: 'blank', placeholder: 'moteur', correct: 'JVM' },
              { type: 'text', value: ' → Exécution' }
            ]
          }
        ]
      },
      {
        title: 'Hello World en Java',
        subtitle: 'Structure d\'un programme Java',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'La structure de base',
            content: 'Un programme Java est organisé en <strong>classes</strong>. Le point d\'entrée est toujours la méthode <strong>main</strong> avec la signature exacte <code>public static void main(String[] args)</code>. Le nom du fichier doit correspondre exactement au nom de la classe.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Le fichier et la classe doivent avoir le même nom',
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
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un programme Java complet qui affiche "Bienvenue en Java !" avec System.out.println.',
            placeholder: 'public class Main {\n    public static void main(String[] args) {\n        // Ton code ici\n    }\n}',
            filename: 'Main.java',
            xp: 30,
            hint: 'Utilise System.out.println("...") à l\'intérieur de la méthode main.',
            validator: (code: string) => code.includes('System.out.println') && code.includes('main')
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
        title: 'Types primitifs',
        subtitle: 'int, double, boolean, char',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Les types primitifs Java',
            content: 'Java est un langage <strong>fortement typé</strong>. Chaque variable doit avoir un type déclaré. Les types primitifs principaux sont : <code>int</code> (entier), <code>double</code> (décimal), <code>boolean</code> (vrai/faux), <code>char</code> (caractère). Il existe aussi <code>long</code>, <code>float</code>, <code>byte</code> et <code>short</code>.',
            code: {
              filename: 'Types.java',
              src: 'int age = 25;\ndouble prix = 19.99;\nboolean estActif = true;\nchar initiale = \'A\';\n\nSystem.out.println(age);       // 25\nSystem.out.println(prix);      // 19.99\nSystem.out.println(estActif);  // true\nSystem.out.println(initiale);  // A'
            }
          },
          {
            type: 'quiz',
            question: 'Quel type Java utilise-t-on pour stocker 3.14 ?',
            options: ['int', 'double', 'char', 'boolean'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! double stocke les nombres décimaux.',
            errorMsg: 'int stocke les entiers. Pour les décimaux, c\'est double.'
          },
          {
            type: 'fill-blank',
            instructions: 'Déclare les variables avec les bons types :',
            xp: 20,
            parts: [
              { type: 'blank', placeholder: 'type', correct: 'int' },
              { type: 'text', value: ' score = 100;\n' },
              { type: 'blank', placeholder: 'type', correct: 'boolean' },
              { type: 'text', value: ' gagne = true;\n' },
              { type: 'blank', placeholder: 'type', correct: 'double' },
              { type: 'text', value: ' temperature = 36.6;' }
            ]
          }
        ]
      },
      {
        title: 'String et constantes',
        subtitle: 'Texte, autoboxing et final',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'String est un objet',
            content: 'En Java, <strong>String</strong> est une classe (pas un type primitif). On utilise des guillemets doubles. Java propose l\'<strong>autoboxing</strong> : la conversion automatique entre types primitifs et leurs wrappers objets (<code>int</code> ↔ <code>Integer</code>, <code>double</code> ↔ <code>Double</code>).',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'String avec majuscule',
              text: 'On écrit String avec un S majuscule car c\'est une classe Java, contrairement à int ou double.'
            },
            code: {
              filename: 'Strings.java',
              src: 'String nom = "Alice";\nString message = "Bonjour " + nom;\nSystem.out.println(message); // Bonjour Alice\n\n// Autoboxing\nint x = 42;\nInteger xObj = x;  // autoboxing automatique\nint y = xObj;      // unboxing automatique'
            }
          },
          {
            type: 'theory',
            title: 'Les constantes avec final',
            content: 'Le mot-clé <strong>final</strong> empêche la réassignation d\'une variable. Par convention, les constantes s\'écrivent en <strong>MAJUSCULES_AVEC_UNDERSCORE</strong>.',
            code: {
              filename: 'Constantes.java',
              src: 'final int MAX_SCORE = 100;\nfinal String APP_NOM = "CodeQuest";\n\n// MAX_SCORE = 200; // Erreur de compilation !\nSystem.out.println(MAX_SCORE); // 100\nSystem.out.println(APP_NOM);   // CodeQuest'
            }
          },
          {
            type: 'quiz',
            question: 'Quel mot-clé rend une variable Java non modifiable ?',
            options: ['const', 'static', 'final', 'immutable'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! final empêche la réassignation en Java.',
            errorMsg: 'En Java c\'est final (pas const) qui rend une variable constante.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare une constante MAX_VIES valant 3 et une String "joueur" avec un prénom. Affiche les deux avec System.out.println.',
            placeholder: 'public class Main {\n    public static void main(String[] args) {\n        // Constante et String ici\n    }\n}',
            filename: 'Main.java',
            xp: 30,
            hint: 'Utilise final pour la constante et String pour le texte.',
            validator: (code: string) => code.includes('final') && code.includes('String') && code.includes('System.out.println')
          }
        ]
      }
    ]
  },
  {
    icon: '⚡',
    title: 'Opérateurs et expressions',
    lessons: [
      {
        title: 'Arithmétique, comparaison et logique',
        subtitle: '+, -, *, /, %, &&, ||, !',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Calcul et logique',
            content: 'Java propose les opérateurs arithmétiques classiques : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (modulo). Pour la logique : <code>&&</code> (ET), <code>||</code> (OU), <code>!</code> (NON). Les opérateurs de comparaison : <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.',
            code: {
              filename: 'Operateurs.java',
              src: 'int a = 10, b = 3;\nSystem.out.println(a + b);  // 13\nSystem.out.println(a / b);  // 3 (division entière !)\nSystem.out.println(a % b);  // 1 (reste)\n\nboolean test = (a > b) && (b != 0);\nSystem.out.println(test);   // true'
            }
          },
          {
            type: 'quiz',
            question: 'Quel est le résultat de 10 % 3 en Java ?',
            options: ['3', '1', '0', '3.33'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! L\'opérateur % retourne le reste. 10 = 3×3 + 1.',
            errorMsg: 'L\'opérateur % (modulo) retourne le reste : 10 divisé par 3 = 3 reste 1.'
          },
          {
            type: 'theory',
            title: 'L\'opérateur ternaire et instanceof',
            content: 'L\'opérateur <strong>ternaire</strong> condense un if/else en une ligne : <code>condition ? valeurSiVrai : valeurSiFaux</code>. L\'opérateur <strong>instanceof</strong> vérifie si un objet est d\'un certain type.',
            code: {
              filename: 'Ternaire.java',
              src: 'int age = 20;\nString statut = (age >= 18) ? "majeur" : "mineur";\nSystem.out.println(statut); // majeur\n\nObject texte = "Hello";\nboolean estString = texte instanceof String;\nSystem.out.println(estString); // true'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complète l\'opérateur ternaire :',
            xp: 20,
            parts: [
              { type: 'text', value: 'int x = 5;\nString res = (x > 0) ' },
              { type: 'blank', placeholder: 'opérateur', correct: '?' },
              { type: 'text', value: ' "positif" ' },
              { type: 'blank', placeholder: 'opérateur', correct: ':' },
              { type: 'text', value: ' "négatif";' }
            ]
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
        title: 'if, else et switch',
        subtitle: 'Contrôler le flux du programme',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'if / else if / else',
            content: 'Le <strong>if</strong> exécute du code selon une condition. On peut chaîner avec <strong>else if</strong> et utiliser <strong>else</strong> comme cas par défaut. Les accolades délimitent les blocs.',
            code: {
              filename: 'Conditions.java',
              src: 'int note = 75;\n\nif (note >= 90) {\n    System.out.println("Excellent !");\n} else if (note >= 70) {\n    System.out.println("Bien !");\n} else if (note >= 50) {\n    System.out.println("Passable");\n} else {\n    System.out.println("Insuffisant");\n}\n// Affiche : Bien !'
            }
          },
          {
            type: 'theory',
            title: 'switch classique et switch expression',
            content: 'Le <strong>switch</strong> compare une valeur à plusieurs cas. Depuis Java 14, la <strong>switch expression</strong> avec <code>-&gt;</code> est plus concise et sans risque de fall-through.',
            code: {
              filename: 'Switch.java',
              src: 'int jour = 2;\n\n// Switch classique\nswitch (jour) {\n    case 1: System.out.println("Lundi"); break;\n    case 2: System.out.println("Mardi"); break;\n    default: System.out.println("Autre jour");\n}\n\n// Switch expression (Java 14+)\nString nomJour = switch (jour) {\n    case 1 -> "Lundi";\n    case 2 -> "Mardi";\n    default -> "Autre";\n};\nSystem.out.println(nomJour); // Mardi'
            }
          },
          {
            type: 'quiz',
            question: 'Dans un switch classique, que se passe-t-il si on oublie break ?',
            options: [
              'Une erreur de compilation',
              'Le code continue vers le case suivant (fall-through)',
              'Le switch s\'arrête automatiquement',
              'Une exception est lancée'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Sans break, Java continue les cases suivants (fall-through).',
            errorMsg: 'Sans break, Java "tombe" dans le case suivant — comportement appelé fall-through.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare une variable note = 65. Affiche "Reçu" si >= 50, "Échoué" sinon avec if/else.',
            placeholder: 'public class Main {\n    public static void main(String[] args) {\n        int note = 65;\n        // Ton if/else ici\n    }\n}',
            filename: 'Main.java',
            xp: 30,
            hint: 'if (note >= 50) { ... } else { ... }',
            validator: (code: string) => code.includes('if') && code.includes('else') && code.includes('System.out.println')
          }
        ]
      },
      {
        title: 'Boucles for, while et for-each',
        subtitle: 'Répéter des actions',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'La boucle for classique',
            content: 'La boucle <strong>for</strong> est idéale quand on connaît le nombre d\'itérations. Syntaxe : <code>for (init; condition; incrément)</code>. <strong>break</strong> sort de la boucle immédiatement, <strong>continue</strong> passe à l\'itération suivante.',
            code: {
              filename: 'BoucleFor.java',
              src: 'for (int i = 0; i < 5; i++) {\n    System.out.println("Tour " + i);\n}\n\n// Avec break\nfor (int i = 0; i < 10; i++) {\n    if (i == 3) break;\n    System.out.println(i); // 0, 1, 2\n}\n\n// Avec continue\nfor (int i = 0; i < 5; i++) {\n    if (i == 2) continue;\n    System.out.println(i); // 0, 1, 3, 4\n}'
            }
          },
          {
            type: 'theory',
            title: 'while, do-while et for-each',
            content: '<strong>while</strong> répète tant que la condition est vraie. <strong>do-while</strong> garantit une première exécution. <strong>for-each</strong> (enhanced for) est idéal pour parcourir des tableaux et collections.',
            code: {
              filename: 'Boucles.java',
              src: '// while\nint compteur = 0;\nwhile (compteur < 3) {\n    System.out.println(compteur++);\n}\n\n// do-while\ndo {\n    System.out.println("Exécuté au moins une fois");\n} while (false);\n\n// for-each\nint[] nombres = {1, 2, 3, 4, 5};\nfor (int n : nombres) {\n    System.out.println(n);\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle boucle garantit d\'être exécutée au moins une fois ?',
            options: ['for', 'while', 'do-while', 'for-each'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! do-while évalue la condition après la première exécution.',
            errorMsg: 'C\'est do-while — il s\'exécute toujours au moins une fois, même si la condition est fausse.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une boucle for qui affiche les nombres de 1 à 10 avec System.out.println.',
            placeholder: 'public class Main {\n    public static void main(String[] args) {\n        // Ta boucle ici\n    }\n}',
            filename: 'Main.java',
            xp: 30,
            hint: 'for (int i = 1; i <= 10; i++) { System.out.println(i); }',
            validator: (code: string) => code.includes('for') && code.includes('System.out.println')
          }
        ]
      }
    ]
  },
  {
    icon: '🔤',
    title: 'Chaînes de caractères',
    lessons: [
      {
        title: 'Méthodes de String',
        subtitle: 'Manipuler le texte en Java',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Les méthodes essentielles',
            content: 'La classe <strong>String</strong> offre de nombreuses méthodes : <code>length()</code> (longueur), <code>charAt(i)</code> (caractère à l\'index i), <code>substring(debut, fin)</code> (extraction), <code>contains("x")</code> (contient), <code>replace("old","new")</code> (remplace), <code>split(",")</code> (découpe), <code>toUpperCase()</code> / <code>toLowerCase()</code> (casse).',
            code: {
              filename: 'StringMethods.java',
              src: 'String s = "Bonjour Java";\n\nSystem.out.println(s.length());          // 12\nSystem.out.println(s.charAt(0));         // B\nSystem.out.println(s.substring(8));      // Java\nSystem.out.println(s.contains("Java"));  // true\nSystem.out.println(s.replace("Java", "Monde")); // Bonjour Monde\nSystem.out.println(s.toUpperCase());     // BONJOUR JAVA\n\nString[] mots = "a,b,c".split(",");\nSystem.out.println(mots.length);         // 3'
            }
          },
          {
            type: 'theory',
            title: 'equals() vs == et StringBuilder',
            content: 'En Java, ne jamais comparer des String avec <code>==</code>. Il faut utiliser <code>.equals()</code> pour comparer le contenu. Pour construire des strings dynamiquement, <strong>StringBuilder</strong> est bien plus performant que la concaténation <code>+</code> dans une boucle.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Piège classique : == vs equals()',
              text: 'str1 == str2 compare les adresses mémoire. str1.equals(str2) compare les contenus. Utilise toujours equals() !'
            },
            code: {
              filename: 'StringCompare.java',
              src: 'String a = new String("Java");\nString b = new String("Java");\n\nSystem.out.println(a == b);       // false (références différentes)\nSystem.out.println(a.equals(b));  // true (contenu identique)\n\n// StringBuilder\nStringBuilder sb = new StringBuilder();\nfor (int i = 1; i <= 3; i++) {\n    sb.append("Item ").append(i).append("\\n");\n}\nSystem.out.println(sb.toString());'
            }
          },
          {
            type: 'quiz',
            question: 'Comment comparer correctement deux String en Java ?',
            options: ['str1 == str2', 'str1.equals(str2)', 'str1.compare(str2)', 'str1 === str2'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! equals() compare le contenu des String.',
            errorMsg: '== compare les références mémoire. Pour le contenu, utilise equals().'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une String "Programmation Java", affiche sa longueur avec length(), puis affiche-la en majuscules avec toUpperCase().',
            placeholder: 'public class Main {\n    public static void main(String[] args) {\n        String texte = "Programmation Java";\n        // Affiche la longueur\n        // Affiche en majuscules\n    }\n}',
            filename: 'Main.java',
            xp: 25,
            hint: 'System.out.println(texte.length()); puis System.out.println(texte.toUpperCase());',
            validator: (code: string) => code.includes('.length()') && code.includes('.toUpperCase()')
          }
        ]
      }
    ]
  },
  {
    icon: '🧩',
    title: 'Méthodes',
    lessons: [
      {
        title: 'Déclarer et appeler des méthodes',
        subtitle: 'Blocs de code réutilisables',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Anatomie d\'une méthode',
            content: 'Une méthode Java se déclare avec : <code>modificateur typeRetour nomMethode(paramètres)</code>. Le type de retour peut être <code>void</code> (rien) ou un type comme <code>int</code>, <code>String</code>, etc. On utilise <code>return</code> pour renvoyer une valeur.',
            code: {
              filename: 'Methodes.java',
              src: 'public class Calculatrice {\n    // Méthode qui retourne un int\n    static int addition(int a, int b) {\n        return a + b;\n    }\n\n    // Méthode void\n    static void afficher(String message) {\n        System.out.println(message);\n    }\n\n    public static void main(String[] args) {\n        int resultat = addition(5, 3);\n        afficher("Résultat : " + resultat); // Résultat : 8\n    }\n}'
            }
          },
          {
            type: 'theory',
            title: 'Surcharge (overloading) et varargs',
            content: 'La <strong>surcharge</strong> permet d\'avoir plusieurs méthodes avec le même nom mais des paramètres différents. Java choisit la bonne version automatiquement. Les <strong>varargs</strong> (<code>Type... nom</code>) permettent de passer un nombre variable d\'arguments.',
            code: {
              filename: 'Surcharge.java',
              src: 'static int somme(int a, int b) {\n    return a + b;\n}\n\nstatic double somme(double a, double b) {\n    return a + b;\n}\n\n// Varargs\nstatic int total(int... nombres) {\n    int s = 0;\n    for (int n : nombres) s += n;\n    return s;\n}\n\nSystem.out.println(somme(2, 3));       // 5 (version int)\nSystem.out.println(somme(2.5, 3.5));   // 6.0 (version double)\nSystem.out.println(total(1, 2, 3, 4)); // 10'
            }
          },
          {
            type: 'quiz',
            question: 'Peut-on avoir deux méthodes avec le même nom en Java ?',
            options: [
              'Non, c\'est une erreur de compilation',
              'Oui, si leurs paramètres sont différents (surcharge)',
              'Oui, mais seulement pour les méthodes static',
              'Oui, si elles ont des types de retour différents'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! La surcharge (overloading) permet plusieurs méthodes de même nom avec des paramètres différents.',
            errorMsg: 'La surcharge permet d\'avoir des méthodes de même nom si leurs signatures (paramètres) diffèrent.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une méthode statique "carre" qui prend un int et retourne son carré. Affiche le carré de 7.',
            placeholder: 'public class Main {\n    static int carre(int n) {\n        // Retourne n au carré\n    }\n\n    public static void main(String[] args) {\n        System.out.println(carre(7));\n    }\n}',
            filename: 'Main.java',
            xp: 30,
            hint: 'return n * n;',
            validator: (code: string) => code.includes('return') && code.includes('carre') && code.includes('System.out.println')
          }
        ]
      }
    ]
  },
  {
    icon: '📋',
    title: 'Tableaux',
    lessons: [
      {
        title: 'Tableaux en Java',
        subtitle: 'Stocker des collections de données',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Déclaration et initialisation',
            content: 'Un <strong>tableau</strong> stocke des éléments du même type. Sa taille est fixée à la création. On accède aux éléments via leur index (commence à 0). La propriété <code>.length</code> (sans parenthèses) donne la taille.',
            code: {
              filename: 'Tableaux.java',
              src: '// Initialisation directe\nint[] notes = {85, 90, 78, 95};\n\n// Initialisation manuelle\nString[] prenoms = new String[3];\nprenoms[0] = "Alice";\nprenoms[1] = "Bob";\nprenoms[2] = "Charlie";\n\nSystem.out.println(notes[0]);     // 85\nSystem.out.println(notes.length); // 4'
            }
          },
          {
            type: 'theory',
            title: 'Arrays et tableaux multidimensionnels',
            content: 'La classe <strong>Arrays</strong> offre des utilitaires : <code>Arrays.sort(tab)</code> pour trier, <code>Arrays.toString(tab)</code> pour afficher. Les <strong>tableaux multidimensionnels</strong> sont des tableaux de tableaux.',
            callout: {
              kind: 'info',
              icon: '💡',
              title: 'Taille fixe = limitation',
              text: 'La taille d\'un tableau est fixe. Pour ajouter/supprimer des éléments dynamiquement, préfère ArrayList.'
            },
            code: {
              filename: 'ArraysUtil.java',
              src: 'import java.util.Arrays;\n\nint[] nums = {5, 2, 8, 1, 9};\nArrays.sort(nums);\nSystem.out.println(Arrays.toString(nums)); // [1, 2, 5, 8, 9]\n\n// Tableau 2D\nint[][] grille = {\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9}\n};\nSystem.out.println(grille[1][2]); // 6'
            }
          },
          {
            type: 'quiz',
            question: 'Comment accéder au 3e élément d\'un tableau "tab" ?',
            options: ['tab[3]', 'tab[2]', 'tab.get(2)', 'tab(3)'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! L\'index commence à 0, donc le 3e élément est à l\'index 2.',
            errorMsg: 'Les index commencent à 0. Le 3e élément est tab[2].'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un tableau de 5 entiers, trie-le avec Arrays.sort(), puis affiche chaque élément avec une boucle for-each.',
            placeholder: 'import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] nombres = {5, 2, 8, 1, 9};\n        // Trie le tableau\n        // Affiche avec for-each\n    }\n}',
            filename: 'Main.java',
            xp: 35,
            hint: 'Arrays.sort(nombres); puis for (int n : nombres) { System.out.println(n); }',
            validator: (code: string) => code.includes('Arrays.sort') && code.includes('for')
          }
        ]
      }
    ]
  },
  {
    icon: '🏗️',
    title: 'Classes et objets',
    lessons: [
      {
        title: 'Créer une classe',
        subtitle: 'Attributs, constructeur et méthodes',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Définir une classe',
            content: 'Une <strong>classe</strong> est un modèle pour créer des objets. Elle contient des <strong>attributs</strong> (les données) et des <strong>méthodes</strong> (les actions). Le <strong>constructeur</strong> est appelé lors de la création d\'un objet avec <code>new</code>. Le mot-clé <code>this</code> désigne l\'instance courante.',
            code: {
              filename: 'Voiture.java',
              src: 'public class Voiture {\n    String marque;\n    int annee;\n    double vitesse;\n\n    // Constructeur\n    public Voiture(String marque, int annee) {\n        this.marque = marque;\n        this.annee = annee;\n        this.vitesse = 0;\n    }\n\n    void accelerer(double delta) {\n        vitesse += delta;\n    }\n\n    @Override\n    public String toString() {\n        return marque + " (" + annee + ") - " + vitesse + " km/h";\n    }\n}'
            }
          },
          {
            type: 'theory',
            title: 'Encapsulation : private + getters/setters',
            content: 'L\'<strong>encapsulation</strong> protège les données en les déclarant <code>private</code>. L\'accès se fait via des <strong>getters</strong> (lire) et des <strong>setters</strong> (écrire). Dans le setter, on peut valider la valeur avant de l\'accepter.',
            callout: {
              kind: 'tip',
              icon: '🔒',
              title: 'Pourquoi private ?',
              text: 'private protège tes attributs d\'une modification non contrôlée. Le setter permet de valider les données avant de les enregistrer.'
            },
            code: {
              filename: 'Personne.java',
              src: 'public class Personne {\n    private String nom;\n    private int age;\n\n    public Personne(String nom, int age) {\n        this.nom = nom;\n        setAge(age);\n    }\n\n    public String getNom() { return nom; }\n    public int getAge() { return age; }\n\n    public void setAge(int age) {\n        if (age >= 0) this.age = age; // validation\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que représente le mot-clé "this" dans une classe Java ?',
            options: [
              'La classe parente',
              'L\'instance courante de la classe',
              'La méthode principale',
              'Une variable static'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! this référence l\'objet courant.',
            errorMsg: 'this représente l\'objet courant — l\'instance sur laquelle la méthode est appelée.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une classe Produit avec les attributs privés "nom" (String) et "prix" (double), un constructeur, et un getter getNom(). Dans le main, crée un produit et affiche son nom.',
            placeholder: 'public class Produit {\n    // Attributs privés\n    // Constructeur\n    // Getter getNom()\n}\n\n// Produit p = new Produit("Clavier", 49.99);\n// System.out.println(p.getNom());',
            filename: 'Produit.java',
            xp: 40,
            hint: 'private String nom; puis public String getNom() { return nom; }',
            validator: (code: string) => code.includes('private') && code.includes('getNom') && code.includes('return')
          }
        ]
      },
      {
        title: 'Instancier et utiliser des objets',
        subtitle: 'Le mot-clé new et les références',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Créer des objets avec new',
            content: 'On crée un objet avec <strong>new</strong> qui appelle le constructeur. En Java, les objets sont manipulés par <strong>référence</strong> : deux variables peuvent pointer vers le même objet. Modifier via une référence affecte l\'objet partagé.',
            code: {
              filename: 'Main.java',
              src: 'Voiture v1 = new Voiture("Toyota", 2020);\nVoiture v2 = new Voiture("Honda", 2022);\n\nv1.accelerer(50);\nv2.accelerer(80);\n\nSystem.out.println(v1); // Toyota (2020) - 50.0 km/h\nSystem.out.println(v2); // Honda (2022) - 80.0 km/h\n\n// Référence partagée\nVoiture v3 = v1;\nv3.accelerer(20);\nSystem.out.println(v1.vitesse); // 70.0'
            }
          },
          {
            type: 'quiz',
            question: 'Quel mot-clé crée une nouvelle instance d\'une classe en Java ?',
            options: ['create', 'instance', 'new', 'make'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! new appelle le constructeur et alloue la mémoire.',
            errorMsg: 'C\'est new : new MaClasse(paramètres).'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la création d\'une Personne :',
            xp: 20,
            parts: [
              { type: 'text', value: 'Personne p = ' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'new' },
              { type: 'text', value: ' Personne("Alice", 30);\nSystem.out.println(p.' },
              { type: 'blank', placeholder: 'méthode', correct: 'getNom' },
              { type: 'text', value: '());' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🔗',
    title: 'Héritage',
    lessons: [
      {
        title: 'extends, super et @Override',
        subtitle: 'Réutiliser et spécialiser des classes',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Le mot-clé extends',
            content: 'L\'<strong>héritage</strong> permet à une classe d\'hériter des attributs et méthodes d\'une autre. On utilise <strong>extends</strong>. La classe enfant utilise <code>super</code> pour accéder à la classe parente. Java n\'autorise que l\'<strong>héritage simple</strong> (une seule classe parente).',
            code: {
              filename: 'Heritage.java',
              src: 'public class Animal {\n    protected String nom;\n\n    public Animal(String nom) {\n        this.nom = nom;\n    }\n\n    public void parler() {\n        System.out.println(nom + " fait un bruit.");\n    }\n}\n\npublic class Chien extends Animal {\n    private String race;\n\n    public Chien(String nom, String race) {\n        super(nom); // appelle le constructeur parent\n        this.race = race;\n    }\n\n    @Override\n    public void parler() {\n        System.out.println(nom + " aboie !");\n    }\n}'
            }
          },
          {
            type: 'theory',
            title: 'Polymorphisme et classe abstraite',
            content: 'Le <strong>polymorphisme</strong> permet d\'utiliser une référence de type parent pour manipuler des objets enfants. Une <strong>classe abstraite</strong> (<code>abstract</code>) ne peut pas être instanciée — elle sert de base. Java hérite implicitement de <strong>Object</strong> pour toutes les classes.',
            callout: {
              kind: 'info',
              icon: '🔮',
              title: 'Toutes les classes héritent de Object',
              text: 'En Java, toutes les classes héritent implicitement de Object. C\'est pourquoi elles ont toutes toString(), equals() et hashCode().'
            },
            code: {
              filename: 'Polymorphisme.java',
              src: 'Animal a1 = new Chien("Rex", "Berger");\na1.parler(); // Rex aboie !\n\n// Classe abstraite\nabstract class Forme {\n    abstract double surface();\n\n    void afficher() {\n        System.out.println("Surface : " + surface());\n    }\n}\n\nclass Cercle extends Forme {\n    double rayon;\n    Cercle(double r) { this.rayon = r; }\n\n    @Override\n    double surface() { return Math.PI * rayon * rayon; }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait super() dans un constructeur d\'une classe enfant ?',
            options: [
              'Crée un nouvel objet de la classe parente',
              'Appelle le constructeur de la classe parente',
              'Accède à une variable static',
              'Override une méthode du parent'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! super() appelle le constructeur de la classe parente.',
            errorMsg: 'super() invoque le constructeur parent. Il doit être la première instruction du constructeur enfant.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une classe Employe qui étend Personne (avec nom). Employe ajoute un attribut "poste" et override toString() pour afficher "nom - poste".',
            placeholder: 'public class Personne {\n    protected String nom;\n    public Personne(String nom) { this.nom = nom; }\n}\n\npublic class Employe extends Personne {\n    // Ajoute le poste\n    // Constructeur avec super()\n    // @Override toString()\n}',
            filename: 'Employe.java',
            xp: 40,
            hint: 'super(nom) dans le constructeur, puis @Override public String toString() { return nom + " - " + poste; }',
            validator: (code: string) => code.includes('extends') && code.includes('super') && code.includes('@Override')
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
        title: 'Créer et implémenter des interfaces',
        subtitle: 'Contrats et comportements partagés',
        type: 'theory',
        time: '14 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Le mot-clé interface',
            content: 'Une <strong>interface</strong> définit un contrat : une liste de méthodes que les classes doivent implémenter. On utilise <strong>implements</strong>. Contrairement à l\'héritage, une classe peut implémenter <strong>plusieurs interfaces</strong>. Depuis Java 8, les interfaces peuvent avoir des méthodes <strong>default</strong>.',
            code: {
              filename: 'Interfaces.java',
              src: 'interface Affichable {\n    void afficher();\n\n    default String getDescription() {\n        return "Objet affichable";\n    }\n}\n\ninterface Sauvegardable {\n    void sauvegarder();\n}\n\npublic class Document implements Affichable, Sauvegardable {\n    private String contenu;\n\n    public Document(String contenu) { this.contenu = contenu; }\n\n    @Override\n    public void afficher() { System.out.println(contenu); }\n\n    @Override\n    public void sauvegarder() { System.out.println("Sauvegardé !"); }\n}'
            }
          },
          {
            type: 'theory',
            title: 'Interface fonctionnelle',
            content: 'Une <strong>interface fonctionnelle</strong> ne contient qu\'une seule méthode abstraite. Elle peut être utilisée avec des <strong>lambdas</strong>. L\'annotation <code>@FunctionalInterface</code> garantit cette contrainte.',
            code: {
              filename: 'Fonctionnelle.java',
              src: '@FunctionalInterface\ninterface Calculateur {\n    int calculer(int a, int b);\n}\n\nCalculateur addition = (a, b) -> a + b;\nCalculateur produit  = (a, b) -> a * b;\n\nSystem.out.println(addition.calculer(3, 4)); // 7\nSystem.out.println(produit.calculer(3, 4));  // 12'
            }
          },
          {
            type: 'quiz',
            question: 'Combien de classes parentes directes une classe Java peut-elle avoir ?',
            options: ['Autant qu\'elle veut', '2 maximum', '1 seulement', '3 maximum'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Java autorise l\'héritage simple. Mais on peut implémenter plusieurs interfaces.',
            errorMsg: 'Java n\'autorise l\'héritage que d\'une seule classe. Pour le multiple, on utilise les interfaces.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une interface Dessinable avec une méthode dessiner(). Crée une classe Carre qui l\'implémente et affiche "Dessin d\'un carré" dans dessiner().',
            placeholder: 'interface Dessinable {\n    // Méthode dessiner()\n}\n\nclass Carre implements Dessinable {\n    // Implémentation\n}',
            filename: 'Dessinable.java',
            xp: 35,
            hint: '@Override public void dessiner() { System.out.println("..."); }',
            validator: (code: string) => code.includes('interface') && code.includes('implements') && code.includes('@Override')
          }
        ]
      }
    ]
  },
  {
    icon: '🗂️',
    title: 'Collections',
    lessons: [
      {
        title: 'ArrayList et HashSet',
        subtitle: 'Listes et ensembles dynamiques',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'ArrayList : liste dynamique',
            content: '<strong>ArrayList</strong> est une liste dynamique (taille variable) du package <code>java.util</code>. Elle supporte les <strong>generics</strong> (<code>&lt;T&gt;</code>) pour typer les éléments. Méthodes clés : <code>add()</code>, <code>get(i)</code>, <code>remove()</code>, <code>size()</code>, <code>contains()</code>.',
            code: {
              filename: 'ArrayList.java',
              src: 'import java.util.ArrayList;\n\nArrayList<String> fruits = new ArrayList<>();\nfruits.add("Pomme");\nfruits.add("Banane");\nfruits.add("Cerise");\n\nSystem.out.println(fruits.size());           // 3\nSystem.out.println(fruits.get(1));           // Banane\nfruits.remove("Banane");\nSystem.out.println(fruits.contains("Cerise")); // true\n\nfor (String f : fruits) {\n    System.out.println(f);\n}'
            }
          },
          {
            type: 'theory',
            title: 'HashSet et Iterator',
            content: '<strong>HashSet</strong> est un ensemble sans doublons et sans ordre garanti. <strong>Iterator</strong> permet de parcourir une collection tout en supprimant des éléments sans provoquer de <code>ConcurrentModificationException</code>.',
            code: {
              filename: 'HashSet.java',
              src: 'import java.util.*;\n\nHashSet<String> langages = new HashSet<>();\nlangages.add("Java");\nlangages.add("Python");\nlangages.add("Java"); // doublon ignoré\nSystem.out.println(langages.size()); // 2\n\n// Iterator pour suppression en cours de parcours\nIterator<String> it = langages.iterator();\nwhile (it.hasNext()) {\n    if (it.next().equals("Python")) it.remove();\n}\nSystem.out.println(langages); // [Java]'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle collection Java interdit les doublons ?',
            options: ['ArrayList', 'LinkedList', 'HashSet', 'ArrayDeque'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! HashSet garantit l\'unicité des éléments.',
            errorMsg: 'C\'est HashSet qui refuse les doublons. ArrayList et LinkedList les acceptent.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une ArrayList<Integer> avec 5 nombres, trie-la avec Collections.sort(), puis affiche chaque élément.',
            placeholder: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nombres = new ArrayList<>();\n        // Ajoute 5 nombres\n        // Trie\n        // Affiche\n    }\n}',
            filename: 'Main.java',
            xp: 35,
            hint: 'Collections.sort(nombres); puis for (int n : nombres) { System.out.println(n); }',
            validator: (code: string) => code.includes('ArrayList') && code.includes('Collections.sort') && code.includes('add')
          }
        ]
      },
      {
        title: 'HashMap et generics',
        subtitle: 'Paires clé-valeur et types génériques',
        type: 'theory',
        time: '14 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'HashMap : dictionnaire Java',
            content: '<strong>HashMap</strong> stocke des paires <strong>clé-valeur</strong>. Chaque clé est unique. Méthodes : <code>put(clé, val)</code>, <code>get(clé)</code>, <code>containsKey()</code>, <code>keySet()</code>, <code>values()</code>, <code>entrySet()</code> pour parcourir.',
            code: {
              filename: 'HashMap.java',
              src: 'import java.util.HashMap;\n\nHashMap<String, Integer> scores = new HashMap<>();\nscores.put("Alice", 95);\nscores.put("Bob", 78);\nscores.put("Charlie", 88);\n\nSystem.out.println(scores.get("Alice"));      // 95\nSystem.out.println(scores.containsKey("Bob")); // true\n\nfor (var entry : scores.entrySet()) {\n    System.out.println(entry.getKey() + " : " + entry.getValue());\n}'
            }
          },
          {
            type: 'theory',
            title: 'Les generics <T>',
            content: 'Les <strong>generics</strong> permettent d\'écrire du code réutilisable typé. On définit un paramètre de type <code>T</code> qui sera remplacé à l\'utilisation. Cela évite les casts et les erreurs de type à l\'exécution.',
            code: {
              filename: 'Generics.java',
              src: 'public class Paire<A, B> {\n    private A premier;\n    private B second;\n\n    public Paire(A premier, B second) {\n        this.premier = premier;\n        this.second = second;\n    }\n\n    public A getPremier() { return premier; }\n    public B getSecond() { return second; }\n}\n\nPaire<String, Integer> p = new Paire<>("Java", 2024);\nSystem.out.println(p.getPremier()); // Java\nSystem.out.println(p.getSecond()); // 2024'
            }
          },
          {
            type: 'quiz',
            question: 'Dans HashMap<String, Integer>, que représente Integer ?',
            options: ['Le type de la clé', 'Le type de la valeur', 'La taille maximale', 'Le type de l\'index'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! HashMap<K, V> : K = type des clés, V = type des valeurs.',
            errorMsg: 'HashMap<K, V> : K est le type des clés, V est le type des valeurs. Ici Integer est le type des valeurs.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète les appels sur la HashMap :',
            xp: 20,
            parts: [
              { type: 'text', value: 'HashMap<String, Integer> map = new HashMap<>();\nmap.' },
              { type: 'blank', placeholder: 'méthode', correct: 'put' },
              { type: 'text', value: '("Java", 30);\nint val = map.' },
              { type: 'blank', placeholder: 'méthode', correct: 'get' },
              { type: 'text', value: '("Java");' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🚨',
    title: 'Exceptions',
    lessons: [
      {
        title: 'Gérer les exceptions',
        subtitle: 'try/catch/finally, throw et throws',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'try / catch / finally',
            content: 'En Java, les erreurs à l\'exécution sont des <strong>exceptions</strong>. On les gère avec <code>try</code> (code risqué), <code>catch</code> (traitement de l\'erreur) et <code>finally</code> (code toujours exécuté, idéal pour libérer des ressources).',
            code: {
              filename: 'TryCatch.java',
              src: 'try {\n    int[] tab = {1, 2, 3};\n    System.out.println(tab[10]); // index invalide\n} catch (ArrayIndexOutOfBoundsException e) {\n    System.out.println("Erreur : " + e.getMessage());\n} finally {\n    System.out.println("Toujours exécuté");\n}'
            }
          },
          {
            type: 'theory',
            title: 'throw, throws et exceptions custom',
            content: '<code>throw</code> lance explicitement une exception. <code>throws</code> dans la signature d\'une méthode signale qu\'elle peut lever une exception. Les <strong>checked exceptions</strong> (extends Exception) doivent être gérées. Les <strong>unchecked</strong> (extends RuntimeException) sont optionnelles.',
            callout: {
              kind: 'info',
              icon: '🏗️',
              title: 'Créer ses propres exceptions',
              text: 'Hérite de RuntimeException pour une exception non-contrôlée. Hérite de Exception pour une exception vérifiée au compile-time.'
            },
            code: {
              filename: 'CustomException.java',
              src: 'public class SoldeInsuffisantException extends RuntimeException {\n    public SoldeInsuffisantException(double montant) {\n        super("Solde insuffisant pour retirer " + montant + " €");\n    }\n}\n\nclass Compte {\n    private double solde = 100;\n\n    public void retirer(double montant) {\n        if (montant > solde) throw new SoldeInsuffisantException(montant);\n        solde -= montant;\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Le bloc finally est-il toujours exécuté ?',
            options: [
              'Seulement si une exception est lancée',
              'Seulement si aucune exception n\'est lancée',
              'Toujours, qu\'il y ait exception ou non',
              'Seulement si catch a été exécuté'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! finally s\'exécute toujours — c\'est son principal intérêt.',
            errorMsg: 'finally s\'exécute toujours, même en cas d\'exception ou de return.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une méthode diviser(int a, int b) qui lance une ArithmeticException si b == 0, et appelle-la dans un try/catch.',
            placeholder: 'public class Main {\n    static int diviser(int a, int b) {\n        // Lance ArithmeticException si b == 0\n        return a / b;\n    }\n\n    public static void main(String[] args) {\n        try {\n            System.out.println(diviser(10, 0));\n        } catch (ArithmeticException e) {\n            System.out.println("Erreur : " + e.getMessage());\n        }\n    }\n}',
            filename: 'Main.java',
            xp: 40,
            hint: 'if (b == 0) throw new ArithmeticException("Division par zéro");',
            validator: (code: string) => code.includes('throw') && code.includes('catch') && code.includes('ArithmeticException')
          }
        ]
      }
    ]
  },
  {
    icon: '🌊',
    title: 'Streams et Lambda',
    lessons: [
      {
        title: 'Lambda et Stream API',
        subtitle: 'Programmation fonctionnelle Java 8+',
        type: 'theory',
        time: '18 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Les expressions lambda',
            content: 'Depuis Java 8, les <strong>lambdas</strong> permettent d\'écrire des fonctions anonymes concises. Syntaxe : <code>(paramètres) -&gt; expression</code>. Elles remplacent les classes anonymes pour les interfaces fonctionnelles. Les <strong>method references</strong> (<code>Classe::méthode</code>) sont encore plus concises.',
            code: {
              filename: 'Lambda.java',
              src: 'import java.util.*;\n\nList<String> noms = Arrays.asList("Charlie", "Alice", "Bob");\n\n// Lambda pour trier\nnoms.sort((a, b) -> a.compareTo(b));\n\n// forEach avec lambda\nnoms.forEach(n -> System.out.println(n));\n\n// Method reference (encore plus court)\nnoms.forEach(System.out::println);\n\n// Lambda pour Runnable\nRunnable r = () -> System.out.println("Thread !");\nnew Thread(r).start();'
            }
          },
          {
            type: 'theory',
            title: 'Stream.filter, map et collect',
            content: 'L\'<strong>API Stream</strong> traite des collections de façon déclarative. Les opérations intermédiaires (<code>filter</code>, <code>map</code>, <code>sorted</code>) sont paresseuses. Une opération terminale (<code>collect</code>, <code>forEach</code>, <code>count</code>) déclenche tout le traitement.',
            callout: {
              kind: 'tip',
              icon: '⚡',
              title: 'Streams vs boucles',
              text: 'Les streams brillent pour des transformations en chaîne. Pour une logique simple ou une performance critique, une boucle for peut être plus claire.'
            },
            code: {
              filename: 'Streams.java',
              src: 'import java.util.*;\nimport java.util.stream.*;\n\nList<Integer> nombres = Arrays.asList(1,2,3,4,5,6,7,8,9,10);\n\n// Filter + map + collect\nList<Integer> pairs = nombres.stream()\n    .filter(n -> n % 2 == 0)\n    .map(n -> n * n)\n    .collect(Collectors.toList());\n\nSystem.out.println(pairs); // [4, 16, 36, 64, 100]\n\n// Optional\nOptional<Integer> premier = nombres.stream()\n    .filter(n -> n > 5)\n    .findFirst();\npremier.ifPresent(v -> System.out.println("Premier > 5 : " + v));'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle opération Stream déclenche réellement le traitement ?',
            options: ['filter()', 'map()', 'sorted()', 'collect()'],
            correct: 3,
            xp: 15,
            successMsg: 'Exact ! collect() (et forEach, count, etc.) sont des opérations terminales qui déclenchent le pipeline.',
            errorMsg: 'filter, map, sorted sont des opérations intermédiaires paresseuses. collect() déclenche tout.'
          },
          {
            type: 'code-challenge',
            instructions: 'Avec la liste Arrays.asList(1,2,3,4,5,6,7,8,9,10), utilise un Stream pour filtrer les nombres impairs, les multiplier par 2, et les afficher avec forEach.',
            placeholder: 'import java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nombres = Arrays.asList(1,2,3,4,5,6,7,8,9,10);\n        // Ton stream ici\n    }\n}',
            filename: 'Main.java',
            xp: 45,
            hint: '.stream().filter(n -> n % 2 != 0).map(n -> n * 2).forEach(System.out::println)',
            validator: (code: string) => code.includes('.stream()') && code.includes('filter') && code.includes('map')
          }
        ]
      }
    ]
  }
]
