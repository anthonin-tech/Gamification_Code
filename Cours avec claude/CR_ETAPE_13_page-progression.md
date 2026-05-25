# CR Étape 13 — Page Progression

## Ce qu'on a fait
- Création de `ProgressionPage.vue` avec progression par langage (missions) et par cours (leçons Python)
- Ajout de `completeMissions: number[]` dans `useUserStore` avec persistance localStorage
- Appel de `updateMisssion(id)` dans `MissionDetailPage.vue` après animation XP
- Lecture des leçons Python terminées depuis la clé `'codequest_python_progress'` déjà gérée par `LeçonPython.vue`
- CSS avec couleurs identitaires par langage (JavaScript jaune, TypeScript bleu, Python bleu/or)

## Concepts vus

### `completeMissions` dans le store
```ts
// state
completeMissions: number[]

// action
updateMisssion(id: number) {
    this.completeMissions.push(id)
    localStorage.setItem('completeMissions', JSON.stringify(this.completeMissions))
}
```
`push()` ajoute un élément à la fin d'un tableau.

### `JSON.stringify` / `JSON.parse`
`localStorage` ne stocke que des strings. Pour sauvegarder un tableau :
```js
localStorage.setItem('completeMissions', JSON.stringify([1, 2, 3]))
// stocke → "[1,2,3]"

const saved = localStorage.getItem('completeMissions')
const missions = saved ? JSON.parse(saved) : []
// restitue → [1, 2, 3]
```
`String([1,2,3])` donne `"1,2,3"` (sans crochets, illisible) — toujours utiliser `JSON.stringify` pour les tableaux/objets.

### `includes()`
Vérifie si un élément est dans un tableau :
```js
[1, 2, 3].includes(2)  // true
[1, 2, 3].includes(5)  // false
```
Utilisé pour compter les missions terminées d'un langage :
```js
MISSIONS.filter(m => m.langage === langage && userStore.completeMissions.includes(m.missionId)).length
```

### `reduce()`
Accumule une valeur en parcourant un tableau :
```js
CURRICULUM_PYTHON.reduce((acc, module) => acc + module.lessons.length, 0)
// acc = accumulateur, commence à 0
// à chaque module, on ajoute le nombre de leçons
```

### `:class` dynamique avec concaténation
```vue
:class="'card-' + progression.langage"
```
Génère `card-javascript`, `card-python`, etc. pour appliquer le CSS couleur par langage.

### Lire un localStorage externe
`LeçonPython.vue` sauvegarde sa propre progression sous `'codequest_python_progress'`. On peut la lire directement depuis n'importe quel composant :
```js
const saved = localStorage.getItem('codequest_python_progress')
const pythonData = saved ? JSON.parse(saved) : null
const completedLessons = pythonData?.completedLessons ?? []
```

### `v-if` conditionnel dans un `v-for`
```vue
<div v-if="progression.langage === 'python'" class="cours-section">
  <!-- section leçons uniquement pour Python -->
</div>
```

## Pourquoi ces choix techniques
- **`JSON.stringify` pour localStorage** — `String()` sur un tableau donne `"1,2,3"` sans crochets, impossible à re-parser proprement
- **Lecture directe du localStorage Python** — `LeçonPython.vue` gère déjà sa propre persistance ; pas besoin de dupliquer dans le store
- **`reduce()` pour le total de leçons** — on additionne les `.length` de chaque module en une seule passe

## Points de difficulté
- `this.` dans `<script setup>` — n'existe pas, c'est l'Options API ; en Composition API on utilise des `const` directement
- `String(tableau)` vs `JSON.stringify(tableau)` — `String` ne préserve pas la structure JSON
- Section cours **dans** le `v-for` — mettre la section hors de la boucle la répétait pour chaque langage ; il faut `v-if` à l'intérieur

## À faire plus tard
- Suivi des leçons pour les autres langages (JavaScript, TypeScript)
- Désactiver le bouton "Terminer" si mission déjà dans `completeMissions`
- Afficher un titre de page ou un header sur la page Progression
