from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

# -----------------------------
# Initialize FastAPI app
# -----------------------------
app = FastAPI(title="Potato Leaf Classifier API")

# Allow CORS from React frontend
origins = [
    "http://localhost:5173",  # React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Load ML Model
# -----------------------------
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "model.keras"

print("Loading model from:", MODEL_PATH)

try:
    model = load_model(MODEL_PATH)
    print("Model loaded successfully")
except Exception as e:
    print("Error loading model:", e)
    model = None

class_labels = ["Earlyblight", "Healthy", "LateBlight"]

# -----------------------------
# Upload directory
# -----------------------------
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# -----------------------------
# Classification endpoint
# -----------------------------
@app.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="ML model not loaded")

    # Ensure a file was uploaded
    if not file.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        raise HTTPException(status_code=400, detail="Invalid image format")

    try:
        # Save uploaded file
        file_path = UPLOAD_DIR / file.filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Load and preprocess image
        img = image.load_img(str(file_path), target_size=(150, 150)) # adjust if needed
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Predict
        predictions = model.predict(img_array)
        class_index = int(np.argmax(predictions))
        predicted_label = class_labels[class_index]
        accuracy = float(np.max(predictions) * 100)

        return {"label": predicted_label, "accuracy": round(accuracy, 2)}

    except Exception as e:
        print("Prediction error:", e)
        raise HTTPException(status_code=500, detail=str(e))