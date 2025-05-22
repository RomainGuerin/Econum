import requests
import random

URL = "http://127.0.0.1:8000/metrics_detailed"

NB_CALLS = 10

total_cpu = 0.0
total_gpu = 0.0
total_ram = 0.0
total_co2 = 0.0
total_energy = 0.0

print(f"🔁 Lancement de {NB_CALLS} ")

for i in range(NB_CALLS):
    params = {
        "Tc0": 25,
        "Ta": 20,
        "ws": round(random.uniform(0.5, 5.0), 2),
        "I": round(random.uniform(10, 1000), 2)
    }

    response = requests.get(URL, params=params)

    if response.status_code == 200:
        data = response.json()
        total_cpu += data.get("cpu_energy_kWh", 0)
        total_gpu += data.get("gpu_energy_kWh", 0)
        total_ram += data.get("ram_energy_kWh", 0)
        total_co2 += data.get("co2_kg", 0)
        total_energy += data.get("energy_consumed_kWh", 0)
        print(f" Appel {i+1}: OK")
    else:
        print(f" Appel {i+1} échoué : {response.status_code}")

# Résumé
print("\n📊 Résultats cumulés sur 10 appels (sans cache) :")
print(f"CPU total        : {total_cpu:.6f} kWh")
print(f"GPU total        : {total_gpu:.6f} kWh")
print(f"RAM total        : {total_ram:.6f} kWh")
print(f"Conso totale     : {total_energy:.6f} kWh")
print(f"CO₂ total        : {total_co2:.6f} kg")
