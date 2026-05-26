import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import FilterBar from "@/components/FilterBar";
import DarkCtaSection from "@/components/DarkCtaSection";

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
    bg: "hsl(var(--primary))",
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
    bg: "hsl(var(--primary))",
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

const filters = ["All", "Web Design", "AI & Automation"];

export default function WorkOverviewPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <PageLayout>
      <main className="px-6 py-12 md:py-24 relative z-10">
        <PageHero
          badge="OGENCI Portfolio · Selected Work"
          heading={<>Digital infrastructure <br />that <em className="italic font-normal text-primary">converts</em>.</>}
          description="We design and engineer bespoke web platforms, paid advertising strategies, and automated AI systems for organizations looking to lead their industries globally."
        />

        <FilterBar
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mb-48">
          {filteredProjects.map((p, index) => {
            const isEven = index % 2 === 0;
            const yOffset = isEven ? "md:translate-y-0" : "md:translate-y-12";

            const CardContent = (
              <div className="group cursor-pointer" data-cursor="project">
                {/* Visual container */}
                <div
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 border border-border shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.01] flex flex-col items-center justify-center p-8 text-center"
                  style={{ backgroundColor: p.bg, color: p.text }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center relative z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-4">{p.tag}</span>
                    <h2 className="text-4xl sm:text-5xl font-display font-bold italic mb-6 leading-none">
                      {p.title}
                    </h2>
                    <p className="text-[10px] font-mono uppercase tracking-widest font-bold opacity-75 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Metric overlay */}
                  <div className="absolute bottom-6 right-6 bg-background/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 z-20">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <div className="text-left">
                      <div className="text-lg font-display font-bold leading-none" style={{ color: p.text === "#ffffff" ? "#baa626" : "hsl(var(--primary))" }}>
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

                <p className="text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground leading-relaxed max-w-md">
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

        <DarkCtaSection
          heading='Ready to build something <em class="italic font-normal text-primary">remarkable</em>?'
          description="Reach out to our strategic engineering laboratory. Let's design a high-converting digital system tailored entirely to your metrics."
          primaryAction={{ label: "Let's Talk", href: "/book" }}
          secondaryAction={{ label: "Back to Home", href: "/" }}
        />
      </main>
    </PageLayout>
  );
}
