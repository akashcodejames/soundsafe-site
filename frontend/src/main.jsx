import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SiteProvider } from "./context/SiteContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";
import "./surfaces.css";
import "./pageChrome.css";
import "./components/ui/metrics.css";
import "./effects.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}
    >
      <ThemeProvider>
        <SiteProvider>
          <App />
        </SiteProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
