import type { CourseModule } from '@/types/cours'

export const CURRICULUM_CSHARP: CourseModule[] = [
  {
    icon: '🔷',
    title: 'Introduction à C#',
    lessons: [
      {
        title: 'Hello World en C#',
        subtitle: 'Structure d\'un programme C# et dotnet CLI',
        type: 'theory',
        time: '12 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'La structure d\'un programme C#',
            content: 'Un programme C# s\'organise en <strong>namespaces</strong>, <strong>classes</strong> et <strong>méthodes</strong>. Le point d\'entrée est la méthode <code>Main</code> dans une classe. <code>Console.WriteLine()</code> affiche du texte avec un retour à la ligne. <code>Console.ReadLine()</code> lit une ligne saisie par l\'utilisateur.',
            code: {
              filename: 'Program.cs',
              src: 'using System;\n\nnamespace MonApp\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Console.WriteLine("Bonjour, monde !");\n            Console.ReadLine();\n        }\n    }\n}'
            }
          },
          {
            type: 'theory',
            title: '.NET, dotnet CLI et C# moderne',
            content: '<strong>.NET</strong> est la plateforme d\'exécution multiplateforme (Windows, macOS, Linux). Le <strong>dotnet CLI</strong> permet de créer, compiler et exécuter des projets. Depuis C# 9, le <strong>top-level statements</strong> simplifie les petits programmes en supprimant le boilerplate de la classe Program.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Commandes dotnet essentielles',
              text: 'dotnet new console — crée un projet console. dotnet run — compile et exécute. dotnet build — compile uniquement. Depuis .NET 6, le fichier Program.cs peut contenir directement du code sans namespace ni classe.'
            },
            code: {
              filename: 'Program.cs',
              src: '// C# moderne (top-level statements, .NET 6+)\nConsole.WriteLine("Bonjour depuis C# moderne !");\nstring nom = Console.ReadLine() ?? "inconnu";\nConsole.WriteLine($"Bonjour, {nom} !");'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle méthode affiche du texte avec un retour à la ligne en C# ?',
            options: ['Console.Print()', 'Console.WriteLine()', 'System.out.println()', 'print()'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Console.WriteLine() est la méthode standard en C#.',
            errorMsg: 'En C#, c\'est Console.WriteLine() qui affiche du texte avec un retour à la ligne.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un programme C# qui affiche "C# est formidable !" avec Console.WriteLine.',
            placeholder: 'using System;\n\nclass Program\n{\n    static void Main(string[] args)\n    {\n        // ton code ici\n    }\n}',
            filename: 'Program.cs',
            xp: 30,
            validator: (code: string) => code.includes('Console.WriteLine') && code.includes('C# est formidable'),
            hint: 'Console.WriteLine("C# est formidable !");'
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
        title: 'Types valeur et types référence',
        subtitle: 'int, double, bool, string, var, nullable',
        type: 'theory',
        time: '15 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Types valeur vs types référence',
            content: 'En C#, il y a deux catégories de types. Les <strong>types valeur</strong> (stockés sur la pile) : <code>int</code>, <code>double</code>, <code>bool</code>, <code>char</code>, <code>decimal</code>, <code>struct</code>. Les <strong>types référence</strong> (stockés sur le tas) : <code>string</code>, <code>object</code>, <code>class</code>, <code>array</code>. Cette distinction impacte la façon dont les variables sont copiées et comparées.',
            code: {
              filename: 'Types.cs',
              src: '// Types valeur\nint age = 30;\ndouble pi = 3.14159;\nbool actif = true;\nchar lettre = \'A\';\ndecimal prix = 19.99m; // m = décimal exact\n\n// Types référence\nstring prenom = "Alice";\nobject obj = 42; // boxing\n\n// var — inférence de type\nvar nb = 42;       // int\nvar nom = "Bob";   // string'
            }
          },
          {
            type: 'theory',
            title: 'Nullable types et const',
            content: 'Les types valeur ne peuvent pas être <code>null</code> par défaut. Le suffixe <code>?</code> rend un type nullable : <code>int?</code> peut contenir un entier ou <code>null</code>. <code>const</code> déclare une constante calculée à la compilation. <code>readonly</code> ne peut être assigné que dans le constructeur.',
            code: {
              filename: 'Nullable.cs',
              src: 'int? age = null;   // nullable int\nif (age.HasValue)\n    Console.WriteLine(age.Value);\nelse\n    Console.WriteLine("age non défini");\n\n// GetValueOrDefault()\nint valeur = age.GetValueOrDefault(0); // 0 si null\n\nconst double PI = 3.14159; // constante compile-time\nreadonly string Id;        // assignable dans le constructeur seulement'
            }
          },
          {
            type: 'theory',
            title: 'Interpolation de chaînes',
            content: 'L\'<strong>interpolation de chaînes</strong> (<code>$""</code>) est une façon concise d\'insérer des expressions dans une chaîne. Plus lisible que la concaténation avec <code>+</code> ou <code>string.Format()</code>. Les accolades <code>{}</code> contiennent n\'importe quelle expression C#.',
            code: {
              filename: 'Interpolation.cs',
              src: 'string prenom = "Alice";\nint age = 30;\ndouble note = 18.5;\n\n// Interpolation (recommandé)\nConsole.WriteLine($"Bonjour {prenom}, tu as {age} ans.");\nConsole.WriteLine($"Note : {note:F1}/20");  // format 1 décimale\n\n// Équivalent avec string.Format\nConsole.WriteLine(string.Format("Bonjour {0}, tu as {1} ans.", prenom, age));'
            }
          },
          {
            type: 'quiz',
            question: 'Quel type C# utilise-t-on pour des calculs financiers exacts (sans erreur d\'arrondi flottant) ?',
            options: ['double', 'float', 'decimal', 'money'],
            correct: 2,
            xp: 15,
            successMsg: 'Correct ! decimal offre une précision exacte, idéale pour les montants financiers.',
            errorMsg: 'decimal est le type pour les calculs précis comme les montants financiers. double et float ont des erreurs d\'arrondi.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète l\'interpolation de chaîne pour afficher le prénom :',
            xp: 20,
            parts: [
              { type: 'text', value: 'Console.WriteLine(' },
              { type: 'blank', placeholder: 'préfixe', correct: '$' },
              { type: 'text', value: '"Bonjour {prenom}!");' }
            ]
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
        title: 'Opérateurs C# essentiels',
        subtitle: 'Ternaire, null-coalescing ??, null-conditional ?.',
        type: 'theory',
        time: '13 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Opérateurs arithmétiques et de comparaison',
            content: 'C# supporte les opérateurs classiques : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>. L\'opérateur ternaire <code>condition ? valeurSiVrai : valeurSiFaux</code> permet une expression conditionnelle concise. Les opérateurs de comparaison retournent un <code>bool</code>.',
            code: {
              filename: 'Operateurs.cs',
              src: 'int a = 10, b = 3;\nConsole.WriteLine(a + b);  // 13\nConsole.WriteLine(a % b);  // 1\nConsole.WriteLine(a / b);  // 3 (division entière)\nConsole.WriteLine((double)a / b); // 3.333...\n\n// Ternaire\nstring resultat = (a > b) ? "a est plus grand" : "b est plus grand";\nConsole.WriteLine(resultat);'
            }
          },
          {
            type: 'theory',
            title: 'Opérateurs null-coalescing et null-conditional',
            content: 'C# offre deux opérateurs très utiles pour gérer le null. <code>??</code> (null-coalescing) retourne la valeur de droite si celle de gauche est null. <code>?.</code> (null-conditional) accède à un membre seulement si l\'objet n\'est pas null, sinon retourne null sans lever d\'exception.',
            code: {
              filename: 'NullOps.cs',
              src: 'string? nom = null;\n\n// ?? : valeur par défaut si null\nstring affichage = nom ?? "Anonyme";\nConsole.WriteLine(affichage); // "Anonyme"\n\n// ??= : assigner si null\nnom ??= "Inconnu";\nConsole.WriteLine(nom); // "Inconnu"\n\n// ?. : accès sécurisé\nstring? texte = null;\nint? longueur = texte?.Length; // null, pas d\'exception\nConsole.WriteLine(longueur ?? 0); // 0'
            },
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'L\'opérateur ?. sauve du code défensif',
              text: 'Sans ?., il faudrait écrire : if (texte != null) longueur = texte.Length; Avec ?., c\'est juste : longueur = texte?.Length;'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne l\'expression null ?? "défaut" ?',
            options: ['null', '"défaut"', 'une exception NullReferenceException', 'false'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! ?? retourne l\'opérande de droite si celui de gauche est null.',
            errorMsg: 'L\'opérateur ?? (null-coalescing) retourne l\'opérande de droite quand celui de gauche est null.'
          },
          {
            type: 'fill-blank',
            instructions: 'Utilise l\'opérateur null-coalescing pour afficher "non renseigné" si email est null :',
            xp: 20,
            parts: [
              { type: 'text', value: 'string affichage = email ' },
              { type: 'blank', placeholder: 'opérateur', correct: '??' },
              { type: 'text', value: ' "non renseigné";' }
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
        subtitle: 'Switch classique et switch expression C# 8',
        type: 'theory',
        time: '14 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Conditions if/else',
            content: 'La structure <code>if/else if/else</code> fonctionne comme dans la plupart des langages. C# évalue les conditions booléennes strictement — un entier ne peut pas être utilisé directement comme booléen (contrairement au C).',
            code: {
              filename: 'Conditions.cs',
              src: 'int score = 75;\n\nif (score >= 90)\n    Console.WriteLine("Excellent");\nelse if (score >= 70)\n    Console.WriteLine("Bien");\nelse if (score >= 50)\n    Console.WriteLine("Passable");\nelse\n    Console.WriteLine("Insuffisant");\n\n// Condition inline avec ternaire\nstring mention = score >= 60 ? "Admis" : "Recalé";\nConsole.WriteLine(mention);'
            }
          },
          {
            type: 'theory',
            title: 'switch classique et switch expression (C# 8)',
            content: 'Le <code>switch</code> classique utilise <code>case</code> et <code>break</code>. C# 8 introduit le <strong>switch expression</strong>, plus concis, qui retourne directement une valeur. Il supporte le pattern matching avec <code>when</code> pour des conditions complexes.',
            code: {
              filename: 'Switch.cs',
              src: '// Switch classique\nstring jour = "lundi";\nswitch (jour)\n{\n    case "samedi":\n    case "dimanche":\n        Console.WriteLine("Week-end");\n        break;\n    default:\n        Console.WriteLine("Jour ouvré");\n        break;\n}\n\n// Switch expression (C# 8)\nstring typeJour = jour switch\n{\n    "samedi" or "dimanche" => "Week-end",\n    "vendredi" => "Presque le week-end !",\n    _ => "Jour ouvré"\n};\nConsole.WriteLine(typeJour);'
            }
          },
          {
            type: 'quiz',
            question: 'Que remplace le symbole _ dans un switch expression C# 8 ?',
            options: ['case null:', 'default:', 'break;', 'une variable non utilisée'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Le _ est le wildcard qui correspond à tous les cas non traités, comme default.',
            errorMsg: 'Dans un switch expression, _ joue le rôle de default — il capture tous les cas non listés.'
          }
        ]
      },
      {
        title: 'Boucles en C#',
        subtitle: 'for, while, do-while, foreach',
        type: 'theory',
        time: '14 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'for, while et do-while',
            content: 'C# offre les boucles classiques. <code>for</code> pour les itérations avec compteur, <code>while</code> quand la condition est vérifiée avant, <code>do-while</code> quand on veut exécuter le corps au moins une fois. <code>break</code> sort de la boucle, <code>continue</code> passe à l\'itération suivante.',
            code: {
              filename: 'Boucles.cs',
              src: '// for classique\nfor (int i = 0; i < 5; i++)\n    Console.Write(i + " "); // 0 1 2 3 4\n\n// while\nint n = 10;\nwhile (n > 0)\n{\n    Console.Write(n + " ");\n    n -= 3;\n}\n\n// do-while\nstring? saisie;\ndo {\n    Console.Write("Entrez oui ou non : ");\n    saisie = Console.ReadLine();\n} while (saisie != "oui" && saisie != "non");'
            }
          },
          {
            type: 'theory',
            title: 'foreach — parcourir une collection',
            content: 'Le <code>foreach</code> est la boucle préférée en C# pour parcourir des collections (<code>List</code>, tableaux, etc.). Il ne donne pas accès à l\'index par défaut, mais c\'est souvent suffisant. Pour avoir l\'index, utilise <code>for</code> ou la méthode LINQ <code>Select</code>.',
            code: {
              filename: 'Foreach.cs',
              src: 'string[] fruits = { "pomme", "banane", "cerise" };\n\nforeach (string fruit in fruits)\n{\n    Console.WriteLine(fruit);\n}\n\n// Avec une List<T>\nvar nombres = new List<int> { 1, 2, 3, 4, 5 };\nforeach (int nb in nombres)\n{\n    if (nb % 2 == 0)\n        Console.WriteLine($"{nb} est pair");\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle boucle C# est la plus adaptée pour parcourir chaque élément d\'une List<string> ?',
            options: ['for', 'while', 'foreach', 'do-while'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! foreach est idiomatique en C# pour parcourir des collections.',
            errorMsg: 'foreach est la boucle recommandée en C# pour parcourir des collections comme List<T>.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une boucle foreach qui parcourt un tableau string[] de prénoms et affiche chacun avec Console.WriteLine.',
            placeholder: 'string[] prenoms = { "Alice", "Bob", "Charlie" };\n\n// ton foreach ici',
            filename: 'foreach_ex.cs',
            xp: 30,
            validator: (code: string) => code.includes('foreach') && code.includes('Console.WriteLine'),
            hint: 'foreach (string p in prenoms) { Console.WriteLine(p); }'
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
        title: 'Manipuler les strings',
        subtitle: 'Méthodes, StringBuilder, formatage',
        type: 'theory',
        time: '15 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'string est immutable',
            content: 'En C#, <code>string</code> est un type <strong>immutable</strong> : toute modification crée un nouvel objet. Les méthodes comme <code>ToUpper()</code>, <code>Replace()</code>, <code>Substring()</code> retournent une nouvelle chaîne sans modifier l\'originale. Comparer des strings avec <code>==</code> compare les valeurs (pas les références, contrairement à Java).',
            code: {
              filename: 'String.cs',
              src: 'string s = "  Bonjour le Monde  ";\n\nConsole.WriteLine(s.ToUpper());           // "  BONJOUR LE MONDE  "\nConsole.WriteLine(s.Trim());              // "Bonjour le Monde"\nConsole.WriteLine(s.Trim().ToLower());   // "bonjour le monde"\nConsole.WriteLine(s.Contains("Monde")); // True\nConsole.WriteLine(s.Replace("Monde", "World")); // "  Bonjour le World  "\nConsole.WriteLine(s.Substring(9, 2));   // "le" (pos 9, longueur 2)\nConsole.WriteLine(s.Length);            // 20\n\nstring[] mots = "a,b,c".Split(\',\');\nConsole.WriteLine(mots[0]); // "a"'
            }
          },
          {
            type: 'theory',
            title: 'StringBuilder pour les concaténations',
            content: 'Concaténer beaucoup de chaînes avec <code>+</code> crée de nombreux objets intermédiaires en mémoire. <code>StringBuilder</code> (dans <code>System.Text</code>) est optimisé pour les constructions incrementales de chaînes.',
            code: {
              filename: 'StringBuilder.cs',
              src: 'using System.Text;\n\nvar sb = new StringBuilder();\nfor (int i = 0; i < 5; i++)\n{\n    sb.Append($"Ligne {i}\\n");\n}\nstring resultat = sb.ToString();\nConsole.WriteLine(resultat);\n\n// Autres méthodes utiles\nsb.Insert(0, "Début\\n");\nsb.AppendLine("Fin");\nsb.Replace("Ligne", "Rangée");'
            },
            callout: {
              kind: 'info',
              icon: 'ℹ️',
              title: 'Quand utiliser StringBuilder ?',
              text: 'Pour 3-4 concaténations, + est suffisant. Dès que tu concatènes dans une boucle ou plus de 10 fois, utilise StringBuilder pour de meilleures performances.'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne "hello".ToUpper() en C# ?',
            options: ['"hello"', '"Hello"', '"HELLO"', 'null'],
            correct: 2,
            xp: 15,
            successMsg: 'Correct ! ToUpper() retourne une nouvelle chaîne entièrement en majuscules.',
            errorMsg: 'ToUpper() retourne une nouvelle chaîne en majuscules : "HELLO".'
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
        title: 'Déclarer et utiliser des méthodes',
        subtitle: 'Paramètres, ref/out, expression-bodied',
        type: 'theory',
        time: '16 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Déclaration de méthodes',
            content: 'Une méthode C# a un modificateur d\'accès, un type de retour, un nom et des paramètres. <code>void</code> signifie qu\'elle ne retourne rien. Les méthodes <code>static</code> appartiennent à la classe et non à une instance. Les <strong>expression-bodied methods</strong> (syntaxe <code>=></code>) sont concises pour les méthodes simples.',
            code: {
              filename: 'Methodes.cs',
              src: 'class Calculatrice\n{\n    // Méthode classique\n    public static int Additionner(int a, int b)\n    {\n        return a + b;\n    }\n\n    // Expression-bodied (=> )\n    public static int Multiplier(int a, int b) => a * b;\n\n    // void : pas de retour\n    public static void Afficher(string message)\n    {\n        Console.WriteLine($"[INFO] {message}");\n    }\n}'
            }
          },
          {
            type: 'theory',
            title: 'Paramètres ref, out et params',
            content: '<code>ref</code> passe une variable par référence (elle doit être initialisée avant). <code>out</code> permet à une méthode de retourner plusieurs valeurs (la variable sera initialisée par la méthode). <code>params</code> permet un nombre variable d\'arguments.',
            code: {
              filename: 'Params.cs',
              src: '// out : retourner plusieurs valeurs\nstatic bool TryParser(string texte, out int valeur)\n{\n    return int.TryParse(texte, out valeur);\n}\n\nif (TryParser("42", out int nombre))\n    Console.WriteLine($"Parsé : {nombre}"); // 42\n\n// params : nombre variable d\'arguments\nstatic int Somme(params int[] nombres)\n{\n    int total = 0;\n    foreach (int n in nombres) total += n;\n    return total;\n}\n\nConsole.WriteLine(Somme(1, 2, 3));     // 6\nConsole.WriteLine(Somme(10, 20));      // 30'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre ref et out en C# ?',
            options: [
              'ref et out sont identiques',
              'ref nécessite que la variable soit initialisée avant l\'appel, out non',
              'out nécessite que la variable soit initialisée avant l\'appel, ref non',
              'ref ne peut être utilisé qu\'avec des types valeur'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! ref exige une initialisation avant l\'appel, out sera initialisé dans la méthode.',
            errorMsg: 'ref : la variable doit être initialisée avant. out : la méthode s\'occupe d\'initialiser la variable.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une méthode statique Carre(int n) => ... qui retourne n au carré, en utilisant la syntaxe expression-bodied.',
            placeholder: 'class Math\n{\n    // méthode Carre ici\n}\n\nConsole.WriteLine(Math.Carre(5)); // doit afficher 25',
            filename: 'Carre.cs',
            xp: 35,
            validator: (code: string) => code.includes('=>') && code.includes('Carre') && /n\s*\*\s*n/.test(code),
            hint: 'public static int Carre(int n) => n * n;'
          }
        ]
      }
    ]
  },
  {
    icon: '📋',
    title: 'Tableaux et collections',
    lessons: [
      {
        title: 'Tableaux en C#',
        subtitle: 'Déclaration, tableaux multi-dim, jagged',
        type: 'theory',
        time: '13 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Tableaux — déclaration et initialisation',
            content: 'Un tableau C# a une taille fixée à la création. On le déclare avec <code>Type[] nom = new Type[taille]</code> ou avec un initialiseur. Les tableaux sont des objets, donc ils ont des propriétés comme <code>Length</code>. L\'accès hors bornes lève une <code>IndexOutOfRangeException</code>.',
            code: {
              filename: 'Tableaux.cs',
              src: '// Déclaration et initialisation\nint[] notes = new int[5];         // 5 zéros\nstring[] jours = { "Lun", "Mar", "Mer", "Jeu", "Ven" };\n\nnotes[0] = 15;\nnotes[1] = 18;\n\nConsole.WriteLine(jours.Length);  // 5\nConsole.WriteLine(jours[0]);      // "Lun"\n\n// Parcourir\nforeach (string j in jours)\n    Console.Write(j + " ");\n\n// Tableau 2D\nint[,] matrice = new int[3, 3];\nmatrice[0, 0] = 1;'
            }
          },
          {
            type: 'theory',
            title: 'Tableaux jagged (en escalier)',
            content: 'Un <strong>tableau jagged</strong> est un tableau de tableaux où chaque ligne peut avoir une longueur différente. Contrairement aux tableaux 2D (<code>int[,]</code>), les lignes jagged peuvent être de tailles inégales.',
            code: {
              filename: 'Jagged.cs',
              src: '// Tableau jagged (chaque ligne a sa propre longueur)\nint[][] jagged = new int[3][];\njagged[0] = new int[] { 1, 2, 3 };\njagged[1] = new int[] { 4, 5 };\njagged[2] = new int[] { 6, 7, 8, 9 };\n\nfor (int i = 0; i < jagged.Length; i++)\n{\n    foreach (int val in jagged[i])\n        Console.Write(val + " ");\n    Console.WriteLine();\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle propriété retourne le nombre d\'éléments d\'un tableau en C# ?',
            options: ['Count', 'Size', 'Length', 'Capacity'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Length est la propriété des tableaux. Count est celle des collections comme List<T>.',
            errorMsg: 'Les tableaux ont Length. Les collections comme List<T> ont Count.'
          }
        ]
      },
      {
        title: 'Collections génériques',
        subtitle: 'List<T>, Dictionary<K,V>, HashSet<T>',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'List<T> — la liste dynamique',
            content: '<code>List&lt;T&gt;</code> est le conteneur le plus utilisé en C#. Taille dynamique, accès par index, nombreuses méthodes. Les méthodes clés : <code>Add()</code>, <code>Remove()</code>, <code>RemoveAt()</code>, <code>Count</code>, <code>Contains()</code>, <code>Sort()</code>, <code>Clear()</code>.',
            code: {
              filename: 'Liste.cs',
              src: 'using System.Collections.Generic;\n\nvar fruits = new List<string> { "pomme", "banane" };\nfruits.Add("cerise");\nfruits.Add("mangue");\n\nConsole.WriteLine(fruits.Count);       // 4\nConsole.WriteLine(fruits[0]);          // "pomme"\nConsole.WriteLine(fruits.Contains("banane")); // True\n\nfruits.Remove("banane");               // retire la valeur\nfruits.RemoveAt(0);                    // retire à l\'index 0\nfruits.Sort();\nforeach (string f in fruits)\n    Console.WriteLine(f);'
            }
          },
          {
            type: 'theory',
            title: 'Dictionary<K,V> et HashSet<T>',
            content: '<code>Dictionary&lt;K,V&gt;</code> associe des clés uniques à des valeurs. Accès O(1) par clé. Méthodes : <code>Add()</code>, <code>ContainsKey()</code>, <code>TryGetValue()</code>, <code>Remove()</code>. <code>HashSet&lt;T&gt;</code> stocke des valeurs uniques sans ordre particulier — idéal pour les tests d\'appartenance.',
            code: {
              filename: 'Collections.cs',
              src: '// Dictionary\nvar ages = new Dictionary<string, int>\n{\n    ["Alice"] = 30,\n    ["Bob"] = 25\n};\nages["Charlie"] = 35;\n\nif (ages.TryGetValue("Alice", out int ageAlice))\n    Console.WriteLine($"Alice : {ageAlice} ans");\n\n// Parcourir un Dictionary\nforeach (var kvp in ages)\n    Console.WriteLine($"{kvp.Key} = {kvp.Value}");\n\n// HashSet (valeurs uniques)\nvar emails = new HashSet<string> { "a@x.com", "b@x.com" };\nemails.Add("a@x.com"); // ignoré (déjà présent)\nConsole.WriteLine(emails.Count); // 2'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle collection C# garantit l\'unicité des éléments et offre une recherche rapide ?',
            options: ['List<T>', 'Queue<T>', 'HashSet<T>', 'Stack<T>'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! HashSet<T> ne stocke que des valeurs uniques avec une recherche O(1).',
            errorMsg: 'HashSet<T> est conçu pour stocker des valeurs uniques avec des opérations O(1).'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un Dictionary<string, int> de 3 produits avec leurs prix, puis affiche chaque paire clé-valeur avec foreach.',
            placeholder: 'using System.Collections.Generic;\n\nvar prix = new Dictionary<string, int>();\n// ajoute 3 produits\n// foreach pour afficher',
            filename: 'Dictionnaire.cs',
            xp: 40,
            validator: (code: string) => code.includes('Dictionary') && code.includes('foreach') && code.includes('.Key'),
            hint: 'foreach (var item in prix) Console.WriteLine($"{item.Key}: {item.Value}");'
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
        title: 'Classes et propriétés',
        subtitle: 'Constructeurs, auto-properties, record',
        type: 'theory',
        time: '18 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Classes et constructeurs',
            content: 'Une <strong>classe</strong> C# encapsule données et comportements. Les <strong>propriétés</strong> (get/set) sont préférées aux champs publics pour contrôler l\'accès. Les <strong>auto-properties</strong> simplifient la déclaration quand aucune logique n\'est nécessaire.',
            code: {
              filename: 'Personne.cs',
              src: 'class Personne\n{\n    // Auto-property\n    public string Prenom { get; set; } = string.Empty;\n\n    // Propriété avec logique\n    private int _age;\n    public int Age\n    {\n        get => _age;\n        set => _age = value >= 0 ? value : 0;\n    }\n\n    // Constructeur\n    public Personne(string prenom, int age)\n    {\n        Prenom = prenom;\n        Age = age;\n    }\n\n    public override string ToString()\n        => $"{Prenom} ({Age} ans)";\n}\n\nvar p = new Personne("Alice", 30);\nConsole.WriteLine(p); // "Alice (30 ans)"'
            }
          },
          {
            type: 'theory',
            title: 'static, partial et record',
            content: 'Les membres <code>static</code> appartiennent à la classe elle-même, pas à une instance. <code>partial class</code> permet de diviser une classe en plusieurs fichiers. Le type <code>record</code> (C# 9) crée des types immuables avec égalité par valeur, parfait pour les DTOs.',
            code: {
              filename: 'Records.cs',
              src: '// Classe statique utilitaire\nstatic class MathUtils\n{\n    public static double CercleAire(double r) => Math.PI * r * r;\n}\n\n// Record (C# 9) — immutable par défaut\nrecord Point(double X, double Y);\n\nvar p1 = new Point(1.0, 2.0);\nvar p2 = new Point(1.0, 2.0);\nConsole.WriteLine(p1 == p2); // True ! (égalité par valeur)\n\n// with : copie avec modification\nvar p3 = p1 with { Y = 5.0 };\nConsole.WriteLine(p3); // Point { X = 1, Y = 5 }'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la particularité d\'un record en C# 9+ ?',
            options: [
              'Il ne peut pas avoir de méthodes',
              'Il est immuable et a une égalité par valeur automatique',
              'Il est toujours static',
              'Il ne peut pas hériter d\'autres types'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Parfait ! Les records sont immuables et deux records avec les mêmes valeurs sont égaux.',
            errorMsg: 'Les records (C# 9) sont immuables par défaut et implémentent automatiquement l\'égalité par valeur.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une classe Produit avec Name (string) et Price (decimal) en auto-properties, un constructeur et un override de ToString() affichant "Nom: X, Prix: Y€".',
            placeholder: 'class Produit\n{\n    // auto-properties\n    // constructeur\n    // ToString()\n}\n\nvar p = new Produit("Livre", 12.99m);\nConsole.WriteLine(p);',
            filename: 'Produit.cs',
            xp: 45,
            validator: (code: string) => code.includes('class Produit') && code.includes('get; set;') && code.includes('ToString'),
            hint: 'public override string ToString() => $"Nom: {Name}, Prix: {Price}€";'
          }
        ]
      }
    ]
  },
  {
    icon: '🔗',
    title: 'Héritage et interfaces',
    lessons: [
      {
        title: 'Héritage en C#',
        subtitle: 'virtual, override, sealed, abstract',
        type: 'theory',
        time: '18 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Hériter d\'une classe',
            content: 'L\'<strong>héritage</strong> se déclare avec <code>:</code>. C# ne supporte que l\'héritage simple (une seule classe de base). <code>virtual</code> marque une méthode comme surchargeable. <code>override</code> la surcharge dans la classe dérivée. <code>sealed</code> empêche de nouvelles surcharges ou de nouveaux héritages.',
            code: {
              filename: 'Heritage.cs',
              src: 'class Animal\n{\n    public string Nom { get; init; }\n    public Animal(string nom) => Nom = nom;\n\n    public virtual void Parler()\n        => Console.WriteLine($"{Nom} fait un bruit");\n}\n\nclass Chien : Animal\n{\n    public Chien(string nom) : base(nom) {}\n\n    public override void Parler()\n        => Console.WriteLine($"{Nom} dit : Waf !");\n}\n\nAnimal a = new Chien("Rex");\na.Parler(); // polymorphisme : "Rex dit : Waf !"'
            }
          },
          {
            type: 'theory',
            title: 'Classes abstraites vs interfaces',
            content: 'Une <code>abstract class</code> ne peut pas être instanciée et peut contenir des méthodes abstraites (sans implémentation). Une <code>interface</code> définit un contrat — elle contient uniquement des signatures. Une classe peut implémenter plusieurs interfaces mais n\'hériter que d\'une seule classe. La convention C# nomme les interfaces avec le préfixe <strong>I</strong> (<code>IAnimal</code>).',
            code: {
              filename: 'Interfaces.cs',
              src: '// Interface\ninterface IDessinable\n{\n    void Dessiner();\n    string Couleur { get; }\n}\n\n// Classe abstraite\nabstract class Forme\n{\n    public abstract double Aire(); // sans implémentation\n\n    public virtual string Decrire()\n        => $"Forme d\'aire {Aire():F2}";\n}\n\n// Hérite + implémente interface\nclass Cercle : Forme, IDessinable\n{\n    public double Rayon { get; init; }\n    public string Couleur { get; init; } = "rouge";\n    public override double Aire() => Math.PI * Rayon * Rayon;\n    public void Dessiner() => Console.WriteLine("O");\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Combien de classes de base peut hériter une classe C# ?',
            options: ['Illimité', '2', '1', '3 maximum'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! C# n\'autorise que l\'héritage simple : une seule classe de base.',
            errorMsg: 'C# ne supporte que l\'héritage simple. Pour plusieurs "contrats", on utilise des interfaces.'
          }
        ]
      }
    ]
  },
  {
    icon: '🔮',
    title: 'Generics et delegates',
    lessons: [
      {
        title: 'Generics en C#',
        subtitle: 'Méthodes et classes génériques, contraintes',
        type: 'theory',
        time: '15 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Méthodes et classes génériques',
            content: 'Les <strong>génériques</strong> permettent d\'écrire du code réutilisable indépendant du type. On utilise des paramètres de type (<code>T</code>). Les contraintes (<code>where T :</code>) limitent les types acceptables pour garantir certaines capacités.',
            code: {
              filename: 'Generics.cs',
              src: '// Méthode générique\nstatic T Maximum<T>(T a, T b) where T : IComparable<T>\n{\n    return a.CompareTo(b) > 0 ? a : b;\n}\n\nConsole.WriteLine(Maximum(3, 7));     // 7\nConsole.WriteLine(Maximum("abc", "xyz")); // "xyz"\n\n// Classe générique\nclass Boite<T>\n{\n    private T _contenu;\n    public Boite(T contenu) => _contenu = contenu;\n    public T Ouvrir() => _contenu;\n}\n\nvar b = new Boite<string>("Surprise !");\nConsole.WriteLine(b.Ouvrir()); // "Surprise !"'
            }
          },
          {
            type: 'theory',
            title: 'Delegates, Func et Action',
            content: 'Un <strong>delegate</strong> est un type qui représente une référence à une méthode. <code>Func&lt;T, TResult&gt;</code> est un delegate prédéfini pour les méthodes avec retour. <code>Action&lt;T&gt;</code> est pour les méthodes sans retour (<code>void</code>). <code>Predicate&lt;T&gt;</code> retourne un bool. Ils sont la base des lambdas et LINQ.',
            code: {
              filename: 'Delegates.cs',
              src: '// Func<input, output>\nFunc<int, int, int> additionner = (a, b) => a + b;\nConsole.WriteLine(additionner(3, 4)); // 7\n\n// Action<input> (void)\nAction<string> afficher = msg => Console.WriteLine($"[LOG] {msg}");\nafficher("Démarrage"); // "[LOG] Démarrage"\n\n// Predicate<T> (retourne bool)\nPredicate<int> estPositif = n => n > 0;\nConsole.WriteLine(estPositif(-5));  // False\nConsole.WriteLine(estPositif(10));  // True\n\n// Utiliser avec List\nvar nums = new List<int> { -2, 5, -1, 8, 3 };\nvar positifs = nums.FindAll(estPositif);\n// positifs = {5, 8, 3}'
            }
          },
          {
            type: 'quiz',
            question: 'Quel delegate prédéfini C# utilise-t-on pour une méthode qui prend un string et retourne un int ?',
            options: ['Action<string, int>', 'Func<string, int>', 'Predicate<string>', 'Delegate<string, int>'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Func<TInput, TOutput> — le dernier paramètre est toujours le type de retour.',
            errorMsg: 'Func<string, int> : prend un string, retourne un int. Le dernier type est toujours le retour.'
          }
        ]
      }
    ]
  },
  {
    icon: '🌊',
    title: 'LINQ',
    lessons: [
      {
        title: 'LINQ — requêtes sur les collections',
        subtitle: 'Where, Select, OrderBy, GroupBy, FirstOrDefault',
        type: 'theory',
        time: '18 min',
        xp: 85,
        steps: [
          {
            type: 'theory',
            title: 'Syntaxe méthode LINQ',
            content: '<strong>LINQ</strong> (Language Integrated Query) permet d\'interroger des collections avec une syntaxe expressive. La <strong>syntaxe méthode</strong> chaîne des appels sur <code>IEnumerable&lt;T&gt;</code>. Les méthodes clés : <code>Where()</code> filtre, <code>Select()</code> transforme, <code>OrderBy()</code> trie, <code>FirstOrDefault()</code> récupère le premier élément (ou null).',
            code: {
              filename: 'Linq.cs',
              src: 'using System.Linq;\n\nvar nombres = new List<int> { 5, 2, 8, 1, 9, 3, 7 };\n\n// Where : filtrer\nvar pairs = nombres.Where(n => n % 2 == 0);\n// {2, 8}\n\n// Select : transformer\nvar doubles = nombres.Select(n => n * 2);\n// {10, 4, 16, 2, 18, 6, 14}\n\n// OrderBy\nvar tries = nombres.OrderBy(n => n);\n// {1, 2, 3, 5, 7, 8, 9}\n\n// Enchaîner les méthodes\nvar resultat = nombres\n    .Where(n => n > 3)\n    .OrderByDescending(n => n)\n    .Select(n => n * 2)\n    .ToList(); // {18, 16, 14, 10}'
            }
          },
          {
            type: 'theory',
            title: 'GroupBy, Count, Any, All et deferred execution',
            content: 'LINQ offre de nombreuses méthodes d\'agrégation. <code>Count()</code>, <code>Sum()</code>, <code>Min()</code>, <code>Max()</code>, <code>Average()</code> calculent des valeurs. <code>Any()</code> retourne vrai si au moins un élément correspond. <code>All()</code> retourne vrai si tous correspondent. LINQ utilise l\'<strong>évaluation différée</strong> : la requête n\'est exécutée qu\'au moment d\'itérer ou d\'appeler <code>ToList()</code>.',
            code: {
              filename: 'LinqAggregat.cs',
              src: 'var etudiants = new List<(string Nom, int Note)>\n{\n    ("Alice", 18), ("Bob", 12), ("Charlie", 15), ("Diana", 18)\n};\n\n// Any / All\nbool tousAdmis = etudiants.All(e => e.Note >= 10);    // True\nbool quelquunExcellent = etudiants.Any(e => e.Note >= 18); // True\n\n// FirstOrDefault\nvar premier = etudiants.FirstOrDefault(e => e.Note == 18);\nConsole.WriteLine(premier.Nom); // "Alice"\n\n// GroupBy\nvar parNote = etudiants.GroupBy(e => e.Note);\nforeach (var groupe in parNote)\n    Console.WriteLine($"Note {groupe.Key}: {groupe.Count()} étudiant(s)");'
            },
            callout: {
              kind: 'info',
              icon: 'ℹ️',
              title: 'Évaluation différée (Deferred Execution)',
              text: 'var requete = liste.Where(...) ne s\'exécute pas immédiatement ! Elle est évaluée au premier foreach ou ToList(). Ajoute .ToList() si tu veux matérialiser le résultat immédiatement et éviter une double exécution.'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne FirstOrDefault() si aucun élément ne correspond au prédicat ?',
            options: [
              'Une exception InvalidOperationException',
              'null (ou la valeur par défaut du type)',
              '-1',
              'La liste complète'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! FirstOrDefault() retourne null pour les types référence, 0 pour int, etc.',
            errorMsg: 'FirstOrDefault() retourne la valeur par défaut (null pour les types référence) si rien ne correspond.'
          },
          {
            type: 'code-challenge',
            instructions: 'Utilise LINQ pour filtrer une List<string> de prénoms et garder uniquement ceux qui commencent par la lettre "A", puis affiche le résultat.',
            placeholder: 'using System.Linq;\nvar prenoms = new List<string> { "Alice", "Bob", "Antoine", "Marie", "Axel" };\n\n// LINQ Where ici\n// foreach pour afficher',
            filename: 'LinqFiltrer.cs',
            xp: 40,
            validator: (code: string) => code.includes('Where') && code.includes('StartsWith') || code.includes('Where') && /\[\s*0\s*\]/.test(code) || code.includes('Where') && code.includes('"A"'),
            hint: 'prenoms.Where(p => p.StartsWith("A"))'
          }
        ]
      }
    ]
  },
  {
    icon: '⏳',
    title: 'Async / Await',
    lessons: [
      {
        title: 'Programmation asynchrone',
        subtitle: 'async, await, Task, HttpClient',
        type: 'theory',
        time: '18 min',
        xp: 85,
        steps: [
          {
            type: 'theory',
            title: 'async et await — le principe',
            content: 'Le modèle <strong>async/await</strong> permet d\'écrire du code asynchrone (non bloquant) de façon lisible, sans callbacks. Une méthode <code>async</code> retourne un <code>Task</code> (void) ou un <code>Task&lt;T&gt;</code> (avec valeur). <code>await</code> attend la fin d\'une opération asynchrone sans bloquer le thread.',
            code: {
              filename: 'Async.cs',
              src: 'using System;\nusing System.Threading.Tasks;\n\nasync Task<string> TelechargerAsync(string url)\n{\n    using var client = new HttpClient();\n    // await libère le thread pendant le téléchargement\n    string contenu = await client.GetStringAsync(url);\n    return contenu;\n}\n\n// Appel\nasync Task Main()\n{\n    Console.WriteLine("Début du téléchargement...");\n    string html = await TelechargerAsync("https://example.com");\n    Console.WriteLine($"Reçu : {html.Length} caractères");\n}'
            }
          },
          {
            type: 'theory',
            title: 'Task.Run et CancellationToken',
            content: '<code>Task.Run()</code> exécute du code synchrone sur un thread du pool, utile pour les opérations CPU intensives. Le <code>CancellationToken</code> permet d\'annuler une opération asynchrone en cours. Toujours accepter un CancellationToken dans les méthodes async qui peuvent durer longtemps.',
            code: {
              filename: 'TaskRun.cs',
              src: 'using System.Threading;\nusing System.Threading.Tasks;\n\n// Opération CPU sur thread pool\nasync Task<int> CalculerAsync(int n)\n{\n    return await Task.Run(() =>\n    {\n        int somme = 0;\n        for (int i = 0; i <= n; i++) somme += i;\n        return somme;\n    });\n}\n\n// Avec annulation\nasync Task TraiterAsync(CancellationToken ct)\n{\n    for (int i = 0; i < 100; i++)\n    {\n        ct.ThrowIfCancellationRequested();\n        await Task.Delay(50, ct);\n        Console.WriteLine($"Étape {i}");\n    }\n}\n\nvar cts = new CancellationTokenSource(TimeSpan.FromSeconds(3));\nawait TraiterAsync(cts.Token);'
            },
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Ne pas bloquer avec .Result ou .Wait()',
              text: 'Utiliser task.Result ou task.Wait() dans une méthode async peut provoquer des deadlocks. Utilise toujours await pour attendre une Task dans du code async.'
            }
          },
          {
            type: 'quiz',
            question: 'Quel type retourne une méthode async qui produit une valeur de type int ?',
            options: ['int', 'async int', 'Task<int>', 'Promise<int>'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Task<int> encapsule la valeur int qui sera disponible à la fin de l\'opération.',
            errorMsg: 'Une méthode async retournant un int doit avoir le type de retour Task<int>.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la signature d\'une méthode async qui télécharge et retourne un string :',
            xp: 25,
            parts: [
              { type: 'blank', placeholder: 'mot-clé', correct: 'async' },
              { type: 'text', value: ' Task<string> FetchAsync(string url)\n{\n    var result = ' },
              { type: 'blank', placeholder: 'mot-clé', correct: 'await' },
              { type: 'text', value: ' client.GetStringAsync(url);\n    return result;\n}' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🚨',
    title: 'Exceptions et fichiers',
    lessons: [
      {
        title: 'Gestion des exceptions',
        subtitle: 'try/catch/finally, throw, IDisposable',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'try / catch / finally',
            content: 'Le bloc <code>try</code> contient le code risqué. <code>catch</code> attrape les exceptions d\'un type spécifique. <code>finally</code> s\'exécute toujours, que l\'exception ait eu lieu ou non — idéal pour les nettoyages. On peut chaîner plusieurs <code>catch</code> du plus spécifique au plus général.',
            code: {
              filename: 'Exceptions.cs',
              src: 'try\n{\n    string texte = Console.ReadLine() ?? "";\n    int nombre = int.Parse(texte); // peut lever FormatException\n    Console.WriteLine(100 / nombre); // peut lever DivideByZeroException\n}\ncatch (DivideByZeroException)\n{\n    Console.WriteLine("Erreur : division par zéro !");\n}\ncatch (FormatException ex)\n{\n    Console.WriteLine($"Format invalide : {ex.Message}");\n}\ncatch (Exception ex) // attrape tout le reste\n{\n    Console.WriteLine($"Erreur inattendue : {ex.Message}");\n}\nfinally\n{\n    Console.WriteLine("Bloc finally toujours exécuté");\n}'
            }
          },
          {
            type: 'theory',
            title: 'throw et exceptions personnalisées',
            content: '<code>throw</code> relance ou crée une exception. Les bonnes pratiques recommandent d\'utiliser des exceptions spécifiques (<code>ArgumentNullException</code>, <code>ArgumentOutOfRangeException</code>...) plutôt que <code>Exception</code> générique. Le mot-clé <code>throw</code> seul (sans paramètre) dans un catch relance l\'exception originale avec sa stack trace.',
            code: {
              filename: 'ThrowExemples.cs',
              src: 'void SetAge(int age)\n{\n    if (age < 0 || age > 150)\n        throw new ArgumentOutOfRangeException(nameof(age), "L\'âge doit être entre 0 et 150.");\n    // ...\n}\n\nvoid ProcesserDocument(string? chemin)\n{\n    ArgumentNullException.ThrowIfNull(chemin); // .NET 6+\n    // ...\n}\n\n// Exception personnalisée\nclass SoldeInsuffisantException : Exception\n{\n    public decimal Manque { get; }\n    public SoldeInsuffisantException(decimal manque)\n        : base($"Solde insuffisant. Manque : {manque}€")\n        => Manque = manque;\n}'
            }
          },
          {
            type: 'theory',
            title: 'using et IDisposable — gestion des ressources',
            content: 'Le mot-clé <code>using</code> garantit qu\'un objet implémentant <code>IDisposable</code> sera libéré, même en cas d\'exception. C\'est le mécanisme RAII de C#. Depuis C# 8, la syntaxe simplifiée <code>using var</code> libère la ressource en fin de scope sans bloc d\'accolades.',
            code: {
              filename: 'Using.cs',
              src: 'using System.IO;\n\n// using classique\nusing (var reader = new StreamReader("fichier.txt"))\n{\n    string contenu = reader.ReadToEnd();\n    Console.WriteLine(contenu);\n} // reader.Dispose() appelé automatiquement ici\n\n// using simplifié (C# 8+)\nusing var writer = new StreamWriter("sortie.txt");\nwriter.WriteLine("Bonjour fichier !");\nwriter.WriteLine("Deuxième ligne");\n// Dispose() appelé en fin de scope de la méthode\n\n// File — méthodes statiques rapides\nstring texte = File.ReadAllText("data.txt");\nFile.WriteAllText("resultat.txt", "Contenu écrit");\nstring[] lignes = File.ReadAllLines("data.txt");'
            }
          },
          {
            type: 'quiz',
            question: 'Quand le bloc finally est-il exécuté ?',
            options: [
              'Uniquement quand une exception est levée',
              'Uniquement quand aucune exception n\'est levée',
              'Toujours, qu\'une exception ait été levée ou non',
              'Jamais si le catch attrape l\'exception'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! finally s\'exécute toujours, ce qui en fait l\'endroit idéal pour les nettoyages.',
            errorMsg: 'finally s\'exécute toujours, que l\'exception ait été attrapée ou non. C\'est sa raison d\'être.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un bloc try/catch qui tente de parser un string en int avec int.Parse(), attrape la FormatException et affiche un message d\'erreur clair.',
            placeholder: 'string entree = "pas un nombre";\n\n// try/catch ici\n// si succès : Console.WriteLine("Valeur : " + nombre)\n// si erreur : Console.WriteLine("Format invalide !")',
            filename: 'TryCatch.cs',
            xp: 40,
            validator: (code: string) => code.includes('try') && code.includes('catch') && code.includes('Parse') && code.includes('FormatException'),
            hint: 'try { int n = int.Parse(entree); } catch (FormatException) { Console.WriteLine("Format invalide !"); }'
          }
        ]
      }
    ]
  }
]
