import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { fetchWorkouts, addWorkout, updateWorkout, deleteWorkout } from "../../../APIs/coachAPI";

const WorkoutPlans = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    description: "",
    videoId: "",
    category: "",
  });
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWorkouts();
        setWorkouts(data.workouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddWorkout = async () => {
    try {
      await addWorkout(newWorkout);
      setNewWorkout({ name: "", description: "", videoId: "", category: "" });
      const data = await fetchWorkouts();
      setWorkouts(data.workouts);
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  const handleUpdateWorkout = async () => {
    try {
      await updateWorkout(editingWorkout._id, editingWorkout);
      setEditingWorkout(null);
      const data = await fetchWorkouts();
      setWorkouts(data.workouts);
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await deleteWorkout(workoutId); // Call the API to delete the workout
      const data = await fetchWorkouts(); // Fetch the updated list of workouts
      setWorkouts(data.workouts); // Update the state with the new list
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const renderYouTubeVideo = (videoId) => {
    const opts = {
      height: "200",
      width: "100%",
      playerVars: {
        autoplay: 0,
      },
    };

    return <YouTube videoId={videoId} opts={opts} />;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Workout Plans</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Workout</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Workout Name"
            value={newWorkout.name}
            onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newWorkout.description}
            onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="YouTube Video ID"
            value={newWorkout.videoId}
            onChange={(e) => setNewWorkout({ ...newWorkout, videoId: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newWorkout.category}
            onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddWorkout}
            className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            Add Workout
          </button>
        </div>
      </div>
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <div key={workout._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <h4 className="font-semibold mb-2">{workout.name}</h4>
            <p className="text-sm text-gray-600">{workout.description}</p>
            {renderYouTubeVideo(workout.videoId)}
            <div className="mt-2">
              <button
                onClick={() => setEditingWorkout(workout)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                style={{ cursor: "pointer" }} // Add cursor pointer
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteWorkout(workout._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
                style={{ cursor: "pointer" }} // Add cursor pointer
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No workouts available.</p>
      )}
      {editingWorkout && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Edit Workout</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Workout Name"
              value={editingWorkout.name}
              onChange={(e) => setEditingWorkout({ ...editingWorkout, name: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={editingWorkout.description}
              onChange={(e) => setEditingWorkout({ ...editingWorkout, description: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="YouTube Video ID"
              value={editingWorkout.videoId}
              onChange={(e) => setEditingWorkout({ ...editingWorkout, videoId: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={editingWorkout.category}
              onChange={(e) => setEditingWorkout({ ...editingWorkout, category: e.target.value })}
              className="p-2 border rounded"
            />
            <button
              onClick={handleUpdateWorkout}
              className="bg-green-500 text-white p-2 rounded cursor-pointer"
            >
              Update Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlans;