import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Reports() {
  return (
    <div style={{ display: "flex", background: "#eef2f7", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: 30 }}>
          <h1>Reports</h1>

          <div
            style={{
              background: "#fff",
              padding: 30,
              borderRadius: 12,
            }}
          >
            <button>Download Threat Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;