import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib


def load_data():

    df = pd.read_csv("backend/data/processed/feature_dataset.csv")

    return df

def prepare_features(df):

    drop_columns = [
        "entity_id",
        "timestamp",
        "label",
        "source_ip"          # <-- add this
    ]

    X = df.drop(columns=drop_columns)

    return X


def train_model(X):

    model = IsolationForest(
        n_estimators=300,
        contamination=0.05,
        random_state=42,
        n_jobs=-1
    )

    model.fit(X)

    return model


def main():

    print("Loading feature dataset...")

    df = load_data()

    X = prepare_features(df)

    print("Training Isolation Forest...")

    model = train_model(X)

    scores = model.decision_function(X)

    predictions = model.predict(X)

    df["anomaly_score"] = scores

    df["if_prediction"] = predictions

    joblib.dump(
        model,
        "backend/data/models/isolation_forest.pkl"
    )

    df.to_csv(
        "backend/data/processed/feature_dataset.csv",
        index=False
    )

    print(df[["anomaly_score", "if_prediction"]].head())

    print("\nIsolation Forest Completed!")

    print(df["if_prediction"].value_counts())


if __name__ == "__main__":
    main()