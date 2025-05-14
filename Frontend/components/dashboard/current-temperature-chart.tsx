"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"

// Données simulées pour les dernières 24 heures
const data = [
  { time: "00:00", temp: 22 },
  { time: "01:00", temp: 21 },
  { time: "02:00", temp: 20 },
  { time: "03:00", temp: 19 },
  { time: "04:00", temp: 19 },
  { time: "05:00", temp: 20 },
  { time: "06:00", temp: 21 },
  { time: "07:00", temp: 22 },
  { time: "08:00", temp: 23 },
  { time: "09:00", temp: 24 },
  { time: "10:00", temp: 25 },
  { time: "11:00", temp: 26 },
  { time: "12:00", temp: 27 },
  { time: "13:00", temp: 28 },
  { time: "14:00", temp: 27 },
  { time: "15:00", temp: 26 },
  { time: "16:00", temp: 25 },
  { time: "17:00", temp: 24 },
  { time: "18:00", temp: 23 },
  { time: "19:00", temp: 22 },
  { time: "20:00", temp: 23 },
  { time: "21:00", temp: 24 },
  { time: "22:00", temp: 24 },
  { time: "23:00", temp: 23 },
]

export function CurrentTemperatureChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <linearGradient id="tempGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
        <Line type="monotone" dataKey="temp" stroke="url(#tempGradient)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
