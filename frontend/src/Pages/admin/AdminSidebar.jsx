import PropTypes from "prop-types";

const AdminSidebar = ({ activeSection, setActiveSection, onLogout }) => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 fixed left-0">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveSection("pending-coaches")}
              className={`w-full text-left py-3 px-4 rounded-lg flex items-center transition duration-200 ${
                activeSection === "pending-coaches"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Pending Coaches
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("approved-coaches")}
              className={`w-full text-left py-3 px-4 rounded-lg flex items-center transition duration-200 ${
                activeSection === "approved-coaches"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Approved Coaches
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("users")}
              className={`w-full text-left py-3 px-4 rounded-lg flex items-center transition duration-200 ${
                activeSection === "users"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Users
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        <button
          onClick={onLogout}
          className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

AdminSidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default AdminSidebar;
