import type { CourseModule } from '@/types/cours'

export const CURRICULUM_PHP: CourseModule[] = [
  {
    icon: '🐘',
    title: 'Introduction à PHP',
    lessons: [
      {
        title: 'Démarrer avec PHP',
        subtitle: 'Balises, echo et configuration serveur',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'PHP et le web',
            content: 'PHP (Hypertext Preprocessor) est un langage de script côté <strong>serveur</strong>. Il génère du HTML dynamiquement. Tout code PHP est entouré des balises <strong>&lt;?php</strong> et <strong>?&gt;</strong>. Le serveur exécute PHP et envoie uniquement le HTML au navigateur.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'PHP tourne sur le serveur',
              text: 'Contrairement à JavaScript, PHP s\'exécute sur le serveur. L\'utilisateur ne voit jamais le code PHP, seulement le HTML résultant.'
            },
            code: {
              filename: 'index.php',
              src: '<?php\n  $prenom = "Alice";\n  $age = 25;\n  echo "Bonjour " . $prenom . " !";\n  echo " Tu as " . $age . " ans.";\n?>'
            }
          },
          {
            type: 'theory',
            title: 'echo, print et les commentaires',
            content: '<code>echo</code> affiche du texte (peut prendre plusieurs arguments séparés par des virgules). <code>print</code> est similaire mais ne prend qu\'un argument et retourne toujours 1. Les commentaires : <code>//</code> ou <code>#</code> pour une ligne, <code>/* ... */</code> pour un bloc.',
            code: {
              filename: 'affichage.php',
              src: '<?php\n// Commentaire sur une ligne\n# Aussi un commentaire\n/* Commentaire\n   multi-lignes */\n\necho "Bonjour", " ", "le monde !", "<br>";\nprint "Hello World";\n\n// Configuration XAMPP/WAMP : place tes fichiers dans htdocs/\n// Accès : http://localhost/index.php\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Comment commencent les noms de variables en PHP ?',
            options: ['@', '#', '$', '&'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! En PHP, toutes les variables commencent par $.',
            errorMsg: 'En PHP, les variables commencent obligatoirement par $.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un script PHP qui affiche "Bienvenue en PHP !" avec echo.',
            placeholder: '<?php\n// Ton code ici\n?>',
            filename: 'index.php',
            xp: 25,
            hint: 'echo "Bienvenue en PHP !";',
            validator: (code: string) => code.includes('echo') && code.includes('<?php')
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
        title: 'Variables et types dynamiques',
        subtitle: 'string, int, float, bool, null, array',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Typage dynamique PHP',
            content: 'PHP est un langage à <strong>typage dynamique</strong> : le type d\'une variable est déterminé par sa valeur et peut changer. Les types principaux sont : <code>string</code>, <code>int</code>, <code>float</code>, <code>bool</code>, <code>null</code>, <code>array</code>, <code>object</code>. La fonction <code>gettype()</code> retourne le type d\'une variable.',
            code: {
              filename: 'types.php',
              src: '<?php\n$nom = "Alice";        // string\n$age = 25;             // int\n$prix = 9.99;          // float\n$actif = true;         // bool\n$inconnu = null;       // null\n\necho gettype($nom);    // string\necho gettype($age);    // integer\necho gettype($prix);   // double\necho gettype($actif);  // boolean\n?>'
            }
          },
          {
            type: 'theory',
            title: 'Casts et conversions',
            content: 'PHP peut convertir un type en un autre avec <code>settype()</code> ou avec les <strong>casts</strong> : <code>(int)</code>, <code>(float)</code>, <code>(string)</code>, <code>(bool)</code>, <code>(array)</code>.',
            code: {
              filename: 'casts.php',
              src: '<?php\n$valeur = "42";\necho gettype($valeur); // string\n\n$entier = (int) $valeur;\necho gettype($entier); // integer\necho $entier + 8;      // 50\n\n$decimal = (float) "3.14abc";\necho $decimal;         // 3.14\n\n// settype() modifie la variable en place\nsettype($valeur, "integer");\necho gettype($valeur); // integer\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Quel est le type PHP de la valeur true ?',
            options: ['string', 'integer', 'boolean', 'null'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! true et false sont de type boolean en PHP.',
            errorMsg: 'true et false sont de type boolean (gettype() retourne "boolean").'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète les déclarations PHP :',
            xp: 20,
            parts: [
              { type: 'text', value: '<?php\n' },
              { type: 'blank', placeholder: 'variable', correct: '$nom' },
              { type: 'text', value: ' = "Alice";\n' },
              { type: 'blank', placeholder: 'variable', correct: '$age' },
              { type: 'text', value: ' = 25;\necho ' },
              { type: 'blank', placeholder: 'variable', correct: '$nom' },
              { type: 'text', value: ';\n?>' }
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
        title: 'Tous les opérateurs PHP',
        subtitle: 'Arithmétique, comparaison, logique, concaténation',
        type: 'theory',
        time: '12 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Arithmétique et concaténation',
            content: 'PHP propose les opérateurs arithmétiques classiques : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>. La <strong>concaténation</strong> de chaînes utilise le point <code>.</code> (pas le +). L\'opérateur <code>.=</code> ajoute à une string existante.',
            code: {
              filename: 'operateurs.php',
              src: '<?php\n$a = 10;\n$b = 3;\necho $a + $b;  // 13\necho $a / $b;  // 3.333...\necho $a % $b;  // 1\n\n// Concaténation\n$prenom = "Alice";\n$message = "Bonjour " . $prenom . " !";\necho $message; // Bonjour Alice !\n\n// Opérateur .=\n$str = "Hello";\n$str .= " World";\necho $str; // Hello World\n?>'
            }
          },
          {
            type: 'theory',
            title: '== vs === et opérateurs logiques',
            content: 'En PHP, <code>==</code> compare les valeurs avec <strong>conversion de type</strong> (0 == "0" est true). <code>===</code> compare la valeur ET le type (0 === "0" est false). Pour la logique : <code>&&</code> / <code>and</code>, <code>||</code> / <code>or</code>, <code>!</code> / <code>not</code>.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: '== peut surprendre en PHP',
              text: 'En PHP, "0" == false est true, "1" == true est true. Pour éviter les surprises, utilise toujours === (comparaison stricte).'
            },
            code: {
              filename: 'comparaison.php',
              src: '<?php\nvar_dump(0 == "0");   // bool(true)  — même valeur\nvar_dump(0 === "0");  // bool(false) — types différents\nvar_dump(1 == true);  // bool(true)\nvar_dump(1 === true); // bool(false) — int vs bool\n\n$age = 20;\nif ($age >= 18 && $age < 65) {\n    echo "Adulte actif";\n}\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Quel opérateur compare la valeur ET le type en PHP ?',
            options: ['==', '===', '!=', '<>'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! === vérifie que la valeur ET le type sont identiques.',
            errorMsg: '=== est la comparaison stricte (valeur + type). == fait une comparaison lâche avec conversion.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare $nom = "PHP" et $version = 8. Concatène-les pour afficher "PHP 8" avec echo.',
            placeholder: '<?php\n$nom = "PHP";\n$version = 8;\n// Concatène et affiche\n?>',
            filename: 'concat.php',
            xp: 25,
            hint: 'echo $nom . " " . $version;',
            validator: (code: string) => code.includes('echo') && code.includes('.')
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
        title: 'if, elseif, switch',
        subtitle: 'Contrôle du flux en PHP',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'if / elseif / else',
            content: 'La structure conditionnelle PHP utilise <strong>if</strong>, <strong>elseif</strong> (en un mot), et <strong>else</strong>. La syntaxe est similaire aux autres langages C-like. On peut aussi utiliser la syntaxe alternative avec <code>:</code> et <code>endif;</code> dans les templates HTML.',
            code: {
              filename: 'conditions.php',
              src: '<?php\n$note = 75;\n\nif ($note >= 90) {\n    echo "Excellent !";\n} elseif ($note >= 70) {\n    echo "Bien !";\n} elseif ($note >= 50) {\n    echo "Passable";\n} else {\n    echo "Insuffisant";\n}\n\n// Syntaxe alternative (utile dans HTML)\nif ($note >= 50):\n    echo "Reçu";\nendif;\n?>'
            }
          },
          {
            type: 'theory',
            title: 'switch et match (PHP 8)',
            content: 'Le <strong>switch</strong> compare une valeur à plusieurs cas (avec == lâche). <strong>match</strong> (PHP 8+) est plus strict (===), plus concis, et retourne une valeur directement.',
            code: {
              filename: 'switch.php',
              src: '<?php\n$jour = 2;\n\n// switch\nswitch ($jour) {\n    case 1: echo "Lundi"; break;\n    case 2: echo "Mardi"; break;\n    default: echo "Autre";\n}\n\n// match (PHP 8+) — plus strict et concis\n$nom = match($jour) {\n    1 => "Lundi",\n    2 => "Mardi",\n    default => "Autre"\n};\necho $nom; // Mardi\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Comment s\'écrit "else if" en une seule instruction en PHP ?',
            options: ['elsif', 'elif', 'elseif', 'else if'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! PHP utilise elseif (en un mot) même si else if (deux mots) fonctionne aussi.',
            errorMsg: 'PHP utilise elseif (préféré, un seul mot). else if fonctionne mais elseif est idiomatique.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare $age = 20. Affiche "Majeur" si $age >= 18, "Mineur" sinon avec if/else.',
            placeholder: '<?php\n$age = 20;\n// Ton if/else ici\n?>',
            filename: 'age.php',
            xp: 25,
            hint: 'if ($age >= 18) { echo "Majeur"; } else { echo "Mineur"; }',
            validator: (code: string) => code.includes('if') && code.includes('else') && code.includes('echo')
          }
        ]
      },
      {
        title: 'Boucles for, while et foreach',
        subtitle: 'Répéter des actions en PHP',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'for et while',
            content: 'La boucle <strong>for</strong> est idéale quand le nombre d\'itérations est connu. <strong>while</strong> répète tant que la condition est vraie. <strong>do-while</strong> garantit au moins une exécution. <code>break</code> sort de la boucle, <code>continue</code> passe à l\'itération suivante.',
            code: {
              filename: 'boucles.php',
              src: '<?php\n// for\nfor ($i = 1; $i <= 5; $i++) {\n    echo $i . " ";\n}\n// 1 2 3 4 5\n\n// while\n$n = 10;\nwhile ($n > 0) {\n    echo $n . " ";\n    $n -= 3;\n}\n// 10 7 4 1\n\n// do-while\ndo {\n    echo "Au moins une fois";\n} while (false);\n?>'
            }
          },
          {
            type: 'theory',
            title: 'foreach pour les tableaux',
            content: 'La boucle <strong>foreach</strong> est spécialement conçue pour parcourir des tableaux et objets en PHP. Elle supporte les tableaux indexés et associatifs avec la syntaxe <code>foreach ($tab as $cle => $valeur)</code>.',
            code: {
              filename: 'foreach.php',
              src: '<?php\n// Tableau indexé\n$fruits = ["Pomme", "Banane", "Cerise"];\nforeach ($fruits as $fruit) {\n    echo $fruit . "<br>";\n}\n\n// Tableau associatif\n$personne = ["nom" => "Alice", "age" => 30];\nforeach ($personne as $cle => $valeur) {\n    echo $cle . " : " . $valeur . "<br>";\n}\n// nom : Alice\n// age : 30\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle boucle PHP est idéale pour parcourir un tableau associatif ?',
            options: ['for', 'while', 'foreach', 'do-while'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! foreach est fait pour les tableaux et peut récupérer clé et valeur.',
            errorMsg: 'foreach est la boucle idéale pour les tableaux PHP, surtout les associatifs.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un tableau $langages = ["PHP", "Python", "Java"] et affiche chaque langage avec foreach et echo.',
            placeholder: '<?php\n$langages = ["PHP", "Python", "Java"];\n// Ton foreach ici\n?>',
            filename: 'langages.php',
            xp: 25,
            hint: 'foreach ($langages as $lang) { echo $lang; }',
            validator: (code: string) => code.includes('foreach') && code.includes('echo')
          }
        ]
      }
    ]
  },
  {
    icon: '🔤',
    title: 'Chaînes PHP',
    lessons: [
      {
        title: 'Fonctions de manipulation de chaînes',
        subtitle: 'strlen, str_replace, explode et bien plus',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Fonctions essentielles de string',
            content: 'PHP dispose d\'un riche ensemble de fonctions pour les chaînes : <code>strlen()</code> (longueur), <code>strtoupper()</code> / <code>strtolower()</code> (casse), <code>str_replace()</code> (remplace), <code>strpos()</code> (position), <code>substr()</code> (extraction), <code>trim()</code> (supprime les espaces), <code>strlen()</code>.',
            code: {
              filename: 'strings.php',
              src: '<?php\n$s = "  Bonjour PHP  ";\n\necho strlen($s);                    // 15\necho strtoupper($s);                // BONJOUR PHP\necho trim($s);                      // "Bonjour PHP"\necho str_replace("PHP", "Monde", $s); // Bonjour Monde\necho substr($s, 2, 7);              // Bonjour\n\n$pos = strpos($s, "PHP");\nvar_dump($pos); // int(9) ou false si non trouvé\n?>'
            }
          },
          {
            type: 'theory',
            title: 'explode, implode et sprintf',
            content: '<code>explode(séparateur, chaîne)</code> découpe une chaîne en tableau. <code>implode(séparateur, tableau)</code> fait l\'inverse. <code>sprintf()</code> formate une chaîne avec des placeholders (<code>%s</code> pour string, <code>%d</code> pour entier, <code>%f</code> pour flottant).',
            code: {
              filename: 'explode.php',
              src: '<?php\n// explode\n$csv = "Alice,Bob,Charlie";\n$noms = explode(",", $csv);\nprint_r($noms); // Array ( [0] => Alice [1] => Bob [2] => Charlie )\n\n// implode\n$rejoins = implode(" | ", $noms);\necho $rejoins; // Alice | Bob | Charlie\n\n// sprintf\n$msg = sprintf("Bonjour %s, tu as %d ans.", "Alice", 30);\necho $msg; // Bonjour Alice, tu as 30 ans.\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle fonction PHP découpe une chaîne en tableau ?',
            options: ['split()', 'explode()', 'str_split()', 'divide()'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! explode(séparateur, chaîne) découpe en tableau.',
            errorMsg: 'C\'est explode() qui découpe une chaîne en tableau selon un séparateur.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare $texte = "hello world php", convertis-le en majuscules avec strtoupper() et affiche le résultat.',
            placeholder: '<?php\n$texte = "hello world php";\n// Convertis et affiche\n?>',
            filename: 'upper.php',
            xp: 25,
            hint: 'echo strtoupper($texte);',
            validator: (code: string) => code.includes('strtoupper') && code.includes('echo')
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
        title: 'Déclarer et utiliser des fonctions',
        subtitle: 'function, paramètres, retour et closures',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Déclarer une fonction',
            content: 'En PHP, on déclare une fonction avec le mot-clé <strong>function</strong>. On peut définir des <strong>paramètres par défaut</strong>. Depuis PHP 7, on peut ajouter des <strong>type hints</strong> pour les paramètres et le type de retour.',
            code: {
              filename: 'fonctions.php',
              src: '<?php\n// Fonction simple\nfunction saluer(string $nom, string $civilite = "M."): string {\n    return "Bonjour " . $civilite . " " . $nom . " !";\n}\n\necho saluer("Dupont");           // Bonjour M. Dupont !\necho saluer("Martin", "Mme.");   // Bonjour Mme. Martin !\n\n// Fonction avec type hint strict\nfunction additionner(int $a, int $b): int {\n    return $a + $b;\n}\necho additionner(5, 3); // 8\n?>'
            }
          },
          {
            type: 'theory',
            title: 'Fonctions anonymes et arrow functions',
            content: 'Les <strong>fonctions anonymes</strong> (closures) peuvent être assignées à des variables. Elles peuvent capturer des variables extérieures avec <code>use</code>. Les <strong>arrow functions</strong> (<code>fn =&gt;</code>, PHP 7.4+) sont plus concises et capturent automatiquement le contexte.',
            code: {
              filename: 'closures.php',
              src: '<?php\n// Fonction anonyme\n$multiplier = function(int $a, int $b): int {\n    return $a * $b;\n};\necho $multiplier(4, 5); // 20\n\n// Closure avec use\n$taxe = 0.2;\n$calculerTTC = function(float $ht) use ($taxe): float {\n    return $ht * (1 + $taxe);\n};\necho $calculerTTC(100); // 120\n\n// Arrow function (PHP 7.4+)\n$carre = fn($n) => $n * $n;\necho $carre(7); // 49\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Comment une closure PHP accède-t-elle à une variable du scope parent ?',
            options: ['Automatiquement', 'Avec global', 'Avec use', 'Avec this'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Le mot-clé use permet à une closure de capturer des variables du scope parent.',
            errorMsg: 'Une closure PHP utilise use($variable) pour accéder aux variables du contexte extérieur.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction "calculerAire" qui prend $largeur et $hauteur (int) et retourne leur produit (int). Affiche l\'aire d\'un rectangle 5x8.',
            placeholder: '<?php\nfunction calculerAire(int $largeur, int $hauteur): int {\n    // Retourne le produit\n}\n\necho calculerAire(5, 8);\n?>',
            filename: 'aire.php',
            xp: 30,
            hint: 'return $largeur * $hauteur;',
            validator: (code: string) => code.includes('function') && code.includes('return') && code.includes('echo')
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
        title: 'Tableaux indexés et associatifs',
        subtitle: 'Créer, manipuler et parcourir des tableaux',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Tableaux indexés et associatifs',
            content: 'PHP supporte les <strong>tableaux indexés</strong> (index numérique) et les <strong>tableaux associatifs</strong> (clés string). Les deux peuvent être créés avec <code>[]</code> ou <code>array()</code>. Les tableaux peuvent être <strong>multidimensionnels</strong>.',
            code: {
              filename: 'tableaux.php',
              src: '<?php\n// Indexé\n$fruits = ["Pomme", "Banane", "Cerise"];\necho $fruits[0]; // Pomme\n\n// Associatif\n$utilisateur = [\n    "nom"  => "Alice",\n    "age"  => 30,\n    "ville"=> "Paris"\n];\necho $utilisateur["nom"]; // Alice\n\n// Multidimensionnel\n$equipes = [\n    ["Alice", "Bob"],\n    ["Charlie", "Diana"]\n];\necho $equipes[0][1]; // Bob\n?>'
            }
          },
          {
            type: 'theory',
            title: 'Fonctions de tableau',
            content: 'PHP offre de nombreuses fonctions : <code>count()</code> (taille), <code>array_push()</code> / <code>array_pop()</code> (ajout/suppression en fin), <code>array_merge()</code> (fusion), <code>in_array()</code> (recherche), <code>array_map()</code> (transformation), <code>array_filter()</code> (filtrage), <code>sort()</code> / <code>rsort()</code> (tri).',
            code: {
              filename: 'array_fonctions.php',
              src: '<?php\n$nombres = [5, 2, 8, 1, 9];\n\nsort($nombres);\nprint_r($nombres); // [1, 2, 5, 8, 9]\n\necho count($nombres); // 5\n\n// array_map\n$doubles = array_map(fn($n) => $n * 2, $nombres);\nprint_r($doubles); // [2, 4, 10, 16, 18]\n\n// array_filter\n$grands = array_filter($nombres, fn($n) => $n > 4);\nprint_r($grands); // [5, 8, 9]\n\n// in_array\nvar_dump(in_array(8, $nombres)); // bool(true)\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle fonction retourne le nombre d\'éléments d\'un tableau PHP ?',
            options: ['length()', 'size()', 'count()', 'sizeof()'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! count() retourne le nombre d\'éléments. sizeof() est un alias de count().',
            errorMsg: 'C\'est count() qui compte les éléments d\'un tableau en PHP.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un tableau $notes = [15, 8, 12, 19, 10]. Trie-le avec sort(), puis affiche chaque note avec foreach.',
            placeholder: '<?php\n$notes = [15, 8, 12, 19, 10];\n// Trie\n// Affiche avec foreach\n?>',
            filename: 'notes.php',
            xp: 30,
            hint: 'sort($notes); puis foreach ($notes as $note) { echo $note; }',
            validator: (code: string) => code.includes('sort') && code.includes('foreach') && code.includes('echo')
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
        title: 'Classes, objets et encapsulation',
        subtitle: '__construct, visibilité et $this',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Déclarer une classe PHP',
            content: 'En PHP, une <strong>classe</strong> regroupe des propriétés et des méthodes. Le <strong>constructeur</strong> est la méthode spéciale <code>__construct()</code>. La variable <code>$this</code> référence l\'objet courant. Les modificateurs de visibilité : <code>public</code>, <code>protected</code>, <code>private</code>.',
            code: {
              filename: 'Voiture.php',
              src: '<?php\nclass Voiture {\n    private string $marque;\n    private int $annee;\n    private float $vitesse = 0;\n\n    public function __construct(string $marque, int $annee) {\n        $this->marque = $marque;\n        $this->annee  = $annee;\n    }\n\n    public function accelerer(float $delta): void {\n        $this->vitesse += $delta;\n    }\n\n    public function getMarque(): string {\n        return $this->marque;\n    }\n\n    public function __toString(): string {\n        return $this->marque . " (" . $this->annee . ") - " . $this->vitesse . " km/h";\n    }\n}\n\n$v = new Voiture("Toyota", 2022);\n$v->accelerer(80);\necho $v; // Toyota (2022) - 80 km/h\n?>'
            }
          },
          {
            type: 'theory',
            title: 'Héritage et interface en PHP',
            content: 'PHP supporte l\'<strong>héritage</strong> simple avec <code>extends</code>. On utilise <code>parent::__construct()</code> pour appeler le constructeur parent. Les <strong>interfaces</strong> définissent un contrat avec <code>interface</code> et sont implémentées avec <code>implements</code>. Les méthodes et propriétés <strong>static</strong> appartiennent à la classe, pas à l\'instance.',
            code: {
              filename: 'Heritage.php',
              src: '<?php\nclass Animal {\n    protected string $nom;\n\n    public function __construct(string $nom) {\n        $this->nom = $nom;\n    }\n\n    public function parler(): string {\n        return $this->nom . " fait un bruit.";\n    }\n}\n\nclass Chien extends Animal {\n    public function parler(): string {\n        return $this->nom . " aboie !";\n    }\n}\n\ninterface Sauvable {\n    public function sauvegarder(): bool;\n}\n\n$chien = new Chien("Rex");\necho $chien->parler(); // Rex aboie !\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Comment appelle-t-on le constructeur de la classe parente en PHP ?',
            options: ['super()', 'parent::__construct()', 'base()', 'this->parent()'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! parent::__construct() appelle le constructeur de la classe parente.',
            errorMsg: 'En PHP c\'est parent::__construct() (pas super() comme en Java).'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une classe Personne avec les propriétés privées $nom et $age, un __construct, et un getter getNom(). Crée une instance et affiche son nom.',
            placeholder: '<?php\nclass Personne {\n    // Propriétés privées\n    // __construct\n    // getNom()\n}\n\n$p = new Personne("Alice", 30);\necho $p->getNom();\n?>',
            filename: 'Personne.php',
            xp: 40,
            hint: 'private string $nom; puis public function getNom(): string { return $this->nom; }',
            validator: (code: string) => code.includes('class') && code.includes('__construct') && code.includes('getNom')
          }
        ]
      }
    ]
  },
  {
    icon: '📂',
    title: 'Fichiers et formulaires',
    lessons: [
      {
        title: '$_GET, $_POST et sessions',
        subtitle: 'Formulaires, validation et cookies',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Superglobales $_GET et $_POST',
            content: 'PHP utilise des <strong>superglobales</strong> pour récupérer les données des formulaires. <code>$_GET</code> reçoit les données de l\'URL (méthode GET). <code>$_POST</code> reçoit les données du corps de la requête (méthode POST). <code>isset()</code> vérifie si une variable existe.',
            code: {
              filename: 'formulaire.php',
              src: '<?php\n// HTML form method="POST" action="formulaire.php"\n// <input name="nom"> <input name="age">\n\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\n    if (isset($_POST["nom"]) && isset($_POST["age"])) {\n        $nom = $_POST["nom"];\n        $age = (int) $_POST["age"];\n        echo "Bonjour " . $nom . ", tu as " . $age . " ans.";\n    }\n}\n\n// $_GET pour les paramètres URL\n// URL : page.php?id=42&lang=fr\n$id = isset($_GET["id"]) ? (int) $_GET["id"] : 0;\n$lang = isset($_GET["lang"]) ? $_GET["lang"] : "fr";\n?>'
            }
          },
          {
            type: 'theory',
            title: 'Sessions et cookies',
            content: 'Les <strong>sessions</strong> permettent de persister des données entre les pages. <code>session_start()</code> doit être appelé avant tout output HTML. Les données sont stockées dans <code>$_SESSION</code>. Les <strong>cookies</strong> sont gérés avec <code>setcookie()</code> et lus via <code>$_COOKIE</code>.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'session_start() en premier',
              text: 'session_start() doit être appelé avant tout affichage HTML (même pas un espace avant <?php). Sinon : "headers already sent".'
            },
            code: {
              filename: 'session.php',
              src: '<?php\nsession_start();\n\n// Enregistrer des données\n$_SESSION["utilisateur"] = "Alice";\n$_SESSION["role"] = "admin";\n\n// Lire\necho $_SESSION["utilisateur"]; // Alice\n\n// Détruire la session\n// session_destroy();\n\n// Cookie (expire dans 1 heure)\nsetcookie("langue", "fr", time() + 3600);\necho $_COOKIE["langue"]; // fr (disponible à la prochaine requête)\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle superglobale PHP contient les données d\'un formulaire POST ?',
            options: ['$_REQUEST', '$_FORM', '$_POST', '$_DATA'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! $_POST contient les données envoyées via la méthode POST.',
            errorMsg: 'C\'est $_POST qui contient les données d\'un formulaire POST.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un script PHP qui vérifie si $_GET["nom"] existe avec isset() et affiche "Bonjour [nom]" si oui, "Nom manquant" sinon.',
            placeholder: '<?php\n// Vérifie $_GET["nom"] et affiche le message approprié\n?>',
            filename: 'get.php',
            xp: 35,
            hint: 'if (isset($_GET["nom"])) { echo "Bonjour " . $_GET["nom"]; } else { echo "Nom manquant"; }',
            validator: (code: string) => code.includes('isset') && code.includes('$_GET') && code.includes('echo')
          }
        ]
      }
    ]
  },
  {
    icon: '🗄️',
    title: 'PDO et bases de données',
    lessons: [
      {
        title: 'Connexion PDO et requêtes préparées',
        subtitle: 'MySQL, fetch et gestion d\'erreurs',
        type: 'theory',
        time: '18 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Se connecter avec PDO',
            content: '<strong>PDO</strong> (PHP Data Objects) est l\'interface recommandée pour interagir avec les bases de données en PHP. Elle supporte MySQL, PostgreSQL, SQLite, etc. La connexion se fait via une chaîne DSN. Il faut toujours envelopper la connexion dans un <code>try/catch</code> pour gérer les erreurs.',
            code: {
              filename: 'connexion.php',
              src: '<?php\n$host = "localhost";\n$dbname = "ma_base";\n$user = "root";\n$pass = "";\n\ntry {\n    $pdo = new PDO(\n        "mysql:host=$host;dbname=$dbname;charset=utf8",\n        $user,\n        $pass,\n        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]\n    );\n    echo "Connexion réussie !";\n} catch (PDOException $e) {\n    echo "Erreur : " . $e->getMessage();\n}\n?>'
            }
          },
          {
            type: 'theory',
            title: 'Requêtes préparées',
            content: 'Les <strong>requêtes préparées</strong> sont la manière sécurisée d\'envoyer des données à la base. Elles séparent le SQL des données, ce qui prévient les injections SQL. On utilise <code>prepare()</code>, <code>bindParam()</code> / <code>bindValue()</code>, puis <code>execute()</code>. Pour lire les résultats : <code>fetch()</code> (une ligne) ou <code>fetchAll()</code> (toutes les lignes).',
            callout: {
              kind: 'tip',
              icon: '🛡️',
              title: 'Toujours utiliser des requêtes préparées',
              text: 'Ne jamais concaténer directement les données utilisateur dans une requête SQL. Les requêtes préparées protègent automatiquement contre les injections SQL.'
            },
            code: {
              filename: 'requetes.php',
              src: '<?php\n// SELECT avec requête préparée\n$stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE age > :age");\n$stmt->bindParam(":age", $ageMin, PDO::PARAM_INT);\n$ageMin = 18;\n$stmt->execute();\n$utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);\n\nforeach ($utilisateurs as $u) {\n    echo $u["nom"] . " - " . $u["age"] . "<br>";\n}\n\n// INSERT\n$stmt = $pdo->prepare("INSERT INTO utilisateurs (nom, email) VALUES (:nom, :email)");\n$stmt->execute([":nom" => "Alice", ":email" => "alice@ex.com"]);\necho "Inséré avec l\'id : " . $pdo->lastInsertId();\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Pourquoi utilise-t-on des requêtes préparées en PHP/PDO ?',
            options: [
              'Pour aller plus vite',
              'Pour éviter d\'écrire du SQL',
              'Pour prévenir les injections SQL',
              'Pour se connecter à plusieurs bases simultanément'
            ],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Les requêtes préparées séparent les données du SQL, prévenant ainsi les injections.',
            errorMsg: 'Les requêtes préparées protègent contre les injections SQL en séparant le code SQL des données.'
          },
          {
            type: 'code-challenge',
            instructions: 'Complète le code de requête préparée : prépare un SELECT avec un paramètre :id, bind l\'id 5, exécute et affiche le résultat avec fetch().',
            placeholder: '<?php\n// $pdo est déjà disponible\n$id = 5;\n$stmt = $pdo->prepare("SELECT nom, email FROM users WHERE id = :id");\n// bindParam et execute\n// fetch et affichage\n?>',
            filename: 'select.php',
            xp: 45,
            hint: '$stmt->bindParam(":id", $id); $stmt->execute(); $row = $stmt->fetch(PDO::FETCH_ASSOC);',
            validator: (code: string) => code.includes('prepare') && code.includes('execute') && code.includes('fetch')
          }
        ]
      }
    ]
  },
  {
    icon: '🛡️',
    title: 'Sécurité PHP',
    lessons: [
      {
        title: 'Protéger ses applications PHP',
        subtitle: 'XSS, CSRF, injections SQL et mots de passe',
        type: 'theory',
        time: '16 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'XSS et htmlspecialchars',
            content: 'Le <strong>XSS</strong> (Cross-Site Scripting) permet à un attaquant d\'injecter du JavaScript dans une page. Pour s\'en protéger, on échappe toujours les données affichées avec <code>htmlspecialchars()</code> qui convertit les caractères spéciaux HTML (<code>&lt;</code>, <code>&gt;</code>, <code>"</code>) en entités HTML. Ne jamais afficher directement des données utilisateur sans les avoir échappées.',
            callout: {
              kind: 'warn',
              icon: '🚨',
              title: 'Règle d\'or',
              text: 'Toute donnée venant de l\'utilisateur (GET, POST, base de données) doit être échappée avant affichage avec htmlspecialchars().'
            },
            code: {
              filename: 'xss.php',
              src: '<?php\n// DANGEREUX : affiche directement la saisie utilisateur\n// echo $_POST["commentaire"]; // Permet l\'injection JS !\n\n// SÉCURISÉ : escape avant affichage\n$commentaire = $_POST["commentaire"] ?? "";\necho htmlspecialchars($commentaire, ENT_QUOTES, "UTF-8");\n// <script>alert("hack")</script>\n// devient : &lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt;\n\n// filter_var pour valider\n$email = filter_var($_POST["email"] ?? "", FILTER_VALIDATE_EMAIL);\nif ($email === false) {\n    echo "Email invalide !";\n}\n?>'
            }
          },
          {
            type: 'theory',
            title: 'Mots de passe et tokens CSRF',
            content: '<code>password_hash()</code> hache un mot de passe avec bcrypt (jamais stocker les mots de passe en clair). <code>password_verify()</code> compare un mot de passe saisi avec son hash. Le <strong>CSRF</strong> (Cross-Site Request Forgery) est contré avec un token unique par formulaire stocké en session.',
            code: {
              filename: 'securite.php',
              src: '<?php\n// Hasher un mot de passe\n$hash = password_hash("MonMotDePasse123", PASSWORD_BCRYPT);\necho $hash; // $2y$10$...\n\n// Vérifier lors de la connexion\n$mdpSaisi = "MonMotDePasse123";\nif (password_verify($mdpSaisi, $hash)) {\n    echo "Connexion réussie !";\n}\n\n// Token CSRF\nsession_start();\nif (empty($_SESSION["csrf_token"])) {\n    $_SESSION["csrf_token"] = bin2hex(random_bytes(32));\n}\n// Dans le formulaire HTML :\n// <input type="hidden" name="csrf" value="<?= $_SESSION["csrf_token"] ?>">\n\n// Vérification à la réception\nif ($_POST["csrf"] !== $_SESSION["csrf_token"]) {\n    die("Requête CSRF détectée !");\n}\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle fonction PHP sécurise l\'affichage des données utilisateur contre le XSS ?',
            options: ['strip_tags()', 'htmlspecialchars()', 'sanitize()', 'escape()'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! htmlspecialchars() convertit les caractères spéciaux HTML en entités inoffensives.',
            errorMsg: 'C\'est htmlspecialchars() qui protège contre le XSS en échappant les balises HTML.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète le code de gestion de mot de passe :',
            xp: 25,
            parts: [
              { type: 'text', value: '$hash = ' },
              { type: 'blank', placeholder: 'fonction', correct: 'password_hash' },
              { type: 'text', value: '($mdp, PASSWORD_BCRYPT);\n\nif (' },
              { type: 'blank', placeholder: 'fonction', correct: 'password_verify' },
              { type: 'text', value: '($mdpSaisi, $hash)) {\n    echo "OK";\n}' }
            ]
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un code PHP qui récupère $_POST["nom"], l\'échappe avec htmlspecialchars() et l\'affiche. Si $_POST["nom"] n\'existe pas, affiche "Nom manquant".',
            placeholder: '<?php\n// Récupère, échappe et affiche\n?>',
            filename: 'safe.php',
            xp: 35,
            hint: '$nom = isset($_POST["nom"]) ? htmlspecialchars($_POST["nom"], ENT_QUOTES, "UTF-8") : "";',
            validator: (code: string) => code.includes('htmlspecialchars') && code.includes('$_POST') && code.includes('echo')
          }
        ]
      }
    ]
  }
]
