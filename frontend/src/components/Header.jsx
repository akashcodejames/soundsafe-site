import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSite } from "../context/SiteContext.jsx";
import { MAIN_NAV } from "../routes.js";
import { ThemeToggle } from "./ThemeToggle.jsx";
import "./Header.css";

const MOBILE_MQ = "(max-width: 960px)";

const NAV_MAIN = MAIN_NAV.filter(
  (item) => !item.children?.length && !item.cta
);
const NAV_EXTRA = MAIN_NAV.filter((item) => item.children?.length);
const NAV_CTA = MAIN_NAV.find((item) => item.cta);

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return mobile;
}

function SubNav({ items, depth = 0, onNavigate }) {
  return (
    <ul className={`subnav ${depth > 0 ? "subnav--nested" : ""}`}>
      {items.map((item) =>
        item.children?.length ? (
          <li key={item.path} className="subnav-group">
            <Link
              to={item.path}
              className="subnav-parent"
              onClick={onNavigate}
            >
              {item.label}
            </Link>
            <SubNav
              items={item.children}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          </li>
        ) : (
          <li key={item.path}>
            <Link to={item.path} onClick={onNavigate}>
              {item.label}
            </Link>
          </li>
        )
      )}
    </ul>
  );
}

function NavDropdownItem({ item, isMobile, expanded, onToggle, onClose }) {
  const open = expanded === item.path;

  return (
    <li
      className={`has-children ${open ? "is-expanded" : ""}`}
      onMouseEnter={!isMobile ? () => onToggle(item.path) : undefined}
    >
      {isMobile ? (
        <>
          <div className="nav-item-row">
            <NavLink to={item.path} className="nav-link" onClick={onClose}>
              {item.label}
            </NavLink>
            <button
              type="button"
              className="nav-expand-btn"
              aria-expanded={open}
              aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
              onClick={() => onToggle(open ? null : item.path)}
            >
              <span className="nav-expand-icon" aria-hidden="true" />
            </button>
          </div>
          {open && (
            <div className="nav-dropdown">
              <SubNav items={item.children} onNavigate={onClose} />
            </div>
          )}
        </>
      ) : (
        <NavLink to={item.path} className="nav-link" onClick={onClose}>
          {item.label}
          <span className="nav-index" aria-hidden="true">
            +
          </span>
        </NavLink>
      )}
    </li>
  );
}

function NavPlainItem({ item, onClose }) {
  if (item.cta) {
    return (
      <li key={item.path} className="nav-cta-wrap">
        <NavLink
          to={item.path}
          className="nav-cta btn btn--fill"
          onClick={onClose}
        >
          {item.label}
        </NavLink>
      </li>
    );
  }
  return (
    <li key={item.path}>
      <NavLink to={item.path} className="nav-link" onClick={onClose}>
        {item.label}
      </NavLink>
    </li>
  );
}

export function Header() {
  const { meta } = useSite();
  const [open, setOpen] = useState(false);
  const [desktopMega, setDesktopMega] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const isMobile = useIsMobile();
  const name = meta?.company.name ?? "Sound Safe";

  const closeMenu = () => {
    setOpen(false);
    setMobileExpanded(null);
    setDesktopMega(null);
  };

  useEffect(() => {
    if (!open) {
      setMobileExpanded(null);
      setDesktopMega(null);
    }
  }, [open]);

  useEffect(() => {
    setMobileExpanded(null);
    setDesktopMega(null);
  }, [isMobile]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open && isMobile);
    return () => document.body.classList.remove("nav-open");
  }, [open, isMobile]);

  const handleToggle = (path) => {
    if (isMobile) setMobileExpanded(path);
    else setDesktopMega(path);
  };

  const expanded = isMobile ? mobileExpanded : desktopMega;
  const activeDropdown = !isMobile
    ? NAV_EXTRA.find((item) => item.path === desktopMega)
    : null;

  return (
    <header className="masthead">
      <div className="masthead-bar shell">
        <Link to="/" className="mark" onClick={closeMenu}>
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
          aria-controls="masthead-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="masthead-nav"
          className={`masthead-nav ${open ? "is-open" : ""}`}
          onMouseLeave={!isMobile ? () => setDesktopMega(null) : undefined}
        >
          <div className="nav-row">
            <ul className="nav-cluster nav-cluster--main" aria-label="Main">
              {NAV_MAIN.map((item) => (
                <NavPlainItem key={item.path} item={item} onClose={closeMenu} />
              ))}
            </ul>

            <ul
              className="nav-cluster nav-cluster--extra"
              aria-label="Solutions and more"
            >
              {NAV_EXTRA.map((item) => (
                <NavDropdownItem
                  key={item.path}
                  item={item}
                  isMobile={isMobile}
                  expanded={expanded}
                  onToggle={handleToggle}
                  onClose={closeMenu}
                />
              ))}
            </ul>
          </div>

          {activeDropdown && (
            <div
              className="nav-dropdown nav-dropdown--desktop"
              role="group"
              aria-label={`${activeDropdown.label} menu`}
            >
              <SubNav
                items={activeDropdown.children}
                onNavigate={closeMenu}
              />
            </div>
          )}
        </nav>

        <div className="masthead-actions">
          {NAV_CTA && (
            <NavLink
              to={NAV_CTA.path}
              className="nav-cta btn btn--fill"
              onClick={closeMenu}
            >
              {NAV_CTA.label}
            </NavLink>
          )}
          <ThemeToggle />
        </div>
      </div>
      <div className="masthead-rule" aria-hidden="true" />
    </header>
  );
}
