import { ref, computed } from 'vue'
import type { ProgressData, Streak } from '@/types'

export function useProgression() {
  const progressHistory = ref<ProgressData[]>([])
  const streak = ref<Streak>({
    current: 0,
    longest: 0,
    lastActivity: new Date().toISOString()
  })
  const loading = ref(false)

  async function loadProgressHistory(days: number = 30) {
    loading.value = true
    try {
      const mockData: ProgressData[] = generateMockData(days)
      progressHistory.value = mockData
      updateStreak()
    } catch (error) {
      console.error('Erreur de chargement de la progression:', error)
    } finally {
      loading.value = false
    }
  }

  function generateMockData(days: number): ProgressData[] {
    const data: ProgressData[] = []
    const today = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      data.push({
        date: date.toISOString().split('T')[0],
        xp: Math.floor(Math.random() * 500) + 100,
        lessons: Math.floor(Math.random() * 5),
        challenges: Math.floor(Math.random() * 3)
      })
    }
    
    return data
  }

  function updateStreak() {
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = progressHistory.value.length - 1; i >= 0; i--) {
      const dataDate = new Date(progressHistory.value[i].date)
      dataDate.setHours(0, 0, 0, 0)
      
      const daysDiff = Math.floor((today.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === tempStreak) {
        tempStreak++
        if (i === progressHistory.value.length - 1) {
          currentStreak = tempStreak
        }
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    }
    
    streak.value = {
      current: currentStreak,
      longest: longestStreak,
      lastActivity: progressHistory.value[progressHistory.value.length - 1]?.date || new Date().toISOString()
    }
  }

  const totalStats = computed(() => {
    const totals = progressHistory.value.reduce(
      (acc, day) => ({
        xp: acc.xp + day.xp,
        lessons: acc.lessons + day.lessons,
        challenges: acc.challenges + day.challenges
      }),
      { xp: 0, lessons: 0, challenges: 0 }
    )
    
    return {
      ...totals,
      averageXpPerDay: Math.round(totals.xp / (progressHistory.value.length || 1)),
      daysActive: progressHistory.value.length
    }
  })

  const weekData = computed(() => {
    return progressHistory.value.slice(-7)
  })

  function addXP(amount: number) {
    const today = new Date().toISOString().split('T')[0]
    const todayData = progressHistory.value.find(d => d.date === today)
    
    if (todayData) {
      todayData.xp += amount
    } else {
      progressHistory.value.push({
        date: today,
        xp: amount,
        lessons: 0,
        challenges: 0
      })
    }
    
    updateStreak()
  }

  function completeLesson(xpEarned: number = 50) {
    const today = new Date().toISOString().split('T')[0]
    const todayData = progressHistory.value.find(d => d.date === today)
    
    if (todayData) {
      todayData.lessons++
      todayData.xp += xpEarned
    } else {
      progressHistory.value.push({
        date: today,
        xp: xpEarned,
        lessons: 1,
        challenges: 0
      })
    }
    
    updateStreak()
  }

  return {
    progressHistory,
    streak,
    loading,
    totalStats,
    weekData,
    loadProgressHistory,
    addXP,
    completeLesson
  }
}
