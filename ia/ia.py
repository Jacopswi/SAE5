from flask import Flask, request, jsonify
from ultralytics import YOLO
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = YOLO("yolov5s.pt")  # Chargez le modèle YOLO une seule fois

@app.route("/detect", methods=["POST"])
def detect():
    # Recevez l'image envoyée via une requête POST
    file = request.files["image"]
    file.save("uploaded_image.jpg")  # Sauvegarder temporairement l'image
    
    # Exécuter la détection YOLO
    results = model("uploaded_image.jpg")
    
    detections = []
    for result in results:
        for box in result.boxes:
            detection = {
                "class": int(box.cls),
                "label": result.names[int(box.cls)],
                "confidence": float(box.conf),
                "box": box.xyxy.tolist(),
            }
            detections.append(detection)

    # Retourner les résultats au format JSON
    return jsonify(detections)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
