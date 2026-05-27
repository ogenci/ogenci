import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";

const SITE = "https://ogenci.com";
const SITE_NAME = "OGENCI Digital";
const DEFAULT_IMAGE = `${SITE}/opengraph.webp`;

const dist = resolve(import.meta.dirname, "..", "dist");
const template = readFileSync(resolve(dist, "index.html"), "utf-8");

const articles = [
  { slug: "african-tech-leap", tag: "Web Design", title: "The African Tech Leap: Capturing Global Enterprise B2B Flows", desc: "Why clean, localized, high-speed UX is outperforming bloated Western digital ecosystems in high-ticket lead generation.", date: "May 2026", image: "/images/articles/african-tech.jpg" },
  { slug: "attribution-metrics-2026", tag: "Paid Ads", title: "Attribution in 2026: Moving Past Google & Meta Vanity Metrics", desc: "A surgical guide to building first-party server-side tracking funnels that report pure pipeline profit, not platform estimations.", date: "April 2026", image: "/images/articles/attribution-metrics.jpg" },
  { slug: "autonomous-ai-agents", tag: "AI Integration", title: "Autonomous AI Agents: Operating At Zero Idle Support Latency", desc: "How we deploy fine-tuned AI systems to handle 70%+ of customer operations while maintaining human-level empathy and response precision.", date: "March 2026", image: "/images/articles/autonomous-ai.jpg" },
  { slug: "the-tech-regulations", tag: "Tech Regulation", title: "You Will Soon Need a Licence to Sell Software in Ghana - Here's What Business Leaders Must Know", desc: "A forward-looking compliance and strategy guide for tech vendors, SaaS providers, IT firms, and any enterprise preparing for the sweeping mandates of the proposed NITA Bill, 2025.", date: "May 2026", image: "/images/articles/nita-bill-2025.png" },
];

const caseStudies = [
  { slug: "jonmoore", client: "Jonmoore International", tagline: "Moving the Impossible Across West Africa", industry: "Heavy Logistics", solution: "We architected a premium, editorial-style digital experience that translates their physical engineering precision into a digital interface." },
  { slug: "isa-ghana", client: "International School of Accra", tagline: "Redefining Premium Education in West Africa", industry: "Education", solution: "We executed a full-scale enterprise redesign, transforming the platform into an immersive, editorial-style experience." },
  { slug: "bjh-logistics", client: "BJH Logistics", tagline: "Premium Logistics Digital Platform", industry: "Logistics", solution: "Full-scale digital platform for a premium logistics firm. Integrated tracking, custom portal, and optimized booking flows." },
  { slug: "accra-grammar", client: "Accra Grammar", tagline: "Digital Identity for a Leading School", industry: "Education", solution: "Complete digital identity and enrollment platform for one of Ghana's leading schools." },
  { slug: "rich-jane-school", client: "Rich Jane School", tagline: "K-12 Digital Platform", industry: "Education", solution: "An immersive, community-focused website for a premier preschool and primary institution." },
  { slug: "wesleyan", client: "Wesleyan CM", tagline: "Unleashing Global Revival Through Digital Connection", industry: "Non-Profit / Faith", solution: "We engineered a high-fidelity digital ecosystem centered on 'Digital Fellowship' with custom streaming, AI search, and global giving." },
];

function ldJson(key, json) {
  return `<script id="${key}" type="application/ld+json">${JSON.stringify(json)}</script>`;
}

function injectMeta(html, { title, description, image = DEFAULT_IMAGE, path = "/", type = "website", noindex = false }) {
  const url = `${SITE}${path}`;
  const fullTitle = title.includes("OGENCI") ? title : `${title} · OGENCI`;
  const robots = noindex ? "noindex, nofollow" : "index, follow";
  const imageAbs = image.startsWith("http") ? image : `${SITE}${image}`;

  let result = html
    .replace(/<title>[^<]*<\/title>/, `<title>${fullTitle}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${robots}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${fullTitle}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${imageAbs}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="en_GH" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${fullTitle}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${imageAbs}" />`)

  // Add canonical <link> tag (in addition to JSON-LD)
  if (!result.includes('rel="canonical"')) {
    result = result.replace("</head>", `<link rel="canonical" href="${url}" /></head>`);
  }

  // Add JSON-LD canonical (WebPage/Article schema)
  result = result.replace("</head>", `${ldJson("ld-canonical", { "@context": "https://schema.org", "@type": type === "article" ? "Article" : "WebPage", name: fullTitle, description, url, image: imageAbs })}</head>`);

  return result;
}

function injectJsonLd(html, schemas) {
  const ldBlock = schemas.map(s => ldJson(s.id, s.json)).join("\n");
  return html.replace("</head>", `${ldBlock}</head>`);
}

function injectBody(html, text) {
  return html.replace('<div id="root"></div>', `<div id="root"><div class="prerendered-content" style="padding:2rem;font-family:Inter,sans-serif;max-width:1200px;margin:0 auto;color:#0a0a0a"><h1 style="font-size:2rem;font-weight:700">${text.title}</h1>${text.body ? `<p style="font-size:1rem;line-height:1.6;margin-top:1rem">${text.body}</p>` : ""}</div></div>`);
}

const routes = [];

// Home
routes.push({
  path: "/",
  body: { title: "OGENCI — Global ROI Architecture · Rooted in Africa, Built for the World", body: "A premier global digital agency rooted in Africa. We build high-converting websites, run ROI-driven ad campaigns, and deploy AI systems that scale businesses worldwide. Digital agency serving logistics, education, non-profit, and service industries." },
  meta: {
    title: "OGENCI — Global ROI Architecture · Rooted in Africa, Built for the World",
    description: "A premier global digital agency rooted in Africa. High-converting websites, ROI-driven ad campaigns, and AI systems that scale businesses worldwide.",
  },
  schemas: [
    { id: "ld-organization", json: { "@context": "https://schema.org", "@type": "Organization", name: "OGENCI", url: SITE, logo: `${SITE}/favicon.svg`, description: "A premier global digital agency rooted in Africa.", address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" }, contactPoint: { "@type": "ContactPoint", contactType: "sales", url: `${SITE}/book` }, sameAs: ["https://wa.me/233263460173", "https://x.com/ogencidigital", "https://www.instagram.com/ogencidigital/", "https://www.linkedin.com/company/ogencidigital", "https://www.tiktok.com/@ogencidigital"] } },
    { id: "ld-website", json: { "@context": "https://schema.org", "@type": "WebSite", name: "OGENCI Digital", url: SITE, potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE}/insights?q={search_term_string}` }, "query-input": "required name=search_term_string" } } },
    { id: "ld-breadcrumb", json: { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }] } },
    { id: "ld-faq", json: { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "What services does OGENCI offer?", acceptedAnswer: { "@type": "Answer", text: "OGENCI provides three core services: high-conversion web design, ROI-driven paid advertising (Meta, Google, TikTok), and custom AI & automation systems." } },
      { "@type": "Question", name: "Where is OGENCI based?", acceptedAnswer: { "@type": "Answer", text: "OGENCI is headquartered in Accra, Ghana with a global outlook, serving clients worldwide." } },
      { "@type": "Question", name: "How much does OGENCI's web design service cost?", acceptedAnswer: { "@type": "Answer", text: "Web Design starts at $2,500/month for Foundation, $3,500/month for Growth, and $5,000/month for Scale. Custom Enterprise pricing is also available." } },
      { "@type": "Question", name: "How much does OGENCI's paid advertising service cost?", acceptedAnswer: { "@type": "Answer", text: "Paid Ads start at $2,500/month for Foundation, $3,500/month for Growth, and $5,000/month for Scale." } },
      { "@type": "Question", name: "What makes OGENCI different?", acceptedAnswer: { "@type": "Answer", text: "OGENCI focuses on measurable ROI over vanity metrics, treating every client as a growth partner, not a billable hour." } },
    ] } },
  ],
});

// Booking
routes.push({
  path: "/book",
  body: { title: "Book a Strategy Session with OGENCI", body: "Schedule a free strategy audit with OGENCI. We analyze your current digital presence, identify conversion gaps, and build a tailored growth plan that drives measurable ROI." },
  meta: { title: "Book a Strategy Session · OGENCI", description: "Schedule a free strategy audit with OGENCI. Let's analyze your current digital presence and build a growth plan that drives measurable ROI." },
  schemas: [
    { id: "ld-breadcrumb", json: { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Book a Session", item: `${SITE}/book` }] } },
  ],
});

// Work overview
routes.push({
  path: "/work",
  body: { title: "OGENCI Portfolio — Case Studies", body: "Explore OGENCI's portfolio of high-converting websites, digital platforms, and AI systems built for global businesses. Featuring Jonmoore International, ISA Ghana, BJH Logistics, Accra Grammar, Rich Jane School, and Wesleyan CM." },
  meta: { title: "Work — OGENCI Portfolio · Case Studies", description: "Explore OGENCI's portfolio of high-converting websites, digital platforms, and AI systems built for global businesses." },
  schemas: [
    { id: "ld-breadcrumb", json: { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Work", item: `${SITE}/work` }] } },
    { id: "ld-collection", json: { "@context": "https://schema.org", "@type": "CollectionPage", name: "OGENCI Portfolio — Case Studies", description: "Explore OGENCI's portfolio of high-converting websites, digital platforms, and AI systems.", url: `${SITE}/work`, mainEntity: { "@type": "ItemList", itemListElement: caseStudies.map((cs, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/work/${cs.slug}`, name: cs.client })) } } },
  ],
});

// Work detail pages
for (const cs of caseStudies) {
  routes.push({
    path: `/work/${cs.slug}`,
    body: { title: `${cs.client} — Case Study`, body: `${cs.solution} Industry: ${cs.industry}. OGENCI delivers high-converting digital ecosystems for global businesses.` },
    meta: { title: `${cs.client} — Case Study · OGENCI`, description: cs.solution.slice(0, 160) },
    schemas: [
      { id: "ld-breadcrumb", json: { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Work", item: `${SITE}/work` }, { "@type": "ListItem", position: 3, name: cs.client, item: `${SITE}/work/${cs.slug}` }] } },
    ],
  });
}

// Insights overview
routes.push({
  path: "/insights",
  body: { title: "OGENCI Growth Lab — Insights & Research", body: "Deep research on B2B conversion, attribution logic, autonomous AI agents, and tech regulations. Insights from OGENCI's team on building high-conversion interfaces and operational frameworks that drive predictable business growth." },
  meta: { title: "Insights — OGENCI Growth Lab · Research", description: "Deep research on B2B conversion, attribution logic, and autonomous operational frameworks that pay predictable business dividends." },
  schemas: [
    { id: "ld-breadcrumb", json: { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/insights` }] } },
    { id: "ld-collection", json: { "@context": "https://schema.org", "@type": "CollectionPage", name: "OGENCI Growth Lab — Insights & Research", description: "Deep research on B2B conversion, attribution logic, and autonomous operational frameworks.", url: `${SITE}/insights`, mainEntity: { "@type": "ItemList", itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/insights/${a.slug}`, name: a.title })) } } },
  ],
});

// Article detail pages
for (const article of articles) {
  const imageAbs = article.image.startsWith("http") ? article.image : `${SITE}${article.image}`;
  routes.push({
    path: `/insights/${article.slug}`,
    body: { title: article.title, body: article.desc },
    meta: { title: article.title, description: article.desc, image: imageAbs, type: "article" },
    schemas: [
      { id: "ld-breadcrumb", json: { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/insights` }, { "@type": "ListItem", position: 3, name: article.title, item: `${SITE}/insights/${article.slug}` }] } },
      { id: "ld-article", json: { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.desc, image: imageAbs, datePublished: article.date, author: { "@type": "Organization", name: "OGENCI Digital" }, publisher: { "@type": "Organization", name: "OGENCI Digital", logo: `${SITE}/favicon.svg` } } },
    ],
  });
}

// 404
routes.push({
  path: "/404",
  body: { title: "Page Not Found", body: "The page you're looking for doesn't exist. Please check the URL or return to the homepage." },
  meta: { title: "Page Not Found · OGENCI", description: "The page you're looking for doesn't exist.", noindex: true },
  schemas: [],
});
routes.push({
  path: "/404.html",
  body: { title: "Page Not Found", body: "The page you're looking for doesn't exist. Please check the URL or return to the homepage." },
  meta: { title: "Page Not Found · OGENCI", description: "The page you're looking for doesn't exist.", noindex: true },
  schemas: [],
});

// Generate all route files
for (const route of routes) {
  let html = injectMeta(template, { ...route.meta, path: route.path });
  html = injectJsonLd(html, route.schemas);
  if (route.body) {
    html = injectBody(html, route.body);
  }

  if (route.path === "/") {
    writeFileSync(resolve(dist, "index.html"), html);
    console.log(`✓ / → /index.html`);
  } else if (route.path === "/404.html") {
    writeFileSync(resolve(dist, "404.html"), html);
    console.log(`✓ /404.html → /404.html`);
  } else {
    const outPath = resolve(dist, route.path.slice(1), "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    console.log(`✓ ${route.path} → ${route.path}/index.html`);
  }
}

// Generate sitemap with lastmod dates
const today = new Date().toISOString().split("T")[0];
const sitemapRoutes = routes.filter(r => r.path !== "/404.html" && r.path !== "/404");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map(r => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${r.path === "/" ? "1.0" : r.path.startsWith("/work") || r.path.startsWith("/insights") ? "0.8" : "0.7"}</priority>
  </url>`).join("\n")}
</urlset>`;
writeFileSync(resolve(dist, "sitemap.xml"), sitemap);
console.log(`\n✅ Generated sitemap.xml with ${sitemapRoutes.length} URLs (lastmod: ${today})`);

console.log(`\n✅ Prerendered ${routes.length} routes to ${dist}`);
