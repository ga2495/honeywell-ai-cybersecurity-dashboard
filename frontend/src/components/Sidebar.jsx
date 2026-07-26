import {
  LayoutDashboard,
  Shield,
  Activity,
  BarChart3,
  Globe,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      active: true,
    },
    {
      title: "AI Threat Detection",
      icon: <Shield size={20} />,
    },
    {
      title: "Threat Analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      title: "Incident Response",
      icon: <Activity size={20} />,
    },
    {
      title: "Threat Intelligence",
      icon: <Globe size={20} />,
    },
    {
      title: "Reports",
      icon: <FileText size={20} />,
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div
      style={{
        width: "270px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "4px 0 15px rgba(0,0,0,.15)",
      }}
    >
      <div>
        <div
          style={{
            padding: "28px 24px",
            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            Honeywell
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            AI Cybersecurity Platform
          </p>
        </div>

        <div
          style={{
            padding: "20px 14px",
          }}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = "#1e293b";
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 18px",
                marginBottom: "8px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "0.25s",
                background: item.active ? "#2563eb" : "transparent",
                color: item.active ? "#ffffff" : "#cbd5e1",
                fontWeight: item.active ? "600" : "500",
              }}
            >
              {item.icon}

              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "20px 14px",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "14px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "0.25s",
            color: "#f87171",
            fontWeight: "600",
          }}
        >
          <LogOut size={20} />

          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;