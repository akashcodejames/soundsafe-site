/** Static site content from /data/site.json (built by scripts/build_site_data.py). */

let cache = null;

export async function loadSite() {
  if (cache) return cache;
  const res = await fetch(`${import.meta.env.BASE_URL}data/site.json`);
  if (!res.ok) {
    throw new Error(
      "Missing site data. Run: python scripts/build_site_data.py"
    );
  }
  cache = await res.json();
  return cache;
}

export async function fetchSiteMeta() {
  const { site } = await loadSite();
  return site;
}

export async function fetchPage(slug) {
  const { pages } = await loadSite();
  const page = pages[slug];
  if (!page) {
    throw new Error(`Page '${slug}' not found`);
  }
  return page;
}
