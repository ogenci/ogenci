import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const allProjects = [
  {
    slug: "jonmoore",
    tag: "Enterprise Redesign · 01",
    meta: "2026 · LOGISTICS · GHANA",
    title: "Jonmoore",
    desc: "Premium conceptual redesign for West Africa's leading heavy logistics provider. Optimized for high-ticket B2B quote conversions.",
    bg: "#f3f4f6",
    text: "#0a0a0a",
    category: "Web Design",
    metric: "+185%",
    metricLabel: "Projected Lead Lift"
  },
  {
    slug: "isa-ghana",
    tag: "Enterprise Redesign · 02",
    meta: "2025 · EDUCATION · GHANA",
    title: "ISA Ghana",
    desc: "Premium digital transformation for the International School of Accra. Streamlined admissions funnel and immersive visual storytelling.",
    bg: "hsl(77, 100%, 38%)",
    text: "#0a0a0a",
    category: "Web Design",
    metric: "+125%",
    metricLabel: "Admissions Lift"
  },
  {
    slug: "bjh-logistics",
    tag: "Supply Chain Solutions · 03",
    meta: "2025 · LOGISTICS · GHANA",
    title: "BJH Logistics",
    desc: "Full-scale digital platform for a premium logistics firm. Integrated tracking, custom portal, and optimized booking flows.",
    bg: "#0a0a0a",
    text: "#ffffff",
    externalUrl: "https://bjh-logistics.vercel.app/",
    category: "Web Design",
    metric: "100%",
    metricLabel: "Digital Booking Flow"
  },
  {
    slug: "accra-grammar",
    tag: "Educational Branding · 04",
    meta: "2025 · EDUCATION · GHANA",
    title: "Accra Grammar",
    desc: "Complete digital identity and enrollment platform for one of Ghana's leading schools. Modern, accessible, and high-converting.",
    bg: "#ffffff",
    text: "#0a0a0a",
    externalUrl: "https://accra-grammar-school.vercel.app/",
    category: "Web Design",
    metric: "3x",
    metricLabel: "Online Applications"
  },
  {
    slug: "rich-jane-school",
    tag: "K-12 Digital Platform · 05",
    meta: "2024 · EDUCATION · GHANA",
    title: "Rich Jane School",
    desc: "An immersive, community-focused website for a premier preschool and primary institution. Optimized for parent engagement.",
    bg: "hsl(77, 100%, 38%)",
    text: "#0a0a0a",
    externalUrl: "https://rich-jane-school.vercel.app/",
    category: "Web Design",
    metric: "99.9%",
    metricLabel: "Parent Satisfaction"
  },
  {
    slug: "wesleyan",
    tag: "Digital Transformation · 06",
    meta: "2025 · NON-PROFIT · GLOBAL",
    title: "Wesleyan CM",
    desc: "A unified global digital sanctuary for a multi-national ministry. High-bandwidth streaming and global donation systems.",
    bg: "#0a0a0a",
    text: "#ffffff",
    externalUrl: "https://wesleyancm.org/",
    category: "AI & Automation",
    metric: "+310%",
    metricLabel: "Stream Reach Lift"
  }
];

export default function WorkOverviewPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <Header />

      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-y-0 left-6 xl:left-10 w-px bg-border/20 pointer-events-none" />
        <div className="absolute inset-y-0 right-6 xl:right-10 w-px bg-border/20 pointer-events-none" />

        <main className="px-6 py-12 md:py-24 relative z-10">
          
          {/* Header section */}
          <header className="mb-20 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-full text-[10px] font-mono mb-8 uppercase tracking-widest text-muted-foreground bg-background/50 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              OGENCI Portfolio · Selected Work
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-[84px] font-display font-bold leading-[1.02] tracking-tight mb-8">
              Digital infrastructure <br />
              that <em className="italic font-normal text-primary">converts</em>.
            </h1>

            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground leading-relaxed font-bold max-w-2xl">
              We design and engineer bespoke web platforms, paid advertising strategies, and automated AI systems for organizations looking to lead their industries globally.
            </p>
          </header>

          {/* Filtering bar */}
          <div className="flex flex-wrap gap-3 mb-16 border-b border-border pb-8">
            {["All", "Web Design", "AI & Automation"].map((filter) => (
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

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {filteredProjects.map((p, index) => {
              const isEven = index % 2 === 0;
              const yOffset = isEven ? "md:translate-y-0" : "md:translate-y-12";
              
              const CardContent = (
                <div className="group cursor-pointer">
                  {/* Visual container */}
                  <div
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 border border-border shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.01] flex flex-col items-center justify-center p-8 text-center"
                    style={{ backgroundColor: p.bg, color: p.text }}
                  >
                    {/* Glowing ambient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center relative z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-4">{p.tag}</span>
                      <h2 className="text-4xl sm:text-5xl font-display font-bold italic mb-6 leading-none">
                        {p.title}
                      </h2>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-75 max-w-xs leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    {/* Metric overlay */}
                    <div className="absolute bottom-6 right-6 bg-background/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 z-20">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <div className="text-left">
                        <div className="text-lg font-display font-bold leading-none" style={{ color: p.text === "#ffffff" ? "#baa626" : "hsl(77, 100%, 38%)" }}>
                          {p.metric}
                        </div>
                        <div className="text-[6px] font-mono uppercase tracking-widest opacity-60 mt-0.5 leading-none">
                          {p.metricLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metadatas */}
                  <div className="flex justify-between items-baseline mb-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    <span>{p.tag}</span>
                    <span>{p.meta}</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-3 flex items-center justify-between group-hover:text-primary transition-colors">
                    {p.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                  </h3>
                  
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground leading-relaxed max-w-md">
                    {p.desc}
                  </p>
                </div>
              );

              return p.externalUrl ? (
                <a
                  key={p.slug}
                  href={p.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block ${yOffset} transition-all`}
                >
                  {CardContent}
                </a>
              ) : (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className={`block ${yOffset} transition-all`}
                >
                  {CardContent}
                </Link>
              );
            })}
          </div>

          {/* Premium Bottom CTA */}
          <section className="mt-40 mb-20 px-6 py-24 rounded-3xl bg-[#0a0a0a] text-white relative overflow-hidden text-center">
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[180px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full text-[10px] font-mono mb-8 uppercase tracking-widest text-white/70">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Let's Partner on Your Growth
              </span>
              
              <h2 className="text-4xl md:text-7xl font-display font-bold leading-none tracking-tight mb-8">
                Ready to build something <em className="italic font-normal text-primary">remarkable</em>?
              </h2>
              
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 mb-12 font-bold leading-relaxed max-w-lg mx-auto">
                Reach out to our strategic engineering laboratory. Let's design a high-converting digital system tailored entirely to your metrics.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <div
                    className="px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 text-[10px] font-mono transition-transform hover:scale-105 cursor-pointer bg-primary text-background"
                  >
                    Let's Talk <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
                <Link href="/">
                  <button className="px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 text-[10px] font-mono text-white border border-white/20 hover:bg-white/10 transition-colors">
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
}
