import { Link } from "react-router-dom";

function Sidebar() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <aside style={sidebarStyle}>
      <h2 style={{ color: "#60A5FA", margin: "0 0 40px" }}>
        💰 Pocket Planner
      </h2>

      <div style={userCardStyle}>
        <p style={{ margin: 0, color: "#D1D5DB" }}>Hello 👋</p>
        <h3 style={{ margin: "5px 0 0" }}>
          {user.name || "Guest User"}
        </h3>
      </div>

      <nav style={{ marginTop: "10px", flex: 1 }}>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/add-expense" style={linkStyle}>Add Expense</Link>
        <Link to="/expenses" style={linkStyle}>Expense List</Link>
        <Link to="/budget" style={linkStyle}>Budget</Link>
        <Link to="/wishlist" style={linkStyle}>Wishlist</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
      </nav>

      <button style={logoutStyle}>Logout</button>
    </aside>
  );
}

const sidebarStyle = {
  width: "250px",
  boxSizing: "border-box",
  flexShrink: 0,
  background: "#111827",
  color: "#fff",
  padding: "20px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const userCardStyle = {
  background: "#1F2937",
  padding: "15px",
  borderRadius: "15px",
  marginBottom: "30px",
};

const linkStyle = {
  display: "block",
  color: "#D1D5DB",
  textDecoration: "none",
  marginBottom: "15px",
  padding: "12px",
  borderRadius: "10px",
  fontSize: "16px",
};

const logoutStyle = {
  width: "100%",
  padding: "12px",
  background: "#EF4444",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  marginTop: "30px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Sidebar;
