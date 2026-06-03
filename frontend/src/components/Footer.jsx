import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext.jsx";
import "./Footer.css";

export function Footer() {
  const { meta } = useSite();
  const c = meta?.company;
  if (!c) return null;

  return (
    <footer className="site-foot">
      <div className="foot-cta shell">
        <div className="foot-cta-text">
          <span className="section-label t-mono">Ready to deploy</span>
          <h2 className="section-heading foot-cta-title">
            Build infrastructure
            <br />
            that performs.
          </h2>
        </div>
        <div className="foot-cta-actions">
          <Link to="/get-quote" className="btn btn--fill">
            Request quote
          </Link>
          <Link to="/contact" className="btn">
            Contact
          </Link>
        </div>
      </div>

      <div className="foot-grid shell">
        <div className="foot-brand">
          <span className="section-label t-mono">Sound Safe Technologies</span>
          <p>{c.tagline}</p>
        </div>
        <div>
          <span className="section-label t-mono">Direct line</span>
          <a href={`tel:${c.phone}`} className="foot-big">
            {c.phone}
          </a>
          <a href={`mailto:${c.email}`}>{c.email}</a>
        </div>
        <div>
          <span className="section-label t-mono">Base</span>
          <p className="foot-address">{c.address}</p>
        </div>
        <div>
          <span className="section-label t-mono">Navigate</span>
          <Link to="/solutions">Solutions</Link>
          <Link to="/services">Services</Link>
          <Link to="/partners">Partners</Link>
        </div>
      </div>

      <div className="foot-bar shell">
        <span className="t-mono">
          © {new Date().getFullYear()} — ELV · AV · Security
        </span>
        {c.social.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="t-mono"
          >
            {s.url.includes("youtube") ? "YT" : "WA"}
          </a>
        ))}
      </div>
    </footer>
  );
}
