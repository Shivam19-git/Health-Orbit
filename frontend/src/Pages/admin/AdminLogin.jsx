import  { useState } from "react";
import { loginAdmin } from "../../APIs/adminAPI";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAdmin(username, password);
            localStorage.setItem("token", response.token);
            navigate("/admin/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-black mb-4">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-400 bg-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 bg-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-900 transition duration-300 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;
