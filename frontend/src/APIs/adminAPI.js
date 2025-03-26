import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

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
  const response = await axios.post(`${API_URL}/admin/login`, { username, password });
  localStorage.setItem("token", response.token); // Save token to localStorage
  setAuthToken(response.token); // Set token in headers
  return response.data;
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

// Fetch all approved coaches
 const fetchApprovedCoaches = async () => {
  try {
    const token = localStorage.getItem("token"); // Use authToken for admin-related actions
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/admin/approved-coaches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the list of approved coaches
  } catch (error) {
    console.error("Error fetching approved coaches:", error);
    throw error;
  }
};

// Deactivate a coach
export const deactivateCoach = async (coachId) => {
  try {
    const token = localStorage.getItem("token"); // Use authToken for admin-related actions
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.put(`${API_URL}/admin/deactivate-coach/${coachId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the response
  } catch (error) {
    console.error("Error deactivating coach:", error);
    throw error;
  }
};

// Fetch all users
 const fetchAllUsers = async () => {
  try {
    const token = localStorage.getItem("token"); // Use authToken for admin-related actions
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the list of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Deactivate a user
 const deactivateUser = async (userId) => {
  try {
    const token = localStorage.getItem("token"); // Use authToken for admin-related actions
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.put(`${API_URL}/admin/deactivate-user/${userId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the response
  } catch (error) {
    console.error("Error deactivating user:", error);
    throw error;
  }
};

export {loginAdmin, getPendingCoaches, approveCoach, rejectCoach, setAuthToken, fetchApprovedCoaches, fetchAllUsers,  deactivateUser};