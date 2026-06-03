import { createContext, useContext, useEffect, useState } from "react";
import { fetchSiteMeta } from "../data/siteLoader.js";

const SiteContext = createContext({
  meta: null,
  loading: true,
  error: null,
});

export function SiteProvider({ children }) {
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSiteMeta()
      .then(setMeta)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SiteContext.Provider value={{ meta, loading, error }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
