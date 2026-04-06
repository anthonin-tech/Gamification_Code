<script setup lang="ts">
import NavBar from './components/NavBar.vue';
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
