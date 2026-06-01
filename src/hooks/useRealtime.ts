'use client'
import { useEffect, useRef } from 'react'

export function useRealtime(callback: () => void, interval: number) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const id = setInterval(() => callbackRef.current(), interval)
    return () => clearInterval(id)
  }, [interval])
}
