/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchPendingRequests } from "../../../APIs/coachAPI";

const ClientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchRequests();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Client Requests</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

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
              <p className="text-gray-600">
                <strong>Requested On:</strong>{" "}
                {new Date(request.timestamp).toLocaleString()}
              </p>
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