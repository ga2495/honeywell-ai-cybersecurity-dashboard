import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler

SEQUENCE_LENGTH = 10


def main():

    print("Loading dataset...")

    df = pd.read_csv("backend/data/processed/feature_dataset.csv")

    # Sort by entity and time
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df = df.sort_values(["entity_id", "timestamp"]).reset_index(drop=True)

    # Keep only numeric columns
    feature_columns = df.select_dtypes(include=[np.number]).columns.tolist()

    # Remove target column if it is numeric
    if "label" in feature_columns:
        feature_columns.remove("label")

    print("\nFeatures used by Transformer:")
    print(feature_columns)

    # Scale numeric features
    scaler = StandardScaler()
    df[feature_columns] = scaler.fit_transform(df[feature_columns])

    # Save scaler
    joblib.dump(
        scaler,
        "backend/data/models/scaler.pkl"
    )

    X = []
    y = []

    print("\nBuilding sequences...")

    # Build sequences for each entity
    for _, group in df.groupby("entity_id"):

        values = group[feature_columns].values
        labels = group["label"].values

        if len(values) < SEQUENCE_LENGTH:
            continue

        for i in range(len(values) - SEQUENCE_LENGTH + 1):
            X.append(values[i:i + SEQUENCE_LENGTH])
            y.append(labels[i + SEQUENCE_LENGTH - 1])

    X = np.array(X, dtype=np.float32)
    y = np.array(y)

    print("\nSaving files...")

    np.save(
        "backend/data/processed/X_sequences.npy",
        X
    )

    np.save(
        "backend/data/processed/y_sequences.npy",
        y
    )

    print("\n===================================")
    print("Sequence Generation Complete")
    print("===================================")
    print("X Shape :", X.shape)
    print("Y Shape :", y.shape)
    print("Sequence Length :", SEQUENCE_LENGTH)
    print("Features :", len(feature_columns))


if __name__ == "__main__":
    main()