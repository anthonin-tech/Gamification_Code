import type { CourseModule } from '@/types/cours'

export const CURRICULUM_RUST: CourseModule[] = [
  {
    icon: '🦀',
    title: 'Introduction à Rust',
    lessons: [
      {
        title: 'Pourquoi Rust ?',
        subtitle: 'Sécurité mémoire sans garbage collector',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Le langage le plus aimé des développeurs',
            content: 'Rust est un langage système créé par Mozilla, classé langage le plus apprécié par les développeurs pendant plusieurs années consécutives. Sa garantie unique : <strong>sécurité mémoire sans garbage collector</strong>. Le compilateur détecte les bugs mémoire à la compilation — dangling pointers et data races sont impossibles.',
            callout: {
              kind: 'tip',
              icon: '🦀',
              title: 'Le borrow checker',
              text: 'Le compilateur Rust vérifie les règles de propriété à la compilation. Frustrant au début, il élimine une classe entière de bugs de mémoire avant même l\'exécution.'
            },
            code: {
              filename: 'main.rs',
              src: 'fn main() {\n    let message = "Bonjour, Rust !";\n    println!("{}", message);\n    println!("Valeur : {message}"); // syntaxe Rust 1.58+\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que garantit Rust à la compilation ?',
            options: [
              'Performances maximales à tout prix',
              'Sécurité mémoire sans garbage collector',
              'Syntaxe la plus simple possible',
              'Compatibilité avec tous les OS'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Rust garantit la sécurité mémoire sans GC — sa proposition unique.',
            errorMsg: 'La garantie principale de Rust est la sécurité mémoire à la compilation, sans GC.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un programme Rust qui affiche ton nom avec println!. Utilise la syntaxe "{variable}" introduite dans Rust 1.58.',
            placeholder: 'fn main() {\n    let nom = "ton nom";\n    // affiche avec println!\n}',
            filename: 'main.rs',
            xp: 30,
            validator: (code: string) => code.includes('println!') && code.includes('let'),
            hint: 'println!("{nom}") ou println!("{}", nom) fonctionnent tous les deux.'
          }
        ]
      },
      {
        title: 'Cargo : le gestionnaire de projet',
        subtitle: 'cargo new, run, build, test',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'Cargo, le couteau suisse Rust',
            content: '<code>cargo new mon_projet</code> crée un nouveau projet. <code>cargo run</code> compile et exécute. <code>cargo build</code> compile (debug). <code>cargo build --release</code> compile avec optimisations. <code>cargo test</code> lance les tests. Cargo gère aussi les dépendances via <code>Cargo.toml</code>.',
            code: {
              filename: 'Cargo.toml',
              src: '[package]\nname = "mon_projet"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]\nserde = { version = "1.0", features = ["derive"] }'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle commande compile Rust avec les optimisations pour la production ?',
            options: ['cargo run', 'cargo build', 'cargo build --release', 'cargo compile --prod'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! --release active les optimisations LLVM pour un binaire performant.',
            errorMsg: 'cargo build --release active les optimisations. Sans --release, c\'est le mode debug (plus lent, informations de débogage).'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la commande pour créer un nouveau projet Rust nommé "hello_rust".',
            xp: 15,
            parts: [
              { type: 'blank', placeholder: 'outil', correct: 'cargo' },
              { type: 'text', value: ' new hello_rust' }
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
        title: 'let, mut et immutabilité',
        subtitle: 'Variables immuables par défaut, shadowing',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Immuable par défaut',
            content: 'En Rust, les variables sont <strong>immuables par défaut</strong>. Pour les rendre modifiables, il faut ajouter <code>mut</code>. Le <strong>shadowing</strong> permet de redéclarer une variable avec le même nom (et même changer son type) — différent de mut car on crée une nouvelle variable.',
            code: {
              filename: 'variables.rs',
              src: 'fn main() {\n    let x = 5;           // immuable\n    // x = 6;           // ❌ Erreur de compilation\n\n    let mut score = 0;   // mutable\n    score += 10;         // ✅ OK\n\n    // Shadowing\n    let espaces = "   ";\n    let espaces = espaces.len(); // redéclaration : string -> usize\n\n    println!("score: {score}, espaces: {espaces}");\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre let mut x = 5 et let x = 5; let x = 6 (shadowing) ?',
            options: [
              'Aucune différence',
              'mut modifie la valeur, le shadowing crée une nouvelle variable',
              'Le shadowing nécessite le même type',
              'mut est plus rapide que le shadowing'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! Le shadowing crée une nouvelle variable, peut changer le type. mut modifie la même variable.',
            errorMsg: 'Le shadowing (let x = ...) crée une nouvelle variable et peut changer son type. mut modifie la même variable.'
          },
          {
            type: 'code-challenge',
            instructions: 'Déclare une variable mut "compteur" à 0, puis incrémente-la 3 fois. Affiche la valeur finale.',
            placeholder: 'fn main() {\n    // declare compteur\n    // incremente 3 fois\n    println!("{}", compteur);\n}',
            filename: 'main.rs',
            xp: 30,
            validator: (code: string) => code.includes('let mut') && code.includes('println!'),
            hint: 'let mut compteur = 0; puis compteur += 1; trois fois.'
          }
        ]
      },
      {
        title: 'Types scalaires et constantes',
        subtitle: 'i32/u32/f64/bool/char, const, static',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Le système de types Rust',
            content: 'Rust est <strong>fortement et statiquement typé</strong>. Types entiers : <code>i8/i16/i32/i64/i128/isize</code> (signés) et <code>u8/u16/u32/u64/u128/usize</code> (non signés). Flottants : <code>f32/f64</code>. <code>bool</code> pour vrai/faux. <code>char</code> pour un caractère Unicode (4 octets). <code>const</code> est évalué à la compilation. <code>static</code> vit toute la durée du programme.',
            code: {
              filename: 'types.rs',
              src: 'const MAX_POINTS: u32 = 100_000;\nstatic BONJOUR: &str = "Salut !";\n\nfn main() {\n    let age: i32 = 25;\n    let taille: f64 = 1.75;\n    let actif: bool = true;\n    let lettre: char = \'A\';\n\n    // Inférence de type\n    let score = 42_000i64;  // suffixe de type\n\n    println!("{} {} {} {} {}", age, taille, actif, lettre, score);\n    println!("{MAX_POINTS} {BONJOUR}");\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la taille d\'un char en Rust ?',
            options: ['1 octet', '2 octets', '4 octets', 'Variable'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Un char Rust représente un scalaire Unicode — 4 octets, pas 1 comme en C.',
            errorMsg: 'Un char Rust vaut 4 octets car il représente n\'importe quel caractère Unicode (U+0000 à U+10FFFF).'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la déclaration de constante Rust correctement typée.',
            xp: 20,
            parts: [
              { type: 'blank', placeholder: 'mot-clé', correct: 'const' },
              { type: 'text', value: ' LIMITE: u32 = 1000;' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🔣',
    title: 'Ownership',
    lessons: [
      {
        title: 'Les règles d\'ownership',
        subtitle: 'Un seul propriétaire, move semantics, drop',
        type: 'theory',
        time: '16 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Les trois règles',
            content: 'L\'ownership est le concept central de Rust. Trois règles : <strong>1. Chaque valeur a un unique propriétaire.</strong> <strong>2. Il ne peut y avoir qu\'un seul propriétaire à la fois.</strong> <strong>3. Quand le propriétaire sort du scope, la valeur est libérée (drop).</strong> L\'assignation <em>déplace</em> la propriété (move) pour les types heap (String, Vec...). Les types stack (i32, bool...) sont copiés (Copy trait).',
            code: {
              filename: 'ownership.rs',
              src: 'fn main() {\n    // String est sur le heap -> move\n    let s1 = String::from("bonjour");\n    let s2 = s1;  // s1 est "moved" dans s2\n    // println!("{s1}"); // ❌ Erreur ! s1 n\'existe plus\n    println!("{s2}"); // ✅ OK\n\n    // i32 est Copy -> copie\n    let x = 5;\n    let y = x;   // x est copié\n    println!("{x} {y}"); // ✅ Les deux sont valides\n\n    // Drop automatique à la fin du scope\n    {\n        let s3 = String::from("scoped");\n        println!("{s3}");\n    } // s3 est drop ici\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que se passe-t-il quand on assigne s1 à s2 pour une String en Rust ?',
            options: [
              's1 et s2 pointent vers la même donnée',
              'La donnée est copiée en profondeur',
              's1 est invalidée, s2 devient le nouveau propriétaire',
              'Les deux restent valides'
            ],
            correct: 2,
            xp: 25,
            successMsg: 'Exact ! Le move invalide s1. Rust évite ainsi la double libération mémoire.',
            errorMsg: 'Rust transfère (move) la propriété. s1 devient invalide pour éviter un double free.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une fonction prendre(s: String) qui affiche s. Appelle-la depuis main. Essaie d\'utiliser s après l\'appel — le compilateur doit signaler une erreur. Comment régler le problème avec clone() ?',
            placeholder: 'fn prendre(s: String) {\n    println!("{s}");\n}\n\nfn main() {\n    let s = String::from("rust");\n    prendre(s.clone()); // utilise clone pour garder s\n    println!("{s}");   // maintenant s est encore valide\n}',
            filename: 'main.rs',
            xp: 40,
            validator: (code: string) => code.includes('fn prendre') && code.includes('clone') && code.includes('println!'),
            hint: 's.clone() crée une copie profonde indépendante. La propriété de l\'original reste intacte.'
          }
        ]
      },
      {
        title: 'Stack vs heap et Copy trait',
        subtitle: 'Comprendre ce qui est copié vs déplacé',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Pourquoi move ? Stack vs Heap',
            content: 'La <strong>stack</strong> (pile) stocke les valeurs de taille connue à la compilation (i32, bool, f64, tuples...) — copie bon marché. Le <strong>heap</strong> (tas) stocke les données dynamiques (String, Vec...) — copie coûteuse. Le trait <code>Copy</code> marque les types dont la copie est triviale. Les types <code>Drop</code> (libèrent des ressources) ne peuvent pas être Copy.',
            callout: {
              kind: 'info',
              icon: 'ℹ️',
              title: 'Types Copy',
              text: 'i32, u32, f64, bool, char, tuples de Copy, arrays de Copy : tous sont Copy. String, Vec, HashMap, File ne le sont pas.'
            },
            code: {
              filename: 'copy.rs',
              src: 'fn double(x: i32) -> i32 {\n    x * 2  // i32 est Copy, pas de move\n}\n\nfn main() {\n    let n = 21;\n    let resultat = double(n);\n    println!("{n} * 2 = {resultat}"); // n toujours valide\n\n    // Tuple de types Copy -> Copy\n    let point = (1.0f64, 2.0f64);\n    let point2 = point;\n    println!("{:?} {:?}", point, point2); // les deux valides\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Lequel de ces types implémente le trait Copy en Rust ?',
            options: ['String', 'Vec<i32>', 'i32', 'HashMap<String, i32>'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! i32 a une taille fixe sur la stack — sa copie est triviale et bon marché.',
            errorMsg: 'Seuls les types stack à taille fixe sont Copy. String, Vec et HashMap sont sur le heap.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète pour créer une copie profonde d\'une String.',
            xp: 20,
            parts: [
              { type: 'text', value: 'let s1 = String::from("hello");\nlet s2 = s1.' },
              { type: 'blank', placeholder: 'méthode', correct: 'clone' },
              { type: 'text', value: '();' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🔗',
    title: 'Borrowing et références',
    lessons: [
      {
        title: 'Références immuables et mutables',
        subtitle: '& et &mut, règles du borrow checker',
        type: 'theory',
        time: '16 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Emprunter sans prendre la propriété',
            content: 'Les <strong>références</strong> permettent d\'accéder à une valeur sans en prendre la propriété. <code>&T</code> est une référence immuable. <code>&mut T</code> est une référence mutable. Règles du borrow checker : soit <strong>n références immuables</strong>, soit <strong>une seule référence mutable</strong> — jamais les deux en même temps. Cela prévient les data races à la compilation.',
            code: {
              filename: 'borrows.rs',
              src: 'fn longueur(s: &String) -> usize {\n    s.len()  // emprunte sans prendre la propriété\n}\n\nfn ajouter_exclamation(s: &mut String) {\n    s.push_str(" !");\n}\n\nfn main() {\n    let s = String::from("bonjour");\n    let len = longueur(&s);       // emprunt immuable\n    println!("longueur: {len}");\n    println!("{s}");               // s est toujours valide\n\n    let mut phrase = String::from("Salut");\n    ajouter_exclamation(&mut phrase); // emprunt mutable\n    println!("{phrase}");             // "Salut !"\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Combien de références mutables peut-on avoir simultanément en Rust ?',
            options: ['Autant qu\'on veut', '2 maximum', '1 seule', '0 — les mutations sont interdites'],
            correct: 2,
            xp: 25,
            successMsg: 'Exact ! Une seule &mut à la fois — cette règle élimine les data races à la compilation.',
            errorMsg: 'Le borrow checker autorise exactement 1 référence mutable ou n références immuables — jamais les deux.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction calculer_double(v: &Vec<i32>) -> Vec<i32> qui retourne un nouveau Vec avec chaque élément doublé, sans prendre la propriété du vecteur original.',
            placeholder: 'fn calculer_double(v: &Vec<i32>) -> Vec<i32> {\n    // crée un nouveau vec avec les valeurs doublées\n}\n\nfn main() {\n    let nums = vec![1, 2, 3, 4];\n    let doubles = calculer_double(&nums);\n    println!("{:?}", nums);    // nums est toujours valide\n    println!("{:?}", doubles);\n}',
            filename: 'main.rs',
            xp: 45,
            validator: (code: string) => code.includes('fn calculer_double') && code.includes('&Vec') && code.includes('println!'),
            hint: 'v.iter().map(|x| x * 2).collect() crée un nouveau Vec sans modifier l\'original.'
          }
        ]
      },
      {
        title: 'Slices et lifetimes basiques',
        subtitle: '&str, slice de vecteur, dangling references',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Slices : références vers une portion',
            content: 'Une <strong>slice</strong> est une référence vers une portion contiguë d\'une collection. <code>&str</code> est une slice de string. <code>&[i32]</code> est une slice de vecteur. Les slices empruntent les données sans en prendre la propriété. Les <strong>lifetimes</strong> garantissent que les références ne survivent pas aux données qu\'elles référencent.',
            code: {
              filename: 'slices.rs',
              src: 'fn premier_mot(s: &str) -> &str {\n    let bytes = s.as_bytes();\n    for (i, &item) in bytes.iter().enumerate() {\n        if item == b\' \' {\n            return &s[0..i];\n        }\n    }\n    &s[..]\n}\n\nfn main() {\n    let phrase = String::from("bonjour monde");\n    let mot = premier_mot(&phrase);\n    println!("Premier mot : {mot}");\n\n    // Slices de vecteur\n    let v = vec![1, 2, 3, 4, 5];\n    let milieu: &[i32] = &v[1..4]; // [2, 3, 4]\n    println!("{:?}", milieu);\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre String et &str en Rust ?',
            options: [
              'Aucune différence pratique',
              'String est mutable, &str est une référence immuable vers des données UTF-8',
              '&str est plus lent',
              'String ne peut pas contenir des caractères Unicode'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! String est une donnée possédée sur le heap. &str est une vue immuable sur des données UTF-8.',
            errorMsg: 'String possède ses données (heap, mutable). &str emprunte des données UTF-8 (string literal ou slice de String).'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète pour créer une slice des 3 premiers éléments d\'un Vec.',
            xp: 20,
            parts: [
              { type: 'text', value: 'let slice: &[i32] = &v[' },
              { type: 'blank', placeholder: 'range', correct: '0..3' },
              { type: 'text', value: '];' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '⚡',
    title: 'Conditions et boucles',
    lessons: [
      {
        title: 'if/else, loop et while',
        subtitle: 'if comme expression, loop avec valeur de retour',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Expressions vs instructions',
            content: 'En Rust, <code>if</code> est une <strong>expression</strong> : il retourne une valeur. Pas de ternaire — on utilise directement if/else comme valeur. <code>loop</code> est une boucle infinie qui peut retourner une valeur via <code>break valeur</code>. <code>while</code> boucle tant qu\'une condition est vraie.',
            code: {
              filename: 'controle.rs',
              src: 'fn main() {\n    let nombre = 7;\n\n    // if comme expression\n    let description = if nombre % 2 == 0 { "pair" } else { "impair" };\n    println!("{nombre} est {description}");\n\n    // loop avec valeur de retour\n    let mut compteur = 0;\n    let resultat = loop {\n        compteur += 1;\n        if compteur == 10 {\n            break compteur * 2; // retourne 20\n        }\n    };\n    println!("Résultat: {resultat}");\n\n    // while\n    let mut n = 3;\n    while n > 0 {\n        print!("{n} ");\n        n -= 1;\n    }\n    println!();\n}'
            }
          },
          {
            type: 'quiz',
            question: 'En Rust, if/else peut être utilisé comme :',
            options: [
              'Uniquement une instruction',
              'Une expression qui retourne une valeur',
              'Uniquement dans des fonctions',
              'Un remplacement de match'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! let x = if cond { a } else { b }; fonctionne parce que if est une expression.',
            errorMsg: 'En Rust, if est une expression. let x = if condition { valeur1 } else { valeur2 }; est valide.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un programme qui utilise loop pour trouver la première puissance de 2 supérieure à 1000. Retourne et affiche cette valeur avec break.',
            placeholder: 'fn main() {\n    let mut n = 1;\n    let resultat = loop {\n        n *= 2;\n        // break avec valeur si n > 1000\n    };\n    println!("{resultat}");\n}',
            filename: 'main.rs',
            xp: 40,
            validator: (code: string) => code.includes('loop') && code.includes('break') && code.includes('println!'),
            hint: 'if n > 1000 { break n; } à l\'intérieur du loop.'
          }
        ]
      },
      {
        title: 'for..in et ranges',
        subtitle: '0..10 vs 0..=10, itérer sur des collections',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'for et les ranges',
            content: '<code>for x in 0..10</code> itère de 0 à 9 (exclusif). <code>for x in 0..=10</code> itère de 0 à 10 (inclusif). <code>for item in collection</code> consomme la collection. <code>for item in collection.iter()</code> emprunte. <code>for item in collection.iter_mut()</code> emprunte mutablement. <code>.rev()</code> inverse l\'itération.',
            code: {
              filename: 'for.rs',
              src: 'fn main() {\n    // Range exclusif\n    for i in 0..5 {\n        print!("{i} ");\n    }\n    println!();\n\n    // Range inclusif\n    for i in 1..=5 {\n        print!("{i} ");\n    }\n    println!();\n\n    // Itérer sur un tableau\n    let fruits = ["pomme", "banane", "cerise"];\n    for fruit in fruits.iter() {\n        println!("Fruit: {fruit}");\n    }\n\n    // Compter à rebours\n    for i in (1..=3).rev() {\n        println!("{i}...");\n    }\n    println!("Go !");\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle range inclut la valeur 10 ?',
            options: ['0..10', '0..=10', '0..11 donne aussi 10', 'Les deux 0..=10 et 0..11'],
            correct: 3,
            xp: 15,
            successMsg: 'Exact ! 0..=10 est inclusif (inclut 10), et 0..11 également (11 exclu, donc 10 inclus). Les deux fonctionnent.',
            errorMsg: '0..10 exclut 10. 0..=10 l\'inclut. 0..11 aussi. La réponse correcte était "les deux".'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète pour itérer en empruntant un Vec (sans le consommer).',
            xp: 20,
            parts: [
              { type: 'text', value: 'for item in v.' },
              { type: 'blank', placeholder: 'méthode', correct: 'iter' },
              { type: 'text', value: '() {\n    println!("{item}");\n}' }
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
        title: 'Fonctions et expressions',
        subtitle: 'fn, paramètres typés, expressions vs instructions',
        type: 'theory',
        time: '12 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'La syntaxe fn',
            content: 'Les fonctions Rust utilisent <code>fn</code>. Chaque paramètre doit être typé. Le type de retour est déclaré avec <code>-></code>. En Rust, la <strong>dernière expression sans point-virgule</strong> est implicitement retournée. <code>return</code> est disponible mais rarement nécessaire (utilisé pour les retours anticipés).',
            code: {
              filename: 'fonctions.rs',
              src: 'fn carre(n: i32) -> i32 {\n    n * n  // pas de point-virgule -> retour implicite\n}\n\nfn factorielle(n: u64) -> u64 {\n    if n == 0 { return 1; } // retour anticipé\n    n * factorielle(n - 1)  // retour implicite\n}\n\nfn min_max(v: &[i32]) -> (i32, i32) {\n    let mut min = v[0];\n    let mut max = v[0];\n    for &x in v {\n        if x < min { min = x; }\n        if x > max { max = x; }\n    }\n    (min, max)  // tuple retourné\n}\n\nfn main() {\n    println!("{}", carre(7));\n    println!("{}", factorielle(5));\n    let (a, b) = min_max(&[3, 1, 4, 1, 5, 9]);\n    println!("min={a}, max={b}");\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre "x + 1" et "x + 1;" en Rust dans une fonction ?',
            options: [
              'Aucune différence',
              '"x + 1" est une expression retournée, "x + 1;" est une instruction qui retourne ()',
              '"x + 1;" est plus rapide',
              'Le point-virgule est obligatoire sur la dernière ligne'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! Sans point-virgule : expression retournée. Avec : instruction qui retourne ().',
            errorMsg: 'Le point-virgule transforme une expression en instruction. La dernière expression sans ; est le retour implicite.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction est_premier(n: u32) -> bool qui retourne true si n est premier. Teste avec plusieurs valeurs dans main.',
            placeholder: 'fn est_premier(n: u32) -> bool {\n    if n < 2 { return false; }\n    // vérifie les diviseurs de 2 jusqu\'à sqrt(n)\n}\n\nfn main() {\n    println!("{}", est_premier(17));\n    println!("{}", est_premier(4));\n}',
            filename: 'main.rs',
            xp: 45,
            validator: (code: string) => code.includes('fn est_premier') && code.includes('-> bool') && code.includes('println!'),
            hint: 'for i in 2..n { if n % i == 0 { return false; } } true'
          }
        ]
      }
    ]
  },
  {
    icon: '📦',
    title: 'Structs',
    lessons: [
      {
        title: 'Structs et impl',
        subtitle: 'Définition, méthodes, méthodes associées, dérivation',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Structs classiques et impl',
            content: 'Une <code>struct</code> regroupe des données nommées. Le bloc <code>impl</code> y associe des <strong>méthodes</strong> (<code>&self</code>, <code>&mut self</code>) et des <strong>méthodes associées</strong> (constructeurs, appelées avec <code>Type::nom()</code>). Le derive <code>#[derive(Debug)]</code> permet d\'afficher avec <code>{:?}</code>.',
            code: {
              filename: 'structs.rs',
              src: '#[derive(Debug, Clone, PartialEq)]\nstruct Rectangle {\n    largeur: f64,\n    hauteur: f64,\n}\n\nimpl Rectangle {\n    // Méthode associée (constructeur)\n    fn nouveau(largeur: f64, hauteur: f64) -> Self {\n        Rectangle { largeur, hauteur }\n    }\n\n    // Méthode (emprunt immuable)\n    fn aire(&self) -> f64 {\n        self.largeur * self.hauteur\n    }\n\n    // Méthode (emprunt mutable)\n    fn agrandir(&mut self, facteur: f64) {\n        self.largeur *= facteur;\n        self.hauteur *= facteur;\n    }\n}\n\nfn main() {\n    let mut r = Rectangle::nouveau(3.0, 4.0);\n    println!("Aire: {}", r.aire());\n    r.agrandir(2.0);\n    println!("{:?}", r);\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre &self et &mut self dans un impl ?',
            options: [
              '&self lit les données, &mut self peut les modifier',
              '&self est plus rapide',
              '&mut self copie la struct',
              'Aucune différence pratique'
            ],
            correct: 0,
            xp: 20,
            successMsg: 'Exact ! &self emprunte immuablement pour lire, &mut self emprunte mutablement pour modifier.',
            errorMsg: '&self = accès en lecture. &mut self = accès en écriture (modifie la struct).'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une struct Cercle avec un champ rayon: f64. Implémente une méthode aire(&self) -> f64 et une méthode associée nouveau(rayon: f64) -> Self. Ajoute #[derive(Debug)].',
            placeholder: '#[derive(Debug)]\nstruct Cercle {\n    // ton champ\n}\n\nimpl Cercle {\n    // constructeur\n    // méthode aire\n}\n\nfn main() {\n    let c = Cercle::nouveau(5.0);\n    println!("Aire: {:.2}", c.aire());\n    println!("{:?}", c);\n}',
            filename: 'main.rs',
            xp: 45,
            validator: (code: string) => code.includes('struct Cercle') && code.includes('impl Cercle') && code.includes('fn aire') && code.includes('println!'),
            hint: 'Utilise std::f64::consts::PI ou 3.14159 pour le calcul de l\'aire.'
          }
        ]
      },
      {
        title: 'Tuple structs et unit structs',
        subtitle: 'struct Point(f64, f64), struct Marqueur',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'Variantes de struct',
            content: 'Les <strong>tuple structs</strong> ont des champs positionnels sans nom : utiles pour les wrappers de type (<code>struct Metres(f64)</code>). Les <strong>unit structs</strong> n\'ont pas de champs : utiles pour les marqueurs de type ou l\'implémentation de traits.',
            code: {
              filename: 'struct_variantes.rs',
              src: '// Tuple struct\nstruct Metres(f64);\nstruct Kilogrammes(f64);\n\n// Unit struct\nstruct Marqueur;\n\nfn distance(m: Metres) -> String {\n    format!("{:.2} m", m.0)\n}\n\nfn main() {\n    let d = Metres(42.5);\n    let poids = Kilogrammes(70.0);\n    // Les types Metres et Kilogrammes ne se mélangent pas !\n    println!("{}", distance(d));\n    println!("{:.1} kg", poids.0);\n\n    let _m = Marqueur; // utile pour les traits\n}'
            }
          },
          {
            type: 'quiz',
            question: 'À quoi servent les tuple structs comme struct Metres(f64) ?',
            options: [
              'Optimiser la mémoire',
              'Créer un nouveau type distinct pour éviter les confusions de types',
              'Remplacer les enums',
              'Créer des types génériques'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Newtype pattern : Metres et Kilogrammes sont distincts même si les deux wrappent f64.',
            errorMsg: 'Les tuple structs permettent le "newtype pattern" — des types distincts qui évitent les confusions (ex: mélanger Metres et Kilogrammes).'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète la déclaration d\'une tuple struct pour wrapper un entier.',
            xp: 15,
            parts: [
              { type: 'text', value: 'struct Score(' },
              { type: 'blank', placeholder: 'type', correct: 'i32' },
              { type: 'text', value: ');' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🎭',
    title: 'Enums et pattern matching',
    lessons: [
      {
        title: 'Enums et match exhaustif',
        subtitle: 'enum avec données, match, if let',
        type: 'theory',
        time: '16 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Les enums Rust sont puissantes',
            content: 'Les enums Rust peuvent porter des données différentes par variant — ce sont des <strong>types somme</strong>. <code>match</code> est exhaustif : tous les variants doivent être traités (ou utiliser <code>_</code> comme joker). <code>if let</code> est un match simplifié pour un seul variant. <code>while let</code> boucle tant qu\'un pattern matche.',
            code: {
              filename: 'enums.rs',
              src: '#[derive(Debug)]\nenum Message {\n    Quitter,\n    Déplacer { x: i32, y: i32 },\n    Écrire(String),\n    ChangerCouleur(u8, u8, u8),\n}\n\nfn traiter(msg: Message) {\n    match msg {\n        Message::Quitter => println!("Quitter"),\n        Message::Déplacer { x, y } => println!("Déplacer à ({x}, {y})"),\n        Message::Écrire(texte) => println!("Texte: {texte}"),\n        Message::ChangerCouleur(r, g, b) => println!("RGB({r},{g},{b})"),\n    }\n}\n\nfn main() {\n    traiter(Message::Écrire(String::from("salut")));\n    traiter(Message::Déplacer { x: 3, y: 7 });\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que se passe-t-il si on oublie un variant dans un match en Rust ?',
            options: [
              'Avertissement à la compilation',
              'Panique à l\'exécution',
              'Erreur de compilation — match non exhaustif',
              'Le variant est ignoré'
            ],
            correct: 2,
            xp: 25,
            successMsg: 'Exact ! Rust garantit l\'exhaustivité du match à la compilation. Pas de cas oublié possible.',
            errorMsg: 'Le compilateur Rust exige que tous les variants soient couverts. C\'est une erreur de compilation, pas un warning.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un enum Direction avec Nord, Sud, Est, Ouest. Écris une fonction deplacer(d: Direction) -> (i32, i32) qui retourne le delta (x, y) correspondant. Teste les 4 directions.',
            placeholder: 'enum Direction {\n    Nord, Sud, Est, Ouest\n}\n\nfn deplacer(d: Direction) -> (i32, i32) {\n    match d {\n        // tes cases\n    }\n}\n\nfn main() {\n    println!("{:?}", deplacer(Direction::Nord));\n}',
            filename: 'main.rs',
            xp: 45,
            validator: (code: string) => code.includes('enum Direction') && code.includes('match') && code.includes('println!'),
            hint: 'Direction::Nord => (0, 1), Direction::Sud => (0, -1), etc.'
          }
        ]
      },
      {
        title: 'Destructuring dans match',
        subtitle: 'Patterns, guards, binding avec @',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Patterns avancés',
            content: 'Le <code>match</code> Rust supporte de nombreux patterns : <strong>destructuring</strong> de tuples et structs, <strong>plages</strong> (<code>1..=5</code>), <strong>guards</strong> (<code>if condition</code> après le pattern), <strong>binding</strong> avec <code>@</code> (capturer ET tester). Les <code>|</code> dans les patterns permettent de matcher plusieurs valeurs.',
            code: {
              filename: 'patterns.rs',
              src: 'fn classer(n: i32) -> &\'static str {\n    match n {\n        i32::MIN..=-1 => "négatif",\n        0 => "zéro",\n        1..=9 => "un chiffre",\n        x @ 10..=99 => {\n            println!("deux chiffres: {x}");\n            "deux chiffres"\n        },\n        _ => "grand nombre",\n    }\n}\n\nfn main() {\n    println!("{}", classer(-5));\n    println!("{}", classer(0));\n    println!("{}", classer(42));\n    println!("{}", classer(100));\n}'
            }
          },
          {
            type: 'quiz',
            question: 'À quoi sert le @ dans un pattern match Rust ?',
            options: [
              'Indiquer un commentaire',
              'Capturer la valeur dans une variable tout en testant le pattern',
              'Appeler une méthode',
              'Créer une référence'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! x @ 1..=9 capture la valeur dans x ET vérifie qu\'elle est dans 1..=9.',
            errorMsg: 'Le @ binding permet de capturer et nommer la valeur tout en testant si elle correspond au pattern.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète le pattern match pour ignorer les variants non traités.',
            xp: 15,
            parts: [
              { type: 'text', value: 'match valeur {\n    1 => println!("un"),\n    2 => println!("deux"),\n    ' },
              { type: 'blank', placeholder: 'joker', correct: '_' },
              { type: 'text', value: ' => println!("autre"),\n}' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '📋',
    title: 'Collections',
    lessons: [
      {
        title: 'Vec, String et HashMap',
        subtitle: 'Les collections standard Rust',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Les collections essentielles',
            content: '<code>Vec&lt;T&gt;</code> est un tableau dynamique. <code>String</code> est une string UTF-8 possédée (modifiable). <code>HashMap&lt;K, V&gt;</code> est une table de hachage. Pour les itérateurs : <code>.iter()</code> emprunte, <code>.iter_mut()</code> emprunte mutablement, <code>.into_iter()</code> consomme la collection.',
            code: {
              filename: 'collections.rs',
              src: 'use std::collections::HashMap;\n\nfn main() {\n    // Vec\n    let mut v: Vec<i32> = Vec::new();\n    v.push(1);\n    v.push(2);\n    v.push(3);\n    println!("{:?}", v);      // [1, 2, 3]\n    println!("{}", v.pop().unwrap()); // 3\n\n    // vec! macro\n    let squares: Vec<i32> = (1..=5).map(|x| x * x).collect();\n    println!("{:?}", squares); // [1, 4, 9, 16, 25]\n\n    // HashMap\n    let mut scores: HashMap<String, i32> = HashMap::new();\n    scores.insert(String::from("Alice"), 95);\n    scores.entry(String::from("Bob")).or_insert(80);\n    println!("{:?}", scores);\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait scores.entry("clé").or_insert(0) ?',
            options: [
              'Remplace toujours la valeur par 0',
              'Insère 0 uniquement si la clé n\'existe pas, sinon laisse la valeur existante',
              'Retourne une erreur si la clé existe',
              'Supprime la clé si elle existe'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! entry().or_insert() est le pattern idiomatique pour initialiser ou garder une valeur.',
            errorMsg: 'or_insert insère la valeur par défaut uniquement si la clé est absente — pratique pour les compteurs.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un Vec de strings avec vec!, puis utilise .iter().filter() pour garder uniquement les strings de longueur > 4. Collecte en nouveau Vec et affiche.',
            placeholder: 'fn main() {\n    let mots = vec!["go", "rust", "python", "c", "kotlin"];\n    let longs: Vec<&&str> = mots.iter()\n        // filtre les mots > 4 chars\n        .collect();\n    println!("{:?}", longs);\n}',
            filename: 'main.rs',
            xp: 40,
            validator: (code: string) => code.includes('vec!') && code.includes('filter') && code.includes('collect') && code.includes('println!'),
            hint: '.filter(|s| s.len() > 4) avant .collect()'
          }
        ]
      }
    ]
  },
  {
    icon: '🛡️',
    title: 'Result et Option',
    lessons: [
      {
        title: 'Option<T> et Result<T, E>',
        subtitle: 'Gérer l\'absence et les erreurs sans exceptions',
        type: 'theory',
        time: '16 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Option et Result : la sécurité sans null',
            content: '<code>Option&lt;T&gt;</code> remplace null : <code>Some(valeur)</code> ou <code>None</code>. <code>Result&lt;T, E&gt;</code> remplace les exceptions : <code>Ok(valeur)</code> ou <code>Err(erreur)</code>. L\'opérateur <code>?</code> propage automatiquement l\'erreur (retourne tôt si Err). <code>unwrap()</code> panique si None/Err. <code>expect("msg")</code> panique avec message.',
            code: {
              filename: 'option_result.rs',
              src: 'use std::num::ParseIntError;\n\nfn doubler(s: &str) -> Result<i32, ParseIntError> {\n    let n = s.trim().parse::<i32>()?; // ? propage l\'erreur\n    Ok(n * 2)\n}\n\nfn trouver_premier_pair(v: &[i32]) -> Option<i32> {\n    v.iter().find(|&&x| x % 2 == 0).copied()\n}\n\nfn main() {\n    match doubler("21") {\n        Ok(n) => println!("Résultat: {n}"),\n        Err(e) => println!("Erreur: {e}"),\n    }\n\n    let nums = vec![1, 3, 5, 8, 9];\n    if let Some(n) = trouver_premier_pair(&nums) {\n        println!("Premier pair: {n}");\n    } else {\n        println!("Aucun pair");\n    }\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait l\'opérateur ? dans une fonction qui retourne Result ?',
            options: [
              'Propage l\'erreur en retournant tôt si le résultat est Err',
              'Ignore les erreurs',
              'Panique si le résultat est Err',
              'Convertit en Option'
            ],
            correct: 0,
            xp: 25,
            successMsg: 'Exact ! ? désugarise en: if let Err(e) = result { return Err(e.into()); }',
            errorMsg: 'L\'opérateur ? retourne automatiquement l\'erreur de la fonction englobante si le résultat est Err.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction diviser(a: f64, b: f64) -> Option<f64> qui retourne None si b == 0.0, sinon Some(a/b). Utilise if let pour afficher le résultat.',
            placeholder: 'fn diviser(a: f64, b: f64) -> Option<f64> {\n    // ton code\n}\n\nfn main() {\n    if let Some(r) = diviser(10.0, 3.0) {\n        println!("{:.4}", r);\n    }\n    println!("{:?}", diviser(5.0, 0.0));\n}',
            filename: 'main.rs',
            xp: 45,
            validator: (code: string) => code.includes('Option<f64>') && code.includes('None') && code.includes('Some') && code.includes('if let'),
            hint: 'if b == 0.0 { return None; } Some(a / b)'
          }
        ]
      },
      {
        title: 'Combinateurs Option et Result',
        subtitle: 'map, and_then, unwrap_or, or_else',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Chaîner avec les combinateurs',
            content: 'Au lieu de déstructurer manuellement, les combinateurs permettent de chaîner les opérations : <code>map(|x| ...)</code> transforme la valeur si Some/Ok. <code>and_then(|x| ...)</code> chaîne des opérations qui retournent Option/Result. <code>unwrap_or(défaut)</code> retourne la valeur ou un défaut. <code>unwrap_or_else(|| ...)</code> appelle une closure si None/Err.',
            code: {
              filename: 'combinateurs.rs',
              src: 'fn main() {\n    // map : transforme Some(valeur)\n    let x: Option<i32> = Some(5);\n    let y = x.map(|n| n * 2);\n    println!("{:?}", y); // Some(10)\n\n    // and_then : chaîne des Option\n    let resultat = Some("42")\n        .and_then(|s| s.parse::<i32>().ok())\n        .map(|n| n * 2);\n    println!("{:?}", resultat); // Some(84)\n\n    // unwrap_or : valeur par défaut\n    let val: Option<i32> = None;\n    println!("{}", val.unwrap_or(0));  // 0\n    println!("{}", val.unwrap_or_else(|| 42)); // 42\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne Some(5).map(|x| x * 2) ?',
            options: ['5', '10', 'Some(10)', 'None'],
            correct: 2,
            xp: 20,
            successMsg: 'Exact ! map transforme la valeur à l\'intérieur de Some — le résultat reste un Option.',
            errorMsg: 'map garde le conteneur Option. Some(5).map(|x| x*2) retourne Some(10), pas 10.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète pour obtenir 0 si l\'Option est None.',
            xp: 20,
            parts: [
              { type: 'text', value: 'let valeur = option.' },
              { type: 'blank', placeholder: 'méthode', correct: 'unwrap_or' },
              { type: 'text', value: '(0);' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '🔮',
    title: 'Traits',
    lessons: [
      {
        title: 'Définir et implémenter des traits',
        subtitle: 'trait, impl Trait for Type, trait bounds',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Les traits : interfaces Rust',
            content: 'Un <code>trait</code> définit un comportement partagé. On l\'implémente avec <code>impl MonTrait for MonType</code>. Les <strong>trait bounds</strong> contraignent les génériques : <code>fn foo&lt;T: Display&gt;(x: T)</code>. La syntaxe <code>impl Trait</code> simplifie les bounds dans les signatures. Les <strong>trait objects</strong> (<code>dyn Trait</code>) permettent le polymorphisme dynamique.',
            code: {
              filename: 'traits.rs',
              src: 'use std::fmt;\n\ntrait Résumable {\n    fn résumé(&self) -> String;\n\n    fn preview(&self) -> String {\n        format!("{}...", &self.résumé()[..50.min(self.résumé().len())])\n    }\n}\n\nstruct Article {\n    titre: String,\n    contenu: String,\n}\n\nimpl Résumable for Article {\n    fn résumé(&self) -> String {\n        format!("{}: {}", self.titre, self.contenu)\n    }\n}\n\nfn afficher(item: &impl Résumable) {\n    println!("{}", item.résumé());\n}\n\nfn main() {\n    let a = Article {\n        titre: String::from("Rust"),\n        contenu: String::from("Le langage sûr et rapide"),\n    };\n    afficher(&a);\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre impl Trait et dyn Trait ?',
            options: [
              'Aucune différence',
              'impl Trait = dispatch statique (monomorphisation), dyn Trait = dispatch dynamique (vtable)',
              'dyn Trait est plus rapide',
              'impl Trait n\'existe pas en Rust'
            ],
            correct: 1,
            xp: 25,
            successMsg: 'Exact ! impl Trait génère du code spécialisé par type (plus rapide). dyn Trait utilise une vtable (plus flexible).',
            errorMsg: 'impl Trait est résolu à la compilation (dispatch statique, zero cost). dyn Trait utilise un pointeur vtable (dispatch dynamique).'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un trait Calculable avec une méthode calculer(&self) -> f64. Implémente-le pour Rectangle (l*h) et Cercle (π*r²). Écris une fonction afficher_aire(f: &dyn Calculable) qui affiche le résultat.',
            placeholder: 'trait Calculable {\n    fn calculer(&self) -> f64;\n}\n\nstruct Rectangle { l: f64, h: f64 }\nstruct Cercle { r: f64 }\n\n// impl Calculable for Rectangle\n// impl Calculable for Cercle\n\nfn afficher_aire(f: &dyn Calculable) {\n    println!("{:.2}", f.calculer());\n}\n\nfn main() {\n    afficher_aire(&Rectangle { l: 3.0, h: 4.0 });\n    afficher_aire(&Cercle { r: 5.0 });\n}',
            filename: 'main.rs',
            xp: 50,
            validator: (code: string) => code.includes('trait Calculable') && code.includes('impl Calculable for') && code.includes('dyn Calculable'),
            hint: 'Pour le cercle : 3.14159 * self.r * self.r. N\'oublie pas les deux impl séparés.'
          }
        ]
      },
      {
        title: 'Traits dérivés et standard',
        subtitle: 'Debug, Clone, PartialEq, Display',
        type: 'theory',
        time: '10 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Dériver des traits automatiquement',
            content: '<code>#[derive(...)]</code> génère automatiquement des implémentations de traits standards : <code>Debug</code> (affichage {:?}), <code>Clone</code> (copie explicite), <code>Copy</code> (copie implicite), <code>PartialEq</code> (comparaison ==), <code>Hash</code> (utilisation en clé de HashMap). Implémenter <code>fmt::Display</code> manuellement pour personnaliser l\'affichage avec {}.',
            code: {
              filename: 'derive.rs',
              src: 'use std::fmt;\n\n#[derive(Debug, Clone, PartialEq)]\nstruct Point {\n    x: f64,\n    y: f64,\n}\n\nimpl fmt::Display for Point {\n    fn fmt(&self, f: &mut fmt::Formatter<\'_>) -> fmt::Result {\n        write!(f, "({}, {})", self.x, self.y)\n    }\n}\n\nfn main() {\n    let p1 = Point { x: 1.0, y: 2.0 };\n    let p2 = p1.clone();\n\n    println!("{p1}");      // Display: (1, 2)\n    println!("{p1:?}");    // Debug: Point { x: 1.0, y: 2.0 }\n    println!("{}", p1 == p2); // PartialEq: true\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre {:?} et {} dans println! ?',
            options: [
              'Aucune différence',
              '{:?} utilise Debug, {} utilise Display',
              '{} est pour les nombres, {:?} pour les strings',
              '{:?} est plus rapide'
            ],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! {:?} appelle le trait Debug (technique), {} appelle Display (lisible pour l\'utilisateur).',
            errorMsg: '{:?} utilise le trait Debug (format technique). {} utilise le trait Display (format lisible).'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète l\'attribut derive pour permettre Debug et la comparaison avec ==.',
            xp: 20,
            parts: [
              { type: 'text', value: '#[derive(Debug, ' },
              { type: 'blank', placeholder: 'trait', correct: 'PartialEq' },
              { type: 'text', value: ')]\nstruct Couleur(u8, u8, u8);' }
            ]
          }
        ]
      }
    ]
  },
  {
    icon: '⚡',
    title: 'Closures et itérateurs',
    lessons: [
      {
        title: 'Closures',
        subtitle: '|x| x*2, capture par référence et par valeur',
        type: 'theory',
        time: '14 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Closures : fonctions anonymes',
            content: 'Une closure est une fonction anonyme qui <strong>capture son environnement</strong>. Syntaxe : <code>|params| expression</code>. Rust infère les types. Trois traits de closure : <code>Fn</code> (capture par référence), <code>FnMut</code> (capture mutablement), <code>FnOnce</code> (capture par valeur, consomme). Utiliser <code>move</code> pour forcer la capture par valeur (utile dans les threads).',
            code: {
              filename: 'closures.rs',
              src: 'fn appliquer<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {\n    f(x)\n}\n\nfn main() {\n    // Closure simple\n    let doubler = |x| x * 2;\n    println!("{}", doubler(5)); // 10\n\n    // Capture de l\'environnement\n    let seuil = 10;\n    let est_grand = |x| x > seuil; // capture seuil\n    println!("{}", est_grand(15)); // true\n\n    // move : force la capture par valeur\n    let texte = String::from("salut");\n    let afficher = move || println!("{texte}"); // texte est moved\n    afficher();\n    // println!("{texte}"); // ❌ texte a été moved\n\n    println!("{}", appliquer(|x| x * x, 7)); // 49\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Quand utilise-t-on move dans une closure ?',
            options: [
              'Pour accélérer l\'exécution',
              'Pour forcer la closure à prendre la propriété des variables capturées',
              'Pour retourner une valeur',
              'Pour les closures récursives'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! move est nécessaire quand la closure doit survivre plus longtemps que son scope (ex: threads).',
            errorMsg: 'move transfère la propriété dans la closure — obligatoire pour les threads où les références seraient invalides.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une closure multiplier qui capture une variable "facteur" depuis l\'environnement et multiplie son argument par facteur. Teste avec facteur = 3 et l\'argument 7.',
            placeholder: 'fn main() {\n    let facteur = 3;\n    let multiplier = // ta closure\n    println!("{}", multiplier(7)); // doit afficher 21\n}',
            filename: 'main.rs',
            xp: 35,
            validator: (code: string) => code.includes('facteur') && /\|.*\|/.test(code) && code.includes('println!'),
            hint: 'let multiplier = |x| x * facteur; capture facteur de l\'environnement.'
          }
        ]
      },
      {
        title: 'Itérateurs et adaptateurs',
        subtitle: 'map, filter, collect, fold, enumerate, zip',
        type: 'theory',
        time: '14 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'Le trait Iterator',
            content: 'Tout type qui implémente <code>Iterator</code> (méthode <code>next()</code>) bénéficie d\'une riche bibliothèque d\'adaptateurs. <code>map</code> transforme, <code>filter</code> sélectionne, <code>fold</code> accumule, <code>collect</code> matérialise, <code>enumerate</code> ajoute l\'index, <code>zip</code> combine deux itérateurs. Les itérateurs sont <strong>lazy</strong> — rien n\'est calculé avant collect/for.',
            code: {
              filename: 'iterateurs.rs',
              src: 'fn main() {\n    let nombres = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n    // map + filter + collect\n    let pairs_carres: Vec<i32> = nombres.iter()\n        .filter(|&&x| x % 2 == 0)\n        .map(|&x| x * x)\n        .collect();\n    println!("{:?}", pairs_carres); // [4, 16, 36, 64, 100]\n\n    // fold : accumuler\n    let somme: i32 = nombres.iter().fold(0, |acc, &x| acc + x);\n    println!("Somme: {somme}"); // 55\n\n    // enumerate\n    for (i, val) in nombres.iter().enumerate().take(3) {\n        println!("[{i}] = {val}");\n    }\n\n    // zip\n    let lettres = vec![\'a\', \'b\', \'c\'];\n    let nums = vec![1, 2, 3];\n    let zippé: Vec<_> = lettres.iter().zip(nums.iter()).collect();\n    println!("{:?}", zippé);\n}'
            }
          },
          {
            type: 'quiz',
            question: 'Pourquoi dit-on que les itérateurs Rust sont "lazy" ?',
            options: [
              'Ils sont lents',
              'Les transformations ne sont calculées qu\'à la consommation (collect, for, etc.)',
              'Ils utilisent des goroutines',
              'Ils évitent la copie des données'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! Un iter().map().filter() ne calcule rien tant qu\'on ne consomme pas. Cela permet des compositions efficaces.',
            errorMsg: 'Lazy signifie que le calcul est différé. Rien n\'est calculé avant collect, sum, for, etc.'
          },
          {
            type: 'code-challenge',
            instructions: 'Utilise les itérateurs pour trouver la somme des carrés des nombres impairs dans le vec [1..=10]. Une seule chaîne de méthodes, pas de boucle explicite.',
            placeholder: 'fn main() {\n    let nums: Vec<i32> = (1..=10).collect();\n    let resultat: i32 = nums.iter()\n        // filtre les impairs\n        // map au carré\n        // somme\n        ;\n    println!("{resultat}"); // 1+9+25+49+81 = 165\n}',
            filename: 'main.rs',
            xp: 50,
            validator: (code: string) => code.includes('filter') && code.includes('map') && code.includes('sum') && code.includes('println!'),
            hint: '.filter(|&&x| x % 2 != 0).map(|&x| x * x).sum()'
          }
        ]
      }
    ]
  }
]
