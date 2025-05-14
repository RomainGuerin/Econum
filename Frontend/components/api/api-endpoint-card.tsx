import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Parameter {
  name: string
  type: string
  description: string
}

interface ApiEndpointCardProps {
  method: "GET" | "POST" | "PUT" | "DELETE"
  endpoint: string
  description: string
  parameters?: Parameter[]
  requestBody?: any
  response: any
}

export function ApiEndpointCard({
  method,
  endpoint,
  description,
  parameters = [],
  requestBody,
  response,
}: ApiEndpointCardProps) {
  // Déterminer la couleur du badge en fonction de la méthode
  const getBadgeVariant = () => {
    switch (method) {
      case "GET":
        return "default"
      case "POST":
        return "outline"
      case "PUT":
        return "secondary"
      case "DELETE":
        return "destructive"
      default:
        return "default"
    }
  }

  // Déterminer la couleur de fond en fonction de la méthode
  const getMethodColor = () => {
    switch (method) {
      case "GET":
        return "bg-primary/5"
      case "POST":
        return "bg-secondary/5"
      case "PUT":
        return "bg-accent/5"
      case "DELETE":
        return "bg-destructive/5"
      default:
        return "bg-primary/5"
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="space-y-4">
          <div className={`flex items-start justify-between p-4 ${getMethodColor()} border-b`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant={getBadgeVariant()} className="font-mono">
                  {method}
                </Badge>
                <code className="text-sm font-semibold bg-background/50 px-2 py-1 rounded">{endpoint}</code>
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          <div className="px-4">
            {parameters.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Paramètres</h4>
                <div className="space-y-2 rounded-lg bg-muted p-3">
                  {parameters.map((param) => (
                    <div key={param.name} className="grid grid-cols-3 text-sm">
                      <div className="font-mono text-primary">{param.name}</div>
                      <div className="text-muted-foreground">{param.type}</div>
                      <div>{param.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {requestBody && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Corps de la requête</h4>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-auto font-mono">
                  {JSON.stringify(requestBody, null, 2)}
                </pre>
              </div>
            )}

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Réponse</h4>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-auto font-mono">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
