import joblib
import pandas as pd

xgb = joblib.load("backend/data/models/xgboost.pkl")

def predict(data):
    df = pd.DataFrame([data])

    prediction = xgb.predict(df)[0]
    probability = xgb.predict_proba(df).max()

    return {
        "prediction": int(prediction),
        "confidence": float(probability)
    }