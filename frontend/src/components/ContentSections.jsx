import { Link } from "react-router-dom";
import { parseBodyText, RELATED_LINKS } from "../utils/contentStructure.js";
import "./ContentSections.css";

function SectionBody({ parsed, fallback }) {
  const content =
    parsed?.intro || parsed?.bullets?.length
      ? parsed
      : fallback
        ? parseBodyText(fallback)
        : { intro: "", bullets: [] };

  if (!content.intro && !content.bullets?.length) return null;

  return (
    <div className="section-body">
      {content.intro && <p className="section-intro">{content.intro}</p>}
      {content.bullets?.length > 0 && (
        <ul className="section-bullets">
          {content.bullets.map((item, i) => (
            <li key={i}>
              {item.label && (
                <strong className="bullet-label">{item.label}</strong>
              )}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ContentBlock({ section, index }) {
  const Tag = section.level <= 3 ? "h2" : "h3";
  const titleClass =
    section.level <= 3 ? "t-display block-title" : "t-mono block-title-sub";

  const textCol = (
    <div className="block-copy">
      {section.title && (
        <Tag id={section.id} className={titleClass}>
          {section.title}
        </Tag>
      )}
      <SectionBody parsed={section.parsed} fallback={section.body} />
    </div>
  );

  const imageCol =
    section.image?.url && (
      <figure className="block-media">
        <img
          src={section.image.url}
          alt={section.image.alt || section.title || ""}
          loading="lazy"
        />
      </figure>
    );

  if (section.layout === "split" && imageCol) {
    return (
      <section className="content-block content-block--split">
        {imageCol}
        {textCol}
      </section>
    );
  }

  if (section.layout === "split-reverse" && imageCol) {
    return (
      <section className="content-block content-block--split reverse">
        {textCol}
        {imageCol}
      </section>
    );
  }

  return (
    <section className="content-block content-block--stack">
      {imageCol}
      {textCol}
    </section>
  );
}

export function ContentSections({ structure, slug, page }) {
  const { pageTitle, intro, sections } = structure;
  const related = RELATED_LINKS[slug] || [];
  const external = page?.external_links || [];

  return (
    <article className="structured-page">
      <header className="structured-hero">
        <div className="shell">
          <span className="t-mono structured-eyebrow">
            {slug.replace(/-/g, " ")}
          </span>
          <h1 className="t-display structured-title">{pageTitle}</h1>
        </div>
      </header>

      {intro && (
        <div className="shell structured-intro-wrap">
          <p className="structured-intro t-body">{intro}</p>
        </div>
      )}

      <div className="structured-sections">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={
              index % 2 === 0 ? "structured-band" : "structured-band alt"
            }
          >
            <div className="shell">
              <ContentBlock section={section} index={index} />
            </div>
          </div>
        ))}
      </div>

      {sections.length === 0 && !intro && (
        <div className="shell structured-empty">
          <p className="t-body">
            Content for this section is being updated. Please contact us for
            details.
          </p>
          <Link to="/contact" className="btn btn--fill">
            Contact us
          </Link>
        </div>
      )}

      {external.length > 0 && (
        <aside className="structured-external shell">
          <span className="t-mono">Resources</span>
          <ul>
            {external.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.text || link.url} ↗
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {related.length > 0 && (
        <aside className="structured-related shell">
          <span className="t-mono">Related</span>
          <ul>
            {related.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label} →</Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="shell structured-cta">
        <Link to="/get-quote" className="btn btn--fill">
          Start a project
        </Link>
        <Link to="/contact" className="btn">
          Talk to us
        </Link>
      </div>
    </article>
  );
}
