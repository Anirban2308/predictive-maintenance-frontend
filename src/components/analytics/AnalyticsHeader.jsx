const AnalyticsHeader = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-800 pb-4">
      <div>
        <h1 className="text-2xl font-semibold">Vehicle Diagnostics Analytics</h1>
        <p className="text-sm text-gray-400">
          Vehicle ID: V101-2024 · Last Update: 2024-12-14 14:32:45
        </p>
      </div>

      <div className="flex gap-3">
        <select className="bg-gray-900 border border-gray-700 rounded px-3 py-1">
          <option>Last 24 Hours</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
        <span className="bg-gray-800 px-3 py-1 rounded">Operational</span>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
