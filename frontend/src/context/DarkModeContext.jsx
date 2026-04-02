import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const applyDarkMode = (isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    if (savedMode !== null) {
      const persisted = JSON.parse(savedMode);
      setIsDarkMode(persisted);
      applyDarkMode(persisted);
      setIsInitialized(true);
      return;
    }

    const systemPrefersDark = mediaQuery.matches;
    setIsDarkMode(systemPrefersDark);
    applyDarkMode(systemPrefersDark);
    setIsInitialized(true);

    const handleSystemChange = (event) => {
      const hasManualPreference = localStorage.getItem("darkMode") !== null;
      if (!hasManualPreference) {
        setIsDarkMode(event.matches);
        applyDarkMode(event.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      applyDarkMode(isDarkMode);
    }
  }, [isDarkMode, isInitialized]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newValue));
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
