import { NetworkStats } from '@/types'

export async function fetchNetworkStats(): Promise<NetworkStats> {
  const res = await fetch('/api/network')
  if (!res.ok) throw new Error('Failed to fetch network stats')
  return res.json()
}
