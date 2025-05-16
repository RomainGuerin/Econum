"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

type Props = {
  refreshKey: number
}

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

export function TemperatureForecastChart({ refreshKey }: Props) {
  const [data, setData] = useState<{ minute: number, temperature: number }[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/predict")
      .then(res => res.json())
      .then(json => {
        const chartData = json.minutes.map((minute: number, i: number) => ({
          minute,
          temperature: json.temperature[i]
        }))
        setData(chartData)
      })
  }, [refreshKey])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="minute" label={{ value: "Minutes", position: "insideBottomRight", offset: -5 }} />
        <YAxis label={{ value: "Température (°C)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#4fd1c5" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
