"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, RefreshCw, Zap, BarChart3 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ConsumptionPage() {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchMetrics = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/metrics_detailed?Tc0=25&Ta=20&ws=1&I=100")
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Consommation & CO₂
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="group"
          onClick={fetchMetrics}
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 transition-transform duration-200 ${loading ? "animate-spin" : "group-hover:rotate-180"}`} />
          <span>Actualiser</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Consommation énergétique */}
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Consommation énergétique</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-4 col-span-2">
                <div className="text-sm text-muted-foreground">Total consommé</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {loading ? <Skeleton className="h-8 w-24" /> : `${metrics?.energy_consumed_kWh.toFixed(6)} kWh`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Émissions de CO₂ */}
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="bg-gradient-to-r from-secondary/10 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-secondary" />
              <span>Émissions de CO₂</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-4 col-span-2">
                <div className="text-sm text-muted-foreground">Total émis</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  {loading ? <Skeleton className="h-8 w-24" /> : `${metrics?.co2_kg.toFixed(6)} kg`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Détails de consommation par composant */}
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-transparent border-b">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            <span>Détails de consommation par composant</span>
          </CardTitle>
          <CardDescription>Répartition de la consommation énergétique</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden border-l-4 border-l-primary transition-all duration-300 hover:shadow-md">
              <CardHeader className="p-4">
                <CardTitle className="text-sm">CPU</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-20" /> : `${metrics?.cpu_energy_kWh.toFixed(6)} kWh`}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-l-4 border-l-secondary transition-all duration-300 hover:shadow-md">
              <CardHeader className="p-4">
                <CardTitle className="text-sm">GPU</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-20" /> : `${metrics?.gpu_energy_kWh.toFixed(6)} kWh`}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-l-4 border-l-accent transition-all duration-300 hover:shadow-md">
              <CardHeader className="p-4">
                <CardTitle className="text-sm">RAM</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-20" /> : `${metrics?.ram_energy_kWh.toFixed(6)} kWh`}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}