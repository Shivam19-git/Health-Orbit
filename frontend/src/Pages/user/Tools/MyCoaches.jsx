import { useState, useEffect } from "react";
import { fetchConnectedCoaches, fetchCoachDetails } from "../../../APIs/userAPI";

const MyCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCoach, setSelectedCoach] = useState(null); // State to store the selected coach
  const [coachDetails, setCoachDetails] = useState(null); // State to store the selected coach's details
  const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for coach details

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
    <div className="p-6 bg-gray-100 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Left Sidebar */}
      <div className="col-span-1">
        <h2 className="text-2xl font-bold mb-4">My Coaches</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && coaches.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {coaches.map((coach) => (
              <div key={coach.coachId} className="bg-white rounded-xl shadow-lg">
                <div className="p-4">
                  <h3 className="text-xl font-bold">{coach.coachName}</h3>
                  <p>{coach.coachEmail}</p>
                  <button
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleViewContent(coach)}
                  >
                    View Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No connected coaches found.</p>
        )}
      </div>

      {/* Center Div for Coach Details */}
      <div className="col-span-2 bg-white rounded-xl shadow-lg p-6">
        {detailsLoading ? (
          <p>Loading coach details...</p>
        ) : selectedCoach && coachDetails ? (
          <div>
            <h2 className="text-2xl font-bold">{coachDetails.name}</h2>
            <p>Email: {coachDetails.email}</p>
            <p>Specialization: {coachDetails.specialization}</p>
            <p>Experience: {coachDetails.experience} years</p>
            <p>Bio: {coachDetails.bio}</p>
            <h3 className="text-xl font-bold mt-4">Workouts</h3>
            {coachDetails.workouts.length > 0 ? (
              coachDetails.workouts.map((workout, index) => (
                <div key={index}>
                  <h4>{workout.name}</h4>
                  <iframe
                    src={`https://www.youtube.com/embed/${workout.videoId}`}
                    title={workout.name}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ))
            ) : (
              <p>No workouts available.</p>
            )}
            <h3 className="text-xl font-bold mt-4">Diet Plans</h3>
            {coachDetails.dietPlans.length > 0 ? (
              coachDetails.dietPlans.map((plan, index) => (
                <div key={plan._id} className="mb-4">
                  <h4 className="font-bold">{plan.name}</h4>
                  <p>{plan.description}</p>
                  <h5 className="font-semibold mt-2">Meals:</h5>
                  {plan.meals.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {plan.meals.map((meal, mealIndex) => (
                        <li key={mealIndex}>
                          <strong>{meal.mealName}</strong>
                          <ul className="list-disc pl-5">
                            {meal.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                {item.itemName} - {item.calories} kcal
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No meals available.</p>
                  )}
                </div>
              ))
            ) : (
              <p>No diet plans available.</p>
            )}
          </div>
        ) : (
          <p>Select a coach to view their content.</p>
        )}
      </div>
    </div>
  );
};

export default MyCoaches;