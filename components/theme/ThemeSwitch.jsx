"use client";

import Sun from "@/components/icons/Sun";
import Moon from "@/components/icons/Moon";
import Computer from "@/components/icons/Computer";
import ThemeSwitchButton from "@/components/theme/ThemeSwitchButton";
import SelectThemeBox from "./SelectThemeBox";
import { useEffect, useState } from "react";

const ThemeSwitch = ({ className }) => {
  const [theme, setTheme] = useState("system");
  const [colorScheme, setColorScheme] = useState("unset");

  const handleClick = (name) => {
    setTheme(name);
  };

  const handleColorSchemeChange = (e) => {
    const newColorScheme = e.target.value;
    setColorScheme(newColorScheme);
    if (colorScheme !== "unset") {
      document.body.classList.remove(colorScheme);
    }
  };

  useEffect(() => {
    if (colorScheme === "unset") return;
    document.body.classList.add(colorScheme);
  }, [colorScheme]);

  // Remove the dark class from the html element (tailwind darkmode) if the user changes the theme to light
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });
  }, []);

  useEffect(() => {
    if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return document.documentElement.removeAttribute("data-theme");
    }

    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <div
      className={`${className} mx-auto mb-2 flex w-fit flex-col items-center justify-center gap-2`}
    >
      <div className="flex w-fit justify-center gap-1">
        <ThemeSwitchButton
          icon={<Sun />}
          isSelected={theme === "light"}
          onClick={() => handleClick("light")}
        />
        <ThemeSwitchButton
          icon={<Moon />}
          isSelected={theme === "dark"}
          onClick={() => handleClick("dark")}
        />
        <ThemeSwitchButton
          icon={<Computer />}
          isSelected={theme === "system"}
          onClick={() => handleClick("system")}
        />
      </div>
      <SelectThemeBox value={colorScheme} onChange={handleColorSchemeChange} />
    </div>
  );
};

export default ThemeSwitch;
