import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {
  return (
    <div style={{ display: "flex", background: "#eef2f7", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: 30 }}>
          <h1>Settings</h1>

          <div
            style={{
              background: "#fff",
              padding: 30,
              borderRadius: 12,
            }}
          >
            <p>Notification Settings</p>
            <p>Security Preferences</p>
            <p>API Configuration</p>
            <p>User Management</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;