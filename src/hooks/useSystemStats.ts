'use client'
import { useState, useEffect, useCallback } from 'react'
import { SystemStats } from '@/types'

export function useSystemStats(interval = 3000) {
  const [data, setData] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await window.fetch('/api/system')
      const json = await res.json()
      setData(json)
      setError(null)
    } catch {
      setError('Failed to fetch system stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, interval)
    return () => clearInterval(id)
  }, [fetchData, interval])

  return { data, loading, error, refetch: fetchData }
}
