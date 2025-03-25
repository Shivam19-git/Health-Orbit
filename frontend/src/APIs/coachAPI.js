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

// Fetch all approved coaches
export const fetchAllCoaches = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/user/all-coaches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching coaches:", error);
    throw error;
  }
};

// Update coach details
export const updateCoachDetails = async (details) => {
  try {
    const token = localStorage.getItem("coachToken");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.put(`${API_URL}/coach/update-details`, details, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating coach details:", error);
    throw error;
  }
};

// Fetch coach details
export const fetchCoachDetails = async () => {
  try {
    const token = localStorage.getItem("coachToken");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/coach/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coach details:", error);
    throw error;
  }
};

// Fetch pending client requests
export const fetchPendingRequests = async () => {
  try {
    const token = localStorage.getItem("coachToken");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/coach/pending-requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    throw error;
  }
};

// Accept a client request
export const acceptClientRequest = async (userId) => {
  try {
    const token = localStorage.getItem("coachToken");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.put(
      `${API_URL}/coach/accept-request/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error accepting client request:", error);
    throw error;
  }
};

// Reject a client request
export const rejectClientRequest = async (userId) => {
  try {
    const token = localStorage.getItem("coachToken");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.put(
      `${API_URL}/coach/reject-request/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting client request:", error);
    throw error;
  }
};

export const fetchAcceptedRequests = async () => {
  try {
    const token = localStorage.getItem("coachToken");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/coach/accepted-requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching accepted requests:", error);
    throw error;
  }
};

// Fetch all workouts for the logged-in coach
export const fetchWorkouts = async () => {
  try {
    const token = localStorage.getItem("coachToken");
    const coachId = localStorage.getItem("coachId");
    if (!token || !coachId) {
      throw new Error("No token or coach ID found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/coach/${coachId}/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw error;
  }
};

// Add a new workout
export const addWorkout = async (workout) => {
  try {
    const token = localStorage.getItem("coachToken");
    const coachId = localStorage.getItem("coachId");
    if (!token || !coachId) {
      throw new Error("No token or coach ID found. Please log in again.");
    }

    const response = await axios.post(`${API_URL}/coach/${coachId}/workouts`, workout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding workout:", error);
    throw error;
  }
};

// Update an existing workout
export const updateWorkout = async (workoutId, workout) => {
  try {
    const token = localStorage.getItem("coachToken");
    const coachId = localStorage.getItem("coachId");
    if (!token || !coachId) {
      throw new Error("No token or coach ID found. Please log in again.");
    }

    const response = await axios.put(`${API_URL}/coach/${coachId}/workouts/${workoutId}`, workout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating workout:", error);
    throw error;
  }
};

// Delete a workout
export const deleteWorkout = async (workoutId) => {
  try {
    const token = localStorage.getItem("coachToken");
    const coachId = localStorage.getItem("coachId");
    if (!token || !coachId) {
      throw new Error("No token or coach ID found. Please log in again.");
    }

    const response = await axios.delete(`${API_URL}/coach/${coachId}/workouts/${workoutId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw error;
  }
};

