import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BeforeLoginNavBar } from "../../Components/NavBar";

const RegisterPage = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add("overflow-hidden"); // Prevent scrolling
        return () => document.body.classList.remove("overflow-hidden");
    }, []);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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
            await axios.post("http://localhost:6060/api/auth/register", { fullName, email, password });
            console.log("Registration Successful");
            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <>
            {/* Fixed Navbar with Shadow */}
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
                <BeforeLoginNavBar />
            </div>

            {/* Full Page Wrapper */}
            <div className="flex items-center justify-center min-h-screen bg-white pt-16">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200">
                    <h2 className="text-3xl font-bold text-center text-black mb-4">Register</h2>
                    {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="border border-gray-400 bg-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-400 bg-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-400 bg-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
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
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Retype Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border border-gray-400 bg-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-600"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
    

                        <p className="text-gray-700 text-sm text-center">
                            Already Registered? <Link to="/login" className="text-black font-semibold hover:underline">Login here</Link>
                        </p>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 hover:shadow-2xl transition duration-300 cursor-pointer"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
