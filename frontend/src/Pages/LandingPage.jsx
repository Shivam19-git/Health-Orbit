import { Link } from "react-router-dom";
import { BeforeLoginNavBar } from "../Components/NavBar";
import landingImage from "../assets/landing.jpg";
import coachesImage from "../assets/coaches.jpg";
import personalizedPlanImage from "../assets/plans.jpg";
import habitsImage from "../assets/habits.jpg"; 

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
            <BeforeLoginNavBar />

            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center py-24"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${landingImage})`
                }}
            >
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                            Welcome to <span className="text-blue-400">Health Orbit</span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-200 max-w-2xl leading-relaxed">
                            Your ultimate destination for achieving fitness and wellness goals with expert guidance and personalized training plans.
                        </p>
                        <Link to="/bmi-calculator" className="mt-8 inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 shadow-lg">
                            Calculate Your BMI
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            <div className="h-56 mb-6 overflow-hidden rounded-lg">
                                <img src={coachesImage} alt="Expert Coaches" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Expert Coaches</h3>
                            <p className="text-gray-600 leading-relaxed">Train with certified professionals who customize plans based on your fitness level and goals for maximum results.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            <div className="h-56 mb-6 overflow-hidden rounded-lg">
                                <img src={personalizedPlanImage} alt="Personalized Plans" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Personalized Plans</h3>
                            <p className="text-gray-600 leading-relaxed">Get customized meal and workout plans designed to fit your specific goals, dietary needs, and lifestyle.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            <div className="h-56 mb-6 overflow-hidden rounded-lg">
                                <img src={habitsImage} alt="Sustainable Habits" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Sustainable Habits</h3>
                            <p className="text-gray-600 leading-relaxed">Build long-lasting healthy habits with our supportive community and continuous guidance available 24/7.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Fitness Journey?</h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of members who have achieved their fitness goals with Health Orbit.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/register" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                            Sign Up Now
                        </Link>
                        <Link to="/login" className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold text-white mb-2">Health Orbit</h3>
                            <p className="text-gray-400">Your journey to a healthier life starts here.</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
                                    <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                                    <li><Link to="/coaches" className="hover:text-blue-400 transition">Our Coaches</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Resources</h4>
                                <ul className="space-y-2">
                                    <li><Link to="/bmi-calculator" className="hover:text-blue-400 transition">BMI Calculator</Link></li>
                                    <li><Link to="/blog" className="hover:text-blue-400 transition">Fitness Blog</Link></li>
                                    <li><Link to="/faq" className="hover:text-blue-400 transition">FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Health Orbit. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
