import { Link } from "react-router-dom";
import "./OpsTimeline.css";

const STEPS = [
  {
    num: "01",
    title: "Consult",
    desc: "Needs assessment & solution architecture",
  },
  {
    num: "02",
    title: "Integrate",
    desc: "Installation, tuning, handover",
  },
  {
    num: "03",
    title: "Maintain",
    desc: "AMC & lifecycle support",
  },
];

export function OpsTimeline({ ctaPath = "/services", ctaLabel = "Our services" }) {
  return (
    <div className="ops-timeline-block">
      <header className="ops-timeline-intro">
        <span className="section-label t-mono">Operating model</span>
        <h2 className="section-heading ops-timeline-title">
          Design. Deploy. <em>Defend.</em>
        </h2>
        <Link to={ctaPath} className="btn btn--fill btn--glow">
          {ctaLabel}
        </Link>
      </header>

      <div className="ops-timeline">
        <div className="ops-timeline__track" aria-hidden="true">
          <div className="ops-timeline__beam" />
        </div>
        <ol className="ops-timeline__steps">
          {STEPS.map((step) => (
            <li key={step.num} className="ops-timeline__step card-fx surface-card surface-card--signal stagger-item">
              <span className="ops-timeline__num t-mono">{step.num}</span>
              <div className="ops-timeline__content">
                <h3 className="ops-timeline__step-title">{step.title}</h3>
                <p className="ops-timeline__step-desc">{step.desc}</p>
              </div>
              <span className="ops-timeline__dot" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
