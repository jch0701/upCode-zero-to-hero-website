
import { Link, useLocation } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Users", path: "/admin/users_admin" },
  { name: "Roadmaps", path: "/admin/roadmaps_admin" },
  { name: "Projects", path: "/admin/projects_admin" },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <div className="w-64 bg-gray-900 h-screen p-5 fixed">

      <h1 className="text-xl font-bold mb-6">Admin</h1>

      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block p-3 rounded-lg transition
                ${pathname === item.path ? "bg-purple-600" : "hover:bg-gray-700"}
              `}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
