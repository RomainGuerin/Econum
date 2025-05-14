from flask import Flask, request, jsonify
from Solver import solve_temperature



app = Flask(__name__)

@app.route("/predict", methods=["GET"])
def predict():
    try:
        # Récupérer les paramètres de la requête
        Tc0 = float(request.args.get("Tc0", 25))
        Ta = float(request.args.get("Ta", 20))
        ws = float(request.args.get("ws", 1))
        I = float(request.args.get("I", 100))
        
        # Résolution
        time, temps = solve_temperature(Tc0, Ta, ws, I)
        
        return jsonify({
            "minutes": list(map(int, time)),
            "temperature": list(map(lambda t: round(t, 2), temps))
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
