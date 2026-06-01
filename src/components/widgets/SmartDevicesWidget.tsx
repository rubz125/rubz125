'use client'
import { motion } from 'framer-motion'
import { Tv, Gamepad2, Speaker, Tablet, MonitorPlay } from 'lucide-react'
import { useApiData } from '@/hooks/useApiData'
import { SmartDevice, DevicesPayload } from '@/types'
import { cn } from '@/lib/utils'

const deviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  appletv: MonitorPlay,
  tv: Tv,
  playstation: Gamepad2,
  speaker: Speaker,
  tablet: Tablet,
}

const deviceColors: Record<string, string> = {
  appletv: 'text-white bg-gray-700/50',
  tv: 'text-blue-400 bg-blue-500/20',
  playstation: 'text-blue-600 bg-blue-900/30',
  speaker: 'text-orange-400 bg-orange-500/20',
  tablet: 'text-gray-300 bg-gray-600/30',
}

export function SmartDevicesWidget() {
  const { data } = useApiData<DevicesPayload>('/api/devices', 10000)
  const devices: SmartDevice[] = data?.smart || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-purple-500/20 rounded-xl">
          <Tv className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Smart Devices</h3>
          <p className="text-white/40 text-xs">{devices.filter(d => d.online).length} online</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {devices.map((device, i) => {
          const Icon = deviceIcons[device.type] || Tv
          return (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'flex items-center justify-between p-3 rounded-xl border transition-all',
                device.online
                  ? 'glass border-white/10 hover:border-white/20'
                  : 'bg-white/2 border-white/5 opacity-50'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn('p-2 rounded-lg', deviceColors[device.type] || 'text-gray-400 bg-gray-500/20')}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm text-white font-medium">{device.name}</div>
                  <div className="text-xs text-white/40">{device.room}</div>
                </div>
              </div>
              <div className="text-right">
                {device.online ? (
                  <>
                    <div className="flex items-center gap-1.5 justify-end">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
                      <span className="text-xs text-green-400">Active</span>
                    </div>
                    {device.activity && (
                      <div className="text-xs text-white/30 max-w-28 truncate">{device.activity}</div>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-white/30">Offline</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
