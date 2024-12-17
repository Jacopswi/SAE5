from flask import Flask, request, jsonify
from ultralytics import YOLO
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = YOLO("yolov5s.pt") 

@app.route("/detect", methods=["POST"])
def detect():
    file = request.files["image"]
    file.save("uploaded_image.jpg")
    
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

    return jsonify(detections)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
