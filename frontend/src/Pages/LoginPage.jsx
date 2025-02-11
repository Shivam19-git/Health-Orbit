import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BeforeLoginNavBar } from "../Components/NavBar";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:6060/api/auth/login", { email, password });
            localStorage.setItem("authToken", response.data.token);
            console.log("Login Successful");
            navigate("/dashboard");
        } catch (error) {
            setError("Invalid Credentials");
        }
    };

    return (
        <>
            <BeforeLoginNavBar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fa]">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
                    <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Login</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-gray-600 text-sm">
                            New User? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                        </p>
                        <br />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300 cursor-pointer"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
