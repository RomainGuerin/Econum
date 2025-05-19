"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  refreshKey: number
}

export function TemperatureForecastChart({ refreshKey }: Props) {
  const plotRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let Plotly: any
    setIsLoading(true)

    import("plotly.js-dist-min").then((module) => {
      Plotly = module
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
          setIsLoading(false)
        })
    })
  }, [refreshKey])

 return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.7)",
            zIndex: 1,
          }}
        >
          <div style={{
            width: 320,
            height: 180,
            background: "#eee",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px #0001",
            padding: 16
          }}>
            {/* Mini-graph SVG */}
            <svg width="280" height="120" style={{ marginBottom: 8 }}>
              <rect x="0" y="0" width="280" height="120" fill="#f5f5f5" rx="6" />
              {/* Axes */}
              <line x1="30" y1="10" x2="30" y2="110" stroke="#bbb" strokeWidth="2" />
              <line x1="30" y1="110" x2="260" y2="110" stroke="#bbb" strokeWidth="2" />
              {/* Courbe grise */}
              <polyline
                points="30,100 70,80 110,90 150,60 190,70 230,40 260,60"
                fill="none"
                stroke="#ccc"
                strokeWidth="3"
                strokeDasharray="6,6"
              />
            </svg>
            <div style={{ width: 120, height: 18, background: "#ddd", borderRadius: 4, marginBottom: 8 }} />
            <div style={{ width: 80, height: 18, background: "#ddd", borderRadius: 4 }} />
          </div>
        </div>
      )}
      <div ref={plotRef} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}