import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Brain,
  Activity,
  Target,
} from "lucide-react";
import api from "../services/api";

function PredictionForm({ onPrediction }) {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const [formData, setFormData] = useState({
    entity_type: 0,
    geo_location: 0,
    resource_accessed: 0,
    auth_method: 0,
    session_duration: 120,
    command_sequence: 0,
    device_fingerprint: 0,
    hour: 10,
    day: 15,
    weekday: 2,
    month: 7,
    failed_login: 0,
    failed_login_count: 0,
    avg_session_duration: 100,
    duration_deviation: 20,
    new_device: 0,
    anomaly_score: 0.2,
    if_prediction: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const predictThreat = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/predict", formData);

      setPrediction(res.data);

      if (onPrediction) {
        onPrediction(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("Prediction Failed");
    }

    setLoading(false);
  };

  const getRiskColor = () => {
    if (!prediction) return "#2563eb";

    switch (prediction.risk_level) {
      case "Critical":
        return "#dc2626";
      case "High":
        return "#ea580c";
      case "Medium":
        return "#eab308";
      default:
        return "#16a34a";
    }
  };

  const selectStyle = {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  };

  return (
    <div>
      <form onSubmit={predictThreat}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,minmax(180px,1fr))",
            gap: 16,
          }}
        >
          <select
            name="entity_type"
            value={formData.entity_type}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value={0}>User</option>
            <option value={1}>Administrator</option>
            <option value={2}>Service Account</option>
            <option value={3}>Guest</option>
          </select>

          <select
            name="geo_location"
            value={formData.geo_location}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value={0}>India</option>
            <option value={1}>United States</option>
            <option value={2}>Germany</option>
            <option value={3}>United Kingdom</option>
          </select>

          <select
            name="resource_accessed"
            value={formData.resource_accessed}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value={0}>Database</option>
            <option value={1}>Server</option>
            <option value={2}>Application</option>
            <option value={3}>Cloud Storage</option>
          </select>

          <select
            name="auth_method"
            value={formData.auth_method}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value={0}>Password</option>
            <option value={1}>MFA</option>
            <option value={2}>SSO</option>
            <option value={3}>OAuth</option>
          </select>

          <input
            type="number"
            name="session_duration"
            value={formData.session_duration}
            onChange={handleChange}
            placeholder="Session Duration"
            style={inputStyle}
          />

          <select
            name="command_sequence"
            value={formData.command_sequence}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value={0}>Normal</option>
            <option value={1}>PowerShell</option>
            <option value={2}>CMD</option>
            <option value={3}>Linux Shell</option>
          </select>

          <select
            name="device_fingerprint"
            value={formData.device_fingerprint}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value={0}>Known Device</option>
            <option value={1}>Unknown Device</option>
          </select>

          <select
            name="new_device"
            value={formData.new_device}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>

          <input type="number" name="hour" value={formData.hour} onChange={handleChange} placeholder="Hour" style={inputStyle} />
          <input type="number" name="day" value={formData.day} onChange={handleChange} placeholder="Day" style={inputStyle} />
          <input type="number" name="weekday" value={formData.weekday} onChange={handleChange} placeholder="Weekday" style={inputStyle} />
          <input type="number" name="month" value={formData.month} onChange={handleChange} placeholder="Month" style={inputStyle} />
          <input type="number" name="failed_login" value={formData.failed_login} onChange={handleChange} placeholder="Failed Login" style={inputStyle} />
          <input type="number" step="0.01" name="failed_login_count" value={formData.failed_login_count} onChange={handleChange} placeholder="Failed Login Count" style={inputStyle} />
          <input type="number" step="0.01" name="avg_session_duration" value={formData.avg_session_duration} onChange={handleChange} placeholder="Average Session Duration" style={inputStyle} />
          <input type="number" step="0.01" name="duration_deviation" value={formData.duration_deviation} onChange={handleChange} placeholder="Duration Deviation" style={inputStyle} />
          <input type="number" step="0.01" name="anomaly_score" value={formData.anomaly_score} onChange={handleChange} placeholder="Anomaly Score" style={inputStyle} />
          <input type="number" name="if_prediction" value={formData.if_prediction} onChange={handleChange} placeholder="IF Prediction" style={inputStyle} />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 25,
            padding: "14px 32px",
            border: "none",
            borderRadius: 10,
            background: "#2563eb",
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing Threat..." : "Predict Threat"}
        </button>
      </form>

      {prediction && (
        <div
          style={{
            marginTop: 35,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              background: "#0f172a",
              color: "white",
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Brain size={30} />
            <div>
              <h2 style={{ margin: 0 }}>AI Threat Analysis</h2>
              <p style={{ margin: "4px 0 0", color: "#cbd5e1" }}>
                Machine Learning Prediction Result
              </p>
            </div>
          </div>

          <div
            style={{
              padding: 25,
              background: "white",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 20,
            }}
          >
            <InfoCard
              icon={<Shield />}
              title="Attack Type"
              value={prediction.attack_type}
            />

            <InfoCard
              icon={<AlertTriangle />}
              title="Risk Level"
              value={
                <span style={{ color: getRiskColor(), fontWeight: "bold" }}>
                  {prediction.risk_level}
                </span>
              }
            />

            <div style={cardStyle}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <Activity size={18} />
                <strong>Confidence</strong>
              </div>

              <h2>{(prediction.confidence * 100).toFixed(2)}%</h2>

              <div
                style={{
                  height: 10,
                  borderRadius: 10,
                  background: "#e2e8f0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${prediction.confidence * 100}%`,
                    height: "100%",
                    background: "#2563eb",
                  }}
                />
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <Target size={18} />
                <strong>Anomaly Score</strong>
              </div>

              <h2>{prediction.anomaly_score}</h2>

              <p style={{ color: "#64748b" }}>
                Isolation Forest Output
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        {icon}
        <strong>{title}</strong>
      </div>

      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );
}

const cardStyle = {
  background: "#f8fafc",
  borderRadius: 12,
  padding: 20,
};

export default PredictionForm;