import {
  LayoutDashboard,
  Shield,
  BarChart3,
  Activity,
  Globe,
  FileText,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/",
  },
  {
    title: "AI Threat Detection",
    icon: <Shield size={20} />,
    path: "/threat-detection",
  },
  {
    title: "Threat Analytics",
    icon: <BarChart3 size={20} />,
    path: "/threat-analytics",
  },
  {
    title: "Incident Response",
    icon: <Activity size={20} />,
    path: "/incident-response",
  },
  {
    title: "Threat Intelligence",
    icon: <Globe size={20} />,
    path: "/threat-intelligence",
  },
  {
    title: "Reports",
    icon: <FileText size={20} />,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <div
      style={{
        width: 280,
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <div style={{ padding: 30 }}>
        <h1>Honeywell</h1>
        <p style={{ color: "#94a3b8" }}>AI Cybersecurity Platform</p>
      </div>

      {menu.map((item) => (
        <NavLink
          key={item.title}
          to={item.path}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: 15,
            margin: "10px 18px",
            padding: "15px",
            borderRadius: 12,
            textDecoration: "none",
            color: "white",
            background: isActive ? "#2563eb" : "transparent",
          })}
        >
          {item.icon}
          {item.title}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;