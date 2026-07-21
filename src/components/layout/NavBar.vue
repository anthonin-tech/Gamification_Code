<script setup lang="ts">
import { useXP } from "@/composables/useXP"
import XpBar from "@/components/base/XpBar.vue";
import { useUserStore } from "@/stores/useUserStore";

const { currentLevel, progressPercent } = useXP()
const userStore = useUserStore()

</script>


<template>
  <nav class="navbar" aria-label="Navigation principale">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">
        <span class="navbar-planet">
          <span class="navbar-planet__ring"></span>
        </span>
        CODEQUEST
      </router-link>

      <div class="navbar-links">
        <router-link to="/cours" class="navbar-link">Cours</router-link>
        <router-link to="/mission" class="navbar-link">Missions</router-link>
        <router-link to="/language" class="navbar-link">Langages</router-link>
        <router-link to="/progression" class="navbar-link">Progression</router-link>
        <router-link to="/galaxy" class="navbar-link">Succès</router-link>
      </div>

      <router-link to="/profile" class="navbar-user" v-if="userStore.isLoggedIn">
        <span class="navbar-user__sphere">🧑‍🚀</span>
        <div class="navbar-user__info">
          <span class="navbar-user__lvl">NIV {{ currentLevel }}</span>
          <div class="navbar-xpbar">
            <XpBar :percent="progressPercent" :level="currentLevel" />
          </div>
        </div>
      </router-link>

      <div class="navbar-avatar" v-else>
        <router-link to="/login" class="navbar-login-btn">CONNEXION</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped src="@/assets/styles/components/navbar.css"></style>
