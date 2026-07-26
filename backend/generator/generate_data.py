import random
import pandas as pd
from faker import Faker
from attack_patterns import *
import attack_patterns

print("Imported from:", attack_patterns.__file__)
print("Has credential stuffing:", hasattr(attack_patterns, "inject_credential_stuffing"))
from datetime import datetime, timedelta

from utils import *

fake = Faker()

NUM_USERS = 2000
NUM_DEVICES = 800
NORMAL_EVENTS = 300000

def generate_user_profiles():

    profiles = {}

    for i in range(NUM_USERS):

        entity = f"USER_{i:04d}"

        profiles[entity] = {

            "entity_type": "user",

            "city": random_city(),

            "login_hour": random.randint(7, 20),

            "resource": random_resource(),

            "auth": random_auth(),

            "device": random_device(),

            "ip": random_ip(),

            "mac": random_mac(),

            "avg_duration": random.randint(10, 60)

        }

    return profiles

def generate_device_profiles():

    profiles = {}

    for i in range(NUM_DEVICES):

        entity = f"DEVICE_{i:04d}"

        profiles[entity] = {

            "entity_type": "edge_device",

            "city": random_city(),

            "login_hour": random.randint(0,23),

            "resource": random_resource(),

            "auth": "Certificate",

            "device": "Firmware2.1",

            "ip": random_ip(),

            "mac": random_mac(),

            "avg_duration": random.randint(30,180)

        }

    return profiles

def generate_normal_events(user_profiles, device_profiles):

    events = []

    profiles = {}

    profiles.update(user_profiles)
    profiles.update(device_profiles)

    start_date = datetime(2026, 1, 1)

    entities = list(profiles.keys())

    for _ in range(NORMAL_EVENTS):

        entity = random.choice(entities)

        profile = profiles[entity]

        # Login hour with slight variation
        hour = max(
            0,
            min(
                23,
                profile["login_hour"] + random.randint(-1, 1)
            )
        )

        minute = random.randint(0, 59)
        second = random.randint(0, 59)

        day_offset = random.randint(0, 180)

        timestamp = (
            start_date +
            timedelta(days=day_offset,
                      hours=hour,
                      minutes=minute,
                      seconds=second)
        )

        session_duration = max(
            1,
            int(
                random.gauss(
                    profile["avg_duration"],
                    5
                )
            )
        )

        event = {

            "entity_id": entity,

            "entity_type": profile["entity_type"],

            "timestamp": timestamp,

            "source_ip": profile["ip"],

            "geo_location": profile["city"],

            "resource_accessed": profile["resource"],

            "auth_method": profile["auth"],

            "session_duration": session_duration,

            "command_sequence": random_command(),

            "device_fingerprint":
                f'{profile["device"]}_{profile["mac"]}',

            "login_success": True,

            "label": "Normal"

        }

        events.append(event)

    return pd.DataFrame(events)
def main():

    print("Generating user profiles...")
    user_profiles = generate_user_profiles()

    print("Generating device profiles...")
    device_profiles = generate_device_profiles()

    print("Generating normal events...")
    df = generate_normal_events(user_profiles, device_profiles)

    print("Injecting Brute Force attacks...")
    df = inject_brute_force(df)

    print("Injecting Impossible Travel attacks...")
    df = inject_impossible_travel(df)

    print("Injecting Credential Stuffing attacks...")
    df = inject_credential_stuffing(df)

    print("Injecting Lateral Movement attacks...")
    df = inject_lateral_movement(df)

    print("Injecting Device Spoofing attacks...")
    df = inject_device_spoofing(df)

    print("Injecting Low and Slow attacks...")
    df = inject_low_and_slow(df)

    # Shuffle dataset
    df = df.sample(frac=1).reset_index(drop=True)

    # Save dataset
    df.to_csv("backend/data/raw/synthetic_logs.csv", index=False)

    print(df.head())

    print("\nDataset Shape:", df.shape)

    print("\nLabel Distribution:")
    print(df["label"].value_counts())

    print("\nDataset saved successfully!")


if __name__ == "__main__":
    main()