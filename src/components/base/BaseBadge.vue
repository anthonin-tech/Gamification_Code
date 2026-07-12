<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icone: {
        type: String,
        required: true 
    },
    unlocked: {
        type: Boolean,
        default: false 
    },
    progression: {
        type: Number,
    },
    progressionMax: {
        type: Number,
        default: 1
    }
})
</script>

<template>
    <div class="badge-card" :class="{ 'badge-locked': !unlocked }">
        <span v-if="!unlocked">🔒</span>
        <span v-else>🔓</span>
        <h3>{{ title }}</h3>
    </div>
</template>

<style scoped src="@/assets/styles/components/Base/BaseBadge.css"  />