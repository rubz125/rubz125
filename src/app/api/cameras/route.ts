import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', name: 'Front Door', location: 'Exterior', online: true, recording: true, motionDetected: false, resolution: '4K' },
    { id: '2', name: 'Backyard', location: 'Exterior', online: true, recording: true, motionDetected: true, resolution: '2K' },
    { id: '3', name: 'Garage', location: 'Exterior', online: true, recording: true, motionDetected: false, resolution: '1080p' },
    { id: '4', name: 'Living Room', location: 'Interior', online: false, recording: false, motionDetected: false, resolution: '1080p' },
    { id: '5', name: 'Driveway', location: 'Exterior', online: true, recording: true, motionDetected: false, resolution: '4K' },
    { id: '6', name: 'Side Gate', location: 'Exterior', online: true, recording: true, motionDetected: false, resolution: '2K' },
  ])
}
