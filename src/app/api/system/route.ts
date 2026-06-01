import { NextResponse } from 'next/server'
import { SystemStats } from '@/types'

function generateSystemStats(): SystemStats {
  const cpuUsage = 20 + Math.random() * 40
  const memUsed = 8.2 + Math.random() * 2
  const memTotal = 32

  return {
    cpu: {
      usage: cpuUsage,
      cores: 8,
      model: 'Intel Core i7-12700K',
      temperature: 45 + Math.random() * 20,
      frequency: 3.6 + Math.random() * 0.8,
    },
    memory: {
      used: memUsed,
      total: memTotal,
      percentage: (memUsed / memTotal) * 100,
      swap: { used: 0.5, total: 8 },
    },
    disk: [
      { name: 'System', used: 120, total: 500, percentage: 24, mount: '/' },
      { name: 'Media', used: 3200, total: 8000, percentage: 40, mount: '/media' },
      { name: 'Backup', used: 1800, total: 4000, percentage: 45, mount: '/backup' },
    ],
    uptime: 1234567 + Math.floor(Math.random() * 100),
    hostname: 'homelab-server',
    os: 'Ubuntu 24.04 LTS',
    load: [cpuUsage / 100 * 1.2, cpuUsage / 100, cpuUsage / 100 * 0.8],
  }
}

export async function GET() {
  return NextResponse.json(generateSystemStats())
}
