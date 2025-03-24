/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchAllCoaches } from "../../../APIs/coachAPI";

const CoachesList = () => {
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch coaches
  const fetchCoaches = async () => {
    try {
      setLoading(true);
      const data = await fetchAllCoaches();
      setCoaches(data);
      setError("");
    } catch (error) {
      setError("Failed to fetch coaches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch coaches on component mount
  useEffect(() => {
    fetchCoaches();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Our Expert Coaches</h2>
        <button
          onClick={fetchCoaches}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && coaches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach) => (
            <div
              key={coach._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    coach.name
                  )}&background=random&color=fff&size=128`}
                  alt={`${coach.name}'s profile`}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
              </div>

              <div className="pt-16 px-6 pb-6">
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                  {coach.name}
                </h3>

                <div className="mb-3 text-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                    {coach.specialization || "General Fitness"}
                  </span>
                </div>

                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <p className="text-sm">{coach.email}</p>
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <p className="text-sm">
                      {coach.experience
                        ? `${coach.experience} years of experience`
                        : "Experience not specified"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">About</h4>
                    <p className="text-sm leading-relaxed">
                      {coach.bio || "No bio provided yet."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="text-gray-600 mt-4 text-lg">
              No coaches available at the moment.
            </p>
            <p className="text-gray-500 mt-2">Check back later for updates.</p>
          </div>
        )
      )}
    </div>
  );
};

export default CoachesList;