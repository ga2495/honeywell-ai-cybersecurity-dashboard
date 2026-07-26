import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ThreatTimelineChart from "../components/ThreatTimelineChart";
import AttackDistributionChart from "../components/AttackDistributionChart";

function ThreatAnalytics() {
  return (
    <div style={{ display: "flex", background: "#eef2f7", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: 30 }}>
          <h1>Threat Analytics</h1>
          <p>Visual analysis of detected cybersecurity threats.</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 20,
              marginTop: 30,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 12,
              }}
            >
              <ThreatTimelineChart predictions={[]} />
            </div>

            <div
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 12,
              }}
            >
              <AttackDistributionChart predictions={[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreatAnalytics;