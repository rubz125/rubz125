import { NextResponse } from 'next/server'
import { NetworkStats } from '@/types'

const trafficHistory: Array<{ time: string; down: number; up: number }> = []

function generateTrafficPoint() {
  const now = new Date()
  return {
    time: now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    down: 50 + Math.random() * 200,
    up: 10 + Math.random() * 50,
  }
}

for (let i = 20; i >= 0; i--) {
  trafficHistory.push(generateTrafficPoint())
}

export async function GET() {
  trafficHistory.push(generateTrafficPoint())
  if (trafficHistory.length > 30) trafficHistory.shift()

  const stats: NetworkStats = {
    wan: {
      ip: '203.0.113.42',
      isp: 'Fiber ISP Pro',
      connected: true,
    },
    download: { current: 120 + Math.random() * 100, peak: 850 },
    upload: { current: 20 + Math.random() * 30, peak: 200 },
    latency: 5 + Math.random() * 10,
    devices: [
      { name: 'HomeLab Server', ip: '192.168.1.10', mac: 'AA:BB:CC:DD:EE:01', type: 'server', online: true },
      { name: 'MacBook Pro', ip: '192.168.1.20', mac: 'AA:BB:CC:DD:EE:02', type: 'laptop', online: true, signal: -45 },
      { name: 'iPhone 15 Pro', ip: '192.168.1.21', mac: 'AA:BB:CC:DD:EE:03', type: 'phone', online: true, signal: -52 },
      { name: 'Apple TV 4K', ip: '192.168.1.30', mac: 'AA:BB:CC:DD:EE:04', type: 'media', online: true },
      { name: 'PlayStation 5', ip: '192.168.1.31', mac: 'AA:BB:CC:DD:EE:05', type: 'gaming', online: false },
      { name: 'Smart TV', ip: '192.168.1.32', mac: 'AA:BB:CC:DD:EE:06', type: 'tv', online: true },
      { name: 'Ecovacs Robot', ip: '192.168.1.40', mac: 'AA:BB:CC:DD:EE:07', type: 'iot', online: true },
      { name: 'Raspberry Pi', ip: '192.168.1.50', mac: 'AA:BB:CC:DD:EE:08', type: 'server', online: true },
    ],
    traffic: trafficHistory.slice(-20),
  }

  return NextResponse.json(stats)
}
