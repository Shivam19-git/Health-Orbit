/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchAcceptedRequests } from "../../../APIs/coachAPI";

const AcceptedClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await fetchAcceptedRequests();
      setClients(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch accepted clients. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Accepted Clients</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : clients.length > 0 ? (
        <div className="space-y-4">
          {clients.map((client) => (
            <div
              key={client.userId}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{client.userName}</h3>
                <p className="text-gray-600">{client.userEmail}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No accepted clients at the moment.</p>
      )}
    </div>
  );
};

export default AcceptedClients;