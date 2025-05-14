import numpy as np
from scipy.integrate import odeint

def dTc_dt(Tc, t, Ta, ws, I):
    facteur = (- ((ws ** 2) / 1600) * 0.4) - 0.1
    droite = (Tc - Ta - (((I ** 1.4) / 73785) * 130))
    return (facteur * droite) / 60

def solve_temperature(Tc0, Ta, ws, I):
    dt = 0.1
    T_total = 30 * 60  # 30 minutes en secondes
    N = int(T_total / dt)
    t_vals = np.linspace(0, T_total, N + 1)
    sol = odeint(dTc_dt, Tc0, t_vals, args=(Ta, ws, I))

    minutes = np.arange(0, 31)  # de 0 à 30 minutes inclus
    indices = (minutes * 60 / dt).astype(int)
    temperatures = sol[indices, 0]

    return minutes, temperatures
