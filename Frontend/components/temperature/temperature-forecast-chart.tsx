"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"

// Données simulées pour les prévisions de température
const generateForecastData = () => {
  const data = []
  const now = new Date()
  const startTemp = 24.5

  for (let i = 0; i <= 30; i++) {
    const time = new Date(now.getTime() + i * 60000)
    const hours = time.getHours().toString().padStart(2, "0")
    const minutes = time.getMinutes().toString().padStart(2, "0")
    const timeLabel = `${hours}:${minutes}`

    // Simulation d'une courbe de température avec une légère augmentation puis diminution
    const predictedTemp = startTemp + Math.sin(i * 0.1) * 2 + (i > 15 ? -0.05 * (i - 15) : 0)

    // Ajout d'une marge d'erreur
    const lowerBound = predictedTemp - 0.5
    const upperBound = predictedTemp + 0.5

    data.push({
      time: timeLabel,
      minute: i,
      predicted: Number.parseFloat(predictedTemp.toFixed(1)),
      lowerBound: Number.parseFloat(lowerBound.toFixed(1)),
      upperBound: Number.parseFloat(upperBound.toFixed(1)),
    })
  }

  return data
}

const data = generateForecastData()

export function TemperatureForecastChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient id="predictedGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis
          dataKey="time"
          label={{ value: "Temps (minutes)", position: "insideBottomRight", offset: -10 }}
          tickFormatter={(value, index) => (index % 5 === 0 ? value : "")}
        />
        <YAxis
          domain={["dataMin - 1", "dataMax + 1"]}
          label={{ value: "Température (°C)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          formatter={(value) => [`${value}°C`, ""]}
          labelFormatter={(label, items) => `Temps: ${label} (${items[0]?.payload.minute} min)`}
          contentStyle={{
            borderRadius: "0.5rem",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        />
        <Legend />
        <ReferenceLine y={28} stroke="hsl(var(--destructive) / 0.5)" strokeDasharray="3 3" label="Seuil critique" />
        <Line
          name="Marge supérieure"
          type="monotone"
          dataKey="upperBound"
          stroke="hsl(var(--muted-foreground) / 0.5)"
          strokeDasharray="3 3"
          dot={false}
        />
        <Line
          name="Prévision"
          type="monotone"
          dataKey="predicted"
          stroke="url(#predictedGradient)"
          strokeWidth={3}
          activeDot={{ r: 8, fill: "hsl(var(--primary))" }}
          dot={false}
        />
        <Line
          name="Marge inférieure"
          type="monotone"
          dataKey="lowerBound"
          stroke="hsl(var(--muted-foreground) / 0.5)"
          strokeDasharray="3 3"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
