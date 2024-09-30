import { useState } from "react";

const TargetWeight = () => {
  const [selectedOption, setSelectedOption] = useState("target-weight");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lose or Gain Weight</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Current Weight:
        </label>
        <input
          type="number"
          name="currentWeight"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-1/2">
          <div className="flex items-center">
            <input
              type="radio"
              id="target-weight"
              name="option"
              value="target-weight"
              checked={selectedOption === "target-weight"}
              onChange={() => setSelectedOption("target-weight")}
              className="mr-2"
            />
            <label
              htmlFor="target-weight"
              className="text-sm font-medium text-gray-700"
            >
              Target Weight in duration
            </label>
          </div>
          <div className="mt-2">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Target Weight:
              </label>
              <input
                type="number"
                name="targetWeight"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration:
              </label>
              <input
                type="number"
                name="duration"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-1/2">
          <div className="flex items-center">
            <input
              type="radio"
              id="weight-duration"
              name="option"
              value="weight-duration"
              checked={selectedOption === "weight-duration"}
              onChange={() => setSelectedOption("weight-duration")}
              className="mr-2"
            />
            <label
              htmlFor="weight-duration"
              className="text-sm font-medium text-gray-700"
            >
              Weight to be lost in the duration
            </label>
          </div>
          <div className="mt-2">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Weight/Duration:
              </label>
              <input
                type="number"
                name="duration"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration:
              </label>
              <select
                name="weightDuration"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-md"
      >
        Save
      </button>
    </div>
  );
};

export default TargetWeight;
