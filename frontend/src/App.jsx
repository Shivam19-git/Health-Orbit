import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/user/LoginPage";
import RegisterPage from "./Pages/user/RegisterPage";
import BMICalculator from "./Components/BMICalculator";
import UserDashboard from "./Pages/user/UserDashboard";
import AdminLogin from "./Pages/admin/AdminLogin";
import PendingCoach from "./Pages/admin/PendingCoaches";
import AdminDashboard from "./Pages/admin/AdminDashboard";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/pending-coaches" element={<PendingCoach />} />
      </Routes>
    
  );
}

export default App;
