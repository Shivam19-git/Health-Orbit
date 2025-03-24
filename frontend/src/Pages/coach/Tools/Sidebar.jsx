import PropTypes from "prop-types";

const Sidebar = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="w-64 bg-white shadow-md rounded-lg h-fit">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-800">Dashboard</h3>
      </div>
      <div className="p-2">
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "clients" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("clients")}
        >
          Clients
        </button>
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "diet-plans" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("diet-plans")}
        >
          Diet Plans
        </button>
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "workout-plans" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("workout-plans")}
        >
          Workout Plans
        </button>
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "client-requests" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("client-requests")}
        >
          Client Requests
        </button>
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "update-details" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("update-details")}
        >
          Update Details
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func.isRequired,
};

export default Sidebar;