import { NextResponse } from 'next/server'
import * as ecovacs from '@/lib/integrations/ecovacs'

const MOCK_LIGHTS = [
  { id: '1', name: 'Ceiling Light', room: 'Living Room', on: true, brightness: 80, color: '#FFD700', automation: true },
  { id: '2', name: 'TV Backlight', room: 'Living Room', on: true, brightness: 40, color: '#4169E1', automation: false },
  { id: '3', name: 'Kitchen Light', room: 'Kitchen', on: true, brightness: 100, color: '#FFFFFF', automation: true },
  { id: '4', name: 'Bedroom Light', room: 'Bedroom', on: false, brightness: 0, color: '#FF6B6B', automation: true },
  { id: '5', name: 'Office Light', room: 'Office', on: true, brightness: 65, color: '#E0E0FF', automation: false },
  { id: '6', name: 'Bathroom Light', room: 'Bathroom', on: false, brightness: 0, color: '#FFFFFF', automation: true },
]

const MOCK_SMART = [
  { id: '1', name: 'Apple TV 4K', type: 'appletv', online: true, activity: 'Streaming Netflix', ip: '192.168.1.30', room: 'Living Room' },
  { id: '2', name: 'LG OLED TV', type: 'tv', online: true, activity: 'HDMI 1', ip: '192.168.1.32', room: 'Living Room' },
  { id: '3', name: 'PlayStation 5', type: 'playstation', online: false, activity: null, ip: '192.168.1.31', room: 'Gaming Room' },
]

const MOCK_MOBILE = [
  { id: '1', name: 'iPhone 15 Pro', owner: 'You', type: 'iphone', online: true, battery: 78, charging: false, lastSeen: '2 min ago', signal: -45, ip: '192.168.1.21' },
  { id: '2', name: 'iPhone 14', owner: 'Partner', type: 'iphone', online: true, battery: 45, charging: true, lastSeen: '5 min ago', signal: -58, ip: '192.168.1.23' },
]

const MOCK_VACUUM = {
  id: '1',
  name: 'Ecovacs Omni 30 Pro',
  status: 'idle',
  battery: 90,
  area: 0,
  duration: 0,
  lastCleaned: '2024-01-15 09:30',
  cleaningMode: 'Auto',
}

export async function GET() {
  let vacuum = MOCK_VACUUM

  if (ecovacs.isConfigured()) {
    const live = await ecovacs.getVacuumStatus()
    if (live) {
      vacuum = {
        id: '1',
        name: live.name,
        status: live.status,
        battery: live.battery,
        area: live.area,
        duration: live.duration,
        lastCleaned: live.lastCleaned ?? MOCK_VACUUM.lastCleaned,
        cleaningMode: live.cleaningMode,
      }
    }
  }

  return NextResponse.json({
    smart: MOCK_SMART,
    mobile: MOCK_MOBILE,
    vacuum,
    lights: MOCK_LIGHTS,
  })
}
