function ThreatTable({ predictions }) {
  const getRiskColor = (risk) => {
    switch (risk) {
      case "Critical":
        return "#dc2626";
      case "High":
        return "#ea580c";
      case "Medium":
        return "#ca8a04";
      default:
        return "#16a34a";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Blocked":
        return "#16a34a";
      case "Investigating":
        return "#f59e0b";
      default:
        return "#2563eb";
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#0f172a",
              color: "white",
            }}
          >
            <th style={styles.head}>Time</th>
            <th style={styles.head}>Attack Type</th>
            <th style={styles.head}>Confidence</th>
            <th style={styles.head}>Risk</th>
            <th style={styles.head}>Anomaly Score</th>
            <th style={styles.head}>Status</th>
          </tr>
        </thead>

        <tbody>
          {predictions.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#64748b",
                  fontSize: "16px",
                }}
              >
                No predictions yet. Run an AI prediction to populate the live
                threat feed.
              </td>
            </tr>
          ) : (
            predictions.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <td style={styles.cell}>{item.time}</td>

                <td style={styles.cell}>
                  <strong>{item.attack_type}</strong>
                </td>

                <td style={styles.cell}>
                  {(item.confidence * 100).toFixed(2)}%
                </td>

                <td style={styles.cell}>
                  <span
                    style={{
                      background: getRiskColor(item.risk_level),
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      display: "inline-block",
                      minWidth: "90px",
                      textAlign: "center",
                    }}
                  >
                    {item.risk_level}
                  </span>
                </td>

                <td style={styles.cell}>
                  {Number(item.anomaly_score).toFixed(4)}
                </td>

                <td style={styles.cell}>
                  <span
                    style={{
                      background: getStatusColor(item.status),
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      display: "inline-block",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  head: {
    padding: "15px",
    textAlign: "left",
    fontSize: "15px",
  },

  cell: {
    padding: "16px",
    fontSize: "14px",
  },
};

export default ThreatTable;