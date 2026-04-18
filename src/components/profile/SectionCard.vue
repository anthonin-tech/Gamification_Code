<script setup lang="ts">
interface Props {
  iconColor?: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <section class="galaxy-section">
    <div class="galaxy-section__header">
      <div
        v-if="$slots.icon"
        class="galaxy-section__icon"
        :style="iconColor ? { color: iconColor } : {}"
        aria-hidden="true"
      >
        <slot name="icon" />
      </div>
      <h2 class="galaxy-section__title">{{ title }}</h2>
    </div>

    <div class="galaxy-section__body">
      <slot />
    </div>
  </section>
</template>

<style src="@/assets/styles/components/Galaxie_Profil/SectionCard.css"></style>