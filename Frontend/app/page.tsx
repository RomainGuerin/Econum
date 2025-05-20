import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThermometerSun, Cloud, Zap, ArrowRight, ThermometerSnowflake, Leaf, Webhook } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CurrentTemperatureChart } from "@/components/dashboard/current-temperature-chart"
import { WeatherInfo } from "@/components/dashboard/weather-info"
import { IntensityMeter } from "@/components/dashboard/intensity-meter"
import { TemperatureForecastChart } from "@/components/temperature/temperature-forecast-chart"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Tableau de bord
        </h1>
  
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden gradient-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Température actuelle</CardTitle>
            <ThermometerSun className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5°C</div>
            <p className="text-xs text-muted-foreground">Dernière mise à jour: il y a 2 minutes</p>
            <div className="mt-4 h-[80px]">
              <CurrentTemperatureChart />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Météo en cours</CardTitle>
            <Cloud className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <WeatherInfo />
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intensité</CardTitle>
            <Zap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <IntensityMeter />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Prévisions de température */}
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSnowflake className="h-5 w-5 text-primary" />
              <span>Prévisions de température</span>
            </CardTitle>
            <CardDescription>Graphique minute par minute sur les 30 minutes à venir</CardDescription>
          </CardHeader>
      <CardContent>
  <div className="h-40"> {}
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

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-secondary" />
              <span>Consommation & CO₂</span>
            </CardTitle>
            <CardDescription>Suivi de la consommation énergétique et émissions</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div>Consommation totale: 2.4 kWh</div>
            <Button variant="outline" size="sm" asChild className="group/btn">
              <Link href="/consommation">
                <span>Voir les détails</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
