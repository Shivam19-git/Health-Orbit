import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { fetchWorkouts, addWorkout, updateWorkout, deleteWorkout } from "../../../APIs/coachAPI";
import { FiPlus, FiEdit3, FiTrash2, FiX, FiSave } from "react-icons/fi";

const WorkoutPlans = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    description: "",
    videoId: "",
    category: "",
  });
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  // Removed unused filterCategory state
  const [categories, setCategories] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Extract unique categories
    if (workouts.length > 0) {
      const uniqueCategories = [...new Set(workouts.map(w => w.category))].filter(Boolean);
      setCategories(uniqueCategories);
    }
  }, [workouts]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchWorkouts();
      setWorkouts(data.workouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWorkout = async () => {
    if (!newWorkout.name) return;
    
    try {
      await addWorkout(newWorkout);
      setNewWorkout({ name: "", description: "", videoId: "", category: "" });
      fetchData();
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  const handleUpdateWorkout = async () => {
    try {
      await updateWorkout(editingWorkout._id, editingWorkout);
      setEditingWorkout(null);
      fetchData();
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await deleteWorkout(workoutId);
      setShowDeleteConfirm(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const renderYouTubeVideo = (videoId) => {
    if (!videoId) return null;
    
    const opts = {
      height: "200",
      width: "100%",
      playerVars: {
        autoplay: 0,
      },
    };

    return (
      <div className="mt-3 rounded-lg overflow-hidden">
        <YouTube videoId={videoId} opts={opts} className="w-full" />
      </div>
    );
  };

  const filteredWorkouts = activeTab === "all" 
    ? workouts 
    : workouts.filter(w => w.category === activeTab);

  return (
    <div className="p-6 bg-white h-auto w-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Workout Plans</h2>
        
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto pb-1">
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                activeTab === "all"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } transition-colors duration-200`}
              onClick={() => setActiveTab("all")}
            >
              All Workouts
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                  activeTab === category
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                } transition-colors duration-200`}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
            
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                activeTab === "add"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } transition-colors duration-200`}
              onClick={() => setActiveTab("add")}
            >
              <FiPlus className="inline mr-1" size={16} /> Add New Workout
            </button>
          </div>
        </div>
        
        {/* Add New Workout Form */}
        {activeTab === "add" && (
          <div className="bg-zinc-50 p-6 rounded-xl shadow-md transition-all duration-300 mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
              Create New Workout
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Workout Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Full Body HIIT"
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Cardio, Strength, Yoga"
                    value={newWorkout.category}
                    onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of this workout..."
                  value={newWorkout.description}
                  onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-24"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube Video ID
                </label>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="e.g., dQw4w9WgXcQ"
                    value={newWorkout.videoId}
                    onChange={(e) => setNewWorkout({ ...newWorkout, videoId: e.target.value })}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <div className="text-sm text-gray-500 md:w-1/3">
                    <p>Enter the YouTube video ID from the URL:</p>
                    <code className="bg-gray-100 p-1 rounded">youtube.com/watch?v=<span className="text-blue-600">dQw4w9WgXcQ</span></code>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddWorkout}
                  disabled={!newWorkout.name}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium cursor-pointer ${
                    !newWorkout.name
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 transition-colors"
                  }`}
                >
                  <FiSave size={18} />
                  Save Workout
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Workouts List */}
        {activeTab !== "add" && (
          <div className="bg-zinc-50 p-6 rounded-xl shadow-md transition-all duration-300 mb-8">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-600">Loading workouts...</p>
              </div>
            ) : filteredWorkouts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredWorkouts.map((workout) => (
                  <div 
                    key={workout._id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-5 border-b border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800">
                            {workout.name}
                          </h4>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                            {workout.category || "Uncategorized"}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingWorkout(workout)}
                            className="p-2 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <FiEdit3 size={18} />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(workout._id)}
                            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mt-2">
                        {workout.description || "No description provided"}
                      </p>
                    </div>
                    
                    {workout.videoId && (
                      <div className="border-t border-gray-100">
                        {renderYouTubeVideo(workout.videoId)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <p className="text-gray-600 mb-4">
                  No workouts found for this category.
                </p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Add Your First Workout
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Edit Modal */}
        {editingWorkout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Edit Workout
                  </h3>
                  <button
                    onClick={() => setEditingWorkout(null)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Workout Name
                      </label>
                      <input
                        type="text"
                        placeholder="Workout Name"
                        value={editingWorkout.name}
                        onChange={(e) => setEditingWorkout({ ...editingWorkout, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="Category"
                        value={editingWorkout.category}
                        onChange={(e) => setEditingWorkout({ ...editingWorkout, category: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Description"
                      value={editingWorkout.description}
                      onChange={(e) => setEditingWorkout({ ...editingWorkout, description: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-24"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      YouTube Video ID
                    </label>
                    <input
                      type="text"
                      placeholder="YouTube Video ID"
                      value={editingWorkout.videoId}
                      onChange={(e) => setEditingWorkout({ ...editingWorkout, videoId: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setEditingWorkout(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateWorkout}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
                    >
                      <FiSave size={18} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this workout? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteWorkout(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlans;