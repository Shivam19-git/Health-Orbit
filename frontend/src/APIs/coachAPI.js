import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.BACKEND_API_URL;

// Set authorization token in headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Coach Registration
export const registerCoach = async (formData) => {
  const response = await axios.post(`${API_URL}/coach/register`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Coach Login
export const loginCoach = async (email, password) => {
  const response = await axios.post(`${API_URL}/coach/login`, { email, password });
  return response.data;
};

// Coach Logout
export const logoutCoach = async () => {
  const response = await axios.post(`${API_URL}/coach/logout`);
  return response.data;
};