import { assetUrl } from "../api/client.js";

/** Known page → heading/paragraph/image order (matches original Elementor layout) */
const PAGE_LAYOUTS = {
  "security-surveillance": [
    { heading: "Security and Survillence", p: 0, img: null, layout: "intro" },
    {
      heading: "Video Surveillance Systems (CCTV)",
      p: 1,
      img: 0,
      layout: "split",
    },
    { heading: "Access Control Systems (ACS)", p: 2, img: null, layout: "stack" },
    {
      heading: "Intrusion Detection & Alarm Systems",
      p: 3,
      img: null,
      layout: "stack",
    },
  ],
  "our-services": [
    { heading: "Service and Strenth", p: 0, img: null, layout: "intro" },
    { heading: "ANNUAL MAINTAINANCE", p: 1, img: 0, layout: "split" },
    { heading: "Installation and Commissioning", p: 2, img: 1, layout: "split-reverse" },
    { heading: "Consultancy and Solution design", p: null, img: 2, layout: "split" },
    { heading: "Consultancy", p: 3, img: null, layout: "stack" },
    { heading: "Solution Design", p: 4, img: null, layout: "stack" },
  ],
};

const BULLET_LABELS =
  /^(Needs Assessment|Site Evaluation|Budgeting(?:\s*&\s*Scope)?|System Architecture|Hardware Specification|Integration Planning|Precision Deployment|Infrastructure Integration|Compliance(?:\s*&\s*Safety)?|IP Cameras|Recording & Storage|Video Management Software \(VMS\)|Video Analytics|Readers & Credentials|Door Hardware|Controllers|Physical Barriers|Sensors|Control Panels|Notification)\s*:?\s*/i;

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Turn wall-of-text into intro + labelled bullet points (like original site) */
export function parseBodyText(text) {
  if (!text || typeof text !== "string") {
    return { intro: "", bullets: [] };
  }

  let cleaned = text
    .replace(/\\"/g, '"')
    .replace(/"\s*$/g, "")
    .trim();

  const parts = cleaned.split(BULLET_LABELS).filter(Boolean);
  if (parts.length <= 1) {
    const sentences = splitSentences(cleaned);
    if (sentences.length > 4) {
      return {
        intro: sentences.slice(0, 2).join(" "),
        bullets: sentences.slice(2).map((s) => ({ label: "", text: s })),
      };
    }
    return { intro: cleaned, bullets: [] };
  }

  const intro = parts[0].trim();
  const labels = cleaned.match(BULLET_LABELS) || [];
  const bullets = parts.slice(1).map((chunk, i) => ({
    label: (labels[i] || "").replace(/:?\s*$/, "").trim(),
    text: chunk.trim(),
  }));

  return { intro, bullets };
}

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
}

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function headingGetsParagraph(index, headings) {
  const h = headings[index];
  const next = headings[index + 1];
  if (!next) return true;
  if (next.level < h.level) {
    if (h.level <= 3 && next.level >= 2) return false;
    return true;
  }
  return true;
}

function buildFromLayout(page, layout) {
  const paragraphs = page.paragraphs || [];
  const images = (page.images || []).map((img) => ({
    ...img,
    url: assetUrl(img.local_path) || img.src,
  }));

  const pageTitle =
    page.headings?.find((h) => h.level === 1)?.text ||
    page.title?.split(" - ")[0] ||
    page.slug;

  const sections = layout.map((row, index) => {
    const heading = page.headings?.find(
      (h) => normalize(h.text) === normalize(row.heading)
    );
    const body =
      row.p != null && paragraphs[row.p] != null ? paragraphs[row.p] : null;

    return {
      id: slugify(row.heading),
      title: row.heading,
      level: heading?.level ?? 2,
      layout: row.layout || (index % 2 === 0 ? "split" : "split-reverse"),
      body,
      parsed: body ? parseBodyText(body) : { intro: "", bullets: [] },
      image: row.img != null ? images[row.img] : null,
    };
  });

  const introSection = sections.find((s) => s.layout === "intro");
  return {
    pageTitle,
    intro: introSection?.parsed?.intro || introSection?.body || null,
    sections: sections.filter((s) => s.layout !== "intro"),
  };
}

function buildGeneric(page) {
  const headings = (page.headings || []).filter((h) => h.level <= 6);
  const paragraphs = [...(page.paragraphs || [])];
  const images = (page.images || []).map((img) => ({
    ...img,
    url: assetUrl(img.local_path) || img.src,
  }));

  const pageTitle =
    headings.find((h) => h.level === 1)?.text ||
    headings[0]?.text ||
    page.title?.split(" - ")[0] ||
    page.slug;

  const contentHeadings = headings.filter(
    (h) => normalize(h.text) !== normalize(pageTitle) && h.level >= 2
  );

  if (contentHeadings.length === 0) {
    return {
      pageTitle,
      intro: paragraphs[0] || null,
      sections: paragraphs.slice(1).map((body, i) => ({
        id: `block-${i}`,
        title: null,
        level: 2,
        layout: "stack",
        body,
        parsed: parseBodyText(body),
        image: images[i] || null,
      })),
    };
  }

  let paraIdx = 0;
  let imgIdx = 0;
  let intro = null;
  const sections = [];

  const firstGetsIntro =
    contentHeadings[0]?.level <= 2 &&
    paragraphs[0] &&
    paragraphs[0].length < 320 &&
    headingGetsParagraph(0, contentHeadings);

  if (firstGetsIntro && contentHeadings.length > 1) {
    intro = paragraphs[paraIdx++];
  }

  contentHeadings.forEach((h, i) => {
    let body = null;
    if (headingGetsParagraph(i, contentHeadings) && paraIdx < paragraphs.length) {
      body = paragraphs[paraIdx++];
    }

    let image = null;
    if (!body && imgIdx < images.length && h.level <= 3) {
      image = images[imgIdx++];
    } else if (body && imgIdx < images.length && (h.level >= 3 || h.level === 4)) {
      image = images[imgIdx++];
    }

    const layout =
      image && body
        ? sections.length % 2 === 0
          ? "split"
          : "split-reverse"
        : "stack";

    sections.push({
      id: slugify(h.text),
      title: h.text,
      level: h.level,
      layout,
      body,
      parsed: body ? parseBodyText(body) : { intro: "", bullets: [] },
      image,
    });
  });

  while (paraIdx < paragraphs.length) {
    sections.push({
      id: `extra-${paraIdx}`,
      title: null,
      level: 2,
      layout: "stack",
      body: paragraphs[paraIdx],
      parsed: parseBodyText(paragraphs[paraIdx]),
      image: imgIdx < images.length ? images[imgIdx++] : null,
    });
    paraIdx++;
  }

  return { pageTitle, intro, sections };
}

export function buildPageStructure(page) {
  const layout = PAGE_LAYOUTS[page.slug];
  if (layout) return buildFromLayout(page, layout);
  return buildGeneric(page);
}

/** Extra links shown on service hub pages (from original site structure) */
export const RELATED_LINKS = {
  "our-services": [
    { label: "Installation & handover", path: "/services/installation" },
    { label: "Annual maintenance (AMC)", path: "/services/amc" },
  ],
  services: [
    { label: "Professional AV", path: "/solutions/professional-av" },
    { label: "IT & network", path: "/solutions/it-network" },
    { label: "Security & surveillance", path: "/solutions/security-surveillance" },
  ],
};
