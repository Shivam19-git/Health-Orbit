import { Link } from 'react-router-dom';
import Logout from './Logout';

const BeforeLoginNavBar = () => {
    return (
        <nav className="bg-white shadow-md p-6 flex justify-between items-center">
            <Link to="/">
                <h1 className="text-2xl font-bold text-gray-800">Health Orbit</h1>
            </Link>
            
            <div className="space-x-8">
                <Link to="/coaches" className="text-blue-500 hover:text-blue-700 text-lg">Coaches</Link>
                <Link to="/login" className="text-blue-500 hover:text-blue-700 text-lg">Login</Link>
                <Link to="/register" className="text-blue-500 hover:text-blue-700 text-lg">Register</Link>
            </div>
        </nav>
    );    
}

const AfterLoginNavBar = () => {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Health Orbit</h1>
            <div className="space-x-8">
                <Link to="/dashboard" className="text-blue-500 hover:text-blue-700 text-lg">Dashboard</Link>
                <Link to="/workouts" className="text-blue-500 hover:text-blue-700 text-lg">Workouts</Link>
                <Link to="/tutorials" className="text-blue-500 hover:text-blue-700 text-lg">Tutorials</Link>
                <Link to="/meal-plans" className="text-blue-500 hover:text-blue-700 text-lg">Meal Plans</Link>
                <Link to="/coaches" className="text-blue-500 hover:text-blue-700 text-lg">Coaches</Link>
                <Link to='/'><Logout/></Link>
            </div>
        </nav>
    );    
}   

export { BeforeLoginNavBar, AfterLoginNavBar };
