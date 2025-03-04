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
        <div>
            <AfterLoginNavBar />
            
            <div>
                <div>
                    <h1>Welcome back, {fullName || "Fitness Enthusiast"}!</h1>
                    <p>Track your progress, manage your workouts, and stay on top of your fitness journey.</p>
                </div>
                
                <div>
                    <div>
                        <div>
                            <FaDumbbell />
                            <h2>Active Workouts</h2>
                        </div>
                        <p>3</p>
                        <p>2 completed this week</p>
                    </div>
                    
                    <div>
                        <div>
                            <FaAppleAlt />
                            <h2>Nutrition Plan</h2>
                        </div>
                        <p>80%</p>
                        <p>Adherence rate</p>
                    </div>
                    
                    <div>
                        <div>
                            <FaChartLine />
                            <h2>BMI Status</h2>
                        </div>
                        <p>22.5</p>
                        <p>Normal range</p>
                    </div>
                    
                    <div>
                        <div>
                            <FaCalendarCheck />
                            <h2>Next Session</h2>
                        </div>
                        <p>March 3, 9:00 AM</p>
                        <p>Upper Body Strength</p>
                    </div>
                </div>
                
                <div>
                    <div>
                        <h2>Recent Activity</h2>
                        <div>
                            <div>
                                <FaRunning />
                                <div>
                                    <h3>Completed Cardio Workout</h3>
                                    <p>Yesterday • 30 minutes • 250 calories</p>
                                </div>
                            </div>
                            
                            <div>
                                <FaAppleAlt />
                                <div>
                                    <h3>Logged Nutrition</h3>
                                    <p>Yesterday • 3 meals • 1,800 calories</p>
                                </div>
                            </div>
                            
                            <div>
                                <FaDumbbell />
                                <div>
                                    <h3>New Workout Plan Added</h3>
                                    <p>2 days ago • By Coach Sarah</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link to="/activity-history">View all activity →</Link>
                        </div>
                    </div>
                    
                    <div>
                        <h2>Quick Actions</h2>
                        <div>
                            <Link to="/workouts/start">
                                <FaDumbbell />
                                <span>Start a Workout</span>
                            </Link>
                            
                            <Link to="/meals/log">
                                <FaAppleAlt />
                                <span>Log Today's Meals</span>
                            </Link>
                            
                            <Link to="/bmi-calculator">
                                <FaChartLine />
                                <span>Check BMI</span>
                            </Link>
                            
                            <Link to="/profile">
                                <FaUser />
                                <span>Update Profile</span>
                            </Link>
                        </div>
                    </div>
                    
                    <div>
                        <h2>Today's Plan</h2>
                        <ul>
                            <li>Morning Run - 30 min</li>
                            <li>Protein-rich breakfast</li>
                            <li>Evening Strength Training</li>
                        </ul>
                        <button>View Full Schedule</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

