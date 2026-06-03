/**
 * Standard interior-page hero — same on services, partners, forms, etc.
 */
export function PageHero({ label, title, lead, children }) {
  return (
    <header className="page-hero page-hero--fx">
      <div className="shell">
        {label && <span className="section-label t-mono">{label}</span>}
        <h1 className="section-heading">{title}</h1>
        {lead && <p className="page-lead t-body">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
