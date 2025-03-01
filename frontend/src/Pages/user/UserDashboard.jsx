import React, { useEffect, useState } from 'react';
import { AfterLoginNavBar } from '../../Components/NavBar';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaAppleAlt, FaChartLine, FaCalendarCheck, FaUser, FaRunning } from 'react-icons/fa';

const UserDashboard = () => {
    const [fullName, setFullName] = useState(""); 

    useEffect(() => {
        const storedFullName = localStorage.getItem("fullName");
        if (storedFullName) {
            setFullName(storedFullName); 
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
            <AfterLoginNavBar />
            
            <div className="container mx-auto px-4 py-12">
                {/* Welcome Section */}
                <div className="bg-blue-600 rounded-xl p-8 mb-10 text-white shadow-lg">
                    <h1 className="text-3xl font-bold mb-3">Welcome back, {fullName || "Fitness Enthusiast"}!</h1>
                    <p className="text-blue-100">
                        Track your progress, manage your workouts, and stay on top of your fitness journey.
                    </p>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg mr-4">
                                <FaDumbbell className="text-blue-600 text-xl" />
                            </div>
                            <h2 className="font-semibold text-gray-800">Active Workouts</h2>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">3</p>
                        <p className="text-sm text-gray-500 mt-1">2 completed this week</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-green-100 rounded-lg mr-4">
                                <FaAppleAlt className="text-green-600 text-xl" />
                            </div>
                            <h2 className="font-semibold text-gray-800">Nutrition Plan</h2>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">80%</p>
                        <p className="text-sm text-gray-500 mt-1">Adherence rate</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-purple-100 rounded-lg mr-4">
                                <FaChartLine className="text-purple-600 text-xl" />
                            </div>
                            <h2 className="font-semibold text-gray-800">BMI Status</h2>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">22.5</p>
                        <p className="text-sm text-gray-500 mt-1">Normal range</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                                <FaCalendarCheck className="text-yellow-600 text-xl" />
                            </div>
                            <h2 className="font-semibold text-gray-800">Next Session</h2>
                        </div>
                        <p className="text-xl font-bold text-gray-800">March 3, 9:00 AM</p>
                        <p className="text-sm text-gray-500 mt-1">Upper Body Strength</p>
                    </div>
                </div>
                
                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition duration-150">
                                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                                        <FaRunning className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Completed Cardio Workout</h3>
                                        <p className="text-sm text-gray-500">Yesterday • 30 minutes • 250 calories</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition duration-150">
                                    <div className="p-2 bg-green-100 rounded-lg mr-4">
                                        <FaAppleAlt className="text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Logged Nutrition</h3>
                                        <p className="text-sm text-gray-500">Yesterday • 3 meals • 1,800 calories</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition duration-150">
                                    <div className="p-2 bg-purple-100 rounded-lg mr-4">
                                        <FaDumbbell className="text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">New Workout Plan Added</h3>
                                        <p className="text-sm text-gray-500">2 days ago • By Coach Sarah</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <Link to="/activity-history" className="text-blue-600 font-semibold hover:text-blue-800 transition text-sm">
                                    View all activity →
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                            
                            <div className="space-y-4">
                                <Link to="/workouts/start" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-300">
                                    <FaDumbbell className="text-blue-600 mr-3" />
                                    <span className="font-medium text-gray-800">Start a Workout</span>
                                </Link>
                                
                                <Link to="/meals/log" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition duration-300">
                                    <FaAppleAlt className="text-green-600 mr-3" />
                                    <span className="font-medium text-gray-800">Log Today's Meals</span>
                                </Link>
                                
                                <Link to="/bmi-calculator" className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-300">
                                    <FaChartLine className="text-purple-600 mr-3" />
                                    <span className="font-medium text-gray-800">Check BMI</span>
                                </Link>
                                
                                <Link to="/profile" className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition duration-300">
                                    <FaUser className="text-yellow-600 mr-3" />
                                    <span className="font-medium text-gray-800">Update Profile</span>
                                </Link>
                            </div>
                        </div>
                        
                        {/* Upcoming Plan */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl shadow-md text-white">
                            <h2 className="text-xl font-bold mb-4">Today's Plan</h2>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                                    <span>Morning Run - 30 min</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                                    <span>Protein-rich breakfast</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                                    <span>Evening Strength Training</span>
                                </li>
                            </ul>
                            <button className="mt-6 bg-white text-blue-600 w-full py-2 rounded-lg font-medium hover:bg-blue-50 transition">
                                View Full Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;