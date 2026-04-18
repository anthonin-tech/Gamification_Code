import { ANIMATION_DURATIONS } from './constants'

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

export function celebrateAchievement() {
  console.log('🎉 Achievement débloqué !')
}

export function vibrateElement(element: HTMLElement, duration: number = 200) {
  if (!element) return
  
  element.classList.add('vibrate')
  setTimeout(() => {
    element.classList.remove('vibrate')
  }, duration)
}

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

export function glowEffect(element: HTMLElement, color: string = '#7c3aed') {
  if (!element) return
  
  element.style.transition = 'box-shadow 0.5s ease'
  element.style.boxShadow = `0 0 20px ${color}`
  
  setTimeout(() => {
    element.style.boxShadow = 'none'
  }, 1000)
}

export function fadeIn(element: HTMLElement, duration: number = ANIMATION_DURATIONS.BASE) {
  if (!element) return
  
  element.style.opacity = '0'
  element.style.display = 'block'
  element.style.transition = `opacity ${duration}ms ease`
  
  requestAnimationFrame(() => {
    element.style.opacity = '1'
  })
}

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

export function shake(element: HTMLElement) {
  if (!element) return
  
  element.classList.add('shake')
  setTimeout(() => {
    element.classList.remove('shake')
  }, 500)
}
