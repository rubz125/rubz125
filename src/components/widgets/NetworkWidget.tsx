'use client'
import { motion } from 'framer-motion'
import { Wifi, Globe, Activity, Download, Upload, Signal } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useNetworkStats } from '@/hooks/useNetworkStats'
import { formatSpeed } from '@/lib/utils'

export function NetworkWidget() {
  const { data, loading } = useNetworkStats(2000)

  if (loading || !data) {
    return <div className="glass rounded-2xl p-6 animate-pulse h-64" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-xl">
            <Wifi className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Network</h3>
            <p className="text-white/40 text-xs">UniFi Dream Machine</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {data.wan.connected ? (
            <>
              <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
              <span className="text-green-400 text-xs">Connected</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-red-400 text-xs">Disconnected</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="glass rounded-xl p-3 text-center">
          <Globe className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <div className="text-xs text-white/40">WAN IP</div>
          <div className="text-sm font-mono text-white">{data.wan.ip}</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <Activity className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
          <div className="text-xs text-white/40">Latency</div>
          <div className="text-sm font-bold text-white">{data.latency.toFixed(0)}ms</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <Signal className="w-4 h-4 text-purple-400 mx-auto mb-1" />
          <div className="text-xs text-white/40">Devices</div>
          <div className="text-sm font-bold text-white">
            {data.devices.filter(d => d.online).length}/{data.devices.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Download className="w-3 h-3 text-green-400" />
            <span className="text-xs text-white/40">Download</span>
          </div>
          <div className="text-lg font-bold text-green-400">{formatSpeed(data.download.current)}</div>
          <div className="text-xs text-white/30">Peak: {formatSpeed(data.download.peak)}</div>
        </div>
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Upload className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-white/40">Upload</span>
          </div>
          <div className="text-lg font-bold text-blue-400">{formatSpeed(data.upload.current)}</div>
          <div className="text-xs text-white/30">Peak: {formatSpeed(data.upload.peak)}</div>
        </div>
      </div>

      <div className="h-28">
        <div className="text-xs text-white/40 mb-2">Traffic (last 20 min)</div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.traffic}>
            <defs>
              <linearGradient id="downGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="upGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="down" stroke="#22c55e" strokeWidth={1.5} fill="url(#downGrad)" name="Down" />
            <Area type="monotone" dataKey="up" stroke="#3b82f6" strokeWidth={1.5} fill="url(#upGrad)" name="Up" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
