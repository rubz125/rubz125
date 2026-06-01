/**
 * Ecovacs cloud API integration.
 * Protocol reverse-engineered by the open-source community (sucks, deebot-client).
 * Supports DEEBOT Omni/T/X series via the global IOT API.
 */
import crypto from 'crypto'

const EMAIL = process.env.ECOVACS_EMAIL ?? ''
const PASSWORD = process.env.ECOVACS_PASSWORD ?? ''
const COUNTRY = (process.env.ECOVACS_COUNTRY ?? 'US').toLowerCase()
const CONTINENT = (process.env.ECOVACS_CONTINENT ?? 'NA').toUpperCase()

// App credentials (public, from open-source community)
const APP_KEY = '1520391301804'
const APP_SECRET = '77c35b2d5dce956a'
const AUTH_CLIENT_ID = 'ecovacs.main.android'

const PORTAL =
  CONTINENT === 'EU' ? 'https://portal-eu.ecouser.net'
  : CONTINENT === 'AS' ? 'https://portal-as.ecouser.net'
  : 'https://portal-us.ecouser.net'

type TokenCache = { uid: string; token: string; exp: number }
let tokenCache: TokenCache | null = null

function md5(s: string) {
  return crypto.createHash('md5').update(s).digest('hex')
}

function sign(params: Record<string, string>): string {
  const sorted = Object.keys(params).sort()
  const body = sorted.map(k => `${k}=${params[k]}`).join('') + APP_SECRET
  return md5(body)
}

async function login(): Promise<{ uid: string; token: string } | null> {
  if (!EMAIL || !PASSWORD) return null
  if (tokenCache && Date.now() < tokenCache.exp) {
    return { uid: tokenCache.uid, token: tokenCache.token }
  }

  const ts = Math.floor(Date.now() / 1000).toString()
  const reqId = crypto.randomBytes(8).toString('hex')
  const params: Record<string, string> = {
    account: EMAIL,
    password: md5(PASSWORD),
    requestId: reqId,
    authTimespan: ts,
    authTimeZone: 'GMT-8',
    authAppkey: APP_KEY,
    country: COUNTRY,
    lang: 'en',
    deviceId: crypto.randomBytes(8).toString('hex'),
    appCode: AUTH_CLIENT_ID,
    appVersion: '1.3.5',
    channel: 'c_googleplay',
    deviceType: '1',
  }
  params.authSign = sign(params)

  try {
    const res = await fetch(
      `https://gl-us-pub.ecovacs.com/v1/private/${COUNTRY}/en/eco_common/login_by_it_token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(params).toString(),
        signal: AbortSignal.timeout(10_000),
      },
    )
    const json = await res.json()
    if (json?.code === '0000' || json?.ret === 'ok') {
      const uid: string = json.uid ?? json.userId
      const token: string = json.accessToken ?? json.token
      tokenCache = { uid, token, exp: Date.now() + 50 * 60_000 }
      return { uid, token }
    }
  } catch { /* fall through */ }
  return null
}

type EcoDevice = {
  did: string
  name: string
  nick: string
  class: string
  product: Record<string, string>
}

async function getDevices(uid: string, token: string): Promise<EcoDevice[]> {
  try {
    const res = await fetch(`${PORTAL}/api/appsvr/service.do`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: 'getDeviceList', userid: uid, accessToken: token }),
      signal: AbortSignal.timeout(10_000),
    })
    const json = await res.json()
    return (json?.devices ?? json?.result?.devices ?? []) as EcoDevice[]
  } catch {
    return []
  }
}

async function sendCommand(
  uid: string,
  token: string,
  did: string,
  devClass: string,
  cmdName: string,
  cmdBody: object = {},
): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(`${PORTAL}/api/iot/devmanager.do`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: 'manage',
        did,
        deviceClass: devClass,
        userid: uid,
        accessToken: token,
        payloadType: 'j',
        payload: JSON.stringify({ header: { pri: 1 }, body: { cmd: cmdName, ...cmdBody } }),
      }),
      signal: AbortSignal.timeout(10_000),
    })
    return res.json()
  } catch {
    return null
  }
}

export type VacuumStatus = {
  name: string
  did: string
  model: string
  battery: number
  status: 'cleaning' | 'idle' | 'charging' | 'returning' | 'paused' | 'error' | 'unknown'
  cleaningMode: string
  area: number
  duration: number
  lastCleaned: string | null
}

const STATE_MAP: Record<number, VacuumStatus['status']> = {
  0: 'idle',
  1: 'cleaning',
  2: 'paused',
  3: 'returning',
  4: 'charging',
  5: 'charging',
  6: 'error',
}

export async function getVacuumStatus(): Promise<VacuumStatus | null> {
  const auth = await login()
  if (!auth) return null

  const devices = await getDevices(auth.uid, auth.token)
  if (!devices.length) return null

  // Pick first robot vacuum (class typically starts with 'vac' or similar)
  const vac = devices[0]

  const [battRes, stateRes] = await Promise.all([
    sendCommand(auth.uid, auth.token, vac.did, vac.class, 'GetBattery'),
    sendCommand(auth.uid, auth.token, vac.did, vac.class, 'GetCleanState'),
  ])

  type ApiResp = Record<string, Record<string, Record<string, Record<string, number>>>>
  const batteryLevel: number = (battRes as ApiResp)?.resp?.body?.data?.value ?? 50
  const stateCode: number = (stateRes as ApiResp)?.resp?.body?.data?.state ?? 0
  const cleanInfo: Record<string, number> = (stateRes as ApiResp)?.resp?.body?.data ?? {}

  return {
    name: vac.nick || vac.name || 'Ecovacs Robot',
    did: vac.did,
    model: vac.product?.name ?? 'DEEBOT',
    battery: batteryLevel,
    status: STATE_MAP[stateCode] ?? 'unknown',
    cleaningMode: 'Auto',
    area: cleanInfo.area ?? 0,
    duration: Math.round((cleanInfo.time ?? 0) / 60),
    lastCleaned: null,
  }
}

export function isConfigured(): boolean {
  return !!(EMAIL && PASSWORD)
}
