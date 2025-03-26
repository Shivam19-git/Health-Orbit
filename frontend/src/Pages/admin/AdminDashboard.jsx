/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  getPendingCoaches,
  approveCoach,
  rejectCoach,
  setAuthToken,
  fetchApprovedCoaches,
  fetchAllUsers,
  deactivateCoach,
  deactivateUser,
} from "../../APIs/adminAPI";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [coaches, setCoaches] = useState([]); // Pending coaches
  const [approvedCoaches, setApprovedCoaches] = useState([]); // Approved coaches
  const [users, setUsers] = useState([]); // Users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedUser, setExpandedUser] = useState(null); // Track expanded user for dropdown
  const [activeSection, setActiveSection] = useState("pending-coaches"); // Track active section
  
  // Add refresh loading states
  const [refreshingPending, setRefreshingPending] = useState(false);
  const [refreshingApproved, setRefreshingApproved] = useState(false);
  const [refreshingUsers, setRefreshingUsers] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/admin/login"); // Redirect to the admin login page
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token); // Set the token in Axios headers
    }
    fetchPendingCoaches();
    fetchApprovedCoachesList(); // Fetch approved coaches
    fetchUsersList(); // Fetch users
  }, []);

  const fetchPendingCoaches = async () => {
    try {
      setRefreshingPending(true);
      if (loading) setLoading(true);
      const data = await getPendingCoaches();
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
      setRefreshingPending(false);
      if (loading) setLoading(false);
    }
  };

  const fetchApprovedCoachesList = async () => {
    try {
      setRefreshingApproved(true);
      if (loading) setLoading(true);
      const data = await fetchApprovedCoaches();
      setApprovedCoaches(data); // Set approved coaches
      setError("");
    } catch (err) {
      console.error("Error fetching approved coaches:", err);
      setError("Failed to fetch approved coaches. Please try again.");
    } finally {
      setRefreshingApproved(false);
      if (loading) setLoading(false);
    }
  };

  const fetchUsersList = async () => {
    try {
      setRefreshingUsers(true);
      if (loading) setLoading(true);
      const data = await fetchAllUsers();
      setUsers(data); // Set users data
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setRefreshingUsers(false);
      if (loading) setLoading(false);
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

  const handleDeactivateCoach = async (coachId) => {
    try {
      await deactivateCoach(coachId);
      fetchApprovedCoachesList(); // Refresh the list after deactivation
    } catch (error) {
      console.error("Error deactivating coach:", error);
      setError("Failed to deactivate coach. Please try again.");
    }
  };

  const handleDeactivateUser = async (userId) => {
    try {
      await deactivateUser(userId);
      fetchUsersList(); // Refresh the list after deactivation
    } catch (error) {
      console.error("Error deactivating user:", error);
      setError("Failed to deactivate user. Please try again.");
    }
  };

  const toggleDropdown = (userId) => {
    setExpandedUser((prev) => (prev === userId ? null : userId));
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="ml-64 p-6 w-full">
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-zinc-50 min-h-screen">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout} // Pass the logout handler to the sidebar
      />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
          Admin Dashboard
        </h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Pending Coaches Section */}
        {activeSection === "pending-coaches" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                Pending Coach Requests
              </h2>
              <button
                onClick={fetchPendingCoaches}
                disabled={refreshingPending}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
              >
                {refreshingPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
            </div>
            {coaches.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No pending coaches.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coaches.map((coach) => (
                  <div
                    key={coach._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {coach.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{coach.email}</p>
                      
                      {coach.certificateUrl && coach.certificateUrl.endsWith(".pdf") ? (
                        <a
                          href={coach.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4 hover:bg-blue-100 transition duration-300"
                        >
                          View Certificate (PDF)
                        </a>
                      ) : (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-2">Certificate:</p>
                          <img
                            src={coach.certificateUrl}
                            alt="Certificate"
                            className="w-full rounded-lg shadow-sm"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/200?text=No+Image";
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="flex space-x-3 mt-4">
                        <button
                          onClick={() => handleApprove(coach._id)}
                          className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(coach._id)}
                          className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Approved Coaches Section */}
        {activeSection === "approved-coaches" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                Approved Coaches
              </h2>
              <button
                onClick={fetchApprovedCoachesList}
                disabled={refreshingApproved}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
              >
                {refreshingApproved ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
            </div>
            {approvedCoaches.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No approved coaches found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedCoaches.map((coach) => (
                  <div
                    key={coach._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
                  >
                    <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {coach.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{coach.email}</p>
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-500">Specialization:</span>
                        <p className="text-gray-800">{coach.specialization || "N/A"}</p>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-500">Experience:</span>
                        <p className="text-gray-800">{coach.experience || "N/A"} years</p>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-500">Bio:</span>
                        <p className="text-gray-800">{coach.bio || "N/A"}</p>
                      </div>
                    </div>
                    <div className="px-6 pb-4">
                      <button
                        onClick={() => handleDeactivateCoach(coach._id)}
                        className="w-full h-10 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        Deactivate Coach
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Section */}
        {activeSection === "users" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                Users
              </h2>
              <button
                onClick={fetchUsersList}
                disabled={refreshingUsers}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
              >
                {refreshingUsers ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
            </div>
            {users.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No users found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
                  >
                    <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {user.fullname}
                      </h3>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded mt-1">
                        {user.role}
                      </span>
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-500">
                          Connected Coaches: {user.connectedCoaches.length}
                        </span>
                        <button
                          onClick={() => toggleDropdown(user._id)}
                          className="bg-blue-500 text-white h-8 px-3 rounded text-sm hover:bg-blue-600 transition duration-300 flex items-center"
                        >
                          {expandedUser === user._id ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                              Hide Coaches
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              View Coaches
                            </>
                          )}
                        </button>
                      </div>
                      
                      {expandedUser === user._id && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                          <h4 className="font-medium text-gray-700 mb-2">Connected Coaches</h4>
                          {user.connectedCoaches.length === 0 ? (
                            <p className="text-gray-500 text-sm">No connected coaches</p>
                          ) : (
                            <div className="space-y-3">
                              {user.connectedCoaches.map((coach) => (
                                <div
                                  key={coach.coachId._id}
                                  className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                                >
                                  <p className="text-gray-800 font-medium">
                                    {coach.coachId.name}
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    {coach.coachId.email}
                                  </p>
                                  <div className="mt-1 text-xs text-gray-500">
                                    <span className="inline-block mr-3">
                                      <span className="font-medium">Specialization:</span> {coach.coachId.specialization || "N/A"}
                                    </span>
                                    <span className="inline-block">
                                      <span className="font-medium">Experience:</span> {coach.coachId.experience || "N/A"} years
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="px-6 pb-4">
                      <button
                        onClick={() => handleDeactivateUser(user._id)}
                        className="w-full h-10 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        Deactivate User
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;