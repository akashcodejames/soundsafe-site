const API = "/api";

async function fetchJson(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(
      typeof err.detail === "string" ? err.detail : JSON.stringify(err)
    );
  }
  return res.json();
}

export function assetUrl(localPath) {
  if (!localPath) return "";
  const name = localPath.split("/").pop() || "";
  return name ? `/assets/${name}` : "";
}

export function fetchSiteMeta() {
  return fetchJson(`${API}/site/meta`);
}

export function fetchPage(slug) {
  return fetchJson(`${API}/pages/${slug}`);
}

export function submitQuote(data) {
  return fetchJson(`${API}/forms/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function submitContact(data) {
  return fetchJson(`${API}/forms/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
