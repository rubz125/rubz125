'use client'
import { motion } from 'framer-motion'
import { Bell, Search, Settings, Wifi, Shield } from 'lucide-react'
import { useApiData } from '@/hooks/useApiData'
import { Notification } from '@/types'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const { data: notifications } = useApiData<Notification[]>('/api/notifications', 30000)
  const [showNotifications, setShowNotifications] = useState(false)
  const unread = notifications?.filter(n => !n.read).length || 0
  const now = new Date()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 glass-strong border-b border-white/10 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">HomeLab</h1>
              <p className="text-white/40 text-xs">Command Center</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 glass rounded-xl px-3 py-2 w-64">
            <Search className="w-4 h-4 text-white/30" />
            <input
              placeholder="Search devices, services..."
              className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-white/50">
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-xs">All Systems Operational</span>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-white text-sm font-medium">
              {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-white/40 text-xs">
              {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 glass rounded-xl hover:bg-white/10 transition-colors"
          >
            <Bell className="w-5 h-5 text-white/70" />
            {unread > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
              >
                {unread}
              </motion.span>
            )}
          </button>

          <button className="p-2 glass rounded-xl hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>

      {showNotifications && notifications && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute right-6 top-full mt-2 w-80 glass-strong rounded-2xl border border-white/15 overflow-hidden z-50"
        >
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-semibold text-sm">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map(n => (
              <div
                key={n.id}
                className={cn(
                  'p-4 border-b border-white/5 hover:bg-white/5 transition-colors',
                  !n.read && 'bg-blue-500/5'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', {
                    'bg-yellow-400': n.type === 'warning',
                    'bg-red-400': n.type === 'error',
                    'bg-blue-400': n.type === 'info',
                    'bg-green-400': n.type === 'success',
                  })} />
                  <div className="min-w-0">
                    <div className="text-sm text-white font-medium">{n.title}</div>
                    <div className="text-xs text-white/50 mt-0.5">{n.message}</div>
                    <div className="text-xs text-white/30 mt-1">{n.time} • {n.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
