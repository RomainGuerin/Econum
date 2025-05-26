# Econum

**Econum** est une solution logicielle permettant de simuler l’évolution de la température d'un câble électrique pendant 30 minutes, en fonction de paramètres environnementaux (température ambiante, vent, intensité lumineuse).

# Documentation MkDocs

```bash
pip install mkdocs
cd econum
mkdocs serve --dev-addr=0.0.0.0:9000
```

# Architecture

Le projet est divisé en deux parties principales :  
- **Backend** : Développé en Python avec FastAPI, il gère la simulation de température et les métriques de performance.  
- **Frontend** : Développé en React et Next.js, il fournit une interface utilisateur pour interagir avec le backend et visualiser les résultats de la simulation.  
