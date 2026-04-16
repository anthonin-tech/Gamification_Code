# 🚀 CodeQuest - Version Réorganisée

Application d'apprentissage de la programmation avec gamification et suivi de progression.

## 📁 Structure du projet

```
codequest/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── base.css           # Variables CSS, reset, styles globaux
│   │       ├── components.css     # Composants réutilisables
│   │       └── utilities.css      # Classes utilitaires
│   ├── components/
│   │   ├── layout/                # Composants de layout (NavBar, etc.)
│   │   ├── home/                  # Composants page d'accueil
│   │   ├── profile/               # Composants profil utilisateur
│   │   ├── language/              # Composants langages
│   │   ├── progression/           # Composants progression
│   │   └── news/                  # Composants actualités tech
│   ├── composables/               # Logique réutilisable
│   │   ├── useProfile.ts          # Gestion du profil
│   │   ├── useLanguages.ts        # Gestion des langages
│   │   └── useProgression.ts      # Gestion de la progression
│   ├── stores/                    # Stores Pinia (état global)
│   │   ├── profile.ts             # Store profil
│   │   └── user.ts                # Store préférences utilisateur
│   ├── types/
│   │   └── index.ts               # Types TypeScript centralisés
│   ├── utils/
│   │   ├── animations.ts          # Utilitaires d'animation
│   │   └── constants.ts           # Constantes globales
│   ├── views/                     # Pages de l'application
│   │   ├── HomePage.vue
│   │   ├── ProfilePage.vue
│   │   ├── LanguagePage.vue
│   │   └── ProgressionPage.vue
│   ├── router/
│   │   └── index.ts               # Configuration du router
│   ├── data/                      # Données statiques
│   │   ├── profil.ts
│   │   └── langages.ts
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Changements principaux

### ✅ Corrections
- **URL router** : `/languagege` → `/language` (CORRIGÉ)
- **Imports** : Centralisés via `@/types`
- **Structure** : Composants organisés par fonctionnalité

### ✨ Nouveautés
- **Pinia** : Gestion d'état globale
- **Composables** : Logique métier réutilisable
- **CSS consolidé** : 3 fichiers au lieu de 14+
- **Types centralisés** : Import simplifié
- **Utilitaires** : Animations et constantes

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## 📚 Concepts clés

### Composables
Les composables (fichiers `use*.ts`) encapsulent la logique métier avec réactivité Vue.

**Exemple d'utilisation :**
```vue
<script setup lang="ts">
import { useProfile } from '@/composables/useProfile'

const { profile, loading, loadProfile } = useProfile()

onMounted(() => {
  loadProfile()
})
</script>
```

### Stores Pinia
Les stores gèrent l'état global partagé entre composants.

**Exemple d'utilisation :**
```vue
<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()
profileStore.loadProfile()
</script>
```

### Types centralisés
Tous les types sont exportés depuis `@/types`.

```typescript
import type { UserProfile, Achievement, Language } from '@/types'
```

## 🎨 Styles

### Variables CSS
Toutes les couleurs, espacements, et autres valeurs sont définies en variables CSS dans `base.css`.

```css
:root {
  --primary: #7c3aed;
  --spacing-md: 16px;
  --radius-md: 14px;
}
```

### Composants réutilisables
Classes prêtes à l'emploi dans `components.css` :
- `.card`, `.btn`, `.badge`
- `.progress-bar`, `.stat-card`
- `.skeleton`, `.spinner`

### Classes utilitaires
Classes Tailwind-like dans `utilities.css` :
- Flexbox : `.flex`, `.items-center`, `.justify-between`
- Grid : `.grid`, `.grid-cols-3`
- Spacing : `.mt-md`, `.p-lg`
- Text : `.text-center`, `.font-bold`

## 🔧 Configuration

### Alias de paths
Le projet utilise `@/` pour référencer le dossier `src/`.

```typescript
// Au lieu de
import NavBar from '../../../components/layout/NavBar.vue'

// Écrire
import NavBar from '@/components/layout/NavBar.vue'
```

## 📖 Bonnes pratiques

1. **Composants** : Un composant = une responsabilité
2. **Composables** : Extraire la logique métier
3. **Stores** : Pour l'état partagé entre plusieurs pages
4. **Types** : Typer toutes les props et données
5. **CSS** : Utiliser les variables et classes existantes

## 🎓 Pour apprendre

Chaque fichier contient des commentaires explicatifs. Commencez par :
1. `composables/useProfile.ts` - Comprendre les composables
2. `stores/profile.ts` - Comprendre Pinia
3. `components/layout/NavBar.vue` - Structure d'un composant

## 🐛 Déboggage

### Problèmes courants

**Erreur d'import** :
```
Cannot find module '@/...'
```
→ Vérifier que `vite.config.ts` et `tsconfig.json` sont corrects

**Pinia non trouvé** :
```
Cannot find name 'defineStore'
```
→ Installer Pinia : `npm install pinia`

## 📝 Prochaines étapes

1. ✅ Tester que tout fonctionne (`npm run dev`)
2. 📱 Implémenter le mode responsive
3. 🎨 Ajouter le toggle dark/light mode
4. 🔔 Ajouter les notifications toast
5. 📊 Créer les graphiques de progression

## 🆘 Besoin d'aide ?

- Documentation Vue.js : https://vuejs.org
- Documentation Pinia : https://pinia.vuejs.org
- Documentation Vue Router : https://router.vuejs.org

---

Bon courage dans votre apprentissage ! 🎉
