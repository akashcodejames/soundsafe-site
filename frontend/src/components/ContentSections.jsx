import { Link } from "react-router-dom";
import { parseBodyText, RELATED_LINKS } from "../utils/contentStructure.js";
import { PageHero } from "./ui/PageHero.jsx";
import { PageSection } from "./ui/PageSection.jsx";
import { PageCta } from "./ui/PageCta.jsx";
import { ScrollReveal } from "./ui/ScrollReveal.jsx";
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
            <li key={i} className="surface-card surface-card--signal">
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

function ContentBlock({ section }) {
  const Tag = section.level <= 3 ? "h2" : "h3";
  const titleClass =
    section.level <= 3
      ? "section-heading content-block__title"
      : "t-mono block-title-sub";

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
      <article className="content-block content-block--split content-block--feature surface-card">
        {imageCol}
        {textCol}
      </article>
    );
  }

  if (section.layout === "split-reverse" && imageCol) {
    return (
      <article className="content-block content-block--split content-block--feature reverse surface-card">
        {textCol}
        {imageCol}
      </article>
    );
  }

  return (
    <article className="content-block content-block--stack content-block--feature surface-card surface-card--signal">
      {imageCol}
      {textCol}
    </article>
  );
}

export function ContentSections({ structure, slug, page }) {
  const { pageTitle, intro, sections } = structure;
  const related = RELATED_LINKS[slug] || [];
  const external = page?.external_links || [];

  return (
    <article className="structured-page">
      <PageHero label={slug.replace(/-/g, " ")} title={pageTitle} />

      {intro && (
        <PageSection divider={false}>
          <p className="page-lead t-body">{intro}</p>
        </PageSection>
      )}

      {sections.map((section) => (
        <ScrollReveal as="div" key={section.id} className="content-reveal-wrap">
          <PageSection>
            <ContentBlock section={section} />
          </PageSection>
        </ScrollReveal>
      ))}

      {sections.length === 0 && !intro && (
        <PageSection>
          <div className="structured-empty surface-card">
            <p className="t-body">
              Content for this section is being updated. Please contact us for
              details.
            </p>
            <Link to="/contact" className="btn btn--fill">
              Contact us
            </Link>
          </div>
        </PageSection>
      )}

      {external.length > 0 && (
        <PageSection>
          <aside className="page-aside">
            <span className="section-label t-mono">Resources</span>
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
        </PageSection>
      )}

      {related.length > 0 && (
        <PageSection>
          <aside className="page-aside">
            <span className="section-label t-mono">Related</span>
            <ul>
              {related.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label} →</Link>
                </li>
              ))}
            </ul>
          </aside>
        </PageSection>
      )}

      <PageCta>
        <Link to="/get-quote" className="btn btn--fill">
          Start a project
        </Link>
        <Link to="/contact" className="btn">
          Talk to us
        </Link>
      </PageCta>
    </article>
  );
}
