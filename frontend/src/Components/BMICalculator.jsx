import React, { useState } from "react";
import { Link } from "react-router-dom";

const BMICalculator = () => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [bmiText, setBmiText] = useState("");

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

    return (
        <>
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
               <div>
                <Link to="/" className="text-2xl font-bold text-gray-800">Health Orbit</Link>
               </div> 
                <div className="space-x-8">
                    <Link to="/coaches" className="text-blue-500 hover:text-blue-700 text-lg">Coaches</Link>
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 text-lg">Login</Link>
                    <Link to="/register" className="text-blue-500 hover:text-blue-700 text-lg">Register</Link>
                </div>
            </nav>
            <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">BMI Calculator</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Weight (kg):
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Height (cm):
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                </div>
                <button
                    onClick={calculateBMI}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Calculate BMI
                </button>

                {bmi && (
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-semibold">Your BMI: {bmi}</h3>
                        <h3 className="text-lg font-medium mt-1 text-gray-700">You have  <span className="font-bold text-indigo-600">{bmiText}</span> BMI</h3>
                    </div>
                )}
            </div>
        </>
    );
};

export default BMICalculator;
