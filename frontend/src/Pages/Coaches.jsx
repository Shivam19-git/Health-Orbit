import React from "react";
import { Link } from "react-router-dom";
import { BeforeLoginNavBar, AfterLoginNavBar } from "../Components/NavBar";

// Importing local images
import coach1 from "../assets/images/coach1.jpg";
import coach2 from "../assets/images/coach2.jpg";
import coach3 from "../assets/images/coach3.jpg";
import coach4 from "../assets/images/coach4.jpg";
import coach5 from "../assets/images/coach5.jpg";
import coach6 from "../assets/images/coach6.jpg";

// Coach Data Array
const coaches = [
  { name: "Damodar Patil", specialization: "Strength Training", experience: "7+ years", bio: "Helping clients build muscle and strength.", image: coach1 },
  { name: "Shivam Prajapati", specialization: "Yoga & Wellness", experience: "5+ years", bio: "Passionate about mindfulness and flexibility.", image: coach2 },
  { name: "Rhythm Sansiya", specialization: "Cardio & Endurance", experience: "10+ years", bio: "Helping athletes improve endurance.", image: coach3 },
  { name: "Shivam Chavda", specialization: "Weight Loss & Nutrition", experience: "6+ years", bio: "Expert in creating diet and weight loss plans.", image: coach4 },
  { name: "Harshil Barot", specialization: "CrossFit & HIIT", experience: "8+ years", bio: "Enhancing performance through high-intensity workouts.", image: coach5 },
  { name: "Princy Mistry", specialization: "Pilates & Mobility", experience: "4+ years", bio: "Focused on mobility and core strength improvement.", image: coach6 },
];

const Coaches = ({ isLoggedIn }) => {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Navbar */}
      {isLoggedIn ? <AfterLoginNavBar /> : <BeforeLoginNavBar />}

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-white font-serif">
          Meet Our Coaches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="bg-gray-300 p-6 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-400"
            >
              <img
                src={coach.image}
                alt={coach.name}
                className="w-full h-100 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900">{coach.name}</h3>
              <p className="text-gray-700">{coach.specialization}</p>
              <p className="text-gray-600 text-sm">{coach.experience}</p>
              <p className="text-gray-800 mt-2">{coach.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coaches;
