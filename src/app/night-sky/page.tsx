import type { Metadata } from 'next'
import NightSkyClient from '@/components/night-sky/NightSkyClient'

export const metadata: Metadata = {
  title: 'Night Sky Experience | Eilat Action',
  description:
    "Stand under the crystal-clear desert sky of Eilat. An interactive planetarium built for Eilat Action's Jeep Safari experience.",
}

export default function NightSkyPage() {
  return <NightSkyClient />
}
