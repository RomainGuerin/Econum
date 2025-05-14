import { Sun, Droplets, Wind } from "lucide-react"

export function WeatherInfo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-500 animate-float">
          <Sun className="h-6 w-6" />
        </div>
        <span className="text-lg font-medium">Partiellement nuageux</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Droplets className="h-4 w-4 text-blue-500" />
          <span>Humidité: 65%</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/20">
          <Wind className="h-4 w-4 text-gray-500" />
          <span>Vent: 12 km/h</span>
        </div>
      </div>
    </div>
  )
}
