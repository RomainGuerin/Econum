"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TemperatureForecastChart } from "@/components/temperature/temperature-forecast-chart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThermometerSnowflake, RefreshCw } from "lucide-react"
import { useState } from "react"

export default function TemperatureForecast() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Prévisions de température
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="group"
            onClick={() => setRefreshKey((k) => k + 1)}
          >
            <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            <span>Actualiser</span>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ThermometerSnowflake className="h-5 w-5 text-primary" />
                <span>Graphique prévisionnel</span>
              </CardTitle>
              <CardDescription>Résultat de l'intégration ODE minute par minute</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Horizon:</span>
              <Select defaultValue="30">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Horizon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] p-6">
            <TemperatureForecastChart refreshKey={refreshKey} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">

      </div>
    </div>
  )
}
