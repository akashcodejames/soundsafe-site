import { Link } from "react-router-dom";
import { selectPartnerLogos } from "../utils/partnerImages.js";
import { buildHomeContent } from "../utils/homeContent.js";
import { MetricStrip } from "./ui/MetricStrip.jsx";
import { ScrollReveal } from "./ui/ScrollReveal.jsx";
import { Marquee } from "./Marquee.jsx";
import { PartnerCarousel } from "./PartnerCarousel.jsx";
import { AmbientGrid } from "./visual/AmbientGrid.jsx";
import { SystemsOrbit } from "./visual/SystemsOrbit.jsx";
import { BentoSolutions } from "./visual/BentoSolutions.jsx";
import { OpsTimeline } from "./visual/OpsTimeline.jsx";
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
      <section className="hero hero--command">
        <div className="hero-inner shell">
          <div className="hero-copy reveal">
            <div className="hero-status t-mono" aria-hidden="true">
              <span className="hero-status__dot" />
              Systems online · Greater Noida
            </div>
            <span className="section-label t-mono">Sound Safe Technologies</span>
            <h1 className="t-display hero-title">
              <span className="hero-line">ELV, Security</span>
              <span className="hero-line hero-line--accent">& AV Solutions</span>
              <span className="hero-line hero-line--dim">Greater Noida</span>
            </h1>
            <p className="hero-lead t-body">
              {page.meta_description ||
                "End-to-end technology solutions — from design to deployment and support."}
            </p>
            <div className="hero-actions">
              <Link to="/solutions" className="btn btn--fill btn--glow">
                Our core solutions
              </Link>
              <Link to="/contact" className="btn btn--outline-fx">
                Contact us
              </Link>
            </div>
          </div>

          <div className="hero-stage reveal reveal-d2">
            {heroImage?.url && (
              <div className="hero-frame hero-frame--hud">
                <img src={heroImage.url} alt="" />
                <div className="hero-hud t-mono" aria-hidden="true">
                  <span>SYS_OK</span>
                  <span>AV · ELV · CCTV</span>
                </div>
              </div>
            )}
            <SystemsOrbit />
          </div>
        </div>
        <MetricStrip items={HERO_METRICS} />
      </section>

      <Marquee items={TICKER} />

      <ScrollReveal as="section" className="section-block--divider" stagger>
        <div className="shell">
          <header className="home-section-head">
            <span className="section-label t-mono">Our Core Solutions</span>
            <h2 className="section-heading">What we deliver</h2>
            <p className="page-lead t-body home-section-lead">
              Three integrated disciplines — one accountable partner for your
              site.
            </p>
          </header>
          <BentoSolutions items={coreSolutions} />
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="section-block--divider" stagger>
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
                className="what-card card-fx surface-card surface-card--signal stagger-item"
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
        <div className="shell">
          <OpsTimeline />
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
