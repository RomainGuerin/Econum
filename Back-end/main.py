from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from Solver import solve_temperature
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

@app.get("/metrics")
def metrics(
    Tc0: float = Query(25.0),
    Ta: float = Query(20.0),
    ws: float = Query(1.0),
    I: float = Query(100.0)
):
    print("✅ Route /metrics appelée")  # Debug
    start = time.perf_counter()  # haute précision
    _, temps = solve_temperature(Tc0, Ta, ws, I)
    duration_sec = time.perf_counter() - start  # haute précision
    duration_ms = round(duration_sec * 1000, 4)

    # Estimation de la consommation énergétique
    conso_W = 50  # consommation typique CPU
    energy_Wh = (conso_W * duration_sec) / 3600
    co2_kg = energy_Wh * 0.475  # facteur d’émission CO2/kWh

    return JSONResponse({
        "Tc0": Tc0,
        "Ta": Ta,
        "ws": ws,
        "I": I,
        "duration_ms": duration_ms,
        "energy_Wh": round(energy_Wh, 6),
        "co2_kg": round(co2_kg, 6),
        "final_temperature": round(temps[-1], 2)
    })
