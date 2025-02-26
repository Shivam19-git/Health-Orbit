import React from "react";
import { Link } from "react-router-dom";
import { BeforeLoginNavBar } from "./NavBar";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
            <BeforeLoginNavBar />
            
            {/* Hero Section */}
            <div className="bg-blue-600 py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
                            About <span className="text-blue-200">Health Orbit</span>
                        </h1>
                        <p className="mt-4 text-xl text-blue-50 leading-relaxed">
                            Empowering individuals to achieve their fitness goals through innovation, 
                            expertise, and personalized guidance.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Our Story Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Story</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>
                                Health Orbit began with a simple observation: fitness journeys are deeply personal, 
                                yet traditional solutions offer one-size-fits-all approaches. Founded in 2020 by a team 
                                of fitness experts and technology enthusiasts, we set out to bridge this gap.
                            </p>
                            <p>
                                What started as a small project to connect users with personalized workout plans 
                                quickly evolved into a comprehensive platform that addresses every aspect of health 
                                and wellness. Our journey has been fueled by countless success stories—individuals who 
                                transformed their lives by following programs tailored specifically to their needs.
                            </p>
                            <p>
                                Today, Health Orbit serves thousands of users worldwide, connecting them with certified 
                                coaches, evidence-based workout plans, and a supportive community. But despite our growth, 
                                our mission remains the same: to make personalized fitness accessible to everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mission & Vision Section */}
            <div className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To revolutionize how people approach fitness by providing personalized, 
                                science-backed solutions that integrate seamlessly into everyday life. 
                                We're committed to making expert guidance accessible to everyone, regardless 
                                of their fitness level or background.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To create a world where fitness is approached holistically, sustainably, and 
                                with joy rather than obligation. We envision a future where every individual 
                                has the tools, knowledge, and support to achieve their optimal health and wellness.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Core Values Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-blue-700 mb-3">Personalization</h3>
                            <p className="text-gray-700">
                                We believe effective fitness solutions must be tailored to individual needs, goals, and circumstances.
                            </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-blue-700 mb-3">Expertise</h3>
                            <p className="text-gray-700">
                                All our programs and advice are based on scientific research and delivered by certified professionals.
                            </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-blue-700 mb-3">Accessibility</h3>
                            <p className="text-gray-700">
                                We're committed to making quality fitness guidance available to people of all backgrounds and abilities.
                            </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-blue-700 mb-3">Sustainability</h3>
                            <p className="text-gray-700">
                                We focus on long-term health habits rather than quick fixes that don't last.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Team Section */}
            <div className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Leadership Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { name: "Alex Thompson", role: "CEO & Co-Founder", bio: "Former professional athlete with a passion for making fitness accessible to everyone." },
                            { name: "Sarah Chen", role: "Chief Wellness Officer", bio: "Certified nutritionist and personal trainer with 15+ years of experience in holistic health." },
                            { name: "Marcus Johnson", role: "Head of Coaching", bio: "Sports science specialist focused on developing evidence-based training methodologies." },
                            { name: "Priya Patel", role: "Technology Director", bio: "Tech innovator with expertise in creating intuitive, user-friendly fitness platforms." },
                            { name: "David Rodriguez", role: "Community Manager", bio: "Fitness enthusiast dedicated to fostering a supportive environment for all members." },
                            { name: "Emma Wilson", role: "Research Lead", bio: "Ph.D. in Exercise Physiology driving our commitment to science-backed approaches." }
                        ].map((member, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Join Us Section */}
            <div className="bg-blue-600 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Join the Health Orbit Community</h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Be part of our mission to transform fitness into a personalized, 
                        sustainable journey that fits your unique lifestyle.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/register" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                            Sign Up Now
                        </Link>
                        <Link to="/contact" className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                            Contact Us
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

export default AboutUs;