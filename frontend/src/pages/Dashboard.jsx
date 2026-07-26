import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ThreatTable from "../components/ThreatTable";
import PredictionForm from "../components/PredictionForm";
import ThreatTimelineChart from "../components/ThreatTimelineChart";
import AttackDistributionChart from "../components/AttackDistributionChart";

import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_events: 0,
    threats: 0,
    critical: 0,
    risk: "LOW",
  });

  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      console.log("Fetching stats...");

      const res = await api.get("/stats");

      console.log("Stats Response:", res.data);

      setStats({
        total_events: res.data.total_events,
        threats: res.data.threats,
        critical: res.data.critical,
        risk: res.data.risk,
      });
    } catch (err) {
      console.error("Stats Error:", err);

      alert(
        err.response
          ? JSON.stringify(err.response.data)
          : err.message
      );
    }
  };

  const handlePrediction = (prediction) => {
    const item = {
      id: Date.now(),
      ...prediction,
      time: new Date().toLocaleTimeString(),
      status:
        prediction.risk_level === "Critical"
          ? "Blocked"
          : prediction.risk_level === "High"
          ? "Investigating"
          : "Monitoring",
    };

    setPredictions((prev) => [item, ...prev]);

    setStats((prev) => ({
      ...prev,
      threats: prev.threats + 1,
      critical:
        prediction.risk_level === "Critical"
          ? prev.critical + 1
          : prev.critical,
      risk: prediction.risk_level,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#eef2f7",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <div style={{ marginBottom: 30 }}>
            <h1>Honeywell AI Cybersecurity Dashboard</h1>
            <p style={{ color: "#64748b" }}>
              AI Powered Behavioral Threat Detection System
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
            }}
          >
            <StatCard
              title="Total Events"
              value={stats.total_events}
              color="#2563eb"
            />

            <StatCard
              title="Threats Detected"
              value={stats.threats}
              color="#dc2626"
            />

            <StatCard
              title="Critical Alerts"
              value={stats.critical}
              color="#f59e0b"
            />

            <StatCard
              title="Current Risk"
              value={stats.risk}
              color="#16a34a"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 20,
              marginTop: 35,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 2px 10px rgba(0,0,0,.08)",
              }}
            >
              <h2>Threat Timeline</h2>
              <ThreatTimelineChart predictions={predictions} />
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 2px 10px rgba(0,0,0,.08)",
              }}
            >
              <h2>Attack Distribution</h2>
              <AttackDistributionChart predictions={predictions} />
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 25,
              marginTop: 35,
              boxShadow: "0 2px 10px rgba(0,0,0,.08)",
            }}
          >
            <h2>AI Threat Prediction</h2>
            <PredictionForm onPrediction={handlePrediction} />
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 25,
              marginTop: 35,
              marginBottom: 30,
              boxShadow: "0 2px 10px rgba(0,0,0,.08)",
            }}
          >
            <h2>Live Threat Feed</h2>
            <ThreatTable predictions={predictions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;