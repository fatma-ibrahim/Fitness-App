import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Goals() {
  const [activeLink, setActiveLink] = useState("target-weight");

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
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">There are no goals</h1>
        </div>

        <div className="w-1/3 mt-12 mb-12">
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
