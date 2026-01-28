import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      const isDark = JSON.parse(savedDarkMode);
      setIsDarkMode(isDark);
      applyDarkMode(isDark);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      applyDarkMode(prefersDark);
    }
  }, []);

  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newValue));
      applyDarkMode(newValue);
      return newValue;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
