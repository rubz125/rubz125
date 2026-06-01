import { NextResponse } from 'next/server'
import { DockerContainer } from '@/types'

const containers: DockerContainer[] = [
  { id: '1', name: 'nginx-proxy', image: 'nginx:alpine', status: 'running', cpu: 0.5, memory: 128, ports: ['80:80', '443:443'], uptime: '15d 3h' },
  { id: '2', name: 'homeassistant', image: 'homeassistant/home-assistant', status: 'running', cpu: 2.1, memory: 512, ports: ['8123:8123'], uptime: '15d 3h' },
  { id: '3', name: 'portainer', image: 'portainer/portainer-ce', status: 'running', cpu: 0.2, memory: 64, ports: ['9443:9443'], uptime: '15d 3h' },
  { id: '4', name: 'nextcloud', image: 'nextcloud:latest', status: 'running', cpu: 1.5, memory: 256, ports: ['8080:80'], uptime: '10d 6h' },
  { id: '5', name: 'grafana', image: 'grafana/grafana', status: 'running', cpu: 0.8, memory: 192, ports: ['3000:3000'], uptime: '15d 3h' },
  { id: '6', name: 'prometheus', image: 'prom/prometheus', status: 'running', cpu: 1.2, memory: 384, ports: ['9090:9090'], uptime: '15d 3h' },
  { id: '7', name: 'jellyfin', image: 'jellyfin/jellyfin', status: 'running', cpu: 3.5, memory: 1024, ports: ['8096:8096'], uptime: '12d 8h' },
  { id: '8', name: 'pihole', image: 'pihole/pihole', status: 'running', cpu: 0.3, memory: 96, ports: ['53:53', '80:80'], uptime: '15d 3h' },
  { id: '9', name: 'vaultwarden', image: 'vaultwarden/server', status: 'running', cpu: 0.1, memory: 32, ports: ['8222:80'], uptime: '15d 3h' },
  { id: '10', name: 'uptime-kuma', image: 'louislam/uptime-kuma', status: 'running', cpu: 0.4, memory: 128, ports: ['3001:3001'], uptime: '15d 3h' },
  { id: '11', name: 'redis', image: 'redis:alpine', status: 'running', cpu: 0.2, memory: 64, ports: ['6379:6379'], uptime: '15d 3h' },
  { id: '12', name: 'postgres', image: 'postgres:16', status: 'stopped', cpu: 0, memory: 0, ports: ['5432:5432'], uptime: 'Stopped' },
]

export async function GET() {
  const withVariance = containers.map(c => ({
    ...c,
    cpu: c.status === 'running' ? Math.max(0, c.cpu + (Math.random() - 0.5) * 0.5) : 0,
    memory: c.status === 'running' ? Math.max(0, c.memory + (Math.random() - 0.5) * 20) : 0,
  }))
  return NextResponse.json(withVariance)
}
