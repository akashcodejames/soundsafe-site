import "./Marquee.css";

export function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((label, i) => (
          <span key={`${label}-${i}`} className="marquee-item t-mono">
            {label}
            <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
