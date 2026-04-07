from fastapi import FastAPI
import pickle
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = pickle.load(open("../ml/model.pkl", "rb"))

@app.get("/")
def home():
    return {"message": "FIFA Predictor API running"}

@app.post("/predict")
def predict(data: dict):
    features = [[
        data['possession_diff'],
        data['shot_accuracy_diff'],
        data['pass_accuracy_diff'],
        data['goal_conversion_team1'],
        data['goal_conversion_team2']
    ]]
    
    prediction = model.predict(features)
    
    return {"prediction": prediction.tolist()}
import requests

API_KEY = os.getenv("API_KEY")

@app.get("/matches")
def get_matches():
    url = "https://api.football-data.org/v4/matches"
    
    headers = {
        "X-Auth-Token": API_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        return {
            "error": response.status_code,
            "message": response.text
        }
    
    data = response.json()
    
    matches = []
    
    for match in data.get("matches", []):
        matches.append({
            "home_team": match.get("homeTeam", {}).get("name"),
            "away_team": match.get("awayTeam", {}).get("name"),
            "date": match.get("utcDate"),
            "status": match.get("status")
        })
    
    return matches