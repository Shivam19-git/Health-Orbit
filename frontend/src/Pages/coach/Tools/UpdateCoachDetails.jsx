/* eslint-disable no-unused-vars */
import { useState } from "react";
import { updateCoachDetails } from "../../../APIs/coachAPI";

const UpdateCoachDetails = () => {
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    bio: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCoachDetails(formData);
      setMessage(response.message);
      setError("");
    } catch (err) {
      setError("Failed to update details. Please try again.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Update Coach Details</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-lg w-full"
            placeholder="e.g., Weight Loss, Strength Training"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Experience (in years):</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-lg w-full"
            placeholder="e.g., 5"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-lg w-full"
            placeholder="Write a short bio about yourself"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update Details
        </button>
      </form>
    </div>
  );
};

export default UpdateCoachDetails;