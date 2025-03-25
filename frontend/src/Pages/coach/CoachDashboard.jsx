import { useState } from "react";
import CoachNavbar from "../../Components/CoachNavbar";
import Sidebar from "./Tools/Sidebar";
import UpdateCoachDetails from "./Tools/UpdateCoachDetails";
import CoachesList from "../user/Tools/CoachesList";
import ClientRequests from "./Tools/ClientRequests";
import WorkoutPlans from "./Tools/WorkoutPlans"; // Import the WorkoutPlans component
import AcceptedClients from "./Tools/AcceptedClients"; // Import the new component
import DietPlans from "./Tools/DietPlans"; // Import the DietPlans component

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
                <AcceptedClients /> {/* Render accepted clients */}
              </div>
            ) : selectedOption === "diet-plans" ? (
              <DietPlans /> // Render the DietPlans component
            ) : selectedOption === "workout-plans" ? (
              <WorkoutPlans /> // Render the WorkoutPlans component
            ) : selectedOption === "client-requests" ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Client Requests</h2>
                <ClientRequests /> {/* Render pending requests */}
              </div>
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
