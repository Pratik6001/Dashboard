import { LogOut } from "lucide-react";
import { useUser } from "../context/userContext";

const TopBarUserDropdown = () => {
  const { user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/dashboard-login";
  };
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
        <img
          src="https://ui-avatars.com/api/?name=Admin&background=333&color=fff"
          alt="User"
          className="w-8 h-8 rounded-full border border-white"
        />
        <p>{user?.username}</p>
      </div>
      <div className="absolute right-0 space-y-4 w-80 p-6 bg-white rounded-lg text-black shadow-lg z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all transform -translate-y-2 pointer-events-none group-hover:pointer-events-auto">
        <p className="flex gap-4">Email: {user?.email}</p>
        <span className="flex gap-4">
          Base:
          <p className="text-white max-w-fit rounded-xl px-[.9rem] py-[2px] bg-red-600 text-xs font-semibold">
            {user?.base}
          </p>
        </span>
        <button
          onClick={() => handleLogout()}
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default TopBarUserDropdown;
