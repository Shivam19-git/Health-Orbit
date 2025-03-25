import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

// Utility to handle errors
const handleError = (error) => {
  if (error.response) {
    console.error("Error response:", error.response.data);
    return error.response.data.message || "An error occurred.";
  } else if (error.request) {
    console.error("Error request:", error.request);
    return "No response from the server. Please try again.";
  } else {
    console.error("Error message:", error.message);
    return error.message || "An unexpected error occurred.";
  }
};

// Send a join request to a coach
export const sendJoinRequest = async (coachId) => {
  try {
    const token = localStorage.getItem("authToken"); // Use authToken for user-related actions
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.post(
      `${API_URL}/user/join-coach/${coachId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// Fetch the list of connected coaches
export const fetchConnectedCoaches = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Use authToken for user-related actions
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/user/connected-coaches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Returns the list of connected coaches with their statuses
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching connected coaches");
  }
};

// Add other user-related API functions here as needed

