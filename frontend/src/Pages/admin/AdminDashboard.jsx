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

const AdminDashboard = () => {
  const [coaches, setCoaches] = useState([]); // Pending coaches
  const [approvedCoaches, setApprovedCoaches] = useState([]); // Approved coaches
  const [users, setUsers] = useState([]); // Users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedUser, setExpandedUser] = useState(null); // Track expanded user for dropdown

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
      setLoading(true);
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
      setLoading(false);
    }
  };

  const fetchApprovedCoachesList = async () => {
    try {
      setLoading(true);
      const data = await fetchApprovedCoaches();
      setApprovedCoaches(data); // Set approved coaches
      setError("");
    } catch (err) {
      console.error("Error fetching approved coaches:", err);
      setError("Failed to fetch approved coaches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersList = async () => {
    try {
      setLoading(true);
      const data = await fetchAllUsers();
      setUsers(data); // Set users data
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again.");
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
    return <p className="text-center text-gray-600">Loading...</p>; // Show a loading message
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Pending Coaches Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Pending Coaches
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {coaches.length === 0 ? (
        <p className="text-gray-600 text-center">No pending coaches.</p>
      ) : (
        <ul className="space-y-4">
          {coaches.map((coach) => (
            <li key={coach._id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-800">
                Name: {coach.name}
              </p>
              <p className="text-gray-600">Email: {coach.email}</p>
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

      {/* Approved Coaches Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Approved Coaches
      </h2>
      {approvedCoaches.length === 0 ? (
        <p className="text-gray-600 text-center">No approved coaches found.</p>
      ) : (
        <ul className="space-y-4">
          {approvedCoaches.map((coach) => (
            <li
              key={coach._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800">
                Name: {coach.name}
              </p>
              <p className="text-gray-600">Email: {coach.email}</p>
              <p className="text-gray-600">
                Specialization: {coach.specialization || "N/A"}
              </p>
              <p className="text-gray-600">
                Experience: {coach.experience || "N/A"} years
              </p>
              <p className="text-gray-600">Bio: {coach.bio || "N/A"}</p>
              <button
                onClick={() => handleDeactivateCoach(coach._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Deactivate Coach
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Users Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-600 text-center">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800">
                Name: {user.fullname}
              </p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              <p className="text-gray-600">
                Connected Coaches: {user.connectedCoaches.length}
              </p>
              <button
                onClick={() => toggleDropdown(user._id)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                {expandedUser === user._id ? "Hide Coaches" : "View Coaches"}
              </button>
              {expandedUser === user._id && (
                <ul className="mt-4 space-y-2">
                  {user.connectedCoaches.map((coach) => (
                    <li
                      key={coach.coachId._id}
                      className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300"
                    >
                      <p className="text-gray-800 font-semibold">
                        Name: {coach.coachId.name}
                      </p>
                      <p className="text-gray-600">
                        Email: {coach.coachId.email}
                      </p>
                      <p className="text-gray-600">
                        Specialization: {coach.coachId.specialization || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        Experience: {coach.coachId.experience || "N/A"} years
                      </p>
                      <p className="text-gray-600">
                        Bio: {coach.coachId.bio || "N/A"}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => handleDeactivateUser(user._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Deactivate User
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;