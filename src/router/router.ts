import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProfilPage from '../views/ProfilPage.vue'
import ProgressionPage from '../views/ProgressionPage.vue'
import LanguagePage from '../views/Language.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilPage,
    },
    {
      path: '/progression',
      name: 'progression',
      component: ProgressionPage,
    },
    {
      path: '/languagege',
      name: 'language',
      component: LanguagePage,
    },
  ],
})

export default router
