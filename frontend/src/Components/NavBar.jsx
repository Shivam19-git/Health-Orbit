import { Link } from 'react-router-dom';
import Logout from './Logout';

const BeforeLoginNavBar = () => {
    return (
        <nav className="bg-white shadow-md p-5 flex justify-between items-center">
            <Link to="/">
                <h1 className="text-2xl font-bold text-black">Health Orbit</h1>
            </Link>

            <div className="space-x-6">
                <Link to="/coach/register" className="bg-blue-500 text-white text-lg py-2 px-4 rounded hover:shadow-2xl transition duration-300">Become a Coach</Link>
                <Link to="/login" className="bg-blue-500 text-white text-lg py-2 px-4 rounded hover:shadow-2xl transition duration-300">Login</Link>
                <Link to="/register" className="bg-blue-500 text-white text-lg py-2 px-4 rounded hover:shadow-lg transition duration-300">Register</Link>
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
                <Link to="/dashboard" className="text-blue-500 font-semibold text-lg hover:text-blue-700 transition duration-300">Dashboard</Link>
                <Link to="/workouts" className="text-blue-500 font-semibold text-lg hover:text-blue-700 transition duration-300">Workouts</Link>
                <Link to="/tutorials" className="text-blue-500 font-semibold text-lg hover:text-blue-700 transition duration-300">Tutorials</Link>
                <Link to="/meal-plans" className="text-blue-500 font-semibold text-lg hover:text-blue-700 transition duration-300">Meal Plans</Link>
                <Link to="/coaches" className="text-blue-500 font-semibold text-lg hover:text-blue-700 transition duration-300">Coaches</Link>
                <Link to="/"><Logout /></Link>
            </div>
        </nav>
    );
}

export { BeforeLoginNavBar, AfterLoginNavBar };
