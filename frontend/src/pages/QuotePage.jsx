import { useState } from "react";
import { submitQuote } from "../api/client.js";
import "./Forms.css";

const SERVICES = [
  "Professional AV",
  "IT & Network",
  "Security & Surveillance",
  "Other",
];

export function QuotePage() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      const res = await submitQuote({
        first_name: String(fd.get("first_name")),
        last_name: String(fd.get("last_name")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone")),
        company: String(fd.get("company")),
        service_interest: String(fd.get("service_interest")),
        equipment_detail: String(fd.get("equipment_detail")),
        model_serial: String(fd.get("model_serial") || "") || undefined,
        problem_description:
          String(fd.get("problem_description") || "") || undefined,
      });
      setMessage(res.message);
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to submit");
      setStatus("err");
    }
  }

  return (
    <div className="form-scene form-scene--quote">
      <div className="form-scene-bg t-display" aria-hidden="true">
        QUOTE
      </div>
      <div className="shell form-scene-inner">
        <header className="form-intro reveal">
          <span className="t-mono">Project intake</span>
          <h1 className="t-display form-title">Scope your build</h1>
          <p className="t-body form-lead">
            Equipment, environment, timeline — the more signal you send, the
            sharper our proposal.
          </p>
        </header>
        <form className="ops-form reveal reveal-d1" onSubmit={onSubmit}>
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
            {status === "loading" ? "Submitting…" : "Request proposal"}
          </button>
          {status === "ok" && <p className="ops-msg ops-msg--ok">{message}</p>}
          {status === "err" && <p className="ops-msg ops-msg--err">{message}</p>}
        </form>
      </div>
    </div>
  );
}
