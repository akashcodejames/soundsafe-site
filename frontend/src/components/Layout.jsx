import { Outlet, useLocation } from "react-router-dom";
import { useSite } from "../context/SiteContext.jsx";
import { Footer } from "./Footer.jsx";
import { Header } from "./Header.jsx";
import "./Layout.css";

export function Layout() {
  const { loading, error } = useSite();
  const { pathname } = useLocation();

  return (
    <div className="site site-canvas" data-path={pathname}>
      <Header />
      <main className="site-main">
        {error && !loading && (
          <div className="page-error shell">
            <p className="t-mono">API offline</p>
            <p>Start backend: ./scripts/run_api.sh</p>
            <p>{error}</p>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
