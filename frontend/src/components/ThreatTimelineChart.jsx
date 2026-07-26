import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ThreatTimelineChart({ predictions }) {
  const getRiskValue = (risk) => {
    switch (risk) {
      case "Critical":
        return 4;
      case "High":
        return 3;
      case "Medium":
        return 2;
      default:
        return 1;
    }
  };

  const data =
    predictions.length === 0
      ? [
          {
            time: "No Data",
            severity: 0,
          },
        ]
      : [...predictions]
          .reverse()
          .map((item) => ({
            time: item.time,
            severity: getRiskValue(item.risk_level),
            attack: item.attack_type,
            confidence: (item.confidence * 100).toFixed(2),
            risk: item.risk_level,
          }));

  return (
    <div
      style={{
        width: "100%",
        height: 350,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis
            allowDecimals={false}
            domain={[0, 4]}
            ticks={[0, 1, 2, 3, 4]}
          />

          <Tooltip
            formatter={(value, name) => {
              if (name === "severity") return [value, "Severity"];
              return [value, name];
            }}
            labelFormatter={(label) => `Time: ${label}`}
            contentStyle={{
              borderRadius: "10px",
            }}
          />

          <Line
            type="monotone"
            dataKey="severity"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatTimelineChart;