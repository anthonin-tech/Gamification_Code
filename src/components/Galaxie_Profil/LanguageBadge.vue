<script setup lang="ts">
import type{ Language } from "../../../types/profile.ts";

interface Props {
    language: Language
}

const props = defineProps<Props>()
</script>

<template>
    <div class="language-badge" :style="{ borderColor: language.color }">
        <div class="language-icon">
            {{  language.icon }}
        </div>
        <div class="language-name">
            {{ language.name }}
        </div>
        <div class="languuage-proficiency">
            {{ language.proficiency }}%
        </div>
    </div>
</template>

<style src="../../assets/styles/components/Galaxie_Profil/LanguageBadge.css"></style>
