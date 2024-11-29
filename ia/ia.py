from ultralytics import YOLO
import json

model = YOLO("yolov5s.pt")
 
results = model("images/chienchat.jpg")

detections = []
for result in results:
    for box in result.boxes:
        detection = {
            "class": int(box.cls), 
            "label": result.names[int(box.cls)],  # Nom de l'animal
            "confidence": float(box.conf),
            "box": box.xyxy.tolist()  # Coordonnées
        }
        detections.append(detection)


json_results = json.dumps(detections, indent=4)

print(json_results)


with open("results.json", "w") as f:
    f.write(json_results)
