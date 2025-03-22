import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CoachNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [coachFullName, setCoachFullName] = useState("Coach");

  useEffect(() => {
    // Fetch the coach's full name from localStorage
    const storedCoachFullName = localStorage.getItem("coachFullName");
    if (storedCoachFullName) {
      setCoachFullName(storedCoachFullName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("coachId");
    localStorage.removeItem("coachToken");
    localStorage.removeItem("coachFullName"); // Clear the coach's full name
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-gray-800">
            Health<span className="text-blue-600">Orbit</span>
          </span>
        </Link>

        {/* Coach Profile Dropdown */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                {coachFullName.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">{coachFullName}</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CoachNavbar;