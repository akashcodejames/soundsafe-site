import { useState } from "react";
import { useSite } from "../context/SiteContext.jsx";
import {
  formatContactMail,
  mailtoSubmit,
} from "../utils/mailtoForm.js";
import { PageHero } from "../components/ui/PageHero.jsx";
import { PageSection } from "../components/ui/PageSection.jsx";
import "./Forms.css";

const DEFAULT_EMAIL = "sales@soundsafe.in";

export function ContactPage() {
  const { meta } = useSite();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const to = meta?.company?.email || DEFAULT_EMAIL;

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      const res = mailtoSubmit({
        to,
        subject: `Contact: ${fd.get("subject") || fd.get("name")}`,
        body: formatContactMail(fd),
      });
      setMessage(res.message);
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not open mail app");
      setStatus("err");
    }
  }

  return (
    <article className="form-page">
      <PageHero
        label="Channel open"
        title="Direct line"
        lead="Infrastructure questions, project scoping, or support — we respond with engineers, not templates."
      />

      <PageSection>
        <div className="form-layout">
          <p className="page-lead t-body form-aside">
            Tell us about your site, timeline, and constraints. Submit opens your
            email app to <a href={`mailto:${to}`}>{to}</a>.
          </p>
          <form className="ops-form form-panel surface-card" onSubmit={onSubmit}>
            <div className="ops-row">
              <label className="ops-field">
                <span className="t-mono">Name</span>
                <input name="name" required maxLength={160} autoComplete="name" />
              </label>
              <label className="ops-field">
                <span className="t-mono">Email</span>
                <input name="email" type="email" required autoComplete="email" />
              </label>
            </div>
            <div className="ops-row">
              <label className="ops-field">
                <span className="t-mono">Phone</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              <label className="ops-field">
                <span className="t-mono">Subject</span>
                <input name="subject" maxLength={200} />
              </label>
            </div>
            <label className="ops-field ops-field--full">
              <span className="t-mono">Message</span>
              <textarea name="message" required rows={6} minLength={10} />
            </label>
            <button
              type="submit"
              className="btn btn--fill"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Opening mail…" : "Send message"}
            </button>
            {status === "ok" && <p className="ops-msg ops-msg--ok">{message}</p>}
            {status === "err" && (
              <p className="ops-msg ops-msg--err">{message}</p>
            )}
          </form>
        </div>
      </PageSection>
    </article>
  );
}
