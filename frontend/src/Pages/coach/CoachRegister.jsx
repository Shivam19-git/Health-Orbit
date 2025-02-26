import React, { useState } from "react";
import { registerCoach } from "../../APIs/coachAPI";
import { BeforeLoginNavBar } from "../../Components/NavBar";
import { Link } from "react-router-dom";

const CoachRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [certificate, setCertificate] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("certificate", certificate);

        try {
            const response = await registerCoach(formData);
            setMessage(response.message); // Display success message
            setError("");
        } catch (error) {
            setError("Registration failed. Please try again.");
            setMessage("");
        }
    };

    return (
        <>
            {/* Fixed Navbar with Shadow */}
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
                <BeforeLoginNavBar />
            </div>

            <div className="flex items-center justify-center min-h-screen bg-white pt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Become a Coach
                    </h1>
                    <p className="text-gray-700 text-sm text-center mb-4">
                        Already a coach? <Link to="/coach/login" className="text-black font-semibold hover:underline">Login</Link>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Upload a valid certificate</p>
                            <input
                                type="file"
                                onChange={(e) => setCertificate(e.target.files[0])}
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white file:cursor-pointer file:border-none file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 hover:shadow-2xl hover:cursor-pointer transition duration-300"
                        >
                            Register
                        </button>
                    </form>
                    {message && <p className="text-green-600 text-center mt-4">{message}</p>}
                    {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                </div>
            </div>
        </>
    );
};

export default CoachRegister;
