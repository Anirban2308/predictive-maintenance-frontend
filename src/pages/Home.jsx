import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const telemetryData = [
    { id: "V101", engineTemp: 85, vibration: 2.3, oilPressure: 40, batteryVoltage: 12.6, coolantLevel: 78 },
    { id: "V102", engineTemp: 98, vibration: 3.9, oilPressure: 33, batteryVoltage: 12.1, coolantLevel: 52 },
    { id: "V103", engineTemp: 105, vibration: 5.2, oilPressure: 28, batteryVoltage: 11.8, coolantLevel: 40 },
    { id: "V104", engineTemp: 76, vibration: 1.8, oilPressure: 42, batteryVoltage: 12.7, coolantLevel: 88 },
    { id: "V105", engineTemp: 112, vibration: 6.1, oilPressure: 25, batteryVoltage: 11.5, coolantLevel: 35 },
  ];

  useEffect(() => {
    setLoading(true);

    axios.post("http://127.0.0.1:7000/run-maintenance", {
      data: telemetryData
    })
      .then(response => {
        setData(response.data);  // SAVE THE WHOLE OBJECT
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });

  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Predictive Maintenance Result</h1>

      {!data ? (
        <p>No data yet</p>
      ) : (
        <div style={{ marginTop: "20px", padding: "10px", background: "#f3f3f3", borderRadius: "8px" }}>
  <p><strong>Anomalies:</strong></p>
  <pre>{JSON.stringify(data.anomalies.raw, null, 2)}</pre>

  <p><strong>Diagnosis:</strong></p>
  <pre>{JSON.stringify(data.diagnosis.raw, null, 2)}</pre>

  <p><strong>Customer Message:</strong> {JSON.stringify(data.customer_message.raw, null,2)}</p>

  <p><strong>Schedule:</strong> {JSON.stringify(data.schedule.raw,null,2)}</p>

  <p><strong>Feedback:</strong> {JSON.stringify(data.feedback.raw,null,2)}</p>
</div>

      )}
    </div>
  );
};

export default Home;
