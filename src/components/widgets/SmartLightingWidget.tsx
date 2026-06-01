'use client'
import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { useApiData } from '@/hooks/useApiData'
import { Light, DevicesPayload } from '@/types'
import { cn } from '@/lib/utils'

export function SmartLightingWidget() {
  const { data } = useApiData<DevicesPayload>('/api/devices', 10000)
  const lights: Light[] = data?.lights || []
  const onCount = lights.filter(l => l.on).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-xl">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Smart Lighting</h3>
            <p className="text-white/40 text-xs">{onCount}/{lights.length} lights on</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-yellow-400">{onCount}</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {lights.map((light, i) => (
          <motion.div
            key={light.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              'glass rounded-xl p-3 border transition-all',
              light.on ? 'border-white/15' : 'border-white/5 opacity-60'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-5 h-5 rounded-full"
                style={{
                  backgroundColor: light.on ? light.color || '#FFD700' : 'rgba(255,255,255,0.1)',
                  boxShadow: light.on ? `0 0 10px ${light.color || '#FFD700'}60` : 'none',
                }}
              />
              <div className={cn('w-1.5 h-1.5 rounded-full', light.on ? 'bg-yellow-400 pulse-dot' : 'bg-gray-600')} />
            </div>
            <div className="text-xs text-white font-medium truncate">{light.name}</div>
            <div className="text-xs text-white/40 truncate">{light.room}</div>
            {light.on && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-white/30 mb-1">
                  <span>Brightness</span>
                  <span>{light.brightness}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${light.brightness}%`,
                      backgroundColor: light.color || '#FFD700',
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
