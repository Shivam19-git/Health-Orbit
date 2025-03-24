/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchDietData, addDietData } from "../../../APIs/dietAPI";

const DietTool = () => {
  const [dietData, setDietData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date

  // Form state for adding new diet data
  const [formData, setFormData] = useState({
    category: "",
    item: "",
    calories: "",
    proteins: "",
    carbs: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchDietData(date);
        setDietData(data);
        setError("");
      } catch (err) {
        setError("Failed to fetch diet data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDietData = {
        date,
        ...formData,
        calories: Number(formData.calories),
        proteins: Number(formData.proteins),
        carbs: Number(formData.carbs),
      };
      await addDietData(newDietData);
      setFormData({ category: "", item: "", calories: "", proteins: "", carbs: "" }); // Reset form
      setError("");
      // Refresh diet data
      const updatedData = await fetchDietData(date);
      setDietData(updatedData);
    } catch (err) {
      setError("Failed to add diet data. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Diet Tool</h2>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        />
      </div>

      {/* Add Diet Data Form */}
      <form onSubmit={handleFormSubmit} className="mb-6">
        <h3 className="text-lg font-bold text-gray-700 mb-2">Add Diet Data</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="e.g., Breakfast"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Item:</label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="e.g., Sandwich"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Calories:</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="e.g., 350"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Proteins:</label>
            <input
              type="number"
              name="proteins"
              value={formData.proteins}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="e.g., 25"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Carbs:</label>
            <input
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="e.g., 40"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Diet Data
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="text-gray-600">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Diet Data Table */}
      {!loading && dietData.length > 0 ? (
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Calories</th>
              <th className="p-3 text-left">Proteins</th>
              <th className="p-3 text-left">Carbs</th>
            </tr>
          </thead>
          <tbody>
            {dietData.map((entry) => (
              <tr key={entry._id} className="border-b">
                <td className="p-3">{entry.category}</td>
                <td className="p-3">{entry.item}</td>
                <td className="p-3">{entry.calories}</td>
                <td className="p-3">{entry.proteins}</td>
                <td className="p-3">{entry.carbs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="text-gray-600">No diet data available for the selected date.</p>
      )}
    </div>
  );
};

export default DietTool;