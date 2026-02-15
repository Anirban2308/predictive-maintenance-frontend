import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const SensorChart = ({ title, data }) => {
  if (!data || !data.values?.length) return null;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-4">
      <h2 className="font-medium mb-2">{title}</h2>

      {/* IMPORTANT FIX */}
      <div className="w-full h-[220px] min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.values}>
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />

            <ReferenceLine
              y={data.safe_range?.[1]}
              stroke="red"
              strokeDasharray="3 3"
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#4DA3FF"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-sm text-gray-400">{data.ai_insight}</p>
    </div>
  );
};

export default SensorChart;
