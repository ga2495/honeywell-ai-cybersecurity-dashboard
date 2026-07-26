from fastapi import APIRouter
from api.schemas import PredictionRequest
import api.services as services

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "running"}


@router.post("/predict")
def predict(request: PredictionRequest):
    return services.predict_threat(request.model_dump())


@router.get("/stats")
def get_stats():
    return {
        "total_events": 314300,
        "threats": 14300,
        "critical": 850,
        "risk": "HIGH",
    }