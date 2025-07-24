import React, { useState, useEffect } from "react";
import {
  Users,
  ArrowLeftRight,
  ShoppingCart,
  ChartColumnDecreasing,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function Sidebar() {
  const [userRole, setUserRole] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (user?.roles) {
      setUserRole(user.roles);
    }
  }, [user]);

  const navItemsByRole = {
    admin: [
      { label: "Dashboard", icon: ChartColumnDecreasing, path: "/" },
      { label: "Purchases", icon: ShoppingCart, path: "/purchases" },
      { label: "Transfers", icon: ArrowLeftRight, path: "/transfers" },
      { label: "Assignments", icon: Users, path: "/assignments" },
    ],
    base_commander: [
      { label: "Dashboard", icon: ChartColumnDecreasing, path: "/" },
      { label: "Purchases", icon: ShoppingCart, path: "/purchases" },
      { label: "Transfers", icon: ArrowLeftRight, path: "/transfers" },
      { label: "Assignments", icon: Users, path: "/assignments" },
    ],
    logistics_officer: [
      { label: "Purchases", icon: ShoppingCart, path: "/purchases" },
      { label: "Transfers", icon: ArrowLeftRight, path: "/transfers" },
    ],
  };

  const navItems = navItemsByRole[userRole] || [];

  const navItem = (to, Icon, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center md:gap-3 gap-0 md:px-4 px-3 py-3 rounded-md transition-colors duration-200 text-sm font-medium
        ${
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`
      }
    >
      <Icon size={20} />
      <span className="hidden md:inline ml-2">{label}</span>
    </NavLink>
  );

  return (
    <div className="fixed top-0 left-0 h-full w-16 md:w-64 bg-gray-900 text-white shadow-lg z-50">
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="px-3 md:px-6 py-5 bg-red-600">
          <h1 className="text-lg md:text-xl font-bold hidden md:block">
            Military Asset Mgmt
          </h1>
          <p className="text-sm capitalize hidden md:block">
            {userRole} Dashboard
          </p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 md:px-4 py-6 space-y-2">
          {navItems.map((item, index) => (
            <div key={index}>{navItem(item.path, item.icon, item.label)}</div>
          ))}
        </nav>
      </div>
    </div>
  );
}
