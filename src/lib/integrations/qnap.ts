const HOST = process.env.QNAP_HOST ?? ''
const PORT = process.env.QNAP_PORT ?? '8080'
const USER = process.env.QNAP_USER ?? 'admin'
const PASS = process.env.QNAP_PASS ?? ''

const base = () => `http://${HOST}:${PORT}`

type SidCache = { sid: string; exp: number }
let sidCache: SidCache | null = null

function xmlVal(xml: string, tag: string): string {
  return xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))?.[1] ?? ''
}

async function getSid(): Promise<string | null> {
  if (!HOST || !PASS) return null
  if (sidCache && Date.now() < sidCache.exp) return sidCache.sid

  try {
    // Try QTS 5.x REST login first
    const res = await fetch(`${base()}/api/v2/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: USER, password: PASS }),
      signal: AbortSignal.timeout(8000),
    })
    const json = await res.json()
    const sid = json?.data?.authSid ?? json?.authSid
    if (sid) {
      sidCache = { sid, exp: Date.now() + 28 * 60_000 }
      return sid
    }
  } catch { /* fall through to legacy */ }

  try {
    // Legacy CGI login (QTS 4.x / basic)
    const res = await fetch(
      `${base()}/cgi-bin/authLogin.cgi?user=${encodeURIComponent(USER)}&pwd=${encodeURIComponent(PASS)}&serviceKey=1`,
      { signal: AbortSignal.timeout(8000) },
    )
    const xml = await res.text()
    if (xmlVal(xml, 'authPassed') === '1') {
      const sid = xmlVal(xml, 'authSid')
      if (sid) {
        sidCache = { sid, exp: Date.now() + 28 * 60_000 }
        return sid
      }
    }
  } catch { /* fall through */ }

  return null
}

type QnapSysInfo = {
  hostname: string
  model: string
  firmware: string
  cpu_usage: string
  total_memory: string
  free_memory: string
  uptime: string
}

type QnapVolume = {
  id: string
  label: string
  capacity: number
  free_size: number
  status: string
}

export type QnapStats = {
  hostname: string
  model: string
  firmware: string
  cpuPercent: number
  memTotal: number
  memUsed: number
  memPercent: number
  uptimeSeconds: number
  volumes: Array<{ name: string; usedGB: number; totalGB: number; percent: number }>
}

export async function getSystemStats(): Promise<QnapStats | null> {
  const sid = await getSid()
  if (!sid) return null

  try {
    const [sysRes, volRes] = await Promise.all([
      fetch(`${base()}/api/v2/sys/info?sid=${sid}`, { signal: AbortSignal.timeout(8000) }),
      fetch(`${base()}/api/v2/vol/info?sid=${sid}`, { signal: AbortSignal.timeout(8000) }),
    ])

    const sysJson = await sysRes.json()
    const volJson = await volRes.json()

    const sys: QnapSysInfo = sysJson?.data ?? {}
    const vols: QnapVolume[] = volJson?.data?.volumes ?? []

    const totalMem = parseInt(sys.total_memory ?? '0') / 1024  // KB → MB
    const freeMem = parseInt(sys.free_memory ?? '0') / 1024
    const usedMem = totalMem - freeMem

    return {
      hostname: sys.hostname ?? 'QNAP NAS',
      model: sys.model ?? 'QNAP',
      firmware: sys.firmware ?? '',
      cpuPercent: parseFloat(sys.cpu_usage ?? '0'),
      memTotal: totalMem,
      memUsed: usedMem,
      memPercent: totalMem > 0 ? (usedMem / totalMem) * 100 : 0,
      uptimeSeconds: parseInt(sys.uptime ?? '0'),
      volumes: vols.map(v => {
        const total = v.capacity / 1_073_741_824  // bytes → GB
        const used = (v.capacity - v.free_size) / 1_073_741_824
        return {
          name: v.label || `Vol ${v.id}`,
          usedGB: used,
          totalGB: total,
          percent: total > 0 ? (used / total) * 100 : 0,
        }
      }),
    }
  } catch {
    return null
  }
}

export function isConfigured(): boolean {
  return !!(HOST && PASS)
}
