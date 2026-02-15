import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../store/dashboardSlice';
import Chatbot from '../components/Chatbot';
import { AlertTriangle, Wrench, Battery, Gauge } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
const dispatch = useDispatch();
const { data, loading, error } = useSelector((state) => state.dashboard);


useEffect(() => {
dispatch(fetchDashboardData());
}, [dispatch]);


if (loading) return <p className="text-white p-6">Loading dashboard...</p>;
if (error) return <p className="text-red-500 p-6">Error: {error}</p>;
if (!data) return null;


const componentHealth = data.component_health || {};
const predictedIssues = data.predicted_issues || [];


return (
<div className="min-h-screen bg-gray-900 text-white">


{/* NAVBAR */}
<nav className="flex justify-between p-6 bg-amber-300 px-5 py-3 items-center text-black">
<h1 className="font-bold text-xl">AutoPredict AI</h1>
<ul className="flex items-center justify-between gap-6 font-medium">
<li className="px-4 py-2 bg-red-600 rounded-lg text-white">Dashboard</li>
<li>My Vehicle</li>
<li>
  <Link to="/appointments">Appointments</Link>
</li>
<li>
   <Link to="/analytics">Analytics</Link>
</li>
</ul>
<p className="text-3xl"><FaUserCircle /></p>
</nav>


<h1 className="text-xl px-6 pt-4 pb-1 font-medium">Dashboard</h1>
<p className="px-6 text-gray-400">AI-powered monitoring for your vehicle</p>


{/* VEHICLE HEALTH */}
<div className="px-6 mt-6">
<div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
<h2 className="text-lg font-semibold text-gray-300">Overall Vehicle Health</h2>
<p className="text-5xl font-bold mt-2 text-green-400">{data.health_score}%</p>
<p className="text-gray-400 mt-1">{data.customer_message}</p>
</div>
</div>


{/* SUMMARY + ISSUES */}
<div className="grid grid-cols-2 gap-6 px-6 mt-6">
<div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
<h2 className="text-lg font-semibold mb-3">Vehicle Health Summary</h2>
<div className="grid grid-cols-2 gap-4">
<div className="bg-gray-900 p-4 rounded-lg"><Gauge /> Engine: {componentHealth.engineHealth}%</div>
<div className="bg-gray-900 p-4 rounded-lg"><Battery /> Battery: {componentHealth.battery}%</div>
<div className="bg-gray-900 p-4 rounded-lg"><Wrench /> Brakes: {componentHealth.brakes}%</div>
<div className="bg-gray-900 p-4 rounded-lg"><AlertTriangle /> Tires: {componentHealth.tirePressure}</div>
</div>
</div>


<div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
<h2 className="text-lg font-semibold mb-3">Upcoming Predicted Issues</h2>
{predictedIssues.length ? predictedIssues.map((i, idx) => (
<div key={idx} className="bg-gray-900 p-4 rounded-lg mb-3">
<AlertTriangle /> {i.name} 
</div>
)) : <p>No issues detected</p>}
</div>
</div>


<div className="p-6"><Chatbot /></div>
</div>
);
};


export default Dashboard;