import React from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import { Outlet } from "react-router-dom";
export default function DashboardLayout() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Sidebar - always visible, fixed width */}
      <Sidebar />

      {/* Main content wrapper with left margin to avoid overlap */}
      <div className="ml-16 md:ml-64">
        {/* Top Navigation */}
        <TopNav />

        {/* Main content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
