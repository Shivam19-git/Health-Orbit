import { Link } from 'react-router-dom';
import Logout from './Logout';

const BeforeLoginNavBar = () => {
    return (
        <nav className="bg-white shadow-md p-5 flex justify-between items-center">
            <Link to="/">
                <h1 className="text-2xl font-bold text-black">Health Orbit</h1>
            </Link>

            <div className="space-x-6">
                <Link to="/coach" className="text-black font-semibold text-lg hover:text-gray-800 transition duration-300">Become a Coach</Link>
                <Link to="/login" className="text-black font-semibold text-lg hover:text-gray-800 transition duration-300">Login</Link>
                <Link to="/register" className="text-black font-semibold text-lg hover:text-gray-800 transition duration-300">Register</Link>
            </div>
        </nav>
    );
}

const AfterLoginNavBar = () => {
    return (
        <nav className="bg-white shadow-md p-5 flex justify-between items-center">
            <Link to="/">
                <h1 className="text-2xl font-bold text-black">Health Orbit</h1>
            </Link>
            <div className="space-x-6">
                <Link to="/dashboard" className="text-black font-semibold text-lg hover:text-gray-800 transition duration-300">Dashboard</Link>
                <Link to="/workouts" className="text-black font-semibold text-lg hover:text-gray-800 transition duration-300">Workouts</Link>
                <Link to="/tutorials" className="text-black font-semibold text-lg hover:text-gray-800 transition duration-300">Tutorials</Link>
                <Link to="/meal-plans" className="text-black font-semibold text-lg hover:text-gray-800 transition duration-300">Meal Plans</Link>
                <Link to="/coaches" className="text-black font-semibold text-lg hover:text-gray-800 transition duration-300">Coaches</Link>
                <Link to="/"><Logout /></Link>
            </div>
        </nav>
    );
}

export { BeforeLoginNavBar, AfterLoginNavBar };
