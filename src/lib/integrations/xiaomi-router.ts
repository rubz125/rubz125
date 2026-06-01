import crypto from 'crypto'

const IP = process.env.XIAOMI_ROUTER_IP ?? '192.168.31.1'
const PASSWORD = process.env.XIAOMI_ROUTER_PASSWORD ?? ''

let tokenCache: { token: string; exp: number } | null = null

async function fetchToken(): Promise<string | null> {
  if (!PASSWORD) return null
  if (tokenCache && Date.now() < tokenCache.exp) return tokenCache.token

  const md5 = crypto.createHash('md5').update(PASSWORD).digest('hex')
  try {
    const res = await fetch(`http://${IP}/cgi-bin/luci/api/xqsystem/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=admin&password=${md5}&logtype=2`,
      signal: AbortSignal.timeout(5000),
    })
    const json = await res.json()
    if (json.code === 0 && json.token) {
      tokenCache = { token: json.token, exp: Date.now() + 25 * 60_000 }
      return json.token
    }
  } catch { /* fall through */ }
  return null
}

async function api<T>(path: string): Promise<T | null> {
  const token = await fetchToken()
  if (!token) return null
  try {
    const res = await fetch(
      `http://${IP}/cgi-bin/luci/;stok=${token}/api${path}`,
      { signal: AbortSignal.timeout(5000) },
    )
    return res.json() as Promise<T>
  } catch { return null }
}

export type MiDevice = {
  mac: string
  oname: string
  ip: string
  online: number
  ssid?: string
  type?: number
}

export type MiWanInfo = {
  gateWay: string
  publicIp: string
  upSpeed: number
  downSpeed: number
  uptime?: number
  isp?: string
}

export type MiTraffic = {
  upspeed: number
  downspeed: number
  code: number
}

export async function getDevices(): Promise<MiDevice[] | null> {
  const data = await api<{ list: MiDevice[] }>('/misystem/devicelist')
  return data?.list ?? null
}

export async function getWanInfo(): Promise<MiWanInfo | null> {
  const data = await api<{ info: MiWanInfo }>('/xqnetwork/wan_info')
  return data?.info ?? null
}

export async function getTraffic(): Promise<MiTraffic | null> {
  return api<MiTraffic>('/misystem/traffic_info')
}

export function isConfigured(): boolean {
  return !!(process.env.XIAOMI_ROUTER_IP && process.env.XIAOMI_ROUTER_PASSWORD)
}
