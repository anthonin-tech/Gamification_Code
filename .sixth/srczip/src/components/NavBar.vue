<template>
  <nav class="navbar" aria-label="Navigation principale">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">CodeQuest</router-link>

      <div class="navbar-links">
        <router-link to="/language" class="navbar-link">Language</router-link>
        <router-link to="/progression" class="navbar-link">Progression</router-link>
        <router-link to="/profil" class="navbar-link">Profil</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped src="@/assets/styles/components/navbar.css"></style>

