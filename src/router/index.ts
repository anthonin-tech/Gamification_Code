import { createRouter, createWebHistory, useRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProfilePage from '@/views/ProfilPage.vue'
import ProgressionPage from '@/views/ProgressionPage.vue'
import LanguagePage from '@/views/LanguagePage.vue'
import CoursPage from '@/views/CoursPage.vue'
import LeçonPython     from '@/views/Leçon/LeçonPython.vue'
import LeçonJavaScript from '@/views/Leçon/LeçonJavaScript.vue'
import LeçonTypeScript from '@/views/Leçon/LeçonTypeScript.vue'
import LeçonJava       from '@/views/Leçon/LeçonJava.vue'
import LeçonPHP        from '@/views/Leçon/LeçonPHP.vue'
import LeçonGo         from '@/views/Leçon/LeçonGo.vue'
import LeçonCPP        from '@/views/Leçon/LeçonCPP.vue'
import LeçonRust       from '@/views/Leçon/LeçonRust.vue'
import LeçonCSharp     from '@/views/Leçon/LeçonCSharp.vue'
import MissionPage from '@/views/MissionPage.vue'
import MissionDetailPage from '@/views/MissionDetailPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { useUserStore } from '@/stores/useUserStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: 'Accueil' } },
    { path: '/profile', name: 'profile', component: ProfilePage, meta: { title: 'Mon Profil', requiresAuth: true } },
    { path: '/progression', name: 'progression', component: ProgressionPage, meta: { title: 'Ma Progression' } },
    { path: '/language', name: 'language', component: LanguagePage, meta: { title: 'Langages' } },
    { path: '/cours/:slug', name: 'cours', component: CoursPage, meta: { title: 'Cours' } },
    { path: '/cours', redirect: '/cours/javascript' },
    { path: '/mission', name: 'mission', component: MissionPage, meta: { title: 'Mission'} },
    { path: '/login', name: 'connexion', component: LoginPage, meta: { title: 'Connexion'}},

    { path: '/cours/python/learn',     name: 'leconPython',     component: LeçonPython,     meta: { title: 'Leçon Python' } },
    { path: '/cours/javascript/learn', name: 'leconJavaScript', component: LeçonJavaScript, meta: { title: 'Leçon JavaScript' } },
    { path: '/cours/typescript/learn', name: 'leconTypeScript', component: LeçonTypeScript, meta: { title: 'Leçon TypeScript' } },
    { path: '/cours/java/learn',       name: 'leconJava',       component: LeçonJava,       meta: { title: 'Leçon Java' } },
    { path: '/cours/php/learn',        name: 'leconPHP',        component: LeçonPHP,        meta: { title: 'Leçon PHP' } },
    { path: '/cours/go/learn',         name: 'leconGo',         component: LeçonGo,         meta: { title: 'Leçon Go' } },
    { path: '/cours/cpp/learn',        name: 'leconCPP',        component: LeçonCPP,        meta: { title: 'Leçon C++' } },
    { path: '/cours/rust/learn',       name: 'leconRust',       component: LeçonRust,       meta: { title: 'Leçon Rust' } },
    { path: '/cours/csharp/learn',     name: 'leconCSharp',     component: LeçonCSharp,     meta: { title: 'Leçon C#' } },

    {
      path: '/mission/:id',
      name: 'missionDetail',
      component: MissionDetailPage,
      meta: { title: 'Detail' }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  document.title = `CodeQuest - ${to.meta.title || 'Application'}`
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return next('/login')
  }
  next()
})

export default router