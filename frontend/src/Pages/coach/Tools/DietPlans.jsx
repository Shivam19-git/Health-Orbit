import { useState, useEffect } from "react";
import {
  fetchDietPlans,
  addDietPlan,
  updateDietPlan,
  deleteDietPlan,
} from "../../../APIs/dietAPI";
import { FiPlus, FiTrash2, FiEdit3, FiSave, FiX } from "react-icons/fi";

const DietPlans = () => {
  const [activeTab, setActiveTab] = useState("myPlans"); // "addNew" or "myPlans"
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
  const [isLoading, setIsLoading] = useState(true);

  // Fetch diet plans on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDietPlans();
        setDietPlans(data.dietPlans);
      } catch (error) {
        console.error("Error fetching diet plans:", error);
      } finally {
        setIsLoading(false);
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
      setActiveTab("myPlans"); // Switch to My Plans tab after adding
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

  // Delete an item from a new diet plan
  const handleDeleteNewItem = (mealIndex, itemIndex) => {
    const updatedMeals = [...newDietPlan.meals];
    updatedMeals[mealIndex].items.splice(itemIndex, 1);
    setNewDietPlan({ ...newDietPlan, meals: updatedMeals });
  };

  // Delete a diet plan
  const handleDeleteDietPlan = async (dietPlanId) => {
    if (window.confirm("Are you sure you want to delete this diet plan?")) {
      try {
        await deleteDietPlan(dietPlanId);
        const data = await fetchDietPlans();
        setDietPlans(data.dietPlans);
      } catch (error) {
        console.error("Error deleting diet plan:", error);
      }
    }
  };

  // Delete a specific meal
  const handleDeleteMeal = (mealIndex) => {
    const updatedMeals = [...editingDietPlan.meals];
    updatedMeals.splice(mealIndex, 1);
    setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
  };

  // Delete a meal from a new diet plan
  const handleDeleteNewMeal = (mealIndex) => {
    const updatedMeals = [...newDietPlan.meals];
    updatedMeals.splice(mealIndex, 1);
    setNewDietPlan({ ...newDietPlan, meals: updatedMeals });
  };

  // Add a new item to a meal
  const handleAddItem = (mealIndex) => {
    const updatedMeals = [...editingDietPlan.meals];
    updatedMeals[mealIndex].items.push({ itemName: "", calories: 0 });
    setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
  };

  // Add an item to a new diet plan meal
  const handleAddNewItem = (mealIndex) => {
    const updatedMeals = [...newDietPlan.meals];
    updatedMeals[mealIndex].items.push({ itemName: "", calories: 0 });
    setNewDietPlan({ ...newDietPlan, meals: updatedMeals });
  };

  // Add a new meal
  const handleAddMeal = () => {
    const updatedMeals = [...editingDietPlan.meals];
    updatedMeals.push({ mealName: "", items: [{ itemName: "", calories: 0 }] });
    setEditingDietPlan({ ...editingDietPlan, meals: updatedMeals });
  };

  // Add a meal to a new diet plan
  const handleAddNewMeal = () => {
    const updatedMeals = [...newDietPlan.meals];
    updatedMeals.push({ mealName: "", items: [{ itemName: "", calories: 0 }] });
    setNewDietPlan({ ...newDietPlan, meals: updatedMeals });
  };

  return (
    <div className="p-6 bg-white h-auto w-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Diet Plans
        </h2>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "myPlans"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } transition-colors duration-200`}
              onClick={() => setActiveTab("myPlans")}
            >
              My Diet Plans
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "addNew"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } transition-colors duration-200`}
              onClick={() => setActiveTab("addNew")}
            >
              Add New Plan
            </button>
          </div>
        </div>

        {/* Add New Diet Plan Tab - with updated button text */}
        {activeTab === "addNew" && (
          <div className="bg-zinc-50 p-6 rounded-xl shadow-md transition-all duration-300 mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
              Create New Diet Plan
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Weight Loss Diet"
                    value={newDietPlan.name}
                    onChange={(e) =>
                      setNewDietPlan({ ...newDietPlan, name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Brief description of this diet plan..."
                    value={newDietPlan.description}
                    onChange={(e) =>
                      setNewDietPlan({
                        ...newDietPlan,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-[42px]"
                  />
                </div>
              </div>

              {/* Meals Section */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg text-gray-700">Meals</h4>
                  <button
                    onClick={handleAddNewMeal}
                    className="flex items-center gap-1 text-sm text-white bg-green-500 px-3 py-1.5 rounded-lg hover:bg-green-600 transition cursor-pointer"
                  >
                    <FiPlus size={16} />
                    <span>Add Meal</span>
                  </button>
                </div>

                {/* Meals List */}
                <div className="space-y-5">
                  {newDietPlan.meals.map((meal, mealIndex) => (
                    <div
                      key={mealIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                    >
                      {/* Meal Header */}
                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Meal Name (e.g., Breakfast, Lunch)"
                              value={meal.mealName}
                              onChange={(e) => {
                                const updatedMeals = [...newDietPlan.meals];
                                updatedMeals[mealIndex].mealName = e.target.value;
                                setNewDietPlan({
                                  ...newDietPlan,
                                  meals: updatedMeals,
                                });
                              }}
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <button
                            onClick={() => handleDeleteNewMeal(mealIndex)}
                            className="ml-2 text-red-500 hover:text-red-700 transition cursor-pointer"
                            title="Delete Meal"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Meal Items */}
                      <div className="p-4 space-y-3">
                        {meal.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="text"
                              placeholder="Item Name"
                              value={item.itemName}
                              onChange={(e) => {
                                const updatedMeals = [...newDietPlan.meals];
                                updatedMeals[mealIndex].items[
                                  itemIndex
                                ].itemName = e.target.value;
                                setNewDietPlan({
                                  ...newDietPlan,
                                  meals: updatedMeals,
                                });
                              }}
                              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              type="number"
                              placeholder="Calories"
                              value={item.calories}
                              onChange={(e) => {
                                const updatedMeals = [...newDietPlan.meals];
                                updatedMeals[mealIndex].items[
                                  itemIndex
                                ].calories = parseInt(e.target.value, 10);
                                setNewDietPlan({
                                  ...newDietPlan,
                                  meals: updatedMeals,
                                });
                              }}
                              className="w-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() =>
                                handleDeleteNewItem(mealIndex, itemIndex)
                              }
                              className="text-red-500 hover:text-red-700 transition cursor-pointer"
                              title="Delete Item"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => handleAddNewItem(mealIndex)}
                          className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        >
                          <FiPlus size={16} />
                          <span>Add Item</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddDietPlan}
                  disabled={!newDietPlan.name}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium ${
                    !newDietPlan.name
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                  }`}
                >
                  <FiSave size={18} />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* My Diet Plans Tab */}
        {activeTab === "myPlans" && (
          <div className="bg-zinc-50 p-6 rounded-xl shadow-md transition-all duration-300 mb-8">
            {isLoading ? (
              <div className="bg-zinc-50 p-8 rounded-xl shadow-md transition-all duration-300 mb-8">
                <p className="text-gray-600">Loading diet plans...</p>
              </div>
            ) : dietPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {dietPlans.map((plan) => (
                  <div
                    key={plan._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="px-6 py-5 border-b border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800">
                            {plan.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {plan.description || "No description provided"}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingDietPlan(plan)}
                            className="p-2 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <FiEdit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteDietPlan(plan._id)}
                            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4">
                      <h5 className="font-medium text-gray-700 mb-3">Meals</h5>
                      <div className="space-y-4">
                        {plan.meals.map((meal, mealIndex) => (
                          <div
                            key={mealIndex}
                            className="bg-gray-50 p-4 rounded-lg"
                          >
                            <h6 className="font-medium text-gray-800 mb-2">
                              {meal.mealName}
                            </h6>
                            <ul className="space-y-1 pl-5">
                              {meal.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-1"
                                >
                                  <span>{item.itemName}</span>
                                  <span className="font-medium">
                                    {item.calories} kcal
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <p className="text-gray-600 mb-4">
                  You have not created any diet plans yet.
                </p>
                <button
                  onClick={() => setActiveTab("addNew")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Create Your First Diet Plan
                </button>
              </div>
            )}
          </div>
        )}

        {/* Edit Diet Plan Modal */}
        {editingDietPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Edit Diet Plan
                  </h3>
                  <button
                    onClick={() => setEditingDietPlan(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plan Name
                      </label>
                      <input
                        type="text"
                        placeholder="Diet Plan Name"
                        value={editingDietPlan.name}
                        onChange={(e) =>
                          setEditingDietPlan({
                            ...editingDietPlan,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        placeholder="Description"
                        value={editingDietPlan.description}
                        onChange={(e) =>
                          setEditingDietPlan({
                            ...editingDietPlan,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Meals Section */}
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-lg text-gray-700">
                        Meals
                      </h4>
                      <button
                        onClick={handleAddMeal}
                        className="flex items-center gap-1 text-sm text-white bg-green-500 px-3 py-1.5 rounded-lg hover:bg-green-600 transition"
                      >
                        <FiPlus size={16} />
                        <span>Add Meal</span>
                      </button>
                    </div>

                    {/* Meals List */}
                    <div className="space-y-5">
                      {editingDietPlan.meals.map((meal, mealIndex) => (
                        <div
                          key={mealIndex}
                          className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                        >
                          {/* Meal Header */}
                          <div className="bg-gray-50 p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <input
                                  type="text"
                                  placeholder="Meal Name (e.g., Breakfast, Lunch)"
                                  value={meal.mealName}
                                  onChange={(e) => {
                                    const updatedMeals = [
                                      ...editingDietPlan.meals,
                                    ];
                                    updatedMeals[mealIndex].mealName =
                                      e.target.value;
                                    setEditingDietPlan({
                                      ...editingDietPlan,
                                      meals: updatedMeals,
                                    });
                                  }}
                                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <button
                                onClick={() => handleDeleteMeal(mealIndex)}
                                className="ml-2 text-red-500 hover:text-red-700 transition cursor-pointer"
                                title="Delete Meal"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </div>

                          {/* Meal Items */}
                          <div className="p-4 space-y-3">
                            {meal.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center gap-3"
                              >
                                <input
                                  type="text"
                                  placeholder="Item Name"
                                  value={item.itemName}
                                  onChange={(e) => {
                                    const updatedMeals = [
                                      ...editingDietPlan.meals,
                                    ];
                                    updatedMeals[mealIndex].items[
                                      itemIndex
                                    ].itemName = e.target.value;
                                    setEditingDietPlan({
                                      ...editingDietPlan,
                                      meals: updatedMeals,
                                    });
                                  }}
                                  className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                  type="number"
                                  placeholder="Calories"
                                  value={item.calories}
                                  onChange={(e) => {
                                    const updatedMeals = [
                                      ...editingDietPlan.meals,
                                    ];
                                    updatedMeals[mealIndex].items[
                                      itemIndex
                                    ].calories = parseInt(e.target.value, 10);
                                    setEditingDietPlan({
                                      ...editingDietPlan,
                                      meals: updatedMeals,
                                    });
                                  }}
                                  className="w-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                  onClick={() =>
                                    handleDeleteItem(mealIndex, itemIndex)
                                  }
                                  className="text-red-500 hover:text-red-700 transition"
                                  title="Delete Item"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => handleAddItem(mealIndex)}
                              className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
                            >
                              <FiPlus size={16} />
                              <span>Add Item</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setEditingDietPlan(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateDietPlan}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
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
      </div>
    </div>
  );
};

export default DietPlans;