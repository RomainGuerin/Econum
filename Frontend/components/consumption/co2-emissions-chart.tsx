"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Données simulées pour les émissions de CO2
const generateCO2Data = () => {
  const data = []
  const now = new Date()

  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() - (23 - i) * 3600000)
    const hours = time.getHours().toString().padStart(2, "0")
    const timeLabel = `${hours}:00`

    // Simulation d'une courbe d'émissions basée sur la consommation
    const baseConsumption = 80 + Math.random() * 20
    const peakFactor = i >= 8 && i <= 18 ? 1.5 : 1 // Plus élevé pendant les heures de travail
    const consumption = baseConsumption * peakFactor

    // Conversion en CO2 (g) avec un facteur d'émission de 200g/kWh
    const co2 = (consumption / 1000) * 200

    data.push({
      time: timeLabel,
      co2: Math.round(co2),
    })
  }

  return data
}

const data = generateCO2Data()

export function CO2EmissionsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--secondary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="time" tickFormatter={(value, index) => (index % 3 === 0 ? value : "")} />
        <YAxis label={{ value: "CO₂ (g)", angle: -90, position: "insideLeft" }} />
        <Tooltip
          formatter={(value) => [`${value} g`, "CO₂"]}
          labelFormatter={(label) => `Heure: ${label}`}
          contentStyle={{
            borderRadius: "0.5rem",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        />
        <Bar dataKey="co2" fill="url(#co2Gradient)" radius={[4, 4, 0, 0]} barSize={20} animationDuration={1500} />
      </BarChart>
    </ResponsiveContainer>
  )
}
