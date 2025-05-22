import requests
import random

def main(use_cache=True, nb_calls=10):
    URL = "http://127.0.0.1:8000/metrics_detailed"
    if not use_cache:
        URL += "?nocache=true"

    totals = {
        "cpu_energy_kWh": 0.0,
        "gpu_energy_kWh": 0.0,
        "ram_energy_kWh": 0.0,
        "co2_kg": 0.0,
        "energy_consumed_kWh": 0.0
    }

    print(f"🔁 Lancement de {nb_calls} appels {'sans' if not use_cache else 'avec'} cache")

    for i in range(nb_calls):
        params = {
            "Tc0": 25,
            "Ta": round(random.uniform(15, 30)),
            "ws": round(random.uniform(1, 5)),
            "I": round(random.uniform(150, 500))
        }

        response = requests.get(URL, params=params)
        if response.status_code == 200:
            for key in totals:
                totals[key] += response.json().get(key, 0)
            print(f" Appel {i+1}: OK")
        else:
            print(f" Appel {i+1} échoué : {response.status_code}")

    # Résumé
    print(f"\n📊 Résultats cumulés sur {nb_calls} appels ({'sans' if not use_cache else 'avec'}) cache :")
    for key, value in totals.items():
        print(f"{key.replace('_', ' ').capitalize()} : {value:.6f}")

if __name__ == "__main__":
    use_cache = input("Utiliser le cache ? (o/n) : ").strip().lower() == 'o'
    while True:
        try:
            nb_calls = int(input("Nombre d'appels : "))
            if nb_calls > 0:
                break
            else:
                print("Veuillez entrer un nombre positif.")
        except ValueError:
            print("Entrée invalide. Merci de saisir un nombre.")
    main(use_cache, nb_calls)
