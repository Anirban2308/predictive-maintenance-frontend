import React, { useEffect, useState } from "react";
import { AlertTriangle, Wrench, CheckCircle } from "lucide-react";
import { FaUserCog } from "react-icons/fa";

const MechanicDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const BACKEND_URL = "https://your-backend-url.onrender.com";

  const fetchAppointments = async () => {
    const res = await fetch(`${BACKEND_URL}/appointments`);
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${BACKEND_URL}/appointments/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchAppointments();
  };

  const activeJobs = appointments.length;
  const criticalJobs = appointments.filter(a =>
    a.service_type.toLowerCase().includes("engine")
  ).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between p-6 bg-amber-300 px-5 py-3 items-center text-black">
        <h1 className="font-bold text-xl">AutoPredict AI - Mechanic Panel</h1>
        <FaUserCog className="text-2xl" />
      </nav>

      <h1 className="text-xl px-6 pt-4 pb-1 font-medium">Service Dashboard</h1>
      <p className="px-6 text-gray-400">
        AI-generated service workflow management
      </p>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-6 px-6 mt-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <Wrench className="mb-2" />
          <p className="text-2xl font-bold">{activeJobs}</p>
          <p className="text-gray-400">Active Jobs</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <AlertTriangle className="mb-2 text-red-400" />
          <p className="text-2xl font-bold">{criticalJobs}</p>
          <p className="text-gray-400">Critical Jobs</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <CheckCircle className="mb-2 text-green-400" />
          <p className="text-2xl font-bold">
            {appointments.filter(a => a.status === "In Progress").length}
          </p>
          <p className="text-gray-400">In Progress</p>
        </div>
      </div>

      {/* ACTIVE JOB LIST */}
      <div className="px-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Active Service Jobs</h2>

        {appointments.length ? (
          appointments.map((job) => (
            <div
              key={job._id}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-4"
            >
              <p className="font-semibold text-lg">{job.service_type}</p>
              <p className="text-gray-400">
                {job.date} · {job.time}
              </p>
              <p className="mt-2 text-yellow-400">Status: {job.status}</p>

              <div className="mt-4 flex gap-4">
                {job.status === "Pending" && (
                  <button
                    onClick={() => updateStatus(job._id, "In Progress")}
                    className="bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    Start Job
                  </button>
                )}

                {job.status !== "Resolved" && (
                  <button
                    onClick={() => updateStatus(job._id, "Resolved")}
                    className="bg-green-600 px-4 py-2 rounded-lg"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No active service jobs</p>
        )}
      </div>
    </div>
  );
};

export default MechanicDashboard;
