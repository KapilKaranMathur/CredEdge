import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import { LuLogOut } from "react-icons/lu";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleClick = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white dark:bg-[#0A0A0A] border-r border-gray-200/50 dark:border-[#2a2a2a] p-5 sticky top-15.25 z-20 flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-3 mt-2 mb-5">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 dark:text-white font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      <div>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu == item.label
                ? "text-white bg-primary"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1e1e1e]"
            } py-3 px-6 rounded-lg mb-2`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto border-t border-gray-200 dark:border-[#2a2a2a] pt-3">
        <button
          className="w-full flex items-center gap-4 text-[15px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 px-6 rounded-lg cursor-pointer"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <LuLogOut className="text-xl" />
          Logout
        </button>
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#0C0C0C] rounded-2xl shadow-xl p-6 w-80 mx-4 border border-gray-100 dark:border-[#2a2a2a]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#0C0C0C] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded-lg cursor-pointer"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
