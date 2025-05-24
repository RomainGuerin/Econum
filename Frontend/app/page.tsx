"use client"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ThermometerSnowflake,
  Leaf,
  Zap,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TemperatureForecastChart } from "@/components/temperature/temperature-forecast-chart"

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchMetrics = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/metrics_detailed?Tc0=25&Ta=20&ws=1&I=100&nocache=true")
      const json = await res.json()
      setMetrics(json)
    } catch (e) {
      setMetrics(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Tableau de bord
      </h1>

      <Card className="group hover:shadow-md transition-all duration-300 col-span-full">
  <CardHeader className="p-4">
    <CardTitle className="flex items-center gap-2 text-lg">
      <Leaf className="h-4 w-4 text-secondary" />
      <span>Consommation & CO₂</span>
    </CardTitle>
    <CardDescription className="text-sm">
      Suivi de la consommation énergétique et émissions
    </CardDescription>
    <CardDescription className="text-sm">
      (Cache désactivé)
    </CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-3 p-4">
    <div className="grid gap-4 md:grid-cols-2">
      {/* Consommation énergétique */}
      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b p-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span>Consommation énergétique</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="rounded-lg bg-muted p-3">
            <div className="text-xs text-muted-foreground">Total consommé</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {loading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                `${metrics?.energy_consumed_kWh.toFixed(6)} kWh`
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Émissions de CO₂ */}
      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-transparent border-b p-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Leaf className="h-4 w-4 text-secondary" />
            <span>Émissions de CO₂</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="rounded-lg bg-muted p-3">
            <div className="text-xs text-muted-foreground">Total émis</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              {loading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                `${metrics?.co2_kg.toFixed(6)} kg`
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Bouton vers les détails */}
    <div className="flex justify-end">
      <Button variant="outline" size="sm" asChild className="group/btn">
        <Link href="/consommation">
          <span>Voir les détails</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </Button>
    </div>
  </CardContent>
</Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Carte : Prévisions de température */}
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
        <ThermometerSnowflake className="h-4 w-4 text-primary" />
        <span>Prévisions de température</span>
      </CardTitle>
            <CardDescription>
              Graphique sur 30 minutes.
            </CardDescription>
            <CardDescription className="text-sm">
              (Cache activé)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <TemperatureForecastChart refreshKey={0} />
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm" asChild className="group/btn">
                <Link href="/previsions">
                  <span>Voir les détails</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
