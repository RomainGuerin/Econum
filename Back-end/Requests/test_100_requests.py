import requests

URL = "http://127.0.0.1:8000/metrics_detailed"
NB_CALLS = 100

params = {
    "Tc0": 25,
    "Ta": 20,
    "ws": 2,
    "I": 100
}

# Accumulateurs
total_cpu = 0.0
total_gpu = 0.0
total_ram = 0.0
total_co2 = 0.0
total_energy = 0.0

print(f"🚀 Lancement de {NB_CALLS} requêtes...\n")

for i in range(NB_CALLS):
    response = requests.get(URL, params=params)
    if response.status_code == 200:
        data = response.json()
        total_cpu += data.get("cpu_energy_kWh", 0)
        total_gpu += data.get("gpu_energy_kWh", 0)
        total_ram += data.get("ram_energy_kWh", 0)
        total_co2 += data.get("co2_kg", 0)
        total_energy += data.get("energy_consumed_kWh", 0)
    else:
        print(f"❌ Requête {i+1} échouée : {response.status_code}")

# Résultats
print("\n✅ Résultats cumulés :")
print(f"CPU total        : {total_cpu:.6f} kWh")
print(f"GPU total        : {total_gpu:.6f} kWh")
print(f"RAM total        : {total_ram:.6f} kWh")
print(f"Conso totale     : {total_energy:.6f} kWh")
print(f"CO₂ total        : {total_co2:.6f} kg")
