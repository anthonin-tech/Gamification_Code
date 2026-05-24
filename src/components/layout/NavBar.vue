<script setup lang="ts">
import { useXP } from "@/composables/useXP"
import XpBar from "@/components/base/XpBar.vue";
const { currentLevel, progressPercent } = useXP()

</script>


<template>
  <nav class="navbar" aria-label="Navigation principale">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">CodeQuest</router-link>

      <div class="navbar-links">
        <router-link to="/cours" class="navbar-link">Cours</router-link>
        <router-link to="/mission" class="navbar-link">Mission</router-link>
        <router-link to="/language" class="navbar-link">Language</router-link>
        <router-link to="/progression" class="navbar-link">Progression</router-link>
        <router-link to="/profile" class="navbar-link">Profil</router-link>
      </div>

      <div class="navbar-user">
        <div class="navbar-user__info">
          <span class="navbar-user__label">Niveau</span>
          <span class="navbar-user__level">{{ currentLevel }}</span>
        </div>
        <div class="navbar-xpbar">
          <XpBar :percent="progressPercent" :level="currentLevel" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped src="@/assets/styles/components/navbar.css"></style>
