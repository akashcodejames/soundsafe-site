import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSite } from "../context/SiteContext.jsx";
import { MAIN_NAV } from "../routes.js";
import { ThemeToggle } from "./ThemeToggle.jsx";
import "./Header.css";

function SubNav({ items }) {
  return (
    <ul className="subnav">
      {items.map((item) =>
        item.children?.length ? (
          <li key={item.path} className="subnav-group">
            <Link to={item.path} className="subnav-parent">
              {item.label}
            </Link>
            <SubNav items={item.children} />
          </li>
        ) : (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        )
      )}
    </ul>
  );
}

export function Header() {
  const { meta } = useSite();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(null);
  const name = meta?.company.name ?? "Sound Safe";

  return (
    <header className="masthead">
      <div className="masthead-bar shell">
        <Link to="/" className="mark" onClick={() => setOpen(false)}>
          <span className="mark-line t-mono">Greater Noida</span>
          <span className="mark-name t-display">{name.split(" ")[0]}</span>
          <span className="mark-sub t-display">
            {name.split(" ").slice(1).join(" ")}
          </span>
        </Link>

        <button
          type="button"
          className="masthead-toggle t-mono"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className={`masthead-nav ${open ? "is-open" : ""}`}>
          <ul className="nav-primary">
            <li className="nav-theme-wrap">
              <ThemeToggle />
            </li>
            {MAIN_NAV.map((item) => {
              if (item.cta) {
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="nav-cta btn btn--fill"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              }
              if (!item.children?.length) {
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="nav-link"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              }
              return (
                <li
                  key={item.path}
                  className="has-mega"
                  onMouseEnter={() => setMega(item.path)}
                  onMouseLeave={() => setMega(null)}
                >
                  <NavLink
                    to={item.path}
                    className="nav-link"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <span className="nav-index">+</span>
                  </NavLink>
                  {mega === item.path && (
                    <div className="mega-panel">
                      <SubNav items={item.children} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="masthead-rule" aria-hidden="true" />
    </header>
  );
}
