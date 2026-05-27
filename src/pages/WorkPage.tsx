import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowUpRight, TrendingUp, Target } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import DarkCtaSection from "@/components/DarkCtaSection";
import PillBadge from "@/components/PillBadge";
import DotGrid from "@/components/DotGrid";
import BodyText from "@/components/BodyText";
import { useParallax } from "@/hooks/useParallax";
import { fadeUp, scaleIn } from "@/lib/animations";

const caseStudies = {
  "jonmoore": {
    client: "Jonmoore International",
    tagline: "Moving the Impossible Across West Africa",
    industry: "Heavy Logistics",
    location: "Tema, Ghana",
    service: "Enterprise Redesign",
    year: "2026 (Concept)",
    challenge: "Jonmoore executes 600-ton cargo operations that nobody else will touch, but their legacy website (jonmoore.com.gh) failed to reflect their 25+ years of ISO-certified authority. The outdated UI/UX obscured their prestigious BigMove Excellence Awards and created friction for high-value enterprise clients trying to request complex quotes.",
    solution: "We architected a premium, editorial-style digital experience that translates their physical engineering precision into a digital interface. By introducing a streamlined, conversion-optimized 'Request a Quote' flow and emphasizing their pristine safety record (1.2M+ man-hours without incident), the platform is designed to instantly convert high-ticket B2B leads.",
    stats: [
      { label: "Proj. Lead Lift", value: "185%" },
      { label: "Est. Bounce Drop", value: "-42%" },
      { label: "Brand Trust", value: "10x" },
    ],
    quote: "Most logistics partners are great until something goes wrong. We needed a digital presence that screams absolute reliability before the client even speaks to us.",
    author: "Hilton John Mitchell",
    role: "Chief Executive Officer"
  },
  "isa-ghana": {
    client: "International School of Accra",
    tagline: "Redefining Premium Education in West Africa",
    industry: "Education",
    location: "Accra, Ghana",
    service: "Enterprise Redesign",
    year: "2025",
    challenge: "The International School of Accra provides world-class blended curricula (Cambridge & IB), but their previous digital presence did not reflect the prestige of their institution. The admissions flow was disjointed, and the platform struggled to clearly communicate their unique value proposition to high-net-worth parents and expatriates.",
    solution: "We executed a full-scale enterprise redesign, transforming the platform into an immersive, editorial-style experience. By implementing a seamless, conversion-optimized admissions funnel and high-fidelity visual storytelling, we positioned ISA as the undisputed leader in progressive education in Ghana.",
    stats: [
      { label: "Admissions Lift", value: "+125%" },
      { label: "Prospect Engagement", value: "3.2x" },
      { label: "Mobile Bounce Rate", value: "-60%" },
    ],
    quote: "OGENCI completely elevated our digital presence. The new platform immediately commands the prestige our curriculum delivers, drastically increasing qualified admissions inquiries.",
    author: "Admissions Director",
    role: "International School of Accra"
  },
  "wesleyan": {
    client: "Wesleyan Charismatics",
    tagline: "Unleashing Global Revival Through Digital Connection",
    industry: "Non-Profit / Faith",
    location: "Global HQ: Indiana, USA",
    service: "Digital Transformation & AI",
    year: "2025",
    challenge: "WCIM is a global ministry with branches from the US to Ghana, yet their digital presence was fragmented. They needed a unified platform that could handle high-bandwidth livestreams, a complex global sermon archive, and a secure, multi-currency donation system that worked seamlessly across international borders.",
    solution: "We engineered a high-fidelity digital ecosystem centered on 'Digital Fellowship'. This included a custom-built low-latency streaming engine, an AI-powered sermon search index, and a streamlined global giving portal. The platform now serves as the digital heartbeat for thousands of members worldwide, unifying their global mission under one high-performance interface.",
    stats: [
      { label: "Stream Reach", value: "+310%" },
      { label: "Donation Lift", value: "+85%" },
      { label: "Global Engagement", value: "4.5x" },
    ],
    quote: "OGENCI didn't just build a website; they built a digital sanctuary. Our ability to connect with our global congregation has never been more powerful or seamless.",
    author: "Noah Raymoss Armah",
    role: "Founder & General Overseer"
  }
};

export default function WorkPage() {
  const [, params] = useRoute("/work/:slug");
  const slug = params?.slug || "jonmoore";

  const data = caseStudies[slug as keyof typeof caseStudies] || caseStudies["jonmoore"];

  const { y, opacity } = useParallax({ yInput: 1000, yOutput: 200, opacityInput: 300, opacityMin: 0 });

  return (
    <PageLayout showGridLines={false}>
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white pt-24 pb-12 px-6">
          <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] opacity-80 z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/20 blur-[150px] rounded-full mix-blend-screen" />
          </motion.div>

          <div className="relative z-20 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col items-center">
              <PillBadge variant="light">Case Study · {data.client}</PillBadge>

              <h1 className="text-5xl md:text-[8vw] font-display font-bold leading-[0.95] tracking-tighter mb-8 max-w-4xl">
                {data.tagline}
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="absolute bottom-12 left-0 w-full px-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-[10px] font-mono uppercase tracking-widest text-white/50 z-20 max-w-[1600px] mx-auto right-0"
          >
            <div className="flex flex-col gap-2">
              <span>Industry: <strong className="text-white">{data.industry}</strong></span>
              <span>Location: <strong className="text-white">{data.location}</strong></span>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <span>Services: <strong className="text-white">{data.service}</strong></span>
              <span>Year: <strong className="text-white">{data.year}</strong></span>
            </div>
          </motion.div>
        </section>

        {/* Main Content Area */}
        <div className="bg-background text-foreground relative z-30">

          {/* The Challenge & Solution */}
          <section className="px-6 py-20 md:py-32 border-b border-border">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
              <div className="md:col-span-5 md:col-start-2">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3">
                    <Target className="w-4 h-4 text-primary" /> The Challenge
                  </h3>
                  <p className="text-2xl md:text-3xl font-display leading-[1.3] text-foreground">
                    {data.challenge}
                  </p>
                </motion.div>
              </div>

              <div className="md:col-span-5 md:col-start-7">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3">
                    <ArrowUpRight className="w-4 h-4 text-primary" /> The Solution
                  </h3>
                  <p className="text-base font-mono leading-relaxed text-muted-foreground uppercase tracking-wider font-bold">
                    {data.solution}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Impact / Stats Grid */}
          <section className="px-6 py-20 md:py-32 bg-[#f4f1ea] border-b border-border">
            <div className="max-w-[1400px] mx-auto">
              <div className="mb-12 md:mb-20 text-center">
                  <h2 className="text-3xl md:text-6xl font-display font-bold tracking-tight">Business Impact</h2>
                <BodyText className="mt-4">Measurable growth engineered for scale.</BodyText>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border shadow-xl">
                {data.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background p-8 md:p-16 flex flex-col items-center justify-center text-center group hover:bg-card transition-colors"
                  >
                    <TrendingUp className="w-6 h-6 text-primary mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="text-5xl md:text-[84px] font-display font-bold tracking-tighter text-foreground mb-4 text-primary">
                      {stat.value}
                    </div>
                    <BodyText as="div">{stat.label}</BodyText>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Visual Showcase Placeholder */}
          <section className="py-20 md:py-32 px-6 overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex-1 aspect-[4/3] bg-muted border border-border rounded-xl overflow-hidden relative group">
                  <DotGrid size={16} opacity={0.1} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BodyText as="span">Premium Visual Asset 01</BodyText>
                  </div>
                </motion.div>
                <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex-1 aspect-[4/5] bg-foreground text-background border border-border rounded-xl overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BodyText className="opacity-50" as="span">Mobile Experience Showcase</BodyText>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Client Feedback - space reserved for real feedback */}
          <section className="px-6 py-20 md:py-32 bg-primary/5 border-y border-border">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <BodyText tracking="0.3em" className="text-primary mb-12" as="div">Client Feedback</BodyText>
              </motion.div>
            </div>
          </section>

          {/* Next Project / CTA */}
          <DarkCtaSection
            heading='Ready to <em class="italic font-normal text-primary">scale?</em>'
            description="Stop guessing. Start growing. Get a data-driven strategy custom-built for your business and the global market."
            primaryAction={{ label: "Let's Talk", href: "/book" }}
            secondaryAction={{ label: "Back to Home", href: "/" }}
          />
        </div>
      </main>
    </PageLayout>
  );
}
