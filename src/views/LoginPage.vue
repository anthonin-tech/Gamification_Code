<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { useBadge } from '@/composables/useBadge'

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
            favoriteLanguages: user.favoriteLanguages,
            avatarCustomization: user.avatarCustomization
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
            <div class="login-planet">&lt;/&gt;</div>

            <div class="login-header">
                <h1 class="login-title">{{ isLogin ? 'EMBARQUEMENT' : 'ENRÔLEMENT' }}</h1>
                <p class="login-subtitle">{{ isLogin ? 'Connecte-toi pour reprendre ta mission' : 'Crée ton compte spatial' }}</p>
            </div>

            <p v-if="error" class="login-error">{{ error }}</p>

            <div v-if="isLogin" class="login-fields">
                <label class="login-label">
                    EMAIL
                    <input class="login-input" v-model="email" type="email" placeholder="astronaute@codequest.dev" />
                </label>
                <label class="login-label">
                    MOT DE PASSE
                    <input class="login-input" v-model="password" type="password" placeholder="••••••••" />
                </label>
            </div>
            <div v-else class="login-fields">
                <label class="login-label">
                    PSEUDO
                    <input class="login-input" v-model="username" placeholder="NomDePilote" />
                </label>
                <label class="login-label">
                    EMAIL
                    <input class="login-input" v-model="email" type="email" placeholder="astronaute@codequest.dev" />
                </label>
                <label class="login-label">
                    MOT DE PASSE
                    <input class="login-input" v-model="password" type="password" placeholder="••••••••" />
                </label>
                <label class="login-label">
                    CONFIRMER
                    <input class="login-input" v-model="password_confirmation" type="password" placeholder="••••••••" />
                </label>
                <div v-if="password && password_confirmation && password !== password_confirmation" class="login-password-mismatch">
                    Les mots de passe ne correspondent pas
                </div>
            </div>

            <div class="login-actions">
                <button class="login-btn-primary" @click="isLogin ? handleLogin() : handleRegister()">
                    {{ isLogin ? 'DÉCOLLAGE 🚀' : 'ENRÔLEMENT →' }}
                </button>
                <p class="login-switch">
                    {{ isLogin ? 'Pas encore de vaisseau ?' : 'Déjà un compte ?' }}
                    <button class="login-btn-secondary" @click="isLogin = !isLogin">
                        {{ isLogin ? 'Créer un compte' : 'Se connecter' }}
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped src="@/assets/styles/pages/login.css" />
