from codecarbon import EmissionsTracker
import numpy as np
from temps import simulate_temperature_loop

def solve_temperature(Tc: float, Ta: float, ws: float, I: float):
    return simulate_temperature_loop(Tc, Ta, ws, I)

tracker = EmissionsTracker(save_to_file=False, log_level="error")
tracker.start()
_, temps = solve_temperature(25, 20, 1, 100)
tracker.stop()

print(f"Durée : {tracker.final_emissions_data.duration} s")
print(f"Emissions de CO2 : {tracker.final_emissions_data.emissions} kg")
print(f"Énergie CPU : {tracker.final_emissions_data.cpu_energy} kWh")
print(f"Énergie GPU : {tracker.final_emissions_data.gpu_energy} kWh")
print(f"Énergie RAM : {tracker.final_emissions_data.ram_energy} kWh")
print(f"Énergie Total : {tracker.final_emissions_data.energy_consumed} kWh")
print(f"Températures : {list(map(lambda t: round(t, 2), temps))}")
