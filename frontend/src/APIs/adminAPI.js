import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.BACKEND_API_URL;

// set auth token in headers
const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };
// Admin Login
const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, { username, password });
    localStorage.setItem("token", response.token); // Save token to localStorage
    setAuthToken(response.token); // Set token in headers
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPendingCoaches = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/admin/pending-coaches`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const approveCoach = async (coachId)=>{
    const response = await axios.put(`${API_URL}/admin/approve-coach/${coachId}`);
    return response.data;
}

const rejectCoach = async (coachId)=>{
    const response = await axios.delete(`${API_URL}/admin/reject-coach/${coachId}`);
    return response.data;
}

export {loginAdmin, getPendingCoaches, approveCoach, rejectCoach, setAuthToken};