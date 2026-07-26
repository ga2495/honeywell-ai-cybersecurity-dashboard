import joblib
import shap
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

print("Loading model...")

model = joblib.load("backend/data/models/xgboost.pkl")

print("Loading dataset...")

df = pd.read_csv("backend/data/processed/feature_dataset.csv")

X = df.drop(columns=[
    "entity_id",
    "timestamp",
    "label",
    "source_ip"
])

sample = X.sample(1000, random_state=42)

print("Building SHAP Explainer...")

explainer = shap.TreeExplainer(model)

print("Calculating SHAP values...")

shap_values = explainer.shap_values(sample)

print("Generating Summary Plot...")

plt.figure(figsize=(12, 8))

shap.summary_plot(
    shap_values,
    sample,
    show=False
)

plt.tight_layout()

plt.savefig(
    "backend/data/models/shap_summary.png",
    dpi=300
)

print("SHAP summary saved!")

# -----------------------------
# Calculate feature importance
# -----------------------------

if isinstance(shap_values, list):
    importance = np.mean(
        [np.abs(sv).mean(axis=0) for sv in shap_values],
        axis=0
    )
else:
    # SHAP >= 0.46 multiclass returns
    # (samples, features, classes)
    if len(shap_values.shape) == 3:
        importance = np.abs(shap_values).mean(axis=(0, 2))
    else:
        importance = np.abs(shap_values).mean(axis=0)

importance_df = pd.DataFrame({
    "Feature": sample.columns,
    "Importance": importance
})

importance_df = importance_df.sort_values(
    by="Importance",
    ascending=False
)

print("\nTop 15 Important Features:\n")

print(importance_df.head(15))