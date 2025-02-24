import React, { useState } from "react";
import { loginCoach } from "../../APIs/coachAPI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BeforeLoginNavBar } from "../../Components/NavBar";

const CoachLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginCoach(email, password);
            localStorage.setItem("token", response.token);
            navigate("/coach/dashboard"); 
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
        <>
            <BeforeLoginNavBar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Coach Login
                    </h1>
                    <p className="text-gray-700 text-sm text-center mb-4">
                        New Coach? <Link to="/coach/register" className="text-black font-semibold hover:underline">Register here</Link>
                    </p>

                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                    <form onSubmit={handleLogin} className="space-y-4">
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
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CoachLogin;
