import { Link } from "react-router-dom";
import { selectPartnerLogos } from "../utils/partnerImages.js";
import { PageHero } from "./ui/PageHero.jsx";
import { PageSection } from "./ui/PageSection.jsx";
import { PageCta } from "./ui/PageCta.jsx";
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
  const images = selectPartnerLogos(partnerImages ?? page.images).filter(
    (img) => img.url
  );

  const longParagraphs = (page.paragraphs || []).filter(
    (p) => p.length > 80 && !ROLE_LABELS.has(p)
  );
  const roles = (page.paragraphs || []).filter((p) => ROLE_LABELS.has(p));
  const shortNotes = (page.paragraphs || []).filter(
    (p) => p.length <= 80 && !ROLE_LABELS.has(p)
  );

  return (
    <article className="partner-page">
      <PageHero
        label="Alliances"
        title="Technology Partner"
        lead={longParagraphs[0]}
      />

      {images.length > 0 && (
        <PageSection>
          <header className="partner-logos-head">
            <span className="section-label t-mono">Our partners</span>
            <h2 className="section-heading partner-logos-title">
              Trusted technology alliances
            </h2>
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
        </PageSection>
      )}

      <PageSection>
        <div className="partner-story-inner">
          {longParagraphs.slice(1).map((text, i) => (
            <div key={i} className="partner-story-block surface-card surface-card--wire">
              <p className="t-body">{text}</p>
            </div>
          ))}

          {roles.length > 0 && (
            <div className="partner-roles surface-card">
              <span className="section-label t-mono">Capabilities</span>
              <ul className="tag-list">
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
      </PageSection>

      <PageCta>
        <Link to="/get-quote" className="btn btn--fill">
          Partner with us
        </Link>
        <Link to="/contact" className="btn">
          Contact
        </Link>
      </PageCta>
    </article>
  );
}
