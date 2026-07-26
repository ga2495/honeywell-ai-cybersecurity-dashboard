import random
import pandas as pd
from datetime import timedelta
from faker import Faker

fake = Faker()


# ---------------------------------------------------
# Brute Force Attack
# ---------------------------------------------------

def inject_brute_force(df, num_attacks=500):

    attack_rows = []

    users = df[df["entity_type"] == "user"]["entity_id"].unique()

    for _ in range(num_attacks):

        user = random.choice(users)

        user_events = df[df["entity_id"] == user]

        if len(user_events) == 0:
            continue

        base = user_events.sample(1).iloc[0]

        base_time = pd.to_datetime(base["timestamp"])

        attacker_ip = fake.ipv4()

        for i in range(10):

            row = base.copy()

            row["timestamp"] = base_time + timedelta(seconds=i * 5)

            row["source_ip"] = attacker_ip

            row["login_success"] = False

            row["label"] = "Brute Force"

            attack_rows.append(row)

    if attack_rows:
        df = pd.concat([df, pd.DataFrame(attack_rows)], ignore_index=True)

    return df


# ---------------------------------------------------
# Impossible Travel
# ---------------------------------------------------

def inject_impossible_travel(df, num_attacks=300):

    cities = [
        "Delhi",
        "Mumbai",
        "Bangalore",
        "Chennai",
        "London",
        "New York",
        "Tokyo",
        "Sydney"
    ]

    attack_rows = []

    users = df[df["entity_type"] == "user"]["entity_id"].unique()

    for _ in range(num_attacks):

        user = random.choice(users)

        user_events = df[df["entity_id"] == user]

        if len(user_events) == 0:
            continue

        base = user_events.sample(1).iloc[0]

        row = base.copy()

        row["timestamp"] = pd.to_datetime(base["timestamp"]) + timedelta(minutes=20)

        new_city = random.choice(cities)

        while new_city == base["geo_location"]:
            new_city = random.choice(cities)

        row["geo_location"] = new_city

        row["source_ip"] = fake.ipv4()

        row["label"] = "Impossible Travel"

        attack_rows.append(row)

    if attack_rows:
        df = pd.concat([df, pd.DataFrame(attack_rows)], ignore_index=True)

    return df

# ---------------------------------------------------
# Credential Stuffing
# ---------------------------------------------------

def inject_credential_stuffing(df, num_attacks=300):

    attack_rows = []

    users = list(df[df["entity_type"] == "user"]["entity_id"].unique())

    for _ in range(num_attacks):

        attacker_ip = fake.ipv4()

        selected_users = random.sample(users, min(20, len(users)))

        base_time = pd.Timestamp("2026-06-01") + timedelta(
            days=random.randint(0, 30),
            hours=random.randint(0, 23),
            minutes=random.randint(0, 59)
        )

        for i, user in enumerate(selected_users):

            base = df[df["entity_id"] == user].sample(1).iloc[0]

            row = base.copy()

            row["timestamp"] = base_time + timedelta(seconds=i * 3)

            row["source_ip"] = attacker_ip

            row["login_success"] = False

            row["label"] = "Credential Stuffing"

            attack_rows.append(row)

    if attack_rows:
        df = pd.concat([df, pd.DataFrame(attack_rows)], ignore_index=True)

    return df

# ---------------------------------------------------
# Lateral Movement
# ---------------------------------------------------

def inject_lateral_movement(df, num_attacks=250):

    attack_rows = []

    resources = [
        "Finance_DB",
        "HR_Portal",
        "Admin_Panel",
        "SCADA",
        "Cloud_Storage",
        "Source_Code",
        "CRM",
        "IoT_Gateway"
    ]

    users = df[df["entity_type"] == "user"]["entity_id"].unique()

    for _ in range(num_attacks):

        user = random.choice(users)

        base = df[df["entity_id"] == user].sample(1).iloc[0]

        start = pd.to_datetime(base["timestamp"])

        chosen_resources = random.sample(resources, 5)

        for i, resource in enumerate(chosen_resources):

            row = base.copy()

            row["timestamp"] = start + timedelta(minutes=i * 2)

            row["resource_accessed"] = resource

            row["label"] = "Lateral Movement"

            attack_rows.append(row)

    if attack_rows:
        df = pd.concat([df, pd.DataFrame(attack_rows)], ignore_index=True)

    return df
# ---------------------------------------------------
# Device Spoofing
# ---------------------------------------------------

def inject_device_spoofing(df, num_attacks=250):

    attack_rows = []

    devices = [
        "Windows11_FAKE123",
        "Ubuntu22_FAKE456",
        "MacOS14_FAKE789",
        "Android13_FAKE999"
    ]

    entities = df["entity_id"].unique()

    for _ in range(num_attacks):

        entity = random.choice(entities)

        base = df[df["entity_id"] == entity].sample(1).iloc[0]

        row = base.copy()

        row["timestamp"] = pd.to_datetime(base["timestamp"]) + timedelta(hours=1)

        row["device_fingerprint"] = random.choice(devices)

        row["label"] = "Device Spoofing"

        attack_rows.append(row)

    if attack_rows:
        df = pd.concat([df, pd.DataFrame(attack_rows)], ignore_index=True)

    return df
# ---------------------------------------------------
# Low and Slow Exfiltration
# ---------------------------------------------------

def inject_low_and_slow(df, num_attacks=150):

    attack_rows = []

    users = df[df["entity_type"] == "user"]["entity_id"].unique()

    for _ in range(num_attacks):

        user = random.choice(users)

        base = df[df["entity_id"] == user].sample(1).iloc[0]

        start = pd.to_datetime(base["timestamp"])

        for day in range(10):

            row = base.copy()

            row["timestamp"] = start + timedelta(days=day)

            row["session_duration"] += random.randint(5, 15)

            row["resource_accessed"] = "Cloud_Storage"

            row["label"] = "Low and Slow"

            attack_rows.append(row)

    if attack_rows:
        df = pd.concat([df, pd.DataFrame(attack_rows)], ignore_index=True)

    return df

print("Attack patterns loaded")
print("Credential function exists:", "inject_credential_stuffing" in globals())
print(globals().keys())