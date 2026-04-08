<script setup lang="ts">
import type { Langage } from "../../../types/langage.ts"

defineProps<{
    langage: Langage | null
}>()

defineEmits<{
    fermer: []
}>()
</script>

<template>
    <Transition name="panneau">
        <aside v-if="langage" class="lang-panel">
            <button class="lang-panel__close" @click="$emit('fermer')">×</button>
            <div class="lang-panel__sym" :style="{ color: langage.couleur, background: `${langage.couleur}22`}">{{ langage.sym }}
            </div>
            <h2 class="lang-panel__name">{{ langage.nom }}</h2>
            <p class="lang-panel__meta">Crée en {{ langage.annee }} • {{ langage.createur }}</p>

            <p class="lang-panel__desc">{{ langage.description }}</p>

            <div class="lang-panel__section">
                <span class="lang-panel__label">Utilisé pour</span>
                <p class="lang-panel__value">{{ langage.usage }}</p>
            </div>

            <div class="lang-panel__section">
                <span class="lang-panel__label">Popularité</span>
                <div class="lang-panel__bar">
                    <div class="lang-panel__bar-fill" :style="{ width: langage.popularite + '%', background: langage.couleur}" />
                </div>
                <p class="lang-panel__stat">{{ langage.popularite }}% des devs l'utilisent</p>
            </div>

            <div v-if="langage.liens?.length" class="lang-panel__section">
                <span class="lang-panel__label">Ressources</span>
                <div class="lang-panel__links">
                    <button v-for="lien in langage.liens" :key="lien" class="lang-panel__link">{{ lien }}</button>
                </div>
            </div>
        </aside>
    </Transition>
</template>
