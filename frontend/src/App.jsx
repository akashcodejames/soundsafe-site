import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { ContentPage } from "./pages/ContentPage.jsx";
import { QuotePage } from "./pages/QuotePage.jsx";
import { PATH_TO_SLUG, slugFromPathname } from "./routes.js";

function DynamicPage() {
  const { pathname } = useLocation();
  const slug = slugFromPathname(pathname);
  if (!slug) {
    return (
      <div className="page-error shell">
        Page not found. <Link to="/">Go home</Link>
      </div>
    );
  }
  return <ContentPage slug={slug} />;
}

export default function App() {
  const contentPaths = Object.keys(PATH_TO_SLUG).filter(
    (p) => p !== "/contact" && p !== "/get-quote"
  );

  return (
    <Routes>
      <Route element={<Layout />}>
        {contentPaths.map((path) => (
          <Route
            key={path}
            path={path === "/" ? "/" : path}
            element={<DynamicPage />}
          />
        ))}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/get-quote" element={<QuotePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
