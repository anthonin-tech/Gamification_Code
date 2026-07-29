<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LANGAGES } from '@/data/langages'
import { COURS_DATA } from '@/data/cours'
import CoursPageLanguage from '@/components/cours/CoursPageLanguage.vue'

const route  = useRoute()
const router = useRouter()

const slug    = computed(() => (route.params.slug as string).toLowerCase())
const langage = computed(() => LANGAGES.find(l => l.slug === slug.value) ?? null)
const cours   = computed(() => COURS_DATA.find(c => c.slug === slug.value) ?? null)

onMounted(() => {
  if (!langage.value) router.replace('/cours/javascript')
})
</script>

<template>
  <CoursPageLanguage
    v-if="langage && cours"
    :langage="langage"
    :cours="cours"
  />
</template>
