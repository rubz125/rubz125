export interface SystemStats {
  cpu: {
    usage: number
    cores: number
    model: string
    temperature: number
    frequency: number
  }
  memory: {
    used: number
    total: number
    percentage: number
    swap: { used: number; total: number }
  }
  disk: Array<{
    name: string
    used: number
    total: number
    percentage: number
    mount: string
  }>
  uptime: number
  hostname: string
  os: string
  load: [number, number, number]
}

export interface NetworkStats {
  wan: {
    ip: string
    isp: string
    connected: boolean
  }
  download: { current: number; peak: number }
  upload: { current: number; peak: number }
  latency: number
  devices: Array<{
    name: string
    ip: string
    mac: string
    type: string
    online: boolean
    signal?: number
  }>
  traffic: Array<{ time: string; down: number; up: number }>
}

export interface DockerContainer {
  id: string
  name: string
  image: string
  status: 'running' | 'stopped' | 'paused' | 'error'
  cpu: number
  memory: number
  ports: string[]
  uptime: string
}

export interface SmartDevice {
  id: string
  name: string
  type: 'appletv' | 'tv' | 'playstation' | 'speaker' | 'tablet'
  online: boolean
  activity?: string | null
  ip?: string
  room?: string
}

export interface MobileDevice {
  id: string
  name: string
  owner: string
  type: 'iphone' | 'android'
  online: boolean
  battery: number
  charging: boolean
  lastSeen: string
  signal: number
  ip?: string | null
}

export interface Camera {
  id: string
  name: string
  location: string
  online: boolean
  recording: boolean
  motionDetected: boolean
  thumbnail?: string
  resolution: string
}

export interface RobotVacuum {
  id: string
  name: string
  status: 'cleaning' | 'idle' | 'charging' | 'returning' | 'error'
  battery: number
  area: number
  duration: number
  lastCleaned: string
  cleaningMode: string
}

export interface Light {
  id: string
  name: string
  room: string
  on: boolean
  brightness: number
  color?: string
  automation?: boolean
}

export interface WeatherData {
  current: {
    temp: number
    feelsLike: number
    humidity: number
    wind: number
    windDir: string
    condition: string
    icon: string
    visibility: number
    pressure: number
    uv: number
    aqi: number
  }
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
    precipitation: number
  }>
  location: string
}

export interface Notification {
  id: string
  type: 'warning' | 'error' | 'info' | 'success'
  title: string
  message: string
  time: string
  read: boolean
  source: string
}

export interface DevicesPayload {
  smart: SmartDevice[]
  mobile: MobileDevice[]
  vacuum: RobotVacuum
  lights: Light[]
}
