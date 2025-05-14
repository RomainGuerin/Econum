import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TemperatureForecastChart } from "@/components/temperature/temperature-forecast-chart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThermometerSnowflake, RefreshCw } from "lucide-react"

export default function TemperatureForecast() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Prévisions de température
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="group">
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
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] p-6">
            <TemperatureForecastChart />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                <path d="M21 12a9 9 0 0 0-9-9v9h9Z" />
              </svg>
              <span>Paramètres du modèle</span>
            </CardTitle>
            <CardDescription>Configuration actuelle du modèle de prévision</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-sm font-medium text-muted-foreground">Méthode d'intégration</div>
                  <div className="text-sm font-semibold mt-1">Runge-Kutta d'ordre 4</div>
                </div>

                <div className="rounded-lg bg-muted p-3">
                  <div className="text-sm font-medium text-muted-foreground">Pas de temps</div>
                  <div className="text-sm font-semibold mt-1">60 secondes</div>
                </div>

                <div className="rounded-lg bg-muted p-3">
                  <div className="text-sm font-medium text-muted-foreground">Dernière calibration</div>
                  <div className="text-sm font-semibold mt-1">Aujourd'hui à 08:30</div>
                </div>

                <div className="rounded-lg bg-muted p-3">
                  <div className="text-sm font-medium text-muted-foreground">Précision estimée</div>
                  <div className="text-sm font-semibold mt-1">±0.5°C</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-gradient-to-r from-secondary/5 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              <span>Données d'entrée</span>
            </CardTitle>
            <CardDescription>Paramètres utilisés pour la prévision actuelle</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-sm font-medium text-muted-foreground">Température initiale</div>
                  <div className="text-sm font-semibold mt-1">24.5°C</div>
                </div>

                <div className="rounded-lg bg-muted p-3">
                  <div className="text-sm font-medium text-muted-foreground">Température ambiante</div>
                  <div className="text-sm font-semibold mt-1">22.0°C</div>
                </div>

                <div className="rounded-lg bg-muted p-3">
                  <div className="text-sm font-medium text-muted-foreground">Intensité actuelle</div>
                  <div className="text-sm font-semibold mt-1">75 A</div>
                </div>

                <div className="rounded-lg bg-muted p-3">
                  <div className="text-sm font-medium text-muted-foreground">Vitesse du vent</div>
                  <div className="text-sm font-semibold mt-1">12 km/h</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
