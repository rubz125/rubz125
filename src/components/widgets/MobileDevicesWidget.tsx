'use client'
import { motion } from 'framer-motion'
import { Smartphone, Battery, BatteryCharging } from 'lucide-react'
import { useApiData } from '@/hooks/useApiData'
import { MobileDevice, DevicesPayload } from '@/types'
import { cn } from '@/lib/utils'

function BatteryBar({ level, charging }: { level: number; charging: boolean }) {
  const color = level > 50 ? 'bg-green-400' : level > 20 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-1.5">
      {charging ? (
        <BatteryCharging className="w-4 h-4 text-green-400" />
      ) : (
        <Battery className={cn('w-4 h-4', level > 50 ? 'text-green-400' : level > 20 ? 'text-yellow-400' : 'text-red-400')} />
      )}
      <div className="flex-1 bg-white/10 rounded-full h-1.5 w-16">
        <motion.div
          className={cn('h-full rounded-full', color)}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-xs text-white/50">{level}%</span>
    </div>
  )
}

function SignalBars({ strength }: { strength: number }) {
  const bars = strength > -50 ? 4 : strength > -65 ? 3 : strength > -75 ? 2 : 1
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4].map(b => (
        <div
          key={b}
          className={cn('w-1 rounded-sm transition-colors', b <= bars ? 'bg-green-400' : 'bg-white/20')}
          style={{ height: `${b * 25}%` }}
        />
      ))}
    </div>
  )
}

export function MobileDevicesWidget() {
  const { data } = useApiData<DevicesPayload>('/api/devices', 15000)
  const devices: MobileDevice[] = data?.mobile || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-green-500/20 rounded-xl">
          <Smartphone className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Mobile Devices</h3>
          <p className="text-white/40 text-xs">{devices.filter(d => d.online).length} connected</p>
        </div>
      </div>

      <div className="space-y-3">
        {devices.map((device, i) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={cn('glass rounded-xl p-4', !device.online && 'opacity-50')}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-medium text-white">{device.name}</div>
                <div className="text-xs text-white/40">{device.owner}</div>
              </div>
              <div className="flex items-center gap-2">
                {device.online && <SignalBars strength={device.signal} />}
                <div className={cn('w-2 h-2 rounded-full', device.online ? 'bg-green-400 pulse-dot' : 'bg-gray-500')} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <BatteryBar level={device.battery} charging={device.charging} />
              <div className="text-xs text-white/30">{device.lastSeen}</div>
            </div>
            {device.ip && (
              <div className="text-xs text-white/20 mt-1 font-mono">{device.ip}</div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
