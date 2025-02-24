import React, { useEffect, useState } from "react";
import { getPendingCoaches, approveCoach, rejectCoach, setAuthToken } from "../../APIs/adminAPI";

const AdminDashboard = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token); // Set the token in Axios headers
    }
    fetchPendingCoaches();
  }, []);

  const fetchPendingCoaches = async () => {
    try {
      setLoading(true);
      const data = await getPendingCoaches();
      // Ensure each coach has a certificateUrl, even if it's an empty string
      const validatedData = data.map((coach) => ({
        ...coach,
        certificateUrl: coach.certificateUrl || "",
      }));
      setCoaches(validatedData);
      setError("");
    } catch (error) {
      console.error("Error fetching pending coaches:", error);
      setError("Failed to fetch pending coaches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (coachId) => {
    try {
      await approveCoach(coachId);
      fetchPendingCoaches(); // Refresh the list after approval
    } catch (error) {
      console.error("Error approving coach:", error);
      setError("Failed to approve coach. Please try again.");
    }
  };

  const handleReject = async (coachId) => {
    try {
      await rejectCoach(coachId);
      fetchPendingCoaches(); // Refresh the list after rejection
    } catch (error) {
      console.error("Error rejecting coach:", error);
      setError("Failed to reject coach. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>; // Show a loading message
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pending Coaches</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {coaches.length === 0 ? (
        <p className="text-gray-600 text-center">No pending coaches.</p>
      ) : (
        <ul className="space-y-4">
          {coaches.map((coach) => (
            <li key={coach._id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-800">Name: {coach.name}</p>
              <p className="text-gray-600">Email: {coach.email}</p>
              {/* Display certificate image or PDF link */}
              {coach.certificateUrl && coach.certificateUrl.endsWith(".pdf") ? (
                <a
                  href={coach.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Certificate (PDF)
                </a>
              ) : (
                <img
                  src={coach.certificateUrl}
                  alt="Certificate"
                  className="w-full max-w-xs mt-2 rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200"; // Fallback image if the URL is invalid
                  }}
                />
              )}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleApprove(coach._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(coach._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;