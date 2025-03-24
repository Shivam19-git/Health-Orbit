/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AfterLoginNavBar } from "../../Components/NavBar";
import Sidebar from "./Tools/Sidebar";
import BMICalculator from "./Tools/BMICalculator";
import DietTool from "./Tools/DietTool";
import WorkoutPrograms from "./Tools/WorkoutPrograms";
import Insights from "./Tools/Insights";
import CoachesList from "./Tools/CoachesList";

const UserDashboard = () => {
  const [fullName, setFullName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiText, setBmiText] = useState("");
  const [dietData, setDietData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
  const [insights, setInsights] = useState(null);

  const categories = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  // Fetch user's full name from localStorage or backend
  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    if (storedFullName) {
      setFullName(storedFullName);
    }

    const storedDietData = JSON.parse(localStorage.getItem("dietData")) || {};
    setDietData(storedDietData);
  }, []);

  // Save diet data to localStorage whenever it changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("dietData", JSON.stringify(dietData));
    }, 500); // Debounce by 500ms

    return () => clearTimeout(timeout);
  }, [dietData]);

  // Calculate BMI
  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
      setBmiText(getBmiCategory(bmiValue));
    }
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  // Calculate insights for the last 7 days
  const calculateInsights = () => {
    const lastWeekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });

    const weeklyData = lastWeekDates.map((date) => ({
      date,
      data: dietData[date] || {},
    }));

    setInsights(weeklyData);
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
            Track your progress, manage your workouts, and stay on top of your fitness journey.
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} calculateInsights={calculateInsights} />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 min-h-[400px]">
            {!selectedOption ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select an option from the sidebar to get started</p>
              </div>
            ) : selectedOption === "bmi" ? (
              <BMICalculator />
            ) : selectedOption === "diet" ? (
              <DietTool
                dietData={dietData}
                setDietData={setDietData}
                currentDate={currentDate}
                categories={categories}
              />
            ) : selectedOption === "workouts" ? (
              <WorkoutPrograms />
            ) : selectedOption === "insights" ? (
              <Insights insights={insights} categories={categories} />
            ) : selectedOption === "coaches" ? (
              <CoachesList />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;