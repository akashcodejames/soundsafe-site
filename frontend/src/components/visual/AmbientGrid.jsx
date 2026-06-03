import "./AmbientGrid.css";

/** Site-wide ambient tech grid — fixed behind content. */
export function AmbientGrid() {
  return (
    <div className="ambient-grid" aria-hidden="true">
      <svg className="ambient-grid__svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ag-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--wire)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="var(--signal)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--wire)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g className="ambient-grid__lines" stroke="url(#ag-line)" strokeWidth="1" fill="none">
          <path d="M0 120 H1200 M0 400 H1200 M0 680 H1200" />
          <path d="M200 0 V800 M600 0 V800 M1000 0 V800" />
        </g>
        <g className="ambient-grid__nodes" fill="var(--signal)">
          <circle cx="200" cy="120" r="3" />
          <circle cx="600" cy="400" r="4" />
          <circle cx="1000" cy="680" r="3" />
          <circle cx="1000" cy="120" r="2" />
          <circle cx="200" cy="680" r="2" />
        </g>
      </svg>
    </div>
  );
}
