import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder


def load_dataset(path):
    df = pd.read_csv(path)

    df["timestamp"] = pd.to_datetime(df["timestamp"])

    df = df.sort_values(["entity_id", "timestamp"])

    return df


def extract_time_features(df):

    df["hour"] = df["timestamp"].dt.hour

    df["day"] = df["timestamp"].dt.day

    df["weekday"] = df["timestamp"].dt.weekday

    df["month"] = df["timestamp"].dt.month

    return df


def failed_login_features(df):

    df["failed_login"] = (~df["login_success"]).astype(int)

    df["failed_login_count"] = (
        df.groupby("entity_id")["failed_login"]
        .rolling(10, min_periods=1)
        .sum()
        .reset_index(level=0, drop=True)
    )

    return df


def session_features(df):

    df["avg_session_duration"] = (
        df.groupby("entity_id")["session_duration"]
        .transform("mean")
    )

    df["duration_deviation"] = (
        df["session_duration"] -
        df["avg_session_duration"]
    )

    return df


def new_device_feature(df):

    seen = {}

    flags = []

    for _, row in df.iterrows():

        entity = row["entity_id"]

        device = row["device_fingerprint"]

        if entity not in seen:
            seen[entity] = set()

        if device in seen[entity]:
            flags.append(0)
        else:
            flags.append(1)
            seen[entity].add(device)

    df["new_device"] = flags

    return df


def encode_columns(df):

    cols = [
        "entity_type",
        "geo_location",
        "resource_accessed",
        "auth_method",
        "command_sequence",
        "device_fingerprint"
    ]

    encoders = {}

    for c in cols:

        le = LabelEncoder()

        df[c] = le.fit_transform(df[c])

        encoders[c] = le

    return df, encoders


def main():

    print("Loading dataset...")

    df = load_dataset("backend/data/raw/synthetic_logs.csv")

    print("Extracting time features...")
    df = extract_time_features(df)

    print("Creating login features...")
    df = failed_login_features(df)

    print("Creating session features...")
    df = session_features(df)

    print("Creating device history...")
    df = new_device_feature(df)

    print("Encoding categorical columns...")
    df, encoders = encode_columns(df)

    print(df.head())

    df.to_csv(
        "backend/data/processed/feature_dataset.csv",
        index=False
    )

    print("Feature Engineering Complete!")
    print(df.shape)


if __name__ == "__main__":
    main()