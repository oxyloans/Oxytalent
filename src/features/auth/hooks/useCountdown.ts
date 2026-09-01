import { useEffect, useRef, useState } from 'react'

/** Counts down from `seconds` to 0. Call `restart()` to run it again (e.g. after "Resend OTP"). */
export function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const restart = () => {
    clearInterval(intervalRef.current)
    setRemaining(seconds)
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
  }

  return { remaining, restart, isDone: remaining === 0 }
}
