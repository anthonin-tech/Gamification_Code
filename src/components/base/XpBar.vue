<script setup lang="ts">
const props= defineProps<{
    percent: number
    level: number
}>()

</script>

<template>
    <div class="xp-bar" role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100">
      <div class="xp-bar_fill" :style="{ width: percent + '%' }">
        <div class="xp-bar_fill-glow" />
      </div>
    </div>

    <p class="xp-bar_pct">{{ percent }}% vers le niveau {{ props.level + 1 }}</p>
</template>

<style scoped src="./XpBar.css"></style>
