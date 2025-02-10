import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BeforeLoginNavBar } from "../Components/NavBar";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.post("http://localhost:6060/api/auth/register", { email, password, role });
            console.log("Registration Successful");
            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <>
            <div>
                <BeforeLoginNavBar />
            </div>
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
                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-600"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Retype Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-600"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="user">User</option>
                        {/*} <option value="coach">Coach</option> */}
              
                    </select>
                    <h6>Already Registered ? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link></h6><br/>
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
