import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../store/appointmentSlice';
import AppointmentCard from '../components/AppointmentCard';
import { PlusCircle } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.appointments
  );

  const [view, setView] = useState('active'); // active | history

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const activeAppointments = data.filter(
    (a) => a.status !== 'Resolved'
  );

  const historyAppointments = data.filter(
    (a) => a.status === 'Resolved'
  );

  const visibleAppointments =
    view === 'active' ? activeAppointments : historyAppointments;

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between bg-amber-300 px-6 py-3 items-center text-black">
        <h1 className="font-bold text-xl">AutoPredict AI</h1>

        <ul className="flex items-center gap-6 font-medium">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li className="px-4 py-2 rounded-lg bg-red-600 text-white">
            <Link to="/appointments">Appointments</Link>
          </li>
          <li><Link to="/analytics">Analytics</Link></li>
        </ul>

        <p className="text-3xl"><FaUserCircle /></p>
      </nav>

      {/* HEADER */}
      <div className="px-6 pt-6">
        <h1 className="text-xl font-medium">Service Appointments</h1>
        <p className="text-gray-400">
          AI-recommended & scheduled vehicle maintenance
        </p>
      </div>

      {/* TABS */}
      <div className="px-6 mt-6 flex gap-4">
        <button
          onClick={() => setView('active')}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            view === 'active'
              ? 'bg-amber-400 text-black'
              : 'bg-gray-700'
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setView('history')}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            view === 'history'
              ? 'bg-amber-400 text-black'
              : 'bg-gray-700'
          }`}
        >
          History
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-6 mt-6 space-y-4">
        {loading && <p>Loading appointments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && visibleAppointments.length === 0 && (
          <p className="text-gray-400">
            {view === 'active'
              ? 'No active appointments'
              : 'No appointment history'}
          </p>
        )}

        {visibleAppointments.map((appt) => (
          <AppointmentCard
            key={appt._id}
            id={appt._id}
            service={appt.service_type}
            date={appt.date}
            time={appt.time}
            status={appt.status}
            ai={appt.recommended_by_ai}
          />
        ))}
      </div>

      {/* BOOK BUTTON */}
      {view === 'active' && (
        <div className="px-6 mt-8">
          <button className="flex items-center gap-2 bg-amber-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-amber-300">
            <PlusCircle size={20} />
            Book Appointment
          </button>
        </div>
      )}

    </div>
  );
};

export default Appointments;
