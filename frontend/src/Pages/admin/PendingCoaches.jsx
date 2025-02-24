import React, { useEffect, useState } from "react";
import { getPendingCoaches, approveCoach, rejectCoach } from "../../APIs/adminAPI";

const PendingCoach = () => {
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPendingCoaches();
  }, []);

  const fetchPendingCoaches = async () => {
    try {
      const data = await getPendingCoaches();
      setCoaches(data);
    } catch (error) {
      setError("Failed to load pending coaches.");
    }
  };

  const handleApprove = async (coachId) => {
    await approveCoach(coachId);
    fetchPendingCoaches(); // Refresh the list after approval
  };

  const handleReject = async (coachId) => {
    await rejectCoach(coachId);
    fetchPendingCoaches(); // Refresh the list after rejection
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Pending Coaches</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <ul className="space-y-4">
          {coaches.map((coach) => (
            <li key={coach._id} className="border border-gray-300 p-4 rounded-lg shadow-sm bg-gray-50">
              <p className="text-lg font-semibold text-black">Name: {coach.name}</p>
              <p className="text-gray-600">Email: {coach.email}</p>
              <img src={coach.certificateUrl} alt="Certificate" className="w-full max-w-xs mt-2 rounded-lg shadow-md" />
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
      </div>
    </div>
  );
};

export default PendingCoach;