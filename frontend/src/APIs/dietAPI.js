import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const addDietData = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/diet`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding diet data:", error);
      throw error;
    }
  };
  
  // Fetch diet data for a specific date
  export const fetchDietData = async (date) => {
    try {
      console.log("Fetching diet data for date:", date);
      const response = await axios.get(`${API_URL}/diet/${date}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching diet data:", error);
      throw error;
    }
  };
  
  // Delete diet data
  export const deleteDietData = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/diet/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting diet data:", error);
      throw error;
    }
  };

export const addMultipleDietData = async (date, meals) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.post(
      `${API_URL}/diet/add-multiple`,
      { date, meals },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding multiple diet data:", error);
    throw error;
  }
};
