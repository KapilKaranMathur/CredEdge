import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-black ${darkMode ? "dark" : ""}`}
    >
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-3 sm:mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
