from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware  # <-- Ajouté
from Solver import solve_temperature

app = FastAPI(
    title="API de simulation de température",
    version="1.0.0",
    description="Cette API simule la température d'un câble électrique en fonction de divers paramètres."
)

# Ajoute ce bloc pour autoriser toutes les origines (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise toutes les origines
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"message": "Bienvenue sur l'API de simulation de température."}

@app.get("/predict")
def predict(
    Tc0: float = Query(25.0, description="Température initiale du câble"),
    Ta: float = Query(20.0, description="Température ambiante"),
    ws: float = Query(1.0, description="Vitesse du vent"),
    I: float = Query(100.0, description="Intensité électrique")
):
    try:
        time, temps = solve_temperature(Tc0, Ta, ws, I)
        return JSONResponse({
            "minutes": list(map(int, time)),
            "temperature": list(map(lambda t: round(t, 2), temps))
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)