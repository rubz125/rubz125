'use client'
import { motion } from 'framer-motion'
import { Server, Wifi, Tv, Smartphone, Camera, Lightbulb, Cloud, BarChart2, Container, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Overview', id: 'overview' },
  { icon: Server, label: 'Servers', id: 'servers' },
  { icon: Wifi, label: 'Network', id: 'network' },
  { icon: Container, label: 'Docker', id: 'docker' },
  { icon: Tv, label: 'Smart Devices', id: 'smart' },
  { icon: Smartphone, label: 'Mobile', id: 'mobile' },
  { icon: Camera, label: 'Security', id: 'security' },
  { icon: Lightbulb, label: 'Lighting', id: 'lighting' },
  { icon: Cloud, label: 'Weather', id: 'weather' },
  { icon: BarChart2, label: 'Analytics', id: 'analytics' },
]

export function Sidebar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden lg:flex flex-col w-16 xl:w-56 glass-strong border-r border-white/10 min-h-screen p-3"
    >
      <div className="space-y-1">
        {navItems.map((item, i) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <motion.button
              key={item.id}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
                isActive
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden xl:block">{item.label}</span>
            </motion.button>
          )
        })}
      </div>
    </motion.aside>
  )
}
