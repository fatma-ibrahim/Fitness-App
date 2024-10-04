import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function Goals() {
  const [activeLink, setActiveLink] = useState("target-weight");
  const [goals, setGoals] = useState([]);

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

  return (
    <>
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
                <h2 className="font-bold">Goal {index + 1} in Target weight</h2>
                {/* Logic for Lose or Gain Weight */}
                <p className="mt-2 mb-4">
                  You are aiming to{" "}
                  <span className="font-bold text-green-500">
                    {goal.currentWeight > goal.targetWeight
                      ? "Lose Weight"
                      : "Gain Weight"}
                  </span>
                </p>
                <p>Current Weight: {goal.currentWeight} kg</p>
                {/* <p>Target Weight: {goal.targetWeight} kg</p> */}
                {/* Show Target Weight only for the correct option */}
                {goal.option === "target-weight" && (
                  <p>Target Weight: {goal.targetWeight} kg</p>
                )}
                {/* Show Duration in the correct format */}
                <p>
                  Duration: {goal.duration}{" "}
                  {goal.option === "target-weight" ? "months" : "weeks"}
                </p>
                <p>Start Date: {goal.startDate}</p>
                <p>End Date: {goal.endDate}</p> {/* Display End Date here */}
                {/* Buttons placed next to each other */}
                <div className="flex space-x-4 mt-4">
                  <Button className="bg-yellow-300 px-4 py-2 rounded-md">
                    Edit
                  </Button>
                  <Button className="bg-red-300 px-4 py-2 rounded-md">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="w-1/3">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <ul className="space-y-2 ml-4">
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
        </div>
      </div>
    </>
  );
}
