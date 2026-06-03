import { PageSection } from "./PageSection.jsx";

export function PageCta({ children }) {
  return (
    <PageSection className="page-cta-wrap">
      <div className="page-cta">{children}</div>
    </PageSection>
  );
}
