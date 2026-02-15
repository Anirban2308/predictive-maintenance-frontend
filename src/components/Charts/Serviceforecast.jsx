import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", predicted: 120, actual: 115 },
  { month: "Feb", predicted: 140, actual: 150 },
  { month: "Mar", predicted: 160, actual: 155 },
  { month: "Apr", predicted: 130, actual: 135 },
  { month: "May", predicted: 150, actual: 145 },
];

const Serviceforecast = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="predicted" fill="#8884d8" name="Predicted Demand" />
      <Bar dataKey="actual" fill="#82ca9d" name="Actual Demand" />
    </BarChart>
  </ResponsiveContainer>
);

export default Serviceforecast;
