import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const BeforeLoginNavBar = () => {
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

const AfterLoginNavBar = () => {
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

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link 
                            to="/dashboard" 
                            className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                        >
                            Dashboard
                        </Link>
                        <Link 
                            to="/workouts" 
                            className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                        >
                            Workouts
                        </Link>
                        <Link 
                            to="/tutorials" 
                            className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                        >
                            Tutorials
                        </Link>
                        <Link 
                            to="/meal-plans" 
                            className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                        >
                            Meal Plans
                        </Link>
                        <Link 
                            to="/coaches" 
                            className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                        >
                            Coaches
                        </Link>
                        <div className="border-l border-gray-300 pl-6">
                            <Link to="/">
                                <div className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition duration-300">
                                    <Logout />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-2 pb-3">
                            <Link 
                                to="/dashboard" 
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/workouts" 
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Workouts
                            </Link>
                            <Link 
                                to="/tutorials" 
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Tutorials
                            </Link>
                            <Link 
                                to="/meal-plans" 
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Meal Plans
                            </Link>
                            <Link 
                                to="/coaches" 
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Coaches
                            </Link>
                            <div className="border-t border-gray-200 pt-3 mt-3">
                                <Link to="/" onClick={() => setIsOpen(false)}>
                                    <div className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition duration-300">
                                        <Logout />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export { BeforeLoginNavBar, AfterLoginNavBar };
