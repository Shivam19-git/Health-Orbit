import React, { useState } from "react";
import { BeforeLoginNavBar } from "./NavBar";
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
            <BeforeLoginNavBar />

            {/* Hero Section */}
            <div className="bg-blue-600 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">BMI Calculator</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Determine your Body Mass Index (BMI) to get insights about your weight relative to your height.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculate Your BMI</h2>
                                <p className="text-gray-600 mb-6">
                                    Enter your height and weight to calculate your Body Mass Index (BMI),
                                    a measure that can help you understand if your weight is healthy for your height.
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
                                            <h3 className="text-3xl font-bold text-gray-800">Your BMI: {bmi}</h3>
                                            <p className="text-xl font-medium mt-1">
                                                Category: <span className={`font-bold ${
                                                    bmiText === "Underweight" ? "text-blue-600" : 
                                                    bmiText === "Normal" ? "text-green-600" : 
                                                    bmiText === "Overweight" ? "text-yellow-600" : 
                                                    "text-red-600"
                                                }`}>{bmiText}</span>
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
                                                        backgroundColor: getBmiColor().replace('bg-', '')
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 text-center">Enter your height and weight to see your BMI results</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* BMI Information Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">What is BMI?</h3>
                            <p className="text-gray-600 mb-4">
                                Body Mass Index (BMI) is a calculation that uses your height and weight to determine a value that indicates 
                                whether you're underweight, normal weight, overweight, or obese.
                            </p>
                            <p className="text-gray-600">
                                While BMI is a useful screening tool, it's not diagnostic of health or body fatness. 
                                Factors like muscle mass, bone density, and ethnic differences can affect its accuracy.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">BMI Categories</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="w-4 h-4 rounded-full bg-blue-400 mr-2"></span>
                                    <span><strong>Underweight:</strong> Below 18.5 - May indicate nutritional deficiency</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-4 h-4 rounded-full bg-green-400 mr-2"></span>
                                    <span><strong>Normal weight:</strong> 18.5-24.9 - Generally healthy range</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></span>
                                    <span><strong>Overweight:</strong> 25.0-29.9 - Increased health risks</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-4 h-4 rounded-full bg-red-400 mr-2"></span>
                                    <span><strong>Obesity:</strong> 30 and above - Higher risk for various conditions</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Health Recommendations */}
                    {bmi && (
                        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Recommendations</h3>
                            {bmi < 18.5 && (
                                <div>
                                    <p className="text-gray-600 mb-4">
                                        Being underweight may indicate nutritional deficiencies or other health concerns. Consider:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                        <li>Consulting with a healthcare provider to rule out underlying medical conditions</li>
                                        <li>Working with a registered dietitian to develop a balanced meal plan to gain weight healthily</li>
                                        <li>Incorporating strength training to build muscle mass</li>
                                        <li>Adding nutrient-rich foods to your diet</li>
                                    </ul>
                                </div>
                            )}
                            {bmi >= 18.5 && bmi < 25 && (
                                <div>
                                    <p className="text-gray-600 mb-4">
                                        Your BMI indicates you're in a healthy weight range. To maintain your health:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                        <li>Continue with a balanced diet rich in fruits, vegetables, and whole grains</li>
                                        <li>Aim for at least 150 minutes of moderate physical activity per week</li>
                                        <li>Get regular health check-ups</li>
                                        <li>Focus on overall wellness including sleep, stress management, and hydration</li>
                                    </ul>
                                </div>
                            )}
                            {bmi >= 25 && bmi < 30 && (
                                <div>
                                    <p className="text-gray-600 mb-4">
                                        Being overweight may increase your risk for certain health conditions. Consider:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                        <li>Speaking with a healthcare provider about a weight management plan</li>
                                        <li>Making gradual dietary changes to reduce caloric intake</li>
                                        <li>Increasing physical activity to 150-300 minutes per week</li>
                                        <li>Setting realistic weight loss goals (0.5-1 kg per week)</li>
                                    </ul>
                                </div>
                            )}
                            {bmi >= 30 && (
                                <div>
                                    <p className="text-gray-600 mb-4">
                                        Having a BMI in the obese range increases risk for serious health conditions. Consider:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                        <li>Scheduling an appointment with your healthcare provider to discuss your health risks</li>
                                        <li>Working with a dietitian and potentially a weight management specialist</li>
                                        <li>Starting a moderate exercise program with professional guidance</li>
                                        <li>Setting small, achievable goals for sustainable weight loss</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* CTA Section */}
                    <div className="bg-blue-600 rounded-xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Take Action?</h3>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join Health Orbit today for personalized workout plans, nutrition guidance, and expert support.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/register" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                                Sign Up Free
                            </Link>
                            <Link to="/" className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BMICalculator;