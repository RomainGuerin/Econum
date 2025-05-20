import numpy as np
cimport numpy as np

def simulate_temperature_loop(double Tc, double Ta, double ws, double I):
    cdef int MINUTES = 30
    cdef int SECONDES = 60
    cdef double PAS_DE_TEMPS = 1e-6

    cdef double facteur_vent = (- ((ws ** 2) / 1600.0) * 0.4) - 0.1
    cdef double facteur_intensite = (((I ** 1.4) / 73785.0) * 130)

    resultats_minutes = np.zeros(MINUTES + 1, dtype=np.int32)
    resultats_temperatures = np.zeros(MINUTES + 1, dtype=np.float64)

    resultats_minutes[0] = 0
    resultats_temperatures[0] = Tc

    cdef int idx = 1
    cdef int minute, seconde, i
    cdef double droite

    for minute in range(MINUTES):
        for seconde in range(SECONDES):
            for i in range(int(1 / PAS_DE_TEMPS)):
                droite = (Tc - Ta - facteur_intensite)
                Tc += PAS_DE_TEMPS * (facteur_vent * droite) / 60.0
        resultats_minutes[idx] = minute
        resultats_temperatures[idx] = Tc
        idx += 1

    return resultats_minutes, resultats_temperatures
