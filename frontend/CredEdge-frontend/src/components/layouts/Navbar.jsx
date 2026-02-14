import React, { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { ThemeContext } from "../../context/ThemeContext";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-5 bg-white dark:bg-black border-b border-gray-200/50 dark:border-[#2a2a2a] backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black dark:text-white"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-black dark:text-white">
        CredEdge
      </h2>

      <div className="flex-1" />

      <button
        onClick={toggleTheme}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e1e1e] transition-colors cursor-pointer"
        title={darkMode ? "Light Mode" : "Dark Mode"}
      >
        <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
      </button>

      {openSideMenu && (
        <div className="fixed top-15.25 left-0 bg-white dark:bg-black">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
