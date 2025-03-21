import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt,  } from 'react-icons/fa';


export const BeforeLoginNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-gray-800">
                            Health<span className="text-blue-600">Orbit</span>
                        </span>
                    </Link>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            type="button" 
                            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" 
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                                ) : (
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                            to="/coach/register" 
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                        >
                            Become a Coach
                        </Link>
                        <Link 
                            to="/login" 
                            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition duration-300"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition duration-300"
                        >
                            Register
                        </Link>
                    </div>
                </div>
                
                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-2 pb-3">
                            <Link 
                                to="/coach/register" 
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Become a Coach
                            </Link>
                            <Link 
                                to="/login" 
                                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-base font-medium transition duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export const AfterLoginNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedFullName = localStorage.getItem("fullName");
        if (storedFullName) {
            setFullName(storedFullName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("fullName");
        navigate("/login");
    };

    // Function to get initials from full name
    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(part => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    // Function to get first name
    const getFirstName = (name) => {
        if (!name) return "User";
        return name.split(" ")[0];
    };

    return (
        <nav className="bg-white shadow-md py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-800">
                        Health<span className="text-blue-600">Orbit</span>
                    </span>
                </Link>
                
                <div className="hidden md:flex items-center space-x-8">
                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center focus:outline-none"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                                {getInitials(fullName)}
                            </div>
                            <span className="text-gray-700 font-medium">{getFirstName(fullName)}</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                               
                                <hr className="my-1" />
                                <button 
                                    onClick={handleLogout} 
                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    <FaSignOutAlt className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                        <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white px-6 py-4 shadow-inner">
                    <div className="flex flex-col space-y-4">
                        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
                        <Link to="/workouts" className="text-gray-700 hover:text-blue-600 font-medium">Workouts</Link>
                        <Link to="/nutrition" className="text-gray-700 hover:text-blue-600 font-medium">Nutrition</Link>
                        <Link to="/progress" className="text-gray-700 hover:text-blue-600 font-medium">Progress</Link>
                        <hr />
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                                {getInitials(fullName)}
                            </div>
                            <span className="text-gray-700 font-medium">{fullName || "User"}</span>
                        </div>
                        <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">My Profile</Link>
                        <Link to="/settings" className="text-gray-700 hover:text-blue-600 font-medium">Settings</Link>
                        <button 
                            onClick={handleLogout} 
                            className="text-left text-red-600 hover:text-red-800 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

