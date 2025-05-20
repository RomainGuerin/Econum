import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConsumptionChart } from "@/components/consumption/consumption-chart"
import { CO2EmissionsChart } from "@/components/consumption/co2-emissions-chart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, RefreshCw, Zap, BarChart3 } from "lucide-react"

export default function ConsumptionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Consommation & CO₂
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="group">
            <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            <span>Actualiser</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Consommation énergétique</span>
            </CardTitle>
            <CardDescription>Mesurée via pyRAPL / Energyusage</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <div className="text-sm text-muted-foreground">Total consommé</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    2.4 kWh
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="text-sm text-muted-foreground">Puissance actuelle</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    120 W
                  </div>
                </div>
              </div>

              <div className="h-[300px]">
                <ConsumptionChart />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-md">
          <CardHeader className="bg-gradient-to-r from-secondary/10 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-secondary" />
              <span>Émissions de CO₂</span>
            </CardTitle>
            <CardDescription>Estimation basée sur le temps d'utilisation</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <div className="text-sm text-muted-foreground">Total émis</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    0.48 kg
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="text-sm text-muted-foreground">Taux d'émission</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    200 g/kWh
                  </div>
                </div>
              </div>

              <div className="h-[300px]">
                <CO2EmissionsChart />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden shadow-md">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-transparent border-b">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            <span>Détails de consommation par composant</span>
          </CardTitle>
          <CardDescription>Répartition de la consommation énergétique</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden border-l-4 border-l-primary transition-all duration-300 hover:shadow-md">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">CPU</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">1.2 kWh</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">50% du total</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-l-4 border-l-secondary transition-all duration-300 hover:shadow-md">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">GPU</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">0.6 kWh</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary to-secondary/70 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">25% du total</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-l-4 border-l-accent transition-all duration-300 hover:shadow-md">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">RAM</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">0.36 kWh</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">15% du total</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-l-4 border-l-muted-foreground transition-all duration-300 hover:shadow-md">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Autres</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">0.24 kWh</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-muted-foreground to-muted-foreground/70 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">10% du total</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
