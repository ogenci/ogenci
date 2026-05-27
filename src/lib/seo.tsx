import { useEffect } from "react";

const SITE = "https://ogenci.com";
const SITE_NAME = "OGENCI Digital";
const DEFAULT_IMAGE = "/opengraph.webp";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: string;
  noindex?: boolean;
}

function meta(attr: string, name: string, content: string) {
  const isProp = attr === "property";
  const id = `seo-${isProp ? name : attr}-${name}`;
  let el = document.getElementById(id) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.id = id;
    document.head.appendChild(el);
  }
  el.setAttribute(attr, name);
  el.content = content;
}

export function PageSEO({ title, description, image, path, type = "website", noindex }: SEOProps) {
  const fullTitle = title.includes("OGENCI") ? title : `${title} · OGENCI`;
  const url = path || window.location.pathname;
  const canonical = `${SITE}${url}`;

  useEffect(() => {
    document.title = fullTitle;

    meta("name", "description", description);
    meta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    meta("property", "og:title", fullTitle);
    meta("property", "og:description", description);
    meta("property", "og:type", type);
    meta("property", "og:url", canonical);
    meta("property", "og:image", image || DEFAULT_IMAGE);
    meta("property", "og:site_name", SITE_NAME);

    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", fullTitle);
    meta("name", "twitter:description", description);
    meta("name", "twitter:image", image || DEFAULT_IMAGE);

    let canonicalLink = document.getElementById("seo-canonical") as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.id = "seo-canonical";
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
  }, [fullTitle, description, image, canonical, type, noindex]);

  return null;
}
