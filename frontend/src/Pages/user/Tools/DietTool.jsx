import PropTypes from "prop-types";
import { useState } from "react";

const DietTool = ({ dietData, setDietData, currentDate, categories }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const addDietItem = (category, item, calories, protein, carbs) => {
    if (!item || !calories) {
      alert("Please enter at least the item name and calories.");
      return;
    }

    setDietData((prevData) => {
      const dateData = prevData[currentDate] || {};
      const categoryData = dateData[category] || [];
      return {
        ...prevData,
        [currentDate]: {
          ...dateData,
          [category]: [...categoryData, { 
            item, 
            calories, 
            protein: protein || 0, 
            carbs: carbs || 0, 
            eaten: false 
          }],
        },
      };
    });
  };

  const removeDietItem = (category, index) => {
    setDietData((prevData) => {
      const dateData = { ...(prevData[currentDate] ?? {}) };
      const categoryData = [...(dateData[category] || [])];
      categoryData.splice(index, 1); // Remove the item at the specified index
      return {
        ...prevData,
        [currentDate]: {
          ...dateData,
          [category]: categoryData,
        },
      };
    });
  };

  const toggleEaten = (category, index) => {
    setDietData((prevData) => {
      const dateData = prevData[currentDate] || {};
      const categoryData = dateData[category] || [];
      categoryData[index].eaten = !categoryData[index].eaten;
      return {
        ...prevData,
        [currentDate]: {
          ...dateData,
          [category]: [...categoryData],
        },
      };
    });
  };

  // Calculate total values per category
  const getCategoryTotal = (category, nutrient) => {
    const items = dietData[currentDate]?.[category] || [];
    return items.reduce((total, item) => total + (parseInt(item[nutrient]) || 0), 0);
  };

  // Calculate total eaten values per category
  const getEatenTotal = (category, nutrient) => {
    const items = dietData[currentDate]?.[category] || [];
    return items
      .filter(item => item.eaten)
      .reduce((total, item) => total + (parseInt(item[nutrient]) || 0), 0);
  };

  // Calculate daily totals
  const getDailyTotal = (nutrient) => {
    return categories.reduce((total, category) => 
      total + getCategoryTotal(category, nutrient), 0);
  };

  const getDailyEatenTotal = (nutrient) => {
    return categories.reduce((total, category) => 
      total + getEatenTotal(category, nutrient), 0);
  };

  // Daily targets (you can make these dynamic or user-configurable)
  const dailyTargets = {
    calories: 2000,
    protein: 120,  // in grams
    carbs: 250     // in grams
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Nutrition Tracker</h2>
        <div className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-700 font-medium">
          {currentDate}
        </div>
      </div>

      {/* Daily Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-500">Calories</div>
            <div className="text-sm font-bold text-gray-800">
              {getDailyEatenTotal('calories')} / {dailyTargets.calories} kcal
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-blue-500 rounded-full" 
              style={{ 
                width: `${Math.min(100, (getDailyEatenTotal('calories') / dailyTargets.calories * 100))}%` 
              }}>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-500">Protein</div>
            <div className="text-sm font-bold text-gray-800">
              {getDailyEatenTotal('protein')} / {dailyTargets.protein} g
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-green-500 rounded-full" 
              style={{ 
                width: `${Math.min(100, (getDailyEatenTotal('protein') / dailyTargets.protein * 100))}%` 
              }}>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-500">Carbs</div>
            <div className="text-sm font-bold text-gray-800">
              {getDailyEatenTotal('carbs')} / {dailyTargets.carbs} g
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-yellow-500 rounded-full" 
              style={{ 
                width: `${Math.min(100, (getDailyEatenTotal('carbs') / dailyTargets.carbs * 100))}%` 
              }}>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeCategory === category 
                ? "text-blue-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {category}
            {activeCategory === category && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Content for Active Category */}
      <div className="mb-6">
        {categories.map((category) => (
          <div 
            key={category} 
            className={activeCategory === category ? "block" : "hidden"}
          >
            {/* Category Summary */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{category}</h3>
                <p className="text-sm text-gray-500">
                  {(dietData[currentDate]?.[category] || []).length} items
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">
                  {getEatenTotal(category, 'calories')} / {getCategoryTotal(category, 'calories')} kcal
                </div>
              </div>
            </div>

            {/* Add New Item Form */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Food item"
                    className="border border-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none"
                    id={`item-${category}`}
                  />
                </div>
                
                <div>
                  <input
                    type="number"
                    placeholder="Calories"
                    className="border border-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none"
                    id={`calories-${category}`}
                  />
                </div>
                
                <div>
                  <input
                    type="number"
                    placeholder="Protein (g)"
                    className="border border-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none"
                    id={`protein-${category}`}
                  />
                </div>
                
                <div>
                  <input
                    type="number"
                    placeholder="Carbs (g)"
                    className="border border-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none"
                    id={`carbs-${category}`}
                  />
                </div>
                
                <div className="col-span-2 md:col-span-5 mt-2">
                  <button
                    onClick={() => {
                      const item = document.getElementById(`item-${category}`).value;
                      const calories = parseInt(document.getElementById(`calories-${category}`).value);
                      const protein = parseInt(document.getElementById(`protein-${category}`).value) || 0;
                      const carbs = parseInt(document.getElementById(`carbs-${category}`).value) || 0;
                      
                      if (item && calories) {
                        addDietItem(category, item, calories, protein, carbs);
                        document.getElementById(`item-${category}`).value = "";
                        document.getElementById(`calories-${category}`).value = "";
                        document.getElementById(`protein-${category}`).value = "";
                        document.getElementById(`carbs-${category}`).value = "";
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors w-full md:w-auto"
                  >
                    Add Food Item
                  </button>
                </div>
              </div>
            </div>

            {/* Items List */}
            {(dietData[currentDate]?.[category] || []).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Food Item</th>
                      <th className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Calories</th>
                      <th className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Protein</th>
                      <th className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Carbs</th>
                      <th className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(dietData[currentDate]?.[category] || []).map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className={`p-3 ${item.eaten ? "line-through text-gray-400" : "text-gray-700"}`}>
                          {item.item}
                        </td>
                        <td className="p-3 text-right text-gray-600">{item.calories} kcal</td>
                        <td className="p-3 text-right text-gray-600">{item.protein} g</td>
                        <td className="p-3 text-right text-gray-600">{item.carbs} g</td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => toggleEaten(category, index)}
                              className={`w-7 h-7 rounded-full inline-flex items-center justify-center ${
                                item.eaten 
                                  ? "bg-green-500 text-white" 
                                  : "border border-gray-300 hover:bg-gray-100"
                              }`}
                              title={item.eaten ? "Mark as not eaten" : "Mark as eaten"}
                            >
                              {item.eaten && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={() => removeDietItem(category, index)}
                              className="w-7 h-7 rounded-full inline-flex items-center justify-center text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200"
                              title="Remove item"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-medium">
                      <td className="p-3 text-sm text-gray-700">Category Total</td>
                      <td className="p-3 text-sm text-gray-700 text-right">{getCategoryTotal(category, 'calories')} kcal</td>
                      <td className="p-3 text-sm text-gray-700 text-right">{getCategoryTotal(category, 'protein')} g</td>
                      <td className="p-3 text-sm text-gray-700 text-right">{getCategoryTotal(category, 'carbs')} g</td>
                      <td className="p-3"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <p className="text-sm">No items added yet for {category}</p>
                <p className="text-xs mt-1">Add your first item using the form above</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mt-6">
        <h3 className="font-medium text-gray-800 mb-4">Nutrition Breakdown by Meal</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-600">Meal</th>
                <th className="text-right py-2 font-medium text-gray-600">Calories</th>
                <th className="text-right py-2 font-medium text-gray-600">Protein</th>
                <th className="text-right py-2 font-medium text-gray-600">Carbs</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category} className="border-b border-gray-200">
                  <td className="py-3 font-medium">{category}</td>
                  <td className="py-3 text-right">
                    <span className="font-medium">{getEatenTotal(category, 'calories')}</span>
                    <span className="text-gray-500 ml-1">/ {getCategoryTotal(category, 'calories')} kcal</span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="font-medium">{getEatenTotal(category, 'protein')}</span>
                    <span className="text-gray-500 ml-1">/ {getCategoryTotal(category, 'protein')} g</span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="font-medium">{getEatenTotal(category, 'carbs')}</span>
                    <span className="text-gray-500 ml-1">/ {getCategoryTotal(category, 'carbs')} g</span>
                  </td>
                </tr>
              ))}
              <tr className="bg-white bg-opacity-50">
                <td className="py-3 font-bold">Daily Total</td>
                <td className="py-3 text-right font-bold">
                  {getDailyEatenTotal('calories')} / {getDailyTotal('calories')} kcal
                </td>
                <td className="py-3 text-right font-bold">
                  {getDailyEatenTotal('protein')} / {getDailyTotal('protein')} g
                </td>
                <td className="py-3 text-right font-bold">
                  {getDailyEatenTotal('carbs')} / {getDailyTotal('carbs')} g
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

DietTool.propTypes = {
  dietData: PropTypes.object.isRequired,
  setDietData: PropTypes.func.isRequired,
  currentDate: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DietTool;