/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { fetchAllCoaches } from "../../../APIs/coachAPI";
import { sendJoinRequest, fetchConnectedCoaches } from "../../../APIs/userAPI";

const CoachesList = () => {
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [requestedCoaches, setRequestedCoaches] = useState([]); // Track requested coaches
  const [connectedCoaches, setConnectedCoaches] = useState([]); // Track connected coaches
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const toastTimeoutRef = useRef(null);
  const [specializations, setSpecializations] = useState([]);
  const [expandedBios, setExpandedBios] = useState({});
  const BIO_CHARACTER_LIMIT = 120; // Character limit for truncated bio

  // Load requested coaches from localStorage on initial render
  useEffect(() => {
    try {
      const storedRequestedCoaches = localStorage.getItem("requestedCoaches");
      if (storedRequestedCoaches) {
        setRequestedCoaches(JSON.parse(storedRequestedCoaches));
      }
    } catch (err) {
      console.error("Error loading requested coaches from localStorage:", err);
    }
  }, []);

  const fetchCoaches = async () => {
    try {
      setLoading(true);
      const data = await fetchAllCoaches();
      setCoaches(data);
      setFilteredCoaches(data);
      setError("");

      // Extract unique specializations for filters
      const uniqueSpecializations = [...new Set(data.map(coach => coach.specialization || "General Fitness"))];
      setSpecializations(uniqueSpecializations);

      // Fetch connected coaches
      const connected = await fetchConnectedCoaches();
      setConnectedCoaches(connected.map((coach) => coach.coachId)); // Assuming connectedCoaches contains coachId
      
      // Note: We removed the fetchRequestedCoaches call that was causing errors
      // Instead, we're using localStorage to persist the requested coaches
    } catch (err) {
      showError("Failed to fetch coaches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
    checkRequestStatus(); // Add this line to check request status on initial load
    
    // Clear any existing timeouts when component unmounts
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Save requestedCoaches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('requestedCoaches', JSON.stringify(requestedCoaches));
  }, [requestedCoaches]);

  // Filter coaches based on search term and specialization
  useEffect(() => {
    let results = coaches;
    
    if (searchTerm) {
      results = results.filter(coach => 
        coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSpecialization) {
      results = results.filter(coach => 
        (coach.specialization || "General Fitness") === selectedSpecialization
      );
    }
    
    setFilteredCoaches(results);
  }, [searchTerm, selectedSpecialization, coaches]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showError = (message) => {
    setError(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setError(""), 3000);
  };

  const handleRequestCoach = async (coachId) => {
    if (requestedCoaches.includes(coachId)) {
      showError("You have already requested this coach.");
      return; // Prevent duplicate requests
    }
  
    try {
      await sendJoinRequest(coachId);
      showSuccess("Request sent successfully!");
      
      // Update state and localStorage
      const newRequestedCoaches = [...requestedCoaches, coachId];
      setRequestedCoaches(newRequestedCoaches);
      
    } catch (err) {
      // Handle the specific error message from the backend
      if (err.message === "Request already sent to this coach") {
        const newRequestedCoaches = [...requestedCoaches, coachId];
        setRequestedCoaches(newRequestedCoaches);
        showError("You have already requested this coach.");
      } else {
        showError("Failed to send request. Please try again.");
        console.error("Request error:", err);
      }
    }
  };

  // Add a function to check if a request is pending for a specific coach
  const isRequestAlreadySent = async (coachId) => {
    try {
      await sendJoinRequest(coachId);
      return false; // If request succeeds, it means no previous request was sent
    } catch (err) {
      // If error contains "already sent", then request was already sent
      if (err.response && 
          err.response.data && 
          err.response.data.message && 
          err.response.data.message.includes("already sent")) {
        // Add to requestedCoaches state
        if (!requestedCoaches.includes(coachId)) {
          setRequestedCoaches(prev => [...prev, coachId]);
        }
        return true;
      }
      return false;
    }
  };

  // Add this function to check the status of coach requests on initial load
  const checkRequestStatus = async () => {
    // Only check coaches that aren't already in localStorage
    const storedRequestedCoaches = localStorage.getItem('requestedCoaches');
    let existingRequests = [];
    
    try {
      if (storedRequestedCoaches) {
        existingRequests = JSON.parse(storedRequestedCoaches);
        setRequestedCoaches(existingRequests);
      }
    } catch (err) {
      console.error("Error loading requested coaches from localStorage:", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecializationFilter = (specialization) => {
    setSelectedSpecialization(specialization === selectedSpecialization ? "" : specialization);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle bio expansion
  const toggleBioExpansion = (coachId) => {
    setExpandedBios(prev => ({
      ...prev,
      [coachId]: !prev[coachId]
    }));
  };

  // Function to truncate text with ellipsis
  const truncateBio = (text, limit) => {
    if (!text) return "No bio provided yet.";
    if (text.length <= limit) return text;
    
    // Find the last space before the limit to avoid cutting words
    const lastSpace = text.substring(0, limit).lastIndexOf(' ');
    const truncated = text.substring(0, lastSpace > 0 ? lastSpace : limit);
    return `${truncated}...`;
  };

  // Skeleton loader for coach cards
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="relative">
        <div className="bg-gray-300 h-32"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full bg-gray-300 border-4 border-white shadow-md"></div>
      </div>
      <div className="pt-16 px-6 pb-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="mt-6">
          <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Toast notifications */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg max-w-sm transform transition-all duration-500 ease-in-out">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg max-w-sm transform transition-all duration-500 ease-in-out">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* Header with improved styling */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Expert Coaches</h2>
            <p className="text-gray-600">Connect with our certified fitness professionals</p>
          </div>
          <button
            onClick={fetchCoaches}
            className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Refresh Coaches
          </button>
        </div>

        {/* Search and filter section */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search coaches by name or email..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          
          {/* Specialization filter chips */}
          {specializations.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Filter by specialization:</p>
              <div className="flex flex-wrap gap-2">
                {specializations.map(specialization => (
                  <button
                    key={specialization}
                    onClick={() => handleSpecializationFilter(specialization)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedSpecialization === specialization
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {specialization}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coaches grid with loading skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredCoaches.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCoaches.map((coach) => (
                <div
                  key={coach._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        coach.name
                      )}&background=random&color=fff&size=128`}
                      alt={`${coach.name}'s profile`}
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                    
                    {/* Status indicator badge */}
                    {(connectedCoaches.includes(coach._id) || requestedCoaches.includes(coach._id)) && (
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          connectedCoaches.includes(coach._id) 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {connectedCoaches.includes(coach._id) ? 'Connected' : 'Requested'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-16 px-6 pb-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                      {coach.name}
                    </h3>

                    <div className="mb-3 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                        {coach.specialization || "General Fitness"}
                      </span>
                    </div>

                    <div className="space-y-3 text-gray-600 mb-auto">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500"
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
                          className="w-5 h-5 mr-2 text-blue-500"
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
                        <div className="relative">
                          <p className="text-sm leading-relaxed min-h-[40px]">
                            {expandedBios[coach._id] 
                              ? coach.bio || "No bio provided yet."
                              : truncateBio(coach.bio, BIO_CHARACTER_LIMIT)}
                          </p>
                          {coach.bio && coach.bio.length > BIO_CHARACTER_LIMIT && (
                            <button 
                              onClick={() => toggleBioExpansion(coach._id)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1 focus:outline-none"
                            >
                              {expandedBios[coach._id] ? "Show less" : "Show more"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      {connectedCoaches.includes(coach._id) ? (
                        <button
                          className="w-full py-2 h-11 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-300 flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          View Contents
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRequestCoach(coach._id)}
                          disabled={requestedCoaches.includes(coach._id)} // Disable button if already requested
                          className={`w-full py-2 h-11 rounded-lg transition duration-300 focus:outline-none focus:ring-2 flex items-center justify-center ${
                            requestedCoaches.includes(coach._id)
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-opacity-50"
                          }`}
                        >
                          {requestedCoaches.includes(coach._id) ? (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              Requested
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                              </svg>
                              Request Coach
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Back to top button */}
            {filteredCoaches.length > 6 && (
              <button 
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Back to top"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No coaches found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm || selectedSpecialization ? 
                "Try changing your search criteria or filters" : 
                "No coaches available at the moment."}
            </p>
            {(searchTerm || selectedSpecialization) && (
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialization("");
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachesList;