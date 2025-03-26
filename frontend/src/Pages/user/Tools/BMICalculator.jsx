import PropTypes from "prop-types";

const BMICalculator = ({
  weight,
  setWeight,
  height,
  setHeight,
  bmi,
  bmiText,
  calculateBMI,
}) => {
  // Calculate the position of the BMI indicator on the scale
  const getBmiPosition = () => {
    if (!bmi) return "0%";
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return "10%";
    if (bmiValue >= 18.5 && bmiValue <= 24.9) return "40%";
    if (bmiValue >= 25 && bmiValue <= 29.9) return "70%";
    return "90%";
  };

  // Determine the color of the BMI indicator based on the BMI category
  const getBmiColor = () => {
    if (!bmiText) return "bg-gray-400";
    if (bmiText === "Underweight") return "bg-blue-600";
    if (bmiText === "Normal") return "bg-green-600";
    if (bmiText === "Overweight") return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Input Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Calculate Your BMI
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your height and weight to calculate your Body Mass Index
            (BMI), a measure that can help you understand if your weight is
            healthy for your height.
          </p>

          {/* Weight Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight && setWeight(e.target.value)} // Added fallback for undefined setWeight
              className="border border-gray-300 bg-gray-50 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter your weight in kg"
            />
          </div>

          {/* Height Input */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight && setHeight(e.target.value)} // Added fallback for undefined setHeight
              className="border border-gray-300 bg-gray-50 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter your height in cm"
            />
          </div>

          {/* Calculate BMI Button */}
          <button
            onClick={calculateBMI}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition duration-300 shadow-md hover:shadow-lg font-medium"
          >
            Calculate BMI
          </button>
        </div>

        {/* Result Section */}
        <div className="flex flex-col justify-center">
          {bmi ? (
            <>
              {/* BMI Result */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800">
                  Your BMI: {bmi}
                </h3>
                <p className="text-xl font-medium mt-1">
                  Category:{" "}
                  <span
                    className={`font-bold ${
                      bmiText === "Underweight"
                        ? "text-blue-600"
                        : bmiText === "Normal"
                        ? "text-green-600"
                        : bmiText === "Overweight"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {bmiText}
                  </span>
                </p>
              </div>

              {/* BMI Meter */}
              <div className="mb-10">
                <div className="relative h-8 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-400 rounded-lg mb-2">
                  <div
                    className="absolute top-full w-0.5 h-4 bg-black transform -translate-x-1/2"
                    style={{ left: getBmiPosition() }}
                  ></div>
                  <div
                    className="absolute bottom-full w-6 h-6 rounded-full border-4 border-gray-800 transform -translate-x-1/2"
                    style={{
                      left: getBmiPosition(),
                      backgroundColor: getBmiColor().replace("bg-", ""),
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-6">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Below 18.5</span>
                  <span>18.5-24.9</span>
                  <span>25-29.9</span>
                  <span>30+</span>
                </div>
              </div>
            </>
          ) : (
            // Placeholder when no BMI is calculated
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-center">
                Enter your height and weight to see your BMI results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BMICalculator.propTypes = {
  weight: PropTypes.string.isRequired,
  setWeight: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
  setHeight: PropTypes.func.isRequired,
  bmi: PropTypes.string,
  bmiText: PropTypes.string,
  calculateBMI: PropTypes.func.isRequired,
};

export default BMICalculator;
