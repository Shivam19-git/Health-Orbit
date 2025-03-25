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

// Fetch all diet plans for the logged-in coach
export const fetchDietPlans = async () => {
  try {
    const token = localStorage.getItem("coachToken");
    const coachId = localStorage.getItem("coachId");
    if (!token || !coachId) {
      throw new Error("No token or coach ID found. Please log in again.");
    }

    const response = await axios.get(`${API_URL}/coach/${coachId}/diet-plans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    throw error;
  }
};

// Add a new diet plan
export const addDietPlan = async (dietPlan) => {
  try {
    const token = localStorage.getItem("coachToken");
    const coachId = localStorage.getItem("coachId");
    if (!token || !coachId) {
      throw new Error("No token or coach ID found. Please log in again.");
    }

    const response = await axios.post(
      `${API_URL}/coach/${coachId}/diet-plans`,
      dietPlan,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding diet plan:", error);
    throw error;
  }
};

// Update an existing diet plan
export const updateDietPlan = async (dietPlanId, dietPlan) => {
  try {
    const token = localStorage.getItem("coachToken");
    const coachId = localStorage.getItem("coachId");
    if (!token || !coachId) {
      throw new Error("No token or coach ID found. Please log in again.");
    }

    const response = await axios.put(
      `${API_URL}/coach/${coachId}/diet-plans/${dietPlanId}`,
      dietPlan,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating diet plan:", error);
    throw error;
  }
};

// Delete a diet plan
export const deleteDietPlan = async (dietPlanId) => {
  try {
    const token = localStorage.getItem("coachToken");
    const coachId = localStorage.getItem("coachId");
    if (!token || !coachId) {
      throw new Error("No token or coach ID found. Please log in again.");
    }

    const response = await axios.delete(
      `${API_URL}/coach/${coachId}/diet-plans/${dietPlanId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting diet plan:", error);
    throw error;
  }
};
