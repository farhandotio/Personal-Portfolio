// File: Admin.jsx
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBoxOpen, 
  FaServicestack, 
  FaProjectDiagram, 
  FaPlus 
} from "react-icons/fa";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt },
  { name: "Users", path: "/admin/users", icon: FaUsers },
  { name: "Orders", path: "/admin/orders", icon: FaBoxOpen },
  { name: "Services", path: "/admin/services", icon: FaServicestack },
  { name: "Create Service", path: "/admin/services/create", icon: FaPlus },
  { name: "Projects", path: "/admin/projects", icon: FaProjectDiagram },
  { name: "Create Project", path: "/admin/projects/create", icon: FaPlus },
];

const Admin = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen pt-25 px-5 sm:px-7 lg:px-10 gap-5">
      {/* Sidebar */}
      <aside className="w-64 bg-bg border-r border-border flex flex-col">
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;

            // Special logic for Dashboard: active if URL is /admin or /admin/dashboard
            const isDashboard =
              link.name === "Dashboard" &&
              (location.pathname === "/admin" || location.pathname === "/admin/dashboard");

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-hoverCardBg transition
                  ${(isActive || isDashboard) ? "bg-primary text-text font-semibold" : "text-mutedText"}`
                }
              >
                <Icon />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 pb-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
