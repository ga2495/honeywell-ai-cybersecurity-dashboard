from pydantic import BaseModel

class PredictionRequest(BaseModel):
    entity_type: int
    geo_location: int
    resource_accessed: int
    auth_method: int
    session_duration: float
    command_sequence: int
    device_fingerprint: int
    hour: int
    day: int
    weekday: int
    month: int
    failed_login: int
    failed_login_count: float
    avg_session_duration: float
    duration_deviation: float
    new_device: int