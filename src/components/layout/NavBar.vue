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
      <router-link to="/" class="navbar-brand">CodeQuest</router-link>

      <div class="navbar-links">
        <router-link to="/cours" class="navbar-link">Cours</router-link>
        <router-link to="/mission" class="navbar-link">Mission</router-link>
        <router-link to="/language" class="navbar-link">Language</router-link>
        <router-link to="/progression" class="navbar-link">Progression</router-link>
        <router-link to="/profile" class="navbar-link" v-if="userStore.isLoggedIn">Profil</router-link>
      </div>

      <div class="navbar-user" v-if="userStore.isLoggedIn">
        <div class="navbar-user__info">
          <span class="navbar-user__label">Niveau</span>
          <span class="navbar-user__level">{{ currentLevel }}</span>
        </div>
        <div class="navbar-xpbar">
          <XpBar :percent="progressPercent" :level="currentLevel" />
        </div>
      </div>

      <div class="navbar-avatar" v-else>
        <router-link to="/login">
          <svg viewBox="74 10 96 125" xmlns="http://www.w3.org/2000/svg" class="navbar-avatar__svg">
            <defs>
              <radialGradient id="nb-head-grad" cx="40%" cy="35%">
                <stop offset="0%"   stop-color="#60a5fa"/>
                <stop offset="60%"  stop-color="#2563eb"/>
                <stop offset="100%" stop-color="#1d4ed8"/>
              </radialGradient>
            </defs>
            <ellipse cx="120" cy="96" rx="43" ry="41" fill="url(#nb-head-grad)"/>
            <ellipse cx="107" cy="78" rx="14" ry="10" fill="white" opacity="0.08"/>
            <ellipse cx="107" cy="86" rx="8" ry="8" fill="white"/>
            <ellipse cx="133" cy="86" rx="8" ry="8" fill="white"/>
            <circle cx="107" cy="86" r="5" fill="#1e3a8a"/>
            <circle cx="133" cy="86" r="5" fill="#1e3a8a"/>
            <circle cx="108.5" cy="84.5" r="2" fill="white"/>
            <circle cx="134.5" cy="84.5" r="2" fill="white"/>
            <path d="M110 106 Q120 115 130 106" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <ellipse cx="98"  cy="100" rx="6" ry="4" fill="#f9a8d4" opacity="0.25"/>
            <ellipse cx="142" cy="100" rx="6" ry="4" fill="#f9a8d4" opacity="0.25"/>
            <path d="M76 76 Q78 61 120 51 Q162 61 164 76 Z" fill="#150d2e"/>
            <rect x="68" y="73" width="104" height="9" rx="2" fill="#0d0820"/>
            <line x1="76" y1="75" x2="164" y2="75" stroke="#fbbf24" stroke-width="2" opacity="0.9"/>
            <rect x="111" y="68" width="18" height="11" rx="3" fill="#6b2d0a"/>
            <rect x="113" y="70" width="14" height="7"  rx="2" fill="#fbbf24"/>
            <rect x="116" y="72" width="8"  height="3"  rx="1" fill="#78350f"/>
            <path d="M110 51 Q115 26 120 12 Q125 26 130 51 Z" fill="#0d0820"/>
            <text x="120" y="40" text-anchor="middle" fill="#8b5cf6" font-size="11" font-family="monospace" font-weight="bold">&lt;/&gt;</text>
          </svg>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped src="@/assets/styles/components/navbar.css"></style>
