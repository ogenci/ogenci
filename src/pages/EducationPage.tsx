import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { PageSEO } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { fadeUp, scaleIn } from "@/lib/animations";

const transformations = [
  {
    name: "Al-Rayan International School",
    improvement: "Elevated enrollment enquiries with a culturally-rich, modern digital identity.",
    metric: "+95%",
    metricLabel: "Enrolment Enquiries",
    slug: "aris-elevation",
    url: "https://aris-elevation.vercel.app",
  },
  {
    name: "British International School, Ghana",
    improvement: "Lifted admissions conversions through a streamlined premium parent journey.",
    metric: "+125%",
    metricLabel: "Admissions Lift",
    slug: "british-international-school-ghana",
    url: "https://british-international-school-ghana.vercel.app",
  },
  {
    name: "Ghana International School",
    improvement: "Redesigned the digital experience to reflect academic prestige and heritage.",
    metric: "+70%",
    metricLabel: "Prospect Engagement",
    slug: "gis-red",
    url: "https://gis-red.vercel.app",
  },
  {
    name: "Faith Montessori School",
    improvement: "Built a warm, trust-first website that communicates the school's nurturing ethos.",
    metric: "+85%",
    metricLabel: "Parent Enquiries",
    slug: "faith-ascendant",
    url: "https://faith-ascendant.vercel.app",
  },
  {
    name: "Lincoln Community School",
    improvement: "Optimised the admissions funnel with a clear, mobile-first prospectus flow.",
    metric: "+60%",
    metricLabel: "Application Completion",
    slug: "lincoln-edu",
    url: "https://lincoln-edu.vercel.app",
  },
  {
    name: "East Airport International School",
    improvement: "Crafted an elevated digital presence that mirrors the quality of the classroom experience.",
    metric: "+110%",
    metricLabel: "Tour Bookings",
    slug: "eais-elevated-experience",
    url: "https://eais-elevated-experience.vercel.app",
  },
  {
    name: "Harvest Christian Academy",
    improvement: "Modernised the school's online face with a values-centred, conversion-driven design.",
    metric: "+75%",
    metricLabel: "Online Applications",
    slug: "hcagh",
    url: "https://hcagh.vercel.app",
  },
  {
    name: "Life International College",
    improvement: "Streamlined the entire inquiry-to-admissions path with a clean, authoritative interface.",
    metric: "+90%",
    metricLabel: "Inquiry Conversion",
    slug: "lic-edu",
    url: "https://lic-edu.vercel.app",
  },
  {
    name: "AGS International School",
    improvement: "Tripled online applications with a heritage-first digital identity.",
    metric: "3x",
    metricLabel: "Online Applications",
    slug: "accra-grammar-school",
    url: "https://accra-grammar-school.vercel.app",
  },
  {
    name: "New Nation School",
    improvement: "Redesigned the digital presence to reflect a modern, forward-thinking educational environment.",
    metric: "+80%",
    metricLabel: "Enrolment Interest",
    slug: "new-nation-school-redesign",
    url: "https://new-nation-school-redesign.vercel.app",
  },
  {
    name: "Angels School",
    improvement: "Crafted a warm, nurturing online experience that mirrors the school's caring ethos.",
    metric: "+65%",
    metricLabel: "Parent Engagement",
    slug: "angels-school",
    url: "https://angels-school.vercel.app",
  },
  {
    name: "Rich Jane School",
    improvement: "Built an immersive, community-focused platform driving exceptional parent satisfaction.",
    metric: "99.9%",
    metricLabel: "Parent Satisfaction",
    slug: "rich-jane-school",
    url: "https://rich-jane-school.vercel.app",
  },
  {
    name: "Dayspring Montessori International",
    improvement: "Created a warm, modern interface emphasizing child-centered learning and Montessori values.",
    metric: "+90%",
    metricLabel: "Prospect Engagement",
    slug: "dayspring-montessori-international",
    url: "https://dayspring-montessori-international.vercel.app",
  },
  {
    name: "SVIS",
    improvement: "Modernised the school's digital face with a clean, high-converting admissions experience.",
    metric: "+70%",
    metricLabel: "Online Applications",
    slug: "svis-virid",
    url: "https://svis-virid.vercel.app",
  },
];

export default function EducationPage() {
  return (
    <PageLayout>
      <PageSEO
        title="Education Sector Redesigns — OGENCI"
        description="We craft premium digital experiences for educational institutions. Elevate your school's online prestige, build trust, and optimize admissions journeys."
        path="/education"
      />
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Education", path: "/education" },
      ]} />

      <main className="relative z-10">

        {/* ─── HERO ─── */}
        <section className="pt-24 pb-20 md:pt-32 md:pb-20 px-6">
          <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-3xl flex flex-col items-center"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6 font-bold">
                Education-Focused Digital Experiences
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-[60px] font-display font-bold leading-[1.05] tracking-tight mb-8 text-foreground text-balance">
                Your School's Website Should Reflect the <em className="italic font-normal text-primary">Quality of Education</em> You Provide.
              </h1>
              <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground leading-relaxed max-w-2xl mb-12 font-bold">
                For many families, your website is the first interaction they have with your institution. We create modern educational experiences that build trust, elevate perception, and help schools present themselves with confidence.
              </p>
              <PrimaryButton href="/book?ref=education_hero" icon="arrow-up-right">
                Request a Website Review
              </PrimaryButton>
            </motion.div>
          </div>
        </section>

        {/* ─── SECTION 3: FEATURED TRANSFORMATIONS ─── */}
        <section id="featured-transformations" className="px-6 py-20 md:py-32 bg-card border-b border-border/50">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-16 max-w-2xl"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4 block font-bold">
                Selected Work
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight mb-6">
                Featured Transformations
              </h2>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground leading-relaxed">
                Each project represents a strategic rethinking of how an institution presents itself to prospective families.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {transformations.map((proj, i) => (
                <motion.a
                  key={i}
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-border shadow-md bg-[#faf9f6] flex flex-col justify-center items-center p-4">
                      <img
                        src={`/images/${proj.slug}.vercel.app.png`}
                        alt={proj.name}
                        className="w-full h-full object-contain rounded-xl transition-all duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-md border border-border rounded-xl px-4 py-2 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        <div className="text-left">
                          <div className="text-base font-display font-bold leading-none text-primary">{proj.metric}</div>
                          <div className="text-[5px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5 font-bold leading-none">{proj.metricLabel}</div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-[9px] font-mono uppercase tracking-wider font-bold text-muted-foreground leading-relaxed mb-6">
                      {proj.improvement}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-widest border-b border-border pb-1 hover:text-primary hover:border-primary transition-all duration-300 w-fit">
                    View Live Site <ArrowUpRight className="w-3 h-3 text-primary" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: EMOTIONAL CLOSE + CTA ─── */}
        <section className="px-6 py-24 md:py-40 bg-[#f4f1ea] border-b border-border/50">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-7 max-w-2xl"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6 block font-bold">
                Make the Right Impression
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-[56px] font-display font-bold leading-[1.05] tracking-tight mb-8">
                Your website is often the first impression parents experience of your institution.
              </h2>
              <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground leading-relaxed max-w-xl mb-12 font-bold">
                Let's make it reflect the standard of education you already deliver.
              </p>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton href="/book?ref=education_cta_review" icon="arrow-right" shadow>
                  Request a Review
                </PrimaryButton>
                <SecondaryButton href="/book?ref=education_cta_preview" icon="arrow-up-right">
                  See What Your School Could Look Like
                </SecondaryButton>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/60 bg-background p-4 flex items-center justify-center group">
                <img
                  src="/images/final_cta.png"
                  alt="School website redesign preview"
                  className="w-full h-full object-contain rounded-2xl transition-transform duration-[2000ms] ease-out group-hover:translate-y-[-4px]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── SECTION 5: FOOTER DISCLOSURE ─── */}
        <section className="px-6 py-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="border-t border-border/20 pt-8">
              <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-muted-foreground/40 block mb-2">
                About These Transformations
              </span>
              <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/45 leading-relaxed max-w-3xl">
                The work featured on this page includes independent concept redesigns developed by OGENCI to demonstrate strategic opportunities for educational institutions. These projects showcase our thinking around user experience, admissions journeys, institutional branding, and modern web design. They are not affiliated with or endorsed by the institutions shown unless otherwise stated.
              </p>
            </div>
          </div>
        </section>

      </main>
    </PageLayout>
  );
}
