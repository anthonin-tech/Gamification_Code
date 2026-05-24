<script setup lang="ts">
import { onMounted } from 'vue';
import NavBar from './components/layout/NavBar.vue';
import { USER_PROFILE } from './data/profil';
import { useUserStore } from './stores/useUserStore';

const userStore = useUserStore()

onMounted(() => {
    userStore.initUser({
    userXP: USER_PROFILE.xp,
    userLevel: USER_PROFILE.level,
    username: USER_PROFILE.username,
  })
})
</script>

<template>
  <div class="app-shell">
    <NavBar />
    <div class="app-main">
      <router-view />
    </div>
  </div>
</template>

<style>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1 1 auto;
  min-height: 0;
}
</style>
