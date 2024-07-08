import React, { useEffect, useState } from "react";
import { MODE } from "../../../constant/url";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState( localStorage[MODE] || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      saveToLocalStorage();
    } else {
      document.documentElement.classList.remove("dark");
      saveToLocalStorage();
    }
  }, [theme]);

  const saveToLocalStorage = () => {
    localStorage.setItem(MODE, theme);
  };

  const handelSwitcherTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={handelSwitcherTheme} className=" bg-green-400 text-black">
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
