import { Bell } from "lucide-react";
import TopBarUserDropdown from "../utils/TopBarUserDropdown";

export default function TopNav() {
  return (
    <div className="flex justify-between items-center shadow-md px-6 py-4 hover:shadow-lg transition-shadow duration-300 sticky top-0 z-50 backdrop-blur-md bg-white/80">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <div className="flex items-center gap-4 relative ml-4">
        <button className="relative text-gray-400 hover:text-red-300">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-green-500 w-2 h-2 rounded-full"></span>
        </button>
        <TopBarUserDropdown />
      </div>
    </div>
  );
}
