# CR Étape 12 — Animation XP

## Ce qu'on a fait
- Ajout d'un bouton "Terminer la mission" dans `MissionDetailPage.vue`
- Animation d'un badge `+XP` qui part du bouton et file vers la barre XP de la navbar
- Mise à jour du store (`updateXp`) à la fin de l'animation via `async/await`

## Concepts vus

### `ref` sur un élément DOM
```vue
<script setup>
const monBtn = ref<HTMLElement | null>(null)
</script>
<template>
  <button ref="monBtn">...</button>
</template>
```
Quand `ref` est posé sur une balise HTML, `.value` contient l'élément DOM réel (pas une valeur réactive ordinaire).

### `getBoundingClientRect()`
Retourne les coordonnées d'un élément dans la fenêtre (`top`, `left`, `width`, `height`).
```js
const rect = monBtn.value.getBoundingClientRect()
// rect.left, rect.top = position en pixels depuis le coin haut-gauche de la fenêtre
```

### `document.querySelector()`
Sélectionne un élément DOM qu'on ne contrôle pas dans le composant courant.
```js
const xpBar = document.querySelector('.navbar-xpbar')
```

### CSS custom properties via `:style`
On passe des valeurs calculées en JS comme variables CSS pour les utiliser dans `@keyframes`.
```js
flyStyle.value = {
  left: startX + 'px',
  top: startY + 'px',
  '--dx': (endX - startX) + 'px',
  '--dy': (endY - startY) + 'px',
}
```
```css
@keyframes xp-fly {
  100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))); opacity: 0; }
}
```

### `<Teleport to="body">`
Déplace un nœud DOM dans `<body>`, hors du composant. Nécessaire pour que `position: fixed` et `z-index` fonctionnent sans être bloqués par un parent.
```vue
<Teleport to="body">
  <div v-if="flyingXp" class="xp-fly" :style="flyStyle">+XP</div>
</Teleport>
```
Le CSS de cet élément doit être dans un `<style>` **non scoped** car il est rendu hors du composant.

### `async/await` + `setTimeout`
Permet de séquencer des actions dans le temps sans bloquer.
```js
flyingXp.value = true
await new Promise(resolve => setTimeout(resolve, 900))  // attend 900ms
userStore.updateXp(mission.xpRecompense)                // l'XP monte quand le badge arrive
await new Promise(resolve => setTimeout(resolve, 200))
flyingXp.value = false                                  // on cache le badge
```

### Typage TypeScript des `ref`
```ts
const termineMissionBtn = ref<HTMLElement | null>(null)
const btnRect = ref<DOMRect | null>(null)
```
Sans le type explicite, TypeScript infère `Ref<null>` et ne sait pas que la valeur peut changer de type.

### Garde null en début de fonction
```js
if (!xpBar || !termineMissionBtn.value || !mission) return
```
Si l'un des trois est `null` ou `undefined`, on sort immédiatement. Après cette ligne, TypeScript sait qu'ils existent.

## Pourquoi ces choix techniques
- **`<Teleport>`** — évite les problèmes de `overflow: hidden` ou de `z-index` des parents ; l'élément flottant doit être au-dessus de tout
- **`transform` dans `@keyframes`, pas `left`/`top`** — `transform` est animé par le GPU, pas de recalcul du layout à chaque frame
- **CSS custom properties pour `--dx`/`--dy`** — `@keyframes` ne peut pas lire des variables JS directement ; les CSS vars font le pont
- **`async/await`** — plus lisible qu'un enchaînement de `setTimeout` imbriqués

## Points de difficulté
- `ref(null)` inféré comme `Ref<null>` — TypeScript ne sait pas que le ref sera un HTMLElement ; typage explicite nécessaire
- `document.querySelector()` peut retourner `null` — guard en début de fonction
- `<style scoped>` ne s'applique pas aux éléments téléportés — bloc `<style>` sans `scoped` requis

## À faire plus tard
- Désactiver le bouton après le premier clic (mission déjà terminée)
- Sauvegarder l'état "terminé" en localStorage
- Afficher un badge ou un état visuel différent si la mission est déjà complétée
