import { Link } from "react-router-dom";
import "./BentoSolutions.css";

const TONE_CLASS = {
  signal: "bento-card--signal",
  wire: "bento-card--wire",
  alert: "bento-card--alert",
};

export function BentoSolutions({ items }) {
  return (
    <div className="bento-grid">
      {items.map((item, index) => (
        <Link
          key={item.path}
          to={item.path}
          className={`bento-card card-fx surface-card ${TONE_CLASS[item.tone] || ""} bento-card--${index + 1} stagger-item`}
        >
          <span className="bento-card__index t-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="bento-card__title">{item.title}</h3>
          <p className="bento-card__body t-body">{item.body}</p>
          <span className="bento-card__go t-mono">Open module →</span>
          <div className="bento-card__glow" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
