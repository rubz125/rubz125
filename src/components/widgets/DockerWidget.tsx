'use client'
import { motion } from 'framer-motion'
import { Container } from 'lucide-react'
import { useApiData } from '@/hooks/useApiData'
import { DockerContainer } from '@/types'
import { cn } from '@/lib/utils'

function StatusBadge({ status }: { status: string }) {
  const config = ({
    running: { label: 'Running', class: 'bg-green-500/20 text-green-400 border-green-500/30' },
    stopped: { label: 'Stopped', class: 'bg-red-500/20 text-red-400 border-red-500/30' },
    paused: { label: 'Paused', class: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    error: { label: 'Error', class: 'bg-red-500/20 text-red-400 border-red-500/30' },
  } as Record<string, { label: string; class: string }>)[status] || { label: status, class: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }

  return (
    <span className={cn('text-xs px-2 py-0.5 rounded-full border', config.class)}>
      {config.label}
    </span>
  )
}

export function DockerWidget() {
  const { data: containers, loading } = useApiData<DockerContainer[]>('/api/docker', 5000)

  const running = containers?.filter(c => c.status === 'running').length || 0
  const total = containers?.length || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <Container className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Docker</h3>
            <p className="text-white/40 text-xs">{running}/{total} containers running</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{running}</div>
          <div className="text-xs text-white/40">Active</div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {containers?.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-2.5 glass rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={cn('w-2 h-2 rounded-full flex-shrink-0',
                  c.status === 'running' ? 'bg-green-400' : 'bg-red-400'
                )} />
                <div className="min-w-0">
                  <div className="text-sm text-white font-medium truncate">{c.name}</div>
                  <div className="text-xs text-white/30 truncate">{c.image}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {c.status === 'running' && (
                  <div className="text-right">
                    <div className="text-xs text-white/50">{c.cpu.toFixed(1)}%</div>
                    <div className="text-xs text-white/30">{c.memory.toFixed(0)}MB</div>
                  </div>
                )}
                <StatusBadge status={c.status} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
