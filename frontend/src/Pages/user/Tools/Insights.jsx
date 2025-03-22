import PropTypes from "prop-types";

const Insights = ({ insights, categories }) => {
  // Calculate weekly totals and averages
  const calculateWeeklySummary = () => {
    if (!insights || insights.length === 0) return null;
    
    let totalCalories = 0;
    let totalEatenCalories = 0;
    let totalItems = 0;
    let totalEatenItems = 0;
    
    insights.forEach(({ data }) => {
      categories.forEach(category => {
        const items = data[category] || [];
        items.forEach(item => {
          totalItems++;
          totalCalories += parseInt(item.calories) || 0;
          
          if (item.eaten) {
            totalEatenItems++;
            totalEatenCalories += parseInt(item.calories) || 0;
          }
        });
      });
    });
    
    return {
      daysTracked: insights.length,
      avgDailyCalories: Math.round(totalCalories / insights.length) || 0,
      avgDailyEatenCalories: Math.round(totalEatenCalories / insights.length) || 0,
      completionRate: Math.round((totalEatenItems / totalItems) * 100) || 0,
      totalCalories,
      totalEatenCalories
    };
  };

  // Get day totals for a specific date
  const getDayTotals = (date) => {
    const dayData = insights.find(day => day.date === date)?.data || {};
    let totalCalories = 0;
    let totalEatenCalories = 0;
    let totalItems = 0;
    let totalEatenItems = 0;
    
    categories.forEach(category => {
      const items = dayData[category] || [];
      items.forEach(item => {
        totalItems++;
        totalCalories += parseInt(item.calories) || 0;
        
        if (item.eaten) {
          totalEatenItems++;
          totalEatenCalories += parseInt(item.calories) || 0;
        }
      });
    });
    
    return {
      totalCalories,
      totalEatenCalories,
      completionRate: Math.round((totalEatenItems / totalItems) * 100) || 0
    };
  };

  // Format date for better display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get category totals for a specific date and category
  const getCategoryTotals = (date, category) => {
    const items = insights.find(day => day.date === date)?.data[category] || [];
    const totalCalories = items.reduce((sum, item) => sum + (parseInt(item.calories) || 0), 0);
    const eatenCalories = items
      .filter(item => item.eaten)
      .reduce((sum, item) => sum + (parseInt(item.calories) || 0), 0);
    
    return {
      totalItems: items.length,
      eatenItems: items.filter(item => item.eaten).length,
      totalCalories,
      eatenCalories
    };
  };

  const summary = calculateWeeklySummary();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nutrition Insights</h2>
      
      {/* Weekly Summary */}
      {summary && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Summary</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Days Tracked</div>
              <div className="text-2xl font-bold text-blue-600">{summary.daysTracked}</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Avg. Daily Calories</div>
              <div className="text-2xl font-bold text-blue-600">{summary.avgDailyEatenCalories}</div>
              <div className="text-xs text-gray-500">of {summary.avgDailyCalories} planned</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Completion Rate</div>
              <div className="text-2xl font-bold text-blue-600">{summary.completionRate}%</div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                <div 
                  className="h-1.5 bg-blue-500 rounded-full" 
                  style={{ width: `${summary.completionRate}%` }}>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Calories</div>
              <div className="text-2xl font-bold text-blue-600">{summary.totalEatenCalories}</div>
              <div className="text-xs text-gray-500">of {summary.totalCalories} planned</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Daily Breakdown */}
      {insights?.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Breakdown</h3>
          
          {insights.map(({ date, data }) => {
            const dayTotals = getDayTotals(date);
            
            return (
              <div key={date} className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {/* Day Header */}
                <div className="flex justify-between items-center bg-gray-50 p-4 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-800">{formatDate(date)}</h4>
                    <p className="text-sm text-gray-500">
                      {Object.values(data).flat().length} items tracked
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      <span className="text-gray-500">Calories: </span>
                      <span className="text-gray-800">{dayTotals.totalEatenCalories} / {dayTotals.totalCalories}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="text-xs font-medium text-gray-500 mr-2">{dayTotals.completionRate}%</div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full">
                        <div 
                          className="h-1.5 bg-green-500 rounded-full" 
                          style={{ width: `${dayTotals.completionRate}%` }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Categories */}
                <div className="divide-y divide-gray-100">
                  {categories.map((category) => {
                    const categoryTotals = getCategoryTotals(date, category);
                    
                    return (
                      <div key={category} className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium text-gray-700">{category}</h5>
                          <div className="text-sm">
                            <span className="text-gray-800 font-medium">{categoryTotals.eatenCalories}</span>
                            <span className="text-gray-500"> / {categoryTotals.totalCalories} kcal</span>
                          </div>
                        </div>
                        
                        {categoryTotals.totalItems > 0 ? (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <ul className="divide-y divide-gray-200">
                              {(data[category] || []).map((item, index) => (
                                <li key={index} className="py-2 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${item.eaten ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <span className={`${item.eaten ? 'text-gray-800' : 'text-gray-500'}`}>
                                      {item.item}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-sm text-gray-600 mr-3">{item.calories} kcal</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      item.eaten ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {item.eaten ? 'Consumed' : 'Missed'}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No items tracked</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M15 11v3m0 0v3m0-3h3m-3 0h-3"></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No insights available yet</h3>
          <p className="text-gray-500">Start tracking your meals to see weekly insights.</p>
        </div>
      )}
    </div>
  );
};

Insights.propTypes = {
  insights: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      data: PropTypes.object.isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Insights;