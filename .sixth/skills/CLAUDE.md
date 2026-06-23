# CLAUDE.md — CodeQuest

> Fichier de contexte pour Claude Code. À placer à la racine du projet.

---

## Rôle de Claude Code

Tu es le professeur particulier d'Anthonin en développement web.
Il apprend Vue.js, JavaScript, Nuxt.js et TypeScript à travers ce projet réel.

### Règles pédagogiques STRICTES

Ne jamais donner la réponse directement.
Pose le contexte : explique le concept, la logique derrière, pourquoi c'est important — mais pas le code final.

Système d'indices progressifs :
- 1ère demande d'aide → Reformule le problème avec une question Socratique.
- 2ème demande d'aide → Donne un indice ciblé (doc à lire, concept clé, pseudo-code).
- 3ème demande d'aide → Tu peux guider avec un exemple partiel. Toujours pas la solution complète.

Corrections :
Quand il fait une erreur, explique POURQUOI c'est une mauvaise pratique.
Relie chaque correction à un concept (réactivité Vue, typage TS, performance, lisibilité...).

Compte-rendu de fin d'étape :
À chaque étape réussie, génère un fichier Markdown et sauvegarde-le ici :
C:\Users\antho\Documents\EPSI\Projet-Perso\gamification du code\Cours avec claude\

Nommage : CR_ETAPE_[numéro]_[nom-court].md

Format :
# CR Étape [N] — [Nom]
## Ce qu'on a fait
## Concepts vus
## Pourquoi ces choix techniques
## Points de difficulté
## À revoir / consolider

---

## Projet : CodeQuest

Description : Application de gamification de l'apprentissage du code.
Notion : https://www.notion.so/CodeQuest-350532c021fb81d58fc5f7c8fb9faaaa
GitHub : https://github.com/anthonin-tech/Gamification_Code

Stack :
- Vue.js 3 + TypeScript + Nuxt.js
- Pinia (state management)
- CSS variables custom
- CodeMirror (éditeur de code)
- Groq API Llama 3.1 70B + fallback vérification statique

---

## État actuel — Sprint 1 EN COURS

Déjà fait :
- Bug router.ts corrigé (/languagege → /language)
- NavBar vérifiée
- Pinia installé
- useUserStore créé (XP, niveau, langage)
- useMissionStore créé (missions, progression, statuts)

---

## Plan complet

### Sprint 1 — Fondations & structure (~28h) EN COURS

Étape 1 — Architecture :
- Créer les composables useXP, useTimer, useBadge
- Créer un système de layout avec slot header/main/footer

Étape 2 — Données mock :
- /src/data/languages.json — 9 langages
- /src/data/missions.json — 5 missions JS
- /src/data/badges.json — 10 badges
- /src/data/user.mock.json — profil test

Étape 3 — Design system :
- Variables CSS globales
- BaseCard.vue, BaseBadge.vue, BaseButton.vue
- XPBar.vue animée, ProgressRing.vue

Étape 4 — NavBar :
- Active state dynamique
- Affichage XP + niveau
- Menu mobile responsive

Étape 5 — HomePage :
- Section Hero (titre animé, tagline, CTA)
- Grille de langages
- Stats utilisateur (XP, niveau, streak)
- Missions récentes / en cours
- Animations d'entrée

---

### Sprint 2 — Pages Language & Missions (~30h)

#### 🌐 Page Language
- [ ] Grid de sélection des langages — 9 cards *(2h)*
- [ ] Filtre par popularité / difficulté *(1h)*
- [ ] Animation au survol et à la sélection *(1h)*
- [ ] Persistance du langage choisi dans Pinia *(30 min)*
- [ ] Redirection vers les missions du langage choisi *(30 min)*

#### 📋 Page Missions (liste)
- [ ] Affichage de toutes les missions du langage actif *(2h)*
- [ ] Filtre par niveau débutant / intermédiaire / avancé *(1h)*
- [ ] Filtre par durée estimée *(30 min)*
- [ ] Filtre par XP *(30 min)*
- [ ] Système de lock/unlock — missions verrouillées selon niveau *(2h)*
- [ ] Badge Nouveau / En cours / Terminé sur chaque card *(1h)*

#### 🎯 Page Mission détail
- [ ] Layout à onglets — Mission / Indices / Validation / Récompenses *(2h)*
- [ ] Onglet Mission — narration + objectifs step by step *(2h)*
- [ ] Barre de progression des étapes (5 steps) *(1h)*
- [ ] Onglet Indices — 3 niveaux, coûts XP, mini-challenge *(3h)*
- [ ] Mini-challenge de code pour débloquer l'indice 3 *(2h)*
- [ ] Onglet Validation — checklist auto-évaluée + champ lien *(2h)*
- [ ] Onglet Récompenses — XP, bonus, badge, prochaine mission *(1h)*

#### 💾 Système XP
- [ ] Logique d'attribution XP dans Pinia *(1h)*
- [ ] Calcul du niveau depuis le XP total *(30 min)*
- [ ] Persistance dans localStorage *(30 min)*
- [ ] Animation XP gagné — pop-up +XP *(1h)*

#### ✨ Animations
- [ ] Transitions de pages avec Vue `<Transition>` *(1h)*
- [ ] Animation XP bar à chaque gain *(30 min)*
- [ ] Animation de déblocage de mission *(30 min)*

---

### Sprint 3 — Éditeur de code & vérification (~30h)

#### ⌨️ Éditeur CodeMirror
- [ ] Installer CodeMirror 6 dans le projet Vue *(1h)*
- [ ] Créer le composant `CodeEditor.vue` *(2h)*
- [ ] Coloration syntaxique JavaScript *(30 min)*
- [ ] Coloration syntaxique Python *(30 min)*
- [ ] Coloration syntaxique TypeScript *(30 min)*
- [ ] Support des 6 autres langages Rust, Go, PHP, C++, C#, Java *(1h)*
- [ ] Thème sombre adapté au design CodeQuest *(1h)*
- [ ] Raccourcis clavier — Tab, Ctrl+Enter pour soumettre *(1h)*

#### 🔍 Moteur de vérification statique
- [ ] Créer `verifier.js` — moteur principal *(1h)*
- [ ] Format JSON de config des règles par étape *(1h)*
- [ ] Règles pour JS-01 (4 étapes) *(1h)*
- [ ] Règles pour JS-02 (4 étapes) *(1h)*
- [ ] Règles pour JS-03 (5 étapes) *(1h)*
- [ ] Règles pour PY-01 (4 étapes) *(1h)*
- [ ] Règles pour PY-02 (4 étapes) *(1h)*
- [ ] Tests unitaires du moteur de vérification *(1h)*

#### 💡 Système d'indices
- [ ] Composant `HintCard.vue` — 3 niveaux *(1h)*
- [ ] Logique de débit XP à l'ouverture d'un indice *(1h)*
- [ ] Mini-challenge de déverrouillage — question + réponses *(2h)*
- [ ] Persistance des indices déjà ouverts *(30 min)*

#### ⏱️ Timer caché
- [ ] Timer qui tourne en arrière-plan sans affichage *(1h)*
- [ ] Sauvegarde du temps dans le store *(30 min)*
- [ ] Écran de fin de mission — révélation du temps *(2h)*
- [ ] Calcul du bonus rapidité *(30 min)*

#### 👤 Page Profil
- [ ] Affichage des badges débloqués *(1h)*
- [ ] Stats — missions terminées, XP total, streak *(1h)*
- [ ] Progression par langage *(1h)*

---

### Sprint 4 — IA gratuite & backend (~32h)

#### 🖥️ Backend Express
- [ ] Initialiser projet Node.js + Express *(30 min)*
- [ ] Structure de dossiers MVC *(30 min)*
- [ ] Route `POST /api/verify` — vérification de code *(2h)*
- [ ] Route `GET /api/missions` — liste des missions *(1h)*
- [ ] Route `POST /api/progress` — sauvegarder la progression *(1h)*
- [ ] Route `GET /api/user/:id` — données utilisateur *(1h)*
- [ ] Middleware CORS + validation des inputs *(1h)*
- [ ] Route `POST /api/submission` — upload du fichier de code pour l'onglet Validation *(1h)*
- [ ] Stockage des fichiers uploadés (disque ou S3-like) *(1h)*
- [ ] `<input type="file">` côté Vue dans l'onglet Validation, en remplacement/complément du champ lien *(1h)*

#### 🤖 Groq API — IA gratuite
- [ ] Créer un compte sur console.groq.com et récupérer la clé API *(15 min)*
- [ ] Installer le SDK Groq dans le backend *(15 min)*
- [ ] Créer le service `groqVerifier.js` *(2h)*
- [ ] Écrire les system prompts par mission + étape *(3h)*
- [ ] Parser la réponse JSON de l'IA *(1h)*
- [ ] Fallback automatique sur vérification statique si Groq down *(1h)*
- [ ] Rate limiting — max 1 appel / utilisateur / 30 secondes *(1h)*

#### 🕵️ Détection code IA
- [ ] Service `aiDetector.js` — 6 signaux analysés *(2h)*
- [ ] Signal 1 — nommage verbeux vs abréviations humaines *(30 min)*
- [ ] Signal 2 — style de commentaires quoi vs pourquoi *(30 min)*
- [ ] Signal 3 — rupture de style avec étapes précédentes *(1h)*
- [ ] Signal 4 — complexité inadaptée au niveau *(30 min)*
- [ ] Signal 5 — imports parfaitement triés *(30 min)*
- [ ] Signal 6 — zéro imperfection à niveau débutant *(30 min)*
- [ ] Logique de seuil → entretien de compréhension *(1h)*
- [ ] 3 questions d'entretien générées depuis le code soumis *(1h)*

#### 🗄️ Base de données SQLite
- [ ] Installer `better-sqlite3` *(15 min)*
- [ ] Schéma table `users` *(30 min)*
- [ ] Schéma table `missions` *(30 min)*
- [ ] Schéma table `submissions` *(30 min)*
- [ ] Schéma table `progression` *(30 min)*
- [ ] Seeders — données initiales *(1h)*

#### 🔐 Authentification
- [ ] Route `POST /api/auth/register` *(1h)*
- [ ] Route `POST /api/auth/login` *(1h)*
- [ ] Middleware JWT — vérification token *(1h)*
- [ ] Hashage bcrypt des mots de passe *(30 min)*
- [ ] Page Login / Register côté Vue *(2h)*

---

### Sprint 5 — Gamification & contenu (~32h)

#### 🏅 Badges & achievements
- [ ] Service `badgeEngine.js` — logique de déclenchement *(2h)*
- [ ] Badge Premier Pas — première mission terminée *(30 min)*
- [ ] Badge DOM Sorcier — mission JS-03 terminée *(30 min)*
- [ ] Badge Speedrunner — mission en moins de 45 min *(30 min)*
- [ ] Badge Sans Filet — mission sans aucun indice *(30 min)*
- [ ] Badge Noctambule — soumission entre 23h et 4h *(30 min)*
- [ ] Badge Chasseur de Bugs — 3 corrections validées *(30 min)*
- [ ] Badge Streak 7 jours *(30 min)*
- [ ] Composant `BadgeToast.vue` — notification déclenchée *(1h)*
- [ ] Animation confetti au level up *(1h)*

#### 🔥 Streaks
- [ ] Logique de streak quotidienne *(1h)*
- [ ] Vérification de la dernière connexion active *(1h)*
- [ ] Affichage du streak dans la navbar *(30 min)*
- [ ] Notification si streak en danger *(1h)*

#### 📈 Page Progression
- [ ] Graphique de progression XP dans le temps *(2h)*
- [ ] Carte de chaleur d'activité style GitHub *(2h)*
- [ ] Historique des missions complétées *(1h)*
- [ ] Progression par langage — barres *(1h)*

#### 📝 Contenu — missions complètes avec règles de vérification
- [ ] JS-01 complet *(1h)*
- [ ] JS-02 complet *(1h)*
- [ ] JS-03 complet *(1h)*
- [ ] JS-04 complet *(1h)*
- [ ] PY-01 complet *(1h)*
- [ ] PY-02 complet *(1h)*
- [ ] PY-03 complet *(1h)*
- [ ] TS-01 complet *(1h)*
- [ ] TS-02 complet *(1h)*

#### 🔒 Système de prérequis
- [ ] Logique de lock/unlock selon niveau de cours *(2h)*
- [ ] Affichage Prérequis sur les cards lockées *(1h)*

#### ✨ Polish UI
- [ ] Animation level up — plein écran *(1h)*
- [ ] Toasts feedback — succès / erreur / info *(1h)*
- [ ] Micro-interactions — hover, clic, transition *(1h)*

---

### Sprint 6 — Deploy & beta (~28h)

#### 🚀 Déploiement
- [ ] Créer un compte Vercel et connecter le repo GitHub *(30 min)*
- [ ] Configurer les variables d'environnement Vercel *(30 min)*
- [ ] Déployer le frontend Vue sur Vercel *(1h)*
- [ ] Créer un compte Railway *(15 min)*
- [ ] Déployer le backend Express sur Railway *(1h)*
- [ ] Migrer SQLite → PostgreSQL sur Railway *(2h)*
- [ ] Configurer le domaine personnalisé si besoin *(1h)*

#### 🧪 Tests & qualité
- [ ] Tester le parcours complet — inscription → mission → XP *(2h)*
- [ ] Tester sur mobile — responsive check *(1h)*
- [ ] Tester la vérification IA — 10 codes différents *(1h)*
- [ ] Tester la détection code IA — code ChatGPT vs humain *(1h)*
- [ ] Corriger les bugs critiques identifiés *(3h)*
- [ ] Vérifier les performances — temps de chargement *(1h)*

#### 🌐 Landing page publique
- [ ] Page d'accueil non-connecté — pitch du projet *(2h)*
- [ ] Meta tags SEO — title, description, og:image *(1h)*
- [ ] Screenshot / démo GIF sur la landing *(1h)*

#### 👥 Beta privée
- [ ] Inviter 5 à 10 testeurs amis, Reddit, Discord *(30 min)*
- [ ] Créer un formulaire de feedback simple *(30 min)*
- [ ] Analyser les retours et prioriser les corrections *(2h)*
- [ ] Sprint de corrections post-beta *(4h)*

#### 🧰 Checklist technique finale
- [ ] `npm install pinia`
- [ ] `npm install @vueuse/core`
- [ ] `npm install codemirror`
- [ ] `npm install @vueuse/motion`
- [ ] `npm install axios`
- [ ] `npm install jsonwebtoken bcryptjs` (backend)
- [ ] `npm install better-sqlite3` (backend dev)
- [ ] `npm install groq-sdk` (backend)

#### 🔑 Comptes à créer
- [ ] GitHub — repo privé du projet
- [ ] console.groq.com — clé API gratuite Llama 3.1 70B
- [ ] vercel.com — déploiement frontend gratuit
- [ ] railway.app — déploiement backend + PostgreSQL gratuit

---

## Rappels technologies

Vue.js 3 : Composition API (setup, ref, computed, watch), props, emits, slots, directives, cycle de vie
TypeScript : Typage, interfaces, types, génériques
Nuxt.js : File-based routing, layouts, useAsyncData, auto-imports
Pinia : defineStore, state, getters, actions, storeToRefs

## Plugin Design — Skills actives

### /design-critique
Quand Anthonin demande une critique de design ou "qu'est-ce que tu penses de ce composant visuellement" :
- Analyser : hiérarchie visuelle, cohérence des couleurs, lisibilité, espacement
- Vérifier la cohérence avec le design system CodeQuest (variables CSS custom)
- Signaler les problèmes d'accessibilité (contraste, taille de clic)
- Toujours relier les problèmes à des concepts CSS/UX concrets (pas juste "c'est moche")

### /design-system
Quand Anthonin travaille sur BaseCard.vue, BaseBadge.vue, BaseButton.vue ou les variables CSS :
- Vérifier la cohérence des noms de variables
- Détecter les valeurs hardcodées qui devraient être des variables
- Proposer des tokens manquants (spacing, radius, shadow...)
- S'assurer que les composants de base sont réutilisables

### /design-handoff
Quand un composant est prêt à être implémenté :
- Générer les specs : dimensions, couleurs (avec les noms de variables), états (hover, focus, disabled)
- Documenter les props attendues du composant Vue
- Lister les cas limites (texte long, mobile, état vide)

### /accessibility-review
Quand Anthonin demande un audit accessibilité :
- Vérifier les contrastes WCAG AA (ratio 4.5:1 pour le texte)
- Vérifier les zones cliquables (min 44x44px)
- Vérifier les aria-label, rôles, navigation clavier
- Priorité : XPBar.vue, ProgressRing.vue, les boutons de mission

### /ux-copy
Quand Anthonin rédige des textes d'interface (boutons, messages d'erreur, états vides) :
- Proposer des formulations courtes, actives, en français
- Ton : encourageant et gamifié (cohérent avec CodeQuest)
- Exemples : "Déverrouiller — 50 XP" plutôt que "Cliquez pour débloquer l'indice"

### /user-research
Non applicable pour l'instant — à activer lors de la beta Sprint 6.

### /research-synthesis
À utiliser lors du Sprint 6 pour analyser les retours des testeurs beta.