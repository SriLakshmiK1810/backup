import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import PieChartComponent from "../components/PieChartComponent";

function DashboardScreen() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
  totalBudget: 0,
  totalExpenses: 0,
  remainingBalance: 0,
});
const [latestBudget, setLatestBudget] = useState(null);
const [allExpenses, setAllExpenses] = useState([]);
const [recentExpenses, setRecentExpenses] = useState([]);
useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const dashboardResponse = await api.get("/dashboard");
    setDashboard(dashboardResponse.data);

    const expenseResponse = await api.get("/expenses");
    setAllExpenses(expenseResponse.data);
    const budgetResponse = await api.get("/budgets/latest");
setLatestBudget(budgetResponse.data);
setRecentExpenses(expenseResponse.data.slice(-5).reverse());
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={mainContent}>
        <header style={{ marginBottom: "30px" }}>
          <h1 style={{ color: "#111827", margin: "0 0 5px" }}>
            Welcome Back 👋
          </h1>
          <p style={{ color: "#6B7280", margin: 0 }}>
            Track your expenses and manage your budget.
          </p>
        </header>

        <div style={summaryGrid}>
         <SummaryCard
  label="Total Budget"
  value={`₹${dashboard.totalBudget}`}
/>

<SummaryCard
  label="Total Expenses"
  value={`₹${dashboard.totalExpenses}`}
/>

<SummaryCard
  label="Balance Left"
  value={`₹${dashboard.remainingBalance}`}
/>

   </div>

        <section style={sectionCard}>
          <h2 style={sectionTitle}>Budget Usage</h2>
          <div style={progressTrack}>
            <div
  style={{
    ...progressValue,
    width: `${
      dashboard.totalBudget > 0
        ? Math.min(
            (dashboard.totalExpenses / dashboard.totalBudget) * 100,
            100
          )
        : 0
    }%`,
    background:
      dashboard.totalBudget > 0 &&
      dashboard.totalExpenses / dashboard.totalBudget >= 0.8
        ? "#EF4444" // Red
        : dashboard.totalBudget > 0 &&
          dashboard.totalExpenses / dashboard.totalBudget >= 0.5
        ? "#F59E0B" // Orange
        : "#22C55E", // Green
  }}
/>
</div>
          <p style={{ margin: "10px 0 0", color: "#6B7280" }}>
           ₹{dashboard.totalExpenses} of ₹{dashboard.totalBudget} used      </p>
        </section>
  <section style={sectionCard}>
  <h2 style={sectionTitle}>📅 Monthly Insights</h2>

  <div style={overviewGrid}>
    <div>
      <p style={overviewLabel}>Expenses Logged</p>
      <h3>{recentExpenses.length}</h3>
    </div>

    <div>
      <p style={overviewLabel}>Average Expense</p>
      <h3>
        ₹
        {recentExpenses.length > 0
          ? Math.round(
              dashboard.totalExpenses / recentExpenses.length
            )
          : 0}
      </h3>
    </div>

    <div>
      <p style={overviewLabel}>Largest Expense</p>
      <h3>
        ₹
        {recentExpenses.length > 0
          ? Math.max(
              ...recentExpenses.map(e => Number(e.amount))
            )
          : 0}
      </h3>
    </div>
  </div>
</section>

      
       <section style={sectionCard}>
  <h2 style={sectionTitle}>Savings Goal</h2>

 <p>
  Goal: <strong>₹{latestBudget?.savingsGoal || 0}</strong>
</p>
  <div style={progressTrack}>
    <div
      style={{
        ...progressValue,
        width: `${
  latestBudget?.savingsGoal
    ? Math.min(
        (dashboard.remainingBalance / latestBudget.savingsGoal) * 100,
        100
      )
    : 0
}%`,
        background: "#22C55E",
      }}
    />
  </div>

  <p style={{ marginTop: "15px" }}>
    Current Savings: <strong>₹{dashboard.remainingBalance}</strong>

<p style={{ marginTop: "10px" }}>
  {dashboard.remainingBalance >= (latestBudget?.savingsGoal || 0)
    ? "🎉 Congratulations! You reached your savings goal."
    : `₹${((latestBudget?.savingsGoal || 0) - dashboard.remainingBalance).toFixed(0)} more to reach your goal.`}
</p>
  </p>
</section>
<section style={sectionCard}>
  <h2 style={sectionTitle}>⚡ Quick Actions</h2>

  <div style={quickGrid}>
    <button
      style={quickCard}
      onClick={() => navigate("/add-expense")}
    >
      <h3>Manual Entry</h3>
      <p>Add an expense manually</p>
    </button>

    <button
      style={quickCard}
      onClick={() => navigate("/scan-bill")}
    >
      <h3>Scan Bill</h3>
      <p>Auto detect amount & category</p>
    </button>
  </div>
</section>
        <div style={detailsGrid}>
          <section style={sectionCard}>
            <h2 style={sectionTitle}>Recent Expenses</h2>
            {recentExpenses.length === 0 ? (
              <p>No expenses added yet</p>
            ) : (
              recentExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  label={`${expense.category} - ${expense.title}`}
                  value={`₹${expense.amount}`}
                />
              ))
            )}
          </section>

          <div style={{ display: "grid", gap: "20px" }}>
            <section style={sectionCard}>
              <h2 style={sectionTitle}>Quick Stats</h2>
              <p>Food: 35%</p>
              <p>Travel: 25%</p>
              <p style={{ marginBottom: 0 }}>Shopping: 40%</p>
            </section>
            <section style={sectionCard}>
              <h2 style={sectionTitle}>Recent Activity</h2>
              <p>🍔 Food Expense Added</p>
              <p>🚕 Travel Expense Added</p>
              <p style={{ marginBottom: 0 }}>💰 Budget Updated</p>
            </section>
          </div>
        </div>
        <section style={sectionCard}>
  <h2 style={sectionTitle}>📊 Expense Breakdown</h2>

  <PieChartComponent expenses={allExpenses} />
</section>
        <section style={sectionCard}>
  <h2 style={sectionTitle}>💡 Tip of the Day</h2>

  <p style={{ color: "#4B5563", marginBottom: "10px" }}>
    "Track every rupee today to build a stronger financial future tomorrow."
  </p>

  <p style={{ color: "#6B7280", margin: 0 }}>
    Small daily savings can make a big difference over time.
  </p>
</section>
      </main>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div style={summaryCard}>
      <p style={cardLabel}>{label}</p>
      <h2 style={cardValue}>{value}</h2>
    </div>
  );
}



function ExpenseItem({ label, value }) {
  return (
    <div style={expenseItem}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const mainContent = {
  flex: 1,
  padding: "35px",
  background: "#F8FAFC",
  minWidth: 0,
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const summaryCard = {
  background: "#FFFFFF",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
};


const expenseItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 0",
  borderBottom: "1px solid #E5E7EB",
  color: "#374151",
};


const detailsGrid = {
  display: "grid",
  gridTemplateColumns: "1.5fr 1fr",
  gap: "20px",
};

const progressTrack = {
  width: "100%",
  height: "15px",
  background: "#E5E7EB",
  borderRadius: "20px",
  overflow: "hidden",
  marginTop: "15px",
};

const progressValue = {
  height: "100%",
  borderRadius: "20px",
};

const cardLabel = {
  color: "#6B7280",
  margin: "0 0 10px",
};

const cardValue = {
  color: "#111827",
  margin: 0,
};

const sectionTitle = {
  color: "#111827",
  margin: "0 0 15px",
};


const overviewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "30px",
  marginTop: "25px",
};
const overviewLabel = {
  color: "#6B7280",
  marginBottom: "5px",
  fontSize: "14px",
};

const quickGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
};

const quickCard = {
  padding: "25px",
  border: "none",
  borderRadius: "18px",
  background: "#EEF4FF",
  cursor: "pointer",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  color: "#111827",
  fontSize: "16px",
};
const sectionCard = {
  background: "#FFFFFF",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  marginBottom: "25px",   // Add this
};
export default DashboardScreen;
