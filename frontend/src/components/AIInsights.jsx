import {
  Brain,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

function AIInsights({ prediction }) {
  if (!prediction) return null;

  const attackAdvice = {
    "Brute Force": {
      reason: [
        "Multiple failed login attempts detected.",
        "Repeated authentication requests observed.",
        "Suspicious login frequency exceeded threshold.",
      ],
      actions: [
        "Temporarily block the source IP.",
        "Force password reset.",
        "Enable Multi-Factor Authentication.",
      ],
    },

    "Credential Stuffing": {
      reason: [
        "Known leaked credentials appear to be used.",
        "Large number of login attempts from one source.",
        "User behavior deviates from historical patterns.",
      ],
      actions: [
        "Lock the affected account.",
        "Notify the user immediately.",
        "Require MFA verification.",
      ],
    },

    "SQL Injection": {
      reason: [
        "Malicious SQL keywords detected.",
        "Abnormal database queries observed.",
        "Input validation rules triggered.",
      ],
      actions: [
        "Block malicious requests.",
        "Review application logs.",
        "Enable Web Application Firewall.",
      ],
    },

    "DDoS": {
      reason: [
        "Extremely high request rate detected.",
        "Traffic exceeds normal baseline.",
        "Multiple sources targeting same resource.",
      ],
      actions: [
        "Enable rate limiting.",
        "Activate DDoS mitigation.",
        "Scale infrastructure if necessary.",
      ],
    },
  };

  const info = attackAdvice[prediction.attack_type] || {
    reason: [
      "Behavior differs from the learned baseline.",
      "Potential anomaly detected.",
      "Further investigation recommended.",
    ],
    actions: [
      "Review logs.",
      "Monitor user activity.",
      "Escalate to SOC if required.",
    ],
  };

  return (
    <div
      style={{
        marginTop: 30,
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#0f172a",
          color: "white",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Brain size={28} />

        <div>
          <h2 style={{ margin: 0 }}>AI Security Insights</h2>

          <p
            style={{
              margin: "5px 0 0",
              color: "#cbd5e1",
            }}
          >
            Automated Threat Analysis & Recommendations
          </p>
        </div>
      </div>

      <div
        style={{
          padding: 25,
        }}
      >
        <div
          style={{
            marginBottom: 25,
          }}
        >
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <ShieldAlert color="#dc2626" />

            Threat Summary
          </h3>

          <p>
            <strong>{prediction.attack_type}</strong> classified with
            <strong> {prediction.risk_level}</strong> risk at
            <strong> {(prediction.confidence * 100).toFixed(2)}%</strong>
            confidence.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 30,
          }}
        >
          <div>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <AlertTriangle color="#f59e0b" />

              Why was this detected?
            </h3>

            <ul>
              {info.reason.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <CheckCircle color="#16a34a" />

              Recommended Actions
            </h3>

            <ul>
              {info.actions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;