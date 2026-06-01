'use client'
import { useState, useEffect, useCallback } from 'react'

export function useApiData<T>(url: string, interval?: number) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const res = await window.fetch(url)
      const json = await res.json()
      setData(json)
    } catch {
      console.error(`Failed to fetch ${url}`)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
    if (interval) {
      const id = setInterval(fetchData, interval)
      return () => clearInterval(id)
    }
  }, [fetchData, interval])

  return { data, loading, refetch: fetchData }
}
