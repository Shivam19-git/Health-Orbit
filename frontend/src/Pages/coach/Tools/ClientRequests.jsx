/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  fetchPendingRequests,
  acceptClientRequest,
  rejectClientRequest,
} from "../../../APIs/coachAPI";
import { FiRefreshCw, FiUserPlus, FiUserX, FiCheckCircle, FiAlertCircle, FiMail } from "react-icons/fi";

const ClientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [processingRequests, setProcessingRequests] = useState([]);

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
    setProcessingRequests((prev) => [...prev, userId]);
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
    } finally {
      setProcessingRequests((prev) => prev.filter(id => id !== userId));
    }
  };

  const handleReject = async (userId) => {
    setProcessingRequests((prev) => [...prev, userId]);
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
    } finally {
      setProcessingRequests((prev) => prev.filter(id => id !== userId));
    }
  };

  return (
    <div className="p-6 bg-white h-auto w-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Client Requests</h2>
          <button
            onClick={fetchRequests}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            <FiRefreshCw size={18} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Notification Area */}
        {(successMessage || error) && (
          <div className={`mb-6 p-4 rounded-lg ${successMessage ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"}`}>
            <div className="flex items-center">
              {successMessage ? (
                <FiCheckCircle className="text-green-500 mr-3" size={20} />
              ) : (
                <FiAlertCircle className="text-red-500 mr-3" size={20} />
              )}
              <p className={successMessage ? "text-green-700" : "text-red-700"}>
                {successMessage || error}
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-zinc-50 p-6 rounded-xl shadow-md transition-all duration-300 mb-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading client requests...</p>
            </div>
          ) : requests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.map((request) => (
                <div
                  key={request.userId}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100"
                >
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{request.userName}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FiMail size={16} className="mr-2" />
                      <span>{request.userEmail}</span>
                    </div>
                    
                    {request.message && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-700">{request.message}</p>
                      </div>
                    )}
                    
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => handleAccept(request.userId)}
                        disabled={processingRequests.includes(request.userId)}
                        className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer disabled:bg-green-400 disabled:cursor-wait"
                      >
                        {processingRequests.includes(request.userId) ? (
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <FiUserPlus size={18} />
                        )}
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleReject(request.userId)}
                        disabled={processingRequests.includes(request.userId)}
                        className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer disabled:bg-red-400 disabled:cursor-wait"
                      >
                        {processingRequests.includes(request.userId) ? (
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <FiUserX size={18} />
                        )}
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-lg text-center">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                <FiUserPlus size={28} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Requests</h3>
              <p className="text-gray-600 mb-6">
                You do not have any client requests at the moment.
              </p>
              <button
                onClick={fetchRequests}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Check Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientRequests;