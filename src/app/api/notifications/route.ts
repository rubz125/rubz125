import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', type: 'warning', title: 'High CPU Usage', message: 'Server CPU exceeded 85% for 5 minutes', time: '2 min ago', read: false, source: 'System Monitor' },
    { id: '2', type: 'info', title: 'Motion Detected', message: 'Camera: Backyard detected motion', time: '15 min ago', read: false, source: 'Security Camera' },
    { id: '3', type: 'success', title: 'Backup Complete', message: 'Daily backup completed successfully', time: '1h ago', read: true, source: 'Backup Service' },
    { id: '4', type: 'error', title: 'Device Offline', message: 'PlayStation 5 went offline unexpectedly', time: '2h ago', read: true, source: 'Network Monitor' },
    { id: '5', type: 'info', title: 'Vacuum Complete', message: 'Ecovacs finished cleaning 47m² in 23 min', time: '3h ago', read: true, source: 'Ecovacs DEEBOT' },
    { id: '6', type: 'warning', title: 'Certificate Expiry', message: 'SSL certificate expires in 15 days', time: '5h ago', read: true, source: 'SSL Monitor' },
  ])
}
