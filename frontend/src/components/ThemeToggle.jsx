import { useTheme } from "../context/ThemeContext.jsx";
import "./ThemeToggle.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      className="theme-toggle t-mono"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isLight ? "◐" : "◑"}
      </span>
      <span className="theme-toggle-label">{isLight ? "Dark" : "Light"}</span>
    </button>
  );
}
