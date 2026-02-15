import React from 'react';
import { CalendarDays, Wrench, Sparkles, Play, CheckCircle } from 'lucide-react';

const AppointmentCard = ({
  service,
  date,
  time,
  status,
  ai,
  onUpdateStatus,
  isTechnician = false
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
      <div>
        <h3 className="font-semibold flex items-center gap-2">
          <Wrench size={18} /> {service}
        </h3>

        <p className="text-gray-400 flex items-center gap-2 mt-1">
          <CalendarDays size={16} /> {date} · {time}
        </p>

        {ai && (
          <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
            <Sparkles size={14} /> AI Recommended
          </p>
        )}

        {/* Technician actions */}
        {isTechnician && status !== 'Resolved' && (
          <div className="flex gap-2 mt-3">
            {status === 'Pending' && (
              <button
                onClick={() => onUpdateStatus('In Progress')}
                className="flex items-center gap-1 text-xs bg-blue-600 px-3 py-1 rounded"
              >
                <Play size={14} /> Start
              </button>
            )}

            {status === 'In Progress' && (
              <button
                onClick={() => onUpdateStatus('Resolved')}
                className="flex items-center gap-1 text-xs bg-green-600 px-3 py-1 rounded"
              >
                <CheckCircle size={14} /> Resolve
              </button>
            )}
          </div>
        )}
      </div>

      {/* Status badge */}
      <span
        className={`px-3 py-1 rounded-full text-sm capitalize ${
          status === 'Resolved'
            ? 'bg-green-600'
            : status === 'In Progress'
            ? 'bg-blue-600'
            : status === 'Pending'
            ? 'bg-yellow-500'
            : 'bg-gray-600'
        }`}
      >
        {status}
      </span>
    </div>
  );
};

export default AppointmentCard;
