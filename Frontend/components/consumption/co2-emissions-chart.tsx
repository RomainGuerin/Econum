"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

function generateCO2Data(temperature: number[] = [], co2_kg: number = 0) {
  // Répartit le CO2 total proportionnellement à la température (ou uniformément si pas de température)
  const n = temperature.length || 1
  const totalCo2_g = co2_kg * 1000
  const sumTemp = temperature.reduce((a, b) => a + b, 0) || 1
  return (temperature.length ? temperature : Array(n).fill(1)).map((temp, idx) => ({
    time: idx.toString(),
    co2: Math.round((temp / sumTemp) * totalCo2_g),
  }))
}

export function CO2EmissionsChart({ co2_kg, temperature }: { co2_kg: number; temperature: number[] }) {
  const data = generateCO2Data(temperature, co2_kg)

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