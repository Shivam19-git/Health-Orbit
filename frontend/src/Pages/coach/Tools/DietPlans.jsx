import { useState, useEffect } from "react";
import {
  fetchDietPlans,
  addDietPlan,
  updateDietPlan,
  deleteDietPlan,
} from "../../../APIs/dietAPI";

const DietPlans = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [newDietPlan, setNewDietPlan] = useState({
    name: "",
    description: "",
    meals: [
      {
        mealName: "",
        items: [
          {
            itemName: "",
            calories: 0,
          },
        ],
      },
    ],
  });
  const [editingDietPlan, setEditingDietPlan] = useState(null);

  // Fetch diet plans on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDietPlans();
        setDietPlans(data.dietPlans);
      } catch (error) {
        console.error("Error fetching diet plans:", error);
      }
    };

    fetchData();
  }, []);

  // Add a new diet plan
  const handleAddDietPlan = async () => {
    try {
      await addDietPlan(newDietPlan);
      setNewDietPlan({
        name: "",
        description: "",
        meals: [
          {
            mealName: "",
            items: [
              {
                itemName: "",
                calories: 0,
              },
            ],
          },
        ],
      });
      const data = await fetchDietPlans();
      setDietPlans(data.dietPlans);
    } catch (error) {
      console.error("Error adding diet plan:", error);
    }
  };

  // Update an existing diet plan
  const handleUpdateDietPlan = async () => {
    try {
      await updateDietPlan(editingDietPlan._id, editingDietPlan);
      setEditingDietPlan(null);
      const data = await fetchDietPlans();
      setDietPlans(data.dietPlans);
    } catch (error) {
      console.error("Error updating diet plan:", error);
    }
  };

  // Delete a specific item from a meal
  const handleDeleteItem = (mealIndex, itemIndex) => {
    const updatedMeals = [...editingDietPlan.meals];
    updatedMeals[mealIndex].items.splice(itemIndex, 1);
    setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
  };

  // Delete a specific meal
  const handleDeleteMeal = (mealIndex) => {
    const updatedMeals = [...editingDietPlan.meals];
    updatedMeals.splice(mealIndex, 1);
    setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
  };

  // Add a new item to a meal
  const handleAddItem = (mealIndex) => {
    const updatedMeals = [...editingDietPlan.meals];
    updatedMeals[mealIndex].items.push({ itemName: "", calories: 0 });
    setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
  };

  // Add a new meal
  const handleAddMeal = () => {
    const updatedMeals = [...editingDietPlan.meals];
    updatedMeals.push({ mealName: "", items: [{ itemName: "", calories: 0 }] });
    setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Diet Plans</h2>
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Diet Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Diet Plan Name"
            value={newDietPlan.name}
            onChange={(e) =>
              setNewDietPlan({ ...newDietPlan, name: e.target.value })
            }
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={newDietPlan.description}
            onChange={(e) =>
              setNewDietPlan({ ...newDietPlan, description: e.target.value })
            }
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="col-span-2">
            <h4 className="font-semibold mb-2 text-gray-700">Meals</h4>
            {newDietPlan.meals.map((meal, mealIndex) => (
              <div key={mealIndex} className="mb-4 border p-4 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    placeholder="Meal Name"
                    value={meal.mealName}
                    onChange={(e) => {
                      const updatedMeals = [...newDietPlan.meals];
                      updatedMeals[mealIndex].mealName = e.target.value;
                      setNewDietPlan({ ...newDietPlan, meals: updatedMeals });
                    }}
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  />
                  <button
                    onClick={() => handleDeleteMeal(mealIndex)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all cursor-pointer ml-2"
                  >
                    Delete Meal
                  </button>
                </div>
                {meal.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      placeholder="Item Name"
                      value={item.itemName}
                      onChange={(e) => {
                        const updatedMeals = [...newDietPlan.meals];
                        updatedMeals[mealIndex].items[itemIndex].itemName =
                          e.target.value;
                        setNewDietPlan({ ...newDietPlan, meals: updatedMeals });
                      }}
                      className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                    />
                    <input
                      type="number"
                      placeholder="Calories"
                      value={item.calories}
                      onChange={(e) => {
                        const updatedMeals = [...newDietPlan.meals];
                        updatedMeals[mealIndex].items[itemIndex].calories =
                          parseInt(e.target.value, 10);
                        setNewDietPlan({ ...newDietPlan, meals: updatedMeals });
                      }}
                      className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                    />
                    <button
                      onClick={() => handleDeleteItem(mealIndex, itemIndex)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all cursor-pointer"
                    >
                      Delete Item
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddItem(mealIndex)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all cursor-pointer"
                >
                  Add Item
                </button>
              </div>
            ))}
            <button
              onClick={handleAddMeal}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all cursor-pointer"
            >
              Add Meal
            </button>
          </div>
          <button
            onClick={handleAddDietPlan}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all cursor-pointer"
          >
            Add Diet Plan
          </button>
        </div>
      </div>
      {/* Existing Diet Plans */}
      {dietPlans.length > 0 ? (
        dietPlans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <h4 className="font-semibold mb-2 text-gray-800">{plan.name}</h4>
            <p className="text-sm text-gray-600">{plan.description}</p>
            <div>
              <h5 className="font-semibold mt-4 text-gray-700">Meals:</h5>
              {plan.meals.map((meal, mealIndex) => (
                <div key={mealIndex} className="mb-2">
                  <p className="font-semibold text-gray-800">{meal.mealName}</p>
                  <ul className="list-disc pl-5 text-gray-600">
                    {meal.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.itemName} - {item.calories} kcal
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setEditingDietPlan(plan)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteDietPlan(plan._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No diet plans available.</p>
      )}
      {/* Edit Diet Plan */}
      {editingDietPlan && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Edit Diet Plan</h3>
          <input
            type="text"
            placeholder="Diet Plan Name"
            value={editingDietPlan.name}
            onChange={(e) =>
              setEditingDietPlan({ ...editingDietPlan, name: e.target.value })
            }
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <textarea
            placeholder="Description"
            value={editingDietPlan.description}
            onChange={(e) =>
              setEditingDietPlan({ ...editingDietPlan, description: e.target.value })
            }
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="col-span-2">
            <h4 className="font-semibold mb-2 text-gray-700">Meals</h4>
            {editingDietPlan.meals.map((meal, mealIndex) => (
              <div key={mealIndex} className="mb-4 border p-4 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    placeholder="Meal Name"
                    value={meal.mealName}
                    onChange={(e) => {
                      const updatedMeals = [...editingDietPlan.meals];
                      updatedMeals[mealIndex].mealName = e.target.value;
                      setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
                    }}
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  />
                  <button
                    onClick={() => handleDeleteMeal(mealIndex)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all cursor-pointer ml-2"
                  >
                    Delete Meal
                  </button>
                </div>
                {meal.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      placeholder="Item Name"
                      value={item.itemName}
                      onChange={(e) => {
                        const updatedMeals = [...editingDietPlan.meals];
                        updatedMeals[mealIndex].items[itemIndex].itemName =
                          e.target.value;
                        setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
                      }}
                      className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                    />
                    <input
                      type="number"
                      placeholder="Calories"
                      value={item.calories}
                      onChange={(e) => {
                        const updatedMeals = [...editingDietPlan.meals];
                        updatedMeals[mealIndex].items[itemIndex].calories =
                          parseInt(e.target.value, 10);
                        setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
                      }}
                      className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                    />
                    <button
                      onClick={() => handleDeleteItem(mealIndex, itemIndex)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all cursor-pointer"
                    >
                      Delete Item
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddItem(mealIndex)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all cursor-pointer"
                >
                  Add Item
                </button>
              </div>
            ))}
            <button
              onClick={handleAddMeal}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all cursor-pointer"
            >
              Add Meal
            </button>
          </div>
          <button
            onClick={handleUpdateDietPlan}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default DietPlans;