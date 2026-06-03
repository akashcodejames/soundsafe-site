/** Open default mail client — no backend required. */
export function mailtoSubmit({ to, subject, body }) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  window.location.href = `mailto:${to}${qs ? `?${qs}` : ""}`;
  return { message: "Your mail app should open — send the message from there." };
}

export function formatContactMail(fd) {
  return [
    `Name: ${fd.get("name")}`,
    `Email: ${fd.get("email")}`,
    fd.get("phone") ? `Phone: ${fd.get("phone")}` : "",
    fd.get("subject") ? `Subject: ${fd.get("subject")}` : "",
    "",
    String(fd.get("message")),
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatQuoteMail(fd) {
  return [
    `Name: ${fd.get("first_name")} ${fd.get("last_name")}`,
    `Email: ${fd.get("email")}`,
    `Phone: ${fd.get("phone")}`,
    `Company: ${fd.get("company")}`,
    `Service: ${fd.get("service_interest")}`,
    "",
    `Equipment: ${fd.get("equipment_detail")}`,
    fd.get("model_serial") ? `Model/serial: ${fd.get("model_serial")}` : "",
    fd.get("problem_description") ? `Notes: ${fd.get("problem_description")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
