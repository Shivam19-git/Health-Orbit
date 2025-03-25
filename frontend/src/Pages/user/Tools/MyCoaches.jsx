/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchConnectedCoaches } from "../../../APIs/userAPI";

const MyCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCoaches = async () => {
    try {
      setLoading(true);

      // Fetch connected coaches from the backend
      const connectedCoaches = await fetchConnectedCoaches();
      console.log("Connected Coaches API Response:", connectedCoaches); // Debugging log

      // Ensure unique coaches based on coachId
      const uniqueCoaches = connectedCoaches.filter(
        (coach, index, self) =>
          index === self.findIndex((c) => c.coachId === coach.coachId)
      );
      console.log("Unique Coaches:", uniqueCoaches); // Debugging log

      setCoaches(uniqueCoaches); // Update state with unique coaches
    } catch (err) {
      console.error("Error fetching connected coaches:", err); // Debugging log
      setError("Failed to fetch connected coaches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">My Coaches</h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && coaches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach) => (
            <div
              key={coach.coachId} // Use a unique key for each coach
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    coach.coachName
                  )}&background=random&color=fff&size=128`}
                  alt={`${coach.coachName}'s profile`}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
              </div>
              <div className="pt-16 px-6 pb-6">
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                  {coach.coachName}
                </h3>
                <p className="text-gray-600 text-center">{coach.coachEmail}</p>
                <p className="text-gray-600 text-center">
                  {coach.specialization || "N/A"} - {coach.experience || "N/A"} years
                </p>
                <p className="text-gray-600 text-center">{coach.bio || "No bio available"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-600">No connected coaches found.</p>
      )}
    </div>
  );
};

export default MyCoaches;