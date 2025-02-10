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
            <div>
                <BeforeLoginNavBar />
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
                        <h6>New User ? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link></h6><br/>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
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