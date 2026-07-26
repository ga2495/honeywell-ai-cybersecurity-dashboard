import joblib
import pandas as pd

# Load models
xgb_model = joblib.load("backend/data/models/xgboost.pkl")
if_model = joblib.load("backend/data/models/isolation_forest.pkl")
label_encoder = joblib.load("backend/data/models/xgb_label_encoder.pkl")


def predict_threat(data: dict):
    # -----------------------------
    # Create DataFrame
    # -----------------------------
    df = pd.DataFrame([data])

    # Model expects login_success
    if "login_success" not in df.columns:
        df["login_success"] = 1

    # =====================================================
    # Isolation Forest
    # =====================================================
    if_features = list(if_model.feature_names_in_)

    # Add missing columns
    for col in if_features:
        if col not in df.columns:
            df[col] = 0

    # Remove extra columns
    if_df = df[if_features]

    anomaly_score = float(if_model.decision_function(if_df)[0])
    anomaly_prediction = int(if_model.predict(if_df)[0])

    # =====================================================
    # XGBoost
    # =====================================================

    # Update values produced by Isolation Forest
    df["anomaly_score"] = anomaly_score
    df["if_prediction"] = anomaly_prediction

    xgb_features = list(xgb_model.feature_names_in_)

    for col in xgb_features:
        if col not in df.columns:
            df[col] = 0

    xgb_df = df[xgb_features]

    prediction = int(xgb_model.predict(xgb_df)[0])
    confidence = float(xgb_model.predict_proba(xgb_df)[0].max())

    attack_type = label_encoder.inverse_transform([prediction])[0]

    # =====================================================
    # Risk Calculation
    # =====================================================

    if attack_type.lower() == "normal":
        if anomaly_prediction == -1:
            risk = "Medium"
        else:
            risk = "Low"
    else:
        if anomaly_prediction == -1 and confidence >= 0.90:
            risk = "Critical"
        elif confidence >= 0.80:
            risk = "High"
        else:
            risk = "Medium"

    return {
        "attack_type": attack_type,
        "confidence": round(confidence, 4),
        "anomaly_score": round(anomaly_score, 4),
        "risk_level": risk,
    }