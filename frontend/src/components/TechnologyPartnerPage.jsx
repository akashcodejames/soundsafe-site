import { Link } from "react-router-dom";
import { assetUrl } from "../api/client.js";
import { selectPartnerLogos } from "../utils/partnerImages.js";
import "./TechnologyPartnerPage.css";
import "./partnerLogos.css";

const ROLE_LABELS = new Set([
  "UI/UX Designer",
  "Full-Stack Developer",
  "Content Strategist",
  "SEO Specialist",
  "Social Media Manager",
]);

export function TechnologyPartnerPage({ page, partnerImages }) {
  const images = selectPartnerLogos(partnerImages ?? page.images)
    .map((img) => ({
      ...img,
      url: assetUrl(img.local_path) || img.src,
    }))
    .filter((img) => img.url);

  const longParagraphs = (page.paragraphs || []).filter(
    (p) => p.length > 80 && !ROLE_LABELS.has(p)
  );
  const roles = (page.paragraphs || []).filter((p) => ROLE_LABELS.has(p));
  const shortNotes = (page.paragraphs || []).filter(
    (p) => p.length <= 80 && !ROLE_LABELS.has(p)
  );

  return (
    <article className="partner-page">
      <header className="partner-hero">
        <div className="shell">
          <span className="t-mono partner-eyebrow">Alliances</span>
          <h1 className="t-display partner-title">Technology Partner</h1>
          {longParagraphs[0] && (
            <p className="partner-lead t-body">{longParagraphs[0]}</p>
          )}
        </div>
      </header>

      {images.length > 0 && (
        <section className="partner-logos">
          <div className="shell">
            <header className="partner-logos-head">
              <span className="t-mono">Our Partners</span>
              <h2 className="t-display">Trusted technology alliances</h2>
            </header>
            <div className="partner-logos-grid">
              {images.map((img) => (
                <figure key={img.url} className="partner-logo-cell">
                  <img
                    src={img.url}
                    alt={img.alt || "Technology partner"}
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="partner-story">
        <div className="shell partner-story-inner">
          {longParagraphs.slice(1).map((text, i) => (
            <div key={i} className="partner-story-block">
              <p className="t-body">{text}</p>
            </div>
          ))}

          {roles.length > 0 && (
            <div className="partner-roles">
              <span className="t-mono">Capabilities</span>
              <ul>
                {roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
          )}

          {shortNotes.map((note, i) => (
            <p key={i} className="partner-note t-body">
              {note}
            </p>
          ))}
        </div>
      </section>

      <div className="shell partner-cta">
        <Link to="/get-quote" className="btn btn--fill">
          Partner with us
        </Link>
        <Link to="/contact" className="btn">
          Contact
        </Link>
      </div>
    </article>
  );
}
