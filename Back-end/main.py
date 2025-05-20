from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from Solver import solve_temperature
from codecarbon import EmissionsTracker
import time

app = FastAPI(
    title="API de simulation de température",
    version="1.0.0",
    description="Cette API simule la température d'un câble électrique en fonction de divers paramètres."
)

@app.get("/")
def index():
    return {"message": "Bienvenue sur l'API de simulation de température."}

@app.get("/predict")
def predict(
    Tc0: float = Query(25.0),
    Ta: float = Query(20.0),
    ws: float = Query(1.0),
    I: float = Query(100.0)
):
    time_list, temps = solve_temperature(Tc0, Ta, ws, I)
    return JSONResponse({
        "minutes": list(map(int, time_list)),
        "temperature": list(map(lambda t: round(t, 2), temps))
    })

@app.get("/metrics_detailed")
def metrics_detailed(
    Tc0: float = Query(25.0),
    Ta: float = Query(20.0),
    ws: float = Query(1.0),
    I: float = Query(100.0)
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
        "co2_kg": round(tracker.final_emissions_data.emissions, 6),
        "cpu_energy_Wh": round(tracker.final_emissions_data.cpu_energy, 6),
        "gpu_energy_Wh": round(tracker.final_emissions_data.gpu_energy, 6),
        "final_temperature": round(temps[-1], 2)
    })
