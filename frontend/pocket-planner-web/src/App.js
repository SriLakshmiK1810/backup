import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import ExpenseListScreen from "./screens/ExpenseListScreen";
import BudgetScreen from "./screens/BudgetScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import WishlistScreen from "./screens/WishlistScreen";
import ScanBillScreen from "./screens/ScanBillScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<WelcomeScreen />} />
  <Route path="/login" element={<LoginScreen />} />
  <Route path="/register" element={<RegisterScreen />} />
  <Route path="/dashboard" element={<DashboardScreen />} />
  <Route path="/add-expense" element={<AddExpenseScreen />} />
  <Route path="/expenses" element={<ExpenseListScreen />} />
  <Route path="/budget" element={<BudgetScreen />} />
  <Route path="/profile" element={<ProfileScreen />} />
  <Route path="/wishlist" element={<WishlistScreen />} />
  
<Route path="/scan-bill" element={<ScanBillScreen />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;