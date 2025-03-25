/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  fetchPendingRequests,
  acceptClientRequest,
  rejectClientRequest,
} from "../../../APIs/coachAPI";

const ClientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchPendingRequests();
      setRequests(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch client requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (userId) => {
    try {
      await acceptClientRequest(userId);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.userId !== userId)
      );
      setSuccessMessage("Request accepted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to accept the request. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleReject = async (userId) => {
    try {
      await rejectClientRequest(userId);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.userId !== userId)
      );
      setSuccessMessage("Request rejected successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to reject the request. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Client Requests</h2>
        <button
          onClick={fetchRequests}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {!loading && requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li
              key={request.userId}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800">{request.userName}</h3>
              <p className="text-gray-600">
                <strong>Email:</strong> {request.userEmail}
              </p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleAccept(request.userId)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.userId)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && (
          <p className="text-gray-600">No client requests at the moment.</p>
        )
      )}
    </div>
  );
};

export default ClientRequests;