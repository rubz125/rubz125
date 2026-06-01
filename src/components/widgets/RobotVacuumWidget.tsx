'use client'
import { motion } from 'framer-motion'
import { useApiData } from '@/hooks/useApiData'
import { RobotVacuum, DevicesPayload } from '@/types'
import { cn } from '@/lib/utils'
import { Battery, Map, Clock, Zap } from 'lucide-react'

export function RobotVacuumWidget() {
  const { data } = useApiData<DevicesPayload>('/api/devices', 10000)
  const vacuum = data?.vacuum

  if (!vacuum) return <div className="glass rounded-2xl p-6 h-40 animate-pulse" />

  const statusConfig = ({
    cleaning: { label: 'Cleaning', color: 'text-green-400', bg: 'bg-green-500/20' },
    idle: { label: 'Idle', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    charging: { label: 'Charging', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    returning: { label: 'Returning', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    error: { label: 'Error', color: 'text-red-400', bg: 'bg-red-500/20' },
  } as Record<RobotVacuum['status'], { label: string; color: string; bg: string }>)[vacuum.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-500/20 rounded-xl">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{vacuum.name}</h3>
            <p className="text-white/40 text-xs">Robot Vacuum</p>
          </div>
        </div>
        <span className={cn('text-sm font-medium px-3 py-1 rounded-full border border-current/30', statusConfig.color, statusConfig.bg)}>
          {statusConfig.label}
        </span>
      </div>

      <div className="relative mb-5">
        <div className="w-32 h-32 mx-auto relative">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={vacuum.battery > 50 ? '#22c55e' : vacuum.battery > 20 ? '#eab308' : '#ef4444'}
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - vacuum.battery / 100) }}
              transition={{ duration: 1 }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Battery className={cn('w-5 h-5 mb-1', vacuum.battery > 50 ? 'text-green-400' : vacuum.battery > 20 ? 'text-yellow-400' : 'text-red-400')} />
            <div className="text-2xl font-bold text-white">{vacuum.battery}%</div>
            <div className="text-xs text-white/40">Battery</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <Map className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white">{vacuum.area}m²</div>
          <div className="text-xs text-white/40">Cleaned</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white">{vacuum.duration}m</div>
          <div className="text-xs text-white/40">Duration</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
          <div className="text-sm font-bold text-white">{vacuum.cleaningMode}</div>
          <div className="text-xs text-white/40">Mode</div>
        </div>
      </div>
    </motion.div>
  )
}
