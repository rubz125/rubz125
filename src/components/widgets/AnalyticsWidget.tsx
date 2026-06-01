'use client'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts'
import { TrendingUp, Zap } from 'lucide-react'

const energyData = [
  { day: 'Mon', kWh: 12.4 },
  { day: 'Tue', kWh: 11.8 },
  { day: 'Wed', kWh: 15.2 },
  { day: 'Thu', kWh: 10.9 },
  { day: 'Fri', kWh: 13.7 },
  { day: 'Sat', kWh: 18.3 },
  { day: 'Sun', kWh: 16.5 },
]

const deviceActivity = [
  { time: '00', devices: 2 },
  { time: '03', devices: 1 },
  { time: '06', devices: 3 },
  { time: '09', devices: 7 },
  { time: '12', devices: 9 },
  { time: '15', devices: 8 },
  { time: '18', devices: 11 },
  { time: '21', devices: 6 },
]

export function AnalyticsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-indigo-500/20 rounded-xl">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Analytics</h3>
          <p className="text-white/40 text-xs">Energy &amp; Device Activity</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs text-white/50">Energy (kWh/day)</span>
          </div>
          <span className="text-xs text-white font-bold">98.8 kWh this week</span>
        </div>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyData} barSize={16}>
              <XAxis
                dataKey="day"
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
              <Bar dataKey="kWh" fill="#6366f1" radius={[3, 3, 0, 0]} name="kWh" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="text-xs text-white/50 mb-2">Active Devices (today)</div>
        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={deviceActivity}>
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
              <Line type="monotone" dataKey="devices" stroke="#22d3ee" strokeWidth={2} dot={false} name="Devices" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-indigo-400">98.8</div>
          <div className="text-xs text-white/40">kWh/week</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-cyan-400">€24.70</div>
          <div className="text-xs text-white/40">Cost/week</div>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-green-400">-12%</div>
          <div className="text-xs text-white/40">vs last week</div>
        </div>
      </div>
    </motion.div>
  )
}
