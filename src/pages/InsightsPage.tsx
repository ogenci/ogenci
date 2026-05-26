import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <Header />

      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-y-0 left-6 xl:left-10 w-px bg-border/20 pointer-events-none" />
        <div className="absolute inset-y-0 right-6 xl:right-10 w-px bg-border/20 pointer-events-none" />

        <main className="px-6 py-12 md:py-24 relative z-10">
          
          {/* Hero Section */}
          <header className="mb-20 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-full text-[10px] font-mono mb-8 uppercase tracking-widest text-muted-foreground bg-background/50 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              OGENCI Growth Lab · Insights & Research
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-[84px] font-display font-bold leading-[1.02] tracking-tight mb-8">
              B2B conversion and <br />
              <em className="italic font-normal text-primary">scale intelligence</em>.
            </h1>

            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground leading-relaxed font-bold max-w-2xl">
              Deep, mathematical research on building high-conversion interfaces, attribution logic, and autonomous operational frameworks that pay predictable business dividends.
            </p>
          </header>

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
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border border-white/30 text-white/90">
                      {featured.tag}
                    </span>
                    <span className="text-[9px] font-mono text-white/60 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.08] tracking-tight text-white mb-4">
                    {featured.title}
                  </h3>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 font-bold leading-relaxed line-clamp-2 mb-6 max-w-2xl">
                    {featured.desc}
                  </p>
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
          <div className="flex flex-wrap gap-3 mb-16 border-b border-border pb-8">
            {["All", "Web Design", "Paid Ads", "AI Integration", "Tech Regulation"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-foreground text-background border-foreground shadow-lg"
                    : "bg-background text-foreground border-border hover:border-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticleKeys.map((key) => {
              const art = articles[key];
              return (
                <Link key={key} href={`/insights/${key}`}>
                <div
                  className="border border-border rounded-xl bg-background hover:bg-card cursor-pointer group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Cover image */}
                  <div className="relative h-[200px] w-full overflow-hidden flex-shrink-0">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                        {art.tag}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-3">
                      {art.title}
                    </h3>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground leading-relaxed line-clamp-3">
                      {art.desc}
                    </p>

                    <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-muted-foreground border-t border-border pt-4 mt-6">
                      <span>{art.date}</span>
                      <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                        Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
                </Link>
              );
            })}
          </div>

        </main>

        <Footer />
      </div>

    </div>
  );
}
