from flask import Flask, jsonify, render_template
import json
import os

app = Flask(__name__)

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "organs.json")


def load_organs():
    with open(DATA_PATH, "r") as f:
        return json.load(f)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/organs")
def api_organs():
    return jsonify(load_organs())


@app.route("/api/organs/<organ_id>")
def api_organ(organ_id):
    organs = load_organs()
    match = next((o for o in organs if o["id"] == organ_id), None)
    if not match:
        return jsonify({"error": "not found"}), 404
    return jsonify(match)


if __name__ == "__main__":
    app.run(debug=True, port=5050)
