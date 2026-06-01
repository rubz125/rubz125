'use client'
import { motion } from 'framer-motion'
import { Cpu, HardDrive, Thermometer, Clock, Server, MemoryStick } from 'lucide-react'
import { useSystemStats } from '@/hooks/useSystemStats'
import { formatUptime, getUsageColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

function UsageBar({ value, color }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
      <motion.div
        className={cn('h-full rounded-full', color || 'bg-blue-400')}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(value, 100)}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, percentage, color }: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub?: string
  percentage?: number
  color?: string
}) {
  return (
    <div className="glass rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('p-1.5 rounded-lg', color || 'bg-blue-500/20')}>
            <Icon className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-xs text-white/50">{label}</span>
        </div>
        {percentage !== undefined && (
          <span className={cn('text-xs font-mono', getUsageColor(percentage))}>
            {percentage.toFixed(1)}%
          </span>
        )}
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-white/40">{sub}</div>}
      {percentage !== undefined && (
        <UsageBar
          value={percentage}
          color={percentage >= 90 ? 'bg-red-400' : percentage >= 70 ? 'bg-yellow-400' : 'bg-green-400'}
        />
      )}
    </div>
  )
}

export function ServerWidget() {
  const { data, loading } = useSystemStats(3000)

  if (loading || !data) {
    return (
      <div className="glass rounded-2xl p-6 animate-pulse">
        <div className="h-6 w-32 bg-white/10 rounded mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white/5 rounded-xl" />)}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl glow-blue">
            <Server className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{data.hostname}</h3>
            <p className="text-white/40 text-xs">{data.os}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
          <span className="text-green-400 text-xs">Online</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Cpu}
          label="CPU Usage"
          value={`${data.cpu.usage.toFixed(1)}%`}
          sub={`${data.cpu.model} • ${data.cpu.cores} cores`}
          percentage={data.cpu.usage}
          color="bg-blue-500/20"
        />
        <StatCard
          icon={MemoryStick}
          label="Memory"
          value={`${data.memory.used.toFixed(1)} GB`}
          sub={`of ${data.memory.total} GB total`}
          percentage={data.memory.percentage}
          color="bg-purple-500/20"
        />
        <StatCard
          icon={Thermometer}
          label="Temperature"
          value={`${data.cpu.temperature.toFixed(0)}°C`}
          sub={`${data.cpu.frequency.toFixed(1)} GHz`}
          color="bg-orange-500/20"
        />
        <StatCard
          icon={Clock}
          label="Uptime"
          value={formatUptime(data.uptime)}
          sub={`Load: ${data.load[0].toFixed(2)}`}
          color="bg-green-500/20"
        />
      </div>

      <div className="mt-4">
        <div className="text-xs text-white/40 mb-2 flex items-center gap-2">
          <HardDrive className="w-3 h-3" />
          Storage
        </div>
        <div className="space-y-2">
          {data.disk.map(disk => (
            <div key={disk.mount}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">
                  {disk.name} <span className="text-white/30">({disk.mount})</span>
                </span>
                <span className={getUsageColor(disk.percentage)}>{disk.percentage}%</span>
              </div>
              <UsageBar
                value={disk.percentage}
                color={disk.percentage >= 90 ? 'bg-red-400' : disk.percentage >= 70 ? 'bg-yellow-400' : 'bg-blue-400'}
              />
              <div className="flex justify-between text-xs text-white/30 mt-0.5">
                <span>{disk.used} GB used</span>
                <span>{disk.total} GB</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
