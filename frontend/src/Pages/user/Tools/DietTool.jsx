/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { fetchDietData, addDietData, updateEatenStatus, deleteDietData } from "../../../APIs/dietAPI";

const DietTool = () => {
  const [dietData, setDietData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    // Automatically set today's date in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newDiet, setNewDiet] = useState({
    category: "",
    item: "",
    calories: "",
    proteins: "",
    carbs: "",
  });

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDietData(selectedDate);
      setDietData(data);
    } catch (err) {
      setError("Failed to fetch diet data");
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  const handleEatenToggle = async (id, currentStatus) => {
    try {
      const updatedItem = await updateEatenStatus(id, !currentStatus);
      setDietData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, eaten: updatedItem.eaten } : item
        )
      );
    } catch (err) {
      setError("Failed to update eaten status");
    }
  };

  const handleAddDiet = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!selectedDate || !newDiet.category || !newDiet.item || !newDiet.calories || !newDiet.proteins || !newDiet.carbs) {
      setError("Please fill in all fields before adding diet data.");
      return;
    }

    try {
      const newDietData = { ...newDiet, date: selectedDate };
      console.log("Sending request payload:", newDietData);
      const addedDiet = await addDietData(newDietData);
      setDietData((prevData) => [...prevData, addedDiet.dietData]);
      setNewDiet({ category: "", item: "", calories: "", proteins: "", carbs: "" });
      setError("");
    } catch (err) {
      console.error("Error adding diet data:", err);
      setError("Failed to add diet data. Please try again.");
    }
  };

  const handleDeleteDiet = async (id) => {
    try {
      await deleteDietData(id);
      setDietData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      setError("Failed to delete diet data");
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchData();
    }
  }, [fetchData, selectedDate]);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Diet Tracker</h1>
        
        {/* Date selector */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <label htmlFor="date-selector" className="block text-gray-700 font-medium mb-2">
            Select Date
          </label>
          <input
            id="date-selector"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {loading && (
          <div className="text-center my-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading diet data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {/* Add diet form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Diet Item</h2>
          <form onSubmit={handleAddDiet} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g., Breakfast, Lunch, Snack"
                  value={newDiet.category}
                  onChange={(e) => setNewDiet({ ...newDiet, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Item</label>
                <input
                  type="text"
                  placeholder="e.g., Oatmeal, Chicken Salad"
                  value={newDiet.item}
                  onChange={(e) => setNewDiet({ ...newDiet, item: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Calories</label>
                <input
                  type="number"
                  placeholder="e.g., 300"
                  value={newDiet.calories}
                  onChange={(e) => setNewDiet({ ...newDiet, calories: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Proteins (g)</label>
                <input
                  type="number"
                  placeholder="e.g., 15"
                  value={newDiet.proteins}
                  onChange={(e) => setNewDiet({ ...newDiet, proteins: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Carbs (g)</label>
                <input
                  type="number"
                  placeholder="e.g., 40"
                  value={newDiet.carbs}
                  onChange={(e) => setNewDiet({ ...newDiet, carbs: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Diet Item
              </button>
            </div>
          </form>
        </div>

        {/* Diet items list */}
        {dietData.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Diet Items ({selectedDate})</h2>
            
            {/* Summary section */}
            <div className="mb-6 bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">Daily Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-600">Total Calories</p>
                  <p className="text-xl font-bold">
                    {dietData.reduce((sum, item) => sum + (parseInt(item.calories) || 0), 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Total Proteins</p>
                  <p className="text-xl font-bold">
                    {dietData.reduce((sum, item) => sum + (parseInt(item.proteins) || 0), 0)} g
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Total Carbs</p>
                  <p className="text-xl font-bold">
                    {dietData.reduce((sum, item) => sum + (parseInt(item.carbs) || 0), 0)} g
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dietData.map((item) => (
                <div
                  key={item._id}
                  className={`border rounded-lg p-4 transition-all duration-200 ${
                    item.eaten
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-gray-900">{item.item}</h3>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteDiet(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.eaten}
                          onChange={() => handleEatenToggle(item._id, item.eaten)}
                          className="sr-only"
                        />
                        <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                          item.eaten ? "bg-green-500" : "bg-gray-300"
                        }`}>
                          <div className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${
                            item.eaten ? "transform translate-x-5" : ""
                          }`}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {item.eaten ? "Eaten" : "Not Eaten"}
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-gray-100 p-2 rounded text-center">
                      <p className="text-gray-500">Calories</p>
                      <p className="font-bold">{item.calories}</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded text-center">
                      <p className="text-gray-500">Proteins</p>
                      <p className="font-bold">{item.proteins} g</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded text-center">
                      <p className="text-gray-500">Carbs</p>
                      <p className="font-bold">{item.carbs} g</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !loading && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">No diet items found for this date. Add some above!</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DietTool;