export interface Article {
  tag: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  const parts = raw.split("---");
  if (parts.length < 3) {
    return { frontmatter: {}, body: raw };
  }
  const frontmatter: Record<string, string> = {};
  for (const line of parts[1].trim().split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    frontmatter[key] = value;
  }
  return { frontmatter, body: parts.slice(2).join("---").trim() };
}

const modules = import.meta.glob("/src/content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const articles: Record<string, Article> = {};

const sanitize = (s: string) => s.replace(/—/g, "-");

for (const [filepath, raw] of Object.entries(modules)) {
  const slug = filepath.split("/").pop()?.replace(/\.md$/, "");
  if (!slug) continue;
  const { frontmatter, body } = parseFrontmatter(raw);
  articles[slug] = {
    tag: sanitize(frontmatter.tag || ""),
    title: sanitize(frontmatter.title || ""),
    desc: sanitize(frontmatter.desc || ""),
    date: sanitize(frontmatter.date || ""),
    readTime: sanitize(frontmatter.readTime || ""),
    image: sanitize(frontmatter.image || ""),
    content: sanitize(body),
  };
}

export default articles;
export const articleKeys = Object.keys(articles);
