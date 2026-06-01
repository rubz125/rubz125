import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    current: {
      temp: 22,
      feelsLike: 20,
      humidity: 65,
      wind: 12,
      windDir: 'NW',
      condition: 'Partly Cloudy',
      icon: '⛅',
      visibility: 10,
      pressure: 1013,
      uv: 4,
      aqi: 35,
    },
    forecast: [
      { day: 'Mon', high: 24, low: 18, condition: 'Sunny', precipitation: 5 },
      { day: 'Tue', high: 22, low: 17, condition: 'Partly Cloudy', precipitation: 20 },
      { day: 'Wed', high: 19, low: 15, condition: 'Rainy', precipitation: 80 },
      { day: 'Thu', high: 21, low: 16, condition: 'Cloudy', precipitation: 40 },
      { day: 'Fri', high: 25, low: 19, condition: 'Sunny', precipitation: 5 },
      { day: 'Sat', high: 27, low: 20, condition: 'Sunny', precipitation: 0 },
      { day: 'Sun', high: 23, low: 18, condition: 'Partly Cloudy', precipitation: 15 },
    ],
    location: 'Home - San Francisco, CA',
  })
}
