import CoachNavbar from "../../Components/CoachNavbar";


const CoachDashboard = () => {
  return (
    <>
     <CoachNavbar/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Coach Dashboard</h1>
          <p className="text-gray-700">Welcome to your dashboard!</p>
        </div>
      </div>
    </>
  );
};

export default CoachDashboard;
