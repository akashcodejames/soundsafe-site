import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchPage } from "../api/client.js";
import { HomePage } from "../components/HomePage.jsx";
import { PageBreadcrumb, PageView } from "../components/PageView.jsx";
import { TechnologyPartnerPage } from "../components/TechnologyPartnerPage.jsx";

export function ContentPage({ slug }) {
  const { pathname } = useLocation();
  const [page, setPage] = useState(null);
  const [homeImages, setHomeImages] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setHomeImages(null);
    const loads = [fetchPage(slug)];
    if (slug === "team") loads.push(fetchPage("home"));
    Promise.all(loads)
      .then(([p, home]) => {
        setPage(p);
        if (home?.images) setHomeImages(home.images);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (page?.title) {
      const short = page.title.split(" - ")[0];
      document.title = `${short} | Sound Safe`;
    }
  }, [page]);

  if (loading) {
    return (
      <div className="page-loading">
        <span className="t-mono">Loading transmission…</span>
      </div>
    );
  }
  if (error) {
    return <div className="page-error shell">{error}</div>;
  }
  if (!page) return null;

  if (slug === "home") return <HomePage page={page} />;

  if (slug === "team") {
    return (
      <>
        <div className="shell">
          <PageBreadcrumb slug={slug} />
        </div>
        <TechnologyPartnerPage page={page} partnerImages={homeImages} />
      </>
    );
  }

  return (
    <>
      {pathname !== "/" && (
        <div className="shell">
          <PageBreadcrumb slug={slug} />
        </div>
      )}
      <PageView page={page} />
    </>
  );
}
