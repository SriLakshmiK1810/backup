import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    setName(user.name || "");
    setEmail(user.email || "");
    setPhoneNumber(user.phoneNumber || "");
    setDateOfBirth(user.dateOfBirth || "");
  }
}, []);
const handleSave = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const updatedUser = {
      ...user,
      name,
      email,
      phoneNumber,
      dateOfBirth,
    };

    const response = await api.put(
      `/users/${user.id}`,
      updatedUser
    );

    localStorage.setItem("user", JSON.stringify(response.data));

    alert("Profile Updated Successfully!");
  } catch (error) {
    console.log(error);
    alert("Failed to update profile");
  }
};
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "35px",
          background: "#F8FAFC",
        }}
      >
        <h1>My Profile</h1>

        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "20px",
            maxWidth: "600px",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <label>Full Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />
          <label>Phone Number</label>

<input
  type="tel"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  style={inputStyle}
  placeholder="Enter phone number"
/>

<label>Date of Birth</label>

<input
  type="date"
  value={dateOfBirth}
  onChange={(e) => setDateOfBirth(e.target.value)}
  style={inputStyle}
/>



          <button
            onClick={handleSave}
            style={buttonStyle}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
  boxSizing: "border-box",
};

const buttonStyle = {
  background:
    "linear-gradient(135deg,#2563EB,#3B82F6)",
  color: "#fff",
  border: "none",
  padding: "14px 25px",
  borderRadius: "12px",
  cursor: "pointer",
};

export default ProfileScreen;