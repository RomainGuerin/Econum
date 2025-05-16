"use client"

import { useEffect, useRef } from "react"
import Plotly from "plotly.js-dist-min"

type Props = {
  refreshKey: number
}

export function TemperatureForecastChart({ refreshKey }: Props) {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/predict")
      .then(res => res.json())
      .then(json => {
        if (plotRef.current) {
          Plotly.newPlot(
            plotRef.current,
            [
              {
                x: json.minutes,
                y: json.temperature,
                type: "scatter",
                mode: "lines+markers",
                line: { color: "#4fd1c5" },
                marker: { color: "#4fd1c5" },
                name: "Température (°C)",
              },
            ],
            {
              margin: { t: 30, r: 10, l: 50, b: 40 },
              xaxis: { title: "Minutes" },
              yaxis: { title: "Température (°C)" },
              plot_bgcolor: "transparent",
              paper_bgcolor: "transparent",
              font: { color: "#222" },
            },
            { responsive: true }
          )
        }
      })
  }, [refreshKey])

  return <div ref={plotRef} style={{ width: "100%", height: "100%" }} />
}
