# Backend - Fiche de configuration 

## Description

Le backend est développé en Python avec le framework FastAPI.  
Il permet:  
- La simulation de température sur 30 minutes, à partir de paramètres fournis par l’utilisateur (température initiale, vent, intensité…).  
- La mesure de l’énergie et les ressources consommée ainsi que les émissions de CO₂ lors du calcul.  
- Une API REST pour requêtes GET de simulation ou métriques.  

##  Technologies utilisées
- `FastAPI` : API REST performante
- `CodeCarbon` : suivi de l’empreinte carbone et de la consommation de ressources
- `@lru_cache` : mise en cache pour éviter les recalculs
- `Numba` : compilation JIT pour accélérer les calculs lourds
- `Cython` (optionnel) : alternative pour encore plus de performance

## Prérequis
- Python 3.13+
- Cython installé avec pip
- Visual Studio avec le composant "Développement Desktop en C++"

## Configuration

1. Accéder au dossier Back-end :  
```bash
cd Back-end
```

2. Installer les dépendances :
```bash
pip install -r requirement.txt
``` 

3. Exécuter l'application :  
```bash
uvicorn main:app --reload
``` 

4. Accéder à l'application :  
```bash
http://127.0.0.1:8000/
```

## Documentation API
Swagger :
```bash
http://127.0.0.1:8000/docs
```

Et ReDoc :

```bash
http://127.0.0.1:8000/redoc
```

## Tests d'API

Url d'exemple pour tester l'API :  
```bash
http://127.0.0.1:8000/predict?Tc0=25&Ta=20&ws=2&I=100
http://127.0.0.1:8000/metrics_detailed?Tc0=25&Ta=20&ws=2&I=100
```

## Cython

> /!\ Installer Cython avec pip et "Développement Desktop en C++" sur Visual Studio avant !

1. Accéder au dossier Cython :  
```bash
cd cython
```

2. Installer Cython :  
```bash
pip install cython
```

3. Compiler le code :  
```bash
python setup.py build_ext --inplace
```

4. Exécuter le code :  
```bash
python main.py
```
