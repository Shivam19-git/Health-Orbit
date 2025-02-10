import React from 'react';
import { AfterLoginNavBar } from '../Components/NavBar';

const UserDashboard = () => {
    return (
        <>
            <div>
                <AfterLoginNavBar />
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
                <h2 className="text-4xl font-extrabold text-white mb-6">User Dashboard</h2>
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome User</h2>
                    <p className="mt-2 text-gray-600">You can view your profile, workout plans, and meal plans here.</p>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;