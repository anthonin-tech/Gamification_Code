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

<style scoped>
.xp-bar {
    width: 100%;
    height: 8px;
    background: var(--surface-2);
    border-radius: 999px;
    overflow: hidden;
}

.xp-bar_fill {
    height: 100%;
    background: var(--gradient);
    border-radius: 999px;
    transition: width 0.4s ease;
    position: relative;
}

.xp-bar_fill-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25));
    border-radius: 999px;
}

.xp-bar_pct {
    margin: 6px 0 0;
    font-size: 12px;
    color: var(--muted);
}
</style>
