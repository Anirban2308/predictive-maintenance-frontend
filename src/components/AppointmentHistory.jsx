import StatusBadge from "./StatusBadge";

export default function AppointmentHistory({ appointments }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Appointment History</h2>

      {appointments.length === 0 && (
        <p className="text-gray-500 text-sm">No past appointments</p>
      )}

      <div className="space-y-3">
        {appointments.map((a) => (
          <div key={a._id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <span>{a.service_type}</span>
              <StatusBadge status={a.status} />
            </div>
            <p className="text-sm text-gray-600">
              {a.date} · {a.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
