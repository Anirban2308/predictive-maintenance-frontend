const statusColor = {
  Critical: "bg-red-700",
  Moderate: "bg-orange-500",
  Normal: "bg-green-600",
};

const ViolationTable = ({ data }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h2 className="font-medium mb-3">Threshold Violation Analytics</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th align="left">Parameter</th>
            <th>Safe Range</th>
            <th>Current</th>
            <th>Deviation</th>
            <th>Breach Duration</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-gray-800">
              <td>{row.parameter}</td>
              <td align="center">{row.safe_range}</td>
              <td align="center">{row.current}</td>
              <td align="center">{row.deviation}</td>
              <td align="center">{row.breach_duration}</td>
              <td align="center">
                <span
                  className={`px-2 py-1 rounded text-xs ${statusColor[row.status]}`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViolationTable;
