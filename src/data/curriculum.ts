import type { CourseModule } from '@/types/cours'

export const CURRICULUM_PYTHON: CourseModule[] = [
  {
    icon: '🌱',
    title: 'Fondations',
    lessons: [
      {
        title: 'Bienvenue dans Python',
        subtitle: 'Comprendre ce qu\'est Python et écrire ton premier programme',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'Pourquoi Python ?',
            content: 'Python est un langage créé par <strong>Guido van Rossum</strong> au début des années 90. Sa philosophie : rendre le code lisible comme du pseudo-anglais. Aujourd\'hui il est utilisé en web, data science, IA, automatisation et cybersécurité. Sa syntaxe est intentionnellement épurée pour que tu te concentres sur la logique, pas sur les symboles.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Lis ton code à voix haute',
              text: 'Si la phrase ressemble à de l\'anglais simple, tu es souvent sur la bonne voie. C\'est le signe distinctif du Python bien écrit.'
            },
            code: {
              filename: 'hello.py',
              src: '# Ceci est un commentaire — Python l\'ignore\nprint("Bonjour, monde !")\nprint("Je commence Python aujourd\'hui.")'
            }
          },
          {
            type: 'quiz',
            question: 'Quel symbole démarre un commentaire en Python ?',
            options: ['// comme en JavaScript', '# le dièse', '/* ... */', '-- le tiret double'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! Le # rend la ligne invisible pour Python.',
            errorMsg: 'En Python c\'est le # qui introduit un commentaire, pas //'
          },
          {
            type: 'code-challenge',
            instructions: 'Affiche deux messages différents avec print(). Le premier doit contenir ton prénom.',
            placeholder: 'print("Bonjour, je m\'appelle ...")\n',
            filename: 'main.py',
            xp: 20,
            validator: (code: string) => (code.match(/print\s*\(/g) || []).length >= 2,
            hint: 'Écris deux lignes séparées avec print(...).'
          }
        ]
      },

      {
        title: 'Types primitifs et opérateurs',
        subtitle: 'Nombres, texte, booléens et calculs de base',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Les quatre types de base',
            content: 'Python manipule 4 types primitifs : <code>int</code> (entiers), <code>float</code> (décimaux), <code>str</code> (texte entre guillemets) et <code>bool</code> (<code>True</code> ou <code>False</code>). La fonction <code>type()</code> te dit ce qu\'une valeur contient.',
            code: {
              filename: 'types.py',
              src: 'print(type(42))       # <class \'int\'>\nprint(type(3.14))     # <class \'float\'>\nprint(type("Python")) # <class \'str\'>\nprint(type(True))     # <class \'bool\'>'
            }
          },
          {
            type: 'theory',
            title: 'Opérateurs arithmétiques',
            content: 'Python supporte les opérateurs habituels et deux opérateurs spéciaux très utiles : <code>//</code> pour la <strong>division entière</strong> (résultat arrondi vers le bas) et <code>%</code> pour le <strong>modulo</strong> (reste de la division). La puissance s\'écrit <code>**</code>.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Division toujours float',
              text: 'En Python 3, 10 / 3 donne 3.333... pas 3. Si tu veux un entier, utilise 10 // 3 qui donne 3.'
            },
            code: {
              filename: 'calculs.py',
              src: 'print(10 + 3)   # 13\nprint(10 - 3)   # 7\nprint(10 * 3)   # 30\nprint(10 / 3)   # 3.3333...\nprint(10 // 3)  # 3  (division entière)\nprint(10 % 3)   # 1  (reste)\nprint(2 ** 8)   # 256 (puissance)'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne 7 // 2 en Python ?',
            options: ['3.5', '3', '4', 'Une erreur'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui ! // arrondit vers le bas (division entière).',
            errorMsg: '// est la division entière : 7 // 2 = 3, pas 3.5'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète les opérations :',
            parts: [
              { type: 'text', value: 'print(2 ** 3)   # retourne ' },
              { type: 'blank', placeholder: '8', correct: '8' },
              { type: 'text', value: '\nprint(10 % 4)   # retourne ' },
              { type: 'blank', placeholder: '2', correct: '2' },
            ],
            xp: 15
          },
          {
            type: 'code-challenge',
            instructions: 'Calcule et affiche : le résultat de 17 divisé par 5 (entier), et le reste de cette division.',
            placeholder: '# Division entière de 17 par 5\n',
            filename: 'division.py',
            xp: 20,
            validator: (code: string) => /\/\//.test(code) && /%/.test(code) && /print\s*\(/.test(code),
            hint: 'Utilise // pour la division entière et % pour le reste.'
          }
        ]
      },

      {
        title: 'Variables et affectation',
        subtitle: 'Stocker des valeurs et les réutiliser',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Déclarer une variable',
            content: 'En Python, une variable est une <strong>boîte nommée</strong> qui stocke une valeur. Pas besoin de déclarer le type, Python l\'infère automatiquement. La convention de nommage est le <code>snake_case</code> (mots séparés par des underscores). Une variable non déclarée lève une <code>NameError</code>.',
            code: {
              filename: 'variables.py',
              src: 'prenom = "Ada"\nage = 21\ntaille = 1.72\nest_connecte = True\n\nprint(prenom)        # Ada\nprint(type(age))     # <class \'int\'>\nprint(est_connecte)  # True'
            }
          },
          {
            type: 'theory',
            title: 'Conversions de type (cast)',
            content: 'Python ne convertit pas automatiquement les types. Utilise <code>int()</code>, <code>float()</code> et <code>str()</code> pour forcer une conversion. Très utile quand <code>input()</code> retourne toujours une chaîne.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'input() retourne du texte',
              text: 'age = input("Ton âge : ") te donne "25" (un str), pas 25 (un int). Fais int(input("...")) pour avoir un nombre.'
            },
            code: {
              filename: 'cast.py',
              src: 'texte = "42"\nnombre = int(texte)      # 42\ndecimal = float("3.14") # 3.14\nchaine = str(100)       # "100"\n\nprint(type(nombre))  # <class \'int\'>'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complète les variables :',
            parts: [
              { type: 'text', value: 'ville = ' },
              { type: 'blank', placeholder: '"Paris"', correct: '"Paris"' },
              { type: 'text', value: '\nscore = ' },
              { type: 'blank', placeholder: '100', correct: '100' },
              { type: 'text', value: '\nconnecte = ' },
              { type: 'blank', placeholder: 'True', correct: 'True' },
            ],
            xp: 15
          },
          {
            type: 'quiz',
            question: 'Quel est le type de "25" (avec guillemets) ?',
            options: ['int', 'str', 'float', 'bool'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui ! Les guillemets font de "25" une chaîne, pas un nombre.',
            errorMsg: '"25" contient des guillemets donc c\'est un str, pas un int.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée deux variables : prix = "19" (str) et taxe = 1.2 (float). Convertis prix en int puis affiche le total (prix * taxe).',
            placeholder: 'prix = "19"\ntaxe = 1.2\n',
            filename: 'conversion.py',
            xp: 25,
            validator: (code: string) => /int\s*\(/.test(code) && /print\s*\(/.test(code),
            hint: 'int(prix) convertit la chaîne en nombre avant de multiplier.'
          }
        ]
      }
    ]
  },

  {
    icon: '🧵',
    title: 'Chaînes de caractères',
    lessons: [

      {
        title: 'Manipuler les chaînes',
        subtitle: 'Indexation, slices et méthodes essentielles',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Une chaîne = une séquence de caractères',
            content: 'En Python, une <code>str</code> se comporte comme une liste de caractères. Tu peux accéder à un caractère par son <strong>index</strong> (commence à 0), ou extraire une portion avec la syntaxe <code>[debut:fin:pas]</code>. Un index négatif compte depuis la fin.',
            code: {
              filename: 'strings.py',
              src: 'mot = "Python"\nprint(mot[0])     # P  (premier)\nprint(mot[-1])    # n  (dernier)\nprint(mot[1:4])   # yth\nprint(mot[::-1])  # nohtyP (inversé)\nprint(len(mot))   # 6'
            }
          },
          {
            type: 'theory',
            title: 'f-strings et méthodes',
            content: 'Depuis Python 3.6, les <strong>f-strings</strong> sont la façon recommandée d\'insérer des variables dans du texte : <code>f"Bonjour {nom}"</code>. Les méthodes comme <code>.upper()</code>, <code>.lower()</code>, <code>.strip()</code>, <code>.replace()</code> et <code>.split()</code> couvrent la plupart des besoins.',
            code: {
              filename: 'fstrings.py',
              src: 'prenom = "Aya"\nlangage = "Python"\n\n# f-string\nmessage = f"{prenom} apprend {langage}"\nprint(message)                   # Aya apprend Python\nprint(f"{prenom} a {len(prenom)} lettres")\n\n# Méthodes\nprint(langage.upper())           # PYTHON\nprint("  hello  ".strip())       # hello\nprint("a,b,c".split(","))        # [\'a\', \'b\', \'c\']\nprint("chat".replace("c", "fl")) # flat'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne "Python"[1:4] ?',
            options: ['"Pyt"', '"yth"', '"ytho"', '"thon"'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! [1:4] prend les indices 1, 2, 3 (la fin est exclue).',
            errorMsg: 'Les slices commencent à l\'index de gauche (inclus) et s\'arrêtent avant l\'index de droite.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète ces expressions :',
            parts: [
              { type: 'text', value: '"Bonjour"[0]   # retourne ' },
              { type: 'blank', placeholder: '"B"', correct: '"B"' },
              { type: 'text', value: '\n"Python"[-1]  # retourne ' },
              { type: 'blank', placeholder: '"n"', correct: '"n"' },
            ],
            xp: 15
          },
          {
            type: 'code-challenge',
            instructions: 'Crée les variables prenom et age, puis affiche une phrase complète en utilisant une f-string.',
            placeholder: 'prenom = "Noa"\nage = 19\n',
            filename: 'profil.py',
            xp: 25,
            validator: (code: string) => /f["']/.test(code) && /print\s*\(/.test(code),
            hint: 'Exemple : print(f"{prenom} a {age} ans")'
          }
        ]
      },

      {
        title: 'Chaînes avancées',
        subtitle: 'format(), méthodes de test, jointures et multilignes',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Méthodes de test et de recherche',
            content: 'Python propose des méthodes qui retournent des booléens pour inspecter une chaîne : <code>.startswith()</code>, <code>.endswith()</code>, <code>.isdigit()</code>, <code>.isalpha()</code>. Pour chercher une sous-chaîne, utilise <code>in</code> ou <code>.find()</code>.',
            code: {
              filename: 'tests_str.py',
              src: 'email = "ada@codequest.dev"\n\nprint(email.endswith(".dev"))  # True\nprint("@" in email)            # True\nprint("123".isdigit())         # True\nprint("abc".isalpha())         # True\nprint(email.find("@"))         # 3  (index du @)'
            }
          },
          {
            type: 'theory',
            title: 'join() et chaînes multilignes',
            content: '<code>join()</code> est l\'inverse de <code>split()</code> : il assemble une liste en une seule chaîne. Les <strong>triple guillemets</strong> (<code>"""</code>) permettent des chaînes sur plusieurs lignes, souvent utilisées comme docstrings.',
            code: {
              filename: 'join_multi.py',
              src: 'mots = ["Python", "est", "top"]\nphrase = " ".join(mots)\nprint(phrase)  # Python est top\n\ntexte = """Ligne 1\nLigne 2\nLigne 3"""\nprint(texte)'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait "hello".upper() ?',
            options: ['"HELLO"', '"Hello"', 'Une erreur', '"hello"'],
            correct: 0,
            xp: 15,
            successMsg: 'Oui, .upper() met tout en majuscules.',
            errorMsg: '.upper() convertit toute la chaîne en majuscules.'
          },
          {
            type: 'code-challenge',
            instructions: 'Prends la liste ["HTML", "CSS", "Python"] et affiche ses éléments séparés par " | " avec join().',
            placeholder: 'langages = ["HTML", "CSS", "Python"]\n',
            filename: 'join.py',
            xp: 25,
            validator: (code: string) => /join\s*\(/.test(code) && /print\s*\(/.test(code),
            hint: 'Syntaxe : " | ".join(langages)'
          }
        ]
      }
    ]
  },

  {
    icon: '🔀',
    title: 'Logique et conditions',
    lessons: [

      {
        title: 'Opérateurs de comparaison',
        subtitle: 'Comparer des valeurs et comprendre la vérité en Python',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Comparer avec == et is',
            content: 'Python distingue <code>==</code> (même <strong>valeur</strong>) et <code>is</code> (même <strong>objet</strong> en mémoire). Pour les types primitifs, les deux semblent identiques, mais pour les listes c\'est crucial. Les valeurs <code>None</code>, <code>0</code>, <code>""</code>, <code>[]</code>, <code>{}</code> sont toutes évaluées à <code>False</code> (valeurs "falsy").',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'is vs ==',
              text: 'Utilise == pour comparer des valeurs. Réserve is uniquement pour comparer à None (if x is None).'
            },
            code: {
              filename: 'comparaisons.py',
              src: 'a = [1, 2, 3]\nb = [1, 2, 3]\nc = a\n\nprint(a == b)   # True  (même contenu)\nprint(a is b)   # False (objets différents)\nprint(a is c)   # True  (même objet)\n\n# Valeurs "falsy"\nprint(bool(0))   # False\nprint(bool(""))  # False\nprint(bool([]))  # False\nprint(bool(42))  # True'
            }
          },
          {
            type: 'quiz',
            question: 'Que vaut bool([]) en Python ?',
            options: ['True', 'False', 'None', 'Une erreur'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui ! Une liste vide est falsy (évaluée à False).',
            errorMsg: 'Une liste vide [] est falsy — Python la considère comme False dans un contexte booléen.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète avec == ou is :',
            parts: [
              { type: 'text', value: '# Pour comparer des valeurs\n1 + 1 ' },
              { type: 'blank', placeholder: '==', correct: '==' },
              { type: 'text', value: ' 2\n\n# Pour tester None\nif x ' },
              { type: 'blank', placeholder: 'is', correct: 'is' },
              { type: 'text', value: ' None:\n    print("vide")' },
            ],
            xp: 15
          }
        ]
      },

      {
        title: 'if / elif / else',
        subtitle: 'Brancher l\'exécution selon les conditions',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Structure conditionnelle',
            content: 'En Python, <strong>l\'indentation est obligatoire</strong> et fait partie de la syntaxe (4 espaces ou une tabulation). Le bloc après <code>if</code> n\'est exécuté que si la condition est vraie. <code>elif</code> et <code>else</code> sont optionnels.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'L\'indentation = la structure',
              text: 'Un bloc mal indenté provoque une IndentationError. C\'est différent de la plupart des langages qui utilisent des accolades {}.'
            },
            code: {
              filename: 'conditions.py',
              src: 'note = 14\n\nif note >= 16:\n    print("Très bien")\nelif note >= 12:\n    print("Bien")\nelif note >= 10:\n    print("Passable")\nelse:\n    print("À retravailler")'
            }
          },
          {
            type: 'theory',
            title: 'Opérateurs booléens et expression ternaire',
            content: '<code>and</code> requiert que toutes les conditions soient vraies. <code>or</code> suffit d\'une seule. <code>not</code> inverse. Python permet aussi le <strong>chaînage</strong> : <code>1 < x < 10</code> est valide. L\'<strong>expression ternaire</strong> condense un if/else sur une ligne.',
            code: {
              filename: 'bool_ops.py',
              src: 'age = 20\nabonne = True\n\nif age >= 18 and abonne:\n    print("Accès accordé")\n\n# Chaînage\nif 0 < age < 100:\n    print("Âge valide")\n\n# Expression ternaire\nstatut = "majeur" if age >= 18 else "mineur"\nprint(statut)  # majeur'
            }
          },
          {
            type: 'quiz',
            question: 'Quand une condition avec "or" est-elle True ?',
            options: ['Quand toutes les conditions sont True', 'Quand au moins une est True', 'Jamais', 'Seulement si les deux sont False'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui ! or retourne True dès qu\'une condition est True.',
            errorMsg: 'or retourne True si au moins une condition est vraie.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un programme qui affiche "Accès autorisé" si age >= 18, sinon "Accès refusé". Utilise une expression ternaire.',
            placeholder: 'age = 20\n',
            filename: 'acces.py',
            xp: 30,
            validator: (code: string) => /if.*else/.test(code) && /print\s*\(/.test(code),
            hint: 'msg = "Accès autorisé" if age >= 18 else "Accès refusé"'
          }
        ]
      },

      {
        title: 'match / case (Python 3.10+)',
        subtitle: 'Pattern matching : l\'alternative moderne au if/elif',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Le pattern matching',
            content: 'Introduit en Python 3.10, <code>match/case</code> compare une valeur contre plusieurs motifs. Plus lisible qu\'une longue chaîne de <code>elif</code>. Le <code>case _:</code> joue le rôle de <code>else</code> (wildcard). On peut combiner des motifs avec <code>|</code>.',
            code: {
              filename: 'match.py',
              src: 'commande = "run"\n\nmatch commande:\n    case "run":\n        print("Le robot court 🏃")\n    case "stop" | "pause":\n        print("Le robot s\'arrête")\n    case code if commande.isdigit():\n        print(f"Code reçu : {code}")\n    case _:\n        print("Commande inconnue ❌")'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait case _ dans un match/case ?',
            options: ['Il correspond à n\'importe quelle valeur (wildcard)', 'Il correspond uniquement à None', 'Il lève une erreur', 'Il recommence la boucle'],
            correct: 0,
            xp: 15,
            successMsg: 'Oui ! _ est le wildcard, équivalent du else.',
            errorMsg: 'case _ correspond à tout ce qui n\'a pas été capturé avant — c\'est le cas par défaut.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un match/case pour un code HTTP : 200 → "OK", 404 → "Non trouvé", 500 → "Erreur serveur", sinon → "Code inconnu".',
            placeholder: 'code = 404\n\nmatch code:\n',
            filename: 'http.py',
            xp: 30,
            validator: (code: string) => /match/.test(code) && /case/.test(code) && /case _:/.test(code),
            hint: 'Utilise match code: puis case 200: case 404: case 500: case _:'
          }
        ]
      }
    ]
  },

  {
    icon: '🔁',
    title: 'Boucles et itérables',
    lessons: [

      {
        title: 'Boucle while',
        subtitle: 'Répéter tant qu\'une condition est vraie',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'while et ses pièges',
            content: 'La boucle <code>while</code> exécute un bloc tant qu\'une condition reste vraie. <strong>Piège classique :</strong> oublier de modifier la variable de contrôle → boucle infinie. Les mots-clés <code>break</code> (sortir) et <code>continue</code> (passer au tour suivant) permettent de contrôler finement le flux.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Boucle infinie',
              text: 'Si la condition ne change jamais, le programme tourne indéfiniment. Assure-toi que la variable evolue dans le corps de la boucle.'
            },
            code: {
              filename: 'while.py',
              src: 'x = 0\nwhile x < 4:\n    print(x)\n    x += 1  # CRUCIAL : faire évoluer x\n# Affiche 0, 1, 2, 3\n\n# break et continue\nfor n in range(10):\n    if n == 3: continue  # saute 3\n    if n == 6: break     # arrête à 6\n    print(n)  # 0, 1, 2, 4, 5'
            }
          },
          {
            type: 'quiz',
            question: 'Quel mot-clé arrête immédiatement une boucle ?',
            options: ['stop', 'break', 'exit', 'end'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui ! break sort immédiatement de la boucle.',
            errorMsg: 'C\'est break qui interrompt une boucle en Python.'
          },
          {
            type: 'code-challenge',
            instructions: 'Affiche les nombres impairs de 1 à 9 avec une boucle while.',
            placeholder: 'n = 1\n',
            filename: 'impairs.py',
            xp: 25,
            validator: (code: string) => /while/.test(code) && /print\s*\(/.test(code),
            hint: 'Incrémente de 2 à chaque tour, ou utilise n % 2 != 0.'
          }
        ]
      },

      {
        title: 'Boucle for et range()',
        subtitle: 'Parcourir des séquences avec élégance',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'for et range()',
            content: 'La boucle <code>for</code> parcourt directement n\'importe quel <strong>itérable</strong> : liste, chaîne, dictionnaire... <code>range(debut, fin, pas)</code> génère une suite d\'entiers. La fin n\'est jamais incluse. <code>enumerate()</code> donne l\'index ET la valeur simultanément.',
            code: {
              filename: 'for.py',
              src: '# range simple\nfor i in range(4):       # 0, 1, 2, 3\n    print(i)\n\n# range avec début et fin\nfor i in range(4, 8):    # 4, 5, 6, 7\n    print(i)\n\n# range avec pas\nfor i in range(0, 10, 2): # 0, 2, 4, 6, 8\n    print(i)\n\n# enumerate pour avoir l\'index\nanimaux = ["chat", "chien", "lapin"]\nfor i, animal in enumerate(animaux):\n    print(i, animal)  # 0 chat, 1 chien, 2 lapin'
            }
          },
          {
            type: 'theory',
            title: 'zip() et itérables',
            content: '<code>zip()</code> permet de parcourir deux listes en parallèle. Un itérable en Python est tout objet sur lequel on peut boucler. Tu peux créer un itérateur manuel avec <code>iter()</code> et <code>next()</code>.',
            code: {
              filename: 'zip_iter.py',
              src: 'prenoms = ["Ana", "Leo", "Mia"]\nscores = [95, 87, 92]\n\nfor nom, score in zip(prenoms, scores):\n    print(f"{nom} : {score}/100")\n\n# Itérateur manuel\nit = iter([1, 2, 3])\nprint(next(it))  # 1\nprint(next(it))  # 2'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complète pour afficher 0, 2, 4, 6, 8 :',
            parts: [
              { type: 'text', value: 'for i in range(' },
              { type: 'blank', placeholder: '0, 10, 2', correct: '0, 10, 2' },
              { type: 'text', value: '):\n    print(i)' },
            ],
            xp: 15
          },
          {
            type: 'code-challenge',
            instructions: 'Utilise enumerate() pour afficher chaque langage de ["HTML", "CSS", "Python"] avec son numéro commençant à 1 (ex : "1. HTML").',
            placeholder: 'langages = ["HTML", "CSS", "Python"]\n',
            filename: 'enum.py',
            xp: 30,
            validator: (code: string) => /enumerate/.test(code) && /print\s*\(/.test(code),
            hint: 'for i, lang in enumerate(langages, 1): → démarre à 1'
          }
        ]
      }
    ]
  },

  {
    icon: '📦',
    title: 'Collections',
    lessons: [

      {
        title: 'Listes',
        subtitle: 'La structure de données fondamentale de Python',
        type: 'theory',
        time: '16 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Créer et modifier une liste',
            content: 'Une liste est une séquence <strong>ordonnée et mutable</strong>. Elle peut contenir des types mixtes. Les méthodes <code>.append()</code>, <code>.insert()</code>, <code>.remove()</code>, <code>.pop()</code> et <code>del</code> modifient la liste en place.',
            code: {
              filename: 'listes.py',
              src: 'nombres = [10, 20, 30, 40]\n\nnombres.append(50)        # [10, 20, 30, 40, 50]\nnombres.insert(1, 15)     # [10, 15, 20, 30, 40, 50]\nnombres.remove(20)        # [10, 15, 30, 40, 50]\ndernier = nombres.pop()   # retire et retourne 50\ndel nombres[0]            # retire le premier\n\nprint(nombres)            # [15, 30, 40]'
            }
          },
          {
            type: 'theory',
            title: 'Slices et copie',
            content: 'Les <strong>slices</strong> <code>[debut:fin:pas]</code> créent un <em>nouveau</em> sous-tableau sans modifier l\'original. Un slice <code>[:]</code> est une copie superficielle (shallow copy). Attention : <code>b = a</code> ne copie pas, les deux variables pointent vers le même objet.',
            code: {
              filename: 'slices.py',
              src: 'li = [1, 2, 3, 4, 5]\n\nprint(li[1:3])   # [2, 3]\nprint(li[::2])   # [1, 3, 5] (un sur deux)\nprint(li[::-1])  # [5, 4, 3, 2, 1] (inversé)\n\n# Copie superficielle\ncopie = li[:]    # ou list(li)\ncopie[0] = 99\nprint(li[0])     # 1 (inchangé !)'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle méthode retire ET retourne le dernier élément d\'une liste ?',
            options: ['remove()', 'del', 'pop()', 'discard()'],
            correct: 2,
            xp: 15,
            successMsg: 'Oui ! pop() retire le dernier élément et le retourne.',
            errorMsg: 'pop() est la bonne réponse : elle retire et retourne le dernier élément (ou celui à l\'index donné).'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une liste courses avec 3 aliments, ajoute-en un avec append(), supprime le premier avec del, puis affiche la liste finale.',
            placeholder: 'courses = ["pain", "lait", "pommes"]\n',
            filename: 'courses.py',
            xp: 30,
            validator: (code: string) => /append\s*\(/.test(code) && /del\s+/.test(code) && /print\s*\(/.test(code),
            hint: 'del courses[0] supprime le premier élément.'
          }
        ]
      },

      {
        title: 'Tuples et Sets',
        subtitle: 'Données immuables et ensembles sans doublons',
        type: 'theory',
        time: '12 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Tuples : listes immuables',
            content: 'Un <code>tuple</code> est comme une liste mais <strong>immuable</strong> : on ne peut pas modifier ses éléments après création. Parfait pour des coordonnées, des constantes, ou retourner plusieurs valeurs d\'une fonction. Le <strong>unpacking</strong> permet d\'affecter chaque valeur à une variable.',
            code: {
              filename: 'tuples.py',
              src: 'point = (3, 7)\nprint(point[0])     # 3\n# point[0] = 5      # TypeError !\n\n# Unpacking\nx, y = point\nprint(x, y)         # 3 7\n\n# Swap élégant\na, b = 10, 20\na, b = b, a\nprint(a, b)         # 20 10\n\n# Unpacking étendu\npremier, *milieu, dernier = (1, 2, 3, 4, 5)\nprint(milieu)       # [2, 3, 4]'
            }
          },
          {
            type: 'theory',
            title: 'Sets : ensembles sans doublons',
            content: 'Un <code>set</code> stocke des valeurs uniques sans ordre défini. Les opérations ensemblistes sont intuitives : <code>&</code> (intersection), <code>|</code> (union), <code>-</code> (différence), <code>^</code> (différence symétrique).',
            code: {
              filename: 'sets.py',
              src: '# Suppression automatique des doublons\ntags = {"python", "web", "python", "api"}\nprint(tags)  # {\'python\', \'web\', \'api\'}\n\nA = {1, 2, 3, 4}\nB = {3, 4, 5, 6}\n\nprint(A & B)  # {3, 4}       intersection\nprint(A | B)  # {1,2,3,4,5,6} union\nprint(A - B)  # {1, 2}       différence\nprint(A ^ B)  # {1, 2, 5, 6} sym. diff.'
            }
          },
          {
            type: 'quiz',
            question: 'Que se passe-t-il si on ajoute un doublon à un set ?',
            options: ['Une erreur est levée', 'Le set grandit', 'Le doublon est ignoré', 'Le set est écrasé'],
            correct: 2,
            xp: 15,
            successMsg: 'Oui ! Un set ne contient que des valeurs uniques, les doublons sont ignorés.',
            errorMsg: 'Les sets ignorent silencieusement les doublons — c\'est leur propriété fondamentale.'
          },
          {
            type: 'fill-blank',
            instructions: 'Complète l\'unpacking :',
            parts: [
              { type: 'text', value: 'a, b = ' },
              { type: 'blank', placeholder: 'b, a', correct: 'b, a' },
              { type: 'text', value: '  # swap en une ligne' },
            ],
            xp: 15
          }
        ]
      },

      {
        title: 'Dictionnaires',
        subtitle: 'Stocker et accéder à des données par clé',
        type: 'theory',
        time: '16 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Créer et parcourir un dict',
            content: 'Un dictionnaire associe des <strong>clés</strong> à des <strong>valeurs</strong>. Les clés doivent être immuables (str, int, tuple). Depuis Python 3.7, l\'ordre d\'insertion est préservé. <code>.get()</code> est plus sûr que <code>[]</code> car il ne lève pas de <code>KeyError</code>.',
            code: {
              filename: 'dicts.py',
              src: 'utilisateur = {"nom": "Ada", "niveau": 3, "actif": True}\n\n# Accès\nprint(utilisateur["nom"])         # Ada\nprint(utilisateur.get("age", 0))  # 0 (défaut si absent)\n\n# Modification\nutilisateur["niveau"] = 4\nutilisateur["email"] = "ada@py.dev"  # ajout\n\n# Supprimer\ndel utilisateur["actif"]\n\n# Parcours\nfor cle, val in utilisateur.items():\n    print(f"{cle}: {val}")'
            }
          },
          {
            type: 'theory',
            title: 'Méthodes avancées et dict comprehension',
            content: '<code>.keys()</code>, <code>.values()</code> et <code>.items()</code> retournent des vues. <code>.update()</code> fusionne deux dicts. Le spread <code>**</code> crée une fusion en une expression. Les <strong>dict comprehensions</strong> créent un dictionnaire depuis une expression.',
            code: {
              filename: 'dict_avance.py',
              src: '# Fusion avec **\nd1 = {"a": 1, "b": 2}\nd2 = {"b": 10, "c": 3}\nfusion = {**d1, **d2}\nprint(fusion)  # {\'a\': 1, \'b\': 10, \'c\': 3}\n\n# Dict comprehension\ncarres = {n: n**2 for n in range(1, 6)}\nprint(carres)  # {1:1, 2:4, 3:9, 4:16, 5:25}\n\n# setdefault : insère seulement si absent\ncompte = {}\nfor lettre in "mississippi":\n    compte.setdefault(lettre, 0)\n    compte[lettre] += 1\nprint(compte)'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne dict.get("cle_inexistante", 42) ?',
            options: ['Une KeyError', 'None', '42', '"cle_inexistante"'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! .get() retourne la valeur par défaut si la clé est absente.',
            errorMsg: '.get(clé, défaut) retourne défaut (ici 42) si la clé n\'existe pas.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée un dict comprehension qui associe chaque mot de ["chat", "chien", "lapin"] à sa longueur.',
            placeholder: 'animaux = ["chat", "chien", "lapin"]\n',
            filename: 'longueurs.py',
            xp: 30,
            validator: (code: string) => /\{.*for.*in.*\}/.test(code) && /len\s*\(/.test(code),
            hint: '{mot: len(mot) for mot in animaux}'
          }
        ]
      },

      {
        title: 'Comprehensions',
        subtitle: 'List, dict et set comprehensions : écriture Pythonique',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'List comprehensions',
            content: 'Une list comprehension crée une liste en une expression : <code>[expression for var in iterable if condition]</code>. Plus lisible et souvent plus rapide qu\'une boucle for + append. La condition est optionnelle.',
            code: {
              filename: 'list_comp.py',
              src: '# Carrés de 1 à 5\ncarres = [n ** 2 for n in range(1, 6)]\nprint(carres)  # [1, 4, 9, 16, 25]\n\n# Avec filtre\npairs = [n for n in range(10) if n % 2 == 0]\nprint(pairs)   # [0, 2, 4, 6, 8]\n\n# Transformation de chaînes\nnoms = ["ana", "leo", "mia"]\nmajuscules = [n.upper() for n in noms]\nprint(majuscules)  # [\'ANA\', \'LEO\', \'MIA\']'
            }
          },
          {
            type: 'theory',
            title: 'Set et dict comprehensions + generators',
            content: 'La même syntaxe s\'applique aux sets (<code>{expr for ...}</code>) et dicts (<code>{k: v for ...}</code>). Les <strong>expressions génératrices</strong> utilisent <code>()</code> au lieu de <code>[]</code> — elles calculent les valeurs à la demande (lazy), sans stocker toute la liste.',
            code: {
              filename: 'comprehensions.py',
              src: '# Set comprehension\nuniques = {x % 3 for x in range(10)}\nprint(uniques)  # {0, 1, 2}\n\n# Dict comprehension\ncarres = {n: n**2 for n in range(5)}\nprint(carres)   # {0:0, 1:1, 2:4, 3:9, 4:16}\n\n# Générateur (lazy, économe en mémoire)\ngen = (n**2 for n in range(1000000))\nprint(next(gen))   # 0\nprint(next(gen))   # 1'
            }
          },
          {
            type: 'quiz',
            question: 'Que produit [n for n in range(5) if n % 2 == 0] ?',
            options: ['[1, 3, 5]', '[0, 2, 4]', '[0, 1, 2, 3, 4]', '[2, 4]'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui ! range(5) va de 0 à 4, filtré sur les pairs.',
            errorMsg: 'range(5) donne 0,1,2,3,4. Filtrés avec %2==0 → 0, 2, 4.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée en une ligne une liste des carrés des entiers impairs de 1 à 20.',
            placeholder: '# Carrés des impairs de 1 à 20\n',
            filename: 'impairs_carres.py',
            xp: 30,
            validator: (code: string) => /\[.*for.*in.*\]/.test(code) && /\*\*\s*2|n\s*\*\s*n/.test(code) && /print\s*\(/.test(code),
            hint: '[n**2 for n in range(1, 21) if n % 2 != 0]'
          }
        ]
      }
    ]
  },

  {
    icon: '⚙️',
    title: 'Fonctions',
    lessons: [

      {
        title: 'Définir des fonctions',
        subtitle: 'def, paramètres, valeurs par défaut et return',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'def, paramètres et return',
            content: 'Une fonction encapsule un bloc réutilisable. Elle peut recevoir des <strong>paramètres positionnels</strong>, des <strong>paramètres nommés</strong> (keyword args) et des <strong>valeurs par défaut</strong>. <code>return</code> renvoie une valeur — sans lui, la fonction retourne <code>None</code>.',
            code: {
              filename: 'fonctions.py',
              src: 'def saluer(nom, ponctuation="!"):\n    """Retourne une salutation. (docstring)"""\n    return f"Bonjour {nom}{ponctuation}"\n\ndef addition(a, b):\n    return a + b\n\nprint(saluer("Ines"))       # Bonjour Ines!\nprint(saluer("Sam", "?"))   # Bonjour Sam?\nprint(addition(4, 6))       # 10\n\n# Arguments nommés (ordre libre)\nprint(addition(b=3, a=7))   # 10'
            }
          },
          {
            type: 'theory',
            title: '*args et **kwargs',
            content: '<code>*args</code> capture un nombre variable d\'arguments positionnels dans un <strong>tuple</strong>. <code>**kwargs</code> capture les arguments nommés dans un <strong>dict</strong>. Tu peux aussi utiliser <code>*</code> pour déplier une liste et <code>**</code> pour déplier un dict lors d\'un appel.',
            code: {
              filename: 'args_kwargs.py',
              src: 'def somme(*nombres):\n    return sum(nombres)\n\ndef afficher(**infos):\n    for cle, val in infos.items():\n        print(f"{cle}: {val}")\n\nprint(somme(1, 2, 3, 4, 5))  # 15\nafficher(nom="Ada", age=21)   # nom: Ada  age: 21\n\n# Dépliage à l\'appel\nliste = [1, 2, 3]\nprint(somme(*liste))          # 6'
            }
          },
          {
            type: 'quiz',
            question: 'Que retourne une fonction sans instruction return ?',
            options: ['0', 'False', 'None', 'Une erreur'],
            correct: 2,
            xp: 15,
            successMsg: 'Oui ! Sans return explicite, Python retourne None implicitement.',
            errorMsg: 'En Python, toute fonction sans return retourne None.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris une fonction puissance(base, exposant=2) qui retourne base**exposant. Teste-la avec puissance(3) et puissance(2, 10).',
            placeholder: 'def puissance(base, exposant=2):\n    pass\n',
            filename: 'puissance.py',
            xp: 30,
            validator: (code: string) => /def\s+puissance/.test(code) && /return/.test(code) && /print\s*\(/.test(code),
            hint: 'return base ** exposant'
          }
        ]
      },

      {
        title: 'Portée, closures et lambdas',
        subtitle: 'Comprendre où vivent les variables et les fonctions avancées',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Portée : LEGB',
            content: 'Python résout les noms de variables selon la règle <strong>LEGB</strong> : Local → Enclosing → Global → Built-in. Une variable locale masque la globale. <code>global</code> déclare qu\'on veut modifier la variable globale. <code>nonlocal</code> fait de même pour la variable de la fonction parente.',
            code: {
              filename: 'portee.py',
              src: 'x = 10  # global\n\ndef f():\n    x = 20  # local, masque le global\n    print(x)  # 20\n\ndef modifier_global():\n    global x\n    x = 99\n\nf()\nprint(x)            # 10 (inchangé)\nmodifier_global()\nprint(x)            # 99'
            }
          },
          {
            type: 'theory',
            title: 'Closures et lambdas',
            content: 'Une <strong>closure</strong> est une fonction qui capture les variables de sa fonction parente même après que celle-ci a retourné. Les fonctions <strong>lambda</strong> sont des fonctions anonymes sur une seule expression, utiles avec <code>map()</code> et <code>filter()</code>.',
            code: {
              filename: 'closures.py',
              src: '# Closure\ndef creer_multiplicateur(n):\n    def multiplier(x):\n        return x * n  # capture n\n    return multiplier\n\ndoubler = creer_multiplicateur(2)\ntripler = creer_multiplicateur(3)\nprint(doubler(5))   # 10\nprint(tripler(5))   # 15\n\n# Lambda\ncarre = lambda x: x ** 2\nprint(carre(4))     # 16\n\n# Avec map et filter\nnombres = [1, 2, 3, 4, 5]\nprint(list(map(lambda x: x**2, nombres)))         # [1, 4, 9, 16, 25]\nprint(list(filter(lambda x: x > 3, nombres)))     # [4, 5]'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la règle de résolution des noms en Python ?',
            options: ['BLGE (Built-in, Local, Global, Enclosing)', 'LEGB (Local, Enclosing, Global, Built-in)', 'GBLE', 'Il n\'y a pas de règle'],
            correct: 1,
            xp: 20,
            successMsg: 'Parfait ! LEGB : Local → Enclosing → Global → Built-in.',
            errorMsg: 'La règle LEGB : Python cherche d\'abord localement, puis dans les fonctions parentes, puis globalement, puis dans les built-ins.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une closure creer_compteur() qui retourne une fonction. Chaque appel incrémente un compteur interne et retourne sa valeur (utilise nonlocal).',
            placeholder: 'def creer_compteur():\n    compte = 0\n    def incrementer():\n        pass  # utilise nonlocal\n    return incrementer\n',
            filename: 'compteur.py',
            xp: 35,
            validator: (code: string) => /nonlocal/.test(code) && /return/.test(code) && /print\s*\(/.test(code),
            hint: 'nonlocal compte permet de modifier compte depuis la fonction interne.'
          }
        ]
      },

      {
        title: 'Projet calculatrice',
        subtitle: 'Assembler plusieurs fonctions dans un mini-projet complet',
        type: 'project',
        time: '20 min',
        xp: 90,
        steps: [
          {
            type: 'project',
            title: 'Calculatrice textuelle robuste',
            description: 'Crée une calculatrice avec les 4 opérations, une gestion de ZeroDivisionError et une fonction d\'aide. Tu combineras fonctions, conditions et exceptions.',
            filename: 'calculatrice.py',
            starter: 'def addition(a, b):\n    return a + b\n\ndef soustraction(a, b):\n    pass\n\ndef multiplication(a, b):\n    pass\n\ndef division(a, b):\n    pass  # gérer b == 0 !\n\n# Tests\nprint(addition(5, 3))       # 8\nprint(soustraction(10, 4))  # 6\nprint(division(10, 0))      # Message d\'erreur\n',
            objectives: [
              'Implémenter les 4 fonctions',
              'Gérer b == 0 dans division()',
              'Afficher un message clair pour la division par zéro',
              'Tester chaque fonction'
            ],
            xp: 90,
            validator: (code: string) => /def\s+soustraction/.test(code) && /def\s+multiplication/.test(code) && /def\s+division/.test(code) && (/b\s*==\s*0/.test(code) || /ZeroDivision/.test(code)) && /print\s*\(/.test(code)
          }
        ]
      }
    ]
  },

  {
    icon: '📁',
    title: 'Exceptions et fichiers',
    lessons: [

      {
        title: 'Gérer les exceptions',
        subtitle: 'try, except, else, finally et raise',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'try / except / else / finally',
            content: 'Les <strong>exceptions</strong> sont des erreurs d\'exécution capturables. <code>try</code> délimite le code risqué. <code>except ExceptionType as e</code> capture l\'erreur. <code>else</code> s\'exécute si aucune erreur. <code>finally</code> s\'exécute toujours, même si une exception est levée.',
            callout: {
              kind: 'tip',
              icon: '🛠️',
              title: 'Capture précise',
              text: 'Évite les except "nus" sans type (except:) — ils capturent tout y compris KeyboardInterrupt. Préfère except ValueError: ou au moins except Exception as e:'
            },
            code: {
              filename: 'exceptions.py',
              src: 'try:\n    age = int(input("Ton âge : "))\n    print(f"Dans 10 ans : {age + 10}")\nexcept ValueError:\n    print("Ce n\'est pas un nombre !")\nexcept TypeError:\n    print("Type invalide")\nelse:\n    print("Conversion réussie")\nfinally:\n    print("Exécuté dans tous les cas")'
            }
          },
          {
            type: 'theory',
            title: 'raise et exceptions personnalisées',
            content: '<code>raise</code> lève une exception manuellement. Tu peux créer tes propres exceptions en héritant d\'<code>Exception</code>. La clause <code>raise ... from e</code> enchaîne les exceptions pour conserver l\'historique.',
            code: {
              filename: 'raise_custom.py',
              src: 'class AgeInvalide(Exception):\n    """Levée si l\'âge est négatif ou absurde."""\n    pass\n\ndef valider_age(age):\n    if age < 0:\n        raise AgeInvalide(f"Âge {age} impossible")\n    if age > 150:\n        raise AgeInvalide(f"Âge {age} peu probable")\n    return age\n\ntry:\n    valider_age(-5)\nexcept AgeInvalide as e:\n    print(f"Erreur : {e}")'
            }
          },
          {
            type: 'quiz',
            question: 'Quel bloc est TOUJOURS exécuté, qu\'il y ait une exception ou non ?',
            options: ['try', 'except', 'else', 'finally'],
            correct: 3,
            xp: 15,
            successMsg: 'Oui ! finally s\'exécute dans tous les cas, même si une exception non gérée remonte.',
            errorMsg: 'C\'est finally qui s\'exécute toujours — utile pour libérer des ressources.'
          },
          {
            type: 'code-challenge',
            instructions: 'Entoure une division a / b dans un try/except pour gérer ZeroDivisionError. Affiche le résultat ou un message d\'erreur explicite.',
            placeholder: 'def diviser(a, b):\n    try:\n        pass\n    except:\n        pass\n',
            filename: 'safe_div.py',
            xp: 30,
            validator: (code: string) => /try:/.test(code) && /except\s+(ZeroDivisionError|Exception)/.test(code) && /print\s*\(/.test(code),
            hint: 'except ZeroDivisionError: print("Division par zéro impossible")'
          }
        ]
      },

      {
        title: 'Lire et écrire des fichiers',
        subtitle: 'open(), with, modes et JSON',
        type: 'theory',
        time: '16 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'open() et le gestionnaire with',
            content: 'La fonction <code>open(fichier, mode, encoding)</code> ouvre un fichier. Le mode peut être <code>"r"</code> (lecture), <code>"w"</code> (écriture, écrase), <code>"a"</code> (ajout) ou <code>"rb"/"wb"</code> pour le binaire. Le bloc <code>with</code> garantit la fermeture automatique même en cas d\'erreur.',
            code: {
              filename: 'fichiers.py',
              src: '# Écriture\nwith open("notes.txt", "w", encoding="utf-8") as f:\n    f.write("Ligne 1\\n")\n    f.write("Ligne 2\\n")\n\n# Lecture complète\nwith open("notes.txt", "r", encoding="utf-8") as f:\n    contenu = f.read()\nprint(contenu)\n\n# Lecture ligne par ligne\nwith open("notes.txt") as f:\n    for ligne in f:\n        print(ligne.strip())'
            }
          },
          {
            type: 'theory',
            title: 'Travailler avec JSON',
            content: 'Le module <code>json</code> permet de sérialiser des dicts/listes Python en JSON et vice-versa. <code>json.dumps()</code> → string JSON. <code>json.loads()</code> → objet Python. <code>json.dump()</code> et <code>json.load()</code> travaillent directement avec des fichiers.',
            code: {
              filename: 'json_ex.py',
              src: 'import json\n\nprofil = {"nom": "Ada", "scores": [95, 87, 92]}\n\n# Sérialisation (Python → JSON)\nwith open("profil.json", "w") as f:\n    json.dump(profil, f, indent=2)\n\n# Désérialisation (JSON → Python)\nwith open("profil.json") as f:\n    data = json.load(f)\n\nprint(data["nom"])      # Ada\nprint(data["scores"])   # [95, 87, 92]'
            }
          },
          {
            type: 'quiz',
            question: 'Quel mode d\'ouverture ajoute du contenu SANS effacer l\'existant ?',
            options: ['"w"', '"r"', '"a"', '"x"'],
            correct: 2,
            xp: 15,
            successMsg: 'Oui ! "a" (append) ajoute à la fin du fichier sans l\'écraser.',
            errorMsg: '"a" pour append : le contenu existant est conservé et on écrit à la suite.'
          },
          {
            type: 'code-challenge',
            instructions: 'Sérialise ce dictionnaire en JSON dans un fichier "config.json", puis relis-le et affiche la valeur de la clé "version".',
            placeholder: 'import json\n\nconfig = {"version": "1.0", "debug": False, "port": 8080}\n',
            filename: 'config.py',
            xp: 30,
            validator: (code: string) => /json\.dump/.test(code) && /json\.load/.test(code) && /print\s*\(/.test(code),
            hint: 'json.dump(config, f) pour écrire, json.load(f) pour relire.'
          }
        ]
      }
    ]
  },

  {
    icon: '🧱',
    title: 'Programmation Orientée Objet',
    lessons: [

      {
        title: 'Classes et objets',
        subtitle: '__init__, self, attributs et méthodes',
        type: 'theory',
        time: '18 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Classe = modèle, objet = instance',
            content: 'Une <strong>classe</strong> est un plan de construction. Un <strong>objet</strong> est une instance concrète de cette classe. <code>__init__</code> est appelé automatiquement à la création. <code>self</code> représente l\'instance courante et doit être le premier paramètre de toute méthode d\'instance.',
            code: {
              filename: 'classes.py',
              src: 'class Joueur:\n    espece = "H. sapiens"     # attribut de classe (partagé)\n\n    def __init__(self, nom, niveau=1):\n        self.nom = nom         # attribut d\'instance\n        self.niveau = niveau\n        self._xp = 0           # convention : _ = "privé"\n\n    def saluer(self):\n        return f"{self.nom} est niveau {self.niveau}"\n\n    def gagner_xp(self, points):\n        self._xp += points\n\nj1 = Joueur("Nina", 3)\nj2 = Joueur("Leo")\nprint(j1.saluer())   # Nina est niveau 3\nj1.gagner_xp(100)\nprint(Joueur.espece) # H. sapiens'
            }
          },
          {
            type: 'theory',
            title: 'Méthodes spéciales (dunder methods)',
            content: 'Les méthodes <strong>dunder</strong> (double underscore) donnent un comportement Python natif à tes classes. <code>__str__</code> pour <code>print()</code>, <code>__repr__</code> pour le débogage, <code>__len__</code> pour <code>len()</code>, <code>__eq__</code> pour <code>==</code>, etc.',
            code: {
              filename: 'dunders.py',
              src: 'class Vecteur:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\n    def __repr__(self):\n        return f"Vecteur({self.x}, {self.y})"\n\n    def __add__(self, other):\n        return Vecteur(self.x + other.x, self.y + other.y)\n\n    def __len__(self):\n        return int((self.x**2 + self.y**2) ** 0.5)\n\nv1 = Vecteur(1, 2)\nv2 = Vecteur(3, 4)\nprint(v1 + v2)   # (4, 6)\nprint(len(v2))   # 5'
            }
          },
          {
            type: 'quiz',
            question: 'À quoi sert self dans une méthode Python ?',
            options: ['C\'est un mot-clé réservé comme this en Java', 'C\'est une convention pour pointer l\'instance courante', 'Il est optionnel', 'Il représente la classe, pas l\'objet'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact ! self est une convention (pas un mot-clé réservé) pour désigner l\'instance.',
            errorMsg: 'self est une convention Python pour représenter l\'instance courante — pas un mot-clé réservé comme this.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une classe Livre avec titre et auteur. Ajoute __str__ qui retourne "\'titre\' par auteur" et __eq__ qui compare par titre.',
            placeholder: 'class Livre:\n    def __init__(self, titre, auteur):\n        pass\n',
            filename: 'livre.py',
            xp: 40,
            validator: (code: string) => /class\s+Livre/.test(code) && /__init__/.test(code) && /__str__/.test(code) && /__eq__/.test(code),
            hint: '__eq__(self, other) doit comparer self.titre == other.titre'
          }
        ]
      },

      {
        title: 'Héritage et polymorphisme',
        subtitle: 'Réutiliser et étendre des classes existantes',
        type: 'theory',
        time: '18 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'Héritage simple et super()',
            content: 'L\'<strong>héritage</strong> permet à une classe d\'hériter des attributs et méthodes d\'une autre. <code>super()</code> appelle la méthode de la classe parente, utile dans <code>__init__</code> pour ne pas réécrire la logique de base.',
            code: {
              filename: 'heritage.py',
              src: 'class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n\n    def parler(self):\n        return "..."\n\nclass Chien(Animal):\n    def __init__(self, nom, race):\n        super().__init__(nom)   # appelle Animal.__init__\n        self.race = race\n\n    def parler(self):           # override\n        return f"{self.nom} aboie : Woof !"\n\nclass Chat(Animal):\n    def parler(self):\n        return f"{self.nom} miaule : Miaou !"\n\nanimaux = [Chien("Rex", "Labrador"), Chat("Mimi")]\nfor a in animaux:\n    print(a.parler())  # polymorphisme'
            }
          },
          {
            type: 'theory',
            title: 'Properties, @classmethod et @staticmethod',
            content: '<code>@property</code> crée un getter élégant (attribut calculé). Avec <code>@x.setter</code>, tu peux valider avant d\'affecter. <code>@classmethod</code> reçoit la classe (pas l\'instance) → utile comme factory. <code>@staticmethod</code> ne reçoit ni self ni cls → utile pour les utilitaires.',
            code: {
              filename: 'decorateurs.py',
              src: 'class Cercle:\n    def __init__(self, rayon):\n        self._rayon = rayon\n\n    @property\n    def rayon(self):\n        return self._rayon\n\n    @rayon.setter\n    def rayon(self, val):\n        if val < 0:\n            raise ValueError("Rayon négatif")\n        self._rayon = val\n\n    @property\n    def aire(self):              # calculé à la volée\n        return 3.14159 * self._rayon ** 2\n\n    @classmethod\n    def depuis_diametre(cls, d):\n        return cls(d / 2)       # factory\n\nc = Cercle.depuis_diametre(10)\nprint(c.aire)   # 78.53...'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est la différence entre @classmethod et @staticmethod ?',
            options: [
              '@classmethod reçoit cls, @staticmethod ne reçoit rien',
              'Ils sont identiques',
              '@staticmethod reçoit self',
              '@classmethod est plus lent'
            ],
            correct: 0,
            xp: 20,
            successMsg: 'Exact ! @classmethod reçoit cls (la classe), @staticmethod n\'a aucun argument implicite.',
            errorMsg: '@classmethod reçoit cls (la classe) comme premier arg. @staticmethod n\'a ni self ni cls.'
          },
          {
            type: 'code-challenge',
            instructions: 'Crée une classe Employe héritant de Personne. Personne a nom et age. Employe ajoute salaire et une property bonus qui retourne salaire * 0.1.',
            placeholder: 'class Personne:\n    def __init__(self, nom, age):\n        self.nom = nom\n        self.age = age\n\nclass Employe(Personne):\n    pass\n',
            filename: 'employe.py',
            xp: 40,
            validator: (code: string) => /class\s+Employe.*Personne/.test(code) && /super\s*\(\s*\)/.test(code) && /@property/.test(code),
            hint: 'super().__init__(nom, age) dans Employe.__init__, puis @property pour bonus.'
          }
        ]
      },

      {
        title: 'Projet final POO',
        subtitle: 'Construire un gestionnaire de contacts avec héritage',
        type: 'project',
        time: '30 min',
        xp: 120,
        steps: [
          {
            type: 'project',
            title: 'Répertoire de contacts',
            description: 'Crée un système de contacts avec une classe Contact (nom, email, tel), une classe ContactPro qui hérite de Contact avec un attribut entreprise, et une classe Repertoire pour les gérer.',
            filename: 'contacts.py',
            starter: 'class Contact:\n    def __init__(self, nom, email):\n        self.nom = nom\n        self.email = email\n\n    def __str__(self):\n        return f"{self.nom} <{self.email}>"\n\nclass ContactPro(Contact):\n    pass  # ajouter entreprise\n\nclass Repertoire:\n    def __init__(self):\n        self.contacts = []\n\n    def ajouter(self, contact):\n        pass\n\n    def rechercher(self, nom):\n        pass  # retourne la liste des contacts correspondants\n\n    def __len__(self):\n        pass\n\n# Démonstration\nr = Repertoire()\nr.ajouter(Contact("Alice", "alice@py.dev"))\nr.ajouter(ContactPro("Bob", "bob@co.fr", "TechCorp"))\nprint(len(r))\n',
            objectives: [
              'ContactPro hérite de Contact avec super()',
              'Repertoire.ajouter() et Repertoire.rechercher() fonctionnent',
              '__len__ retourne le nombre de contacts',
              'Afficher les contacts avec print()'
            ],
            xp: 120,
            validator: (code: string) => /class\s+ContactPro.*Contact/.test(code) && /super\s*\(\s*\)/.test(code) && /def\s+rechercher/.test(code) && /__len__/.test(code) && /print\s*\(/.test(code)
          }
        ]
      }
    ]
  },

  {
    icon: '🚀',
    title: 'Python avancé',
    lessons: [

      {
        title: 'Décorateurs',
        subtitle: 'Augmenter des fonctions sans les modifier',
        type: 'theory',
        time: '18 min',
        xp: 85,
        steps: [
          {
            type: 'theory',
            title: 'Principe du décorateur',
            content: 'Un décorateur est une <strong>fonction qui prend une fonction et retourne une nouvelle fonction enrichie</strong>. La syntaxe <code>@mon_decorateur</code> est un sucre syntaxique pour <code>f = mon_decorateur(f)</code>. <code>functools.wraps</code> préserve les métadonnées de la fonction d\'origine.',
            code: {
              filename: 'decorateurs.py',
              src: 'import functools\nimport time\n\ndef chronometre(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        debut = time.time()\n        resultat = func(*args, **kwargs)\n        fin = time.time()\n        print(f"{func.__name__} : {fin - debut:.4f}s")\n        return resultat\n    return wrapper\n\n@chronometre\ndef somme_lente(n):\n    return sum(range(n))\n\nprint(somme_lente(10_000_000))'
            }
          },
          {
            type: 'quiz',
            question: '@mon_decorateur au-dessus de def f(): est équivalent à ?',
            options: ['f.apply(mon_decorateur)', 'f = mon_decorateur(f)', 'mon_decorateur = f()', 'class f(mon_decorateur)'],
            correct: 1,
            xp: 20,
            successMsg: 'Exact ! @dec est du sucre syntaxique pour f = dec(f).',
            errorMsg: '@dec équivaut à f = dec(f) — la fonction est passée au décorateur et remplacée.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un décorateur @logger qui affiche "[APPEL] nom_fonction(args)" avant chaque appel de fonction.',
            placeholder: 'import functools\n\ndef logger(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        pass  # afficher le log\n    return wrapper\n\n@logger\ndef addition(a, b):\n    return a + b\n\nprint(addition(3, 4))\n',
            filename: 'logger.py',
            xp: 40,
            validator: (code: string) => /def\s+logger/.test(code) && /functools\.wraps/.test(code) && /wrapper/.test(code) && /print\s*\(.*func.*__name__/.test(code),
            hint: 'print(f"[APPEL] {func.__name__}({args})") avant d\'appeler func(*args, **kwargs)'
          }
        ]
      },

      {
        title: 'Générateurs et itérateurs',
        subtitle: 'Créer des séquences paresseuses avec yield',
        type: 'theory',
        time: '16 min',
        xp: 80,
        steps: [
          {
            type: 'theory',
            title: 'yield et les générateurs',
            content: 'Une fonction avec <code>yield</code> devient un <strong>générateur</strong>. Elle ne calcule pas toutes les valeurs d\'un coup, mais les produit une par une à la demande (<strong>lazy evaluation</strong>). Idéal pour les grandes séquences — consomme très peu de mémoire.',
            code: {
              filename: 'generateurs.py',
              src: 'def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\n# Premiers 10 nombres de Fibonacci\ngen = fibonacci()\nfor _ in range(10):\n    print(next(gen), end=" ")  # 0 1 1 2 3 5 8 13 21 34\n\n# Générateur de fichier (économe en RAM)\ndef lire_lignes(fichier):\n    with open(fichier) as f:\n        for ligne in f:\n            yield ligne.strip()'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle est l\'avantage d\'un générateur sur une liste ?',
            options: [
              'Il est plus rapide à créer',
              'Il calcule les valeurs à la demande sans tout stocker en RAM',
              'Il est immuable',
              'Il peut contenir plus de types'
            ],
            correct: 1,
            xp: 20,
            successMsg: 'Oui ! Les générateurs produisent les valeurs une par une, sans tout charger en mémoire.',
            errorMsg: 'L\'avantage clé : les générateurs sont "lazy" — ils calculent à la demande, économisant la RAM.'
          },
          {
            type: 'code-challenge',
            instructions: 'Écris un générateur nombres_premiers(limite) qui produit les nombres premiers jusqu\'à limite.',
            placeholder: 'def nombres_premiers(limite):\n    for n in range(2, limite + 1):\n        pass  # vérifier si n est premier, yield si oui\n\nfor p in nombres_premiers(30):\n    print(p, end=" ")\n',
            filename: 'premiers.py',
            xp: 40,
            validator: (code: string) => /yield/.test(code) && /def\s+nombres_premiers/.test(code) && /print\s*\(/.test(code),
            hint: 'Un nombre est premier si aucun entier de 2 à sqrt(n) ne le divise. Utilise all(n % i != 0 for i in range(2, n)).'
          }
        ]
      },

      {
        title: 'Modules et packages',
        subtitle: 'Organiser son code, stdlib et bibliothèques tierces',
        type: 'theory',
        time: '14 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Créer et importer des modules',
            content: 'Tout fichier <code>.py</code> est un module. <code>import math</code> importe le module. <code>from math import sqrt, ceil</code> importe des fonctions spécifiques. <code>import math as m</code> crée un alias. <code>dir(module)</code> liste les symboles disponibles.',
            code: {
              filename: 'modules.py',
              src: 'import math\nfrom random import randint, choice\nimport json\nimport os\n\nprint(math.sqrt(16))    # 4.0\nprint(math.pi)          # 3.14159...\nprint(randint(1, 6))    # dé 6 faces\nprint(choice(["oui", "non", "peut-être"]))\n\n# os : interagir avec le système\nprint(os.getcwd())      # dossier courant\nprint(os.listdir("."))  # contenu du dossier'
            }
          },
          {
            type: 'theory',
            title: 'Packages et __name__',
            content: 'Un <strong>package</strong> est un dossier contenant un fichier <code>__init__.py</code>. La variable spéciale <code>__name__</code> vaut <code>"__main__"</code> quand on exécute directement le fichier, et le nom du module quand il est importé. Cela permet d\'avoir du code de test sans qu\'il s\'exécute à l\'import.',
            code: {
              filename: 'package_ex.py',
              src: '# Structure d\'un package :\n# mon_package/\n#   __init__.py\n#   utils.py\n#   calculs.py\n\n# Dans utils.py :\ndef double(x):\n    return x * 2\n\nif __name__ == "__main__":\n    # Ce bloc ne s\'exécute PAS quand on importe utils\n    print("Test direct :", double(5))\n\n# Dans un autre fichier :\n# from mon_package.utils import double'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complète l\'import pour utiliser uniquement sqrt depuis math :',
            parts: [
              { type: 'text', value: 'from math ' },
              { type: 'blank', placeholder: 'import', correct: 'import' },
              { type: 'text', value: ' sqrt\n\nprint(sqrt(25))  # 5.0' },
            ],
            xp: 15
          },
          {
            type: 'code-challenge',
            instructions: 'Utilise le module random pour générer 5 nombres entre 1 et 100, puis affiche leur moyenne avec math.',
            placeholder: 'import random\nimport math\n\n',
            filename: 'stats.py',
            xp: 30,
            validator: (code: string) => /random/.test(code) && /math/.test(code) && /print\s*\(/.test(code),
            hint: 'random.randint(1, 100) pour chaque nombre, sum(liste)/len(liste) pour la moyenne.'
          }
        ]
      },

      {
        title: 'Projet final Python',
        subtitle: 'Un programme complet qui combine tout le parcours',
        type: 'project',
        time: '45 min',
        xp: 150,
        steps: [
          {
            type: 'project',
            title: 'Gestionnaire de bibliothèque',
            description: 'Crée un système complet de gestion de bibliothèque : Livre (POO), Bibliotheque (collections), persistance JSON, exceptions personnalisées et une interface console avec boucle principale.',
            filename: 'bibliotheque.py',
            starter: 'import json\nimport os\nfrom datetime import date\n\nclass LivreNonTrouve(Exception):\n    pass\n\nclass Livre:\n    def __init__(self, titre, auteur, isbn):\n        self.titre = titre\n        self.auteur = auteur\n        self.isbn = isbn\n        self.disponible = True\n\n    def __str__(self):\n        statut = "✓" if self.disponible else "✗"\n        return f"[{statut}] {self.titre} — {self.auteur}"\n\n    def to_dict(self):\n        return vars(self)  # convertit les attributs en dict\n\nclass Bibliotheque:\n    def __init__(self, fichier="livres.json"):\n        self.livres = []\n        self.fichier = fichier\n        self._charger()\n\n    def ajouter(self, livre):\n        pass\n\n    def rechercher(self, terme):\n        pass  # chercher dans titre ET auteur\n\n    def emprunter(self, isbn):\n        pass  # lever LivreNonTrouve si absent\n\n    def retourner(self, isbn):\n        pass\n\n    def _charger(self):\n        pass  # charger depuis JSON si le fichier existe\n\n    def _sauvegarder(self):\n        pass  # sauvegarder en JSON\n\n# Programme principal\nif __name__ == "__main__":\n    b = Bibliotheque()\n    b.ajouter(Livre("Python Fluent", "Ramalho", "978-1"))\n    b.ajouter(Livre("Clean Code", "Martin", "978-2"))\n    print(f"\\nBibliothèque : {len(b.livres)} livres")\n    for livre in b.livres:\n        print(" ", livre)\n',
            objectives: [
              'Ajouter et rechercher des livres',
              'Gérer emprunt / retour avec LivreNonTrouve',
              'Persistance JSON (_charger + _sauvegarder)',
              'Utiliser __str__ et to_dict()',
              'Bloc if __name__ == "__main__"'
            ],
            xp: 150,
            validator: (code: string) =>
              /class\s+Livre/.test(code) &&
              /class\s+Bibliotheque/.test(code) &&
              /class\s+LivreNonTrouve.*Exception/.test(code) &&
              /json\.dump/.test(code) &&
              /def\s+rechercher/.test(code) &&
              /__name__.*__main__/.test(code)
          }
        ]
      }
    ]
  }
]
