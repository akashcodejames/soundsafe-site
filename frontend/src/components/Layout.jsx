import { Outlet, useLocation } from "react-router-dom";
import { useSite } from "../context/SiteContext.jsx";
import { ScrollProgress } from "./effects/ScrollProgress.jsx";
import { AmbientGrid } from "./visual/AmbientGrid.jsx";
import { Footer } from "./Footer.jsx";
import { Header } from "./Header.jsx";
import { ScrollToTop } from "./ScrollToTop.jsx";
import "./Layout.css";

export function Layout() {
  const { loading, error } = useSite();
  const { pathname } = useLocation();

  return (
    <div className="site site-canvas site-canvas--fx" data-path={pathname}>
      <ScrollProgress />
      <AmbientGrid />
      <Header />
      <main className="site-main">
        {error && !loading && (
          <div className="page-error shell">
            <p className="t-mono">Site data missing</p>
            <p>Run: python scripts/build_site_data.py</p>
            <p>{error}</p>
          </div>
        )}
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
