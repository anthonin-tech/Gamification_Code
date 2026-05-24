<script setup lang="ts">
const props = defineProps<{
    label: string,
    variant?: string
}>()

const emit = defineEmits(['click'])
</script>

<template>
    <button :class="variant" @click="emit('click')">{{ label }}</button>
</template>

<style scoped src="@/assets/styles/components/Base/BaseButton.css" />