import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import TagBadge from "@/components/TagBadge";
import FilterBar from "@/components/FilterBar";
import ArticleCard from "@/components/ArticleCard";
import BodyText from "@/components/BodyText";
import articles, { articleKeys } from "@/data/articles";

const MONTH_ORDER: Record<string, number> = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
};

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const sortedKeys = useMemo(() =>
    [...articleKeys].sort((a, b) => {
      const [aMonth, aYear] = articles[a].date.split(" ");
      const [bMonth, bYear] = articles[b].date.split(" ");
      if (aYear !== bYear) return Number(bYear) - Number(aYear);
      return (MONTH_ORDER[bMonth] || 0) - (MONTH_ORDER[aMonth] || 0);
    }),
    []
  );

  const featuredSlug = sortedKeys[0];
  const featured = articles[featuredSlug];

  const filteredArticleKeys = sortedKeys.filter((key) => {
    if (activeFilter === "All") return true;
    return articles[key].tag === activeFilter;
  });

  const filters = useMemo(() =>
    ["All", ...new Set(articleKeys.map(k => articles[k].tag))],
    []
  );

  return (
    <PageLayout>
      <main className="px-6 py-12 md:py-24 relative z-10">
        <PageHero
          badge="OGENCI Growth Lab · Insights & Research"
          heading={<>B2B conversion and <br /><em className="italic font-normal text-primary">scale intelligence</em>.</>}
          description="Deep, mathematical research on building high-conversion interfaces, attribution logic, and autonomous operational frameworks that pay predictable business dividends."
        />

        {/* Featured Article - Latest */}
        <Link href={`/insights/${featuredSlug}`}>
          <section className="mb-24 rounded-3xl border border-border relative overflow-hidden group cursor-pointer">
            <div className="relative h-[360px] md:h-[540px]">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <TagBadge variant="light">{featured.tag}</TagBadge>
                  <span className="text-[9px] font-mono text-white/60 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.08] tracking-tight text-white mb-4">
                  {featured.title}
                </h3>
                <BodyText className="text-white/70 line-clamp-2 mb-6 max-w-2xl">
                  {featured.desc}
                </BodyText>
                <div className="flex items-center gap-5 text-[10px] font-mono uppercase tracking-widest text-white/50">
                  <span>{featured.date}</span>
                  <span className="w-px h-4 bg-white/20" />
                  <span className="inline-flex items-center gap-1.5 text-primary group-hover:gap-2 transition-all">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Link>

        {/* Filtering bar */}
        <FilterBar
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticleKeys.map((key) => {
            const art = articles[key];
            return (
              <ArticleCard
                key={key}
                animated={false}
                tag={art.tag}
                title={art.title}
                desc={art.desc}
                date={art.date}
                readTime={art.readTime}
                image={art.image}
                slug={key}
              />
            );
          })}
        </div>
      </main>
    </PageLayout>
  );
}
