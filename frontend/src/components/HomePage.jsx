import { Link } from "react-router-dom";
import { selectPartnerLogos } from "../utils/partnerImages.js";
import { buildHomeContent } from "../utils/homeContent.js";
import { MetricStrip } from "./ui/MetricStrip.jsx";
import { ScrollReveal } from "./ui/ScrollReveal.jsx";
import { Marquee } from "./Marquee.jsx";
import { PartnerCarousel } from "./PartnerCarousel.jsx";
import "./HomePage.css";
import "./partnerLogos.css";

const TICKER = [
  "AV Integration",
  "ELV Systems",
  "CCTV",
  "Access Control",
  "Greater Noida",
  "Design · Deploy · Support",
];

const HERO_METRICS = [
  { value: "3", label: "Core disciplines" },
  { value: "∞", label: "Uptime mindset", tone: "wire" },
  { value: "1", label: "Accountable partner" },
];

export function HomePage({ page }) {
  const { heroImage, coreSolutions, whatWeDo } = buildHomeContent(page);
  const partners = selectPartnerLogos(page.images);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner shell">
          <div className="hero-copy reveal">
            <span className="section-label t-mono">Sound Safe Technologies</span>
            <h1 className="t-display hero-title">
              <span className="hero-line">ELV, Security</span>
              <span className="hero-line hero-line--accent">& AV Solutions</span>
              <span className="hero-line">Greater Noida</span>
            </h1>
            <p className="hero-lead t-body">
              {page.meta_description ||
                "End-to-end technology solutions — from design to deployment and support."}
            </p>
            <div className="hero-actions">
              <Link to="/solutions" className="btn btn--fill">
                Our core solutions
              </Link>
              <Link to="/contact" className="btn">
                Contact us
              </Link>
            </div>
          </div>
          {heroImage?.url && (
            <div className="hero-visual reveal reveal-d2">
              <div className="hero-frame">
                <img src={heroImage.url} alt="" />
                <span className="hero-tag t-mono">Live systems</span>
              </div>
            </div>
          )}
        </div>
        <MetricStrip items={HERO_METRICS} />
      </section>

      <Marquee items={TICKER} />

      <ScrollReveal as="section" className="section-block--divider">
        <div className="shell">
          <header className="home-section-head">
            <span className="section-label t-mono">Our Core Solutions</span>
            <h2 className="section-heading">What we deliver</h2>
          </header>
          <div className="core-solutions-grid">
            {coreSolutions.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`core-solution surface-card surface-card--${item.tone}`}
              >
                <h3 className="core-solution__title">{item.title}</h3>
                <p className="core-solution__body t-body">{item.body}</p>
                <span className="pillar-go t-mono">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="section-block--divider">
        <div className="shell">
          <header className="home-section-head">
            <span className="section-label t-mono">What We Do</span>
            <h2 className="section-heading">Integrated technology</h2>
            <p className="page-lead t-body home-what-lead">{whatWeDo.intro}</p>
          </header>
          <div className="what-we-do-grid">
            {whatWeDo.cards.map((card) => (
              <Link
                key={card.title}
                to={card.path}
                className="what-card surface-card surface-card--signal"
              >
                {card.image?.url && (
                  <figure className="what-card__media">
                    <img src={card.image.url} alt="" loading="lazy" />
                  </figure>
                )}
                <h3 className="what-card__title">{card.title}</h3>
                <p className="what-card__body">{card.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="section-block--divider">
        <div className="shell manifest-layout">
          <header className="manifest-intro">
            <span className="section-label t-mono">Operating model</span>
            <h2 className="section-heading manifest-title">
              Design. Deploy. <em>Defend.</em>
            </h2>
            <Link to="/services" className="btn btn--fill manifest-cta">
              Our services
            </Link>
          </header>
          <div className="manifest-grid">
            {[
              ["Consult", "Needs assessment & solution architecture"],
              ["Integrate", "Installation, tuning, handover"],
              ["Maintain", "AMC & lifecycle support"],
            ].map(([t, d]) => (
              <div key={t} className="manifest-item surface-card surface-card--signal">
                <h3 className="manifest-item-title">{t}</h3>
                <p className="manifest-item-desc">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {partners.length > 0 && (
        <ScrollReveal as="section" className="section-block--divider">
          <div className="shell">
            <span className="section-label t-mono">Our Valuable Partners</span>
            <PartnerCarousel logos={partners} />
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
