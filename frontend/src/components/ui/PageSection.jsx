/**
 * Shell-wrapped section with optional top divider (content width only).
 */
export function PageSection({ children, divider = true, className = "" }) {
  const sectionClass = [
    divider ? "section-block--divider" : "page-section--compact",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClass}>
      <div className="shell">{children}</div>
    </section>
  );
}
