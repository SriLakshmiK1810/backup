import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

function SettingsScreen() {

 
const { darkMode, setDarkMode } = useTheme();

const [notifications, setNotifications] = useState(
  localStorage.getItem("notifications") !== "false"
);

const [currency, setCurrency] = useState(
  localStorage.getItem("currency") || "INR"
);
  const handleSave = () => {

    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("notifications", notifications);
    localStorage.setItem("currency", currency);

    alert("Settings saved successfully!");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
  style={{
    ...mainContent,
    background: darkMode ? "#111827" : "#F8FAFC",
    color: darkMode ? "#FFFFFF" : "#111827",
  }}
>

        <h1>Settings</h1>

        <div
  style={{
    ...card,
    background: darkMode ? "#1F2937" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#111827",
  }}
>

          <h2>Appearance</h2>

          <div style={row}>
            <span>🌙 Dark Mode</span>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>

          <hr />

          <h2>Notifications</h2>

          <div style={row}>
            <span>🔔 Enable Notifications</span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />
          </div>

          <hr />

          <h2>Currency</h2>

          <select
            style={selectStyle}
            value={currency}
            onChange={(e) =>
              setCurrency(e.target.value)
            }
          >
            <option value="INR">₹ Indian Rupee</option>
            <option value="USD">$ US Dollar</option>
            <option value="EUR">€ Euro</option>
            <option value="GBP">£ Pound</option>
          </select>

          <hr />

          <h2>About</h2>

          <p>
            Pocket Planner helps you manage budgets,
            expenses and savings goals efficiently.
          </p>

          <button
            style={buttonStyle}
            onClick={handleSave}
          >
            Save Settings
          </button>

        </div>

      </div>
    </div>
  );
}

const mainContent = {
  flex: 1,
  padding: "35px",
  background: "#F8FAFC",
};

const card = {
  maxWidth: "700px",
  background: "#fff",
  padding: "35px",
  borderRadius: "20px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0",
};

const selectStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #D1D5DB",
  marginTop: "15px",
};

const buttonStyle = {
  marginTop: "30px",
  width: "100%",
  padding: "14px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
};

export default SettingsScreen;