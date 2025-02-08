import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }

        try {
            await axios.post("http://localhost:6060/api/auth/register", { email, password, role });
            alert("Registration Successful");
            navigate("/login");
        } catch (error) {
            setError(error.response.data.message || "Registration Failed");
        }
    };

    return (
        <>
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Health Orbit</h1>
                <div className="space-x-8">
                    <Link to="/" className="text-blue-500 hover:text-blue-700 text-lg">Home</Link>
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 text-lg">Login</Link>
                </div>
            </nav>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
                <h2 className="text-4xl font-extrabold text-white mb-6">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleRegister}>
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
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="user">User</option>
                        <option value="coach">Coach</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;