import { ref } from 'vue'
import { useProfileStore } from '@/stores/profile'

const stats = ref ({
    level: 12,
    xp: 1240,
    xpMax: 1800,
    streak: 12,
    challenges: 47,
    achievements: 8,
    name: 'CosmicCoder',
    title: 'Sorcier du Code',
})

const profileStore = useProfileStore()