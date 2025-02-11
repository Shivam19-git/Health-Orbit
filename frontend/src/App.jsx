import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import BMICalculator from "./Components/BMICalculator";
import UserDashboard from "./Pages/UserDashboard";
import Coaches from "./Pages/Coaches"; // Import Coaches Page

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/coaches" element={<Coaches />} />  {/* Added Coaches Route */}
      </Routes>
    
  );
}

export default App;
