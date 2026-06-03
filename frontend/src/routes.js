/** Clean React paths ↔ WordPress slugs from scrape */
export const PATH_TO_SLUG = {
  "/": "home",
  "/about": "about",
  "/solutions": "services",
  "/solutions/professional-av": "professinal-av-solution-2",
  "/solutions/professional-av/auditorium": "auditorium-av",
  "/solutions/professional-av/conference-board-rooms": "confrence-board-rooms",
  "/solutions/professional-av/educational-institute": "museum",
  "/solutions/professional-av/huddle-room": "huddle-room",
  "/solutions/it-network": "it-network-infrastructure",
  "/solutions/security-surveillance": "security-surveillance",
  "/services": "our-services",
  "/services/installation": "installation",
  "/services/amc": "amc",
  "/products": "products-2",
  "/partners": "team",
  "/testimonials": "testimonials",
  "/get-quote": "get-quote",
  "/contact": "contact",
};

export const SLUG_TO_PATH = Object.fromEntries(
  Object.entries(PATH_TO_SLUG).map(([path, slug]) => [slug, path])
);

export function slugFromPathname(pathname) {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return PATH_TO_SLUG[normalized];
}

/** Main navigation (clean paths) */
export const MAIN_NAV = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Solutions",
    path: "/solutions",
    children: [
      {
        label: "Professional AV",
        path: "/solutions/professional-av",
        children: [
          { label: "Auditorium", path: "/solutions/professional-av/auditorium" },
          {
            label: "Conference & Board Rooms",
            path: "/solutions/professional-av/conference-board-rooms",
          },
          {
            label: "Educational Institute",
            path: "/solutions/professional-av/educational-institute",
          },
          { label: "Huddle Room", path: "/solutions/professional-av/huddle-room" },
        ],
      },
      { label: "IT & Network", path: "/solutions/it-network" },
      { label: "Security & Surveillance", path: "/solutions/security-surveillance" },
    ],
  },
  { label: "Our Services", path: "/services" },
  { label: "Products", path: "/products" },
  {
    label: "More",
    path: "/testimonials",
    children: [
      { label: "Testimonials", path: "/testimonials" },
      { label: "Technology Partner", path: "/partners" },
      { label: "Get Quote", path: "/get-quote" },
    ],
  },
  { label: "Contact Us", path: "/contact", cta: true },
];
