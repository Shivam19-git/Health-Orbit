/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchConnectedCoaches, fetchCoachDetails } from "../../../APIs/userAPI";

const MyCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCoach, setSelectedCoach] = useState(null); // State to store the selected coach
  const [coachDetails, setCoachDetails] = useState(null); // State to store the selected coach's details
  const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for coach details
  const [activeTab, setActiveTab] = useState('about'); // Track active tab: 'about', 'workouts', or 'diets'

  const fetchCoaches = async () => {
    try {
      setLoading(true);

      // Fetch connected coaches from the backend
      const connectedCoaches = await fetchConnectedCoaches();
      setCoaches(connectedCoaches);
    } catch (err) {
      setError("Failed to fetch connected coaches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewContent = async (coach) => {
    setSelectedCoach(coach); // Set the selected coach
    setDetailsLoading(true); // Start loading coach details
    setActiveTab('about'); // Reset to about tab when changing coaches

    try {
      // Fetch the selected coach's details from the backend
      const details = await fetchCoachDetails(coach.coachId);
      setCoachDetails(details); // Update state with coach details
    } catch (err) {
      setCoachDetails(null);
    } finally {
      setDetailsLoading(false); // Stop loading coach details
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Fitness Coaches</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Coach List */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600">
                  <h2 className="text-xl font-bold text-white">My Coaches</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Select a coach to view their content
                  </p>
                </div>
                
                <div className="divide-y divide-gray-100 max-h-[70vh] overflow-auto">
                  {loading && (
                    <div className="p-8 flex justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500">
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}
                  
                  {!loading && coaches.length === 0 && (
                    <div className="py-12 px-4 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <p className="text-gray-500">No connected coaches found.</p>
                      <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition-colors duration-200">
                        Find a Coach
                      </button>
                    </div>
                  )}
                  
                  {!loading && coaches.length > 0 && coaches.map((coach) => (
                    <div 
                      key={coach.coachId}
                      className={`p-4 hover:bg-blue-50 transition-colors duration-200 cursor-pointer ${
                        selectedCoach && selectedCoach.coachId === coach.coachId ? "bg-blue-50 border-l-4 border-blue-500" : ""
                      }`}
                      onClick={() => handleViewContent(coach)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                            {coach.coachName.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">{coach.coachName}</h3>
                          <p className="text-sm text-gray-500">{coach.specialization || "Fitness Coach"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Area - Coach Details */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[80vh] flex flex-col">
              {detailsLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading coach details...</p>
                  </div>
                </div>
              ) : selectedCoach && coachDetails ? (
                <div className="flex flex-col h-full">
                  {/* Coach Profile Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-2xl">
                        {coachDetails.name.charAt(0)}
                      </div>
                      <div className="md:ml-6 mt-4 md:mt-0">
                        <h2 className="text-2xl font-bold">{coachDetails.name}</h2>
                        <div className="mt-2 flex flex-col sm:flex-row sm:items-center">
                          <span className="bg-blue-700 bg-opacity-40 px-3 py-1 rounded-full text-sm">
                            {coachDetails.specialization || "General Fitness"}
                          </span>
                          <span className="sm:ml-3 mt-2 sm:mt-0 text-blue-100 text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                            </svg>
                            {coachDetails.experience} years experience
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Tabs */}
                  <div className="bg-white border-b border-gray-200 px-4">
                    <div className="flex space-x-8">
                      <button 
                        onClick={() => setActiveTab('about')}
                        className={`py-4 px-1 font-medium text-sm transition-colors duration-200 relative 
                          ${activeTab === 'about' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        About
                        {activeTab === 'about' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
                      </button>
                      <button 
                        onClick={() => setActiveTab('workouts')}
                        className={`py-4 px-1 font-medium text-sm transition-colors duration-200 relative
                          ${activeTab === 'workouts' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Workouts
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {coachDetails.workouts?.length || 0}
                        </span>
                        {activeTab === 'workouts' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
                      </button>
                      <button 
                        onClick={() => setActiveTab('diets')}
                        className={`py-4 px-1 font-medium text-sm transition-colors duration-200 relative
                          ${activeTab === 'diets' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Diet Plans
                        <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {coachDetails.dietPlans?.length || 0}
                        </span>
                        {activeTab === 'diets' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
                      </button>
                    </div>
                  </div>
                  
                  {/* Coach Content - Scrollable Area */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {/* About Tab Content */}
                    {activeTab === 'about' && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">About</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 leading-relaxed">{coachDetails.bio}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Workouts Tab Content */}
                    {activeTab === 'workouts' && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Workouts</h3>
                        {coachDetails.workouts && coachDetails.workouts.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {coachDetails.workouts.map((workout, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="aspect-w-16 aspect-h-9">
                                  <iframe
                                    className="w-full h-56 object-cover"
                                    src={`https://www.youtube.com/embed/${workout.videoId}`}
                                    title={workout.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                                <div className="p-4">
                                  <h4 className="font-medium text-lg text-gray-900">{workout.name}</h4>
                                  <p className="text-gray-600 text-sm mt-1">{workout.description || "No description available"}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <svg className="w-12 h-12 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="mt-4 text-gray-500">No workouts available yet.</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Diet Plans Tab Content */}
                    {activeTab === 'diets' && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Diet Plans</h3>
                        {coachDetails.dietPlans && coachDetails.dietPlans.length > 0 ? (
                          <div className="space-y-6">
                            {coachDetails.dietPlans.map((plan) => (
                              <div key={plan._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                <div className="bg-green-50 p-4 border-b border-gray-200">
                                  <h4 className="font-semibold text-lg text-gray-900">{plan.name}</h4>
                                  <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
                                </div>
                                
                                <div className="p-4">
                                  {plan.meals && plan.meals.length > 0 ? (
                                    <div className="space-y-4">
                                      {plan.meals.map((meal, mealIndex) => (
                                        <div key={mealIndex} className="bg-white rounded-lg border border-gray-100 p-4">
                                          <h5 className="font-medium text-gray-900 flex items-center">
                                            <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm mr-2">
                                              {mealIndex + 1}
                                            </span>
                                            {meal.mealName}
                                          </h5>
                                          
                                          <ul className="mt-3 space-y-2">
                                            {meal.items.map((item, itemIndex) => (
                                              <li key={itemIndex} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                                                <span className="text-gray-800">{item.itemName}</span>
                                                <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-md">
                                                  {item.calories} kcal
                                                </span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500 text-center py-4">No meals available in this plan.</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <svg className="w-12 h-12 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            <p className="mt-4 text-gray-500">No diet plans available yet.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center p-8">
                  <div>
                    <svg className="w-20 h-20 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No Coach Selected</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Select a coach from the list to view their fitness programs, workout videos, diet plans, and more.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCoaches;  