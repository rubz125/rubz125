'use client'
import { useState, useEffect, useCallback } from 'react'
import { NetworkStats } from '@/types'

export function useNetworkStats(interval = 2000) {
  const [data, setData] = useState<NetworkStats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const res = await window.fetch('/api/network')
      const json = await res.json()
      setData(json)
    } catch {
      console.error('Failed to fetch network stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, interval)
    return () => clearInterval(id)
  }, [fetchData, interval])

  return { data, loading }
}
