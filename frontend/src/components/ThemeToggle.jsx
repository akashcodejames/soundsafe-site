import { useTheme } from "../context/ThemeContext.jsx";
import "./ThemeToggle.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      className={`theme-toggle btn btn--ghost t-mono ${!isLight ? "is-active" : ""}`}
      onClick={toggleTheme}
      aria-label={
        isLight
          ? "Light theme active. Switch to dark mode"
          : "Dark theme active. Switch to light mode"
      }
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      data-active-theme={theme}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isLight ? "☀" : "◐"}
      </span>
      <span className="theme-toggle-label">{isLight ? "Light" : "Dark"}</span>
    </button>
  );
}
