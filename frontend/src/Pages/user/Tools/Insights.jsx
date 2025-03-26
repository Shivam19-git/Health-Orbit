/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { fetchDietData } from "../../../APIs/dietAPI";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Insights = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize with the current week
  useEffect(() => {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - day);

    // Calculate end of the week (Saturday)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - day));

    setStartDate(startOfWeek.toISOString().split("T")[0]);
    setEndDate(endOfWeek.toISOString().split("T")[0]);
  }, []);

  // Fetch weekly data when the date range changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchWeeklyData();
    }
  }, [startDate, endDate]);

  const fetchWeeklyData = async () => {
    try {
      setLoading(true);
      setError("");

      // Create an array of dates between start and end date
      const dateRange = getDatesInRange(new Date(startDate), new Date(endDate));
      const weeklyDataPromises = dateRange.map((date) =>
        fetchDietData(date.toISOString().split("T")[0])
      );

      const results = await Promise.all(weeklyDataPromises);

      // Process the data by day
      const processedData = dateRange.map((date, index) => {
        const dayData = results[index];
        const dayName = getDayName(date);
        const dateStr = date.toISOString().split("T")[0];

        const eaten = dayData.filter((item) => item.eaten);
        const notEaten = dayData.filter((item) => !item.eaten);

        return {
          date: dateStr,
          day: dayName,
          totalCalories: dayData.reduce((sum, item) => sum + Number(item.calories), 0),
          eatenCalories: eaten.reduce((sum, item) => sum + Number(item.calories), 0),
          notEatenCalories: notEaten.reduce((sum, item) => sum + Number(item.calories), 0),
          eatenItems: eaten,
          notEatenItems: notEaten,
        };
      });

      setWeeklyData(processedData);
    } catch (err) {
      setError("Failed to fetch weekly diet data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get all dates in range
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Helper to get day name
  const getDayName = (date) => {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
      date.getDay()
    ];
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Diet Insights</h1>

        {/* Date range selector */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold">
                {startDate} to {endDate}
              </h2>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center my-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading diet insights...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {/* Weekly Summary */}
        {!loading && weeklyData.length > 0 && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Weekly Summary</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600">Total Calories</p>
                  <p className="text-2xl font-bold">
                    {weeklyData.reduce((sum, day) => sum + day.totalCalories, 0)}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600">Eaten Calories</p>
                  <p className="text-2xl font-bold">
                    {weeklyData.reduce((sum, day) => sum + day.eatenCalories, 0)}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600">Not Eaten Calories</p>
                  <p className="text-2xl font-bold">
                    {weeklyData.reduce((sum, day) => sum + day.notEatenCalories, 0)}
                  </p>
                </div>
              </div>

              {/* Daily calorie chart */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Calories</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="eatenCalories" name="Eaten" fill="#4ADE80" />
                      <Bar dataKey="notEatenCalories" name="Not Eaten" fill="#FB7185" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Eaten and Not Eaten Items */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Eaten and Not Eaten Items</h2>
              {weeklyData.map((day) => (
                <div key={day.date} className="mb-6">
                  <h3 className="text-lg font-bold text-gray-700 mb-2">
                    {day.day} ({day.date})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-md font-semibold text-green-600 mb-2">Eaten Items</h4>
                      {day.eatenItems.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-600">
                          {day.eatenItems.map((item) => (
                            <li key={item._id}>
                              {item.item} - {item.calories} calories
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No items eaten.</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-red-600 mb-2">Not Eaten Items</h4>
                      {day.notEatenItems.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-600">
                          {day.notEatenItems.map((item) => (
                            <li key={item._id}>
                              {item.item} - {item.calories} calories
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No items not eaten.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && weeklyData.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No diet data found for this week. Add some items in your Diet Tracker!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;