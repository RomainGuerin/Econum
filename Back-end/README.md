# Backend Econum

Ce dépôt contient l'application backend pour Econum.

## TODO
- [ ] PowerAPI : Avec Linux
- [ ] pyRALP : Avec Linux
- [ ] energyusage : Avec Linux
- [x] Réduire le pas de temps : 0.1s vers 1e-6s (crash pc) car trop de calculs
- [x] Ajout possiblement d'un cache pour les calculs

## Configuration

1. Installer les dépendances : 
```bash
    pip install -r requirement.txt
``` 

2. Exécuter l'application :  
```bash
    uvicorn main:app --reload
``` 

3. Accéder à l'application :  
```bash
    http://127.0.0.1:8000/
```

4. Accéder à la documentation de l'API :  
```bash
    http://127.0.0.1:8000/docs
```

## Tests

Url d'exemple pour tester l'API :  
```bash
    http://127.0.0.1:8000/predict?Tc0=25&Ta=20&ws=2&I=100
```
