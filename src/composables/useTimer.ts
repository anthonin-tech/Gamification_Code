import { ref } from 'vue'

export function useTimer() {
    let elapsed = ref(0)
    let intervalId: number | null = null

    function start() {
        if (intervalId !== null) return

        intervalId = setInterval(() => {
            elapsed.value++
        }, 1000)
    }

    function stop() {
        if (intervalId !== null) {
            clearInterval(intervalId)
            intervalId = null
        }
    }

    function reset() {
        stop()
        elapsed.value = 0
    }

    return {
        elapsed, start, stop, reset
    }
}