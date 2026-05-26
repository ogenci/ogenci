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

const MONTH_INDEX: Record<string, number> = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
};

const createdAt: Record<string, number> = /* BIRTHTIMES */{};

export const sortedArticleKeys = Object.keys(articles).sort((a, b) => {
  const [aMonth, aYear] = articles[a].date.split(" ");
  const [bMonth, bYear] = articles[b].date.split(" ");
  const aNum = Number(aYear) * 12 + (MONTH_INDEX[aMonth] || 0);
  const bNum = Number(bYear) * 12 + (MONTH_INDEX[bMonth] || 0);
  if (aNum !== bNum) return bNum - aNum;
  return (createdAt[b] || 0) - (createdAt[a] || 0);
});

export default articles;
export const articleKeys = Object.keys(articles);
