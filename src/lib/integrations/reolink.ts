export type ReolinkCamera = {
  id: string
  name: string
  ip: string
  user: string
  password: string
  location: string
  channel?: number
}

function parseCameras(): ReolinkCamera[] {
  try {
    return JSON.parse(process.env.REOLINK_CAMERAS ?? '[]')
  } catch {
    return []
  }
}

export const CAMERAS = parseCameras()

async function post<T>(
  cam: ReolinkCamera,
  commands: object[],
): Promise<T | null> {
  const ch = cam.channel ?? 0
  const url = `http://${cam.ip}/api.cgi?user=${encodeURIComponent(cam.user)}&password=${encodeURIComponent(cam.password)}&channel=${ch}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commands),
      signal: AbortSignal.timeout(6000),
    })
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

type ReoResponse = Array<{ cmd: string; code: number; value: Record<string, unknown> }>

export type CameraStatus = {
  id: string
  name: string
  location: string
  ip: string
  online: boolean
  model: string
  motionDetected: boolean
  recording: boolean
  resolution: string
  snapshotPath: string
}

export async function getCameraStatus(cam: ReolinkCamera): Promise<CameraStatus> {
  const ch = cam.channel ?? 0
  const result = await post<ReoResponse>(cam, [
    { cmd: 'GetDevInfo', action: 0, param: { channel: ch } },
    { cmd: 'GetMdState', action: 0, param: { channel: ch } },
    { cmd: 'GetRecV20', action: 0, param: { channel: ch } },
  ])

  type AnyRecord = Record<string, Record<string, unknown>>
  const devInfo = result?.find(r => r.cmd === 'GetDevInfo')?.value as AnyRecord | undefined
  const mdState = result?.find(r => r.cmd === 'GetMdState')?.value as AnyRecord | undefined
  const recState = result?.find(r => r.cmd === 'GetRecV20')?.value as AnyRecord | undefined

  return {
    id: cam.id,
    name: cam.name,
    location: cam.location,
    ip: cam.ip,
    online: !!result,
    model: (devInfo?.DevInfo?.model as string) ?? 'Reolink Camera',
    motionDetected: (mdState?.MdState?.state as number ?? 0) === 1,
    recording: ((recState?.Rec as Record<string, Record<string, number>>)?.schedule?.enable ?? 0) === 1,
    resolution: (devInfo?.DevInfo?.framerate as string) ?? '1080p',
    // Snapshot is served via /api/cameras/snapshot?id=X to keep credentials server-side
    snapshotPath: `/api/cameras/snapshot?id=${cam.id}`,
  }
}

export async function getAllCameras(): Promise<CameraStatus[] | null> {
  if (!CAMERAS.length) return null
  return Promise.all(CAMERAS.map(getCameraStatus))
}

export async function getSnapshot(id: string): Promise<Response | null> {
  const cam = CAMERAS.find(c => c.id === id)
  if (!cam) return null
  const ch = cam.channel ?? 0
  const url = `http://${cam.ip}/cgi-bin/api.cgi?cmd=Snap&channel=${ch}&rs=${Date.now()}&user=${encodeURIComponent(cam.user)}&password=${encodeURIComponent(cam.password)}`
  try {
    return fetch(url, { signal: AbortSignal.timeout(8000) })
  } catch {
    return null
  }
}

export function isConfigured(): boolean {
  return CAMERAS.length > 0
}
