import React from "react";
import useTheme from "../../../hooks/useTheme";

const DarkModeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button onClick={toggleTheme} className="bg-blue-400 text-black">
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;