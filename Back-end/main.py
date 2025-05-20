from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from Solver import solve_temperature
from codecarbon import EmissionsTracker
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="API de simulation de température",
    version="1.0.0",
    description="Cette API simule la température d'un câble électrique en fonction de divers paramètres."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.get("/metrics_detailed")
def metrics_detailed(
    Tc0: float = Query(25.0, description="Température initiale du câble"),
    Ta: float = Query(20.0, description="Température ambiante"),
    ws: float = Query(1.0, description="Vitesse du vent"),
    I: float = Query(100.0, description="Intensité électrique")
):
    tracker = EmissionsTracker(save_to_file=False, log_level="error")
    
    tracker.start()
    _, temps = solve_temperature(Tc0, Ta, ws, I)
    tracker.stop()

    return JSONResponse({
        "Tc0": Tc0,
        "Ta": Ta,
        "ws": ws,
        "I": I,
        "co2_kg": round(tracker.final_emissions_data.emissions, 9),
        "cpu_energy_kWh": round(tracker.final_emissions_data.cpu_energy, 9),
        "gpu_energy_kWh": round(tracker.final_emissions_data.gpu_energy, 9),
        "ram_energy_kWh": round(tracker.final_emissions_data.ram_energy, 9),
        "temperature": list(map(lambda t: round(t, 2), temps))
    })
