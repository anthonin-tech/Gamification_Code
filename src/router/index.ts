import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProfilePage from '@/views/ProfilPage.vue'
import ProgressionPage from '@/views/ProgressionPage.vue'
import LanguagePage from '@/views/LanguagePage.vue'
import CoursPage from '@/views/CoursPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: 'Accueil' } },
    { path: '/profile', name: 'profile', component: ProfilePage, meta: { title: 'Mon Profil' } },
    { path: '/progression', name: 'progression', component: ProgressionPage, meta: { title: 'Ma Progression' } },
    { path: '/language', name: 'language', component: LanguagePage, meta: { title: 'Langages' } },
    { path: '/cours/:slug', name: 'cours', component: CoursPage, meta: { title: 'Cours' } },
    { path: '/cours', redirect: '/cours/javascript' },
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = `CodeQuest - ${to.meta.title || 'Application'}`
  next()
})

export default router