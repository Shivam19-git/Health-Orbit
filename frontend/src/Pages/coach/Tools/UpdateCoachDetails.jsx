import { useState, useEffect } from "react";
import { fetchCoachDetails, updateCoachDetails } from "../../../APIs/coachAPI";
import { FiSave, FiEdit, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const UpdateCoachDetails = () => {
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch coach details on component mount
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchCoachDetails();
        setFormData({
          specialization: data.specialization || "",
          experience: data.experience || "",
          bio: data.bio || "",
        });
      } catch (err) {
        setError("Failed to fetch coach details. Please try again.");
      }
    };
    fetchDetails();
  }, []);

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
      setIsEditing(false); // Exit edit mode after saving
    } catch (err) {
      setError("Failed to update details. Please try again.");
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Exit edit mode without saving
  };

  return (
    <div className="p-6 bg-white h-auto w-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Update Profile Details
        </h2>

        {/* Success/Error Messages */}
        {(message || error) && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message
                ? "bg-green-50 border border-green-100"
                : "bg-red-50 border border-red-100"
            }`}
          >
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

        {/* Display or Edit Mode */}
        {!isEditing ? (
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Your Profile Details
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-700">
                  Specialization:
                </h4>
                <p className="text-gray-600">
                  {formData.specialization || "Not provided"}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-700">
                  Experience:
                </h4>
                <p className="text-gray-600">
                  {formData.experience
                    ? `${formData.experience} years`
                    : "Not provided"}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-700">Bio:</h4>
                <p className="text-gray-600">
                  {formData.bio || "Not provided"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiEdit size={18} />
              Edit
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleFormSubmit}
            className="bg-gray-50 p-6 rounded-xl shadow-md space-y-6"
          >
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
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-32"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-2.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2.5 rounded-lg text-white font-medium ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 transition-colors"
                }`}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateCoachDetails;