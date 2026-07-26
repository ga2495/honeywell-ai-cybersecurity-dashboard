import { Bell, Search, RefreshCw, Shield } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "75px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#0f172a",
            fontWeight: "700",
          }}
        >
          Honeywell Security Operations Center
        </h2>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          AI Powered Behavioral Threat Detection
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f1f5f9",
            borderRadius: "10px",
            padding: "10px 15px",
            width: "280px",
          }}
        >
          <Search size={18} color="#64748b" />

          <input
            type="text"
            placeholder="Search threats..."
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              marginLeft: "10px",
              width: "100%",
              fontSize: "14px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <RefreshCw
            size={20}
            style={{
              cursor: "pointer",
            }}
          />

          <div
            style={{
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Bell size={22} />

            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#dc2626",
              }}
            />
          </div>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <div
              style={{
                fontWeight: "600",
              }}
            >
              {time.toLocaleDateString()}
            </div>

            <div
              style={{
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              {time.toLocaleTimeString()}
            </div>
          </div>

          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Shield size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;