'use client'
import dynamic from 'next/dynamic'

const NightSky = dynamic(() => import('./NightSkyExperience'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
})

export default function NightSkyClient() {
  return <NightSky />
}
