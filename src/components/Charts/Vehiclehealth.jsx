import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { time: "08:00", temperature: 85, vibration: 0.6 },
  { time: "09:00", temperature: 92, vibration: 0.9 },
  { time: "10:00", temperature: 100, vibration: 1.2 },
  { time: "11:00", temperature: 110, vibration: 1.8 },
  { time: "12:00", temperature: 105, vibration: 1.1 },
];

const Vehiclehealth = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Engine Temp (°C)" />
      <Line type="monotone" dataKey="vibration" stroke="#387908" name="Vibration (G)" />
    </LineChart>
  </ResponsiveContainer>
);

export default Vehiclehealth;
