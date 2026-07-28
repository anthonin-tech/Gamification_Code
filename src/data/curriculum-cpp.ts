import type { CourseModule } from '@/types/cours'

export const CURRICULUM_CPP: CourseModule[] = [
  {
    icon: '⚙️',
    title: 'Introduction à C++',
    lessons: [
      {
        title: 'Hello World en C++',
        subtitle: 'Structure d\'un programme C++ et compilation',
        type: 'theory',
        time: '12 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'La structure d\'un programme C++',
            content: 'Un programme C++ commence toujours par des <strong>directives d\'inclusion</strong> (<code>#include</code>), suivi d\'une fonction principale <code>int main()</code>. C++ est un sur-ensemble du C : tout programme C valide est (presque) un programme C++ valide, mais C++ apporte la <strong>programmation orientée objet</strong>, les <strong>templates</strong> et bien plus.',
            code: {
              filename: 'main.cpp',
              src: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Bonjour, monde !" << endl;\n    return 0;\n}'
            }
          },
          {
            type: 'theory',
            title: 'Compilation avec g++',
            content: 'Contrairement à Python, C++ est un langage <strong>compilé</strong>. Tu dois transformer ton code source en exécutable avec le compilateur <code>g++</code>. La commande <code>g++ main.cpp -o mon_programme</code> crée un fichier exécutable. Pour utiliser le C++ moderne, ajoute le flag <code>-std=c++17</code>.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Différence C vs C++',
              text: 'En C, on utilise printf/scanf depuis <stdio.h>. En C++, on préfère cout/cin depuis <iostream>. C++ ajoute aussi les classes, les références, les exceptions et la bibliothèque standard (STL).'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle directive inclut la bibliothèque d\'entrées/sorties en C++ ?',
            options: ['#include <stdio.h>', '#include <iostream>', '#import iostream', '#use iostream'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! <iostream> fournit cout et cin pour les entrées/sorties.',
            errorMsg: 'En C++, c\'est #include <iostream> qui donne accès à cout et cin.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un programme C++ complet qui affiche "C++ est puissant !" avec cout.',
            placeholder: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // ton code ici\n    return 0;\n}',
            filename: 'main.cpp',
            xp: 30,
            validator: (code: string) => code.includes('cout') && code.includes('C++ est puissant'),
            hint: 'Utilise cout << "C++ est puissant !" << endl;'
          }
        ]
      },
      {
        title: 'cin et les entrées utilisateur',
        subtitle: 'Lire des données depuis le clavier',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Lire avec cin',
            content: '<code>cin</code> (character input) permet de lire une valeur saisie par l\'utilisateur. On utilise l\'opérateur <code>>></code> (extraction). Pour afficher, on utilise <code>cout</code> avec <code><<</code> (insertion). Le flux <code>endl</code> ajoute un retour à la ligne <em>et</em> vide le tampon.',
            code: {
              filename: 'main.cpp',
              src: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    cout << "Quel est ton âge ? ";\n    cin >> age;\n    cout << "Tu as " << age << " ans." << endl;\n    return 0;\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quel opérateur utilise-t-on avec cin pour lire une variable ?',
            options: ['<<', '>>', '->', '::'],
            correct: 1,
            xp: 15,
            successMsg: 'Correct ! >> est l\'opérateur d\'extraction de cin.',
            errorMsg: 'cin utilise >> (opérateur d\'extraction). cout utilise << (opérateur d\'insertion).'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète le code pour afficher un message puis lire un nom :',
            xp: 20,
            parts: [
              { type: 'text', value: 'cout ' },
              { type: 'blank', placeholder: 'opérateur', correct: '<<' },
              { type: 'text', value: ' "Nom : ";\ncin ' },
              { type: 'blank', placeholder: 'opérateur', correct: '>>' },
              { type: 'text', value: ' nom;' }
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
        title: 'Types fondamentaux',
        subtitle: 'int, float, double, char, bool',
        type: 'theory',
        time: '14 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Les types de base',
            content: 'C++ est un langage à <strong>typage statique</strong> : chaque variable a un type fixé à la compilation. Les types fondamentaux sont : <code>int</code> (entier 32 bits), <code>long</code> (entier 64 bits), <code>float</code> (décimal simple précision), <code>double</code> (décimal double précision), <code>char</code> (caractère ASCII), <code>bool</code> (vrai/faux).',
            code: {
              filename: 'types.cpp',
              src: 'int age = 25;\nlong population = 8000000000L;\nfloat prix = 9.99f;\ndouble pi = 3.14159265358979;\nchar lettre = \'A\';\nbool actif = true;\n\ncout << sizeof(int) << " octets" << endl;    // 4\ncout << sizeof(double) << " octets" << endl; // 8'
            }
          },
          {
            type: 'theory',
            title: 'std::string et auto',
            content: 'Contrairement au C qui utilise des tableaux de caractères (<code>char[]</code>), C++ fournit la classe <code>std::string</code> bien plus pratique. Elle gère automatiquement la mémoire et offre de nombreuses méthodes. Depuis C++11, le mot-clé <code>auto</code> laisse le compilateur déduire le type : <code>auto x = 42;</code> crée un <code>int</code>.',
            code: {
              filename: 'string.cpp',
              src: '#include <string>\nusing namespace std;\n\nstring prenom = "Alice";\nstring nom = "Dupont";\nstring complet = prenom + " " + nom;\ncout << complet.length() << endl;   // 12\n\nauto nb = 42;          // int déduit\nauto pi = 3.14;        // double déduit'
            },
            callout: {
              kind: 'info',
              icon: 'ℹ️',
              title: 'Déclaration vs initialisation',
              text: 'Déclarer une variable sans valeur laisse son contenu indéfini (comportement indéterminé). Initialise toujours tes variables : int x = 0; ou int x{0};'
            }
          },
          {
            type: 'quiz',
            question: 'Quel type C++ utilise-t-on pour un nombre décimal haute précision ?',
            options: ['float', 'decimal', 'double', 'real'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! double offre une précision de ~15 chiffres significatifs.',
            errorMsg: 'double est le type décimal standard en C++. float est moins précis (~7 chiffres).'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare une variable string appelée "message" contenant "Vive C++" et affiche sa longueur avec .length().',
            placeholder: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // ton code ici\n    return 0;\n}',
            filename: 'types.cpp',
            xp: 30,
            validator: (code: string) => code.includes('string') && code.includes('length') && code.includes('Vive C++'),
            hint: 'string message = "Vive C++"; puis cout << message.length();'
          }
        ]
      },
      {
        title: 'const et sizeof',
        subtitle: 'Constantes et taille des types',
        type: 'theory',
        time: '10 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'Constantes avec const et constexpr',
            content: 'Le mot-clé <code>const</code> rend une variable immuable après initialisation. C\'est une bonne pratique de marquer toutes les valeurs qui ne changent pas. En C++ moderne, <code>constexpr</code> va plus loin : la valeur est calculée à la <strong>compilation</strong>, ce qui peut améliorer les performances.',
            code: {
              filename: 'const.cpp',
              src: 'const double PI = 3.14159;\nconst int MAX_SIZE = 100;\nconstexpr int CARRE = 5 * 5; // calculé à la compilation\n\n// PI = 3.14; // ERREUR : ne peut pas modifier une const\ncout << sizeof(int) << endl;   // 4 octets\ncout << sizeof(double) << endl; // 8 octets'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait l\'opérateur sizeof() en C++ ?',
            options: [
              'Retourne la longueur d\'une chaîne',
              'Retourne la taille en octets d\'un type ou d\'une variable',
              'Redimensionne un tableau',
              'Compte les éléments d\'un vecteur'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Parfait ! sizeof(int) retourne 4 sur la plupart des architectures 64 bits.',
            errorMsg: 'sizeof retourne la taille mémoire en octets d\'un type ou d\'une variable.'
          },
          {
            type: 'fill-blank',
            instructions: 'Déclare une constante PI avec la bonne valeur :',
            xp: 20,
            parts: [
              { type: 'blank', placeholder: 'mot-clé', correct: 'const' },
              { type: 'text', value: ' double PI = ' },
              { type: 'blank', placeholder: 'valeur', correct: '3.14159' },
              { type: 'text', value: ';' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '⚡',
    title: 'Opérateurs',
    lessons: [
      {
        title: 'Opérateurs arithmétiques et de comparaison',
        subtitle: '+, -, *, /, %, ==, !=, <, >',
        type: 'theory',
        time: '12 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Arithmétique et modulo',
            content: 'C++ supporte les opérateurs arithmétiques classiques : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>. L\'opérateur <code>%</code> (modulo) donne le reste de la division entière. Attention : la division entre deux entiers donne un entier (<code>7/2 = 3</code>). Pour un résultat décimal, convertir en <code>double</code> : <code>(double)7/2 = 3.5</code>.',
            code: {
              filename: 'operateurs.cpp',
              src: 'int a = 17, b = 5;\ncout << a + b << endl;  // 22\ncout << a - b << endl;  // 12\ncout << a * b << endl;  // 85\ncout << a / b << endl;  // 3 (division entière)\ncout << a % b << endl;  // 2 (reste)\ncout << (double)a / b;  // 3.4'
            }
          },
          {
            type: 'theory',
            title: 'Incrémentation et opérateurs composés',
            content: 'L\'incrémentation <code>++</code> ajoute 1 à une variable, <code>--</code> en soustrait 1. La forme <code>i++</code> (post-fixe) retourne la valeur avant modification ; <code>++i</code> (pré-fixe) retourne la valeur après. Les opérateurs composés <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code> combinent opération et affectation.',
            code: {
              filename: 'increment.cpp',
              src: 'int i = 5;\ncout << i++ << endl; // affiche 5, i devient 6\ncout << ++i << endl; // i devient 7, affiche 7\ni += 3;  // i = 10\ni *= 2;  // i = 20'
            }
          },
          {
            type: 'quiz',
            question: 'Que vaut 15 % 4 en C++ ?',
            options: ['3', '3.75', '4', '1'],
            correct: 0,
            xp: 15,
            successMsg: 'Correct ! 15 = 4*3 + 3, donc le reste est 3.',
            errorMsg: 'Le modulo (%) donne le reste : 15 = 4*3 + 3, donc 15 % 4 = 3.'
          }
        ]
      },
      {
        title: 'Opérateurs logiques',
        subtitle: '&&, ||, !, priorité des opérateurs',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Logique booléenne',
            content: 'Les opérateurs logiques travaillent sur des <code>bool</code> : <code>&&</code> (ET logique), <code>||</code> (OU logique), <code>!</code> (NON logique). Ils utilisent l\'<strong>évaluation court-circuit</strong> : si la première partie de <code>&&</code> est fausse, la seconde n\'est pas évaluée. <code>&&</code> est prioritaire sur <code>||</code>.',
            code: {
              filename: 'logique.cpp',
              src: 'bool a = true, b = false;\ncout << (a && b) << endl; // 0 (false)\ncout << (a || b) << endl; // 1 (true)\ncout << (!a)    << endl; // 0 (false)\n\nint x = 10;\ncout << (x > 5 && x < 20) << endl; // 1 (true)'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne l\'expression (true && false || true) ?',
            options: ['false', 'true', 'erreur de compilation', '0'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! && est prioritaire sur || : (true && false) || true = false || true = true.',
            errorMsg: '&& est évalué avant || : (true && false) || true = false || true = true.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la condition pour vérifier qu\'un nombre est entre 0 et 100 :',
            xp: 20,
            parts: [
              { type: 'text', value: 'if (x >= 0 ' },
              { type: 'blank', placeholder: 'opérateur', correct: '&&' },
              { type: 'text', value: ' x <= 100)' }
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
        title: 'if / else et switch',
        subtitle: 'Contrôle du flux d\'exécution',
        type: 'theory',
        time: '14 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Conditions if/else',
            content: 'La structure <code>if</code> exécute un bloc si une condition est vraie. <code>else if</code> enchaîne des conditions alternatives. <code>else</code> capture tous les autres cas. La condition peut être n\'importe quelle expression qui se convertit en booléen (0 est faux, tout autre entier est vrai).',
            code: {
              filename: 'conditions.cpp',
              src: 'int note = 75;\n\nif (note >= 90) {\n    cout << "Excellent" << endl;\n} else if (note >= 70) {\n    cout << "Bien" << endl;\n} else if (note >= 50) {\n    cout << "Passable" << endl;\n} else {\n    cout << "Insuffisant" << endl;\n}'
            }
          },
          {
            type: 'theory',
            title: 'switch/case',
            content: 'Le <code>switch</code> compare une variable entière ou un caractère à plusieurs valeurs. Chaque <code>case</code> doit se terminer par <code>break</code> pour éviter le <strong>fall-through</strong> (exécution des cases suivants). Le <code>default</code> gère les cas non prévus.',
            code: {
              filename: 'switch.cpp',
              src: 'char grade = \'B\';\n\nswitch (grade) {\n    case \'A\':\n        cout << "Excellent" << endl;\n        break;\n    case \'B\':\n        cout << "Bien" << endl;\n        break;\n    case \'C\':\n        cout << "Moyen" << endl;\n        break;\n    default:\n        cout << "Invalide" << endl;\n}'
            },
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'N\'oublie pas le break !',
              text: 'Sans break, l\'exécution continue dans les cases suivants (fall-through). C\'est parfois voulu, mais souvent un bug difficile à repérer.'
            }
          },
          {
            type: 'quiz',
            question: 'Que se passe-t-il si on oublie un break dans un switch ?',
            options: [
              'Erreur de compilation',
              'L\'exécution s\'arrête au prochain case',
              'L\'exécution continue dans les cases suivants (fall-through)',
              'Le switch est ignoré'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exactement ! Le fall-through est un comportement connu en C/C++.',
            errorMsg: 'Sans break, le fall-through fait s\'exécuter les cases suivants jusqu\'au prochain break ou la fin du switch.'
          }
        ]
      },
      {
        title: 'Boucles for, while et do-while',
        subtitle: 'Répéter des instructions',
        type: 'theory',
        time: '15 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'La boucle for classique et range-based',
            content: 'La boucle <code>for</code> est idéale quand on connaît à l\'avance le nombre d\'itérations. Sa syntaxe est <code>for (init; condition; incrément)</code>. Depuis C++11, le <strong>range-based for</strong> parcourt simplement une collection sans gestion manuelle des indices.',
            code: {
              filename: 'boucles.cpp',
              src: '// for classique\nfor (int i = 0; i < 5; i++) {\n    cout << i << " ";\n}\n// Affiche : 0 1 2 3 4\n\n// range-based for (C++11)\n#include <vector>\nvector<int> nums = {10, 20, 30};\nfor (int n : nums) {\n    cout << n << " ";\n}\n// Affiche : 10 20 30'
            }
          },
          {
            type: 'theory',
            title: 'while et do-while',
            content: 'La boucle <code>while</code> vérifie la condition <em>avant</em> chaque itération. La boucle <code>do-while</code> exécute le corps au moins une fois, puis vérifie la condition. <code>break</code> sort immédiatement de la boucle ; <code>continue</code> passe à l\'itération suivante.',
            code: {
              filename: 'while.cpp',
              src: '// while\nint n = 1;\nwhile (n <= 5) {\n    cout << n++ << " ";\n}\n// Affiche : 1 2 3 4 5\n\n// do-while : exécuté au moins une fois\nint choix;\ndo {\n    cout << "Entrez 1 ou 2 : ";\n    cin >> choix;\n} while (choix != 1 && choix != 2);'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle boucle garantit une exécution d\'au moins une fois ?',
            options: ['for', 'while', 'do-while', 'foreach'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! do-while évalue la condition après l\'exécution du corps.',
            errorMsg: 'do-while est la seule boucle dont le corps s\'exécute au moins une fois avant de vérifier la condition.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une boucle for qui affiche les nombres de 1 à 10, en sautant les multiples de 3 avec continue.',
            placeholder: '#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        // utilise continue ici\n        cout << i << " ";\n    }\n    return 0;\n}',
            filename: 'boucle_continue.cpp',
            xp: 35,
            validator: (code: string) => code.includes('continue') && code.includes('% 3') || code.includes('%3'),
            hint: 'if (i % 3 == 0) continue; avant le cout.'
          }
        ]
      }
    ]
  },
  {
    icon: '🔤',
    title: 'Strings et I/O',
    lessons: [
      {
        title: 'Méthodes des strings',
        subtitle: 'length, substr, find, replace, at',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Manipuler std::string',
            content: 'La classe <code>std::string</code> offre de nombreuses méthodes. <code>length()</code> ou <code>size()</code> retourne la taille. <code>substr(pos, len)</code> extrait une sous-chaîne. <code>find(str)</code> cherche une sous-chaîne et retourne sa position (ou <code>string::npos</code> si non trouvée). <code>at(i)</code> accède au caractère à l\'index i avec vérification de bornes, contrairement à <code>[]</code> qui est non sécurisé.',
            code: {
              filename: 'string_methods.cpp',
              src: 'string s = "Bonjour le monde";\ncout << s.length() << endl;         // 16\ncout << s.substr(8, 2) << endl;     // "le"\ncout << s.find("monde") << endl;    // 11\ncout << s.at(0) << endl;            // \'B\'\n\n// find retourne string::npos si non trouvé\nif (s.find("salut") == string::npos)\n    cout << "Non trouvé" << endl;\n\n// replace(pos, longueur, nouveau)\ns.replace(0, 7, "Salut");\ncout << s << endl; // "Salut le monde"'
            }
          },
          {
            type: 'theory',
            title: 'getline et cin.ignore',
            content: '<code>cin >> variable</code> s\'arrête aux espaces. Pour lire une ligne entière avec des espaces, utilise <code>getline(cin, variable)</code>. Si tu mixes <code>cin >></code> et <code>getline</code>, utilise <code>cin.ignore()</code> entre les deux pour vider le \'\\n\' restant dans le tampon.',
            code: {
              filename: 'getline.cpp',
              src: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nom, phrase;\n    cout << "Nom : ";\n    cin >> nom;\n    cin.ignore(); // vide le \\n restant\n    cout << "Une phrase : ";\n    getline(cin, phrase);\n    cout << "Bonjour " << nom << ", tu as dit : " << phrase;\n}'
            },
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'cin.ignore() est souvent oublié',
              text: 'Après cin >> x, un \\n reste dans le tampon. getline() va le lire immédiatement et sembler "sauter" la saisie. cin.ignore() vide ce caractère résiduel.'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne string::npos ?',
            options: [
              '-1',
              'La valeur maximale d\'un size_t (signifiant "non trouvé")',
              '0',
              'Une exception std::out_of_range'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! npos est la valeur sentinelle qui indique qu\'une recherche n\'a rien trouvé.',
            errorMsg: 'string::npos est la valeur maximale de size_t, utilisée comme sentinelle pour "non trouvé".'
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
        title: 'Déclarer et appeler des fonctions',
        subtitle: 'Prototypes, surcharge, valeurs par défaut',
        type: 'theory',
        time: '15 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Déclaration, définition et prototypes',
            content: 'Une <strong>déclaration</strong> (prototype) informe le compilateur de l\'existence d\'une fonction. La <strong>définition</strong> contient le code. En plaçant les prototypes en tête de fichier, tu peux définir les fonctions dans n\'importe quel ordre. Une fonction sans valeur de retour utilise <code>void</code>.',
            code: {
              filename: 'fonctions.cpp',
              src: '#include <iostream>\nusing namespace std;\n\n// Prototype\nint addition(int a, int b);\n\nint main() {\n    cout << addition(3, 4) << endl; // 7\n    return 0;\n}\n\n// Définition\nint addition(int a, int b) {\n    return a + b;\n}'
            }
          },
          {
            type: 'theory',
            title: 'Surcharge et paramètres par défaut',
            content: 'C++ permet la <strong>surcharge de fonctions</strong> : plusieurs fonctions peuvent avoir le même nom si leurs signatures diffèrent. On peut aussi définir des <strong>paramètres par défaut</strong> qui sont utilisés quand l\'argument n\'est pas fourni à l\'appel.',
            code: {
              filename: 'surcharge.cpp',
              src: '// Surcharge\nint max(int a, int b) { return a > b ? a : b; }\ndouble max(double a, double b) { return a > b ? a : b; }\n\n// Paramètre par défaut\nvoid saluer(string nom, string salut = "Bonjour") {\n    cout << salut << ", " << nom << "!" << endl;\n}\n\nsaluer("Alice");          // "Bonjour, Alice!"\nsaluer("Bob", "Salut");   // "Salut, Bob!"'
            }
          },
          {
            type: 'theory',
            title: 'Passage par valeur vs par référence',
            content: 'Par <strong>valeur</strong>, la fonction reçoit une copie — modifier le paramètre n\'affecte pas l\'original. Par <strong>référence</strong> (<code>&</code>), la fonction travaille directement sur la variable originale. C\'est plus efficace pour les grands objets et indispensable pour les fonctions qui modifient leurs arguments.',
            code: {
              filename: 'reference.cpp',
              src: 'void doubler_valeur(int x)  { x *= 2; }  // copie\nvoid doubler_ref(int& x)    { x *= 2; }  // référence\n\nint a = 5;\ndoubler_valeur(a); cout << a << endl; // 5 (inchangé)\ndoubler_ref(a);    cout << a << endl; // 10 (modifié)'
            }
          },
          {
            type: 'quiz',
            question: 'Que se passe-t-il si tu modifies un paramètre passé par valeur ?',
            options: [
              'L\'original est modifié',
              'Une erreur de compilation survient',
              'Seule la copie locale est modifiée, l\'original reste intact',
              'Le programme plante'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Correct ! Le passage par valeur crée une copie indépendante.',
            errorMsg: 'Avec le passage par valeur, la fonction reçoit une copie. L\'original n\'est pas touché.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction swap(int& a, int& b) qui échange les valeurs de deux entiers, puis teste-la dans main.',
            placeholder: '#include <iostream>\nusing namespace std;\n\n// ta fonction swap ici\n\nint main() {\n    int x = 10, y = 20;\n    swap(x, y);\n    cout << x << " " << y << endl; // doit afficher 20 10\n    return 0;\n}',
            filename: 'swap.cpp',
            xp: 40,
            validator: (code: string) => code.includes('int&') && code.includes('swap'),
            hint: 'Utilise une variable temporaire : int temp = a; a = b; b = temp;'
          }
        ]
      },
      {
        title: 'Récursivité',
        subtitle: 'Fonctions qui s\'appellent elles-mêmes',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Le principe de la récursivité',
            content: 'Une fonction <strong>récursive</strong> s\'appelle elle-même. Elle doit avoir un <strong>cas de base</strong> (condition d\'arrêt) et un <strong>cas récursif</strong> (appel avec un problème plus petit). Sans cas de base, la récursion est infinie et provoque un <em>stack overflow</em>.',
            code: {
              filename: 'recursion.cpp',
              src: '#include <iostream>\nusing namespace std;\n\nint factorielle(int n) {\n    if (n <= 1) return 1;          // cas de base\n    return n * factorielle(n - 1); // cas récursif\n}\n\nint main() {\n    cout << factorielle(5) << endl; // 120\n    // 5 * 4 * 3 * 2 * 1 = 120\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Qu\'est-ce qu\'un cas de base dans une fonction récursive ?',
            options: [
              'Le premier appel de la fonction',
              'La condition d\'arrêt qui empêche la récursion infinie',
              'Le dernier paramètre de la fonction',
              'Un appel à une autre fonction'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exactement ! Sans cas de base, la récursion serait infinie.',
            errorMsg: 'Le cas de base est la condition qui stoppe la récursion. Sans lui, on aurait un stack overflow.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la fonction fibonacci récursive :',
            xp: 25,
            parts: [
              { type: 'text', value: 'int fib(int n) {\n    if (n <= 1) ' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'return' },
              { type: 'text', value: ' n;\n    return fib(n-1) + fib(n-' },
              { type: 'blank', placeholder: 'valeur', correct: '2' },
              { type: 'text', value: ');\n}' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '📋',
    title: 'Tableaux et vecteurs',
    lessons: [
      {
        title: 'Tableaux statiques et std::array',
        subtitle: 'int arr[], std::array, tableaux 2D',
        type: 'theory',
        time: '13 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Tableaux de taille fixe',
            content: 'Un tableau statique est une séquence de valeurs du même type, de taille fixée à la compilation. L\'accès se fait par indice (base 0). <code>std::array&lt;T,N&gt;</code> (C++11) est une alternative plus sûre qui connaît sa propre taille et est compatible avec les algorithmes STL.',
            code: {
              filename: 'tableaux.cpp',
              src: '#include <array>\nusing namespace std;\n\n// Tableau C classique\nint notes[5] = {15, 12, 18, 9, 14};\ncout << notes[0] << endl; // 15\ncout << notes[4] << endl; // 14\n\n// std::array (C++11) — plus sûr\narray<int, 5> arr = {1, 2, 3, 4, 5};\ncout << arr.size() << endl;   // 5\ncout << arr.at(2) << endl;    // 3 (avec vérif bornes)'
            }
          },
          {
            type: 'theory',
            title: 'Tableaux 2D',
            content: 'Un tableau à deux dimensions est un tableau de tableaux, utile pour représenter des matrices ou des grilles. On le déclare comme <code>int mat[lignes][colonnes]</code> et on y accède avec deux indices.',
            code: {
              filename: 'tableau2d.cpp',
              src: 'int mat[3][3] = {\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9}\n};\n\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        cout << mat[i][j] << " ";\n    }\n    cout << endl;\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quel est le premier indice valide d\'un tableau en C++ ?',
            options: ['1', '-1', '0', 'dépend du tableau'],
            correct: 2,
            xp: 15,
            successMsg: 'Correct ! Les tableaux C++ sont indexés à partir de 0.',
            errorMsg: 'Comme en C, les tableaux C++ commencent à l\'index 0.'
          }
        ]
      },
      {
        title: 'std::vector — tableaux dynamiques',
        subtitle: 'push_back, pop_back, erase, size',
        type: 'theory',
        time: '15 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Le conteneur vector',
            content: '<code>std::vector&lt;T&gt;</code> est un tableau dynamique qui peut grandir ou rétrécir. Inclure <code>&lt;vector&gt;</code>. Les méthodes essentielles : <code>push_back(val)</code> ajoute en fin, <code>pop_back()</code> retire le dernier, <code>size()</code> retourne la taille, <code>at(i)</code> accède avec vérification de bornes, <code>clear()</code> vide le vecteur.',
            code: {
              filename: 'vector.cpp',
              src: '#include <vector>\nusing namespace std;\n\nvector<int> v = {1, 2, 3};\nv.push_back(4);           // {1, 2, 3, 4}\nv.push_back(5);           // {1, 2, 3, 4, 5}\nv.pop_back();             // {1, 2, 3, 4}\ncout << v.size() << endl; // 4\ncout << v.at(1) << endl;  // 2\n\nv.erase(v.begin() + 1);   // supprime index 1 -> {1, 3, 4}'
            }
          },
          {
            type: 'theory',
            title: 'Parcourir un vector',
            content: 'On peut parcourir un vector avec un for classique, un range-based for (C++11) ou des itérateurs. Le range-based for est le plus lisible. Pour modifier les éléments, utilise une référence (<code>int&</code>). Pour la lecture seule, utilise <code>const int&</code> pour éviter les copies inutiles.',
            code: {
              filename: 'parcours_vector.cpp',
              src: 'vector<string> fruits = {"pomme", "banane", "cerise"};\n\n// Lecture avec const ref (évite les copies)\nfor (const string& f : fruits) {\n    cout << f << endl;\n}\n\n// Modification avec ref\nvector<int> vals = {1, 2, 3};\nfor (int& x : vals) {\n    x *= 2; // double chaque élément\n}\n// vals = {2, 4, 6}'
            },
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Utilise const& pour la performance',
              text: 'for (const string& f : fruits) évite de copier chaque chaîne. Préfère toujours const& pour les types non-primitifs dans un range-based for en lecture seule.'
            }
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un vector<int>, ajoute les nombres 10, 20, 30, 40 avec push_back, puis affiche la taille et tous les éléments avec un range-based for.',
            placeholder: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v;\n    // ajoute 10, 20, 30, 40\n    // affiche size() et les éléments\n    return 0;\n}',
            filename: 'vector_ex.cpp',
            xp: 40,
            validator: (code: string) => code.includes('push_back') && code.includes('size') && code.includes('vector'),
            hint: 'v.push_back(10); v.push_back(20); ... puis cout << v.size(); et for (int x : v) cout << x;'
          }
        ]
      }
    ]
  },
  {
    icon: '🔭',
    title: 'Pointeurs et références',
    lessons: [
      {
        title: 'Adresses mémoire et pointeurs',
        subtitle: '& adresse, * déréférence, nullptr',
        type: 'theory',
        time: '18 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'L\'adresse mémoire et les pointeurs',
            content: 'Chaque variable occupe un emplacement en mémoire identifié par une <strong>adresse</strong>. L\'opérateur <code>&</code> donne l\'adresse d\'une variable. Un <strong>pointeur</strong> est une variable qui stocke une adresse. On le déclare avec <code>Type* ptr</code> et on accède à la valeur pointée avec <code>*ptr</code> (déréférencement).',
            code: {
              filename: 'pointeurs.cpp',
              src: 'int x = 42;\nint* ptr = &x;         // ptr = adresse de x\n\ncout << x   << endl;  // 42  (valeur)\ncout << &x  << endl;  // 0x... (adresse)\ncout << ptr << endl;  // 0x... (même adresse)\ncout << *ptr << endl; // 42  (déréférencement)\n\n*ptr = 100;           // modifie x via le pointeur\ncout << x   << endl;  // 100'
            }
          },
          {
            type: 'theory',
            title: 'new / delete et nullptr',
            content: '<code>new</code> alloue de la mémoire sur le <strong>tas</strong> (heap) et retourne un pointeur. La mémoire allouée avec <code>new</code> doit être libérée avec <code>delete</code> pour éviter les <strong>fuites mémoire</strong>. <code>nullptr</code> (C++11) est le pointeur nul sûr — initialise toujours tes pointeurs avec nullptr après delete.',
            code: {
              filename: 'new_delete.cpp',
              src: 'int* p = new int(42);   // alloue un int sur le tas\ncout << *p << endl;     // 42\ndelete p;               // libère la mémoire\np = nullptr;            // bonne pratique\n\n// Tableau dynamique\nint* arr = new int[10];\narr[0] = 5;\ndelete[] arr;           // delete[] pour les tableaux\narr = nullptr;'
            },
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Toujours faire delete après new',
              text: 'Oublier delete provoque une fuite mémoire. En C++ moderne, préfère les smart pointers (unique_ptr) qui gèrent la mémoire automatiquement via RAII.'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait l\'opérateur * appliqué à un pointeur ?',
            options: [
              'Retourne l\'adresse mémoire',
              'Déréférence le pointeur (accède à la valeur pointée)',
              'Multiplie la valeur du pointeur',
              'Crée un nouveau pointeur'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! *ptr déréférence le pointeur pour accéder à la valeur stockée à cette adresse.',
            errorMsg: 'L\'opérateur * sur un pointeur est le déréférencement — il donne accès à la valeur pointée.'
          }
        ]
      },
      {
        title: 'Smart pointers',
        subtitle: 'unique_ptr — gestion automatique de la mémoire',
        type: 'theory',
        time: '12 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'unique_ptr — le smart pointer C++11',
            content: 'En C++ moderne, on évite les pointeurs bruts (<code>new</code>/<code>delete</code>) au profit des <strong>smart pointers</strong>. <code>std::unique_ptr&lt;T&gt;</code> possède exclusivement la ressource et la libère automatiquement quand il sort de portée (principe RAII). Crée avec <code>make_unique&lt;T&gt;()</code> (C++14).',
            code: {
              filename: 'smart_ptr.cpp',
              src: '#include <memory>\nusing namespace std;\n\n// unique_ptr : propriété exclusive\nauto ptr = make_unique<int>(42);\ncout << *ptr << endl;  // 42\n// delete automatique en fin de scope !\n\n// Avec une struct\nstruct Point { int x, y; };\nauto p = make_unique<Point>();\np->x = 10;\np->y = 20;\ncout << p->x << endl; // 10 (accès via ->)'
            }
          },
          {
            type: 'quiz',
            question: 'Quel est l\'avantage principal de unique_ptr sur un pointeur brut ?',
            options: [
              'Il est plus rapide qu\'un pointeur brut',
              'Il libère automatiquement la mémoire en fin de scope (RAII)',
              'Il permet le partage entre plusieurs propriétaires',
              'Il remplace tous les types de données'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Parfait ! RAII : la mémoire est libérée automatiquement à la fin du scope.',
            errorMsg: 'unique_ptr applique le principe RAII : libération automatique en fin de scope, plus de fuite possible.'
          },
          {
            type: 'fill-blank',
            instructions: 'Crée un unique_ptr vers un double avec la valeur 3.14 :',
            xp: 25,
            parts: [
              { type: 'text', value: 'auto ptr = ' },
              { type: 'blank', placeholder: 'fonction', correct: 'make_unique' },
              { type: 'text', value: '<double>(3.14);' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🏗️',
    title: 'Classes et OOP',
    lessons: [
      {
        title: 'Créer une classe',
        subtitle: 'Attributs, constructeur, encapsulation',
        type: 'theory',
        time: '18 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'class vs struct et encapsulation',
            content: 'En C++, <code>class</code> et <code>struct</code> sont presque identiques. La différence : par défaut, les membres d\'une <code>class</code> sont <strong>private</strong>, ceux d\'une <code>struct</code> sont <strong>public</strong>. L\'<strong>encapsulation</strong> protège les données avec des accesseurs (getters/setters).',
            code: {
              filename: 'classe.cpp',
              src: 'class Voiture {\nprivate:\n    string marque;\n    int annee;\n\npublic:\n    Voiture(string m, int a) : marque(m), annee(a) {}\n\n    void afficher() const {\n        cout << marque << " (" << annee << ")" << endl;\n    }\n\n    string getMarque() const { return marque; }\n    void setAnnee(int a) { if (a > 1900) annee = a; }\n};\n\nVoiture v("Toyota", 2023);\nv.afficher(); // Toyota (2023)'
            }
          },
          {
            type: 'theory',
            title: 'Member initializer list et destructeur',
            content: 'La <strong>member initializer list</strong> (syntaxe <code>: attr(val)</code>) initialise les attributs avant le corps du constructeur — plus efficace et obligatoire pour les attributs <code>const</code> ou les références. Le <strong>destructeur</strong> (<code>~NomClasse</code>) est appelé automatiquement à la destruction de l\'objet.',
            code: {
              filename: 'constructeur.cpp',
              src: 'class Cercle {\nprivate:\n    const double rayon; // const : DOIT être dans la liste\npublic:\n    // Member initializer list\n    Cercle(double r) : rayon(r) {\n        cout << "Cercle créé" << endl;\n    }\n\n    double aire() const {\n        return 3.14159 * rayon * rayon;\n    }\n\n    ~Cercle() {\n        cout << "Cercle détruit" << endl;\n    }\n};'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence principale entre class et struct en C++ ?',
            options: [
              'struct ne peut pas avoir de méthodes',
              'Les membres de class sont private par défaut, ceux de struct sont public',
              'class est plus rapide que struct',
              'struct ne peut pas avoir de constructeur'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exactement ! C\'est la seule vraie différence : la visibilité par défaut.',
            errorMsg: 'En C++, class et struct sont presque identiques. Seule la visibilité par défaut diffère.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une classe Rectangle avec width et height en private, un constructeur avec initializer list, et une méthode area() retournant width * height.',
            placeholder: '#include <iostream>\nusing namespace std;\n\nclass Rectangle {\n    // attributs privés ici\npublic:\n    // constructeur avec initializer list\n    // méthode area()\n};\n\nint main() {\n    Rectangle r(5, 3);\n    cout << r.area() << endl; // 15\n    return 0;\n}',
            filename: 'rectangle.cpp',
            xp: 45,
            validator: (code: string) => code.includes('class Rectangle') && code.includes('area') && code.includes('private'),
            hint: 'Rectangle(int w, int h) : width(w), height(h) {} et int area() const { return width * height; }'
          }
        ]
      }
    ]
  },
  {
    icon: '🔗',
    title: 'Héritage et polymorphisme',
    lessons: [
      {
        title: 'Héritage en C++',
        subtitle: ': public Base, virtual, override',
        type: 'theory',
        time: '18 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Hériter d\'une classe',
            content: 'L\'<strong>héritage</strong> permet à une classe dérivée de réutiliser les membres d\'une classe de base. Syntaxe : <code>class Derivee : public Base</code>. Le mot-clé <code>virtual</code> marque une méthode comme polymorphique, et <code>override</code> (C++11) confirme explicitement la surcharge dans la classe dérivée.',
            code: {
              filename: 'heritage.cpp',
              src: 'class Animal {\npublic:\n    string nom;\n    Animal(string n) : nom(n) {}\n    virtual void parler() const {\n        cout << nom << " fait un bruit" << endl;\n    }\n    virtual ~Animal() {} // destructeur virtuel obligatoire !\n};\n\nclass Chien : public Animal {\npublic:\n    Chien(string n) : Animal(n) {}\n    void parler() const override {\n        cout << nom << " dit : Woof !" << endl;\n    }\n};\n\nAnimal* a = new Chien("Rex");\na->parler(); // polymorphisme : "Rex dit : Woof !\"\ndelete a;'
            }
          },
          {
            type: 'theory',
            title: 'Classes abstraites et fonctions pures',
            content: 'Une méthode <strong>virtuelle pure</strong> (<code>= 0</code>) n\'a pas d\'implémentation dans la classe de base. Une classe avec au moins une méthode virtuelle pure est <strong>abstraite</strong> — elle ne peut pas être instanciée directement. Les classes dérivées doivent implémenter toutes les méthodes pures.',
            code: {
              filename: 'abstrait.cpp',
              src: 'class Forme {\npublic:\n    virtual double aire() const = 0;      // pure\n    virtual double perimetre() const = 0; // pure\n    virtual ~Forme() {}\n};\n\nclass Carre : public Forme {\n    double cote;\npublic:\n    Carre(double c) : cote(c) {}\n    double aire() const override { return cote * cote; }\n    double perimetre() const override { return 4 * cote; }\n};\n\n// Forme f; // ERREUR : classe abstraite !\nCarre c(5);\ncout << c.aire() << endl;      // 25\ncout << c.perimetre() << endl; // 20'
            },
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Toujours déclarer le destructeur virtuel',
              text: 'Si une classe a des méthodes virtuelles, son destructeur doit aussi être virtuel. Sinon, détruire un objet dérivé via un pointeur de base ne libère pas correctement la mémoire dérivée.'
            }
          },
          {
            type: 'quiz',
            question: 'Que signifie "= 0" dans une déclaration de méthode virtuelle ?',
            options: [
              'La méthode retourne toujours 0',
              'La méthode est virtuelle pure, rendant la classe abstraite',
              'La méthode est désactivée et ignorée',
              'La méthode prend 0 paramètre'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! virtual void methode() = 0; déclare une méthode virtuelle pure.',
            errorMsg: '"= 0" dans une déclaration de méthode la rend virtuelle pure — la classe devient abstraite.'
          }
        ]
      }
    ]
  },
  {
    icon: '🔮',
    title: 'Templates et STL',
    lessons: [
      {
        title: 'Templates — programmation générique',
        subtitle: 'template<typename T>, fonctions, classes, STL',
        type: 'theory',
        time: '16 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'Fonctions templates',
            content: 'Les <strong>templates</strong> permettent d\'écrire du code générique qui fonctionne avec plusieurs types. Le compilateur génère automatiquement une version spécialisée pour chaque type utilisé. Syntaxe : <code>template&lt;typename T&gt;</code> avant la déclaration de la fonction ou classe.',
            code: {
              filename: 'templates.cpp',
              src: 'template<typename T>\nT maximum(T a, T b) {\n    return (a > b) ? a : b;\n}\n\ncout << maximum(3, 7) << endl;       // 7    (int)\ncout << maximum(3.14, 2.71) << endl; // 3.14 (double)\ncout << maximum(\'z\', \'a\') << endl;   // z    (char)'
            }
          },
          {
            type: 'theory',
            title: 'Conteneurs STL — map, set, queue, stack',
            content: 'La <strong>Standard Template Library (STL)</strong> fournit des conteneurs génériques prêts à l\'emploi. <code>std::map&lt;K,V&gt;</code> associe des clés à des valeurs (trié). <code>std::set&lt;T&gt;</code> stocke des valeurs uniques (trié). <code>std::queue&lt;T&gt;</code> est une file FIFO. <code>std::stack&lt;T&gt;</code> est une pile LIFO.',
            code: {
              filename: 'stl.cpp',
              src: '#include <map>\n#include <set>\nusing namespace std;\n\nmap<string, int> ages;\nages["Alice"] = 30;\nages["Bob"] = 25;\ncout << ages["Alice"] << endl; // 30\n\nset<int> uniques = {3, 1, 4, 1, 5, 3};\n// Stocke : {1, 3, 4, 5} — unique + trié automatiquement\nfor (int x : uniques) cout << x << " ";\n// Affiche : 1 3 4 5'
            }
          },
          {
            type: 'quiz',
            question: 'Quel conteneur STL garantit l\'unicité et le tri automatique des éléments ?',
            options: ['vector', 'list', 'set', 'queue'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! std::set stocke des éléments uniques et les maintient triés.',
            errorMsg: 'std::set garantit l\'unicité et le tri automatique des éléments.'
          }
        ]
      }
    ]
  },
  {
    icon: '🌊',
    title: 'C++ Moderne (C++11/14/17)',
    lessons: [
      {
        title: 'Lambdas et fonctionnalités C++11',
        subtitle: 'Fonctions anonymes, nullptr, auto',
        type: 'theory',
        time: '15 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'Les expressions lambda',
            content: 'Une <strong>lambda</strong> est une fonction anonyme définie inline. Syntaxe : <code>[capture](paramètres) { corps }</code>. La capture <code>[&]</code> capture les variables locales par référence, <code>[=]</code> par valeur, <code>[]</code> sans capture. Très utilisé avec les algorithmes STL comme <code>std::sort</code> ou <code>std::for_each</code>.',
            code: {
              filename: 'lambda.cpp',
              src: '#include <algorithm>\n#include <vector>\nusing namespace std;\n\nvector<int> v = {5, 2, 8, 1, 9, 3};\n\n// Trier avec une lambda\nsort(v.begin(), v.end(), [](int a, int b) {\n    return a < b;\n});\n// v = {1, 2, 3, 5, 8, 9}\n\n// Capture par valeur\nint seuil = 5;\nauto estGrand = [seuil](int x) { return x > seuil; };\ncout << estGrand(8) << endl; // 1 (true)'
            }
          },
          {
            type: 'theory',
            title: 'Structured bindings et move semantics (C++17)',
            content: 'Les <strong>structured bindings</strong> (C++17) déstructurent facilement les paires et maps : <code>auto [clé, valeur] = paire</code>. <code>std::move()</code> (C++11) "déplace" une ressource au lieu de la copier, évitant des copies coûteuses pour les grands objets comme les strings ou vecteurs.',
            code: {
              filename: 'modern_cpp.cpp',
              src: '#include <map>\nusing namespace std;\n\n// Structured bindings (C++17)\nmap<string, int> scores = {{"Alice", 95}, {"Bob", 87}};\nfor (auto& [nom, score] : scores) {\n    cout << nom << ": " << score << endl;\n}\n\n// move semantics — évite une copie\nstring s1 = "Grosse chaine de caracteres longue";\nstring s2 = move(s1); // s2 prend la ressource de s1\n// s1 est désormais vide, s2 a le contenu'
            },
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'nullptr remplace NULL',
              text: 'En C++ moderne, utilise toujours nullptr au lieu de NULL ou 0 pour les pointeurs nuls. nullptr a un type propre (nullptr_t) et évite les ambiguïtés lors de la surcharge de fonctions.'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle syntaxe définit une lambda qui capture toutes les variables locales par référence ?',
            options: [
              '[=](int x) { return x*2; }',
              '[&](int x) { return x*2; }',
              '[*](int x) { return x*2; }',
              '[ref](int x) { return x*2; }'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Parfait ! [&] capture toutes les variables locales par référence.',
            errorMsg: '[&] capture par référence, [=] capture par valeur, [] ne capture rien.'
          },
          {
            type: 'code-challenge',
            instructions: 'Utilise std::sort avec une lambda pour trier un vector<int> par ordre décroissant, puis affiche les éléments.',
            placeholder: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};\n    // sort avec lambda ici\n    for (int x : v) cout << x << " ";\n    return 0;\n}',
            filename: 'sort_lambda.cpp',
            xp: 40,
            validator: (code: string) => code.includes('sort') && code.includes('[]') && code.includes('>'),
            hint: 'sort(v.begin(), v.end(), [](int a, int b) { return a > b; });'
          }
        ]
      }
    ]
  }
]
