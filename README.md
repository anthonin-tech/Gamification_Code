# 🚀 CodeQuest

Application d'apprentissage de la programmation avec gamification, éditeur de code intégré et suivi de progression.

## 📁 Structure du projet

```
codequest/
├── src/
│   ├── assets/
│   │   ├── editor-themes.ts        # Thèmes de l'éditeur CodeMirror
│   │   └── styles/
│   │       ├── base.css            # Variables CSS, reset, styles globaux
│   │       ├── components.css      # Composants réutilisables
│   │       ├── utilities.css       # Classes utilitaires
│   │       ├── components/         # Styles par composant (Base, Galaxie_Profil, Code_Home, Cours...)
│   │       └── pages/               # Styles par page (home, cours, lecon, galaxie, progression...)
│   ├── components/
│   │   ├── base/                   # Composants de base (BaseButton, BaseCard, BaseBadge, XpBar...)
│   │   ├── layout/                 # Composants de layout (NavBar, etc.)
│   │   ├── home/                   # Composants page d'accueil
│   │   ├── profile/                # Composants profil / galaxie
│   │   ├── language/                # Composants langages
│   │   ├── cours/                   # Composants cours et leçons
│   │   ├── news/                    # Composants actualités tech
│   │   └── Terminal/                 # Terminal / éditeur de code interactif
│   ├── composables/                 # Logique réutilisable
│   │   ├── useXP.ts                 # Gestion de l'XP
│   │   ├── useBadge.ts              # Gestion des badges
│   │   ├── useGalaxie.ts            # Gestion de la galaxie des succès
│   │   ├── useMissionLock.ts        # Verrouillage des missions
│   │   ├── useTimer.ts              # Minuteur
│   │   └── Verification.ts          # Vérification du code soumis
│   ├── stores/
│   │   └── useUserStore.ts          # Store Pinia : utilisateur, auth, session
│   ├── types/                       # Types TypeScript (achievement, cours, langage, missions, profil...)
│   ├── utils/
│   │   ├── animations.ts            # Utilitaires d'animation
│   │   ├── avatarScene.ts           # Scène 3D de l'avatar (Three.js / TresJS)
│   │   └── constants.ts             # Constantes globales
│   ├── data/                        # Données statiques (curriculums par langage, missions, badges...)
│   ├── views/                       # Pages de l'application
│   │   ├── HomePage.vue
│   │   ├── ProfilPage.vue
│   │   ├── ProgressionPage.vue
│   │   ├── LanguagePage.vue
│   │   ├── CoursPage.vue
│   │   ├── LeçonPage.vue
│   │   ├── MissionPage.vue / MissionDetailPage.vue
│   │   ├── GalaxyPage.vue
│   │   ├── AvatarPage.vue
│   │   └── LoginPage.vue
│   ├── router/
│   │   └── index.ts                 # Routes + garde d'authentification
│   ├── App.vue
│   └── main.ts
├── server/                          # API TypeScript (endpoints, modèles Mongoose, plugin MongoDB)
├── backend/                         # Serveur Node.js (auth JWT, users, scraper RSS, cron)
├── config/                          # Fichiers de configuration / notes
├── public/                          # Assets publics
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Stack technique

- **Frontend** : Vue 3 + TypeScript + Vite
- **State management** : Pinia
- **Éditeur de code** : CodeMirror 6 (JS, Python, Java, C++, PHP, Rust...)
- **Avatar 3D** : Three.js / TresJS
- **Backend** : serveur Node.js natif (`backend/`) + API TypeScript (`server/`)
- **Base de données** : MongoDB (Mongoose)
- **Tests** : Vitest

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le frontend (Vite)
npm run dev

# Lancer le backend (sans MongoDB requis)
npm run dev:backend

# Lancer le backend (MongoDB obligatoire)
npm run dev:backend:strict

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview

# Lancer les tests
npm test
```

## 📚 Concepts clés

### Composables
Les composables (`use*.ts` dans `src/composables/`) encapsulent la logique métier avec réactivité Vue.

```vue
<script setup lang="ts">
import { useXP } from '@/composables/useXP'

const { xp, addXp } = useXP()
</script>
```

### Store Pinia
`useUserStore` centralise l'état de l'utilisateur (profil, session, authentification).

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
</script>
```

### Types centralisés
Les types du domaine (profil, cours, missions, achievements, langages) vivent dans `src/types/`.

```typescript
import type { Profil, Mission, Achievement } from '@/types'
```

## 🎨 Styles

### Variables CSS
Couleurs, espacements et autres valeurs globales sont définis dans `src/assets/styles/base.css`.

```css
:root {
  --primary: #7c3aed;
  --spacing-md: 16px;
  --radius-md: 14px;
}
```

### Organisation
- `styles/components/` — styles rattachés à un composant précis (Base, Galaxie_Profil, Code_Home, Cours...)
- `styles/pages/` — styles rattachés à une vue précise (home, cours, lecon, galaxie, login...)
- `components.css` / `utilities.css` — classes réutilisables et utilitaires transverses

## 🔧 Alias de paths

Le projet utilise `@/` pour référencer le dossier `src/` (configuré dans `vite.config.ts` et `tsconfig.json`).

```typescript
// Au lieu de
import NavBar from '../../../components/layout/NavBar.vue'

// Écrire
import NavBar from '@/components/layout/NavBar.vue'
```

## 🐛 Déboggage

**Erreur d'import `Cannot find module '@/...'`**
→ Vérifier que `vite.config.ts` (`resolve.alias`) et `tsconfig.json` (`paths`) sont corrects.

**Le backend refuse de démarrer sans MongoDB**
→ Utiliser `npm run dev:backend` (MongoDB optionnel) plutôt que `dev:backend:strict`, ou démarrer Mongo via `docker compose -f docker-compose.mongo.yml up -d`.

## 🆘 Ressources

- Vue 3 : https://vuejs.org
- Vite : https://vitejs.dev
- Pinia : https://pinia.vuejs.org
- TresJS : https://tresjs.org
- CodeMirror : https://codemirror.net
