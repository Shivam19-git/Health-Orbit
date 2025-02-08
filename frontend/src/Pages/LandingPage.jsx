import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Health Orbit</h1>
                <div className="space-x-8">
                    <Link to="/coaches" className="text-blue-500 hover:text-blue-700 text-lg">Coaches</Link>
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 text-lg">Login</Link>
                    <Link to="/register" className="text-blue-500 hover:text-blue-700 text-lg">Register</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center mt-10 px-6">
                <h1 className="text-5xl font-bold text-gray-800">Welcome to Health Orbit</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                    Your ultimate destination for achieving fitness and wellness goals with expert guidance and personalized training plans.
                </p>
                <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
                    Get Started
                </button>
            </div>

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <img src="/images/coach.jpg" alt="Expert Coaches" className="w-full h-40 object-cover rounded-md mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800">Expert Coaches</h2>
                    <p className="mt-2 text-gray-600">Train with certified professionals who customize plans based on your fitness level.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <img src="/images/personalized-plan.jpg" alt="Personalized Plans" className="w-full h-40 object-cover rounded-md mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800">Personalized Plans</h2>
                    <p className="mt-2 text-gray-600">Get customized meal and workout plans designed to fit your specific goals.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <img src="/images/support.jpg" alt="24/7 Support" className="w-full h-40 object-cover rounded-md mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800">24/7 Support</h2>
                    <p className="mt-2 text-gray-600">Our team is available round the clock to help you stay motivated and on track.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
