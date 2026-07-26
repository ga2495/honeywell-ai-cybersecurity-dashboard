import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
from xgboost import XGBClassifier


def load_data():

    df = pd.read_csv("backend/data/processed/feature_dataset.csv")

    return df


def prepare(df):

    X = df.drop(columns=[
        "entity_id",
        "timestamp",
        "label",
        "source_ip"
    ])

    encoder = LabelEncoder()

    y = encoder.fit_transform(df["label"])

    joblib.dump(
        encoder,
        "backend/data/models/xgb_label_encoder.pkl"
    )

    return X, y


def main():

    print("Loading dataset...")

    df = load_data()

    X, y = prepare(df)

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    print("Training XGBoost...")

    model = XGBClassifier(
        n_estimators=300,
        max_depth=8,
        learning_rate=0.05,
        objective="multi:softprob",
        num_class=len(set(y)),
        tree_method="hist",
        eval_metric="mlogloss",
        random_state=42
    )

    model.fit(X_train, y_train)

    preds = model.predict(X_test)

    print("\nAccuracy:", accuracy_score(y_test, preds))

    print("\nClassification Report:\n")

    print(classification_report(y_test, preds))

    joblib.dump(
        model,
        "backend/data/models/xgboost.pkl"
    )

    print("\nXGBoost Model Saved!")


if __name__ == "__main__":
    main()