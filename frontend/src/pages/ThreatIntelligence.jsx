import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ThreatIntelligence() {
  return (
    <div style={{ display: "flex", background: "#eef2f7", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: 30 }}>
          <h1>Threat Intelligence</h1>

          <div
            style={{
              background: "#fff",
              padding: 30,
              borderRadius: 12,
            }}
          >
            <h3>Latest Intelligence</h3>

            <ul>
              <li>✔ Malware campaign detected</li>
              <li>✔ Insider threat monitoring active</li>
              <li>✔ Phishing attempts increasing</li>
              <li>✔ Network anomalies under investigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreatIntelligence;