import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    smart: [
      { id: '1', name: 'Apple TV 4K', type: 'appletv', online: true, activity: 'Streaming Netflix', ip: '192.168.1.30', room: 'Living Room' },
      { id: '2', name: 'LG OLED TV', type: 'tv', online: true, activity: 'HDMI 1 - Apple TV', ip: '192.168.1.32', room: 'Living Room' },
      { id: '3', name: 'PlayStation 5', type: 'playstation', online: false, activity: null, ip: '192.168.1.31', room: 'Gaming Room' },
      { id: '4', name: 'HomePod Mini', type: 'speaker', online: true, activity: 'Playing Music', ip: '192.168.1.35', room: 'Kitchen' },
      { id: '5', name: 'iPad Pro', type: 'tablet', online: true, activity: 'Idle', ip: '192.168.1.22', room: 'Office' },
    ],
    mobile: [
      { id: '1', name: 'iPhone 15 Pro', owner: 'You', type: 'iphone', online: true, battery: 78, charging: false, lastSeen: '2 min ago', signal: -45, ip: '192.168.1.21' },
      { id: '2', name: 'iPhone 14', owner: 'Partner', type: 'iphone', online: true, battery: 45, charging: true, lastSeen: '5 min ago', signal: -58, ip: '192.168.1.23' },
      { id: '3', name: 'Samsung S24', owner: 'Guest', type: 'android', online: false, battery: 22, charging: false, lastSeen: '3h ago', signal: -75, ip: null },
    ],
    vacuum: {
      id: '1',
      name: 'Ecovacs DEEBOT T20',
      status: 'cleaning',
      battery: 85,
      area: 47,
      duration: 23,
      lastCleaned: '2024-01-15 09:30',
      cleaningMode: 'Auto',
    },
    lights: [
      { id: '1', name: 'Ceiling Light', room: 'Living Room', on: true, brightness: 80, color: '#FFD700', automation: true },
      { id: '2', name: 'TV Backlight', room: 'Living Room', on: true, brightness: 40, color: '#4169E1', automation: false },
      { id: '3', name: 'Kitchen Light', room: 'Kitchen', on: true, brightness: 100, color: '#FFFFFF', automation: true },
      { id: '4', name: 'Bedroom Light', room: 'Bedroom', on: false, brightness: 0, color: '#FF6B6B', automation: true },
      { id: '5', name: 'Office Light', room: 'Office', on: true, brightness: 65, color: '#E0E0FF', automation: false },
      { id: '6', name: 'Bathroom Light', room: 'Bathroom', on: false, brightness: 0, color: '#FFFFFF', automation: true },
    ],
  })
}
