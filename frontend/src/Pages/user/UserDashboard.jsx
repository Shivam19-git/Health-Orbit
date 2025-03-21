import { useEffect, useState } from "react";
import { AfterLoginNavBar } from "../../Components/NavBar";

const UserDashboard = () => {
  const [fullName, setFullName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiText, setBmiText] = useState("");

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
      setBmiText(getBmiCategory(bmiValue));
    }
  };

  // Determine BMI category
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  // Get color for BMI category
  const getBmiColor = () => {
    if (!bmi) return "bg-gray-200";
    if (bmi < 18.5) return "bg-blue-400";
    if (bmi < 24.9) return "bg-green-400";
    if (bmi < 29.9) return "bg-yellow-400";
    return "bg-red-400";
  };

  // Get position for BMI marker on scale
  const getBmiPosition = () => {
    if (!bmi) return "0%";
    const min = 10;
    const max = 40;
    let position = ((parseFloat(bmi) - min) / (max - min)) * 100;
    position = Math.max(0, Math.min(100, position)); // Clamp between 0-100
    return `${position}%`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AfterLoginNavBar />

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border-l-4 border-indigo-800">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {fullName || "Fitness Enthusiast"}!
          </h1>
          <p className="text-gray-600 text-lg">
            Track your progress, manage your workouts, and stay on top of your
            fitness journey.
          </p>
        </div>

        {/* Dashboard Content with Sidebar and Main Content Area */}
        <div className="flex gap-6">
          {/* Left Sidebar - Small Square */}
          <div className="w-64 bg-white shadow-md rounded-lg h-fit">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800">Dashboard</h3>
            </div>
            <div className="p-2">
              <button
                className={`w-full text-left p-3 rounded-md transition ${
                  selectedOption === "coach"
                    ? "bg-indigo-100 text-indigo-800"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedOption("coach")}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Get a Coach
                </span>
              </button>
              <button
                className={`w-full text-left p-3 rounded-md transition ${
                  selectedOption === "bmi"
                    ? "bg-indigo-100 text-indigo-800"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedOption("bmi")}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  BMI Calculator
                </span>
              </button>
              {/* Diet Tool Option */}
              <button
                className={`w-full text-left p-3 rounded-md transition ${
                  selectedOption === "diet"
                    ? "bg-indigo-100 text-indigo-800"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedOption("diet")}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                  Diet Tool
                </span>
              </button>
              {/* Workouts Option */}
              <button
                className={`w-full text-left p-3 rounded-md transition ${
                  selectedOption === "workouts"
                    ? "bg-indigo-100 text-indigo-800"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedOption("workouts")}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Workouts
                </span>
              </button>
            </div>
          </div>

          {/* Middle Content Area - Larger Rectangle */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 min-h-[400px]">
            {!selectedOption ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select an option from the sidebar to get started</p>
              </div>
            ) : selectedOption === "coach" ? (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Find Your Perfect Fitness Coach
                </h2>
                <p>
                  Connect with professional coaches who can help you achieve
                  your fitness goals.
                </p>
                {/* Coach finder content would go here */}
              </div>
            ) : selectedOption === "diet" ? (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Personalized Diet Planning
                </h2>
                <p className="mb-4">
                  Create and track your nutrition plan based on your health goals and dietary preferences.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-blue-700">
                    <span className="font-medium">Coming Soon: </span>
                    Meal planning, calorie tracking, and nutrition insights tailored to your fitness journey.
                  </p>
                </div>
              </div>
            ) : selectedOption === "workouts" ? (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Workout Programs
                </h2>
                <p className="mb-4">
                  Browse and follow workout programs designed to help you reach your fitness goals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">Strength Training</h3>
                    <p className="text-sm text-gray-600">Build muscle and increase your overall strength</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">Cardio Workouts</h3>
                    <p className="text-sm text-gray-600">Improve your endurance and heart health</p>
                  </div>
                </div>
              </div>
            ) : selectedOption === "bmi" ? (
              <div>
                <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Calculate Your BMI
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Enter your height and weight to calculate your Body Mass
                        Index (BMI), a measure that can help you understand if
                        your weight is healthy for your height.
                      </p>

                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="border border-gray-300 bg-gray-50 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Enter your weight in kg"
                        />
                      </div>

                      <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="border border-gray-300 bg-gray-50 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Enter your height in cm"
                        />
                      </div>

                      <button
                        onClick={calculateBMI}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition duration-300 shadow-md hover:shadow-lg font-medium"
                      >
                        Calculate BMI
                      </button>
                    </div>

                    <div className="flex flex-col justify-center">
                      {bmi ? (
                        <>
                          <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-800">
                              Your BMI: {bmi}
                            </h3>
                            <p className="text-xl font-medium mt-1">
                              Category:{" "}
                              <span
                                className={`font-bold ${
                                  bmiText === "Underweight"
                                    ? "text-blue-600"
                                    : bmiText === "Normal"
                                    ? "text-green-600"
                                    : bmiText === "Overweight"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              >
                                {bmiText}
                              </span>
                            </p>
                          </div>

                          {/* BMI Meter */}
                          <div className="mb-10">
                            <div className="relative h-8 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-lg mb-2">
                              <div
                                className="absolute top-full w-0.5 h-4 bg-black transform -translate-x-1/2"
                                style={{ left: getBmiPosition() }}
                              ></div>
                              <div
                                className="absolute bottom-full w-6 h-6 rounded-full border-4 border-gray-800 transform -translate-x-1/2"
                                style={{
                                  left: getBmiPosition(),
                                  backgroundColor: getBmiColor().replace(
                                    "bg-",
                                    ""
                                  ),
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mt-6">
                              <span>Underweight</span>
                              <span>Normal</span>
                              <span>Overweight</span>
                              <span>Obese</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Below 18.5</span>
                              <span>18.5-24.9</span>
                              <span>25-29.9</span>
                              <span>30+</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-16 w-16 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-500 text-center">
                            Enter your height and weight to see your BMI results
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;