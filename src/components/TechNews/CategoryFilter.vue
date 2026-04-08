<script setup lang="ts">
import { CATEGORIES } from '../../../types/article';

defineProps<{
    modelValue: string
}>()

defineEmits<{
    'update:modelValue': [value: string]
}>()

const categories = CATEGORIES
</script>

<template>
    <div class="category-filter">
        <button
            v-for="cat in categories"
            :key="cat"
            :class="['filter-btn', { active: modelValue === cat }]"
            @click="$emit('update:modelValue', cat)"
        >
        {{ cat }}
        </button>
    </div>
</template>

