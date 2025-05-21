# Recommandations d'optimisation

## Backend

- Réduire la consommation RAM : stocker uniquement les données finales.
- Réduire le recalcul inutile (vent, intensité...).
- Utiliser des outils comme Numba ou Cython pour améliorer les performances.
- Utiliser `@lru_cache` pour éviter les redondances de calcul.
- Préférer une prévision unique longue à plusieurs prévisions courtes si possible.

## Frontend

- Utiliser un framework léger.
- Réduire les appels réseau inutiles.
- Minimiser les assets (images, JS...).
