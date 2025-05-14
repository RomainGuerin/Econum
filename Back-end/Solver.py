import numpy as np
from scipy.integrate import odeint


# Équation différentielle : dérivée de Tc en fonction du temps
def dTc_dt(Tc, t, Ta, ws, I):
    facteur = (- (ws ** 2) / 1600) * 0.4 - 0.1
    droite = (Tc - Ta - (I ** 1.4) / (73785 * 130))
    return (facteur * droite) / 60


# Fonction principale qui résout Tc sur 30 minutes
def solve_temperature(Tc0, Ta, ws, I, duration_min=30):
    # Temps en secondes (1 point par minute ici)
    t = np.linspace(0, duration_min * 60, duration_min)
    # Résolution de l'équation différentielle
    result = odeint(dTc_dt, Tc0, t, args=(Ta, ws, I))
    # Retourne les minutes et les températures aplaties
    return t / 60, result.flatten()

# Test rapide du module si lancé directement
if __name__ == "__main__":
    time, temps = solve_temperature(Tc0=25, Ta=20, ws=2, I=100)
    for t, temp in zip(time, temps):
        print(f"{t:.0f} min : {temp:.2f} °C")
