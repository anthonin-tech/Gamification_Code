import type { IMission } from '@/types/missions'

export const MISSIONS: IMission[] = [
    // ─── Python mini-projets ───────────────────────────────────────────────
    {
        missionId: 10,
        missionTitre: "Calculatrice Python",
        taches: [
            { taskId: 35, taskTitre: "Créer les fonctions add, sub, mul, div" },
            { taskId: 36, taskTitre: "Lire l'opération avec input()" },
            { taskId: 37, taskTitre: "Afficher le résultat et gérer la division par zéro" }
        ],
        verification: [
            { taskId: 35, wordKey: 'def', expectedOutput: '' },
            { taskId: 36, wordKey: 'input', expectedOutput: '' },
            { taskId: 37, wordKey: 'ZeroDivisionError', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Commence par 4 fonctions simples : `def add(a, b): return a + b`, etc.", xpCout: 15 },
            { niveau: 2, texte: "Utilise `input()` pour lire deux nombres et l'opérateur voulu, puis convertis avec `float()`.", xpCout: 30 },
            { niveau: 3, texte: "Pour la division par zéro, entoure l'appel de `div` dans un `try/except ZeroDivisionError` et affiche un message d'erreur.", xpCout: 60 }
        ],
        xpRecompense: 400,
        difficulte: 'MOYEN',
        langage: 'python',
        description: 'Construis une calculatrice interactive en ligne de commande. Tu créeras une fonction par opération (add, sub, mul, div), liras les entrées avec input() et géreras la division par zéro avec try/except ZeroDivisionError.',
        image: '/missions/calculatrice.png',
        minLecons: 2
    },
    {
        missionId: 11,
        missionTitre: "Nombre mystère",
        taches: [
            { taskId: 38, taskTitre: "Générer un nombre aléatoire entre 1 et 100" },
            { taskId: 39, taskTitre: "Lire la proposition du joueur en boucle" },
            { taskId: 40, taskTitre: "Afficher 'trop grand', 'trop petit' ou 'gagné'" }
        ],
        verification: [
            { taskId: 38, wordKey: 'random', expectedOutput: '' },
            { taskId: 39, wordKey: 'while', expectedOutput: '' },
            { taskId: 40, wordKey: 'print', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Utilise `import random` puis `random.randint(1, 100)` pour générer le nombre secret.", xpCout: 15 },
            { niveau: 2, texte: "Une boucle `while True` lit chaque tentative avec `input()`, convertis en `int` et compare au nombre secret.", xpCout: 30 },
            { niveau: 3, texte: "Ajoute un compteur de tentatives et affiche le score final quand le joueur trouve le bon nombre.", xpCout: 60 }
        ],
        xpRecompense: 350,
        difficulte: 'FACILE',
        langage: 'python',
        description: 'Crée un jeu de devinette : l\'ordinateur tire un nombre entre 1 et 100, et le joueur doit le trouver. À chaque tentative, le jeu répond "trop grand", "trop petit" ou "gagné" et affiche le nombre de tentatives final.',
        image: '/missions/devine.png',
        minLecons: 2
    },
    {
        missionId: 12,
        missionTitre: "Gestionnaire de contacts",
        taches: [
            { taskId: 41, taskTitre: "Stocker les contacts dans un dictionnaire" },
            { taskId: 42, taskTitre: "Ajouter et supprimer un contact" },
            { taskId: 43, taskTitre: "Rechercher un contact par nom" }
        ],
        verification: [
            { taskId: 41, wordKey: 'dict', expectedOutput: '' },
            { taskId: 42, wordKey: 'def', expectedOutput: '' },
            { taskId: 43, wordKey: 'in', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Un dictionnaire `contacts = {}` où la clé est le nom et la valeur est le numéro de téléphone.", xpCout: 15 },
            { niveau: 2, texte: "Crée des fonctions `ajouter(nom, tel)` et `supprimer(nom)` qui modifient le dictionnaire.", xpCout: 30 },
            { niveau: 3, texte: "Pour la recherche, parcours les clés avec `for nom in contacts` et vérifie si la chaîne de recherche est `in nom`.", xpCout: 60 }
        ],
        xpRecompense: 380,
        difficulte: 'MOYEN',
        langage: 'python',
        description: 'Développe un gestionnaire de contacts en mémoire. Tu stockeras les contacts dans un dictionnaire (nom → numéro), implémenteras les fonctions ajouter, supprimer et rechercher par nom, et afficheras la liste complète.',
        image: '/missions/contacts.png',
        minLecons: 3
    },
    {
        missionId: 13,
        missionTitre: "Convertisseur de températures",
        taches: [
            { taskId: 44, taskTitre: "Créer les fonctions celsius_to_fahrenheit et inverse" },
            { taskId: 45, taskTitre: "Ajouter la conversion vers Kelvin" },
            { taskId: 46, taskTitre: "Proposer un menu interactif à l'utilisateur" }
        ],
        verification: [
            { taskId: 44, wordKey: 'def celsius', expectedOutput: '' },
            { taskId: 45, wordKey: 'kelvin', expectedOutput: '' },
            { taskId: 46, wordKey: 'input', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Formule : Fahrenheit = Celsius × 9/5 + 32. Kelvin = Celsius + 273.15.", xpCout: 15 },
            { niveau: 2, texte: "Crée une fonction par conversion (6 en tout : C→F, F→C, C→K, K→C, F→K, K→F).", xpCout: 30 },
            { niveau: 3, texte: "Affiche un menu `1. C→F  2. F→C  3. C→K ...` et appelle la bonne fonction selon le choix.", xpCout: 60 }
        ],
        xpRecompense: 360,
        difficulte: 'FACILE',
        langage: 'python',
        description: 'Construis un convertisseur de températures complet entre Celsius, Fahrenheit et Kelvin. Tu créeras une fonction par conversion avec les bonnes formules et proposeras un menu interactif permettant à l\'utilisateur de choisir sa conversion.',
        image: '/missions/temperature.png',
        minLecons: 2
    },
    {
        missionId: 14,
        missionTitre: "Analyseur de texte",
        taches: [
            { taskId: 47, taskTitre: "Compter le nombre de mots et de caractères" },
            { taskId: 48, taskTitre: "Trouver le mot le plus fréquent" },
            { taskId: 49, taskTitre: "Afficher les 5 mots les plus utilisés" }
        ],
        verification: [
            { taskId: 47, wordKey: 'len', expectedOutput: '' },
            { taskId: 48, wordKey: 'max', expectedOutput: '' },
            { taskId: 49, wordKey: 'sorted', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`len(texte.split())` donne le nombre de mots, `len(texte)` le nombre de caractères.", xpCout: 15 },
            { niveau: 2, texte: "Utilise un dictionnaire pour compter chaque mot, puis `max(freq, key=freq.get)` pour le plus fréquent.", xpCout: 35 },
            { niveau: 3, texte: "`sorted(freq.items(), key=lambda x: x[1], reverse=True)[:5]` retourne les 5 mots les plus fréquents.", xpCout: 60 }
        ],
        xpRecompense: 420,
        difficulte: 'MOYEN',
        langage: 'python',
        description: 'Analyse statistiquement un texte saisi par l\'utilisateur : compte le nombre de mots et caractères, identifie le mot le plus fréquent grâce à un dictionnaire de fréquences, et affiche le top 5 des mots les plus utilisés.',
        image: '/missions/texte.png',
        minLecons: 3
    },
    {
        missionId: 15,
        missionTitre: "Pierre-Feuille-Ciseaux",
        taches: [
            { taskId: 50, taskTitre: "Générer le choix aléatoire de l'ordinateur" },
            { taskId: 51, taskTitre: "Comparer les choix et déterminer le gagnant" },
            { taskId: 52, taskTitre: "Jouer plusieurs manches et afficher le score" }
        ],
        verification: [
            { taskId: 50, wordKey: 'random.choice', expectedOutput: '' },
            { taskId: 51, wordKey: 'if', expectedOutput: '' },
            { taskId: 52, wordKey: 'score', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`random.choice(['pierre', 'feuille', 'ciseaux'])` génère le choix de l'ordi.", xpCout: 15 },
            { niveau: 2, texte: "Liste toutes les combinaisons gagnantes dans un tuple ou utilise une logique `if/elif`.", xpCout: 30 },
            { niveau: 3, texte: "Une boucle `while` demande 'Rejouer ? (o/n)' et cumule les scores dans deux variables.", xpCout: 60 }
        ],
        xpRecompense: 370,
        difficulte: 'FACILE',
        langage: 'python',
        description: 'Développe le jeu Pierre-Feuille-Ciseaux en joueur contre ordinateur. L\'ordi tire son choix aléatoirement avec random.choice(), le programme détermine le gagnant de chaque manche et cumule les scores sur plusieurs parties.',
        image: '/missions/jeu.png',
        minLecons: 2
    },
    {
        missionId: 16,
        missionTitre: "Gestionnaire de tâches CLI",
        taches: [
            { taskId: 53, taskTitre: "Ajouter et lister des tâches" },
            { taskId: 54, taskTitre: "Marquer une tâche comme terminée" },
            { taskId: 55, taskTitre: "Sauvegarder et charger depuis un fichier JSON" }
        ],
        verification: [
            { taskId: 53, wordKey: 'append', expectedOutput: '' },
            { taskId: 54, wordKey: 'done', expectedOutput: '' },
            { taskId: 55, wordKey: 'json', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Chaque tâche est un dict `{'titre': ..., 'done': False}`. Stocke-les dans une liste.", xpCout: 15 },
            { niveau: 2, texte: "Pour marquer comme terminée, cherche la tâche par son index et mets `tache['done'] = True`.", xpCout: 35 },
            { niveau: 3, texte: "`import json` — `json.dump(taches, f)` pour sauvegarder, `json.load(f)` pour charger.", xpCout: 60 }
        ],
        xpRecompense: 450,
        difficulte: 'MOYEN',
        langage: 'python',
        description: 'Crée un gestionnaire de tâches en ligne de commande. Tu pourras ajouter des tâches, les lister, les marquer comme terminées, et les données seront sauvegardées dans un fichier JSON grâce au module json de Python.',
        image: '/missions/tasks.png',
        minLecons: 3
    },
    {
        missionId: 17,
        missionTitre: "Générateur de mots de passe",
        taches: [
            { taskId: 56, taskTitre: "Générer un mot de passe aléatoire d'une longueur donnée" },
            { taskId: 57, taskTitre: "Permettre de choisir les types de caractères inclus" },
            { taskId: 58, taskTitre: "Évaluer la force du mot de passe" }
        ],
        verification: [
            { taskId: 56, wordKey: 'random', expectedOutput: '' },
            { taskId: 57, wordKey: 'string', expectedOutput: '' },
            { taskId: 58, wordKey: 'len', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`import string` donne `string.ascii_letters`, `string.digits`, `string.punctuation`.", xpCout: 15 },
            { niveau: 2, texte: "Construis un pool de caractères selon les options choisies, puis utilise `random.choices(pool, k=longueur)`.", xpCout: 35 },
            { niveau: 3, texte: "La force dépend de la longueur et des types présents (maj, chiffres, symboles). Attribue un score et affiche 'faible', 'moyen', 'fort'.", xpCout: 60 }
        ],
        xpRecompense: 430,
        difficulte: 'MOYEN',
        langage: 'python',
        description: 'Construis un générateur de mots de passe configurable : l\'utilisateur choisit la longueur et les types de caractères inclus (lettres, chiffres, symboles). Le programme génère le mot de passe et évalue sa force (faible, moyen, fort).',
        image: '/missions/password.png',
        minLecons: 3
    },
    {
        missionId: 18,
        missionTitre: "Compte bancaire",
        taches: [
            { taskId: 59, taskTitre: "Créer une classe CompteBancaire" },
            { taskId: 60, taskTitre: "Implémenter déposer() et retirer()" },
            { taskId: 61, taskTitre: "Afficher l'historique des transactions" }
        ],
        verification: [
            { taskId: 59, wordKey: 'class', expectedOutput: '' },
            { taskId: 60, wordKey: 'def retirer', expectedOutput: '' },
            { taskId: 61, wordKey: 'historique', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Crée une classe avec `__init__(self, titulaire, solde=0)` et un attribut `self.historique = []`.", xpCout: 15 },
            { niveau: 2, texte: "`retirer` doit vérifier que le solde est suffisant avant de soustraire, sinon lever une exception.", xpCout: 35 },
            { niveau: 3, texte: "Chaque opération ajoute un dict `{'type': 'dépôt', 'montant': x, 'solde': y}` à `self.historique`.", xpCout: 60 }
        ],
        xpRecompense: 480,
        difficulte: 'MOYEN',
        langage: 'python',
        description: 'Modélise un compte bancaire en programmation orientée objet. Ta classe CompteBancaire gérera les dépôts, vérifiera que le solde est suffisant avant chaque retrait, et conservera un historique complet de toutes les transactions.',
        image: '/missions/bank.png',
        minLecons: 4
    },
    {
        missionId: 19,
        missionTitre: "Mini carnet d'adresses",
        taches: [
            { taskId: 62, taskTitre: "Créer une classe Contact avec nom, email, téléphone" },
            { taskId: 63, taskTitre: "Stocker et rechercher des contacts" },
            { taskId: 64, taskTitre: "Exporter les contacts en CSV" }
        ],
        verification: [
            { taskId: 62, wordKey: 'class Contact', expectedOutput: '' },
            { taskId: 63, wordKey: 'def rechercher', expectedOutput: '' },
            { taskId: 64, wordKey: 'csv', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Définit `class Contact` avec `__init__(self, nom, email, tel)` et une méthode `__str__`.", xpCout: 15 },
            { niveau: 2, texte: "La recherche compare la chaîne cherchée aux attributs `nom` et `email` de chaque contact.", xpCout: 35 },
            { niveau: 3, texte: "`import csv` — `csv.writer(f)` puis `writer.writerow([c.nom, c.email, c.tel])` pour exporter.", xpCout: 60 }
        ],
        xpRecompense: 500,
        difficulte: 'MOYEN',
        langage: 'python',
        description: 'Développe un carnet d\'adresses orienté objet. Ta classe Contact encapsule nom, email et téléphone. Tu implémenteras la recherche multicritère et une fonction d\'export qui génère un fichier CSV lisible depuis n\'importe quel tableur.',
        image: '/missions/carnet.png',
        minLecons: 4
    },

    // ─── JavaScript mini-projets ───────────────────────────────────────────
    {
        missionId: 20,
        missionTitre: "Calculatrice JavaScript",
        taches: [
            { taskId: 65, taskTitre: "Créer les 4 fonctions de calcul" },
            { taskId: 66, taskTitre: "Lire les opérandes avec prompt()" },
            { taskId: 67, taskTitre: "Afficher le résultat et gérer les erreurs" }
        ],
        verification: [
            { taskId: 65, wordKey: 'function', expectedOutput: '' },
            { taskId: 66, wordKey: 'parseFloat', expectedOutput: '' },
            { taskId: 67, wordKey: 'console.log', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Déclare `function add(a, b)`, `sub`, `mul`, `div` qui retournent le résultat.", xpCout: 15 },
            { niveau: 2, texte: "`parseFloat(prompt('Nombre :'))` lit et convertit l'entrée utilisateur.", xpCout: 30 },
            { niveau: 3, texte: "Vérifie `if (b === 0)` avant la division et throw une Error ou retourne un message d'erreur.", xpCout: 60 }
        ],
        xpRecompense: 380,
        difficulte: 'FACILE',
        langage: 'javascript',
        description: 'Crée une calculatrice JavaScript fonctionnelle. Tu déclareras une fonction par opération, liras les opérandes avec parseFloat(prompt()), et géreras les cas d\'erreur comme la division par zéro pour rendre le programme robuste.',
        image: '/missions/calculatrice.png',
        minLecons: 2
    },
    {
        missionId: 21,
        missionTitre: "Jeu du pendu",
        taches: [
            { taskId: 68, taskTitre: "Stocker le mot secret et les lettres trouvées" },
            { taskId: 69, taskTitre: "Afficher le mot masqué et révéler les lettres correctes" },
            { taskId: 70, taskTitre: "Gérer le compteur de vies et la fin de partie" }
        ],
        verification: [
            { taskId: 68, wordKey: 'const', expectedOutput: '' },
            { taskId: 69, wordKey: '.map(', expectedOutput: '' },
            { taskId: 70, wordKey: 'vies', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Stocke le mot en tableau de lettres et un Set `lettresTrouvees`. Affiche `_` pour les lettres inconnues.", xpCout: 15 },
            { niveau: 2, texte: "`mot.split('').map(l => lettresTrouvees.has(l) ? l : '_').join(' ')` affiche le mot masqué.", xpCout: 35 },
            { niveau: 3, texte: "Décrémente `vies` à chaque mauvaise lettre. Si `vies === 0` → perdu. Si plus de `_` → gagné.", xpCout: 60 }
        ],
        xpRecompense: 420,
        difficulte: 'MOYEN',
        langage: 'javascript',
        description: 'Implémente le jeu du pendu en JavaScript. Le mot secret est affiché avec des underscores, le joueur propose des lettres une à une, chaque mauvaise lettre enlève une vie, et le jeu se termine à 0 vie ou quand le mot est entièrement découvert.',
        image: '/missions/pendu.png',
        minLecons: 3
    },
    {
        missionId: 22,
        missionTitre: "Liste de tâches",
        taches: [
            { taskId: 71, taskTitre: "Ajouter et supprimer des tâches dans un tableau" },
            { taskId: 72, taskTitre: "Marquer une tâche comme complétée" },
            { taskId: 73, taskTitre: "Filtrer par statut (toutes, actives, terminées)" }
        ],
        verification: [
            { taskId: 71, wordKey: '.push(', expectedOutput: '' },
            { taskId: 72, wordKey: 'completed', expectedOutput: '' },
            { taskId: 73, wordKey: '.filter(', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Chaque tâche est un objet `{ id, texte, completed: false }`. `push` pour ajouter, `filter` pour supprimer.", xpCout: 15 },
            { niveau: 2, texte: "Pour toggle : `taches = taches.map(t => t.id === id ? {...t, completed: !t.completed} : t)`.", xpCout: 35 },
            { niveau: 3, texte: "Crée une fonction `filtrer(statut)` qui retourne `all/active/completed` selon le filtre choisi.", xpCout: 60 }
        ],
        xpRecompense: 400,
        difficulte: 'MOYEN',
        langage: 'javascript',
        description: 'Développe une application de gestion de tâches. Tu pourras ajouter des tâches, les supprimer, les marquer comme complétées, et filtrer l\'affichage selon leur statut (toutes, actives, terminées) grâce aux méthodes push, filter et map.',
        image: '/missions/tasks.png',
        minLecons: 3
    },
    {
        missionId: 23,
        missionTitre: "Convertisseur de devises",
        taches: [
            { taskId: 74, taskTitre: "Stocker les taux de change dans un objet" },
            { taskId: 75, taskTitre: "Créer la fonction de conversion" },
            { taskId: 76, taskTitre: "Lister toutes les conversions disponibles" }
        ],
        verification: [
            { taskId: 74, wordKey: 'const taux', expectedOutput: '' },
            { taskId: 75, wordKey: 'function convertir', expectedOutput: '' },
            { taskId: 76, wordKey: 'Object.keys', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`const taux = { EUR: 1, USD: 1.08, GBP: 0.86 }` — tout en base EUR.", xpCout: 15 },
            { niveau: 2, texte: "`convertir(montant, de, vers)` : `return (montant / taux[de]) * taux[vers]`.", xpCout: 30 },
            { niveau: 3, texte: "`Object.keys(taux)` liste toutes les devises disponibles pour les afficher à l'utilisateur.", xpCout: 60 }
        ],
        xpRecompense: 390,
        difficulte: 'FACILE',
        langage: 'javascript',
        description: 'Construis un convertisseur de devises. Les taux de change sont stockés dans un objet JavaScript indexé par devise, la fonction de conversion calcule le résultat via l\'unité de base EUR, et le programme liste toutes les conversions disponibles.',
        image: '/missions/devises.png',
        minLecons: 2
    },
    {
        missionId: 24,
        missionTitre: "Gestionnaire de notes",
        taches: [
            { taskId: 77, taskTitre: "Créer, lire et supprimer des notes" },
            { taskId: 78, taskTitre: "Calculer la moyenne des notes numériques" },
            { taskId: 79, taskTitre: "Trier les notes par date ou par titre" }
        ],
        verification: [
            { taskId: 77, wordKey: 'function creer', expectedOutput: '' },
            { taskId: 78, wordKey: 'reduce', expectedOutput: '' },
            { taskId: 79, wordKey: '.sort(', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Chaque note est `{ id, titre, contenu, date: new Date().toISOString() }`.", xpCout: 15 },
            { niveau: 2, texte: "`notes.reduce((sum, n) => sum + n.valeur, 0) / notes.length` calcule la moyenne.", xpCout: 35 },
            { niveau: 3, texte: "`.sort((a, b) => new Date(a.date) - new Date(b.date))` trie par date croissante.", xpCout: 60 }
        ],
        xpRecompense: 430,
        difficulte: 'MOYEN',
        langage: 'javascript',
        description: 'Crée un gestionnaire de notes complet. Tu créeras, liras et supprimeras des notes identifiées par un ID unique. La moyenne des valeurs numériques est calculée avec reduce(), et les notes sont triables par date ou par titre.',
        image: '/missions/notes.png',
        minLecons: 3
    },
    {
        missionId: 25,
        missionTitre: "Quiz interactif",
        taches: [
            { taskId: 80, taskTitre: "Stocker les questions avec leurs réponses dans un tableau" },
            { taskId: 81, taskTitre: "Poser chaque question et évaluer la réponse" },
            { taskId: 82, taskTitre: "Afficher le score final et les bonnes réponses" }
        ],
        verification: [
            { taskId: 80, wordKey: 'const questions', expectedOutput: '' },
            { taskId: 81, wordKey: 'for', expectedOutput: '' },
            { taskId: 82, wordKey: 'score', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`const questions = [{ texte: '...', reponse: '...' }]` — tableau d'objets question/réponse.", xpCout: 15 },
            { niveau: 2, texte: "Parcours le tableau avec `for...of`, lis la réponse et compare (insensible à la casse avec `.toLowerCase()`).", xpCout: 30 },
            { niveau: 3, texte: "Stocke les mauvaises réponses pour les ré-afficher à la fin avec la bonne réponse.", xpCout: 60 }
        ],
        xpRecompense: 400,
        difficulte: 'FACILE',
        langage: 'javascript',
        description: 'Développe un quiz interactif. Les questions et réponses correctes sont stockées dans un tableau d\'objets, les réponses du joueur sont évaluées en ignorant la casse, et un récapitulatif final affiche le score et les corrections.',
        image: '/missions/quiz.png',
        minLecons: 2
    },
    {
        missionId: 26,
        missionTitre: "Validateur de formulaire",
        taches: [
            { taskId: 83, taskTitre: "Valider un email avec une regex" },
            { taskId: 84, taskTitre: "Valider un mot de passe (longueur, majuscule, chiffre)" },
            { taskId: 85, taskTitre: "Retourner un tableau de messages d'erreur" }
        ],
        verification: [
            { taskId: 83, wordKey: 'regex', expectedOutput: '' },
            { taskId: 84, wordKey: 'test(', expectedOutput: '' },
            { taskId: 85, wordKey: 'erreurs', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)` valide la structure d'un email.", xpCout: 15 },
            { niveau: 2, texte: "Vérifie la longueur, `/[A-Z]/.test(mdp)` pour la majuscule, `/[0-9]/.test(mdp)` pour le chiffre.", xpCout: 35 },
            { niveau: 3, texte: "Crée `function valider(email, mdp)` qui retourne `[]` si tout est valide ou un tableau de strings d'erreur.", xpCout: 60 }
        ],
        xpRecompense: 450,
        difficulte: 'MOYEN',
        langage: 'javascript',
        description: 'Crée un validateur de formulaire réutilisable. Tu valideras la structure d\'un email avec une regex, vérifieras que le mot de passe respecte les critères de sécurité (longueur minimale, majuscule, chiffre), et retourneras un tableau de messages d\'erreur précis.',
        image: '/missions/validation.png',
        minLecons: 4
    },
    {
        missionId: 27,
        missionTitre: "Panier d'achat",
        taches: [
            { taskId: 86, taskTitre: "Ajouter et retirer des articles du panier" },
            { taskId: 87, taskTitre: "Calculer le total avec les quantités" },
            { taskId: 88, taskTitre: "Appliquer un code promo en pourcentage" }
        ],
        verification: [
            { taskId: 86, wordKey: 'function ajouter', expectedOutput: '' },
            { taskId: 87, wordKey: 'reduce', expectedOutput: '' },
            { taskId: 88, wordKey: 'promo', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Chaque article est `{ nom, prix, quantite }`. Si l'article existe déjà, incrémente la quantité.", xpCout: 15 },
            { niveau: 2, texte: "`panier.reduce((total, art) => total + art.prix * art.quantite, 0)` calcule le total.", xpCout: 35 },
            { niveau: 3, texte: "`const apresPromo = total * (1 - remise / 100)` applique la remise en pourcentage.", xpCout: 60 }
        ],
        xpRecompense: 460,
        difficulte: 'MOYEN',
        langage: 'javascript',
        description: 'Simule un panier d\'achat e-commerce. Tu ajouteras des articles avec leur quantité (incrémentée si déjà présent), calculeras le total avec reduce(), et appliqueras des codes de réduction en pourcentage sur le montant final.',
        image: '/missions/panier.png',
        minLecons: 4
    },
    {
        missionId: 28,
        missionTitre: "Jeu de dés",
        taches: [
            { taskId: 89, taskTitre: "Simuler le lancer de N dés à X faces" },
            { taskId: 90, taskTitre: "Calculer la somme, min et max" },
            { taskId: 91, taskTitre: "Afficher l'historique des lancers" }
        ],
        verification: [
            { taskId: 89, wordKey: 'Math.random', expectedOutput: '' },
            { taskId: 90, wordKey: 'Math.max', expectedOutput: '' },
            { taskId: 91, wordKey: 'historique', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`Math.floor(Math.random() * faces) + 1` simule un dé à `faces` faces.", xpCout: 15 },
            { niveau: 2, texte: "`Math.max(...des)` et `Math.min(...des)` pour le max et min. `des.reduce((a,b)=>a+b,0)` pour la somme.", xpCout: 30 },
            { niveau: 3, texte: "Stocke chaque lancer dans un tableau `historique` avec la date et affiche les N derniers.", xpCout: 60 }
        ],
        xpRecompense: 360,
        difficulte: 'FACILE',
        langage: 'javascript',
        description: 'Simule des lancers de dés entièrement paramétrables : tu choisis le nombre de dés et le nombre de faces. Le programme calcule la somme, le maximum et le minimum des résultats, et conserve un historique horodaté des parties.',
        image: '/missions/des.png',
        minLecons: 2
    },
    {
        missionId: 29,
        missionTitre: "Mini galerie de films",
        taches: [
            { taskId: 92, taskTitre: "Stocker une liste de films avec titre, année, note" },
            { taskId: 93, taskTitre: "Rechercher un film par titre" },
            { taskId: 94, taskTitre: "Trier par note et filtrer par année" }
        ],
        verification: [
            { taskId: 92, wordKey: 'const films', expectedOutput: '' },
            { taskId: 93, wordKey: '.includes(', expectedOutput: '' },
            { taskId: 94, wordKey: '.sort(', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Crée un tableau `const films = [{ titre, annee, note }]` avec au moins 5 films.", xpCout: 15 },
            { niveau: 2, texte: "`.filter(f => f.titre.toLowerCase().includes(recherche.toLowerCase()))` pour la recherche.", xpCout: 30 },
            { niveau: 3, texte: "`.sort((a,b) => b.note - a.note)` trie par note décroissante. Chaîne avec `.filter` pour filtrer par année.", xpCout: 60 }
        ],
        xpRecompense: 410,
        difficulte: 'MOYEN',
        langage: 'javascript',
        description: 'Crée une galerie de films avec un tableau d\'objets (titre, année, note). Tu implémenteras une recherche insensible à la casse avec includes(), un tri par note décroissante avec sort(), et un filtre par année pour retrouver rapidement un film.',
        image: '/missions/films.png',
        minLecons: 3
    },

    // ─── TypeScript mini-projets ───────────────────────────────────────────
    {
        missionId: 30,
        missionTitre: "Calculatrice typée",
        taches: [
            { taskId: 95, taskTitre: "Typer les paramètres et le retour des fonctions" },
            { taskId: 96, taskTitre: "Créer un type union Operateur" },
            { taskId: 97, taskTitre: "Implémenter une fonction calculer(a, op, b)" }
        ],
        verification: [
            { taskId: 95, wordKey: ': number', expectedOutput: '' },
            { taskId: 96, wordKey: 'type Operateur', expectedOutput: '' },
            { taskId: 97, wordKey: 'function calculer', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Annote chaque paramètre : `function add(a: number, b: number): number`.", xpCout: 15 },
            { niveau: 2, texte: "`type Operateur = '+' | '-' | '*' | '/'` crée un type union des 4 opérateurs.", xpCout: 30 },
            { niveau: 3, texte: "`calculer(a: number, op: Operateur, b: number): number` avec un `switch(op)` sur l'opérateur.", xpCout: 60 }
        ],
        xpRecompense: 420,
        difficulte: 'MOYEN',
        langage: 'typescript',
        description: 'Recrée la calculatrice en TypeScript avec un système de types rigoureux. Tu annoteras chaque paramètre et valeur de retour avec number, créeras un type union Operateur pour les 4 symboles, et implémenteras une fonction calculer() basée sur un switch.',
        image: '/missions/calculatrice.png',
        minLecons: 2
    },
    {
        missionId: 31,
        missionTitre: "Gestionnaire d'inventaire",
        taches: [
            { taskId: 98, taskTitre: "Définir une interface Produit" },
            { taskId: 99, taskTitre: "Créer les fonctions CRUD typées" },
            { taskId: 100, taskTitre: "Rechercher et filtrer avec des types précis" }
        ],
        verification: [
            { taskId: 98, wordKey: 'interface Produit', expectedOutput: '' },
            { taskId: 99, wordKey: 'function ajouter', expectedOutput: '' },
            { taskId: 100, wordKey: 'Produit[]', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`interface Produit { id: number; nom: string; prix: number; stock: number }`.", xpCout: 15 },
            { niveau: 2, texte: "Les fonctions retournent `Produit`, `Produit[]` ou `void` selon leur rôle.", xpCout: 35 },
            { niveau: 3, texte: "`function rechercher(terme: string): Produit[]` filtre par nom ou id.", xpCout: 60 }
        ],
        xpRecompense: 450,
        difficulte: 'MOYEN',
        langage: 'typescript',
        description: 'Gère un inventaire de produits en exploitant les interfaces TypeScript. Tu définiras l\'interface Produit avec tous ses champs typés, et chaque fonction CRUD (ajout, suppression, mise à jour, recherche) retournera un type précis (Produit, Produit[] ou void).',
        image: '/missions/inventaire.png',
        minLecons: 3
    },
    {
        missionId: 32,
        missionTitre: "Système de réservation",
        taches: [
            { taskId: 101, taskTitre: "Modéliser Salle et Reservation avec des interfaces" },
            { taskId: 102, taskTitre: "Vérifier les conflits de réservation" },
            { taskId: 103, taskTitre: "Lister les réservations d'une salle" }
        ],
        verification: [
            { taskId: 101, wordKey: 'interface Salle', expectedOutput: '' },
            { taskId: 102, wordKey: 'conflit', expectedOutput: '' },
            { taskId: 103, wordKey: '.filter(', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`interface Reservation { salleId: number; debut: Date; fin: Date; utilisateur: string }`.", xpCout: 15 },
            { niveau: 2, texte: "Il y a conflit si `r.debut < fin && r.fin > debut` — les plages se chevauchent.", xpCout: 40 },
            { niveau: 3, texte: "`reservations.filter(r => r.salleId === id)` retourne toutes les résa d'une salle.", xpCout: 60 }
        ],
        xpRecompense: 500,
        difficulte: 'DIFFICILE',
        langage: 'typescript',
        description: 'Crée un système de réservation de salles. Tu modéliseras Salle et Reservation avec des interfaces TypeScript, implémenteras la détection de chevauchement de plages horaires (deux réservations se chevauchent si l\'une commence avant la fin de l\'autre), et géreras la liste des réservations par salle.',
        image: '/missions/reservation.png',
        minLecons: 4
    },
    {
        missionId: 33,
        missionTitre: "Application de notes typée",
        taches: [
            { taskId: 104, taskTitre: "Créer l'interface Note avec id, titre, contenu, date" },
            { taskId: 105, taskTitre: "Implémenter CRUD avec des types précis" },
            { taskId: 106, taskTitre: "Trier et filtrer avec des fonctions génériques" }
        ],
        verification: [
            { taskId: 104, wordKey: 'interface Note', expectedOutput: '' },
            { taskId: 105, wordKey: 'Partial<Note>', expectedOutput: '' },
            { taskId: 106, wordKey: 'function trier', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`interface Note { id: number; titre: string; contenu: string; date: Date }`.", xpCout: 15 },
            { niveau: 2, texte: "`function mettreAJour(id: number, maj: Partial<Note>): Note` utilise `Partial` pour les mises à jour.", xpCout: 35 },
            { niveau: 3, texte: "Une fonction générique `trier<T, K extends keyof T>(arr: T[], cle: K)` peut trier n'importe quel tableau.", xpCout: 65 }
        ],
        xpRecompense: 520,
        difficulte: 'DIFFICILE',
        langage: 'typescript',
        description: 'Développe une application de notes en exploitant les types utilitaires TypeScript. La mise à jour partielle utilise Partial<Note> pour n\'avoir qu\'à passer les champs modifiés, et une fonction de tri générique accepte n\'importe quelle clé de l\'interface grâce à keyof.',
        image: '/missions/notes.png',
        minLecons: 4
    },
    {
        missionId: 34,
        missionTitre: "Convertisseur générique",
        taches: [
            { taskId: 107, taskTitre: "Créer une fonction générique de conversion" },
            { taskId: 108, taskTitre: "Typer les unités avec des enums" },
            { taskId: 109, taskTitre: "Ajouter des contraintes de type sur les generics" }
        ],
        verification: [
            { taskId: 107, wordKey: 'function convertir<T>', expectedOutput: '' },
            { taskId: 108, wordKey: 'enum', expectedOutput: '' },
            { taskId: 109, wordKey: 'extends', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`function convertir<T>(valeur: T, taux: number): number` — generic simple.", xpCout: 15 },
            { niveau: 2, texte: "`enum Unite { KG = 'kg', LB = 'lb', ... }` pour typer les unités et éviter les typos.", xpCout: 35 },
            { niveau: 3, texte: "`<T extends { valeur: number }>` contraint T à avoir une propriété `valeur` de type number.", xpCout: 65 }
        ],
        xpRecompense: 540,
        difficulte: 'DIFFICILE',
        langage: 'typescript',
        description: 'Explore les generics TypeScript pour bâtir un convertisseur d\'unités flexible. Tu créeras une fonction générique paramétrable, typeras les unités avec des enums pour éviter les erreurs de saisie, et ajouteras des contraintes extends pour restreindre les types acceptés.',
        image: '/missions/convertisseur.png',
        minLecons: 5
    },
    {
        missionId: 35,
        missionTitre: "Gestionnaire de budget",
        taches: [
            { taskId: 110, taskTitre: "Modéliser Transaction avec un type union de catégories" },
            { taskId: 111, taskTitre: "Calculer le solde et dépenses par catégorie" },
            { taskId: 112, taskTitre: "Alerter quand le budget est dépassé" }
        ],
        verification: [
            { taskId: 110, wordKey: 'type Categorie', expectedOutput: '' },
            { taskId: 111, wordKey: 'Record<', expectedOutput: '' },
            { taskId: 112, wordKey: 'alerte', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`type Categorie = 'logement' | 'transport' | 'alimentation' | 'loisirs'`.", xpCout: 15 },
            { niveau: 2, texte: "`Record<Categorie, number>` crée un objet dont les clés sont les catégories et les valeurs des totaux.", xpCout: 35 },
            { niveau: 3, texte: "Compare le total de chaque catégorie à un budget max défini dans un `Record<Categorie, number>` de limites.", xpCout: 65 }
        ],
        xpRecompense: 490,
        difficulte: 'MOYEN',
        langage: 'typescript',
        description: 'Gère un budget personnel catégorisé. Tu utiliseras un type union pour les catégories de dépenses, un Record<Categorie, number> pour stocker les totaux et les limites par catégorie, et un système d\'alertes qui signale les dépassements.',
        image: '/missions/budget.png',
        minLecons: 4
    },
    {
        missionId: 36,
        missionTitre: "Bibliothèque générique",
        taches: [
            { taskId: 113, taskTitre: "Créer une classe générique Collection<T>" },
            { taskId: 114, taskTitre: "Implémenter add, remove, find" },
            { taskId: 115, taskTitre: "Utiliser la collection avec des Livres et des Auteurs" }
        ],
        verification: [
            { taskId: 113, wordKey: 'class Collection<T>', expectedOutput: '' },
            { taskId: 114, wordKey: 'find(', expectedOutput: '' },
            { taskId: 115, wordKey: 'interface Livre', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`class Collection<T> { private items: T[] = [] }` — la classe stocke n'importe quel type.", xpCout: 15 },
            { niveau: 2, texte: "`find(predicate: (item: T) => boolean): T | undefined` — prend un callback de test.", xpCout: 40 },
            { niveau: 3, texte: "Déclare `interface Livre { titre: string; isbn: string }`, puis crée `new Collection<Livre>()`.", xpCout: 60 }
        ],
        xpRecompense: 530,
        difficulte: 'DIFFICILE',
        langage: 'typescript',
        description: 'Crée une classe générique Collection<T> capable de gérer n\'importe quel type de données. Tu implémenteras add, remove et une méthode find() qui prend un prédicat typé. Tu l\'utiliseras concrètement avec des interfaces Livre et Auteur.',
        image: '/missions/bibliotheque.png',
        minLecons: 5
    },
    {
        missionId: 37,
        missionTitre: "Validateur de données",
        taches: [
            { taskId: 116, taskTitre: "Créer des fonctions de validation typées" },
            { taskId: 117, taskTitre: "Combiner les validateurs avec un type Result" },
            { taskId: 118, taskTitre: "Valider un objet complet et retourner les erreurs" }
        ],
        verification: [
            { taskId: 116, wordKey: 'type ValidationResult', expectedOutput: '' },
            { taskId: 117, wordKey: 'ok:', expectedOutput: '' },
            { taskId: 118, wordKey: 'erreurs:', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`type ValidationResult = { ok: true } | { ok: false; message: string }` — type discriminant.", xpCout: 20 },
            { niveau: 2, texte: "Chaque validateur retourne `ValidationResult`. Combine-les avec `&&` sur `ok`.", xpCout: 40 },
            { niveau: 3, texte: "Crée `function validerUser(u: unknown)` qui teste chaque champ et retourne `{ ok, erreurs: string[] }`.", xpCout: 65 }
        ],
        xpRecompense: 550,
        difficulte: 'DIFFICILE',
        langage: 'typescript',
        description: 'Construis un système de validation robuste avec le pattern Result. Chaque validateur retourne un type discriminant { ok: true } | { ok: false; message: string }, et la fonction principale accumule tous les messages d\'erreur pour valider un objet complet.',
        image: '/missions/validation.png',
        minLecons: 5
    },
    {
        missionId: 38,
        missionTitre: "Système de logging",
        taches: [
            { taskId: 119, taskTitre: "Créer un enum LogLevel (DEBUG, INFO, WARN, ERROR)" },
            { taskId: 120, taskTitre: "Implémenter une classe Logger typée" },
            { taskId: 121, taskTitre: "Filtrer les logs par niveau minimum" }
        ],
        verification: [
            { taskId: 119, wordKey: 'enum LogLevel', expectedOutput: '' },
            { taskId: 120, wordKey: 'class Logger', expectedOutput: '' },
            { taskId: 121, wordKey: 'niveauMin', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`enum LogLevel { DEBUG = 0, INFO = 1, WARN = 2, ERROR = 3 }` — valeurs numériques pour la comparaison.", xpCout: 15 },
            { niveau: 2, texte: "`class Logger { log(niveau: LogLevel, message: string): void { ... } }`.", xpCout: 35 },
            { niveau: 3, texte: "`if (niveau >= this.niveauMin)` filtre les messages sous le niveau minimum configuré.", xpCout: 60 }
        ],
        xpRecompense: 460,
        difficulte: 'MOYEN',
        langage: 'typescript',
        description: 'Développe un système de logging configurable. L\'enum LogLevel (DEBUG=0, INFO=1, WARN=2, ERROR=3) porte des valeurs numériques pour la comparaison, et la classe Logger ne laisse passer que les messages au-dessus du niveau minimum configuré.',
        image: '/missions/logging.png',
        minLecons: 3
    },
    {
        missionId: 39,
        missionTitre: "Jeu de cartes typé",
        taches: [
            { taskId: 122, taskTitre: "Modéliser Carte avec type union Couleur et Valeur" },
            { taskId: 123, taskTitre: "Générer un jeu de 52 cartes" },
            { taskId: 124, taskTitre: "Mélanger et distribuer des mains typées" }
        ],
        verification: [
            { taskId: 122, wordKey: 'type Couleur', expectedOutput: '' },
            { taskId: 123, wordKey: 'interface Carte', expectedOutput: '' },
            { taskId: 124, wordKey: 'function melanger', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`type Couleur = 'coeur' | 'carreau' | 'trèfle' | 'pique'` et `type Valeur = '2' | ... | 'A'`.", xpCout: 15 },
            { niveau: 2, texte: "Deux boucles imbriquées sur les couleurs et valeurs génèrent les 52 cartes.", xpCout: 35 },
            { niveau: 3, texte: "Algorithme de mélange Fisher-Yates : `for(let i=jeu.length-1; i>0; i--) { const j=random; swap }`.", xpCout: 65 }
        ],
        xpRecompense: 510,
        difficulte: 'DIFFICILE',
        langage: 'typescript',
        description: 'Modélise un jeu de 52 cartes complet avec des types unions TypeScript pour les couleurs et les valeurs. Tu généreras le jeu par double boucle, implémenteras l\'algorithme de mélange Fisher-Yates, et distribueras des mains avec des types précis.',
        image: '/missions/cartes.png',
        minLecons: 4
    },

    // ─── Java mini-projets ─────────────────────────────────────────────────
    {
        missionId: 40,
        missionTitre: "Calculatrice orientée objet",
        taches: [
            { taskId: 125, taskTitre: "Créer la classe Calculatrice avec ses méthodes" },
            { taskId: 126, taskTitre: "Gérer les exceptions (division par zéro)" },
            { taskId: 127, taskTitre: "Afficher l'historique des calculs" }
        ],
        verification: [
            { taskId: 125, wordKey: 'class Calculatrice', expectedOutput: '' },
            { taskId: 126, wordKey: 'ArithmeticException', expectedOutput: '' },
            { taskId: 127, wordKey: 'ArrayList', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`public class Calculatrice { public double add(double a, double b) { return a + b; } }`.", xpCout: 15 },
            { niveau: 2, texte: "`throw new ArithmeticException(\"Division par zéro\")` si le diviseur est 0.", xpCout: 35 },
            { niveau: 3, texte: "Un `ArrayList<String> historique` stocke chaque opération sous forme `\"3 + 4 = 7\"`.", xpCout: 60 }
        ],
        xpRecompense: 430,
        difficulte: 'MOYEN',
        langage: 'java',
        description: 'Construis une calculatrice Java en orienté objet. La classe Calculatrice encapsule toutes les opérations, lance une ArithmeticException en cas de division par zéro, et conserve un historique des calculs dans une ArrayList sous forme "3 + 4 = 7".',
        image: '/missions/calculatrice.png',
        minLecons: 2
    },
    {
        missionId: 41,
        missionTitre: "Carnet d'adresses Java",
        taches: [
            { taskId: 128, taskTitre: "Créer la classe Contact" },
            { taskId: 129, taskTitre: "Stocker les contacts dans une HashMap" },
            { taskId: 130, taskTitre: "Rechercher, ajouter et supprimer des contacts" }
        ],
        verification: [
            { taskId: 128, wordKey: 'class Contact', expectedOutput: '' },
            { taskId: 129, wordKey: 'HashMap', expectedOutput: '' },
            { taskId: 130, wordKey: 'void ajouter', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`class Contact { String nom; String tel; String email; }` avec constructeur et getters.", xpCout: 15 },
            { niveau: 2, texte: "`HashMap<String, Contact> annuaire` — clé = nom, valeur = objet Contact.", xpCout: 35 },
            { niveau: 3, texte: "`annuaire.entrySet().stream().filter(e -> e.getValue().getNom().contains(terme))` pour la recherche.", xpCout: 60 }
        ],
        xpRecompense: 460,
        difficulte: 'MOYEN',
        langage: 'java',
        description: 'Crée un carnet d\'adresses Java complet. La classe Contact encapsule nom, téléphone et email, les contacts sont indexés dans une HashMap pour un accès rapide, et la recherche partielle filtre les résultats par nom ou email.',
        image: '/missions/contacts.png',
        minLecons: 3
    },
    {
        missionId: 42,
        missionTitre: "Simulation bancaire",
        taches: [
            { taskId: 131, taskTitre: "Créer une classe abstraite Compte" },
            { taskId: 132, taskTitre: "Étendre avec CompteCourant et CompteEpargne" },
            { taskId: 133, taskTitre: "Appliquer le polymorphisme pour les opérations" }
        ],
        verification: [
            { taskId: 131, wordKey: 'abstract class Compte', expectedOutput: '' },
            { taskId: 132, wordKey: 'extends Compte', expectedOutput: '' },
            { taskId: 133, wordKey: '@Override', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`abstract class Compte { protected double solde; public abstract void retirer(double montant); }`.", xpCout: 15 },
            { niveau: 2, texte: "`CompteCourant` autorise un découvert ; `CompteEpargne` ajoute des intérêts annuels.", xpCout: 40 },
            { niveau: 3, texte: "`@Override public void retirer(double m)` dans chaque sous-classe avec ses propres règles.", xpCout: 65 }
        ],
        xpRecompense: 530,
        difficulte: 'DIFFICILE',
        langage: 'java',
        description: 'Simule des comptes bancaires avec la POO avancée. La classe abstraite Compte impose le contrat via retirer() abstraite, CompteCourant autorise un découvert configurable, et CompteEpargne calcule des intérêts. Les deux sont manipulés polymorphiquement.',
        image: '/missions/bank.png',
        minLecons: 4
    },
    {
        missionId: 43,
        missionTitre: "Bibliothèque Java",
        taches: [
            { taskId: 134, taskTitre: "Modéliser Livre avec interface Empruntable" },
            { taskId: 135, taskTitre: "Gérer le stock avec une ArrayList" },
            { taskId: 136, taskTitre: "Trier les livres avec Comparable" }
        ],
        verification: [
            { taskId: 134, wordKey: 'interface Empruntable', expectedOutput: '' },
            { taskId: 135, wordKey: 'ArrayList<Livre>', expectedOutput: '' },
            { taskId: 136, wordKey: 'compareTo', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`interface Empruntable { void emprunter(String nom); void rendre(); }`.", xpCout: 15 },
            { niveau: 2, texte: "`ArrayList<Livre>` avec `.add()`, `.remove()`, `.stream().filter()` pour gérer le stock.", xpCout: 35 },
            { niveau: 3, texte: "`class Livre implements Comparable<Livre> { public int compareTo(Livre o) { return this.titre.compareTo(o.titre); } }`.", xpCout: 65 }
        ],
        xpRecompense: 510,
        difficulte: 'DIFFICILE',
        langage: 'java',
        description: 'Développe une bibliothèque numérique Java. L\'interface Empruntable impose les méthodes emprunter/rendre, le stock est géré dans une ArrayList<Livre>, et les livres s\'auto-trient alphabétiquement par titre grâce à l\'implémentation de Comparable.',
        image: '/missions/bibliotheque.png',
        minLecons: 4
    },
    {
        missionId: 44,
        missionTitre: "Convertisseur d'unités",
        taches: [
            { taskId: 137, taskTitre: "Créer un enum Unite avec les facteurs de conversion" },
            { taskId: 138, taskTitre: "Implémenter la méthode de conversion" },
            { taskId: 139, taskTitre: "Afficher toutes les conversions possibles" }
        ],
        verification: [
            { taskId: 137, wordKey: 'enum Unite', expectedOutput: '' },
            { taskId: 138, wordKey: 'double convertir', expectedOutput: '' },
            { taskId: 139, wordKey: 'for (Unite u', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`enum Unite { KM(1000), M(1), CM(0.01); final double facteur; Unite(double f){this.facteur=f;} }`.", xpCout: 20 },
            { niveau: 2, texte: "`double convertir(double val, Unite de, Unite vers) { return val * de.facteur / vers.facteur; }`.", xpCout: 35 },
            { niveau: 3, texte: "`for (Unite u : Unite.values())` itère sur toutes les valeurs de l'enum.", xpCout: 60 }
        ],
        xpRecompense: 470,
        difficulte: 'MOYEN',
        langage: 'java',
        description: 'Construis un convertisseur d\'unités basé sur un enum Java enrichi. Chaque valeur de l\'enum Unite porte son facteur de conversion comme attribut, la méthode convertir() calcule le résultat dynamiquement, et une boucle sur values() liste toutes les options.',
        image: '/missions/convertisseur.png',
        minLecons: 3
    },
    {
        missionId: 45,
        missionTitre: "Morpion (Tic-Tac-Toe)",
        taches: [
            { taskId: 140, taskTitre: "Représenter le plateau avec un tableau 2D" },
            { taskId: 141, taskTitre: "Vérifier les conditions de victoire" },
            { taskId: 142, taskTitre: "Gérer les tours des deux joueurs" }
        ],
        verification: [
            { taskId: 140, wordKey: 'char[][] plateau', expectedOutput: '' },
            { taskId: 141, wordKey: 'boolean verifierVictoire', expectedOutput: '' },
            { taskId: 142, wordKey: 'joueurActuel', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`char[][] plateau = new char[3][3]` initialisé avec des espaces `' '`.", xpCout: 15 },
            { niveau: 2, texte: "Vérifie les 3 lignes, 3 colonnes et 2 diagonales pour trouver 3 symboles identiques.", xpCout: 40 },
            { niveau: 3, texte: "`char joueurActuel = 'X'` et bascule avec `joueurActuel = (joueurActuel == 'X') ? 'O' : 'X'`.", xpCout: 60 }
        ],
        xpRecompense: 490,
        difficulte: 'MOYEN',
        langage: 'java',
        description: 'Implémente le jeu du Morpion (Tic-Tac-Toe) en Java. Le plateau 3×3 est un tableau char[][], une fonction vérifie les 3 lignes, 3 colonnes et 2 diagonales pour détecter la victoire, et les deux joueurs alternent leurs tours.',
        image: '/missions/morpion.png',
        minLecons: 3
    },
    {
        missionId: 46,
        missionTitre: "Gestionnaire d'étudiants",
        taches: [
            { taskId: 143, taskTitre: "Créer la classe Etudiant avec notes" },
            { taskId: 144, taskTitre: "Calculer la moyenne et la mention" },
            { taskId: 145, taskTitre: "Trier et afficher le classement" }
        ],
        verification: [
            { taskId: 143, wordKey: 'class Etudiant', expectedOutput: '' },
            { taskId: 144, wordKey: 'getMoyenne', expectedOutput: '' },
            { taskId: 145, wordKey: 'Collections.sort', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`class Etudiant { String nom; List<Double> notes; }` avec `addNote(double n)`.", xpCout: 15 },
            { niveau: 2, texte: "`getMoyenne()` retourne `notes.stream().mapToDouble(d->d).average().orElse(0)`.", xpCout: 35 },
            { niveau: 3, texte: "`Collections.sort(etudiants, Comparator.comparingDouble(Etudiant::getMoyenne).reversed())`.", xpCout: 65 }
        ],
        xpRecompense: 500,
        difficulte: 'MOYEN',
        langage: 'java',
        description: 'Gère une liste d\'étudiants Java. Chaque Etudiant accumule ses notes dans une List<Double>, getMoyenne() utilise un stream pour calculer la moyenne, et le classement est généré par Collections.sort avec un Comparator lambda sur la moyenne.',
        image: '/missions/etudiants.png',
        minLecons: 3
    },
    {
        missionId: 47,
        missionTitre: "Zoo polymorphe",
        taches: [
            { taskId: 146, taskTitre: "Créer une classe abstraite Animal" },
            { taskId: 147, taskTitre: "Implémenter Lion, Dauphin, Aigle" },
            { taskId: 148, taskTitre: "Parcourir une liste d'animaux polymorphiquement" }
        ],
        verification: [
            { taskId: 146, wordKey: 'abstract class Animal', expectedOutput: '' },
            { taskId: 147, wordKey: 'class Lion extends Animal', expectedOutput: '' },
            { taskId: 148, wordKey: 'List<Animal>', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`abstract class Animal { abstract String parler(); abstract String seDeplacer(); }`.", xpCout: 15 },
            { niveau: 2, texte: "Chaque sous-classe `@Override` les méthodes avec son comportement propre.", xpCout: 35 },
            { niveau: 3, texte: "`List<Animal> zoo = new ArrayList<>()` contient des Lion, Dauphin, Aigle — appelle `a.parler()` en boucle.", xpCout: 60 }
        ],
        xpRecompense: 520,
        difficulte: 'DIFFICILE',
        langage: 'java',
        description: 'Explore le polymorphisme Java avec un zoo virtuel. La classe abstraite Animal déclare parler() et seDeplacer() en abstract, Lion, Dauphin et Aigle les surchargent différemment, et une List<Animal> permet de les manipuler tous sans connaître leur type réel.',
        image: '/missions/zoo.png',
        minLecons: 4
    },
    {
        missionId: 48,
        missionTitre: "Générateur de mots de passe Java",
        taches: [
            { taskId: 149, taskTitre: "Construire le pool de caractères dynamiquement" },
            { taskId: 150, taskTitre: "Générer un mot de passe sécurisé avec SecureRandom" },
            { taskId: 151, taskTitre: "Vérifier que le mdp respecte tous les critères" }
        ],
        verification: [
            { taskId: 149, wordKey: 'StringBuilder', expectedOutput: '' },
            { taskId: 150, wordKey: 'SecureRandom', expectedOutput: '' },
            { taskId: 151, wordKey: 'boolean valider', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`StringBuilder pool = new StringBuilder()` auquel on `.append()` les jeux de caractères voulus.", xpCout: 15 },
            { niveau: 2, texte: "`SecureRandom random = new SecureRandom()` puis `random.nextInt(pool.length())` pour chaque caractère.", xpCout: 35 },
            { niveau: 3, texte: "Vérifie avec des regex : `mdp.matches(\".*[A-Z].*\")` pour les majuscules, `.*[0-9].*` pour les chiffres.", xpCout: 60 }
        ],
        xpRecompense: 470,
        difficulte: 'MOYEN',
        langage: 'java',
        description: 'Génère des mots de passe sécurisés en Java. Tu construiras dynamiquement le pool de caractères avec StringBuilder, utiliseras SecureRandom (cryptographiquement fort) pour les sélectionner, et valideras le résultat avec des regex Java.',
        image: '/missions/password.png',
        minLecons: 3
    },
    {
        missionId: 49,
        missionTitre: "Analyseur de texte Java",
        taches: [
            { taskId: 152, taskTitre: "Compter mots, phrases et caractères" },
            { taskId: 153, taskTitre: "Trouver les mots les plus fréquents avec une HashMap" },
            { taskId: 154, taskTitre: "Calculer l'indice de lisibilité Flesch" }
        ],
        verification: [
            { taskId: 152, wordKey: 'split', expectedOutput: '' },
            { taskId: 153, wordKey: 'HashMap<String, Integer>', expectedOutput: '' },
            { taskId: 154, wordKey: 'flesch', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`texte.split(\"\\\\s+\").length` pour les mots, `texte.split(\"[.!?]\").length` pour les phrases.", xpCout: 15 },
            { niveau: 2, texte: "`freq.merge(mot, 1, Integer::sum)` incrémente le compteur pour chaque mot.", xpCout: 40 },
            { niveau: 3, texte: "Flesch = 206.835 - 1.015×(mots/phrases) - 84.6×(syllabes/mots). Compte les syllabes par les voyelles.", xpCout: 65 }
        ],
        xpRecompense: 550,
        difficulte: 'DIFFICILE',
        langage: 'java',
        description: 'Réalise une analyse statistique complète de texte en Java. Tu compteras mots, phrases et caractères avec split(), calculeras les fréquences avec HashMap.merge(), et tenteras de calculer l\'indice de lisibilité de Flesch-Kincaid basé sur les syllabes.',
        image: '/missions/texte.png',
        minLecons: 4
    },

    // ─── PHP mini-projets ──────────────────────────────────────────────────
    {
        missionId: 50,
        missionTitre: "Calculatrice PHP",
        taches: [
            { taskId: 155, taskTitre: "Créer les fonctions de calcul" },
            { taskId: 156, taskTitre: "Lire les paramètres depuis $_GET ou $_POST" },
            { taskId: 157, taskTitre: "Afficher le résultat et gérer les erreurs" }
        ],
        verification: [
            { taskId: 155, wordKey: 'function', expectedOutput: '' },
            { taskId: 156, wordKey: '$_POST', expectedOutput: '' },
            { taskId: 157, wordKey: 'echo', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Déclare `function add($a, $b) { return $a + $b; }` etc.", xpCout: 15 },
            { niveau: 2, texte: "`$a = $_POST['a'] ?? 0` lit la valeur du formulaire avec un fallback à 0.", xpCout: 30 },
            { niveau: 3, texte: "Vérifie `if ($b == 0)` avant la division et `echo` un message d'erreur lisible.", xpCout: 60 }
        ],
        xpRecompense: 380,
        difficulte: 'FACILE',
        langage: 'php',
        description: 'Crée une calculatrice PHP qui traite les données d\'un formulaire. Tu définiras les fonctions de calcul, liras les valeurs depuis $_POST avec l\'opérateur null-coalescing ??, et afficheras le résultat ou un message d\'erreur si la division est impossible.',
        image: '/missions/calculatrice.png',
        minLecons: 2
    },
    {
        missionId: 51,
        missionTitre: "Gestionnaire de liste PHP",
        taches: [
            { taskId: 158, taskTitre: "Stocker des éléments dans un tableau PHP" },
            { taskId: 159, taskTitre: "Ajouter et supprimer avec array_push/unset" },
            { taskId: 160, taskTitre: "Afficher la liste triée avec sort()" }
        ],
        verification: [
            { taskId: 158, wordKey: '$liste', expectedOutput: '' },
            { taskId: 159, wordKey: 'array_push', expectedOutput: '' },
            { taskId: 160, wordKey: 'sort', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`$liste = []` puis `array_push($liste, $element)` pour ajouter.", xpCout: 15 },
            { niveau: 2, texte: "`unset($liste[$index])` supprime par index. `array_values($liste)` recalcule les index.", xpCout: 30 },
            { niveau: 3, texte: "`sort($liste)` trie alphabétiquement. `rsort()` trie en ordre inverse.", xpCout: 60 }
        ],
        xpRecompense: 360,
        difficulte: 'FACILE',
        langage: 'php',
        description: 'Manipule des tableaux PHP avec les fonctions natives du langage. Tu ajouteras des éléments avec array_push(), supprimeras par index avec unset() puis réindexeras avec array_values(), et trieras la liste avec sort() ou rsort().',
        image: '/missions/tasks.png',
        minLecons: 2
    },
    {
        missionId: 52,
        missionTitre: "Formulaire de contact PHP",
        taches: [
            { taskId: 161, taskTitre: "Valider le nom, l'email et le message" },
            { taskId: 162, taskTitre: "Nettoyer les données avec htmlspecialchars" },
            { taskId: 163, taskTitre: "Afficher les erreurs ou un message de succès" }
        ],
        verification: [
            { taskId: 161, wordKey: 'empty', expectedOutput: '' },
            { taskId: 162, wordKey: 'htmlspecialchars', expectedOutput: '' },
            { taskId: 163, wordKey: '$erreurs', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`if (empty($_POST['nom'])) { $erreurs[] = 'Nom requis'; }` valide chaque champ.", xpCout: 15 },
            { niveau: 2, texte: "`htmlspecialchars($valeur, ENT_QUOTES)` neutralise les caractères HTML dangereux.", xpCout: 35 },
            { niveau: 3, texte: "`if (empty($erreurs)) { /* succès */ } else { /* afficher les erreurs */ }` sépare les deux cas.", xpCout: 60 }
        ],
        xpRecompense: 420,
        difficulte: 'MOYEN',
        langage: 'php',
        description: 'Valide et sécurise un formulaire de contact PHP. Tu vérifieras que chaque champ est rempli avec empty(), nettoieras les données avec htmlspecialchars() pour prévenir les attaques XSS, et afficheras soit les erreurs soit un message de succès.',
        image: '/missions/contacts.png',
        minLecons: 3
    },
    {
        missionId: 53,
        missionTitre: "Agenda PHP",
        taches: [
            { taskId: 164, taskTitre: "Stocker des événements avec date, titre, description" },
            { taskId: 165, taskTitre: "Filtrer les événements futurs avec strtotime" },
            { taskId: 166, taskTitre: "Trier les événements par date croissante" }
        ],
        verification: [
            { taskId: 164, wordKey: '$evenements', expectedOutput: '' },
            { taskId: 165, wordKey: 'strtotime', expectedOutput: '' },
            { taskId: 166, wordKey: 'usort', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`$evenements = [['titre'=>'...', 'date'=>'2026-08-01', 'desc'=>'...']]`.", xpCout: 15 },
            { niveau: 2, texte: "`strtotime($e['date']) > time()` filtre les événements dans le futur.", xpCout: 35 },
            { niveau: 3, texte: "`usort($e, fn($a,$b) => strtotime($a['date']) - strtotime($b['date']))` trie par date.", xpCout: 60 }
        ],
        xpRecompense: 440,
        difficulte: 'MOYEN',
        langage: 'php',
        description: 'Crée un agenda PHP avec gestion des dates. Tu stockeras des événements dans un tableau associatif, filtreras les événements futurs en comparant les timestamps avec strtotime() > time(), et trieras la liste chronologiquement avec usort().',
        image: '/missions/agenda.png',
        minLecons: 3
    },
    {
        missionId: 54,
        missionTitre: "Convertisseur d'unités PHP",
        taches: [
            { taskId: 167, taskTitre: "Définir les taux dans un tableau associatif" },
            { taskId: 168, taskTitre: "Implémenter la fonction de conversion" },
            { taskId: 169, taskTitre: "Afficher toutes les conversions avec foreach" }
        ],
        verification: [
            { taskId: 167, wordKey: '$unites', expectedOutput: '' },
            { taskId: 168, wordKey: 'function convertir', expectedOutput: '' },
            { taskId: 169, wordKey: 'foreach', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`$unites = ['km' => 1000, 'm' => 1, 'cm' => 0.01]` — tout en mètres.", xpCout: 15 },
            { niveau: 2, texte: "`function convertir($val, $de, $vers) { return $val * $unites[$de] / $unites[$vers]; }`.", xpCout: 30 },
            { niveau: 3, texte: "`foreach ($unites as $nom => $facteur) { echo \"$valeur m = ...\" }` affiche toutes les conversions.", xpCout: 60 }
        ],
        xpRecompense: 390,
        difficulte: 'FACILE',
        langage: 'php',
        description: 'Construis un convertisseur d\'unités PHP. Les facteurs de conversion sont dans un tableau associatif (tout en mètres), la fonction convertir() calcule le résultat en passant par l\'unité de base, et foreach affiche toutes les équivalences.',
        image: '/missions/convertisseur.png',
        minLecons: 2
    },
    {
        missionId: 55,
        missionTitre: "Mini blog PHP",
        taches: [
            { taskId: 170, taskTitre: "Stocker les articles dans un tableau de tableaux" },
            { taskId: 171, taskTitre: "Afficher la liste et le détail d'un article" },
            { taskId: 172, taskTitre: "Paginer les articles (5 par page)" }
        ],
        verification: [
            { taskId: 170, wordKey: '$articles', expectedOutput: '' },
            { taskId: 171, wordKey: 'isset($_GET', expectedOutput: '' },
            { taskId: 172, wordKey: 'array_slice', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`$articles = [['id'=>1,'titre'=>'...','contenu'=>'...','date'=>'...']]`.", xpCout: 15 },
            { niveau: 2, texte: "`if (isset($_GET['id'])) { /* affiche le détail */ } else { /* liste */ }`.", xpCout: 35 },
            { niveau: 3, texte: "`$page = $_GET['page'] ?? 1; $debut = ($page-1)*5; $pageArticles = array_slice($articles, $debut, 5);`.", xpCout: 60 }
        ],
        xpRecompense: 460,
        difficulte: 'MOYEN',
        langage: 'php',
        description: 'Développe un mini blog PHP sans base de données. Les articles sont dans un tableau PHP, un paramètre GET détermine si on affiche la liste ou le détail d\'un article, et la pagination divise les articles par tranches de 5 avec array_slice().',
        image: '/missions/blog.png',
        minLecons: 3
    },
    {
        missionId: 56,
        missionTitre: "Panier de session PHP",
        taches: [
            { taskId: 173, taskTitre: "Démarrer une session et initialiser le panier" },
            { taskId: 174, taskTitre: "Ajouter et retirer des produits du panier" },
            { taskId: 175, taskTitre: "Calculer et afficher le total" }
        ],
        verification: [
            { taskId: 173, wordKey: 'session_start', expectedOutput: '' },
            { taskId: 174, wordKey: '$_SESSION[\'panier\']', expectedOutput: '' },
            { taskId: 175, wordKey: 'array_sum', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`session_start()` en début de script. `$_SESSION['panier'] = $_SESSION['panier'] ?? []`.", xpCout: 15 },
            { niveau: 2, texte: "`$_SESSION['panier'][$id] = ['nom'=>..., 'prix'=>..., 'qte'=>1]` ajoute un produit.", xpCout: 35 },
            { niveau: 3, texte: "`$total = array_sum(array_map(fn($p) => $p['prix'] * $p['qte'], $_SESSION['panier']))`.", xpCout: 60 }
        ],
        xpRecompense: 470,
        difficulte: 'MOYEN',
        langage: 'php',
        description: 'Construis un panier d\'achat persistant entre les pages grâce aux sessions PHP. Tu démarreras la session avec session_start(), stockeras produits et quantités dans $_SESSION[\'panier\'], et calculeras le total avec array_map() et array_sum().',
        image: '/missions/panier.png',
        minLecons: 3
    },
    {
        missionId: 57,
        missionTitre: "Générateur de tableau HTML",
        taches: [
            { taskId: 176, taskTitre: "Lire des données CSV et les parser" },
            { taskId: 177, taskTitre: "Générer un tableau HTML dynamiquement" },
            { taskId: 178, taskTitre: "Ajouter le tri par colonne via un paramètre GET" }
        ],
        verification: [
            { taskId: 176, wordKey: 'str_getcsv', expectedOutput: '' },
            { taskId: 177, wordKey: '<table', expectedOutput: '' },
            { taskId: 178, wordKey: '$_GET[\'tri\']', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`$lignes = array_map('str_getcsv', file('data.csv'))` parse chaque ligne CSV.", xpCout: 20 },
            { niveau: 2, texte: "Boucle `foreach ($lignes as $ligne)` pour générer les `<tr><td>...</td></tr>`.", xpCout: 35 },
            { niveau: 3, texte: "`$col = $_GET['tri'] ?? 0; usort($data, fn($a,$b) => $a[$col] <=> $b[$col])` trie par colonne.", xpCout: 65 }
        ],
        xpRecompense: 490,
        difficulte: 'MOYEN',
        langage: 'php',
        description: 'Génère dynamiquement des tableaux HTML à partir de données CSV. Tu parseras le fichier avec str_getcsv(), construiras les balises <tr><td> en boucle foreach, et ajouteras un tri par colonne configurable via un paramètre GET.',
        image: '/missions/tableau.png',
        minLecons: 3
    },
    {
        missionId: 58,
        missionTitre: "Quiz PHP",
        taches: [
            { taskId: 179, taskTitre: "Stocker les questions dans un tableau PHP" },
            { taskId: 180, taskTitre: "Gérer les réponses via un formulaire POST" },
            { taskId: 181, taskTitre: "Calculer et afficher le score final" }
        ],
        verification: [
            { taskId: 179, wordKey: '$questions', expectedOutput: '' },
            { taskId: 180, wordKey: '$_POST[\'reponse\']', expectedOutput: '' },
            { taskId: 181, wordKey: '$score', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`$questions = [['q'=>'...', 'rep'=>'Paris', 'options'=>['Paris','Lyon','Marseille']]]`.", xpCout: 15 },
            { niveau: 2, texte: "Compare `strtolower($_POST['reponse'])` avec `strtolower($q['rep'])` pour chaque question.", xpCout: 30 },
            { niveau: 3, texte: "Stocke le numéro de question en cours dans `$_SESSION['q']` pour avancer question par question.", xpCout: 65 }
        ],
        xpRecompense: 440,
        difficulte: 'MOYEN',
        langage: 'php',
        description: 'Développe un quiz PHP multi-étapes avec sessions. Les questions sont dans un tableau PHP, chaque réponse est comparée insensiblement à la casse, et la progression (numéro de question, score) est stockée en session pour avancer étape par étape.',
        image: '/missions/quiz.png',
        minLecons: 3
    },
    {
        missionId: 59,
        missionTitre: "Livre d'or PHP",
        taches: [
            { taskId: 182, taskTitre: "Enregistrer les messages dans un fichier JSON" },
            { taskId: 183, taskTitre: "Afficher les messages du plus récent au plus ancien" },
            { taskId: 184, taskTitre: "Valider et nettoyer chaque message" }
        ],
        verification: [
            { taskId: 182, wordKey: 'file_put_contents', expectedOutput: '' },
            { taskId: 183, wordKey: 'array_reverse', expectedOutput: '' },
            { taskId: 184, wordKey: 'strip_tags', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`file_put_contents('messages.json', json_encode($messages))` persiste les données.", xpCout: 15 },
            { niveau: 2, texte: "`$messages = json_decode(file_get_contents('messages.json'), true) ?? []` charge les données.", xpCout: 35 },
            { niveau: 3, texte: "`strip_tags($message)` supprime le HTML. `htmlspecialchars()` à l'affichage pour éviter le XSS.", xpCout: 60 }
        ],
        xpRecompense: 450,
        difficulte: 'MOYEN',
        langage: 'php',
        description: 'Construis un livre d\'or PHP avec persistance sur fichier. Les messages sont sauvegardés en JSON via file_put_contents(), chargés avec file_get_contents(), affichés du plus récent au plus ancien avec array_reverse(), et sécurisés contre le XSS.',
        image: '/missions/livredor.png',
        minLecons: 3
    },

    // ─── Go mini-projets ───────────────────────────────────────────────────
    {
        missionId: 60,
        missionTitre: "Calculatrice Go",
        taches: [
            { taskId: 185, taskTitre: "Implémenter les 4 opérations avec des fonctions" },
            { taskId: 186, taskTitre: "Lire les entrées utilisateur avec fmt.Scan" },
            { taskId: 187, taskTitre: "Retourner une erreur en cas de division par zéro" }
        ],
        verification: [
            { taskId: 185, wordKey: 'func', expectedOutput: '' },
            { taskId: 186, wordKey: 'fmt.Scan', expectedOutput: '' },
            { taskId: 187, wordKey: 'errors.New', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`func add(a, b float64) float64 { return a + b }` — typage explicite en Go.", xpCout: 15 },
            { niveau: 2, texte: "`fmt.Scan(&a, &operator, &b)` lit les valeurs et les stocke dans les variables.", xpCout: 30 },
            { niveau: 3, texte: "Go retourne plusieurs valeurs : `func div(a, b float64) (float64, error)`. Retourne `errors.New(\"division par zéro\")` si b == 0.", xpCout: 65 }
        ],
        xpRecompense: 420,
        difficulte: 'MOYEN',
        langage: 'go',
        description: 'Construis une calculatrice en Go avec les idiomes du langage. Chaque fonction retourne (float64, error), fmt.Scan() lit les opérandes, et la division retourne errors.New() si le diviseur vaut zéro — tu pratiques la gestion d\'erreurs à la manière Go.',
        image: '/missions/calculatrice.png',
        minLecons: 2
    },
    {
        missionId: 61,
        missionTitre: "Gestionnaire de tâches Go",
        taches: [
            { taskId: 188, taskTitre: "Définir une struct Task avec les champs nécessaires" },
            { taskId: 189, taskTitre: "Créer les fonctions CRUD sur une slice" },
            { taskId: 190, taskTitre: "Persister les tâches en JSON avec encoding/json" }
        ],
        verification: [
            { taskId: 188, wordKey: 'type Task struct', expectedOutput: '' },
            { taskId: 189, wordKey: 'func ajouter', expectedOutput: '' },
            { taskId: 190, wordKey: 'json.Marshal', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`type Task struct { ID int; Titre string; Done bool }` — struct de base.", xpCout: 15 },
            { niveau: 2, texte: "`tasks = append(tasks, newTask)` pour ajouter. Filtre avec une boucle pour supprimer.", xpCout: 35 },
            { niveau: 3, texte: "`data, _ := json.Marshal(tasks); os.WriteFile(\"tasks.json\", data, 0644)` persiste en JSON.", xpCout: 65 }
        ],
        xpRecompense: 470,
        difficulte: 'MOYEN',
        langage: 'go',
        description: 'Développe un gestionnaire de tâches en Go. Tu définiras une struct Task, stockeras les tâches dans un slice, implémenteras les opérations CRUD (ajout, suppression, marquage), et sérialiseras l\'état en JSON avec encoding/json pour la persistance sur disque.',
        image: '/missions/tasks.png',
        minLecons: 3
    },
    {
        missionId: 62,
        missionTitre: "Convertisseur de températures Go",
        taches: [
            { taskId: 191, taskTitre: "Créer des types personnalisés Celsius, Fahrenheit, Kelvin" },
            { taskId: 192, taskTitre: "Implémenter les méthodes de conversion" },
            { taskId: 193, taskTitre: "Utiliser une interface Temperaturable" }
        ],
        verification: [
            { taskId: 191, wordKey: 'type Celsius float64', expectedOutput: '' },
            { taskId: 192, wordKey: 'func (c Celsius)', expectedOutput: '' },
            { taskId: 193, wordKey: 'interface', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`type Celsius float64` crée un type basé sur float64 avec son propre comportement.", xpCout: 15 },
            { niveau: 2, texte: "`func (c Celsius) ToFahrenheit() Fahrenheit { return Fahrenheit(c*9/5 + 32) }`.", xpCout: 35 },
            { niveau: 3, texte: "`type Temperaturable interface { ToKelvin() Kelvin; String() string }` que chaque type implémente.", xpCout: 65 }
        ],
        xpRecompense: 490,
        difficulte: 'MOYEN',
        langage: 'go',
        description: 'Explore les types personnalisés Go avec un convertisseur de températures. Tu créeras les types Celsius, Fahrenheit et Kelvin basés sur float64, attacheras des méthodes de conversion avec des receivers, et définiras une interface Temperaturable commune.',
        image: '/missions/temperature.png',
        minLecons: 3
    },
    {
        missionId: 63,
        missionTitre: "Nombre mystère Go",
        taches: [
            { taskId: 194, taskTitre: "Générer un nombre aléatoire avec math/rand" },
            { taskId: 195, taskTitre: "Lire les tentatives en boucle" },
            { taskId: 196, taskTitre: "Afficher le score et gérer le temps limite" }
        ],
        verification: [
            { taskId: 194, wordKey: 'rand.Intn', expectedOutput: '' },
            { taskId: 195, wordKey: 'bufio.NewReader', expectedOutput: '' },
            { taskId: 196, wordKey: 'tentatives', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`import \"math/rand\"` puis `secret := rand.Intn(100) + 1` pour un nombre entre 1 et 100.", xpCout: 15 },
            { niveau: 2, texte: "`reader := bufio.NewReader(os.Stdin); input, _ := reader.ReadString('\\n')` lit une ligne.", xpCout: 35 },
            { niveau: 3, texte: "Stocke l'heure de début avec `time.Now()` et calcule `time.Since(debut)` pour afficher le temps.", xpCout: 60 }
        ],
        xpRecompense: 410,
        difficulte: 'FACILE',
        langage: 'go',
        description: 'Crée le jeu du nombre mystère en Go. Tu généreras le secret avec math/rand, liras les tentatives ligne par ligne avec bufio.NewReader, chronométreras la partie avec time.Now(), et afficheras le temps écoulé et le nombre de tentatives à la fin.',
        image: '/missions/devine.png',
        minLecons: 2
    },
    {
        missionId: 64,
        missionTitre: "Analyseur de texte Go",
        taches: [
            { taskId: 197, taskTitre: "Compter mots et caractères avec strings" },
            { taskId: 198, taskTitre: "Calculer la fréquence des mots avec une map" },
            { taskId: 199, taskTitre: "Trier les mots par fréquence décroissante" }
        ],
        verification: [
            { taskId: 197, wordKey: 'strings.Fields', expectedOutput: '' },
            { taskId: 198, wordKey: 'map[string]int', expectedOutput: '' },
            { taskId: 199, wordKey: 'sort.Slice', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`strings.Fields(texte)` sépare par espaces et retourne un `[]string` de mots.", xpCout: 15 },
            { niveau: 2, texte: "`freq := make(map[string]int); for _, mot := range mots { freq[mot]++ }`.", xpCout: 35 },
            { niveau: 3, texte: "`sort.Slice(paires, func(i,j int) bool { return paires[i].count > paires[j].count })`.", xpCout: 65 }
        ],
        xpRecompense: 460,
        difficulte: 'MOYEN',
        langage: 'go',
        description: 'Analyse statistiquement un texte en Go. Tu tokeniseras avec strings.Fields(), compteras les occurrences dans une map[string]int, puis trieras les paires (mot, fréquence) avec sort.Slice pour afficher les mots les plus fréquents.',
        image: '/missions/texte.png',
        minLecons: 3
    },
    {
        missionId: 65,
        missionTitre: "CLI Todo Go",
        taches: [
            { taskId: 200, taskTitre: "Lire les sous-commandes (add, list, done, del)" },
            { taskId: 201, taskTitre: "Gérer chaque commande avec un switch" },
            { taskId: 202, taskTitre: "Charger et sauvegarder les tâches automatiquement" }
        ],
        verification: [
            { taskId: 200, wordKey: 'os.Args', expectedOutput: '' },
            { taskId: 201, wordKey: 'switch', expectedOutput: '' },
            { taskId: 202, wordKey: 'os.ReadFile', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`os.Args[1]` contient la sous-commande. `os.Args[2:]` les arguments restants.", xpCout: 15 },
            { niveau: 2, texte: "`switch os.Args[1] { case \"add\": ... case \"list\": ... default: fmt.Println(\"Commande inconnue\") }`.", xpCout: 35 },
            { niveau: 3, texte: "`os.ReadFile(\"tasks.json\")` au démarrage et `os.WriteFile(\"tasks.json\", data, 0644)` à chaque modification.", xpCout: 60 }
        ],
        xpRecompense: 480,
        difficulte: 'MOYEN',
        langage: 'go',
        description: 'Crée un outil CLI de gestion de tâches en Go. Tu liras la sous-commande (add, list, done, delete) depuis os.Args, dispatcheras vers la bonne fonction avec un switch, et chargeras/sauvegarderas les tâches en JSON automatiquement à chaque exécution.',
        image: '/missions/tasks.png',
        minLecons: 3
    },
    {
        missionId: 66,
        missionTitre: "Générateur de mots de passe Go",
        taches: [
            { taskId: 203, taskTitre: "Construire le charset avec des runes" },
            { taskId: 204, taskTitre: "Générer le mot de passe avec crypto/rand" },
            { taskId: 205, taskTitre: "Évaluer la force et afficher un rapport" }
        ],
        verification: [
            { taskId: 203, wordKey: '[]rune', expectedOutput: '' },
            { taskId: 204, wordKey: 'crypto/rand', expectedOutput: '' },
            { taskId: 205, wordKey: 'force', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`charset := []rune(\"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#\")`.", xpCout: 15 },
            { niveau: 2, texte: "`import \"crypto/rand\"` — `rand.Int(rand.Reader, big.NewInt(int64(len(charset))))` pour un index sécurisé.", xpCout: 40 },
            { niveau: 3, texte: "Calcule un score de force basé sur la longueur et la présence de majuscules, chiffres, symboles.", xpCout: 60 }
        ],
        xpRecompense: 500,
        difficulte: 'MOYEN',
        langage: 'go',
        description: 'Génère des mots de passe sécurisés en Go avec crypto/rand (cryptographiquement sûr). Tu construiras le charset en []rune selon les options choisies, tireras les caractères aléatoirement, et évalueras la force du mot de passe généré.',
        image: '/missions/password.png',
        minLecons: 3
    },
    {
        missionId: 67,
        missionTitre: "Base de données en mémoire",
        taches: [
            { taskId: 206, taskTitre: "Créer une struct DB générique avec une map" },
            { taskId: 207, taskTitre: "Implémenter Set, Get, Delete" },
            { taskId: 208, taskTitre: "Rendre la DB thread-safe avec sync.RWMutex" }
        ],
        verification: [
            { taskId: 206, wordKey: 'type DB struct', expectedOutput: '' },
            { taskId: 207, wordKey: 'func (db *DB) Get', expectedOutput: '' },
            { taskId: 208, wordKey: 'sync.RWMutex', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`type DB struct { data map[string]interface{} }` — stocke tout type de valeur.", xpCout: 20 },
            { niveau: 2, texte: "`func (db *DB) Get(key string) (interface{}, bool) { val, ok := db.data[key]; return val, ok }`.", xpCout: 40 },
            { niveau: 3, texte: "Ajoute `mu sync.RWMutex` à la struct. `.RLock()/RUnlock()` pour Get, `.Lock()/Unlock()` pour Set/Delete.", xpCout: 70 }
        ],
        xpRecompense: 560,
        difficulte: 'DIFFICILE',
        langage: 'go',
        description: 'Implémente une base de données clé-valeur en mémoire en Go. La struct DB encapsule une map[string]interface{}, les méthodes Set/Get/Delete forment l\'API publique, et sync.RWMutex rend la DB thread-safe pour des accès concurrents.',
        image: '/missions/database.png',
        minLecons: 5
    },
    {
        missionId: 68,
        missionTitre: "Serveur HTTP Go",
        taches: [
            { taskId: 209, taskTitre: "Créer un serveur avec net/http" },
            { taskId: 210, taskTitre: "Définir des routes et handlers" },
            { taskId: 211, taskTitre: "Retourner du JSON avec encoding/json" }
        ],
        verification: [
            { taskId: 209, wordKey: 'http.ListenAndServe', expectedOutput: '' },
            { taskId: 210, wordKey: 'http.HandleFunc', expectedOutput: '' },
            { taskId: 211, wordKey: 'json.NewEncoder', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`http.ListenAndServe(\":8080\", nil)` démarre le serveur sur le port 8080.", xpCout: 15 },
            { niveau: 2, texte: "`http.HandleFunc(\"/api/hello\", func(w http.ResponseWriter, r *http.Request) { ... })`.", xpCout: 35 },
            { niveau: 3, texte: "`w.Header().Set(\"Content-Type\", \"application/json\"); json.NewEncoder(w).Encode(data)` répond en JSON.", xpCout: 65 }
        ],
        xpRecompense: 540,
        difficulte: 'DIFFICILE',
        langage: 'go',
        description: 'Crée ton premier serveur HTTP en Go avec le package net/http. Tu enregistreras des handlers sur des routes avec HandleFunc(), démarreras le serveur sur le port 8080, et retourneras des réponses JSON encodées avec json.NewEncoder.',
        image: '/missions/serveur.png',
        minLecons: 5
    },
    {
        missionId: 69,
        missionTitre: "Fréquence de mots avec goroutines",
        taches: [
            { taskId: 212, taskTitre: "Découper le texte en chunks et les traiter en parallèle" },
            { taskId: 213, taskTitre: "Utiliser des goroutines et un channel de résultats" },
            { taskId: 214, taskTitre: "Fusionner les maps partielles et afficher le top 10" }
        ],
        verification: [
            { taskId: 212, wordKey: 'go func', expectedOutput: '' },
            { taskId: 213, wordKey: 'chan map', expectedOutput: '' },
            { taskId: 214, wordKey: 'sync.WaitGroup', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`go func() { /* compter */ ch <- freq }()` lance une goroutine et envoie le résultat sur le channel.", xpCout: 20 },
            { niveau: 2, texte: "`ch := make(chan map[string]int, nbWorkers)` crée un channel bufférisé pour les résultats.", xpCout: 45 },
            { niveau: 3, texte: "`var wg sync.WaitGroup; wg.Add(n); go func() { defer wg.Done(); ... }(); wg.Wait()` synchronise.", xpCout: 70 }
        ],
        xpRecompense: 600,
        difficulte: 'DIFFICILE',
        langage: 'go',
        description: 'Compte la fréquence des mots en parallèle avec les goroutines Go. Tu découperas le texte en chunks traités simultanément par des goroutines, communiqueras les résultats partiels via des channels, et synchroniseras tout avec sync.WaitGroup avant de fusionner.',
        image: '/missions/concurrent.png',
        minLecons: 5
    },

    // ─── Rust mini-projets ─────────────────────────────────────────────────
    {
        missionId: 70,
        missionTitre: "Calculatrice Rust",
        taches: [
            { taskId: 215, taskTitre: "Implémenter les 4 opérations" },
            { taskId: 216, taskTitre: "Lire les entrées avec std::io" },
            { taskId: 217, taskTitre: "Retourner un Result pour la division" }
        ],
        verification: [
            { taskId: 215, wordKey: 'fn add', expectedOutput: '' },
            { taskId: 216, wordKey: 'std::io', expectedOutput: '' },
            { taskId: 217, wordKey: 'Result<', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`fn add(a: f64, b: f64) -> f64 { a + b }` — annotation de types obligatoire.", xpCout: 15 },
            { niveau: 2, texte: "`use std::io; let mut input = String::new(); io::stdin().read_line(&mut input).unwrap();`.", xpCout: 35 },
            { niveau: 3, texte: "`fn div(a: f64, b: f64) -> Result<f64, String> { if b == 0.0 { Err(\"Division par zéro\".to_string()) } else { Ok(a/b) } }`.", xpCout: 65 }
        ],
        xpRecompense: 450,
        difficulte: 'MOYEN',
        langage: 'rust',
        description: 'Construis une calculatrice en Rust avec la gestion d\'erreurs idiomatique. Tu annoteras les types f64, liras les entrées avec std::io, et retourneras Result<f64, String> pour la division — si le diviseur est 0.0, tu retournes Err au lieu de paniquer.',
        image: '/missions/calculatrice.png',
        minLecons: 2
    },
    {
        missionId: 71,
        missionTitre: "Gestionnaire de tâches Rust",
        taches: [
            { taskId: 218, taskTitre: "Définir une struct Task avec #[derive]" },
            { taskId: 219, taskTitre: "Stocker les tâches dans un Vec<Task>" },
            { taskId: 220, taskTitre: "Sérialiser en JSON avec serde" }
        ],
        verification: [
            { taskId: 218, wordKey: 'struct Task', expectedOutput: '' },
            { taskId: 219, wordKey: 'Vec<Task>', expectedOutput: '' },
            { taskId: 220, wordKey: 'serde_json', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`#[derive(Debug, Clone)] struct Task { id: u32, titre: String, done: bool }` — derive automatique.", xpCout: 15 },
            { niveau: 2, texte: "`let mut tasks: Vec<Task> = Vec::new(); tasks.push(Task { ... });` pour ajouter.", xpCout: 35 },
            { niveau: 3, texte: "`#[derive(Serialize, Deserialize)]` + `serde_json::to_string(&tasks)?` pour sérialiser.", xpCout: 65 }
        ],
        xpRecompense: 500,
        difficulte: 'MOYEN',
        langage: 'rust',
        description: 'Développe un gestionnaire de tâches en Rust. Tu définiras une struct Task avec #[derive(Debug, Clone)], la stockeras dans un Vec<Task>, et utiliseras le crate serde avec #[derive(Serialize, Deserialize)] pour lire et écrire les tâches en JSON.',
        image: '/missions/tasks.png',
        minLecons: 3
    },
    {
        missionId: 72,
        missionTitre: "Convertisseur de températures Rust",
        taches: [
            { taskId: 221, taskTitre: "Créer un enum Temperature avec les variantes" },
            { taskId: 222, taskTitre: "Implémenter les conversions avec match" },
            { taskId: 223, taskTitre: "Implémenter Display pour l'affichage" }
        ],
        verification: [
            { taskId: 221, wordKey: 'enum Temperature', expectedOutput: '' },
            { taskId: 222, wordKey: 'match self', expectedOutput: '' },
            { taskId: 223, wordKey: 'impl fmt::Display', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`enum Temperature { Celsius(f64), Fahrenheit(f64), Kelvin(f64) }` — variantes avec données.", xpCout: 15 },
            { niveau: 2, texte: "`fn to_celsius(&self) -> f64 { match self { Temperature::Fahrenheit(f) => (f-32.0)*5.0/9.0, ... } }`.", xpCout: 40 },
            { niveau: 3, texte: "`impl fmt::Display for Temperature { fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result { ... } }`.", xpCout: 65 }
        ],
        xpRecompense: 510,
        difficulte: 'MOYEN',
        langage: 'rust',
        description: 'Crée un convertisseur de températures avec un enum algébrique Rust. Chaque variante (Celsius(f64), Fahrenheit(f64), Kelvin(f64)) porte sa valeur, les conversions sont gérées par match, et tu implémentes fmt::Display pour un affichage propre.',
        image: '/missions/temperature.png',
        minLecons: 3
    },
    {
        missionId: 73,
        missionTitre: "Nombre mystère Rust",
        taches: [
            { taskId: 224, taskTitre: "Générer un nombre aléatoire avec le crate rand" },
            { taskId: 225, taskTitre: "Lire et parser les entrées en boucle" },
            { taskId: 226, taskTitre: "Gérer les erreurs de parsing avec match" }
        ],
        verification: [
            { taskId: 224, wordKey: 'rand::thread_rng', expectedOutput: '' },
            { taskId: 225, wordKey: 'loop', expectedOutput: '' },
            { taskId: 226, wordKey: 'Ok(n)', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`use rand::Rng; let secret = rand::thread_rng().gen_range(1..=100);`.", xpCout: 15 },
            { niveau: 2, texte: "`loop { /* lire input, trim(), parse::<u32>() */ }` — Rust force la gestion du `loop`.", xpCout: 35 },
            { niveau: 3, texte: "`match input.trim().parse::<u32>() { Ok(n) => /* comparer */, Err(_) => println!(\"Nombre invalide\") }`.", xpCout: 65 }
        ],
        xpRecompense: 430,
        difficulte: 'FACILE',
        langage: 'rust',
        description: 'Crée le jeu du nombre mystère en Rust. Tu utiliseras le crate rand pour générer le secret, liras les tentatives en boucle loop, et géreras les erreurs de parsing avec match sur le Result de parse::<u32>() — sans jamais paniquer.',
        image: '/missions/devine.png',
        minLecons: 2
    },
    {
        missionId: 74,
        missionTitre: "Compteur de mots Rust",
        taches: [
            { taskId: 227, taskTitre: "Lire un fichier texte avec std::fs" },
            { taskId: 228, taskTitre: "Compter les mots avec une HashMap" },
            { taskId: 229, taskTitre: "Trier et afficher les N mots les plus fréquents" }
        ],
        verification: [
            { taskId: 227, wordKey: 'fs::read_to_string', expectedOutput: '' },
            { taskId: 228, wordKey: 'HashMap<String, u32>', expectedOutput: '' },
            { taskId: 229, wordKey: 'sort_by', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`let contenu = fs::read_to_string(\"fichier.txt\")?` lit tout le fichier en String.", xpCout: 15 },
            { niveau: 2, texte: "`let compteur = compteur.entry(mot.to_string()).or_insert(0); *compteur += 1;`.", xpCout: 40 },
            { niveau: 3, texte: "`paires.sort_by(|a, b| b.1.cmp(a.1))` trie par valeur décroissante. `.iter().take(n)` pour les N premiers.", xpCout: 65 }
        ],
        xpRecompense: 480,
        difficulte: 'MOYEN',
        langage: 'rust',
        description: 'Compte la fréquence des mots d\'un fichier texte en Rust. Tu liras le fichier avec fs::read_to_string(), incrémenteras les compteurs avec HashMap.entry().or_insert(0), et trieras les paires par fréquence décroissante pour afficher le top N.',
        image: '/missions/texte.png',
        minLecons: 3
    },
    {
        missionId: 75,
        missionTitre: "Simulateur de pile",
        taches: [
            { taskId: 230, taskTitre: "Implémenter une struct Stack<T> générique" },
            { taskId: 231, taskTitre: "Ajouter push, pop, peek avec Option<T>" },
            { taskId: 232, taskTitre: "Évaluer une expression postfixe avec la pile" }
        ],
        verification: [
            { taskId: 230, wordKey: 'struct Stack<T>', expectedOutput: '' },
            { taskId: 231, wordKey: 'Option<&T>', expectedOutput: '' },
            { taskId: 232, wordKey: 'postfixe', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`struct Stack<T> { data: Vec<T> }` — stocke les éléments dans un Vec interne.", xpCout: 15 },
            { niveau: 2, texte: "`fn peek(&self) -> Option<&T> { self.data.last() }` — retourne une référence optionnelle.", xpCout: 40 },
            { niveau: 3, texte: "Pour `3 4 + 2 *` : push chaque chiffre, pour chaque opérateur pop deux valeurs, calcule et push le résultat.", xpCout: 70 }
        ],
        xpRecompense: 550,
        difficulte: 'DIFFICILE',
        langage: 'rust',
        description: 'Crée une structure de données pile générique Stack<T> en Rust. Tu implémenteras push, pop et peek retournant Option<&T> pour un accès sûr sans crash, puis tu utiliseras ta pile pour évaluer des expressions en notation polonaise inverse (ex: "3 4 + 2 *").',
        image: '/missions/pile.png',
        minLecons: 4
    },
    {
        missionId: 76,
        missionTitre: "Validateur d'email Rust",
        taches: [
            { taskId: 233, taskTitre: "Valider la structure d'un email avec une regex" },
            { taskId: 234, taskTitre: "Retourner un Result personnalisé" },
            { taskId: 235, taskTitre: "Tester avec plusieurs cas valides et invalides" }
        ],
        verification: [
            { taskId: 233, wordKey: 'regex::Regex', expectedOutput: '' },
            { taskId: 234, wordKey: 'enum ErreurEmail', expectedOutput: '' },
            { taskId: 235, wordKey: '#[test]', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`use regex::Regex; let re = Regex::new(r\"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$\")?;`.", xpCout: 15 },
            { niveau: 2, texte: "`enum ErreurEmail { FormatInvalide, DomaineManquant }` — erreur personnalisée.", xpCout: 40 },
            { niveau: 3, texte: "`#[cfg(test)] mod tests { #[test] fn test_email_valide() { assert!(valider(\"a@b.com\").is_ok()); } }`.", xpCout: 65 }
        ],
        xpRecompense: 520,
        difficulte: 'DIFFICILE',
        langage: 'rust',
        description: 'Construis un validateur d\'email en Rust avec des erreurs personnalisées. Tu utiliseras le crate regex pour vérifier la structure, définiras un enum ErreurEmail discriminant les différents cas d\'erreur, et écriras des tests unitaires avec #[test].',
        image: '/missions/validation.png',
        minLecons: 4
    },
    {
        missionId: 77,
        missionTitre: "Gestionnaire de fichiers Rust",
        taches: [
            { taskId: 236, taskTitre: "Lister les fichiers d'un répertoire avec std::fs" },
            { taskId: 237, taskTitre: "Filtrer par extension et afficher les métadonnées" },
            { taskId: 238, taskTitre: "Copier ou déplacer des fichiers avec gestion d'erreurs" }
        ],
        verification: [
            { taskId: 236, wordKey: 'fs::read_dir', expectedOutput: '' },
            { taskId: 237, wordKey: '.extension()', expectedOutput: '' },
            { taskId: 238, wordKey: 'fs::copy', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`for entry in fs::read_dir(\".\")? { let entry = entry?; println!(\"{:?}\", entry.file_name()); }`.", xpCout: 20 },
            { niveau: 2, texte: "`if path.extension().and_then(|e| e.to_str()) == Some(\"rs\") { /* filtrer */ }`.", xpCout: 40 },
            { niveau: 3, texte: "`fs::copy(src, dst)?` copie. `fs::rename(src, dst)?` déplace. Le `?` propage l'erreur.", xpCout: 65 }
        ],
        xpRecompense: 530,
        difficulte: 'DIFFICILE',
        langage: 'rust',
        description: 'Développe un gestionnaire de fichiers en Rust avec std::fs. Tu listeras le contenu d\'un répertoire avec read_dir(), filtreras les fichiers par extension, afficheras leurs métadonnées (taille, date), et copieras ou déplaceras des fichiers avec propagation d\'erreurs via ?.',
        image: '/missions/files.png',
        minLecons: 4
    },
    {
        missionId: 78,
        missionTitre: "Calculatrice avec Result et ?",
        taches: [
            { taskId: 239, taskTitre: "Chaîner les opérations avec l'opérateur ?" },
            { taskId: 240, taskTitre: "Implémenter std::error::Error pour une erreur custom" },
            { taskId: 241, taskTitre: "Propager les erreurs jusqu'au main avec Box<dyn Error>" }
        ],
        verification: [
            { taskId: 239, wordKey: 'fn calculer(', expectedOutput: '' },
            { taskId: 240, wordKey: 'impl std::error::Error', expectedOutput: '' },
            { taskId: 241, wordKey: 'Box<dyn Error>', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`let resultat = parse_nombre(input)?; // ? retourne l'erreur au lieu de panic`.", xpCout: 20 },
            { niveau: 2, texte: "`impl std::error::Error for MonErreur {}` + `impl Display for MonErreur { ... }`.", xpCout: 45 },
            { niveau: 3, texte: "`fn main() -> Result<(), Box<dyn Error>> { ... }` — le main peut maintenant retourner des erreurs.", xpCout: 70 }
        ],
        xpRecompense: 570,
        difficulte: 'DIFFICILE',
        langage: 'rust',
        description: 'Maîtrise la gestion d\'erreurs avancée en Rust. Tu chaîneras les opérations avec l\'opérateur ? pour propager automatiquement, créeras une erreur personnalisée qui implémente std::error::Error, et rendras main() capable de retourner des erreurs avec Box<dyn Error>.',
        image: '/missions/erreurs.png',
        minLecons: 5
    },
    {
        missionId: 79,
        missionTitre: "Application de notes Rust",
        taches: [
            { taskId: 242, taskTitre: "Définir les structures Note et Notebook" },
            { taskId: 243, taskTitre: "Implémenter les méthodes avec impl" },
            { taskId: 244, taskTitre: "Persister avec serde_json et gestion d'erreurs complète" }
        ],
        verification: [
            { taskId: 242, wordKey: 'struct Note', expectedOutput: '' },
            { taskId: 243, wordKey: 'impl Notebook', expectedOutput: '' },
            { taskId: 244, wordKey: 'serde_json::from_str', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`struct Notebook { notes: Vec<Note>, prochain_id: u32 }` — encapsule la liste.", xpCout: 15 },
            { niveau: 2, texte: "`impl Notebook { fn ajouter(&mut self, titre: String) -> &Note { ... } }`.", xpCout: 40 },
            { niveau: 3, texte: "`serde_json::from_str::<Notebook>(&contenu)?` désérialise. Gère le cas fichier manquant avec `unwrap_or_default()`.", xpCout: 65 }
        ],
        xpRecompense: 540,
        difficulte: 'DIFFICILE',
        langage: 'rust',
        description: 'Développe une application de notes complète en Rust. La struct Notebook encapsule un Vec<Note> et un compteur d\'ID auto-incrémenté, toutes les méthodes sont dans un bloc impl, et la persistance JSON utilise serde avec une gestion d\'erreurs complète via ?.',
        image: '/missions/notes.png',
        minLecons: 5
    },

    // ─── C++ mini-projets ──────────────────────────────────────────────────
    {
        missionId: 80,
        missionTitre: "Calculatrice C++",
        taches: [
            { taskId: 245, taskTitre: "Créer une classe Calculatrice avec les opérations" },
            { taskId: 246, taskTitre: "Lire les entrées avec cin" },
            { taskId: 247, taskTitre: "Lancer une exception pour la division par zéro" }
        ],
        verification: [
            { taskId: 245, wordKey: 'class Calculatrice', expectedOutput: '' },
            { taskId: 246, wordKey: 'cin >>', expectedOutput: '' },
            { taskId: 247, wordKey: 'throw', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`class Calculatrice { public: double add(double a, double b) { return a + b; } };`.", xpCout: 15 },
            { niveau: 2, texte: "`double a, b; char op; cin >> a >> op >> b;` lit `3 + 4` en une fois.", xpCout: 30 },
            { niveau: 3, texte: "`if (b == 0) throw std::invalid_argument(\"Division par zéro\");` puis `try/catch` dans main.", xpCout: 65 }
        ],
        xpRecompense: 430,
        difficulte: 'MOYEN',
        langage: 'cpp',
        description: 'Construis une calculatrice C++ orientée objet. La classe Calculatrice encapsule toutes les opérations publiques, cin >> lit les opérandes et l\'opérateur en une passe, et throw std::invalid_argument lève une exception récupérée par un try/catch dans le main.',
        image: '/missions/calculatrice.png',
        minLecons: 2
    },
    {
        missionId: 81,
        missionTitre: "Gestionnaire d'étudiants C++",
        taches: [
            { taskId: 248, taskTitre: "Créer une struct Etudiant avec les champs" },
            { taskId: 249, taskTitre: "Stocker dans un vector et calculer la moyenne" },
            { taskId: 250, taskTitre: "Trier avec std::sort et un lambda" }
        ],
        verification: [
            { taskId: 248, wordKey: 'struct Etudiant', expectedOutput: '' },
            { taskId: 249, wordKey: 'vector<Etudiant>', expectedOutput: '' },
            { taskId: 250, wordKey: 'std::sort', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`struct Etudiant { string nom; vector<double> notes; double moyenne(); };`.", xpCout: 15 },
            { niveau: 2, texte: "`double somme = 0; for (auto& n : notes) somme += n; return somme / notes.size();`.", xpCout: 35 },
            { niveau: 3, texte: "`std::sort(etudiants.begin(), etudiants.end(), [](const Etudiant& a, const Etudiant& b) { return a.moyenne() > b.moyenne(); });`.", xpCout: 65 }
        ],
        xpRecompense: 470,
        difficulte: 'MOYEN',
        langage: 'cpp',
        description: 'Gère une liste d\'étudiants en C++. La struct Etudiant stocke les notes dans un vector<double>, une méthode calcule la moyenne avec une boucle range-for, et std::sort avec un lambda compare les moyennes pour générer le classement décroissant.',
        image: '/missions/etudiants.png',
        minLecons: 3
    },
    {
        missionId: 82,
        missionTitre: "Jeu du pendu C++",
        taches: [
            { taskId: 251, taskTitre: "Stocker le mot et les lettres trouvées avec des strings" },
            { taskId: 252, taskTitre: "Afficher le mot masqué avec des underscores" },
            { taskId: 253, taskTitre: "Gérer les vies et la fin de partie" }
        ],
        verification: [
            { taskId: 251, wordKey: 'string motSecret', expectedOutput: '' },
            { taskId: 252, wordKey: 'find(', expectedOutput: '' },
            { taskId: 253, wordKey: 'vies', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`set<char> lettresTrouvees` pour stocker sans doublons. `string motSecret` pour le mot.", xpCout: 15 },
            { niveau: 2, texte: "`if (motSecret.find(lettre) != string::npos) { lettresTrouvees.insert(lettre); }`.", xpCout: 35 },
            { niveau: 3, texte: "Affiche `_` ou la lettre selon `lettresTrouvees.count(c)`. Vérifie la victoire si plus de `_`.", xpCout: 60 }
        ],
        xpRecompense: 450,
        difficulte: 'MOYEN',
        langage: 'cpp',
        description: 'Implémente le jeu du pendu en C++. Le mot secret est une std::string, les lettres trouvées sont dans un set<char> pour éviter les doublons, string::find() vérifie si une lettre est dans le mot, et le jeu détecte victoire ou défaite automatiquement.',
        image: '/missions/pendu.png',
        minLecons: 3
    },
    {
        missionId: 83,
        missionTitre: "Liste de tâches C++",
        taches: [
            { taskId: 254, taskTitre: "Créer une classe TodoList avec un vector de tâches" },
            { taskId: 255, taskTitre: "Implémenter ajout, suppression et complétion" },
            { taskId: 256, taskTitre: "Sauvegarder dans un fichier avec ofstream" }
        ],
        verification: [
            { taskId: 254, wordKey: 'class TodoList', expectedOutput: '' },
            { taskId: 255, wordKey: 'void completer', expectedOutput: '' },
            { taskId: 256, wordKey: 'ofstream', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`class TodoList { private: vector<pair<string,bool>> taches; public: void ajouter(string t); };`.", xpCout: 15 },
            { niveau: 2, texte: "`taches.erase(taches.begin() + index)` supprime par index.", xpCout: 35 },
            { niveau: 3, texte: "`ofstream f(\"tasks.txt\"); for (auto& [t,d] : taches) f << (d?\"[x] \":\"[ ] \") << t << \"\\n\";`.", xpCout: 65 }
        ],
        xpRecompense: 480,
        difficulte: 'MOYEN',
        langage: 'cpp',
        description: 'Crée une classe TodoList C++ complète. Les tâches sont des vector<pair<string,bool>>, tu implémenteras ajout, suppression par index et marquage comme terminé, et la liste sera sauvegardée dans un fichier texte lisible avec ofstream.',
        image: '/missions/tasks.png',
        minLecons: 3
    },
    {
        missionId: 84,
        missionTitre: "Simulateur bancaire C++",
        taches: [
            { taskId: 257, taskTitre: "Créer une classe de base Compte" },
            { taskId: 258, taskTitre: "Hériter avec CompteCourant et CompteEpargne" },
            { taskId: 259, taskTitre: "Utiliser le polymorphisme avec des pointeurs" }
        ],
        verification: [
            { taskId: 257, wordKey: 'class Compte', expectedOutput: '' },
            { taskId: 258, wordKey: ': public Compte', expectedOutput: '' },
            { taskId: 259, wordKey: 'virtual', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`class Compte { protected: double solde; public: virtual void retirer(double m) = 0; };`.", xpCout: 15 },
            { niveau: 2, texte: "`class CompteCourant : public Compte { void retirer(double m) override { ... } };`.", xpCout: 40 },
            { niveau: 3, texte: "`vector<unique_ptr<Compte>> comptes` stocke des pointeurs polymorphiques. `c->retirer(m)` appelle le bon override.", xpCout: 70 }
        ],
        xpRecompense: 540,
        difficulte: 'DIFFICILE',
        langage: 'cpp',
        description: 'Simule des comptes bancaires en C++ avec un modèle objet avancé. La classe de base Compte déclare retirer() comme virtuelle pure, CompteCourant autorise le découvert et CompteEpargne ajoute les intérêts. Un vector<unique_ptr<Compte>> les manipule polymorphiquement.',
        image: '/missions/bank.png',
        minLecons: 4
    },
    {
        missionId: 85,
        missionTitre: "Convertisseur de base numérique C++",
        taches: [
            { taskId: 260, taskTitre: "Convertir décimal vers binaire, octal, hexadécimal" },
            { taskId: 261, taskTitre: "Convertir binaire vers décimal" },
            { taskId: 262, taskTitre: "Utiliser les manipulateurs iostream (hex, oct, bin)" }
        ],
        verification: [
            { taskId: 260, wordKey: 'string decToBin', expectedOutput: '' },
            { taskId: 261, wordKey: 'binToDec', expectedOutput: '' },
            { taskId: 262, wordKey: 'std::hex', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "Divise répétitivement par 2 et accumule les restes pour décimal→binaire.", xpCout: 15 },
            { niveau: 2, texte: "Multiplie chaque bit par sa puissance de 2 (de droite à gauche) pour binaire→décimal.", xpCout: 35 },
            { niveau: 3, texte: "`cout << std::hex << n` affiche directement en hex. `cout << std::oct << n` en octal.", xpCout: 60 }
        ],
        xpRecompense: 460,
        difficulte: 'MOYEN',
        langage: 'cpp',
        description: 'Convertis des nombres entre différentes bases en C++. Tu implémenteras manuellement la conversion décimal↔binaire par divisions successives, utiliseras std::hex et std::oct comme raccourcis iostream, et proposeras un menu interactif pour choisir la conversion.',
        image: '/missions/convertisseur.png',
        minLecons: 3
    },
    {
        missionId: 86,
        missionTitre: "Morpion C++",
        taches: [
            { taskId: 263, taskTitre: "Représenter le plateau avec un tableau 2D" },
            { taskId: 264, taskTitre: "Vérifier les conditions de victoire" },
            { taskId: 265, taskTitre: "Alterner les tours et afficher le résultat" }
        ],
        verification: [
            { taskId: 263, wordKey: 'char plateau[3][3]', expectedOutput: '' },
            { taskId: 264, wordKey: 'bool victoire', expectedOutput: '' },
            { taskId: 265, wordKey: 'joueur', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`char plateau[3][3]` initialisé avec `' '`. Affiche avec des `|` et `-` pour la grille.", xpCout: 15 },
            { niveau: 2, texte: "Vérifie les 3 lignes, 3 colonnes, 2 diagonales. Une boucle sur les 3 index suffit.", xpCout: 40 },
            { niveau: 3, texte: "`char joueur = 'X'; joueur = (joueur == 'X') ? 'O' : 'X';` alterne les tours.", xpCout: 60 }
        ],
        xpRecompense: 490,
        difficulte: 'MOYEN',
        langage: 'cpp',
        description: 'Implémente le Morpion en C++ avec un tableau 2D. Le plateau char[3][3] s\'affiche avec une grille ASCII, une fonction booléenne vérifie les 8 combinaisons gagnantes, et les deux joueurs X et O alternent leurs tours jusqu\'à la victoire ou le match nul.',
        image: '/missions/morpion.png',
        minLecons: 3
    },
    {
        missionId: 87,
        missionTitre: "Générateur de statistiques C++",
        taches: [
            { taskId: 266, taskTitre: "Lire un jeu de données depuis un fichier" },
            { taskId: 267, taskTitre: "Calculer moyenne, médiane et écart-type" },
            { taskId: 268, taskTitre: "Afficher un histogramme ASCII" }
        ],
        verification: [
            { taskId: 266, wordKey: 'ifstream', expectedOutput: '' },
            { taskId: 267, wordKey: 'double mediane', expectedOutput: '' },
            { taskId: 268, wordKey: 'histogramme', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`ifstream f(\"data.txt\"); double v; while (f >> v) donnees.push_back(v);`.", xpCout: 15 },
            { niveau: 2, texte: "Médiane : trie le vecteur, prend l'élément central (ou moyenne des deux centraux si pair).", xpCout: 40 },
            { niveau: 3, texte: "Divise les données en tranches, affiche `*` proportionnellement au nombre d'éléments dans chaque tranche.", xpCout: 65 }
        ],
        xpRecompense: 530,
        difficulte: 'DIFFICILE',
        langage: 'cpp',
        description: 'Calcule des statistiques descriptives sur un jeu de données lu depuis un fichier. Tu calculeras la moyenne, la médiane (avec tri du vecteur) et l\'écart-type, puis afficheras un histogramme ASCII dont la hauteur des barres est proportionnelle aux fréquences.',
        image: '/missions/stats.png',
        minLecons: 4
    },
    {
        missionId: 88,
        missionTitre: "Système de contacts C++",
        taches: [
            { taskId: 269, taskTitre: "Modéliser Contact avec surcharge d'opérateurs" },
            { taskId: 270, taskTitre: "Stocker dans une map triée par nom" },
            { taskId: 271, taskTitre: "Sérialiser en CSV et recharger" }
        ],
        verification: [
            { taskId: 269, wordKey: 'operator<<', expectedOutput: '' },
            { taskId: 270, wordKey: 'map<string, Contact>', expectedOutput: '' },
            { taskId: 271, wordKey: 'getline', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`friend ostream& operator<<(ostream& os, const Contact& c) { os << c.nom << ...; return os; }`.", xpCout: 20 },
            { niveau: 2, texte: "`map<string, Contact>` trie automatiquement par clé (nom) — accès par `contacts[nom]`.", xpCout: 40 },
            { niveau: 3, texte: "`getline(ss, champ, ',')` parse chaque champ séparé par des virgules depuis une ligne CSV.", xpCout: 65 }
        ],
        xpRecompense: 530,
        difficulte: 'DIFFICILE',
        langage: 'cpp',
        description: 'Développe un système de contacts C++ avancé. Tu surchargeras operator<< pour afficher un contact directement avec cout, stockeras les contacts dans une std::map<string, Contact> auto-triée, et implémenteras l\'import/export CSV avec getline.',
        image: '/missions/contacts.png',
        minLecons: 4
    },
    {
        missionId: 89,
        missionTitre: "Analyseur de texte C++",
        taches: [
            { taskId: 272, taskTitre: "Lire et tokeniser un fichier texte" },
            { taskId: 273, taskTitre: "Compter fréquences avec unordered_map" },
            { taskId: 274, taskTitre: "Trier et afficher le top 10 des mots" }
        ],
        verification: [
            { taskId: 272, wordKey: 'istringstream', expectedOutput: '' },
            { taskId: 273, wordKey: 'unordered_map<string, int>', expectedOutput: '' },
            { taskId: 274, wordKey: 'partial_sort', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`istringstream iss(ligne); string mot; while (iss >> mot) tokens.push_back(mot);`.", xpCout: 15 },
            { niveau: 2, texte: "`unordered_map<string, int>` est plus rapide que `map` pour les comptages (O(1) vs O(log n)).", xpCout: 40 },
            { niveau: 3, texte: "`partial_sort` sur un vecteur de pairs trie uniquement les N premiers éléments — plus efficace.", xpCout: 65 }
        ],
        xpRecompense: 520,
        difficulte: 'DIFFICILE',
        langage: 'cpp',
        description: 'Analyse la fréquence des mots d\'un texte en C++. Tu tokeniseras chaque ligne avec istringstream, compteras les occurrences dans une unordered_map<string, int> (O(1) en accès), et récupéreras le top 10 efficacement avec partial_sort.',
        image: '/missions/texte.png',
        minLecons: 4
    },

    // ─── C# mini-projets ───────────────────────────────────────────────────
    {
        missionId: 90,
        missionTitre: "Calculatrice C#",
        taches: [
            { taskId: 275, taskTitre: "Créer une classe Calculatrice avec les méthodes" },
            { taskId: 276, taskTitre: "Lire les entrées avec Console.ReadLine" },
            { taskId: 277, taskTitre: "Gérer les exceptions (DivideByZeroException)" }
        ],
        verification: [
            { taskId: 275, wordKey: 'class Calculatrice', expectedOutput: '' },
            { taskId: 276, wordKey: 'Console.ReadLine', expectedOutput: '' },
            { taskId: 277, wordKey: 'DivideByZeroException', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`public class Calculatrice { public double Add(double a, double b) => a + b; }`.", xpCout: 15 },
            { niveau: 2, texte: "`double a = double.Parse(Console.ReadLine() ?? \"0\");` lit et convertit l'entrée.", xpCout: 30 },
            { niveau: 3, texte: "`catch (DivideByZeroException) { Console.WriteLine(\"Erreur : division par zéro\"); }`.", xpCout: 65 }
        ],
        xpRecompense: 420,
        difficulte: 'MOYEN',
        langage: 'csharp',
        description: 'Construis une calculatrice C# orientée objet. La classe Calculatrice expose ses 4 opérations avec des expression-bodied members (=>), Console.ReadLine() lit les entrées converties avec double.Parse(), et DivideByZeroException est capturée dans un try/catch.',
        image: '/missions/calculatrice.png',
        minLecons: 2
    },
    {
        missionId: 91,
        missionTitre: "Gestionnaire de contacts C#",
        taches: [
            { taskId: 278, taskTitre: "Créer un record Contact avec les propriétés" },
            { taskId: 279, taskTitre: "Stocker dans une List<Contact> et effectuer le CRUD" },
            { taskId: 280, taskTitre: "Sérialiser en JSON avec System.Text.Json" }
        ],
        verification: [
            { taskId: 278, wordKey: 'record Contact', expectedOutput: '' },
            { taskId: 279, wordKey: 'List<Contact>', expectedOutput: '' },
            { taskId: 280, wordKey: 'JsonSerializer', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`record Contact(string Nom, string Email, string Tel);` — immutable par défaut.", xpCout: 15 },
            { niveau: 2, texte: "`contacts.RemoveAll(c => c.Nom == nom)` supprime par critère. `contacts.Find(c => c.Nom == nom)` pour chercher.", xpCout: 35 },
            { niveau: 3, texte: "`string json = JsonSerializer.Serialize(contacts); File.WriteAllText(\"contacts.json\", json);`.", xpCout: 65 }
        ],
        xpRecompense: 460,
        difficulte: 'MOYEN',
        langage: 'csharp',
        description: 'Gère un carnet de contacts en C# moderne. Tu utiliseras un record Contact (immutable par défaut) pour modéliser les données, une List<Contact> pour les opérations CRUD avec RemoveAll et Find, et System.Text.Json pour sérialiser vers un fichier.',
        image: '/missions/contacts.png',
        minLecons: 3
    },
    {
        missionId: 92,
        missionTitre: "Jeu du pendu C#",
        taches: [
            { taskId: 281, taskTitre: "Stocker le mot et les lettres trouvées" },
            { taskId: 282, taskTitre: "Afficher le mot masqué avec LINQ" },
            { taskId: 283, taskTitre: "Gérer les vies et afficher le pendu ASCII" }
        ],
        verification: [
            { taskId: 281, wordKey: 'HashSet<char>', expectedOutput: '' },
            { taskId: 282, wordKey: '.Select(', expectedOutput: '' },
            { taskId: 283, wordKey: 'vies', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`HashSet<char> lettresTrouvees = new();` pour les lettres sans doublons.", xpCout: 15 },
            { niveau: 2, texte: "`string.Join(\" \", motSecret.Select(c => lettresTrouvees.Contains(c) ? c : '_'))` avec LINQ.", xpCout: 40 },
            { niveau: 3, texte: "Un tableau de strings ASCII représente les étapes du pendu selon le nombre de vies restantes.", xpCout: 60 }
        ],
        xpRecompense: 450,
        difficulte: 'MOYEN',
        langage: 'csharp',
        description: 'Implémente le jeu du pendu en C# avec les collections et LINQ. Les lettres trouvées sont dans un HashSet<char>, le mot masqué est généré avec string.Join et LINQ Select, et les étapes du pendu sont affichées en ASCII selon le nombre de vies restantes.',
        image: '/missions/pendu.png',
        minLecons: 3
    },
    {
        missionId: 93,
        missionTitre: "Mini banque C#",
        taches: [
            { taskId: 284, taskTitre: "Créer une classe abstraite Compte" },
            { taskId: 285, taskTitre: "Implémenter CompteCourant et CompteEpargne" },
            { taskId: 286, taskTitre: "Utiliser des propriétés et des events" }
        ],
        verification: [
            { taskId: 284, wordKey: 'abstract class Compte', expectedOutput: '' },
            { taskId: 285, wordKey: 'override', expectedOutput: '' },
            { taskId: 286, wordKey: 'event', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`abstract class Compte { public decimal Solde { get; protected set; } public abstract void Retirer(decimal m); }`.", xpCout: 15 },
            { niveau: 2, texte: "`class CompteCourant : Compte { public override void Retirer(decimal m) { ... } }`.", xpCout: 40 },
            { niveau: 3, texte: "`public event Action<decimal> OnTransaction;` déclenché par `OnTransaction?.Invoke(montant)` à chaque opération.", xpCout: 70 }
        ],
        xpRecompense: 540,
        difficulte: 'DIFFICILE',
        langage: 'csharp',
        description: 'Simule des comptes bancaires en C# avec la POO et les events. La classe abstraite Compte déclare des propriétés avec accesseurs, CompteCourant et CompteEpargne overrident les méthodes, et un event Action<decimal> notifie les observateurs à chaque transaction.',
        image: '/missions/bank.png',
        minLecons: 4
    },
    {
        missionId: 94,
        missionTitre: "Système de notes C#",
        taches: [
            { taskId: 287, taskTitre: "Créer une classe Note avec des propriétés auto" },
            { taskId: 288, taskTitre: "Utiliser LINQ pour filtrer et trier" },
            { taskId: 289, taskTitre: "Calculer des statistiques avec LINQ (Average, Max, Min)" }
        ],
        verification: [
            { taskId: 287, wordKey: 'class Note', expectedOutput: '' },
            { taskId: 288, wordKey: '.OrderBy(', expectedOutput: '' },
            { taskId: 289, wordKey: '.Average(', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`class Note { public int Id { get; init; } public string Titre { get; set; } = \"\"; public DateTime Date { get; init; } = DateTime.Now; }`.", xpCout: 15 },
            { niveau: 2, texte: "`notes.Where(n => n.Titre.Contains(terme)).OrderBy(n => n.Date)` pour filtrer et trier.", xpCout: 35 },
            { niveau: 3, texte: "`notes.Average(n => n.Note)`, `.Max(n => n.Note)`, `.Min(n => n.Note)` pour les stats.", xpCout: 60 }
        ],
        xpRecompense: 470,
        difficulte: 'MOYEN',
        langage: 'csharp',
        description: 'Développe un système de notes C# moderne. La classe Note utilise des propriétés auto avec init, tu filtreras et trieras avec LINQ (Where, OrderBy), et calculeras les statistiques (.Average(), .Max(), .Min()) directement sur la collection avec des lambdas.',
        image: '/missions/notes.png',
        minLecons: 3
    },
    {
        missionId: 95,
        missionTitre: "Convertisseur de devises C#",
        taches: [
            { taskId: 290, taskTitre: "Définir les taux avec un Dictionary<string, decimal>" },
            { taskId: 291, taskTitre: "Implémenter la conversion avec validation" },
            { taskId: 292, taskTitre: "Ajouter une interface IConvertisseur" }
        ],
        verification: [
            { taskId: 290, wordKey: 'Dictionary<string, decimal>', expectedOutput: '' },
            { taskId: 291, wordKey: 'bool TryConvertir', expectedOutput: '' },
            { taskId: 292, wordKey: 'interface IConvertisseur', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`var taux = new Dictionary<string, decimal> { [\"EUR\"] = 1m, [\"USD\"] = 1.08m };`.", xpCout: 15 },
            { niveau: 2, texte: "`bool TryConvertir(decimal val, string de, string vers, out decimal result)` — pattern TryXxx.", xpCout: 40 },
            { niveau: 3, texte: "`interface IConvertisseur { bool TryConvertir(...); IEnumerable<string> Devises { get; } }` — contrat.", xpCout: 65 }
        ],
        xpRecompense: 490,
        difficulte: 'MOYEN',
        langage: 'csharp',
        description: 'Construis un convertisseur de devises C# avec le pattern TryXxx. Les taux sont dans un Dictionary<string, decimal>, TryConvertir() utilise un paramètre out pour le résultat, et une interface IConvertisseur définit le contrat pour rendre le code extensible.',
        image: '/missions/devises.png',
        minLecons: 3
    },
    {
        missionId: 96,
        missionTitre: "Application Todo C#",
        taches: [
            { taskId: 293, taskTitre: "Lire les sous-commandes depuis args[]" },
            { taskId: 294, taskTitre: "Gérer add, list, done, delete" },
            { taskId: 295, taskTitre: "Persister avec File.WriteAllText et JsonSerializer" }
        ],
        verification: [
            { taskId: 293, wordKey: 'args[0]', expectedOutput: '' },
            { taskId: 294, wordKey: 'switch', expectedOutput: '' },
            { taskId: 295, wordKey: 'File.WriteAllText', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`if (args.Length == 0) { Console.WriteLine(\"Usage: todo <add|list|done|del>\"); return; }`.", xpCout: 15 },
            { niveau: 2, texte: "`switch (args[0]) { case \"add\": Ajouter(args[1]); break; case \"list\": Lister(); break; ... }`.", xpCout: 35 },
            { niveau: 3, texte: "Charge au démarrage : `File.Exists(path) ? JsonSerializer.Deserialize<List<Todo>>(File.ReadAllText(path)) : new()`. Sauvegarde après chaque modif.", xpCout: 65 }
        ],
        xpRecompense: 470,
        difficulte: 'MOYEN',
        langage: 'csharp',
        description: 'Développe un outil CLI de gestion de tâches en C#. Tu liras la sous-commande depuis args[], dispatcheras avec un switch (add, list, done, delete), et chargeras automatiquement les tâches au démarrage avec File.Exists avant de les sauvegarder après chaque modification.',
        image: '/missions/tasks.png',
        minLecons: 3
    },
    {
        missionId: 97,
        missionTitre: "Simulateur de quiz C#",
        taches: [
            { taskId: 296, taskTitre: "Modéliser Question avec un record" },
            { taskId: 297, taskTitre: "Mélanger les questions avec Fisher-Yates" },
            { taskId: 298, taskTitre: "Afficher le score et les corrections avec LINQ" }
        ],
        verification: [
            { taskId: 296, wordKey: 'record Question', expectedOutput: '' },
            { taskId: 297, wordKey: 'Random.Shared', expectedOutput: '' },
            { taskId: 298, wordKey: '.Count(', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`record Question(string Texte, string[] Options, int BonneReponse);`.", xpCout: 15 },
            { niveau: 2, texte: "`for (int i = questions.Count-1; i > 0; i--) { int j = Random.Shared.Next(i+1); (questions[i], questions[j]) = (questions[j], questions[i]); }`.", xpCout: 40 },
            { niveau: 3, texte: "`int score = reponses.Count(r => r.Correcte);` — LINQ compte les bonnes réponses.", xpCout: 60 }
        ],
        xpRecompense: 480,
        difficulte: 'MOYEN',
        langage: 'csharp',
        description: 'Développe un simulateur de quiz en C#. Les questions sont modélisées avec des records, tu implémenteras l\'algorithme de mélange Fisher-Yates avec Random.Shared pour varier l\'ordre, et le score final est calculé avec LINQ Count sur les bonnes réponses.',
        image: '/missions/quiz.png',
        minLecons: 3
    },
    {
        missionId: 98,
        missionTitre: "Morpion C#",
        taches: [
            { taskId: 299, taskTitre: "Représenter le plateau avec un tableau 2D" },
            { taskId: 300, taskTitre: "Vérifier la victoire avec LINQ" },
            { taskId: 301, taskTitre: "Implémenter un joueur IA simple" }
        ],
        verification: [
            { taskId: 299, wordKey: 'char[,] plateau', expectedOutput: '' },
            { taskId: 300, wordKey: 'bool VerifierVictoire', expectedOutput: '' },
            { taskId: 301, wordKey: 'JouerIA', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`char[,] plateau = new char[3, 3];` — tableau 2D C#. Accès : `plateau[ligne, col]`.", xpCout: 15 },
            { niveau: 2, texte: "Énumère les 3 lignes, 3 colonnes, 2 diagonales — si tous les 3 sont `== joueur`, c'est gagné.", xpCout: 40 },
            { niveau: 3, texte: "L'IA joue aléatoirement dans une case libre. Amélioration : bloquer si l'adversaire a 2 en ligne.", xpCout: 70 }
        ],
        xpRecompense: 510,
        difficulte: 'DIFFICILE',
        langage: 'csharp',
        description: 'Implémente le Morpion en C# avec un tableau 2D char[,] et une IA basique. Tu vérifieras les 8 combinaisons gagnantes avec une fonction booléenne, alterneras les tours entre joueur et IA, et l\'IA jouera dans une case libre aléatoire.',
        image: '/missions/morpion.png',
        minLecons: 4
    },
    {
        missionId: 99,
        missionTitre: "Analyseur de texte C#",
        taches: [
            { taskId: 302, taskTitre: "Lire un fichier et tokeniser avec Regex" },
            { taskId: 303, taskTitre: "Compter les fréquences avec GroupBy LINQ" },
            { taskId: 304, taskTitre: "Afficher les statistiques et le top 10" }
        ],
        verification: [
            { taskId: 302, wordKey: 'Regex.Matches', expectedOutput: '' },
            { taskId: 303, wordKey: '.GroupBy(', expectedOutput: '' },
            { taskId: 304, wordKey: '.OrderByDescending(', expectedOutput: '' }
        ],
        indices: [
            { niveau: 1, texte: "`var mots = Regex.Matches(texte, @\"\\b\\w+\\b\").Select(m => m.Value.ToLower());`.", xpCout: 15 },
            { niveau: 2, texte: "`var freq = mots.GroupBy(m => m).ToDictionary(g => g.Key, g => g.Count());` — LINQ groupé.", xpCout: 40 },
            { niveau: 3, texte: "`freq.OrderByDescending(kv => kv.Value).Take(10)` retourne les 10 mots les plus fréquents.", xpCout: 65 }
        ],
        xpRecompense: 500,
        difficulte: 'DIFFICILE',
        langage: 'csharp',
        description: 'Analyse statistiquement un texte en C# avec les outils modernes du langage. Tu tokeniseras avec Regex.Matches pour extraire les mots, compteras les fréquences avec GroupBy().ToDictionary(), et afficheras le top 10 des mots avec OrderByDescending().Take(10).',
        image: '/missions/texte.png',
        minLecons: 4
    }
]
