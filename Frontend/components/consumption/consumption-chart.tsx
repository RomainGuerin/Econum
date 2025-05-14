"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Données simulées pour la consommation énergétique
const generateConsumptionData = () => {
  const data = []
  const now = new Date()

  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() - (23 - i) * 3600000)
    const hours = time.getHours().toString().padStart(2, "0")
    const timeLabel = `${hours}:00`

    // Simulation d'une courbe de consommation avec des variations
    const baseConsumption = 80 + Math.random() * 20
    const peakFactor = i >= 8 && i <= 18 ? 1.5 : 1 // Plus élevé pendant les heures de travail
    const consumption = baseConsumption * peakFactor

    data.push({
      time: timeLabel,
      consumption: Math.round(consumption),
    })
  }

  return data
}

const data = generateConsumptionData()

export function ConsumptionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="consumptionGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <linearGradient id="consumptionAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="time" tickFormatter={(value, index) => (index % 3 === 0 ? value : "")} />
        <YAxis label={{ value: "Watts", angle: -90, position: "insideLeft" }} />
        <Tooltip
          formatter={(value) => [`${value} W`, "Consommation"]}
          labelFormatter={(label) => `Heure: ${label}`}
          contentStyle={{
            borderRadius: "0.5rem",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        />
        <Area
          type="monotone"
          dataKey="consumption"
          stroke="url(#consumptionGradient)"
          strokeWidth={2}
          fill="url(#consumptionAreaGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
