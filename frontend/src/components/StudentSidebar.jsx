import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/useTheme";

function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/student",
      icon: "🏠",
    },
    {
      label: "Chat",
      path: "/chat",
       icon: "🤖",
    },
    {
      label: "Documents",
      path: "/documents",
       icon: "📚",
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: "🔔",
    },
    {
      label: "Profile",
      path: "/profile",
      icon: "👤",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "⚙️",
    },
  ];

  function getButtonClass(path) {
    const isActive = location.pathname === path;

    return isActive
      ? "w-full rounded-lg bg-slate-800 px-4 py-3 text-left text-sm font-medium text-white"
      : "w-full rounded-lg px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white";
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  }

  return (
    <aside className="fixed hidden h-screen w-64 flex-col bg-slate-900 px-6 py-8 text-white lg:flex">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-semibold">
          CampusGPT
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Academic Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-12 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className={getButtonClass(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto space-y-3">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <span>Appearance</span>

          <span className="text-xs text-slate-400">
            {theme === "light"
              ? "🌙 Dark"
              : "☀️ Light"}
          </span>
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg px-4 py-3 text-left text-sm text-red-400 transition hover:bg-slate-800 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default StudentSidebar;