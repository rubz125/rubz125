import { SystemStats } from '@/types'

export async function fetchSystemStats(): Promise<SystemStats> {
  const res = await fetch('/api/system')
  if (!res.ok) throw new Error('Failed to fetch system stats')
  return res.json()
}
