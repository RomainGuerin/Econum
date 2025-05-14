"use client"

export function IntensityMeter() {
  // Valeur simulée de l'intensité (0-100)
  const intensity = 75

  // Déterminer la couleur en fonction de l'intensité
  const getColorClass = () => {
    if (intensity < 30) return "text-green-500"
    if (intensity < 70) return "text-yellow-500"
    return "text-red-500"
  }

  // Déterminer la couleur du gradient pour la barre de progression
  const getGradient = () => {
    if (intensity < 30) return "from-green-300 to-green-500"
    if (intensity < 70) return "from-yellow-300 to-yellow-500"
    return "from-red-300 to-red-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{intensity} A</span>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            intensity < 30
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : intensity < 70
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {intensity < 30 ? "Faible" : intensity < 70 ? "Modérée" : "Élevée"}
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full">
        <div className={`absolute inset-0 bg-gradient-to-r ${getGradient()}`} style={{ width: `${intensity}%` }}></div>
      </div>
      <p className="text-xs text-muted-foreground">Capacité maximale: 100 A</p>
    </div>
  )
}
