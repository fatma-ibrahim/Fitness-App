import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function GoalsPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { goal } = location.state || {};

  return (
    <div className="p-8 dark:text-gray-500">
      <h1 className="mb-6 text-3xl font-bold dark:text-white">Goal Details</h1>

      {goal ? (
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700 dark:text-gray-300">
          <h2 className="mb-4 text-2xl font-semibold dark:text-white">
            Goal Overview
          </h2>
          <p className="mb-2">
            You are aiming to{" "}
            <span className="font-bold text-green-500 dark:text-green-400">
              {goal.currentWeight > goal.targetWeight || goal.weightDuration
                ? "Lose Weight"
                : "Gain Weight"}
            </span>
          </p>
          <p>Current Weight: {goal.currentWeight} kg</p>
          {goal.option === "target-weight" ? (
            <>
              <p>Target Weight: {goal.targetWeight} kg</p>
              <p>Duration: {goal.duration} months</p>
            </>
          ) : (
            <>
              <p>Weight/Duration: {goal.weightDuration} kg</p>
              <p>Duration: {goal.duration} weeks</p>
            </>
          )}
          <p>Start Date: {goal.startDate}</p>
          <p>End Date: {goal.endDate}</p>
        </div>
      ) : (
        <p className="dark:text-gray-300">No goal data available.</p>
      )}

      <Button
        className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-white dark:bg-blue-700"
        onClick={() => navigate("/goals")}
      >
        Back to Goals
      </Button>
    </div>
  );
}
