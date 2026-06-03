import { useState } from "react";
import { useSite } from "../context/SiteContext.jsx";
import { formatQuoteMail, mailtoSubmit } from "../utils/mailtoForm.js";
import { PageHero } from "../components/ui/PageHero.jsx";
import { PageSection } from "../components/ui/PageSection.jsx";
import "./Forms.css";

const SERVICES = [
  "Professional AV",
  "IT & Network",
  "Security & Surveillance",
  "Other",
];

const DEFAULT_EMAIL = "sales@soundsafe.in";

export function QuotePage() {
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
        subject: `Quote request: ${fd.get("company")}`,
        body: formatQuoteMail(fd),
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
        label="Project intake"
        title="Scope your build"
        lead="Equipment, environment, timeline — the more signal you send, the sharper our proposal."
      />

      <PageSection>
        <div className="form-layout">
          <p className="page-lead t-body form-aside">
            Share discipline, equipment, and constraints. Submit opens your email
            app to <a href={`mailto:${to}`}>{to}</a>.
          </p>
          <form className="ops-form form-panel surface-card" onSubmit={onSubmit}>
            <div className="ops-row">
              <label className="ops-field">
                <span className="t-mono">First name</span>
                <input name="first_name" required maxLength={80} />
              </label>
              <label className="ops-field">
                <span className="t-mono">Last name</span>
                <input name="last_name" required maxLength={80} />
              </label>
            </div>
            <div className="ops-row">
              <label className="ops-field">
                <span className="t-mono">Email</span>
                <input name="email" type="email" required />
              </label>
              <label className="ops-field">
                <span className="t-mono">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  minLength={7}
                  maxLength={20}
                />
              </label>
            </div>
            <label className="ops-field ops-field--full">
              <span className="t-mono">Organization</span>
              <input name="company" required maxLength={200} />
            </label>
            <fieldset className="ops-radios">
              <legend className="t-mono">Discipline</legend>
              <div className="ops-radio-grid">
                {SERVICES.map((s) => (
                  <label key={s} className="ops-radio">
                    <input
                      type="radio"
                      name="service_interest"
                      value={s}
                      required
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="ops-field ops-field--full">
              <span className="t-mono">Equipment / scope</span>
              <textarea name="equipment_detail" required rows={4} minLength={3} />
            </label>
            <div className="ops-row">
              <label className="ops-field">
                <span className="t-mono">Model / serial</span>
                <input name="model_serial" maxLength={500} />
              </label>
              <label className="ops-field">
                <span className="t-mono">Issue / goals</span>
                <input name="problem_description" maxLength={2000} />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn--fill"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Opening mail…" : "Request proposal"}
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
