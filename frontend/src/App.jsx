import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    
  )
}

export default App
// Compare this snippet from FitnessApp0/frontend/src/Pages/LoginRegisterPage.jsx: