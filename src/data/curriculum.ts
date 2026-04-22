// src/data/curriculum.ts
import type { CourseModule } from '@/types/cours'

export const CURRICULUM_PYTHON: CourseModule[] = [
  {
    icon: '🌱',
    title: 'Fondations',
    lessons: [
      {
        title: 'Bienvenue dans Python',
        subtitle: 'Découvre le langage, sa syntaxe et ton premier programme',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'Pourquoi Python est ideal pour debuter',
            content: 'Python est un langage <strong>simple a lire</strong>, <strong>tres polyvalent</strong> et utilise dans le web, la data, l\'automatisation, l\'IA et la cybersécurité. Sa syntaxe est volontairement claire pour te laisser te concentrer sur la logique.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'Le bon reflexe',
              text: 'Lis ton code a voix haute. Si la phrase ressemble a du francais ou de l\'anglais simple, tu es souvent sur la bonne voie.'
            },
            code: {
              filename: 'hello.py',
              src: 'print("Bonjour, monde !")\nprint("Je commence Python aujourd\\\'hui.")'
            }
          },
          {
            type: 'quiz',
            question: 'A quoi sert principalement Python ?',
            options: ['Uniquement aux jeux video', 'Uniquement aux bases de donnees', 'A de nombreux domaines differents', 'Seulement aux sites web'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact, Python est tres polyvalent.',
            errorMsg: 'Python est utilise dans beaucoup de domaines, pas dans un seul.'
          },
          {
            type: 'code-challenge',
            instructions: 'Affiche deux messages differents avec print().',
            placeholder: 'print("Bonjour")\n',
            filename: 'main.py',
            xp: 20,
            validator: (code: string) => (code.match(/print\s*\(/g) || []).length >= 2,
            hint: 'Il faut ecrire deux lignes avec print(...).'
          }
        ]
      },
      {
        title: 'Variables et types',
        subtitle: 'Apprends a stocker du texte, des nombres et des booleens',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Creer des variables',
            content: 'Une variable permet de <strong>stocker une valeur</strong> pour la reutiliser plus tard. En Python, tu n\'as pas besoin de preciser le type a l\'avance.',
            code: {
              filename: 'variables.py',
              src: 'prenom = "Ada"\nage = 21\ntaille = 1.72\nest_connecte = True\n\nprint(prenom)\nprint(type(age))'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complete ces variables correctement :',
            parts: [
              { type: 'text', value: 'ville = ' },
              { type: 'blank', placeholder: '"Paris"', correct: '"Paris"' },
              { type: 'text', value: '\nscore = ' },
              { type: 'blank', placeholder: '42', correct: '42' },
              { type: 'text', value: '\nconnecte = ' },
              { type: 'blank', placeholder: 'True', correct: 'True' },
            ],
            xp: 20
          },
          {
            type: 'quiz',
            question: 'Quel est le type de la valeur "25" ?',
            options: ['int', 'str', 'float', 'bool'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui, avec des guillemets c\'est du texte.',
            errorMsg: '"25" contient des guillemets, donc c\'est une chaine de caracteres.'
          }
        ]
      },
      {
        title: 'Operations et conversions',
        subtitle: 'Calcule, compare et transforme les donnees',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Les operations essentielles',
            content: 'Tu peux additionner, soustraire, multiplier, diviser et comparer des valeurs. Python propose aussi des conversions avec <code>int()</code>, <code>float()</code> et <code>str()</code>.',
            code: {
              filename: 'operations.py',
              src: 'a = 10\nb = 3\n\nprint(a + b)\nprint(a / b)\nprint(a > b)\nprint(int("15") + 5)'
            }
          },
          {
            type: 'quiz',
            question: 'Que fait int("8") ?',
            options: ['Transforme le texte "8" en nombre 8', 'Ajoute des guillemets', 'Crée un decimal', 'Retourne False'],
            correct: 0,
            xp: 15,
            successMsg: 'Exact, int convertit en entier.',
            errorMsg: 'int("8") convertit le texte en entier.'
          },
          {
            type: 'code-challenge',
            instructions: 'Cree deux variables prix = "19" et taxe = 1.2, puis affiche le total numerique.',
            placeholder: 'prix = "19"\ntaxe = 1.2\n',
            filename: 'conversion.py',
            xp: 25,
            validator: (code: string) => /int\s*\(\s*["']?19["']?\s*\)|float\s*\(\s*prix\s*\)|int\s*\(\s*prix\s*\)/.test(code) && /print\s*\(/.test(code),
            hint: 'Convertis prix avant de calculer.'
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
        title: 'Conditions if elif else',
        subtitle: 'Fais reagir ton programme en fonction des situations',
        type: 'theory',
        time: '14 min',
        xp: 60,
        steps: [
          {
            type: 'theory',
            title: 'Prendre une decision',
            content: 'Les structures <code>if</code>, <code>elif</code> et <code>else</code> permettent a ton programme de choisir une action selon une condition. En Python, l\'indentation est obligatoire.',
            callout: {
              kind: 'warn',
              icon: '⚠️',
              title: 'Attention aux espaces',
              text: 'Un bloc mal indente provoque une erreur. En Python, les espaces font partie de la syntaxe.'
            },
            code: {
              filename: 'conditions.py',
              src: 'note = 14\n\nif note >= 16:\n    print("Tres bien")\nelif note >= 10:\n    print("Valide")\nelse:\n    print("A retravailler")'
            }
          },
          {
            type: 'quiz',
            question: 'A quoi sert else ?',
            options: ['A repeter une boucle', 'A definir une fonction', 'A gerer le cas restant', 'A convertir un type'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact, else gere le cas par defaut.',
            errorMsg: 'else est execute si les autres conditions ne sont pas verifiees.'
          },
          {
            type: 'code-challenge',
            instructions: 'Ecris un programme qui affiche "Acces autorise" si age >= 18, sinon "Acces refuse".',
            placeholder: 'age = 20\n',
            filename: 'age.py',
            xp: 30,
            validator: (code: string) => /if/.test(code) && /else/.test(code) && /Acces autorise|Acces refuse/.test(code),
            hint: 'Utilise if age >= 18: puis else:'
          }
        ]
      },
      {
        title: 'Comparaisons et logique booleenne',
        subtitle: 'Combine plusieurs conditions intelligemment',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'and, or, not',
            content: 'Les operateurs booleens permettent de combiner plusieurs tests. <code>and</code> exige que tout soit vrai, <code>or</code> qu\'au moins une condition soit vraie, et <code>not</code> inverse le resultat.',
            code: {
              filename: 'booleens.py',
              src: 'age = 22\nabonne = True\n\nif age >= 18 and abonne:\n    print("Bienvenue")\n\nif not abonne:\n    print("Pense a t\\\'abonner")'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complete la condition pour verifier que la personne est majeure et connectee :',
            parts: [
              { type: 'text', value: 'if age >= 18 ' },
              { type: 'blank', placeholder: 'and', correct: 'and' },
              { type: 'text', value: ' connecte:\n    print("OK")' }
            ],
            xp: 15
          },
          {
            type: 'quiz',
            question: 'Quand une condition avec or est-elle vraie ?',
            options: ['Quand toutes les conditions sont fausses', 'Quand au moins une condition est vraie', 'Seulement quand deux conditions sont vraies', 'Jamais'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact, or suffit avec une seule condition vraie.',
            errorMsg: 'or retourne vrai des qu\'une condition est vraie.'
          }
        ]
      }
    ]
  },
  {
    icon: '🔁',
    title: 'Boucles',
    lessons: [
      {
        title: 'Boucle while',
        subtitle: 'Repete tant qu une condition reste vraie',
        type: 'theory',
        time: '10 min',
        xp: 45,
        steps: [
          {
            type: 'theory',
            title: 'Repeter avec while',
            content: 'La boucle <code>while</code> execute un bloc de code tant qu\'une condition est vraie. Il faut faire evoluer la condition pour eviter une boucle infinie.',
            code: {
              filename: 'while.py',
              src: 'compteur = 1\n\nwhile compteur <= 3:\n    print("Tour", compteur)\n    compteur += 1'
            }
          },
          {
            type: 'quiz',
            question: 'Quel risque existe avec while ?',
            options: ['Une boucle infinie', 'Une erreur de type automatique', 'Une suppression du fichier', 'Aucun'],
            correct: 0,
            xp: 15,
            successMsg: 'Oui, si la condition ne change jamais la boucle continue sans fin.',
            errorMsg: 'Le piege classique de while est la boucle infinie.'
          },
          {
            type: 'code-challenge',
            instructions: 'Affiche les nombres de 1 a 5 avec une boucle while.',
            placeholder: 'n = 1\n',
            filename: 'count.py',
            xp: 25,
            validator: (code: string) => /while/.test(code) && /\+=\s*1|=\s*\w+\s*\+\s*1/.test(code),
            hint: 'Incremente la variable a chaque tour.'
          }
        ]
      },
      {
        title: 'Boucle for et range',
        subtitle: 'Parcours des suites de valeurs simplement',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'for pour iterer',
            content: 'La boucle <code>for</code> parcourt directement une sequence comme une liste, une chaine ou un <code>range()</code>. C\'est souvent la boucle la plus pratique en Python.',
            code: {
              filename: 'for.py',
              src: 'for i in range(1, 6):\n    print(i)\n\nfor lettre in "code":\n    print(lettre)'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complete cette boucle pour afficher les nombres de 0 a 4 :',
            parts: [
              { type: 'text', value: 'for i in ' },
              { type: 'blank', placeholder: 'range(5)', correct: 'range(5)' },
              { type: 'text', value: ':\n    print(i)' }
            ],
            xp: 15
          },
          {
            type: 'code-challenge',
            instructions: 'Affiche tous les elements de la liste ["HTML", "CSS", "Python"] avec une boucle for.',
            placeholder: 'langages = ["HTML", "CSS", "Python"]\n',
            filename: 'liste.py',
            xp: 25,
            validator: (code: string) => /for/.test(code) && /langages/.test(code) && /print\s*\(/.test(code),
            hint: 'Parcours la liste avec for element in langages:'
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
        title: 'Listes et slices',
        subtitle: 'Stocke plusieurs valeurs dans l ordre',
        type: 'theory',
        time: '15 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Manipuler les listes',
            content: 'Une liste stocke plusieurs valeurs dans un ordre precis. Tu peux ajouter, supprimer, modifier et recuperer des elements avec leur index.',
            code: {
              filename: 'listes.py',
              src: 'nombres = [10, 20, 30, 40]\nprint(nombres[0])\nprint(nombres[-1])\nprint(nombres[1:3])\n\nnombres.append(50)\nprint(nombres)'
            }
          },
          {
            type: 'quiz',
            question: 'Que renvoie ma_liste[1:3] ?',
            options: ['Seulement le premier element', 'Les elements d index 1 et 2', 'Toute la liste', 'Une erreur automatique'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact, la fin du slice n\'est pas incluse.',
            errorMsg: 'Le slice 1:3 prend l\'index 1 puis 2.'
          },
          {
            type: 'code-challenge',
            instructions: 'Cree une liste courses avec 3 aliments, ajoute-en un quatrieme et affiche la liste.',
            placeholder: 'courses = ["pain", "lait", "pommes"]\n',
            filename: 'courses.py',
            xp: 30,
            validator: (code: string) => /append\s*\(/.test(code) && /print\s*\(/.test(code),
            hint: 'Utilise courses.append(...).'
          }
        ]
      },
      {
        title: 'Tuples, dictionnaires et ensembles',
        subtitle: 'Choisis la bonne structure selon le besoin',
        type: 'theory',
        time: '18 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'Trois structures utiles',
            content: 'Un <code>tuple</code> est immuable, un <code>dict</code> associe des cles a des valeurs, et un <code>set</code> stocke des valeurs uniques sans doublons.',
            code: {
              filename: 'collections.py',
              src: 'coordonnees = (48.85, 2.35)\nutilisateur = {"nom": "Ada", "niveau": "debutant"}\ntags = {"python", "web", "python"}\n\nprint(utilisateur["nom"])\nprint(tags)'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complete ce dictionnaire :',
            parts: [
              { type: 'text', value: 'profil = {"nom": "Lina", "age": ' },
              { type: 'blank', placeholder: '20', correct: '20' },
              { type: 'text', value: '}' }
            ],
            xp: 15
          },
          {
            type: 'quiz',
            question: 'Quelle structure est pratique pour stocker des paires cle valeur ?',
            options: ['list', 'dict', 'set', 'str'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui, le dictionnaire est fait pour cela.',
            errorMsg: 'Le dictionnaire relie une cle a une valeur.'
          }
        ]
      },
      {
        title: 'List comprehensions',
        subtitle: 'Ecris des transformations compactes et pythoniques',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Construire une liste rapidement',
            content: 'Une list comprehension permet de creer une nouvelle liste en une seule expression. C\'est plus lisible qu\'une boucle dans beaucoup de cas simples.',
            code: {
              filename: 'comprehension.py',
              src: 'carres = [n * n for n in range(1, 6)]\npairs = [n for n in range(10) if n % 2 == 0]\n\nprint(carres)\nprint(pairs)'
            }
          },
          {
            type: 'quiz',
            question: 'Que produit [n for n in range(5)] ?',
            options: ['[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[0, 2, 4]', 'Une erreur'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact, range(5) va de 0 a 4.',
            errorMsg: 'range(5) commence a 0 et s\'arrete avant 5.'
          },
          {
            type: 'code-challenge',
            instructions: 'Cree une liste noms_majuscules a partir de ["ana", "leo", "mila"] en mettant chaque nom en majuscules.',
            placeholder: 'noms = ["ana", "leo", "mila"]\n',
            filename: 'majuscules.py',
            xp: 25,
            validator: (code: string) => /\[.*for.*in.*\]/s.test(code) && /upper\s*\(/.test(code),
            hint: 'Utilise nom.upper() dans la comprehension.'
          }
        ]
      }
    ]
  },
  {
    icon: '⚙️',
    title: 'Fonctions et modularite',
    lessons: [
      {
        title: 'Definir des fonctions',
        subtitle: 'Factorise ton code avec parametres et return',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'def, arguments et retour',
            content: 'Une fonction est un bloc reutilisable. Elle peut recevoir des parametres, executer une logique puis retourner un resultat avec <code>return</code>.',
            code: {
              filename: 'fonctions.py',
              src: 'def saluer(nom):\n    return f"Bonjour {nom}"\n\ndef addition(a, b):\n    return a + b\n\nprint(saluer("Ines"))\nprint(addition(4, 6))'
            }
          },
          {
            type: 'quiz',
            question: 'A quoi sert return ?',
            options: ['A repeter une boucle', 'A renvoyer un resultat', 'A afficher automatiquement', 'A declarer une variable globale'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui, return renvoie une valeur.',
            errorMsg: 'return sert a transmettre un resultat a l\'appelant.'
          },
          {
            type: 'code-challenge',
            instructions: 'Ecris une fonction carre(n) qui retourne le carre de n puis affiche le resultat pour 7.',
            placeholder: 'def carre(n):\n    pass\n',
            filename: 'carre.py',
            xp: 30,
            validator: (code: string) => /def\s+carre/.test(code) && /return/.test(code) && /print\s*\(/.test(code),
            hint: 'Le carre est n ** 2.'
          }
        ]
      },
      {
        title: 'Portee, arguments par defaut et docstrings',
        subtitle: 'Ecris des fonctions propres et faciles a relire',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'Fonctions robustes',
            content: 'La <strong>portee</strong> decide ou une variable existe. Les arguments par defaut rendent une fonction plus flexible, et les <strong>docstrings</strong> servent a documenter le role d\'une fonction.',
            code: {
              filename: 'docstrings.py',
              src: 'def saluer(nom, ponctuation="!"):\n    """Retourne une phrase de salutation."""\n    message = f"Bonjour {nom}{ponctuation}"\n    return message\n\nprint(saluer("Sam"))\nprint(saluer("Lina", "?"))'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complete l argument par defaut :',
            parts: [
              { type: 'text', value: 'def convertir(prix, taux=' },
              { type: 'blank', placeholder: '1.2', correct: '1.2' },
              { type: 'text', value: '):\n    return prix * taux' }
            ],
            xp: 15
          },
          {
            type: 'quiz',
            question: 'Une variable creee dans une fonction est en general...',
            options: ['Globale partout', 'Locale a cette fonction', 'Toujours constante', 'Accessible seulement dans le navigateur'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact, elle est locale par defaut.',
            errorMsg: 'Par defaut, une variable definie dans une fonction est locale.'
          }
        ]
      },
      {
        title: 'Projet calculatrice',
        subtitle: 'Assemble plusieurs fonctions dans un mini projet complet',
        type: 'project',
        time: '20 min',
        xp: 90,
        steps: [
          {
            type: 'project',
            title: 'Calculatrice textuelle',
            description: 'Cree une mini calculatrice avec addition, soustraction, multiplication et division securisee.',
            filename: 'calculatrice.py',
            starter: 'def addition(a, b):\n    return a + b\n\ndef soustraction(a, b):\n    pass\n\ndef multiplication(a, b):\n    pass\n\ndef division(a, b):\n    pass\n\nprint(addition(5, 3))\n',
            objectives: [
              'Creer 4 fonctions',
              'Gerer le cas b == 0 dans la division',
              'Afficher plusieurs tests'
            ],
            xp: 90,
            validator: (code: string) => /def\s+soustraction/.test(code) && /def\s+multiplication/.test(code) && /def\s+division/.test(code) && (/b\s*==\s*0/.test(code) || /ZeroDivision/.test(code)) && /print\s*\(/.test(code)
          }
        ]
      }
    ]
  },
  {
    icon: '🧱',
    title: 'Chaines et manipulation de texte',
    lessons: [
      {
        title: 'Maitriser les chaines',
        subtitle: 'Construis et transforme du texte proprement',
        type: 'theory',
        time: '12 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Concatener, indexer et formatter',
            content: 'Les chaines de caracteres permettent de manipuler du texte. Tu peux les concatener avec <code>+</code>, acceder a un caractere par index et utiliser les f-strings pour formatter proprement.',
            code: {
              filename: 'strings.py',
              src: 'prenom = "Aya"\nlangage = "Python"\n\nmessage = f"{prenom} apprend {langage}"\nprint(message)\nprint(langage[0])\nprint(langage.lower())'
            }
          },
          {
            type: 'quiz',
            question: 'Quel outil est recommande pour inserer des variables dans une phrase ?',
            options: ['f-string', 'goto', 'switch', 'lambda obligatoire'],
            correct: 0,
            xp: 15,
            successMsg: 'Oui, les f-strings sont tres pratiques.',
            errorMsg: 'Les f-strings sont la facon la plus claire de formatter du texte.'
          },
          {
            type: 'code-challenge',
            instructions: 'Cree les variables prenom et age puis affiche une phrase complete avec une f-string.',
            placeholder: 'prenom = "Noa"\nage = 19\n',
            filename: 'profil.py',
            xp: 25,
            validator: (code: string) => /f["']/.test(code) && /print\s*\(/.test(code),
            hint: 'Exemple : print(f"{prenom} a {age} ans")'
          }
        ]
      }
    ]
  },
  {
    icon: '📁',
    title: 'Fichiers et erreurs',
    lessons: [
      {
        title: 'Lire et ecrire des fichiers',
        subtitle: 'Sauvegarde tes donnees dans des fichiers texte',
        type: 'theory',
        time: '15 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'open et with',
            content: 'Python permet de lire et ecrire des fichiers avec <code>open()</code>. Le mot-cle <code>with</code> est la bonne pratique, car il ferme automatiquement le fichier a la fin.',
            code: {
              filename: 'fichier.py',
              src: 'with open("notes.txt", "w", encoding="utf-8") as f:\n    f.write("Premier message\\n")\n\nwith open("notes.txt", "r", encoding="utf-8") as f:\n    contenu = f.read()\n\nprint(contenu)'
            }
          },
          {
            type: 'quiz',
            question: 'Pourquoi utilise-t-on with open(...) ?',
            options: ['Pour accelerer internet', 'Pour fermer le fichier proprement', 'Pour creer une boucle', 'Pour convertir en JSON'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact, with gere la fermeture du fichier.',
            errorMsg: 'with open(...) permet une gestion propre du fichier.'
          },
          {
            type: 'code-challenge',
            instructions: 'Ecris dans un fichier journal.txt le texte "Python progresse vite".',
            placeholder: 'with open("journal.txt", "w", encoding="utf-8") as f:\n    ',
            filename: 'journal.py',
            xp: 25,
            validator: (code: string) => /open\s*\(/.test(code) && /"w"/.test(code) && /write\s*\(/.test(code),
            hint: 'Utilise f.write("Python progresse vite")'
          }
        ]
      },
      {
        title: 'Exceptions et debogage',
        subtitle: 'Anticipe les erreurs et rends ton code plus solide',
        type: 'theory',
        time: '16 min',
        xp: 70,
        steps: [
          {
            type: 'theory',
            title: 'try except enfin',
            content: 'Les erreurs d\'execution s\'appellent des exceptions. Avec <code>try</code> et <code>except</code>, tu peux capturer un probleme pour afficher un message plus propre ou continuer le programme.',
            callout: {
              kind: 'info',
              icon: '🛠️',
              title: 'Deboguer calmement',
              text: 'Lis le message d erreur, repere la ligne indiquee, puis verifie les variables et les types avant de modifier le code.'
            },
            code: {
              filename: 'exceptions.py',
              src: 'try:\n    age = int(input("Ton age : "))\n    print(age)\nexcept ValueError:\n    print("Tu dois entrer un nombre entier.")'
            }
          },
          {
            type: 'quiz',
            question: 'Quel bloc capture une erreur ?',
            options: ['try', 'except', 'return', 'import'],
            correct: 1,
            xp: 15,
            successMsg: 'Oui, except capture l\'exception.',
            errorMsg: 'try teste, except attrape l\'erreur.'
          },
          {
            type: 'code-challenge',
            instructions: 'Entoure une division par un try/except pour gerer ZeroDivisionError.',
            placeholder: 'try:\n    print(10 / 0)\nexcept:\n    print("Erreur")\n',
            filename: 'safe_div.py',
            xp: 30,
            validator: (code: string) => /try:/.test(code) && /except\s+ZeroDivisionError|except:/.test(code),
            hint: 'Le nom de l erreur attendue est ZeroDivisionError.'
          }
        ]
      }
    ]
  },
  {
    icon: '🧩',
    title: 'Modules, POO et projet final',
    lessons: [
      {
        title: 'Importer des modules',
        subtitle: 'Reutilise du code deja ecrit par Python ou par toi',
        type: 'theory',
        time: '12 min',
        xp: 55,
        steps: [
          {
            type: 'theory',
            title: 'import et from',
            content: 'Les modules permettent d\'organiser et reutiliser du code. Tu peux importer un module standard comme <code>math</code> ou seulement certains elements avec <code>from ... import ...</code>.',
            code: {
              filename: 'modules.py',
              src: 'import math\nfrom random import randint\n\nprint(math.sqrt(16))\nprint(randint(1, 6))'
            }
          },
          {
            type: 'fill-blank',
            instructions: 'Complete cet import pour utiliser sqrt :',
            parts: [
              { type: 'text', value: 'from math import ' },
              { type: 'blank', placeholder: 'sqrt', correct: 'sqrt' }
            ],
            xp: 15
          },
          {
            type: 'quiz',
            question: 'Pourquoi creer plusieurs modules ?',
            options: ['Pour rendre le code plus desordonne', 'Pour mieux organiser le projet', 'Pour supprimer les fonctions', 'Pour remplacer Python'],
            correct: 1,
            xp: 15,
            successMsg: 'Exact, les modules aident a structurer le code.',
            errorMsg: 'Les modules servent surtout a organiser et separer les responsabilites.'
          }
        ]
      },
      {
        title: 'Introduction a la programmation orientee objet',
        subtitle: 'Cree des objets avec attributs et methodes',
        type: 'theory',
        time: '18 min',
        xp: 75,
        steps: [
          {
            type: 'theory',
            title: 'Classes et objets',
            content: 'Une <strong>classe</strong> sert de modele, et un <strong>objet</strong> est une instance concrete de cette classe. La methode <code>__init__</code> initialise les attributs, et <code>self</code> represente l\'objet courant.',
            code: {
              filename: 'poo.py',
              src: 'class Joueur:\n    def __init__(self, nom, niveau):\n        self.nom = nom\n        self.niveau = niveau\n\n    def saluer(self):\n        return f"{self.nom} est niveau {self.niveau}"\n\nj = Joueur("Nina", 3)\nprint(j.saluer())'
            }
          },
          {
            type: 'quiz',
            question: 'A quoi sert self dans une methode ?',
            options: ['A pointer l objet courant', 'A creer une boucle', 'A importer un module', 'A convertir en string'],
            correct: 0,
            xp: 15,
            successMsg: 'Oui, self represente l instance actuelle.',
            errorMsg: 'self donne acces aux attributs et methodes de l objet courant.'
          },
          {
            type: 'code-challenge',
            instructions: 'Cree une classe Livre avec un attribut titre et une methode decrire() qui retourne une phrase.',
            placeholder: 'class Livre:\n    def __init__(self, titre):\n        pass\n',
            filename: 'livre.py',
            xp: 35,
            validator: (code: string) => /class\s+Livre/.test(code) && /__init__/.test(code) && /self\.titre/.test(code) && /def\s+decrire/.test(code),
            hint: 'Stocke titre dans self.titre.'
          }
        ]
      },
      {
        title: 'Projet final Python',
        subtitle: 'Construis un programme complet qui combine tout le cours',
        type: 'project',
        time: '30 min',
        xp: 120,
        steps: [
          {
            type: 'project',
            title: 'Gestionnaire de taches en console',
            description: 'Cree un petit gestionnaire de taches permettant d ajouter, afficher et marquer des taches comme terminees. Utilise des fonctions, une liste de dictionnaires et une boucle principale.',
            filename: 'todo.py',
            starter: 'taches = []\n\ndef ajouter_tache(titre):\n    pass\n\ndef afficher_taches():\n    pass\n\ndef terminer_tache(index):\n    pass\n\n# Ajoute ici une boucle simple de demonstration\n',
            objectives: [
              'Ajouter une tache dans une liste',
              'Afficher les taches avec leur etat',
              'Pouvoir marquer une tache comme terminee',
              'Utiliser au moins une boucle et plusieurs fonctions'
            ],
            xp: 120,
            validator: (code: string) => /def\s+ajouter_tache/.test(code) && /def\s+afficher_taches/.test(code) && /def\s+terminer_tache/.test(code) && /\[\]/.test(code) && /for|while/.test(code)
          }
        ]
      }
    ]
  }
]
