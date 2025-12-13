from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle

# Load the trained pipeline
with open("pipeline.pkl", "rb") as f:
    model = pickle.load(f)

app = FastAPI()

# Allow all frontends to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define patient input structure
class Patient(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    Insulin: float
    BMI: float
    Age: float

@app.post("/predict")
def predict(patient: Patient):
    data = [[
        patient.Pregnancies,
        patient.Glucose,
        patient.BloodPressure,
        patient.Insulin,
        patient.BMI,
        patient.Age
    ]]

    prob = model.predict_proba(data)[0][1]
    pred = int(prob >= 0.5)

    return {
        "prediction": pred,
        "probability": float(prob)
    }
