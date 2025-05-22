from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from Solver import solve_temperature, solve_temperature_nocache
from codecarbon import EmissionsTracker
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD
from functools import lru_cache
=======
from time import sleep
import random
>>>>>>> e14f3be (Ajout de /metrics_batch)

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
@lru_cache(maxsize=None) # Cache pour les résultats d'émissions
def metrics_detailed(
    Tc0: float = Query(25.0),
    Ta: float = Query(20.0),
    ws: float = Query(1.0),
    I: float = Query(100.0)
):
    tracker = EmissionsTracker(
        save_to_file=False,
        log_level="error",
        measure_power_secs=1  # ← ⚠️ baisse la fréquence à 1s
    )

    tracker.start()
    _, temps = solve_temperature(Tc0, Ta, ws, I)

    sleep(1)  # ← on garde le tracker allumé au moins 1s

    tracker.stop()
    data = tracker.final_emissions_data

    return JSONResponse({
        "Tc0": Tc0,
        "Ta": Ta,
        "ws": ws,
        "I": I,
        "co2_kg": round(data.emissions, 6),
        "cpu_energy_kWh": round(data.cpu_energy, 6),
        "gpu_energy_kWh": round(data.gpu_energy, 6),
        "ram_energy_kWh": round(data.ram_energy, 6),
        "energy_consumed_kWh": round(data.energy_consumed, 6),
        "temperature": list(map(lambda t: round(t, 2), temps))
    })
@app.get("/metrics_batch")
def metrics_batch(
    Tc0: float = Query(25.0),
    Ta: float = Query(20.0),
    ws: float = Query(2.0),
    I: float = Query(100.0),
    nb: int = Query(1000)
):
    tracker = EmissionsTracker(
        save_to_file=False,
        log_level="error",
        measure_power_secs=1
    )
    
    tracker.start()

    for _ in range(nb):
        solve_temperature(Tc0, Ta, ws, I)

    tracker.stop()
    data = tracker.final_emissions_data

    return JSONResponse({
        "nb_requetes": nb,
        "Tc0": Tc0,
        "Ta": Ta,
        "ws": ws,
        "I": I,
        "co2_kg": round(data.emissions, 6),
        "cpu_energy_kWh": round(data.cpu_energy, 6),
        "gpu_energy_kWh": round(data.gpu_energy, 6),
        "ram_energy_kWh": round(data.ram_energy, 6),
        "energy_consumed_kWh": round(data.energy_consumed, 6)
    })
@app.get("/metrics_batch_nocache")
def metrics_batch_nocache(
    nb: int = Query(1000)
):
    tracker = EmissionsTracker(save_to_file=False, log_level="error")
    tracker.start()

    for _ in range(nb):
        Tc0 = 25
        Ta = 20
        ws = random.uniform(0.5, 5)    
        I = random.uniform(10, 5000)  

        solve_temperature_nocache(Tc0, Ta, ws, I)

    tracker.stop()
    data = tracker.final_emissions_data

    return JSONResponse({
        "nb_requetes": nb,
        "co2_kg": round(data.emissions, 6),
        "cpu_energy_kWh": round(data.cpu_energy, 6),
        "gpu_energy_kWh": round(data.gpu_energy, 6),
        "ram_energy_kWh": round(data.ram_energy, 6),
        "energy_consumed_kWh": round(data.energy_consumed, 6)
    })