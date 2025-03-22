/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;


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
  const { token, coach } = response.data; 
  localStorage.setItem("coachToken", token);
  localStorage.setItem("coachId", coach.id);
  localStorage.setItem("coachFullName", coach.name); // Store the full name
  return response.data;
};

// Coach Logout
export const logoutCoach = async () => {
  const response = await axios.post(`${API_URL}/coach/logout`);
  return response.data;
};
