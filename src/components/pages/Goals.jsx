import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function Goals() {
  const [activeLink, setActiveLink] = useState("target-weight");
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  useEffect(() => {
    // Retrieve goals from localStorage
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  const links = [
    { name: "Target weight", to: "/target-weight" },
    { name: "Steps", to: "/steps" },
    { name: "Sleep", to: "/sleep" },
    { name: "Water", to: "/water" },
    { name: "Calories intake/day", to: "/calories-intake" },
    { name: "Calories burned/day", to: "/calories-burned" },
    { name: "Workouts", to: "/workouts" },
  ];

  const handleDelete = () => {
    // Create a new goals array without the deleted goal
    const updatedGoals = goals.filter((_, i) => i !== goalToDelete);
    setGoals(updatedGoals);
    // Update localStorage
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setShowModal(false); // Close the modal
  };

  return (
    <>
      {/* Links Section under Navbar */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-8">
        <ul className="flex space-x-5 justify-center">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive || activeLink === link.to
                    ? "text-green-500 font-bold"
                    : "text-gray-700 hover:text-green-500"
                }
                onClick={() => setActiveLink(link.to)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between space-x-4 mb-12">
        {/* Goals Section */}
        <div className="w-2/3">
          {goals.length > 0 ? (
            <h1 className="text-3xl font-bold mb-4">Your Goals</h1>
          ) : (
            <h1 className="text-3xl font-bold mb-4">There are no goals</h1>
          )}

          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h2 className="font-bold">Goal {index + 1}</h2>

                {/* Display "You are aiming to" based on selected option */}
                <p className="mt-2 mb-4">
                  You are aiming to{" "}
                  <span className="font-bold text-green-500">
                    {goal.currentWeight > goal.targetWeight ||
                    goal.weightDuration
                      ? "Lose Weight"
                      : "Gain Weight"}
                  </span>
                </p>

                {/* Display current weight */}
                <p>Current Weight: {goal.currentWeight} kg</p>

                {/* Show information based on the selected option */}
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

                {/* Start Date and End Date */}
                <p>Start Date: {goal.startDate}</p>
                <p>End Date: {goal.endDate}</p>

                {/* Buttons placed next to each other */}
                <div className="flex space-x-4 mt-4">
                  <Button className="bg-yellow-300 px-4 py-2 rounded-md">
                    Edit
                  </Button>
                  <Button
                    className="bg-red-300 px-4 py-2 rounded-md"
                    onClick={() => {
                      setShowModal(true);
                      setGoalToDelete(index);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">
              Do you really want to delete this goal? This action cannot be
              undone.
            </p>
            <div className="flex space-x-4">
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                className="bg-gray-500 px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
