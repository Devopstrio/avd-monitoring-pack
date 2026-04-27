import pytest
from fastapi.testclient import TestClient
from backend.src.main import app

# Devopstrio AVD Monitoring Pack
# Integration Tests for Observability & Health Intelligence

client = TestClient(app)

def test_health_summary_retrieval():
    """Verify that the platform reportable global health summary is operational."""
    response = client.get("/health/summary")
    assert response.status_code == 200
    assert response.json()["status"] == "Healthy"
    assert "global_ux_score" in response.json()

def test_host_observability_listing():
    """Ensure the monitoring gateway can list session hosts and their real-time load."""
    response = client.get("/hosts")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert "cpu" in data[0]

def test_active_session_ux_metrics():
    """Verify that user session data including UX scores is available."""
    response = client.get("/users/sessions")
    assert response.status_code == 200
    assert "ux_score" in response.json()[0]

def test_alert_incident_access():
    """Ensure active incidents are reportable to the operations center."""
    response = client.get("/alerts")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_alert_acknowledgement_workflow():
    """Verify that an operator can acknowledge an active alert."""
    payload = {
        "alert_id": "alt-001",
        "operator_id": "ops-manager-01",
        "note": "Investigating high latency spikes."
    }
    response = client.post("/alerts/acknowledge", json=payload)
    assert response.status_code == 200
    assert response.json()["status"] == "Updated"

def test_capacity_forecast_accuracy():
    """Check that the intelligence engine provides actionable scaling recommendations."""
    response = client.get("/capacity/forecast")
    assert response.status_code == 200
    assert "predicted_peak_concurrency" in response.json()
    assert "recommendation" in response.json()
