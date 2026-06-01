'use client'
import { motion } from 'framer-motion'
import { Camera, Shield, AlertTriangle } from 'lucide-react'
import { useApiData } from '@/hooks/useApiData'
import { Camera as CameraType } from '@/types'
import { cn } from '@/lib/utils'

export function SecurityWidget() {
  const { data: cameras, loading } = useApiData<CameraType[]>('/api/cameras', 5000)
  const online = cameras?.filter(c => c.online).length || 0
  const motionAlerts = cameras?.filter(c => c.motionDetected).length || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/20 rounded-xl">
            <Shield className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Security</h3>
            <p className="text-white/40 text-xs">{online} cameras online</p>
          </div>
        </div>
        {motionAlerts > 0 && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center gap-1.5 bg-orange-500/20 text-orange-400 text-xs px-2.5 py-1 rounded-full border border-orange-500/30"
          >
            <AlertTriangle className="w-3 h-3" />
            {motionAlerts} Motion
          </motion.div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {cameras?.map((cam, i) => (
            <motion.div
              key={cam.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'relative glass rounded-xl overflow-hidden',
                cam.motionDetected && 'ring-1 ring-orange-400/50'
              )}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 aspect-video flex items-center justify-center">
                {cam.online ? (
                  <div className="text-center">
                    <Camera className="w-6 h-6 text-white/30 mx-auto mb-1" />
                    <div className="text-xs text-white/20">Live</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-6 h-6 text-red-400/40 mx-auto mb-1" />
                    <div className="text-xs text-red-400/40">Offline</div>
                  </div>
                )}
              </div>
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white font-medium truncate">{cam.name}</span>
                  <div className="flex items-center gap-1">
                    {cam.recording && (
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-red-500"
                      />
                    )}
                    <div className={cn('w-1.5 h-1.5 rounded-full', cam.online ? 'bg-green-400' : 'bg-red-400')} />
                  </div>
                </div>
                <div className="text-xs text-white/30">{cam.location}</div>
                {cam.motionDetected && (
                  <div className="text-xs text-orange-400 mt-0.5">Motion!</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
