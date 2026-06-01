import { NextResponse } from 'next/server'
import * as reolink from '@/lib/integrations/reolink'

const MOCK_CAMERAS = [
  { id: '1', name: 'Front Door', location: 'Exterior', online: true, recording: true, motionDetected: false, resolution: '4K', snapshotPath: null },
  { id: '2', name: 'Backyard', location: 'Exterior', online: true, recording: true, motionDetected: true, resolution: '2K', snapshotPath: null },
  { id: '3', name: 'Garage', location: 'Exterior', online: true, recording: true, motionDetected: false, resolution: '1080p', snapshotPath: null },
  { id: '4', name: 'Living Room', location: 'Interior', online: false, recording: false, motionDetected: false, resolution: '1080p', snapshotPath: null },
  { id: '5', name: 'Driveway', location: 'Exterior', online: true, recording: true, motionDetected: false, resolution: '4K', snapshotPath: null },
  { id: '6', name: 'Side Gate', location: 'Exterior', online: true, recording: true, motionDetected: false, resolution: '2K', snapshotPath: null },
]

export async function GET() {
  if (!reolink.isConfigured()) {
    return NextResponse.json(MOCK_CAMERAS)
  }

  const cameras = await reolink.getAllCameras()
  if (!cameras) return NextResponse.json(MOCK_CAMERAS)

  return NextResponse.json(
    cameras.map(c => ({
      id: c.id,
      name: c.name,
      location: c.location,
      online: c.online,
      recording: c.recording,
      motionDetected: c.motionDetected,
      resolution: c.resolution,
      snapshotPath: c.snapshotPath,
    })),
  )
}
