import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-black mb-4">Admin Dashboard</h1>
        <nav className="flex justify-center">
          <Link to="/admin/pending-coaches" className="text-black font-semibold text-lg hover:text-gray-800 transition duration-300">
            View Pending Coaches
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
