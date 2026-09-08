import { NavLink, useNavigate } from "react-router-dom";

function TeacherSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/teacher/dashboard",
      icon: "🏠",
    },
    {
      label: "Documents",
      path: "/teacher/documents",
      icon: "📚",
    },

    {
  label: "AI Assistant",
  path: "/teacher/chat",
  icon: "🤖",
},
    {
      label: "Notifications",
      path: "/teacher/notifications",
      icon: "🔔",
    },
    {
      label: "Profile",
      path: "/teacher/profile",
      icon: "👤",
    },
    {
      label: "Settings",
      path: "/teacher/settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white dark:border-white/[0.06] dark:bg-[#0d1017]">
      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="flex h-20 items-center border-b border-slate-200 px-6 dark:border-white/[0.06]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white dark:bg-blue-600">
          CG
        </div>

        <div className="ml-3">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
            CampusGPT
          </h1>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Teacher Portal
          </p>
        </div>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Main Menu
        </p>

        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm dark:bg-blue-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <div className="border-t border-slate-200 p-4 dark:border-white/[0.06]">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
        >
          <span className="text-base">🚪</span>

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default TeacherSidebar;