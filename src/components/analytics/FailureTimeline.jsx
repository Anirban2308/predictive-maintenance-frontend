const FailureTimeline = ({ data }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h2 className="font-medium mb-3">Observed Failure Progression Pattern</h2>

      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm font-medium">
                {item.time} —{" "}
                <span className="text-blue-400">{item.stage}</span>
              </p>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FailureTimeline;
