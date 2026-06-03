import { useState } from "react";
import { submitContact } from "../api/client.js";
import "./Forms.css";

export function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      const res = await submitContact({
        name: String(fd.get("name")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone") || "") || undefined,
        subject: String(fd.get("subject") || "") || undefined,
        message: String(fd.get("message")),
      });
      setMessage(res.message);
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to send");
      setStatus("err");
    }
  }

  return (
    <div className="form-scene">
      <div className="form-scene-bg t-display" aria-hidden="true">
        CONTACT
      </div>
      <div className="shell form-scene-inner">
        <header className="form-intro reveal">
          <span className="t-mono">Channel open</span>
          <h1 className="t-display form-title">Direct line</h1>
          <p className="t-body form-lead">
            Infrastructure questions, project scoping, or support — we respond
            with engineers, not templates.
          </p>
        </header>
        <form className="ops-form reveal reveal-d1" onSubmit={onSubmit}>
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
            {status === "loading" ? "Transmitting…" : "Send message"}
          </button>
          {status === "ok" && <p className="ops-msg ops-msg--ok">{message}</p>}
          {status === "err" && <p className="ops-msg ops-msg--err">{message}</p>}
        </form>
      </div>
    </div>
  );
}
