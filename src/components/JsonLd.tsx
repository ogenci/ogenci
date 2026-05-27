import { useEffect, useMemo } from "react";

const SITE = "https://ogenci.com";

function useLdJson(id: string, json: object) {
  const jsonStr = useMemo(() => JSON.stringify(json), [json]);

  useEffect(() => {
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = jsonStr;
  }, [id, jsonStr]);
}

export function OrganizationSchema() {
  useLdJson("ld-organization", {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OGENCI",
    url: SITE,
    logo: `${SITE}/favicon.svg`,
    description: "A premier global digital agency rooted in Africa. We build high-converting digital ecosystems, run ROI-driven ad campaigns, and deploy AI systems that scale businesses worldwide.",
    address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
    contactPoint: { "@type": "ContactPoint", contactType: "sales", url: `${SITE}/book` },
    sameAs: [
      "https://wa.me/233263460173",
      "https://x.com/ogencidigital",
      "https://www.instagram.com/ogencidigital/",
      "https://www.linkedin.com/company/ogencidigital",
      "https://www.tiktok.com/@ogencidigital",
    ],
  });

  return null;
}

export function WebSiteSchema() {
  useLdJson("ld-website", {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OGENCI Digital",
    url: SITE,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE}/insights?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  });

  return null;
}

export function ArticleSchema({ headline, description, image, datePublished, author }: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  author: string;
}) {
  useLdJson("ld-article", {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image.startsWith("http") ? image : `${SITE}${image}`,
    datePublished,
    author: { "@type": "Organization", name: author || "OGENCI Digital" },
    publisher: { "@type": "Organization", name: "OGENCI Digital", logo: `${SITE}/favicon.svg` },
  });

  return null;
}

export function FAQSchema({ questions }: { questions: { question: string; answer: string }[] }) {
  useLdJson("ld-faq", {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(q => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  });

  return null;
}

export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  useLdJson("ld-breadcrumb", {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  });

  return null;
}
