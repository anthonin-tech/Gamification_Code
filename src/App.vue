<script setup lang="ts">
import { onMounted } from 'vue';
import NavBar from './components/layout/NavBar.vue';
import { useUserStore } from './stores/useUserStore';

const userStore = useUserStore()

onMounted(async () => {
  const response = await fetch('/api/auth/profil', { credentials: 'include' })
  if (response.ok) {
    const data =  await response.json()
    userStore.initUser({
      userXP: data.user.xp,
      username: data.user.username,
      badges: data.user.badges,
      completeMissions: data.user.completeMissions
    })
  }
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
