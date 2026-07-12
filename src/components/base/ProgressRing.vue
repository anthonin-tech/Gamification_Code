<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    percent: number
}>()

const radius = 36
const circumference = 2 * Math.PI * radius
const offset = computed(() => circumference - (props.percent / 100) * circumference)
</script>

<template>
    <svg class="progress-ring" viewBox="0 0 88 88">
        <circle class="progress-ring__track" cx="44" cy="44" :r="radius" />
        <circle
            class="progress-ring__fill"
            cx="44" cy="44"
            :r="radius"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="offset"
        />
        <text class="progress-ring__text" x="44" y="49" text-anchor="middle">
            {{ percent }}%
        </text>
    </svg>
</template>

<style scoped src="@/assets/styles/components/Base/ProgressRing.css" />

