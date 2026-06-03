/**
 * Home hero metrics — vertical value + label (not horizontal awkward layout).
 */
export function MetricStrip({ items }) {
  return (
    <div className="metric-strip shell">
      {items.map((item) => (
        <div key={item.label} className="metric-card">
          <span
            className={`metric-card__value${item.tone ? ` metric-card__value--${item.tone}` : ""}`}
          >
            {item.value}
          </span>
          <span className="metric-card__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
