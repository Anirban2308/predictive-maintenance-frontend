import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import Agentapi from "../Agentapi";

/* ------------------------------------------
   Dummy Telemetry Generator — V101 (kept for sending telemetry)
-------------------------------------------*/
const generateDummyTelemetry = () => {
  return [
    {
      id: "V101",
      engineTemp: "112°C",
      vibration: 4.8,
      oilPressure: 18,
      batteryVoltage: 11.4,
      coolantLevel: 32,
      tirePressure: 28,
    },
  ];
};

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Mic Placeholder
  const startVoiceInput = () => {
    alert("🎤 Voice input coming soon! Connect LiveKit or Speech API here.");
  };

  useEffect(() => {
    // Send telemetry on load, then fetch DB-backed summary to ensure anomalies/diagnosis present
    sendDummyTelemetry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ------------------------------------------
     Helper: fetch dashboard data from DB
  -------------------------------------------*/
  const fetchDashboardDataDirect = async () => {
    try {
      const res = await Agentapi.get("/dashboard/data");
      return res.data;
    } catch (err) {
      console.error("fetchDashboardDataDirect error:", err);
      return null;
    }
  };

  /* ------------------------------------------
     Send dummy telemetry to agent on load
     Then fetch DB document so we show the stored anomalies/diagnosis
  -------------------------------------------*/
  const sendDummyTelemetry = async () => {
    const dummyTelemetry = generateDummyTelemetry();

    const newMessages = [
      ...messages,
      { type: "userMsg", text: "Sent dummy telemetry data 🚀" },
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Call run-maintenance to process telemetry (keeps existing workflow)
      await Agentapi.post("/run-maintenance", { data: dummyTelemetry });
      // Now fetch DB-backed dashboard document to display anomalies/diagnosis reliably
      const db = await fetchDashboardDataDirect();

      if (db) {
        setMessages((prev) => [
          ...newMessages,
          {
            type: "agentMsg",
            telemetry: true,
            text: {
              anomalies: db.anomalies || db.issues || [],
              diagnosis: db.diagnosis || db.diagnosis_summary || "",
              customer_message: db.customer_message || db.customer_friendly_message || "",
              schedule: db.schedule || db.predicted_schedule || "",
              feedback: db.feedback || "",
            },
          },
        ]);
      } else {
        // fallback - show minimal agent response
        setMessages((prev) => [
          ...newMessages,
          {
            type: "agentMsg",
            telemetry: false,
            text: { customer_message: "Telemetry sent — no DB summary available." },
          },
        ]);
      }
    } catch (err) {
      console.error("sendDummyTelemetry error:", err);
      setMessages((prev) => [
        ...newMessages,
        {
          type: "agentMsg",
          text: { customer_message: "❌ Error contacting agent or DB" },
          telemetry: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------
     User sends message
     - Post to /run-maintenance (keeps intent)
     - If returned payload lacks anomalies/diagnosis, fetch /dashboard/data
  -------------------------------------------*/
  const sendMessage = async () => {
    if (!message) return;

    const userText = message;
    const newMessages = [...messages, { type: "userMsg", text: userText }];
    setMessages(newMessages);
    setMessage("");
    setLoading(true);

    try {
      const response = await Agentapi.post("/run-maintenance", {
        data: [{ user_message: userText }],
      });

      // Response from /run-maintenance (may be short customer_message)
      const agentResp = response.data || {};

      // Determine if agent response already has anomalies/diagnosis
      const hasAnomalies =
        (agentResp.anomalies && Array.isArray(agentResp.anomalies) && agentResp.anomalies.length > 0) ||
        (agentResp.issues && Array.isArray(agentResp.issues) && agentResp.issues.length > 0);

      const hasDiagnosis = Boolean(agentResp.diagnosis || agentResp.diagnosis_summary);

      if (hasAnomalies || hasDiagnosis) {
        // agent returned full info — display it
        setMessages((prev) => [
          ...newMessages,
          {
            type: "agentMsg",
            telemetry: true,
            text: {
              anomalies: agentResp.anomalies || agentResp.issues || [],
              diagnosis: agentResp.diagnosis || agentResp.diagnosis_summary || "",
              customer_message: agentResp.customer_message || "",
              schedule: agentResp.schedule || agentResp.predicted_schedule || "",
              feedback: agentResp.feedback || "",
            },
          },
        ]);
      } else {
        // agent did not return anomalies/diagnosis -> fetch DB document to show them
        const db = await fetchDashboardDataDirect();

        if (db) {
          setMessages((prev) => [
            ...newMessages,
            {
              type: "agentMsg",
              telemetry: true,
              text: {
                anomalies: db.anomalies || db.issues || [],
                diagnosis: db.diagnosis || db.diagnosis_summary || "",
                customer_message: db.customer_message || db.customer_friendly_message || agentResp.customer_message || "",
                schedule: db.schedule || db.predicted_schedule || agentResp.schedule || "",
                feedback: db.feedback || "",
              },
            },
          ]);
        } else {
          // fallback to agent's short answer
          setMessages((prev) => [
            ...newMessages,
            {
              type: "agentMsg",
              telemetry: Boolean(agentResp.anomalies || agentResp.issues),
              text: {
                anomalies: agentResp.anomalies || agentResp.issues || [],
                diagnosis: agentResp.diagnosis || agentResp.diagnosis_summary || "",
                customer_message: agentResp.customer_message || "No further details",
                schedule: agentResp.schedule || agentResp.predicted_schedule || "",
                feedback: agentResp.feedback || "",
              },
            },
          ]);
        }
      }
    } catch (err) {
      console.error("sendMessage error:", err);
      setMessages((prev) => [
        ...newMessages,
        {
          type: "agentMsg",
          text: { customer_message: "❌ Error contacting agent" },
          telemetry: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------
           RENDER
  -------------------------------------------*/
  return (
    <div className="h-full w-full p-4 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">AutoPredict AI Assistant</h1>

      {/* Chat window */}
      <div className="min-h-[60vh] bg-gray-900 text-white p-5 rounded-xl overflow-y-auto flex flex-col gap-3 shadow-2xl border border-gray-700">
        {messages.map((msg, i) => {
          // USER MESSAGE
          if (msg.type === "userMsg") {
            return (
              <div key={i} className="self-end bg-blue-600 text-white p-3 rounded-t-xl rounded-bl-xl max-w-[80%] shadow-lg">
                {msg.text}
              </div>
            );
          }

          // AGENT MESSAGE
          if (msg.telemetry) {
            return (
              <div key={i} className="self-start bg-gray-800 p-4 rounded-xl max-w-[90%] shadow-xl border-l-4 border-amber-500">
                <p className="text-sm my-1"><strong>🔍 Anomalies:</strong></p>
                {Array.isArray(msg.text.anomalies) && msg.text.anomalies.length > 0 ? (
                  <ul className="ml-4 list-disc">
                    {msg.text.anomalies.map((issue, idx) => (
                      <li key={idx} className="text-sm my-1">
                        <strong>{issue.name}</strong> — {issue.severity} severity
                        <br />
                        <span className="text-gray-300">{issue.recommended_action}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm ml-4 text-gray-400">No anomalies</p>
                )}

                <p className="text-sm my-2"><strong>🛠️ Diagnosis:</strong> {msg.text.diagnosis}</p>
                <p className="text-sm my-1"><strong>💬 Customer Message:</strong> {msg.text.customer_message}</p>
                <p className="text-sm my-1"><strong>📅 Schedule:</strong> <span className="text-red-400 font-semibold">{msg.text.schedule}</span></p>
                <p className="text-sm my-1"><strong>📝 Feedback:</strong> {msg.text.feedback}</p>
              </div>
            );
          }

          // SIMPLE AGENT REPLY
          return (
            <div key={i} className="self-start bg-gray-800 p-3 rounded-r-xl rounded-bl-xl max-w-[80%] shadow-lg">
              {msg.text.customer_message || msg.text}
            </div>
          );
        })}

        {loading && <div className="self-start text-gray-400 italic">Agent is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="flex gap-3 mt-4 items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about vehicle status, schedule, or current sensor values..."
          className="flex-1 p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-150"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={startVoiceInput} className="p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150" disabled={loading}>
          <FaMicrophone size={18} />
        </button>

        <button onClick={sendMessage} className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-150" disabled={loading || !message}>
          <IoSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
