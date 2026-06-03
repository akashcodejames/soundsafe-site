import { Link } from "react-router-dom";
import "./SystemsOrbit.css";

const DISCIPLINES = [
  {
    code: "AV-01",
    label: "Professional AV",
    path: "/solutions/professional-av",
    tone: "signal",
  },
  {
    code: "SEC-02",
    label: "Security",
    path: "/solutions/security-surveillance",
    tone: "alert",
  },
  {
    code: "NET-03",
    label: "IT & Network",
    path: "/solutions/it-network",
    tone: "wire",
  },
];

export function SystemsOrbit() {
  return (
    <div className="systems-orbit" aria-label="Core disciplines">
      <div className="systems-orbit__ring systems-orbit__ring--outer" />
      <div className="systems-orbit__ring systems-orbit__ring--inner" />
      <div className="systems-orbit__hub">
        <span className="systems-orbit__hub-code t-mono">ELV</span>
        <span className="systems-orbit__hub-label t-mono">Core stack</span>
      </div>
      {DISCIPLINES.map((d, i) => (
        <Link
          key={d.code}
          to={d.path}
          className={`systems-orbit__node systems-orbit__node--${d.tone} systems-orbit__node--${i + 1}`}
        >
          <span className="systems-orbit__node-code t-mono">{d.code}</span>
          <span className="systems-orbit__node-label">{d.label}</span>
        </Link>
      ))}
      <div className="systems-orbit__sweep" aria-hidden="true" />
    </div>
  );
}
