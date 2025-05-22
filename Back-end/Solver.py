import numpy as np
from scipy.integrate import odeint
from functools import lru_cache
from numba import njit

MINUTES = 30
SECONDES = 60
PAS_DE_TEMPS = 1e-6

@njit
def simulate_temperature_loop(t_c, n_etapes, t_a, ws, i):
    temps_initial = 0.0

    facteur_vent = (- ((ws ** 2) / 1600.0) * 0.4) - 0.1
    facteur_intensite = (((i ** 1.4) / 73785.0) * 130)

    next_minute = 0
    resultats_minutes = []
    resultats_temperatures = []

    for _ in range(n_etapes+1):
        droite = (t_c - t_a - facteur_intensite)
        t_c += PAS_DE_TEMPS * (facteur_vent * droite) / 60.0
        temps_initial += PAS_DE_TEMPS

        if temps_initial >= next_minute:
            resultats_minutes.append(int(temps_initial / 60))
            resultats_temperatures.append(t_c)
            next_minute += SECONDES

    return resultats_minutes, resultats_temperatures

def solve_temperature(t_c: float, t_a: float, ws: float, i: float, nocache=False):
    temps_total = MINUTES * SECONDES
    n_etapes = int(temps_total / PAS_DE_TEMPS)
    if nocache:
        return simulate_temperature_loop(t_c, n_etapes, t_a, ws, i)
    return solve_temperature_cached(t_c, t_a, ws, i, n_etapes)

@lru_cache(maxsize=None)
def solve_temperature_cached(t_c: float, t_a: float, ws: float, i: float, n_etapes: int):
    return simulate_temperature_loop(t_c, n_etapes, t_a, ws, i)
