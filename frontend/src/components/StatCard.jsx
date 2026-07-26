import {
  Shield,
  AlertTriangle,
  Activity,
  BarChart3,
  TrendingUp,
} from "lucide-react";

function StatCard({ title, value, color }) {
  const getIcon = () => {
    switch (title) {
      case "Total Events":
        return <BarChart3 size={30} />;
      case "Threats Detected":
        return <Shield size={30} />;
      case "Critical Alerts":
        return <AlertTriangle size={30} />;
      case "Current Risk":
        return <Activity size={30} />;
      default:
        return <Shield size={30} />;
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${color}`,
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 16px 35px rgba(37,99,235,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.08)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              marginTop: "12px",
              marginBottom: "8px",
              color: "#0f172a",
              fontSize: "34px",
              fontWeight: "700",
            }}
          >
            {value}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#16a34a",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            <TrendingUp size={16} style={{ marginRight: "6px" }} />
            Live Monitoring
          </div>
        </div>

        <div
          style={{
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {getIcon()}
        </div>
      </div>
    </div>
  );
}

export default StatCard;