import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import FilterBar from "@/components/FilterBar";
import DarkCtaSection from "@/components/DarkCtaSection";
import { PageSEO } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/JsonLd";

const allProjects = [
  {
    slug: "jonmoore",
    tag: "Enterprise Redesign · 01",
    meta: "2026 · LOGISTICS · GHANA",
    title: "Jonmoore",
    desc: "Premium conceptual redesign for West Africa's leading heavy logistics provider. Optimized for high-ticket B2B quote conversions.",
    bg: "#f3f4f6",
    text: "#0a0a0a",
    externalUrl: "https://jonmoore-international-ltd.vercel.app/",
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
    externalUrl: "http://isaghana.com/",
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
  },
  {
    slug: "aris-elevation",
    tag: "Educational Design · 07",
    meta: "2025 · EDUCATION · GHANA",
    title: "Al-Rayan International School",
    desc: "Elevated enrollment enquiries with a culturally-rich, modern digital identity.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://aris-elevation.vercel.app",
    category: "Web Design",
    metric: "+95%",
    metricLabel: "Enrolment Enquiries"
  },
  {
    slug: "british-international-school-ghana",
    tag: "Educational Design · 08",
    meta: "2025 · EDUCATION · GHANA",
    title: "British International School, Ghana",
    desc: "Lifted admissions conversions through a streamlined premium parent journey.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://british-international-school-ghana.vercel.app",
    category: "Web Design",
    metric: "+125%",
    metricLabel: "Admissions Lift"
  },
  {
    slug: "gis-red",
    tag: "Educational Design · 09",
    meta: "2025 · EDUCATION · GHANA",
    title: "Ghana International School",
    desc: "Redesigned the digital experience to reflect academic prestige and heritage.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://gis-red.vercel.app",
    category: "Web Design",
    metric: "+70%",
    metricLabel: "Prospect Engagement"
  },
  {
    slug: "faith-ascendant",
    tag: "Educational Design · 10",
    meta: "2025 · EDUCATION · GHANA",
    title: "Faith Montessori School",
    desc: "Built a warm, trust-first website that communicates the school's nurturing ethos.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://faith-ascendant.vercel.app",
    category: "Web Design",
    metric: "+85%",
    metricLabel: "Parent Enquiries"
  },
  {
    slug: "lincoln-edu",
    tag: "Educational Design · 11",
    meta: "2025 · EDUCATION · GHANA",
    title: "Lincoln Community School",
    desc: "Optimised the admissions funnel with a clear, mobile-first prospectus flow.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://lincoln-edu.vercel.app",
    category: "Web Design",
    metric: "+60%",
    metricLabel: "Application Completion"
  },
  {
    slug: "eais-elevated-experience",
    tag: "Educational Design · 12",
    meta: "2025 · EDUCATION · GHANA",
    title: "East Airport International School",
    desc: "Crafted an elevated digital presence that mirrors the quality of the classroom experience.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://eais-elevated-experience.vercel.app",
    category: "Web Design",
    metric: "+110%",
    metricLabel: "Tour Bookings"
  },
  {
    slug: "hcagh",
    tag: "Educational Design · 13",
    meta: "2025 · EDUCATION · GHANA",
    title: "Harvest Christian Academy",
    desc: "Modernised the school's online face with a values-centred, conversion-driven design.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://hcagh.vercel.app",
    category: "Web Design",
    metric: "+75%",
    metricLabel: "Online Applications"
  },
  {
    slug: "lic-edu",
    tag: "Educational Design · 14",
    meta: "2025 · EDUCATION · GHANA",
    title: "Life International College",
    desc: "Streamlined the entire inquiry-to-admissions path with a clean, authoritative interface.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://lic-edu.vercel.app",
    category: "Web Design",
    metric: "+90%",
    metricLabel: "Inquiry Conversion"
  },
  {
    slug: "new-nation-school-redesign",
    tag: "Educational Design · 15",
    meta: "2025 · EDUCATION · GHANA",
    title: "New Nation School",
    desc: "Redesigned the digital presence to reflect a modern, forward-thinking educational environment.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://new-nation-school-redesign.vercel.app",
    category: "Web Design",
    metric: "+80%",
    metricLabel: "Enrolment Interest"
  },
  {
    slug: "angels-school",
    tag: "Educational Design · 16",
    meta: "2025 · EDUCATION · GHANA",
    title: "Angels School",
    desc: "Crafted a warm, nurturing online experience that mirrors the school's caring ethos.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://angels-school.vercel.app",
    category: "Web Design",
    metric: "+65%",
    metricLabel: "Parent Engagement"
  },
  {
    slug: "dayspring-montessori-international",
    tag: "Educational Design · 17",
    meta: "2025 · EDUCATION · GHANA",
    title: "Dayspring Montessori International",
    desc: "Created a warm, modern interface emphasizing child-centered learning and Montessori values.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://dayspring-montessori-international.vercel.app",
    category: "Web Design",
    metric: "+90%",
    metricLabel: "Prospect Engagement"
  },
  {
    slug: "svis-virid",
    tag: "Educational Design · 18",
    meta: "2025 · EDUCATION · GHANA",
    title: "SVIS",
    desc: "Modernised the school's digital face with a clean, high-converting admissions experience.",
    bg: "#faf9f6",
    text: "#0a0a0a",
    externalUrl: "https://svis-virid.vercel.app",
    category: "Web Design",
    metric: "+70%",
    metricLabel: "Online Applications"
  },
];

const filters = ["All", "Web Design", "AI & Automation"];

export default function WorkOverviewPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const filteredProjects = activeFilter === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <PageLayout>
      <PageSEO
        title="Work — OGENCI Portfolio · Case Studies"
        description="Explore OGENCI's portfolio of high-converting websites, digital platforms, and AI systems built for global businesses."
        path="/work"
      />
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
      ]} />
      <main className="px-6 py-12 md:py-24 relative z-10">
        <PageHero
          badge="OGENCI Portfolio · Selected Work"
          heading={<>Digital infrastructure <br />that <em className="italic font-normal text-primary">converts</em>.</>}
          description="We design and engineer bespoke web platforms, paid advertising strategies, and automated AI systems for organizations looking to lead their industries globally."
        />

        <div className="max-w-[1600px] mx-auto">
          <FilterBar
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mb-48">
          {filteredProjects.map((p) => {
            const imgSrc = p.externalUrl
              ? `/images/${new URL(p.externalUrl).hostname}.png`
              : `/images/${p.slug}.vercel.app.png`;

            const imgFailed = failedImages.has(p.slug);

            const CardContent = (
              <div className="group flex flex-col justify-between cursor-pointer" data-cursor="project">
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-border shadow-md bg-[#faf9f6] flex flex-col justify-center items-center p-4">
                    {imgFailed ? (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        style={{ backgroundColor: p.bg, color: p.text }}
                      >
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-4">{p.tag}</span>
                        <h2 className="text-2xl font-display font-bold italic">{p.title}</h2>
                      </div>
                    ) : (
                      <img
                        src={imgSrc}
                        alt={p.title}
                        onError={() => setFailedImages(prev => new Set(prev).add(p.slug))}
                        className="w-full h-full object-contain rounded-xl transition-all duration-700 group-hover:scale-[1.02]"
                      />
                    )}
                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-md border border-border rounded-xl px-4 py-2 flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      <div className="text-left">
                        <div className="text-base font-display font-bold leading-none text-primary">{p.metric}</div>
                        <div className="text-[5px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5 font-bold leading-none">{p.metricLabel}</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[9px] font-mono uppercase tracking-wider font-bold text-muted-foreground leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-widest border-b border-border pb-1 hover:text-primary hover:border-primary transition-all duration-300 w-fit">
                  View Case Study <ArrowUpRight className="w-3 h-3 text-primary" />
                </span>
              </div>
            );

            return p.externalUrl ? (
              <a
                key={p.slug}
                href={p.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all"
              >
                {CardContent}
              </a>
            ) : (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="block transition-all"
              >
                {CardContent}
              </Link>
            );
          })}
          </div>
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
