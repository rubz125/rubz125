'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/dashboard/Header'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { ServerWidget } from '@/components/widgets/ServerWidget'
import { NetworkWidget } from '@/components/widgets/NetworkWidget'
import { DockerWidget } from '@/components/widgets/DockerWidget'
import { SmartDevicesWidget } from '@/components/widgets/SmartDevicesWidget'
import { MobileDevicesWidget } from '@/components/widgets/MobileDevicesWidget'
import { SecurityWidget } from '@/components/widgets/SecurityWidget'
import { WeatherWidget } from '@/components/widgets/WeatherWidget'
import { RobotVacuumWidget } from '@/components/widgets/RobotVacuumWidget'
import { SmartLightingWidget } from '@/components/widgets/SmartLightingWidget'
import { AnalyticsWidget } from '@/components/widgets/AnalyticsWidget'

function OverviewGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <ServerWidget />
      <NetworkWidget />
      <WeatherWidget />
      <DockerWidget />
      <SecurityWidget />
      <SmartDevicesWidget />
      <MobileDevicesWidget />
      <SmartLightingWidget />
      <div className="flex flex-col gap-4">
        <RobotVacuumWidget />
        <AnalyticsWidget />
      </div>
    </div>
  )
}

const sections: Record<string, React.ReactNode> = {
  overview: <OverviewGrid />,
  servers: (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ServerWidget />
      <DockerWidget />
    </div>
  ),
  network: (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <NetworkWidget />
      <MobileDevicesWidget />
    </div>
  ),
  docker: <div className="max-w-2xl"><DockerWidget /></div>,
  smart: (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SmartDevicesWidget />
      <RobotVacuumWidget />
    </div>
  ),
  mobile: <div className="max-w-lg"><MobileDevicesWidget /></div>,
  security: <div className="max-w-3xl"><SecurityWidget /></div>,
  lighting: <div className="max-w-2xl"><SmartLightingWidget /></div>,
  weather: <div className="max-w-xl"><WeatherWidget /></div>,
  analytics: <div className="max-w-2xl"><AnalyticsWidget /></div>,
}

export default function Home() {
  const [active, setActive] = useState('overview')

  return (
    <div className="min-h-screen grid-bg text-white">
      <Header />
      <div className="flex">
        <Sidebar active={active} onSelect={setActive} />
        <main className="flex-1 p-4 md:p-6 overflow-auto min-h-[calc(100vh-73px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {sections[active] ?? <OverviewGrid />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
