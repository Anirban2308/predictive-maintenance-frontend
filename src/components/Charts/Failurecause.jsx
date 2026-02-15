import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Engine", value: 30 },
  { name: "Suspension", value: 25 },
  { name: "Brake", value: 20 },
  { name: "Transmission", value: 15 },
  { name: "Electrical", value: 10 },
];

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B620E0"];

const Failurecause = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default Failurecause;
