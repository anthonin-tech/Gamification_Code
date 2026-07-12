<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { useBadge } from '@/composables/useBadge'
import FavoriteLanguages from '@/components/profile/FavoriteLanguages.vue'

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const username = ref('')
const error = ref('')

const router = useRouter()
const userStore = useUserStore()

const { checkAndUnlock } = useBadge()

async function loadUser() {
    const res = await fetch('/api/auth/profil', { credentials: 'include' })
    if (res.ok) {
        const { user } = await res.json()
        userStore.initUser({ 
            username: user.username, 
            userXP: user.xp, 
            badges: user.badges, 
            completeMissions: user.completeMissions,
            favoriteLanguages: user.favoriteLanguages 
        })
    }
}

async function handleLogin() {
    if (!email.value || !password.value) {
        error.value = 'Les champs sont vides'
        return
    }
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email: email.value, password: password.value })
    })
    if (response.ok) {
        await loadUser()
        router.push('/')
    } else {
        error.value = 'Email ou mot de passe incorrect'
    }
}

async function handleRegister() {
    if (!email.value || !password.value || !username.value) {
        error.value = 'Les champs sont vides'
        return
    }
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username.value, email: email.value, password: password.value })
    })
    const data = await response.json()
    if (response.ok) {
        await loadUser()
        await checkAndUnlock(1, 1)
        router.push('/')
    } else {
        error.value = data.error ?? 'Erreur lors de l\'inscription'
    }
}

</script>

<template>
    <div class="login-page">
        <div class="login-card">
            <h1 class="login-title">CodeQuest</h1>
            <p class="login-subtitle">{{ isLogin ? 'Connecte-toi pour continuer' : 'Crée ton compte' }}</p>

            <p v-if="error" class="login-error">{{ error }}</p>

            <div v-if="isLogin" class="login-fields">
                <input class="login-input" v-model="email" placeholder="Entrez votre mail" />
                <input class="login-input" v-model="password" type="password" placeholder="Entrez votre mot de passe" />
            </div>
            <div v-else class="login-fields">
                <input class="login-input" v-model="username" placeholder="Entrez votre surnom" />
                <input class="login-input" v-model="email" placeholder="Entrez votre mail" />
                <input class="login-input" v-model="password" type="password" placeholder="Entrez votre mot de passe" />
                <input class="login-input" v-model="password_confirmation" type="password" placeholder="Confirmer votre mot de passe" />
                <div v-if="password && password_confirmation && password !== password_confirmation" class="login-password-mismatch">
                    Les mots de passe ne correspondent pas
                </div>
            </div>

            <div class="login-actions">
                <button class="login-btn-primary" @click="isLogin ? handleLogin() : handleRegister()">
                    {{ isLogin ? 'Se connecter' : "S'inscrire" }}
                </button>
                <button class="login-btn-secondary" @click="isLogin = !isLogin">
                    {{ isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped src="@/assets/styles/pages/login.css" />