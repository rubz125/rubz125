'use client'
import { motion } from 'framer-motion'
import { Cloud, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react'
import { useApiData } from '@/hooks/useApiData'
import { WeatherData } from '@/types'

export function WeatherWidget() {
  const { data, loading } = useApiData<WeatherData>('/api/weather', 300000)

  if (loading || !data) {
    return <div className="glass rounded-2xl p-6 h-64 animate-pulse" />
  }

  const { current, forecast, location } = data

  const aqiColor = current.aqi < 50 ? 'text-green-400' : current.aqi < 100 ? 'text-yellow-400' : 'text-red-400'
  const aqiLabel = current.aqi < 50 ? 'Good' : current.aqi < 100 ? 'Moderate' : 'Poor'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cloud className="w-4 h-4 text-sky-400" />
            <span className="text-white font-semibold">Weather</span>
          </div>
          <div className="text-white/40 text-xs">{location}</div>
        </div>
        <div className="text-right">
          <div className="text-5xl font-thin text-white">{current.temp}°</div>
          <div className="text-sm text-white/60">{current.condition}</div>
          <div className="text-xs text-white/30">Feels like {current.feelsLike}°C</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { icon: Droplets, label: 'Humidity', value: `${current.humidity}%`, color: 'text-blue-400' },
          { icon: Wind, label: 'Wind', value: `${current.wind} km/h ${current.windDir}`, color: 'text-cyan-400' },
          { icon: Eye, label: 'Visibility', value: `${current.visibility} km`, color: 'text-purple-400' },
          { icon: Gauge, label: 'Pressure', value: `${current.pressure} hPa`, color: 'text-orange-400' },
          { icon: Sun, label: 'UV Index', value: current.uv.toString(), color: 'text-yellow-400' },
          { icon: Cloud, label: 'AQI', value: aqiLabel, color: aqiColor },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="glass rounded-xl p-2.5 text-center">
            <Icon className={`w-3.5 h-3.5 mx-auto mb-1 ${color}`} />
            <div className="text-xs text-white/30">{label}</div>
            <div className="text-xs text-white font-medium">{value}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="text-xs text-white/40 mb-2">7-Day Forecast</div>
        <div className="grid grid-cols-7 gap-1">
          {forecast.map((day, i) => (
            <div key={i} className="text-center glass rounded-lg p-2">
              <div className="text-xs text-white/40 mb-1">{day.day}</div>
              <div className="text-lg mb-1">
                {day.condition === 'Sunny' ? '☀️' : day.condition === 'Rainy' ? '🌧️' : day.condition === 'Cloudy' ? '☁️' : '⛅'}
              </div>
              <div className="text-xs text-white">{day.high}°</div>
              <div className="text-xs text-white/30">{day.low}°</div>
              {day.precipitation > 0 && (
                <div className="text-xs text-blue-400">{day.precipitation}%</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
