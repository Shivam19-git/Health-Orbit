/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import CoachNavbar from "../../Components/CoachNavbar";
import Sidebar from "./Tools/Sidebar";
import UpdateCoachDetails from "./Tools/UpdateCoachDetails";
import CoachesList from "../user/Tools/CoachesList";
import ClientRequests from "./Tools/ClientRequests";

const CoachDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <CoachNavbar />
      <div className="container mx-auto px-4 sm:px-6 py-8 pt-16">
        <div className="flex gap-6">
          <Sidebar
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 min-h-[400px]">
            {!selectedOption ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select an option from the sidebar to get started</p>
              </div>
            ) : selectedOption === "clients" ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Clients</h2>
                <p className="text-gray-600">
                  Manage your client list and their details here.
                </p>
              </div>
            ) : selectedOption === "diet-plans" ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Diet Plans</h2>
                <p className="text-gray-600">
                  Create and manage diet plans for your clients.
                </p>
              </div>
            ) : selectedOption === "workout-plans" ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Workout Plans</h2>
                <p className="text-gray-600">
                  Create and manage workout programs for your clients.
                </p>
              </div>
            ) : selectedOption === "client-requests" ? (
              <ClientRequests />
            ) : selectedOption === "update-details" ? (
              <UpdateCoachDetails />
            ) : selectedOption === "view-coaches" ? (
              <CoachesList />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
