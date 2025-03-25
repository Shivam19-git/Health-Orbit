import PropTypes from "prop-types";

const Sidebar = ({ selectedOption, setSelectedOption, calculateInsights }) => {
  return (
    <div className="w-64 bg-white shadow-md rounded-lg h-fit">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-800">Dashboard</h3>
      </div>
      <div className="p-2">
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "bmi" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("bmi")}
        >
          BMI Calculator
        </button>
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "diet" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("diet")}
        >
          Diet Tool
        </button>
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "workouts" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("workouts")}
        >
          Workouts
        </button>
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "insights" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => {
            setSelectedOption("insights");
            calculateInsights();
          }}
        >
          Insights
        </button>
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "coaches" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("coaches")}
        >
          View Coaches
        </button>
        <button
          className={`w-full text-left p-3 rounded-md transition ${
            selectedOption === "my-coaches" ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedOption("my-coaches")}
        >
          My Coaches
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func.isRequired,
  calculateInsights: PropTypes.func.isRequired,
};

export default Sidebar;