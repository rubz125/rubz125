import { NextResponse } from 'next/server'
import { NetworkStats } from '@/types'
import * as router from '@/lib/integrations/xiaomi-router'

const trafficHistory: Array<{ time: string; down: number; up: number }> = []

function mockPoint() {
  const now = new Date()
  return {
    time: now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    down: 50 + Math.random() * 200,
    up: 10 + Math.random() * 50,
  }
}

for (let i = 20; i >= 0; i--) trafficHistory.push(mockPoint())

export async function GET() {
  const live = router.isConfigured()

  const [devices, wan, traffic] = live
    ? await Promise.all([router.getDevices(), router.getWanInfo(), router.getTraffic()])
    : [null, null, null]

  // Append traffic point
  if (traffic) {
    const now = new Date()
    trafficHistory.push({
      time: now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      down: (traffic.downspeed / 1024 / 1024) * 8, // bytes/s → Mbps
      up: (traffic.upspeed / 1024 / 1024) * 8,
    })
  } else {
    trafficHistory.push(mockPoint())
  }
  if (trafficHistory.length > 30) trafficHistory.shift()

  const stats: NetworkStats = {
    wan: {
      ip: wan?.publicIp ?? '—',
      isp: wan?.isp ?? (live ? 'Xiaomi Router' : 'Demo ISP'),
      connected: live ? !!wan : true,
    },
    download: {
      current: traffic ? (traffic.downspeed / 1024 / 1024) * 8 : 120 + Math.random() * 100,
      peak: 850,
    },
    upload: {
      current: traffic ? (traffic.upspeed / 1024 / 1024) * 8 : 20 + Math.random() * 30,
      peak: 200,
    },
    latency: 5 + Math.random() * 10,
    devices: devices
      ? devices.map(d => ({
          name: d.oname || 'Unknown',
          ip: d.ip,
          mac: d.mac,
          type: 'client',
          online: d.online === 1,
          signal: undefined,
        }))
      : [
          { name: 'HomeLab Server', ip: '192.168.1.10', mac: 'AA:BB:CC:DD:EE:01', type: 'server', online: true },
          { name: 'MacBook Pro', ip: '192.168.1.20', mac: 'AA:BB:CC:DD:EE:02', type: 'laptop', online: true, signal: -45 },
          { name: 'iPhone 15 Pro', ip: '192.168.1.21', mac: 'AA:BB:CC:DD:EE:03', type: 'phone', online: true, signal: -52 },
          { name: 'Apple TV 4K', ip: '192.168.1.30', mac: 'AA:BB:CC:DD:EE:04', type: 'media', online: true },
          { name: 'PlayStation 5', ip: '192.168.1.31', mac: 'AA:BB:CC:DD:EE:05', type: 'gaming', online: false },
          { name: 'Smart TV', ip: '192.168.1.32', mac: 'AA:BB:CC:DD:EE:06', type: 'tv', online: true },
        ],
    traffic: trafficHistory.slice(-20),
  }

  return NextResponse.json(stats)
}
