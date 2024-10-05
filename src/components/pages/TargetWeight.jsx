import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import dayjs from "dayjs";

const TargetWeight = () => {
  const [selectedOption, setSelectedOption] = useState("target-weight");
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [weightDuration, setWeightDuration] = useState(""); // لحفظ قيمة Weight/Duration
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);

    // Calculate end date (e.g., adding duration to start date)
    const end = new Date(date);
    if (duration) {
      if (selectedOption === "target-weight") {
        end.setMonth(end.getMonth() + parseInt(duration)); // Add months
      } else if (selectedOption === "weight-duration") {
        end.setDate(end.getDate() + parseInt(duration) * 7); // Add weeks
      }
      setEndDate(end.toISOString().split("T")[0]); // Format to YYYY-MM-DD
    }
  };

  // Function to calculate the end date
  const calculateEndDate = () => {
    if (!startDate || !duration) return;

    let newEndDate;
    if (selectedOption === "target-weight") {
      newEndDate = dayjs(startDate)
        .add(duration, "month")
        .format("DD-MMM-YYYY");
    } else if (selectedOption === "weight-duration") {
      newEndDate = dayjs(startDate).add(duration, "week").format("DD-MMM-YYYY");
    }
    setEndDate(newEndDate);
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Calculate the end date before saving
    calculateEndDate();

    // Retrieve existing goals from localStorage
    const existingGoals = JSON.parse(localStorage.getItem("goals")) || [];

    // Add the new goal
    const newGoal = {
      currentWeight: parseFloat(currentWeight),
      targetWeight: parseFloat(targetWeight),
      weightDuration: parseFloat(weightDuration), // تأكد من تخزين weightDuration بشكل صحيح
      option: selectedOption,
      startDate,
      endDate,
      duration,
    };

    // Update localStorage with the new goal
    const updatedGoals = [...existingGoals, newGoal];
    localStorage.setItem("goals", JSON.stringify(updatedGoals));

    // Navigate to Goals page after saving
    navigate("/goals");
  };

  return (
    <>
      <div className="mt-5">
        <h1 className="font-bold">Lose or Gain Weight</h1>

        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-700">
            Current Weight:
          </Label>
          <Input
            type="number"
            name="currentWeight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="flex space-x-4 mb-4">
          {/* Target Weight Option */}
          <div
            className={`p-4 rounded-lg shadow-lg w-1/2 ${
              selectedOption === "target-weight" ? "bg-gray-100" : "bg-gray-200"
            }`}
          >
            <div className="flex items-center">
              <Input
                type="radio"
                id="target-weight"
                name="option"
                value="target-weight"
                checked={selectedOption === "target-weight"}
                onChange={() => setSelectedOption("target-weight")}
                className="mr-2 w-4 h-4"
              />
              <Label
                htmlFor="target-weight"
                className="text-sm font-medium text-gray-700"
              >
                Target Weight in duration
              </Label>
            </div>
            <div className="mt-2">
              <div className="mb-2">
                <Label className="block text-sm font-medium text-gray-700">
                  Target Weight:
                </Label>
                <Input
                  type="number"
                  min="0"
                  name="targetWeight"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  disabled={selectedOption !== "target-weight"}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Duration (month):
                </Label>
                <Input
                  type="number"
                  min="0"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  disabled={selectedOption !== "target-weight"}
                />
              </div>
            </div>
          </div>

          {/* Weight Duration Option */}
          <div
            className={`p-4 rounded-lg shadow-lg w-1/2 ${
              selectedOption === "weight-duration"
                ? "bg-gray-100"
                : "bg-gray-200"
            }`}
          >
            <div className="flex items-center">
              <Input
                type="radio"
                id="weight-duration"
                name="option"
                value="weight-duration"
                checked={selectedOption === "weight-duration"}
                onChange={() => setSelectedOption("weight-duration")}
                className="mr-2 w-4 h-4"
              />
              <Label
                htmlFor="weight-duration"
                className="text-sm font-medium text-gray-700"
              >
                Weight to be lost or gained in the duration
              </Label>
            </div>
            <div className="mt-2">
              <div className="mb-2">
                <Label className="block text-sm font-medium text-gray-700">
                  Weight/Duration:
                </Label>
                <Input
                  type="number"
                  min="0"
                  name="weightDuration"
                  value={weightDuration} // حفظ قيمة Weight Duration
                  onChange={(e) => setWeightDuration(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  disabled={selectedOption !== "weight-duration"}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Duration (week):
                </Label>
                <Input
                  type="number"
                  min="0"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  disabled={selectedOption !== "weight-duration"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Start Date and End Date in the same row */}
        <div className="flex space-x-4 mb-4">
          <div className="mb-4 w-1/2">
            <Label className="block text-sm font-medium text-gray-700">
              Start Date:
            </Label>
            <Input
              type="date"
              name="startDate"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>

          <div className="mb-4 w-1/2">
            <Label className="block text-sm font-medium text-gray-700">
              End Date:
            </Label>
            <Input
              type="date"
              name="endDate"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={endDate}
              readOnly
            />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default TargetWeight;
