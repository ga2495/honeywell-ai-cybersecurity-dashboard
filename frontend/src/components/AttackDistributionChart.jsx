import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function AttackDistributionChart({ predictions }) {
  const colors = [
    "#2563eb",
    "#dc2626",
    "#16a34a",
    "#f59e0b",
    "#7c3aed",
    "#0891b2",
    "#ec4899",
    "#475569",
  ];

  const getChartData = () => {
    if (!predictions || predictions.length === 0) {
      return [
        {
          name: "No Data",
          value: 1,
        },
      ];
    }

    const counts = {};

    predictions.forEach((item) => {
      counts[item.attack_type] = (counts[item.attack_type] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const data = getChartData();

  return (
    <div
      style={{
        width: "100%",
        height: 350,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttackDistributionChart;