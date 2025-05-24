# Rapport de projet

## Architecture du projet

### Backend
- API dans `Back-end/`
    - `main.py` : Serveur FastAPI
    - `Solver.py` : Calcul des températures

    - `notebook.ipynb` : Tests
    - `cython/` : Optimisation avec cython
    - `requirement.txt` : Dépendances

### Frontend
- Application React et Next.js dans `Frontend/`
- Connexion au backend via appels API

> Le backend et le frontend sont séparés dans des sous-dossiers du même dépôt.

## Performances algorithmiques

| Testcase | CPU | RAM | Énergie | CO2 | Temps d’exécution | Temps de code | Complexité* |
|----------|-----|-----|---------|-----|-------------------|---------------|------------|
| Python | ~0.0217 kWh | ~0.0006 kWh | ~0.02336 kWh | ~0.0013 kg | ~217.1s | 45 min | *** |
| Scipy odeint | ~7.33e-07 kWh | ~6.66e-09 kWh | ~7.39e-07 kWh | ~4.14e-08 kg | ~0.009s | 30 min | ** |
| Numba | ~0.0014 kWh | ~4.03e-05 kWh | ~0.0016 kWh | ~8.83e-05 kg | ~14.5s | 5 min | * |
| Cython | ~0.0031 kWh | ~8.55e-05 kWh | ~0.0032 kWh | ~0.0002 kg | ~15.4s | 1h | **** |

`* Complexité estimée : (* = simple, ***** = très complexe)`

### Prévision 30x1min vs 1x30min

| Méthode | Énergie | CO2 | Temps |
|---------|---------|-----|-------|
| 1x30min | ~0.0217 kWh | ~0.0013 kg | ~217.1s |
| 30x1min | ~0.014 kWh | ~0.0008 kg | ~140.3s |

Il est donc préférable de faire 30x1 minutes. Le code Python est mieux optimisé, principalement parce qu'il ne vérifie pas si nous devons sauvegardée l'information (vérification faite autant de fois qu'il y a de calculs, soit 1,8 milliard). Mais le passage avec Numba ou Cython, cela n'a aucun impact.

### Backend : consommation par utilisateurs

| Charge | Conso (kWh) |
|--------|-------------|
| 10 utilisateurs/min (sans cache) | 0.018966 |
| 100 utilisateurs/min (sans cache) | 0.156688 |
| 1000 utilisateurs/min (sans cache) | 17.317401 |
| 1000 utilisateurs/min (cache) | 0.002516 |

Nous observons une tendance logique :
Plus le nombre d'utilisateurs augmente, plus la consommation moyenne augmente. À l'inverse, avec l'ajout du cache, la consommation reste minimale si les paramètres d'entrée ont déjà été calculés. Nous constatons ainsi l'avantage du cache : une consommation plus faible et une réactivité nettement supérieure.

## Empreinte énergétique du frontend

L'empreinte énergétique et carbone a été analysée avec Carbonalyser et Globemallow, sur les deux outils nous avons des résultats différents mais qui semblent assez proches de la réalité :

### Carbonalyser
![Carbonalyser](images/carbonalyser.png)

### Globemallow
![Globemallow](images/globemallow.png)

### Impact du cache
Néanmoins, nous pouvons voir que le cache permet totalement d’optimiser la consommation en la rendant presque indétectable :

![Cache](images/cache_impact.png)
