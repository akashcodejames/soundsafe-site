import { assetUrl } from "./assets.js";

/** Scraped paths that are not vendor/partner logos (hero art, diagrams, product shots). */
const NON_PARTNER_PATTERNS = [
  /chatgpt-image-may-8/i,
  /chatgpt-image-may-1-2026-04_28_43-pm-1/i,
  /ccctv-image/i,
  /\/aj\.png/i,
  /gemini_generated/i,
  /firealarm/i,
  /access-control-system/i,
  /audio-visual-system-integration/i,
  /final-logo/i,
  /partener2/i,
  /audioroom/i,
];

function imageSrc(img) {
  return (img.src || "").toLowerCase();
}

/** White-on-transparent partner marks exported from the old site. */
export function isPartnerLogoImage(img) {
  const src = imageSrc(img);
  if (!src) return false;
  if (NON_PARTNER_PATTERNS.some((re) => re.test(src))) return false;
  return /_white\.png/i.test(src);
}

export function selectPartnerLogos(images, limit = 24) {
  return (images || [])
    .filter(isPartnerLogoImage)
    .slice(0, limit)
    .map((img) => ({
      ...img,
      url: assetUrl(img.local_path) || img.src,
    }));
}
