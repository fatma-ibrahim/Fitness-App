import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import dayjs from "dayjs";
import { GoalsData } from "../../../fakeData";

const TargetWeight = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("target-weight");
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [weightDuration, setWeightDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goals, setGoals] = useState(GoalsData);

  useEffect(() => {
    if (location.state) {
      const { goal } = location.state;
      setCurrentWeight(goal.currentWeight || "");
      setTargetWeight(goal.targetWeight || "");
      setWeightDuration(goal.weightDuration || "");
      setStartDate(goal.startDate || "");
      setDuration(goal.duration || "");
      setEndDate(goal.endDate || "");
      setSelectedOption(goal.option || "target-weight");
    }
  }, [location.state]);

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);

    // Calculate end date (e.g., adding duration to start date)
    const end = new Date(date);
    if (duration) {
      if (selectedOption === "target-weight") {
        end.setMonth(end.getMonth() + parseInt(duration));
      } else if (selectedOption === "weight-duration") {
        end.setDate(end.getDate() + parseInt(duration) * 7);
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

    if (
      !currentWeight ||
      !startDate ||
      !duration ||
      (selectedOption === "target-weight" && !targetWeight) ||
      (selectedOption === "weight-duration" && !weightDuration)
    ) {
      alert("Please fill in all required fields before saving.");
      return;
    }

    // Calculate the end date before saving
    calculateEndDate();

    // Add the new goal
    const newGoal = {
      currentWeight: parseFloat(currentWeight),
      targetWeight: parseFloat(targetWeight),
      weightDuration: parseFloat(weightDuration),
      option: selectedOption,
      startDate,
      endDate,
      duration,
    };

    setGoals([...goals, newGoal]);

    // Navigate to Goals page after saving
    navigate("/goals");
  };

  return (
    <>
      <div className="mt-5 dark:text-white">
        <h1 className="font-bold dark:text-white">Lose or Gain Weight</h1>

        <div className="mb-4">
          <Label className="block text-sm font-medium">Current Weight:</Label>
          <Input
            type="number"
            name="currentWeight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="mb-4 flex space-x-4 dark:text-gray-300">
          {/* Target Weight Option */}
          <div
            className={`w-1/2 rounded-lg p-4 shadow-lg ${
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
                className="mr-2 h-4 w-4"
              />
              <Label
                htmlFor="target-weight"
                className="text-sm font-medium text-gray-700 dark:text-gray-900"
              >
                Target Weight in duration
              </Label>
            </div>
            <div className="mt-2">
              <div className="mb-2">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-900">
                  Target Weight:
                </Label>
                <Input
                  type="number"
                  min="0"
                  name="targetWeight"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  disabled={selectedOption !== "target-weight"}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-900">
                  Duration (month):
                </Label>
                <Input
                  type="number"
                  min="0"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  disabled={selectedOption !== "target-weight"}
                />
              </div>
            </div>
          </div>

          {/* Weight Duration Option */}
          <div
            className={`w-1/2 rounded-lg p-4 shadow-lg ${
              selectedOption === "weight-duration"
                ? "bg-gray-100"
                : "bg-gray-200"
            } `}
          >
            <div className="flex items-center">
              <Input
                type="radio"
                id="weight-duration"
                name="option"
                value="weight-duration"
                checked={selectedOption === "weight-duration"}
                onChange={() => setSelectedOption("weight-duration")}
                className="mr-2 h-4 w-4"
              />
              <Label
                htmlFor="weight-duration"
                className="text-sm font-medium text-gray-700 dark:text-gray-900"
              >
                Weight to be lost or gained in the duration
              </Label>
            </div>
            <div className="mt-2">
              <div className="mb-2">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-900">
                  Weight/Duration:
                </Label>
                <Input
                  type="number"
                  min="0"
                  name="weightDuration"
                  value={weightDuration}
                  onChange={(e) => setWeightDuration(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  disabled={selectedOption !== "weight-duration"}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-900">
                  Duration (week):
                </Label>
                <Input
                  type="number"
                  min="0"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  disabled={selectedOption !== "weight-duration"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Start Date and End Date in the same row */}
        <div className="mb-4 flex space-x-4">
          <div className="mb-4 w-1/2">
            <Label className="block text-sm font-medium text-gray-700">
              Start Date:
            </Label>
            <Input
              type="date"
              name="startDate"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:bg-gray-800 dark:text-white"
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
              className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:bg-gray-800 dark:text-white"
              value={endDate}
              readOnly
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mr-2 rounded-md bg-green-500 px-4 py-2 text-white"
          onClick={handleSave}
        >
          Save
        </Button>

        <Button
          type="button"
          className="rounded-md bg-gray-500 px-4 py-2 text-white"
          onClick={() => navigate("/goals")}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default TargetWeight;
