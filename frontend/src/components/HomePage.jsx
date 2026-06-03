import { Link } from "react-router-dom";
import { assetUrl } from "../api/client.js";
import { selectPartnerLogos } from "../utils/partnerImages.js";
import { Marquee } from "./Marquee.jsx";
import "./HomePage.css";
import "./partnerLogos.css";

const PILLARS = [
  {
    num: "01",
    title: "Professional AV",
    desc: "Boardrooms, auditoriums, campuses, command centers — integrated end to end.",
    path: "/solutions/professional-av",
    tone: "signal",
  },
  {
    num: "02",
    title: "IT & Network",
    desc: "Fiber, switching, Wi-Fi, servers — backbone built for AV-over-IP scale.",
    path: "/solutions/it-network",
    tone: "wire",
  },
  {
    num: "03",
    title: "Security",
    desc: "CCTV, access, fire, BMS — physical safety engineered as one system.",
    path: "/solutions/security-surveillance",
    tone: "alert",
  },
];

const TICKER = [
  "AV Integration",
  "ELV Systems",
  "CCTV",
  "Access Control",
  "Greater Noida",
  "Design · Deploy · Support",
];

export function HomePage({ page }) {
  const heroImg = page.images[0]
    ? assetUrl(page.images[0].local_path) || page.images[0].src
    : null;
  const partners = selectPartnerLogos(page.images);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-orb hero-orb--signal" aria-hidden="true" />
        <div className="hero-orb hero-orb--wire" aria-hidden="true" />
        <div className="hero-inner shell">
          <div className="hero-copy reveal">
            <p className="t-mono hero-eyebrow">Sound Safe Technologies</p>
            <h1 className="t-display hero-title">
              <span className="hero-line">Infrastructure</span>
              <span className="hero-line hero-line--accent text-glow">
                you can
              </span>
              <span className="hero-line">trust.</span>
            </h1>
            <p className="hero-lead t-body">
              ELV, security, and professional AV for organizations that cannot
              afford downtime — from consultancy through commissioning.
            </p>
            <div className="hero-actions">
              <Link to="/solutions" className="btn btn--fill">
                Explore solutions
              </Link>
              <Link to="/about" className="btn">
                About us
              </Link>
            </div>
          </div>
          {heroImg && (
            <div className="hero-visual reveal reveal-d2">
              <div className="hero-frame">
                <img src={heroImg} alt="" />
                <span className="hero-tag t-mono">Live systems</span>
              </div>
            </div>
          )}
        </div>
        <div className="hero-stats shell reveal reveal-d3">
          <div className="stat-card glass-panel">
            <span className="stat-num t-display">3</span>
            <span className="t-mono">Core disciplines</span>
          </div>
          <div className="stat-card glass-panel">
            <span className="stat-num t-display stat-num--wire">∞</span>
            <span className="t-mono">Uptime mindset</span>
          </div>
          <div className="stat-card glass-panel">
            <span className="stat-num t-display">1</span>
            <span className="t-mono">Accountable partner</span>
          </div>
        </div>
      </section>

      <Marquee items={TICKER} />

      <section className="pillars section-paper">
        <div className="shell">
          <header className="section-head">
            <span className="t-mono">Capability map</span>
            <h2 className="t-display section-title">What we engineer</h2>
          </header>
          <div className="pillar-list">
            {PILLARS.map((p) => (
              <Link
                key={p.path}
                to={p.path}
                className={`pillar pillar--${p.tone}`}
              >
                <span className="pillar-num t-mono">{p.num}</span>
                <h3 className="t-display pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
                <span className="pillar-go t-mono">Enter →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="manifest shell">
        <div className="manifest-block">
          <span className="t-mono">Operating model</span>
          <h2 className="t-display manifest-title">
            Design. Deploy.
            <br />
            <em>Defend.</em>
          </h2>
        </div>
        <div className="manifest-grid">
          {[
            ["Consult", "Needs assessment & solution architecture"],
            ["Integrate", "Installation, tuning, handover"],
            ["Maintain", "AMC & lifecycle support"],
          ].map(([t, d]) => (
            <div key={t} className="manifest-item">
              <h3 className="t-display">{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <Link to="/services" className="btn btn--fill manifest-cta">
          Our services
        </Link>
      </section>

      {partners.length > 0 && (
        <section className="partners">
          <div className="shell">
            <span className="t-mono partners-label">Technology alliances</span>
          </div>
          <div className="partner-wall">
            {partners.map((img) => {
              const src = assetUrl(img.local_path);
              if (!src) return null;
              return (
                <figure key={src} className="partner-cell">
                  <img src={src} alt="Partner logo" loading="lazy" />
                </figure>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
