import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "soundsafe-theme";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "light" ? "#f5f2ec" : "#0a0a09");
    }
  }, [theme]);

  const setTheme = (next) => {
    setThemeState(next === "light" ? "light" : "dark");
  };

  const toggleTheme = () => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
