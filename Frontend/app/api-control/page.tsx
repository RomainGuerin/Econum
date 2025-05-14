"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ApiEndpointCard } from "@/components/api/api-endpoint-card"
import { ApiResponseViewer } from "@/components/api/api-response-viewer"
import { Webhook, FileCode, Send, Key, RefreshCw } from "lucide-react"

export default function ApiControlPage() {
  const [activeTab, setActiveTab] = useState("documentation")
  const [endpoint, setEndpoint] = useState("/api/temperature/forecast")
  const [method, setMethod] = useState("GET")
  const [requestBody, setRequestBody] = useState("")
  const [apiKey, setApiKey] = useState("sk_test_econum_123456789")
  const [response, setResponse] = useState(null)

  const handleTest = () => {
    // Simuler une réponse API
    let mockResponse

    if (endpoint === "/api/temperature/forecast") {
      mockResponse = {
        status: 200,
        data: {
          timestamp: new Date().toISOString(),
          forecast: Array.from({ length: 30 }, (_, i) => ({
            minute: i + 1,
            temperature: 24.5 + Math.sin(i * 0.1) * 2,
            timestamp: new Date(Date.now() + i * 60000).toISOString(),
          })),
        },
      }
    } else if (endpoint === "/api/consumption") {
      mockResponse = {
        status: 200,
        data: {
          timestamp: new Date().toISOString(),
          total_kwh: 2.4,
          current_watts: 120,
          co2_kg: 0.48,
        },
      }
    } else {
      mockResponse = {
        status: 404,
        error: "Endpoint not found",
      }
    }

    setResponse(mockResponse)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          API & Contrôle robot
        </h1>
      </div>

      <Tabs defaultValue="documentation" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 p-1">
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            <span>Documentation</span>
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Test d'API</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documentation" className="space-y-6">
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5 text-primary" />
                <span>Documentation de l'API</span>
              </CardTitle>
              <CardDescription>Endpoints disponibles pour le contrôle du robot</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-sm text-muted-foreground mb-4 p-4 rounded-lg bg-muted">
                <p>
                  Base URL: <code className="bg-background p-1 rounded">https://econum-tp.example.com/api</code>
                </p>
                <p className="mt-2">
                  Authentification: Utilisez l'en-tête <code className="bg-background p-1 rounded">X-API-Key</code> avec
                  votre clé API
                </p>
              </div>

              <ApiEndpointCard
                method="GET"
                endpoint="/temperature/forecast"
                description="Récupère les prévisions de température pour les 30 prochaines minutes"
                parameters={[
                  { name: "horizon", type: "number", description: "Horizon de prévision en minutes (défaut: 30)" },
                ]}
                response={{
                  timestamp: "2023-05-14T15:30:00Z",
                  forecast: [
                    { minute: 1, temperature: 24.7, timestamp: "2023-05-14T15:31:00Z" },
                    { minute: 2, temperature: 24.9, timestamp: "2023-05-14T15:32:00Z" },
                    "...",
                  ],
                }}
              />

              <ApiEndpointCard
                method="GET"
                endpoint="/consumption"
                description="Récupère les données de consommation et émissions CO₂"
                parameters={[{ name: "period", type: "string", description: "Période (day, week, month)" }]}
                response={{
                  timestamp: "2023-05-14T15:30:00Z",
                  total_kwh: 2.4,
                  current_watts: 120,
                  co2_kg: 0.48,
                }}
              />

              <ApiEndpointCard
                method="POST"
                endpoint="/robot/command"
                description="Envoie une commande au robot"
                parameters={[
                  { name: "command", type: "string", description: "Commande à exécuter" },
                  { name: "parameters", type: "object", description: "Paramètres de la commande" },
                ]}
                requestBody={{
                  command: "move",
                  parameters: {
                    direction: "forward",
                    speed: 0.5,
                  },
                }}
                response={{
                  status: "success",
                  message: "Command executed successfully",
                }}
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-md">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-secondary" />
                <span>Gestion des clés API</span>
              </CardTitle>
              <CardDescription>Créez et gérez vos clés d'accès à l'API</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Clé API principale</p>
                    <p className="text-sm text-muted-foreground">Utilisée pour l'authentification</p>
                  </div>
                  <Button variant="outline" className="group">
                    <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    <span>Générer une nouvelle clé</span>
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Input value="sk_test_econum_123456789" readOnly className="font-mono" />
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copier</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-accent" />
                <span>Testeur d'API</span>
              </CardTitle>
              <CardDescription>Testez les endpoints de l'API directement depuis l'interface</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-4">
                  <div className="sm:col-span-1">
                    <Label htmlFor="method" className="mb-2 block">
                      Méthode
                    </Label>
                    <Select value={method} onValueChange={setMethod}>
                      <SelectTrigger id="method" className="w-full">
                        <SelectValue placeholder="Méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="sm:col-span-3">
                    <Label htmlFor="endpoint" className="mb-2 block">
                      Endpoint
                    </Label>
                    <Select value={endpoint} onValueChange={setEndpoint}>
                      <SelectTrigger id="endpoint" className="w-full">
                        <SelectValue placeholder="Endpoint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="/api/temperature/forecast">/api/temperature/forecast</SelectItem>
                        <SelectItem value="/api/consumption">/api/consumption</SelectItem>
                        <SelectItem value="/api/robot/command">/api/robot/command</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="api-key" className="mb-2 block">
                    Clé API
                  </Label>
                  <Input
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="font-mono"
                  />
                </div>

                {(method === "POST" || method === "PUT") && (
                  <div>
                    <Label htmlFor="request-body" className="mb-2 block">
                      Corps de la requête (JSON)
                    </Label>
                    <Textarea
                      id="request-body"
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="font-mono h-32"
                      placeholder="{}"
                    />
                  </div>
                )}

                <Button
                  onClick={handleTest}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                >
                  <Send className="mr-2 h-4 w-4" />
                  <span>Envoyer la requête</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {response && (
            <Card className="overflow-hidden shadow-md">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b">
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
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  <span>Réponse</span>
                </CardTitle>
                <CardDescription>
                  Statut:{" "}
                  <span className={response.status === 200 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                    {response.status} {response.status === 200 ? "OK" : "Erreur"}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ApiResponseViewer response={response} />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
