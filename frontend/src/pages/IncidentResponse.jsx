import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ThreatTable from "../components/ThreatTable";

function IncidentResponse() {
  return (
    <div style={{ display: "flex", background: "#eef2f7", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: 30 }}>
          <h1>Incident Response</h1>

          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              marginTop: 20,
            }}
          >
            <ThreatTable predictions={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncidentResponse;