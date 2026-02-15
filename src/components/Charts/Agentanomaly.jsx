import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { time: "08:00", baseline: 10, anomaly: 0 },
  { time: "09:00", baseline: 12, anomaly: 0 },
  { time: "10:00", baseline: 11, anomaly: 1 },
  { time: "11:00", baseline: 13, anomaly: 0 },
  { time: "12:00", baseline: 15, anomaly: 1 },
];

const Agentanomaly = () => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="baseline" stroke="#82ca9d" fill="#82ca9d" name="Normal Activity" />
      <Area type="monotone" dataKey="anomaly" stroke="#ff4d4f" fill="#ffcccc" name="Detected Anomaly" />
    </AreaChart>
  </ResponsiveContainer>
);

export default Agentanomaly;
