import { assetUrl } from "./assets.js";

function mapImage(img) {
  return {
    ...img,
    url: assetUrl(img.local_path) || img.src,
  };
}

/** Sections and copy from scraped home page (matches soundsafe.in structure). */
export function buildHomeContent(page) {
  const p = page.paragraphs || [];
  const images = (page.images || []).map(mapImage);

  return {
    heroImage: images[0] || null,
    coreSolutions: [
      {
        title: "Professional AV Solutions",
        body: p[0] || "",
        path: "/solutions/professional-av",
        tone: "signal",
      },
      {
        title: "IT and Network Infrastructure",
        body: p[1] || "",
        path: "/solutions/it-network",
        tone: "wire",
      },
      {
        title: "Security and Physical Safety",
        body: p[2] || "",
        path: "/solutions/security-surveillance",
        tone: "alert",
      },
    ],
    whatWeDo: {
      intro:
        p[3] ||
        "We provide end-to-end technology solutions across IT infrastructure, Security Systems, and Professional AV integration.",
      cards: [
        {
          title: "Professional AV Solutions",
          body: p[4] || "",
          image: images[1],
          path: "/solutions/professional-av",
        },
        {
          title: "IT & Network Infrastructure",
          body: p[5] || "",
          image: images[4] || images[1],
          path: "/solutions/it-network",
        },
        {
          title: "Security & Surveillance Systems",
          body: p[6] || "",
          image: images[2],
          path: "/solutions/security-surveillance",
        },
        {
          title: "Safety & Automation Solutions",
          body: p[7] || "",
          image: images[3],
          path: "/solutions/security-surveillance",
        },
      ],
    },
  };
}
