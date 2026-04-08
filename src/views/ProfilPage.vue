<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfile } from '../composables/useProfile';
import Background from '../components/Galaxie_Profil/Background.vue'
import ProfileCard from '../components/Galaxie_Profil/ProfileCard.vue'

const { profile, loading, error, fetchProfile } = useProfile()

onMounted(() => {
  document.title = 'Mon profil Galaxie'
  const description = 'Profil developpeur avec statistiques de progression'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', description)
  fetchProfile()
})
</script>

<template>
  <div class="galaxy-profile-page">
    <Background />
    <div class="profile-container">
      <div v-if="loading" class="loading-state">
        <div class="spinner" />
        <p>Chargement en cours...</p>
      </div>
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchProfile" class="retry-button">
          Réessayer
        </button>
      </div>
      <ProfileCard
        v-else-if="profile"
        :profile="profile"
      />
    </div>
  </div>
</template>

<style scoped src="../assets/styles/pages/profile.css"></style>
