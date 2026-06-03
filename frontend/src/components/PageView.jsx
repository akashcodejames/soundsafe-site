import { Link } from "react-router-dom";
import { ContentSections } from "./ContentSections.jsx";
import { buildPageStructure, slugify } from "../utils/contentStructure.js";
import { SLUG_TO_PATH } from "../routes.js";
import "./PageView.css";

export function PageView({ page }) {
  const structure = buildPageStructure(page);

  return (
    <ContentSections structure={structure} slug={page.slug} page={page} />
  );
}

export function PageBreadcrumb({ slug }) {
  const path = SLUG_TO_PATH[slug];
  if (!path || path === "/") return null;
  const parts = path.split("/").filter(Boolean);
  return (
    <nav className="crumb t-mono" aria-label="Breadcrumb">
      <Link to="/">Index</Link>
      {parts.map((part, i) => {
        const sub = "/" + parts.slice(0, i + 1).join("/");
        const label = part.replace(/-/g, " ");
        return (
          <span key={sub}>
            <span className="crumb-sep">/</span>
            <Link to={sub}>{label}</Link>
          </span>
        );
      })}
    </nav>
  );
}

export { slugify };
