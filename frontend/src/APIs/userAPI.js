import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

// Utility to handle errors (removed as it is unused)

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
    // Return the error message to the caller
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("An error occurred while sending the join request.");
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

// Fetch details of a specific coach
export const fetchCoachDetails = async (coachId) => {
  try {
    const token = localStorage.getItem("authToken"); // Use authToken for user-related actions
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/user/coach/${coachId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the coach details
  } catch (error) {
    console.error("Error fetching coach details:", error);
    throw error;
  }
};

/**
 * Fetches the list of coaches that the current user has requested but is not yet connected with
 * @returns {Promise<Array>} Array of requested coach objects
 */
export const fetchRequestedCoaches = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/user/requested-coaches`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data || [];
  } catch (error) {
    console.error("Error fetching requested coaches:", error);
    return []; // Return empty array to prevent breaking the component
  }
};

// Add other user-related API functions here as needed

