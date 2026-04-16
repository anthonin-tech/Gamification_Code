/**
 * Utilitaires pour les animations
 */

import { ANIMATION_DURATIONS } from './constants'

/**
 * Anime une valeur numérique
 * @param start Valeur de départ
 * @param end Valeur finale
 * @param duration Durée en ms
 * @param callback Fonction appelée à chaque frame avec la valeur
 */
export function animateValue(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
) {
  const startTime = performance.now()
  
  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing: easeOutCubic
    const easedProgress = 1 - Math.pow(1 - progress, 3)
    const current = start + (end - start) * easedProgress
    
    callback(Math.round(current))
    
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }
  
  requestAnimationFrame(update)
}

/**
 * Crée une animation de confettis pour célébrer un achievement
 */
export function celebrateAchievement() {
  // Cette fonction nécessiterait une bibliothèque comme canvas-confetti
  // Pour l'instant, on simule avec un simple effet
  console.log('🎉 Achievement débloqué !')
  
  // En production, utiliser:
  // import confetti from 'canvas-confetti'
  // confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
}

/**
 * Fait vibrer l'élément (si supporté)
 */
export function vibrateElement(element: HTMLElement, duration: number = 200) {
  if (!element) return
  
  element.classList.add('vibrate')
  setTimeout(() => {
    element.classList.remove('vibrate')
  }, duration)
}

/**
 * Fait pulser un élément
 */
export function pulseElement(element: HTMLElement, times: number = 3) {
  if (!element) return
  
  let count = 0
  const interval = setInterval(() => {
    element.classList.toggle('pulse-once')
    count++
    
    if (count >= times * 2) {
      clearInterval(interval)
      element.classList.remove('pulse-once')
    }
  }, 300)
}

/**
 * Crée un effet de glow progressif
 */
export function glowEffect(element: HTMLElement, color: string = '#7c3aed') {
  if (!element) return
  
  element.style.transition = 'box-shadow 0.5s ease'
  element.style.boxShadow = `0 0 20px ${color}`
  
  setTimeout(() => {
    element.style.boxShadow = 'none'
  }, 1000)
}

/**
 * Fait apparaître un élément avec un effet de fondu
 */
export function fadeIn(element: HTMLElement, duration: number = ANIMATION_DURATIONS.BASE) {
  if (!element) return
  
  element.style.opacity = '0'
  element.style.display = 'block'
  element.style.transition = `opacity ${duration}ms ease`
  
  requestAnimationFrame(() => {
    element.style.opacity = '1'
  })
}

/**
 * Fait disparaître un élément avec un effet de fondu
 */
export function fadeOut(
  element: HTMLElement, 
  duration: number = ANIMATION_DURATIONS.BASE,
  callback?: () => void
) {
  if (!element) return
  
  element.style.transition = `opacity ${duration}ms ease`
  element.style.opacity = '0'
  
  setTimeout(() => {
    element.style.display = 'none'
    if (callback) callback()
  }, duration)
}

/**
 * Fait glisser un élément depuis le haut
 */
export function slideDown(element: HTMLElement, duration: number = ANIMATION_DURATIONS.BASE) {
  if (!element) return
  
  const height = element.scrollHeight
  element.style.height = '0'
  element.style.overflow = 'hidden'
  element.style.transition = `height ${duration}ms ease`
  
  requestAnimationFrame(() => {
    element.style.height = `${height}px`
  })
  
  setTimeout(() => {
    element.style.height = 'auto'
    element.style.overflow = 'visible'
  }, duration)
}

/**
 * Crée un compteur animé
 */
export function animateCounter(
  element: HTMLElement,
  end: number,
  duration: number = 1000,
  prefix: string = '',
  suffix: string = ''
) {
  if (!element) return
  
  const start = parseInt(element.textContent || '0')
  
  animateValue(start, end, duration, (value) => {
    element.textContent = `${prefix}${value}${suffix}`
  })
}

/**
 * Effet de shake (secousse)
 */
export function shake(element: HTMLElement) {
  if (!element) return
  
  element.classList.add('shake')
  setTimeout(() => {
    element.classList.remove('shake')
  }, 500)
}

// CSS requis pour certaines animations (à ajouter dans components.css):
/*
@keyframes vibrate {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.vibrate {
  animation: vibrate 0.2s ease;
}

.pulse-once {
  animation: pulse 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.5s ease;
}
*/
