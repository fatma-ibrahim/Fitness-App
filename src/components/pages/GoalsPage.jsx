import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { GoalsData } from "../../../fakeData";
import { FaRegEye } from "react-icons/fa6";
import { FaWeightScale } from "react-icons/fa6";

export default function GoalsPage() {
  const [activeLink, setActiveLink] = useState("target-weight");
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setGoals(GoalsData);
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
    const updatedGoals = goals.filter((_, i) => i !== goalToDelete);
    setGoals(updatedGoals);
    setShowModal(false);
  };

  const handleEdit = (event, goal, index) => {
    event.stopPropagation(); // Prevents movement when pressed
    navigate("/target-weight", { state: { goal, index } });
  };

  return (
    <>
      {/* Links Section under Navbar */}
      <div className="mb-8 rounded-lg bg-gray-100 p-4 shadow-lg dark:bg-gray-800">
        <ul className="flex justify-center space-x-5">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive || activeLink === link.to
                    ? "font-bold text-green-500 dark:text-green-400"
                    : "text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                }
                onClick={() => setActiveLink(link.to)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-12 flex justify-between space-x-4">
        {/* Goals Section */}
        <div className="w-2/3">
          {goals.length > 0 ? (
            <h1 className="mb-10 text-3xl font-bold dark:text-white">
              Your Goals
            </h1>
          ) : (
            <h1 className="mb-10 text-3xl font-bold dark:text-white">
              There are no goals
            </h1>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-700 dark:text-white"
                onClick={() => navigate("/goal-preview", { state: { goal } })}
              >
                <span className="absolute -top-[38px] end-1/2 translate-x-1/2 rounded-full border-4 border-background bg-primary p-3 shadow-sm outline outline-1 outline-border">
                  <FaWeightScale className="text-3xl text-background" />
                </span>

                <h2 className="font-bold dark:text-white">Goal {index + 1}</h2>

                <p className="mb-4 mt-2">
                  You are aiming to{" "}
                  <span className="font-bold text-green-500 dark:text-green-400">
                    {goal.currentWeight > goal.targetWeight ||
                    goal.weightDuration
                      ? "Lose Weight"
                      : "Gain Weight"}
                  </span>
                </p>

                <p className="dark:text-gray-300">
                  Current Weight: {goal.currentWeight} kg
                </p>

                {goal.option === "target-weight" ? (
                  <>
                    <p className="dark:text-gray-300">
                      Target Weight: {goal.targetWeight} kg
                    </p>
                    <p className="dark:text-gray-300">
                      Duration: {goal.duration} months
                    </p>
                  </>
                ) : (
                  <>
                    <p className="dark:text-gray-300">
                      Weight/Duration: {goal.weightDuration} kg
                    </p>
                    <p className="dark:text-gray-300">
                      Duration: {goal.duration} weeks
                    </p>
                  </>
                )}

                <p className="dark:text-gray-300">
                  Start Date: {goal.startDate}
                </p>
                <p className="dark:text-gray-300">End Date: {goal.endDate}</p>

                <div className="mt-4 flex space-x-4">
                  <Button
                    className="rounded-md bg-yellow-300 px-4 py-2 dark:bg-yellow-500"
                    onClick={(event) => handleEdit(event, goal, index)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="rounded-md bg-red-300 px-4 py-2 dark:bg-red-500"
                    onClick={(event) => {
                      event.stopPropagation(); // Prevents movement when pressed
                      setShowModal(true);
                      setGoalToDelete(index);
                    }}
                  >
                    Delete
                  </Button>
                </div>

                <Button
                  className="absolute bottom-1 right-1"
                  variant="gost"
                  size="icon"
                  onClick={() => navigate("/goal-preview", { state: { goal } })}
                >
                  <FaRegEye className="text-lg text-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-white" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:text-gray-300">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold dark:text-gray-600">
              Are you sure?
            </h2>
            <p className="mb-4 dark:text-gray-600">
              Do you really want to delete this goal? This action cannot be
              undone.
            </p>
            <div className="flex space-x-4">
              <Button
                className="rounded-md bg-red-500 px-4 py-2 text-white"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                className="rounded-md bg-gray-500 px-4 py-2"
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
