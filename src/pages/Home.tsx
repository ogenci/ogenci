import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import {
  Clock,
  ArrowRight, ArrowUpRight, CheckCircle2
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import AmbientGlow from "@/components/AmbientGlow";
import PillBadge from "@/components/PillBadge";
import { Image } from "@/components/Image";
import SectionRule from "@/components/SectionRule";
import SectionHeader from "@/components/SectionHeader";
import SectionFooter from "@/components/SectionFooter";
import BodyText from "@/components/BodyText";
import FormField from "@/components/FormField";
import AuthorAvatar from "@/components/AuthorAvatar";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import ArticleCard from "@/components/ArticleCard";
import ProjectCard from "@/components/ProjectCard";
import { fadeUp, fadeInRight, scaleIn } from "@/lib/animations";
import articles, { sortedArticleKeys } from "@/data/articles";

const testimonials = [
  {
    quote: "OGENCI redesigned our e-commerce site and our conversion rate jumped 340% in 60 days. They understand the Ghanaian market deeply.",
    name: "Ama Asante",
    role: "Founder, Kente and Co, Accra",
    initial: "A",
  },
  {
    quote: "Their Meta Ads campaigns cut our cost per lead by 60% while tripling our sales pipeline. Best investment we have made as a startup.",
    name: "Kofi Mensah",
    role: "CEO, BuildRight Ghana, Kumasi",
    initial: "K",
  },
  {
    quote: "The AI chatbot OGENCI built handles 70% of our customer queries automatically. Our support team can now focus on complex cases.",
    name: "Abena Owusu",
    role: "Operations Lead, AfriPay, Accra",
    initial: "A",
  },
];

const formFields = [
  { label: "Your name", key: "name" as const, placeholder: "Kwame Asante", type: "text" },
  { label: "Business name", key: "businessName" as const, placeholder: "BuildRight Ghana Ltd", type: "text" },
  { label: "Email address", key: "email" as const, placeholder: "kwame@yourcompany.com.gh", type: "email" },
  { label: "Phone or WhatsApp", key: "phone" as const, placeholder: "+233 XX XXX XXXX", type: "tel" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [pricingService, setPricingService] = useState('Web Design');
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    services: [] as string[],
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ type: 'idle' });

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      setStatus({ type: 'error', message: 'Please select at least one service.' });
      return;
    }

    setStatus({ type: 'loading' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send enquiry');
      }

      setStatus({ type: 'success', message: 'Message sent! We\'ll be in touch soon.' });
      setFormData({ name: "", businessName: "", email: "", phone: "", services: [] });
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
    }
  };

  const updateField = (key: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const pricingPlans = {
    'Web Design': [
      {
        name: 'Starter Site', price: '750', isMonthly: false,
        desc: 'Performance-optimized single-page landing site for maximum conversion.',
        features: ['UI/UX Strategy', 'Mobile-First Design', 'SEO Optimization', '1 Revision Round', '3-Day Delivery']
      },
      {
        name: 'Growth Site', price: '1,800', isMonthly: false,
        desc: 'Full multi-page ecosystem with custom CMS and performance logic.',
        features: ['Full Design System', 'Custom CMS Setup', 'Conversion Copywriting', 'Speed Optimization', 'Priority Launch'],
        popular: true
      },
      {
        name: 'Enterprise', price: '3,500', isMonthly: false,
        desc: 'High-scale e-commerce or custom web platform for global brands.',
        features: ['Full Funnel Arch.', 'Payment Gateway Int.', 'Advanced Analytics', 'Unlimited Revisions', '24/7 Tech Support']
      },
    ],
    'Paid Ads': [
      {
        name: 'Single Channel', price: '500', isMonthly: true,
        desc: 'Focus on Meta or Google Ads to drive targeted traffic fast.',
        features: ['Single Platform Opt.', 'Ad Creative (3 sets)', 'Pixel/Tag Setup', 'Weekly Reporting', 'Budget Optimization']
      },
      {
        name: 'Omnichannel', price: '1,200', isMonthly: true,
        desc: 'Integrated Meta + Google + TikTok strategy for massive reach.',
        features: ['Multi-Channel Funnel', 'Dynamic Creative', 'Full Attribution', 'Bi-Weekly Strategy', 'Audience Scaling'],
        popular: true
      },
      {
        name: 'Performance Max', price: '2,500', isMonthly: true,
        desc: 'Full-funnel takeover with massive ad spend scale and precision.',
        features: ['Full Media Buying', 'High-Prod Creative', 'Competitor Hijacking', 'Daily Optimization', 'Dedicated Media Lead']
      },
    ],
    'AI Integrations': [
      {
        name: 'AI Chatbot', price: '800', isMonthly: true,
        desc: '24/7 customer support and lead qualification for WhatsApp/Web.',
        features: ['Custom Training', 'Lead Qual Flow', 'WhatsApp/Web Int.', 'Analytics Dashboard', 'Monthly Retraining']
      },
      {
        name: 'Automation Hub', price: '1,800', isMonthly: true,
        desc: 'End-to-end workflow and CRM automation for your sales team.',
        features: ['CRM Integration', 'Automated Follow-ups', 'Custom API Connect', 'Error Monitoring', 'Team AI Training'],
        popular: true
      },
      {
        name: 'AI Lab', price: '3,800', isMonthly: true,
        desc: 'Custom AI model training and agent deployment for your enterprise.',
        features: ['Private Model Train', 'Custom Agent Dev', 'Workflow Overhaul', 'Legacy App Int.', '24/7 Dedicated Ops']
      },
    ]
  };

  return (
    <PageLayout>
      <main>
        {/* SEC 1: Hero */}
        <section id="top" className="py-24 px-6 flex flex-col items-center text-center overflow-hidden relative">
          <AmbientGlow opacity={0.05} blur={120} size={800} />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-5xl mx-auto flex flex-col items-center"
          >
            <PillBadge>Digital Agency · Rooted in Africa · Built for the World</PillBadge>

            <h1 className="text-5xl sm:text-6xl md:text-[84px] font-display font-bold leading-[1.02] tracking-tight mb-8 text-foreground max-w-4xl">
              Websites that <em className="italic font-normal text-primary">convert</em>, ads that <em className="italic font-normal text-primary">pay ROIs</em>, AI that <em className="italic font-normal text-primary">scales</em>.
            </h1>

            <BodyText className="mb-12 max-w-2xl">
              Beautiful websites and expensive ads don't scale businesses-revenue does. OGENCI builds the high-converting digital infrastructure that turns your traffic into predictable, data-backed profit globally.
            </BodyText>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <PrimaryButton href="/book" shadow>Let's Talk</PrimaryButton>
              <SecondaryButton href="#work">See Our Work</SecondaryButton>
            </div>

            <div className="mt-12 flex items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-background/50 backdrop-blur-sm px-4 py-2 border border-border rounded-full">
              <span>Strategy · Design · Ads · AI · Growth</span>
              <span className="opacity-30">|</span>
              <span>Rooted in Africa · Serving the World</span>
            </div>
          </motion.div>
        </section>

        {/* SEC 3: Why OGENCI */}
        <section id="why" className="px-6 pt-16 pb-32 bg-[#f4f1ea] border-y border-border/50">
          <div className="max-w-[1400px] mx-auto">
            <SectionRule num="II." title="Why OGENCI · Performance Marketing · Global Scale" page="002/008" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-xl"
              >
                <BodyText tracking="0.3em" className="mb-12" as="div">
                  Why OGENCI · 02
                </BodyText>
                <h2 className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight mb-10 text-foreground">
                  We treat <em className="italic font-normal font-serif text-primary">your business</em> like a <em className="italic font-normal font-serif">growth partner</em>, not a billable hour.
                </h2>
                <BodyText className="mb-10">
                  Stop paying for <span className="text-primary">pretty pages</span> and vanity metrics. OGENCI replaces guesswork with <span className="text-primary">high-converting pipelines</span> engineered for global performance. We optimize every site, ad, and automation for international user behaviors and seamless scaling to lower your acquisition costs and maximize your revenue.
                </BodyText>
                <motion.a
                  initial="initial"
                  whileHover="hover"
                  href="#process"
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] border-b-2 border-primary pb-1 hover:text-primary transition-all"
                >
                  See how we work
                  <motion.span variants={{ initial: { x: 0 }, hover: { x: 5 } }}>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </motion.span>
                </motion.a>
              </motion.div>

              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-[40px] overflow-hidden aspect-square shadow-2xl border border-white/20">
                  <Image
                    src="/ogenci_digital_hub_collage.png"
                    alt="Digital Hub & Growth Engine"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute top-1/2 -right-12 -translate-y-1/2 rotate-90 hidden xl:block">
                  <BodyText tracking="0.4em" className="whitespace-nowrap" as="span">
                    OGENCI · Digital Growth · 2026
                  </BodyText>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SEC 4: Services */}
        <section id="services" className="px-6 pt-24 pb-32 bg-card border-b border-border/50">
          <div className="max-w-[1400px] mx-auto">
            <SectionRule num="III." title="Services · Growth Pipelines · Performance Marketing" page="003/008" />

            <div className="mt-20 mb-24">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight text-foreground max-w-5xl"
              >
                Everything needed to <em className="italic font-normal font-serif text-primary">dominate</em> digital markets <em className="italic font-normal font-serif">globally</em>.
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
              {[
                {
                  num: "01",
                  tag: "Web Design",
                  title: "Conversion Architecture",
                  desc: "High-performance, conversion-first digital ecosystems engineered for global brands. We don't just build websites; we build predictable revenue machines that work anywhere.",
                  features: ["UI/UX Strategy", "Mobile-First Dev", "Speed Optimization", "Conversion Flow"]
                },
                {
                  num: "02",
                  tag: "Paid Ads",
                  title: "Performance Marketing",
                  desc: "Surgical Meta, Google, and TikTok ad campaigns that reach your ideal customer at the lowest cost. We focus exclusively on ROAS and pipeline value, not vanity metrics like 'likes' or 'shares'.",
                  features: ["Ad Creative", "Media Buying", "Funnel Building", "Data Attribution"]
                },
                {
                  num: "03",
                  tag: "AI Integrations",
                  title: "AI & Automation Lab",
                  desc: "Deploy custom AI agents that handle lead qualification, customer support, and sales follow-ups 24/7. Reclaim 40% of your team's time and ensure no lead ever goes cold again.",
                  features: ["AI Chatbots", "Workflow Automation", "CRM Integration", "Custom AI Agents"]
                }
              ].map(({ num, tag, title, desc, features }) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-background p-6 md:p-10 flex flex-col justify-between group hover:bg-muted/30 transition-colors cursor-default"
                >
                  <div>
                    <div className="flex justify-between items-start mb-12">
                      <BodyText className="text-primary" as="span">{tag}</BodyText>
                      <span className="text-[10px] font-mono text-muted-foreground">{num}</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-6 text-foreground group-hover:text-primary transition-colors">{title}</h3>
                    <BodyText className="mb-10">{desc}</BodyText>
                  </div>
                  <div className="space-y-3">
                    {features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-widest text-muted-foreground border-t border-border pt-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEC 5: Pricing */}
        <section id="pricing" className="px-6 pt-24 pb-32 bg-[#f4f1ea] border-y border-border/50">
          <div className="max-w-[1400px] mx-auto">
            <SectionRule num="IV." title="Pricing · Investment Packages · Growth Pipelines" page="004/008" />

            <div className="mt-20 mb-24 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight text-foreground max-w-3xl"
              >
                Pricing built for <em className="italic font-normal font-serif text-primary">scale</em>, not for <em className="italic font-normal font-serif">billing hours</em>.
              </motion.h2>
              <BodyText className="pb-4 border-b border-border" as="div">
                Monthly retainers · No hidden fees · Global Standards
              </BodyText>
            </div>

            <div className="flex flex-wrap gap-4 mb-20">
              {['Web Design', 'Paid Ads', 'AI Integrations'].map((service) => (
                <button
                  key={service}
                  onClick={() => setPricingService(service)}
                  className={`px-8 py-3 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border transition-all duration-300 ${pricingService === service ? 'bg-foreground text-background border-foreground shadow-lg' : 'bg-background text-foreground border-border hover:border-primary'}`}
                >
                  {service}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={pricingService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
              >
                {(pricingPlans[pricingService as keyof typeof pricingPlans] || []).map((plan) => (
                  <motion.div
                    key={plan.name}
                    data-cursor="plan"
                    className={`relative p-6 md:p-10 flex flex-col justify-between border-2 transition-all duration-500 ${plan.popular ? 'bg-foreground text-background border-primary shadow-2xl scale-105 z-10' : 'bg-background text-foreground border-border hover:border-primary'}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-[9px] font-mono font-bold uppercase tracking-widest bg-primary text-background rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div>
                      <div className="mb-8">
                        <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[20px] md:text-[24px] font-display font-light">$</span>
                          <span className="text-[48px] md:text-[64px] font-display font-bold tracking-tight">{plan.price}</span>
                          {plan.isMonthly && (
                            <span className="text-xs font-mono uppercase tracking-widest opacity-60">/mo</span>
                          )}
                        </div>
                      </div>
                      <p className={`text-[10px] font-mono uppercase tracking-widest leading-relaxed mb-10 ${plan.popular ? 'text-background/70' : 'text-muted-foreground'}`}>
                        {plan.desc}
                      </p>
                      <div className="space-y-4 mb-12">
                        {plan.features.map(f => (
                          <div key={f} className={`flex items-center gap-3 text-[9px] font-mono uppercase tracking-widest border-t pt-4 ${plan.popular ? 'border-background/10' : 'border-border'}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full cursor-not-allowed">
                      <button
                        disabled
                        className={`w-full py-4 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest cursor-not-allowed ${plan.popular
                            ? 'bg-background/10 text-background/50'
                            : 'bg-foreground/10 text-foreground/50'
                          }`}
                      >
                        Booked out for the month
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {pricingService === 'Web Design' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-8 border border-border bg-background flex flex-col md:flex-row items-center justify-between gap-8 rounded-xl"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold mb-1">Optional Website Management</h4>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Keep your site fast, secure, and always updated.</p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-display">$</span>
                    <span className="text-4xl font-display font-bold">150</span>
                    <span className="text-[10px] font-mono text-muted-foreground">/MO</span>
                  </div>
                  <div className="cursor-not-allowed">
                    <button disabled className="px-8 py-3 bg-foreground/10 text-foreground/50 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest cursor-not-allowed">
                      Unavailable
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* SEC 6: Process */}
        <section id="process" className="px-6 pt-24 pb-32 border-t border-border">
          <SectionRule num="V." title="Our Process · Discovery · Strategy · Build · Launch" page="005/008" />

          <SectionHeader
            heading={<>From <em className="italic font-normal">brief</em> to breakthrough in four focused stages.</>}
            description="Every project follows our proven four-stage growth framework, research-first, data-validated, and built for a global audience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 mb-24 border-t border-l border-border">
            {[
              {
                num: "01", title: "Discover",
                desc: "Deep-dive into your business, audience, competitors, and market. We analyze your current digital presence and map the exact gaps holding your growth back.",
                visual: (
                  <div className="bg-background border border-border rounded shadow-sm p-3 w-full text-[10px] font-mono space-y-1">
                    <div className="font-semibold" style={{ color: "hsl(77, 100%, 35%)" }}>Audience Research</div>
                    <div className="text-muted-foreground">Market Analysis</div>
                    <div className="text-muted-foreground">Global Market Analysis</div>
                    <div className="text-muted-foreground">Conversion Gap Mapping</div>
                  </div>
                ),
              },
              {
                num: "02", title: "Strategise",
                desc: "We build a custom growth strategy with clear KPIs, channel mix, and budget allocation specific to your industry and global target market.",
                visual: (
                  <div className="bg-background border border-border rounded shadow-sm p-3 w-full space-y-2">
                    <div className="h-2 w-2/3 rounded-full" style={{ backgroundColor: "hsl(77, 100%, 80%)" }} />
                    <div className="h-2 w-full bg-border rounded-full" />
                    <div className="h-2 w-1/2 bg-border rounded-full" />
                    <div className="h-2 w-3/4 rounded-full" style={{ backgroundColor: "hsl(77, 100%, 60%)" }} />
                  </div>
                ),
              },
              {
                num: "03", title: "Build",
                desc: "Execution: website development, ad creative production, AI integration, and SEO setup, all optimised for international conversion standards.",
                visual: (
                  <div className="grid grid-cols-2 gap-1 w-full h-20">
                    <div className="bg-foreground rounded-sm" />
                    <div className="rounded-sm bg-primary" />
                    <div className="bg-card border border-border rounded-sm flex items-center justify-center">
                      <div className="w-3/4 h-1 bg-border rounded-full" />
                    </div>
                    <div className="bg-muted rounded-sm border border-border" />
                  </div>
                ),
              },
              {
                num: "04", title: "Launch and Scale",
                desc: "Go live, monitor performance daily, optimise weekly. We provide transparent reporting dashboards and quarterly strategic reviews as your business grows.",
                visual: (
                  <div className="bg-background border border-border rounded shadow-sm w-full h-20 flex flex-col overflow-hidden">
                    <div className="border-b border-border h-4 bg-muted flex items-center px-2 gap-1">
                      {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-border" />)}
                    </div>
                    <div className="flex-1 p-2 flex items-end gap-0.5">
                      {[30, 45, 40, 60, 55, 75, 70, 90].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm bg-primary" style={{ height: `${h}%`, opacity: 0.7 + i * 0.04 }} />
                      ))}
                    </div>
                  </div>
                ),
              },
            ].map(({ num, title, desc, visual }) => (
              <div key={num} className="border-r border-b border-border p-6 sm:p-8 flex flex-col h-full bg-background hover:bg-card transition-colors group">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-6 flex justify-between">
                  <span>{num}</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                  {title} <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </h3>
                <BodyText className="mb-10 flex-grow">{desc}</BodyText>
                <div className="aspect-[4/3] bg-border/20 rounded-sm border border-border flex items-center justify-center p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#0a0a0a_1px,transparent_1px)] [background-size:8px_8px] opacity-[0.03]" />
                  {visual}
                </div>
              </div>
            ))}
          </div>

          <SectionFooter
            leftText="Research-first. Results-obsessed. Rooted in Africa. Built for the World."
            ctaText="Schedule your strategy call today"
            ctaHref="/book"
          />
        </section>

        {/* SEC 7: Work / Dark */}
        <section id="work" className="dark bg-background text-foreground px-6 py-24 border-x-0">
          <div className="max-w-[1400px] mx-auto">
            <SectionRule num="VI." title="Featured Work · Web Design · Ads · AI · 2024 / 2025" page="006/008" />

            <div className="mt-20 grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-1">
              <BodyText className="mb-8" as="div">Selected work</BodyText>
              <h2 className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight mb-8">
                Websites and campaigns that <em className="italic font-normal text-muted-foreground">move</em> the business needle.
              </h2>
              <Link href="/book">
                <button
                  className="text-[10px] font-mono uppercase tracking-widest font-bold border-b border-border pb-1 hover:text-muted-foreground transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  Let's Talk <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </motion.div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
              <ProjectCard
                tag="Enterprise Redesign · 01 / 05"
                meta="2026 · LOGISTICS · GHANA"
                title="Jonmoore"
                desc="Premium conceptual redesign for West Africa's leading heavy logistics provider. Optimized for high-ticket B2B quote conversions."
                bg="#f3f4f6"
                text="#0a0a0a"
                slug="jonmoore"
              />
              <ProjectCard
                tag="Enterprise Redesign · 02 / 05"
                meta="2025 · EDUCATION · GHANA"
                title="ISA Ghana"
                desc="Premium digital transformation for the International School of Accra. Streamlined admissions funnel and immersive visual storytelling."
                bg="hsl(var(--primary))"
                text="#ffffff"
                slug="isa-ghana"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-8 mb-16">
            <ProjectCard
              tag="Supply Chain Solutions · 03 / 05"
              meta="2025 · LOGISTICS · GHANA"
              title="BJH Logistics"
              desc="Full-scale digital platform for a premium logistics firm. Integrated tracking, custom portal, and optimized booking flows."
              bg="#0a0a0a"
              text="#ffffff"
              externalUrl="https://bjh-logistics.vercel.app/"
            />
            <ProjectCard
              tag="Educational Branding · 04 / 05"
              meta="2025 · EDUCATION · GHANA"
              title="Accra Grammar"
              desc="Complete digital identity and enrollment platform for one of Ghana's leading schools. Modern, accessible, and high-converting."
              bg="#ffffff"
              text="#0a0a0a"
              externalUrl="https://accra-grammar-school.vercel.app/"
            />
            <ProjectCard
              tag="Digital Transformation · 2025"
              meta="NON-PROFIT · GLOBAL"
              title="Wesleyan CM"
              desc="A unified global digital sanctuary for a multi-national ministry. High-bandwidth streaming and global donation systems."
              bg="#0a0a0a"
              text="#ffffff"
              externalUrl="https://wesleyancm.org/"
            />
            </div>

            <SectionFooter
              leftText="OGENCI · Portfolio Showcase · Accra, Ghana"
              ctaText="View All Case Studies"
              ctaHref="/work"
            />
          </div>
        </section>

        {/* SEC 7.5: Insights */}
        <section id="insights" className="px-6 pt-24 pb-32 border-t border-border">
          <SectionRule num="VII." title="Latest Insights · Web Design · Paid Ads · AI" page="007/009" />

          <SectionHeader
            heading={<>Deep research on <em className="italic font-normal">performance</em>, scaling, and <em className="italic font-normal">revenue</em>.</>}
            description="Our growth lab publishes deep analyses on modern web architectures, advertising attribution, and high-agency AI operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {sortedArticleKeys.slice(0, 3).map((slug) => {
              const { tag, title, desc, date, readTime, image } = articles[slug];
              return (
                <ArticleCard
                  key={slug}
                  tag={tag}
                  title={title}
                  desc={desc}
                  date={date}
                  readTime={readTime}
                  image={image}
                  slug={slug}
                />
              );
            })}
          </div>

          <SectionFooter
            leftText="OGENCI · Thought Leadership · African Growth"
            ctaText="View All Insights"
            ctaHref="/insights"
          />
        </section>

        {/* SEC 8: Testimonials */}
        <section className="px-6 pt-24 pb-12">
          <SectionRule num="VIII." title="Client Stories · Global Partnerships · ROI Driven" page="008/009" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7">
              <BodyText className="mb-12" as="div">
                Client stories · No. 06
              </BodyText>

              <div className="relative min-h-[200px] mb-4">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="transition-all duration-700"
                    style={{ opacity: i === activeTab ? 1 : 0, position: i === activeTab ? "relative" : "absolute", top: 0 }}
                  >
                    <h2 className="text-3xl md:text-[42px] font-display font-bold leading-[1.1] tracking-tight mb-10 max-w-3xl">
                      "{t.quote}"
                    </h2>
                  </div>
                ))}
              </div>

              <AuthorAvatar
                initial={testimonials[activeTab].initial}
                name={testimonials[activeTab].name}
                role={testimonials[activeTab].role}
                className="mb-16 mt-4"
              />
              <div className="ml-auto flex gap-2 -mt-16 mb-16 relative z-10 justify-end">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === activeTab ? 'bg-primary' : 'bg-[#e5e7eb]'}`}
                  />
                ))}
              </div>

              <Link href="/book">
                <button
                  className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold border-b border-border pb-1 hover:text-primary transition-colors mt-12 cursor-pointer"
                >
                  Let's Talk <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="corner-marks p-6 h-full flex flex-col justify-center border border-border/50">
                <div className="border border-border overflow-hidden">
                  <div className="p-8 flex flex-col justify-between bg-foreground text-background">
                    <BodyText className="opacity-40 mb-8" as="div">Results snapshot · 2025</BodyText>
                    <div className="space-y-5">
                      {[
                        { label: "Avg. Conversion Rate Lift", val: "+284%" },
                        { label: "Average ROAS (Paid Ads)", val: "3.8x" },
                        { label: "Queries Automated (AI)", val: "70%+" },
                        { label: "Client Retention Rate", val: "94%" },
                      ].map(({ label, val }) => (
                        <div key={label} className="flex justify-between items-baseline border-b border-background/10 pb-4">
                          <BodyText as="span" className="opacity-50">{label}</BodyText>
                          <span className="text-xl font-display font-bold" style={{ color: "hsl(77, 100%, 50%)" }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    <BodyText className="opacity-30 mt-8" as="div">OGENCI Digital · Global HQ: Accra, Ghana</BodyText>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SEC 9: CTA */}
        <section id="contact" className="px-6 pt-8 pb-32">
          <SectionRule num="IX." title="Contact · Start Your Project · Ghana and Africa" page="009/009" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7">
              <BodyText className="mb-8" as="div">
                Start a conversation · No. 07
              </BodyText>
              <h2 className="text-5xl md:text-[68px] font-display font-bold leading-[1.02] tracking-tight mb-8">
                Let's build something <em className="italic font-normal">open</em> and <em className="italic font-normal">unforgettable</em> together.
              </h2>
              <BodyText className="mb-12">
                Ready to grow your business with a top-tier global digital agency? Whether you need a high-converting website, paid ad campaigns that actually deliver ROI, or AI systems that scale your operations, OGENCI is your partner for global digital growth.
              </BodyText>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
                  "Premium Web Design & Strategy",
                  "Custom paid ads strategy",
                  "AI integration roadmap",
                  "No lock-in contracts",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/book">
                  <PrimaryButton href="/book">Let's Talk</PrimaryButton>
                </Link>
                <a
                  href="https://wa.me/233263460173"
                  target="_blank" rel="noreferrer noopener"
                  className="px-8 py-4 rounded-full border border-border font-bold uppercase tracking-widest text-[10px] font-mono hover:bg-card transition-colors inline-flex items-center gap-2 text-foreground"
                >
                  WhatsApp us <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex flex-wrap gap-6">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Available for new projects
                </span>
                <span>hello@ogenci.com</span>
                <span>5.6003 N · 0.1969 W · Accra</span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="corner-marks p-4 border border-border bg-card">
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  <BodyText as="div">Quick enquiry</BodyText>
                  {formFields.map(({ label, key, placeholder, type }) => (
                    <FormField
                      key={key}
                      label={label}
                      name={key}
                      type={type}
                      placeholder={placeholder}
                      value={formData[key]}
                      onChange={updateField(key)}
                      required
                    />
                  ))}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">Service needed</label>
                    <div className="flex flex-wrap gap-2">
                      {["Web Design", "Paid Ads", "AI Integration", "Full Package"].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleServiceToggle(s)}
                          className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${formData.services.includes(s) ? 'bg-primary text-background border-primary' : 'border-border hover:border-gray-900'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {status.type === 'error' && (
                    <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      {status.message}
                    </div>
                  )}

                  {status.type === 'success' && (
                    <div className="text-[10px] font-mono text-primary uppercase tracking-widest bg-primary/10 p-3 rounded-lg border border-primary/20">
                      {status.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status.type === 'loading'}
                    className={`w-full px-6 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] font-mono transition-all bg-primary text-primary-foreground ${status.type === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                  >
                    {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                  <p className="text-[10px] text-muted-foreground text-center font-mono">We reply within 2 hours on business days · Accra, GMT+0</p>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
