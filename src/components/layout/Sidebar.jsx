import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-100 h-screen p-4">
      <div className="mt-5 mb-5 mr-5 ml-5">
        <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
      </div>
      <ul className="space-y-4 mr-5 ml-5">
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-300 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link to="/goals" className="block p-2 hover:bg-gray-300 rounded">
            Goals
          </Link>
        </li>
        <li>
          <Link to="/logging" className="block p-2 hover:bg-gray-300 rounded">
            Logging
          </Link>
        </li>
        <li>
          <Link to="/trainers" className="block p-2 hover:bg-gray-300 rounded">
            Trainers & Users
          </Link>
        </li>
        <li>
          <Link to="/settings" className="block p-2 hover:bg-gray-300 rounded">
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}
