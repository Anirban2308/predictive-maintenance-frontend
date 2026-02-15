import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import SensorChart from "../components/analytics/SensorChart";
import ViolationTable from "../components/analytics/ViolationTable";
import FailureTimeline from "../components/analytics/FailureTimeline";
import { fetchAnalytics } from "../store/analyticsSlice";

const Analytics = () => {
  const dispatch = useDispatch();
  const { sensors, violations, timeline, loading } = useSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading) {
    return <p className="text-white p-6">Loading analytics...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between bg-amber-300 px-6 py-3 items-center text-black">
        <h1 className="font-bold text-xl">AutoPredict AI</h1>

        <ul className="flex items-center gap-6 font-medium">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>My Vehicle</li>
          <li>
            <Link to="/appointments">Appointments</Link>
          </li>
          <li className="px-4 py-2 rounded-lg bg-red-600 text-white">
            <Link to="/analytics">Analytics</Link>
          </li>
        </ul>

        <p className="text-3xl">
          <FaUserCircle />
        </p>
      </nav>

      {/* PAGE CONTENT */}
      <div className="p-6 space-y-6">
        <AnalyticsHeader />

        {/* SENSOR TREND ANALYSIS */}
        <div className="space-y-6">
          <SensorChart
            title="Engine Temperature (°C)"
            data={sensors.engine_temperature}
          />
          <SensorChart
            title="Oil Pressure (PSI)"
            data={sensors.oil_pressure}
          />
          <SensorChart
            title="Battery Voltage (V)"
            data={sensors.battery_voltage}
          />
          <SensorChart
            title="Tire Pressure (PSI)"
            data={sensors.tire_pressure}
          />
        </div>

        <ViolationTable data={violations} />
        <FailureTimeline data={timeline} />
      </div>
    </div>
  );
};

export default Analytics;

