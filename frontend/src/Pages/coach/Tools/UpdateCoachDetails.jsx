/* eslint-disable no-unused-vars */
import { useState } from "react";
import { updateCoachDetails } from "../../../APIs/coachAPI";
import { FiSave, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const UpdateCoachDetails = () => {
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    bio: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await updateCoachDetails(formData);
      setMessage(response.message || "Profile updated successfully!");
      setError("");
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError("Failed to update details. Please try again.");
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white h-auto w-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Update Profile Details
        </h2>
        
        {/* Success/Error Messages */}
        {(message || error) && (
          <div className={`mb-6 p-4 rounded-lg ${message ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"}`}>
            <div className="flex items-center">
              {message ? (
                <FiCheckCircle className="text-green-500 mr-3" size={20} />
              ) : (
                <FiAlertCircle className="text-red-500 mr-3" size={20} />
              )}
              <p className={message ? "text-green-700" : "text-red-700"}>
                {message || error}
              </p>
            </div>
          </div>
        )}
        
        <div className="bg-zinc-50 p-6 rounded-xl shadow-md mb-8">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Professional Details Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
                Professional Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="e.g., Weight Loss, Strength Training"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="e.g., 5"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            {/* Bio Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
                Bio & Personal Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-32"
                  placeholder="Tell clients about your coaching philosophy, background, and approach..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  This bio will be visible to potential clients on your profile.
                </p>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium cursor-pointer
                  ${isLoading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 transition-colors"}`}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <FiSave size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCoachDetails;