import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Clock, X } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Complete premium articles data
const articles = {
  "african-tech-leap": {
    tag: "Web Design",
    title: "The African Tech Leap: Capturing Global Enterprise B2B Flows",
    desc: "Why clean, localized, high-speed UX is outperforming bloated Western digital ecosystems in high-ticket lead generation.",
    date: "May 2026",
    readTime: "5 min read",
    bg: "hsl(77, 100%, 38%)",
    textColor: "#0a0a0a",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=450&fit=crop&q=80&auto=format",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
        <p className="text-base text-foreground font-semibold">
          For the past decade, Western web development has been locked in a cycle of incremental bloat. Heavy frameworks, compounding tracking scripts, and multi-megabyte image assets have turned once-crisp enterprise landing pages into sluggish, conversion-killing bottlenecks. 
        </p>
        <p>
          In contrast, African digital agencies operate under a different set of constraints. Bandwidth costs are high, and mobile devices range from low-end smartphones to high-fidelity flagships. In Accra, Lagos, and Nairobi, web engineers don't have the luxury of ignoring load speeds or layout shifts. We design for absolute efficiency because every extra kilobyte translates to user friction.
        </p>
        <h3 className="text-xl font-display font-bold text-foreground mt-8">Leapfrogging Legacy Architecture</h3>
        <p>
          Just as Africa bypassed landline infrastructure directly to mobile telecommunications, African web agencies are leapfrogging legacy CMS platforms and bloated page builders. By adopting modern, static-first frameworks, serverless edge networks, and vanilla CSS, we are building systems that load near-instantly on any connection globally.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic text-foreground bg-primary/5 rounded-r">
          "When a website loads in 400ms instead of 4.2 seconds, conversion rates do not just rise marginally—they shift exponentially."
        </blockquote>
        <h3 className="text-xl font-display font-bold text-foreground mt-8">The Global Arbitrage of High-Speed UX</h3>
        <p>
          When an international enterprise client interacts with a website engineered by an African team, they are instantly struck by the speed. Every transition is fluid, images load instantly, and forms submit without lag. In B2B marketing, speed is synonymous with trust. An enterprise that values a buyer's time enough to build a blazingly fast interface is perceived as inherently more competent.
        </p>
        <p>
          At OGENCI, we apply this minimalist, high-speed architecture to global brands. By pairing modern static site generation with bespoke web animations, we deliver interfaces that look stunning, command authority, and turn traffic into predictable global pipeline value.
        </p>
      </div>
    )
  },
  "attribution-metrics-2026": {
    tag: "Paid Ads",
    title: "Attribution in 2026: Moving Past Google & Meta Vanity Metrics",
    desc: "A surgical guide to building first-party server-side tracking funnels that report pure pipeline profit, not platform estimations.",
    date: "April 2026",
    readTime: "8 min read",
    bg: "#0a0a0a",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&q=80&auto=format",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
        <p className="text-base text-foreground font-semibold">
          The golden age of third-party browser tracking is dead. Between iOS privacy updates, ad blockers, and the final deprecation of third-party cookies, standard browser-side pixel tracking has become a guessing game.
        </p>
        <p>
          Despite this, many marketing teams still rely on Meta and Google ad managers to report conversions. The result? Compounding duplicate attributions, inflated ROAS figures, and thousands of dollars in ad spend wasted on campaigns that generate vanity sign-ups instead of hard bottom-line cash.
        </p>
        <h3 className="text-xl font-display font-bold text-foreground mt-8">First-Party Server-Side Tracking</h3>
        <p>
          To survive and scale in 2026, companies must take ownership of their own marketing data. The solution is first-party server-side tracking. By routing customer events through a secure cloud container (e.g., Cloudflare Workers or server-side Google Tag Manager), you establish a direct, tamper-proof connection between your website's database and ad platforms.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic text-foreground bg-primary/5 rounded-r">
          "If your tracking pixel runs only on the client's browser, you are losing up to 40% of conversion data. Server-side integration recovers this lost revenue pipeline."
        </blockquote>
        <h3 className="text-xl font-display font-bold text-foreground mt-8">Optimizing for CRM Pipeline Value, Not Clicks</h3>
        <p>
          Once server-side tracking is in place, we go a step further: we feed real offline conversion data (like Stripe invoices or Salesforce deal closures) back to Google and Meta's algorithms. Instead of optimizing ads for who clicks a button, the AI optimizes for the buyers who actually wire the money.
        </p>
        <p>
          At OGENCI, our paid ad strategies are fully rooted in direct server-side data attribution. We don't report 'clicks' or 'shares'—we optimize purely for lifetime customer value (LTV) and verified pipeline profit.
        </p>
      </div>
    )
  },
  "autonomous-ai-agents": {
    tag: "AI Integration",
    title: "Autonomous AI Agents: Operating At Zero Idle Support Latency",
    desc: "How we deploy fine-tuned AI systems to handle 70%+ of customer operations while maintaining human-level empathy and response precision.",
    date: "March 2026",
    readTime: "6 min read",
    bg: "#ffffff",
    textColor: "#0a0a0a",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop&q=80&auto=format",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
        <p className="text-base text-foreground font-semibold">
          Customer support is typically viewed as a cost center. Organizations struggle to balance quick response times with human capital costs, often resulting in slow ticketing queues and frustrated customers.
        </p>
        <p>
          By implementing autonomous, fine-tuned AI agents, we are turning customer support into a conversion engine. We aren't talking about basic, rule-based chatbots that fail at the first sign of complexity. We are talking about advanced cognitive agents integrated directly into your databases.
        </p>
        <h3 className="text-xl font-display font-bold text-foreground mt-8">RAG & Secure Database Tool-Calling</h3>
        <p>
          Modern AI agents utilize Retrieval-Augmented Generation (RAG) and secure API tool-calling. This allows them to securely access product details, order shipping statuses, and customer billing histories in real-time. When a customer asks about a delayed package, the agent instantly retrieves the live logistics coordinates and generates a friendly, comprehensive, customized update in under 2 seconds.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic text-foreground bg-primary/5 rounded-r">
          "An AI agent never goes to sleep, never loses its patience, speaks 40 languages fluently, and resolves customer issues in under 3 seconds."
        </blockquote>
        <h3 className="text-xl font-display font-bold text-foreground mt-8">Freeing Up Critical Human Capital</h3>
        <p>
          By automating up to 70% of inbound, routine queries, your human customer service experts are liberated from repetitive tasks. They can now focus on complex, high-touch account management and proactive client onboarding—activities that directly generate revenue.
        </p>
        <p>
          At OGENCI, we design and train custom AI agents that integrate seamlessly with tools like WhatsApp, Slack, Zendesk, and custom databases, ensuring that your enterprise scales customer care at zero incremental cost.
        </p>
      </div>
    )
  }
};

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [location, setLocation] = useLocation();
  const [selectedArticleKey, setSelectedArticleKey] = useState<string | null>(null);

  // Sliders for ROI Calculator
  const [adSpend, setAdSpend] = useState(5000);
  const [currentConv, setCurrentConv] = useState(1.2);
  const [automationRate, setAutomationRate] = useState(50);

  // Sync with URL query parameter e.g., `/insights?article=slug`
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const article = searchParams.get("article");
    if (article && articles[article as keyof typeof articles]) {
      setSelectedArticleKey(article);
    } else {
      setSelectedArticleKey(null);
    }
  }, [location]);

  const handleOpenArticle = (key: string) => {
    setLocation(`/insights?article=${key}`);
  };

  const handleCloseArticle = () => {
    setLocation("/insights");
  };

  // ROI Calculator Calculations
  // Assume:
  // - Average conversion lift with OGENCI is +150% (factor of 2.5)
  // - Average customer order value (AOV) is $150
  // - CPC is $1.00 (Clicks = Ad Spend)
  const clicks = adSpend;
  const originalConversions = clicks * (currentConv / 100);
  const projectedConv = currentConv * 2.5; // conversion lift
  const projectedConversions = clicks * (projectedConv / 100);
  const conversionLift = projectedConversions - originalConversions;
  const revenueLift = conversionLift * 150; // $150 average B2B lead or checkout value
  
  // Assume:
  // - Average support ticket count per month is 1200
  // - Each support ticket takes human lead average 8 minutes to resolve
  // - Total hours saved = (1200 tickets * 8 minutes * automationRate%) / 60
  const hoursReclaimed = Math.round((1200 * 8 * (automationRate / 100)) / 60);
  
  // ROAS calculation
  const roas = parseFloat((2.4 * (projectedConv / currentConv)).toFixed(1));

  const filteredArticleKeys = Object.keys(articles).filter((key) => {
    if (activeFilter === "All") return true;
    return articles[key as keyof typeof articles].tag === activeFilter;
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <Header />

      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative pt-12 md:pt-24">
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

          {/* Calculator Section - premium high impact interactive feature */}
          <section className="mb-24 p-8 md:p-12 rounded-3xl bg-[#f4f1ea] border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <BarChart3 className="w-48 h-48" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">Interactive Growth & Scale Calculator</h3>
                  <p className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">Model your pipeline lift with high-performance OGENCI optimization</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
                {/* Sliders column */}
                <div className="lg:col-span-7 space-y-8">
                  {/* Slider 1 */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">Estimated Monthly Ad Spend</label>
                      <span className="text-lg font-display font-bold text-foreground">${adSpend.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="50000"
                      step="500"
                      value={adSpend}
                      onChange={(e) => setAdSpend(parseInt(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-muted-foreground mt-1">
                      <span>$500</span>
                      <span>$25,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>

                  {/* Slider 2 */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">Current Conversion Rate</label>
                      <span className="text-lg font-display font-bold text-foreground">{currentConv}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="5.0"
                      step="0.1"
                      value={currentConv}
                      onChange={(e) => setCurrentConv(parseFloat(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-muted-foreground mt-1">
                      <span>0.2%</span>
                      <span>2.6%</span>
                      <span>5.0%</span>
                    </div>
                  </div>

                  {/* Slider 3 */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">Target AI Support Automation</label>
                      <span className="text-lg font-display font-bold text-foreground">{automationRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="5"
                      value={automationRate}
                      onChange={(e) => setAutomationRate(parseInt(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-muted-foreground mt-1">
                      <span>10%</span>
                      <span>50%</span>
                      <span>90%</span>
                    </div>
                  </div>
                </div>

                {/* Metrics / Output column */}
                <div className="lg:col-span-5 bg-background border border-border p-8 rounded-2xl flex flex-col justify-between shadow-sm">
                  <div className="space-y-6">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground border-b border-border pb-3">Projected Business Dividend</div>
                    
                    <div>
                      <div className="text-3xl md:text-4xl font-display font-bold text-primary tracking-tight">
                        +${Math.round(revenueLift).toLocaleString()}
                      </div>
                      <div className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground mt-1 font-bold">Projected Monthly Revenue Lift</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <div className="text-2xl font-display font-bold text-foreground">
                          {hoursReclaimed} hrs
                        </div>
                        <div className="text-[7px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5 leading-none">Support Saved / Mo</div>
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold text-foreground">
                          {roas}x
                        </div>
                        <div className="text-[7px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5 leading-none">Target Campaign ROAS</div>
                      </div>
                    </div>
                  </div>

                  <Link href="/book">
                    <button className="w-full py-3.5 mt-8 bg-foreground text-background hover:bg-foreground/90 rounded-full text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                      Discuss This Strategy
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Filtering bar */}
          <div className="flex flex-wrap gap-3 mb-16 border-b border-border pb-8">
            {["All", "Web Design", "Paid Ads", "AI Integration"].map((filter) => (
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
              const art = articles[key as keyof typeof articles];
              return (
                <div
                  key={key}
                  onClick={() => handleOpenArticle(key)}
                  className="border border-border rounded-xl bg-background hover:bg-card cursor-pointer group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Cover image */}
                  <div className="relative h-[200px] w-full overflow-hidden flex-shrink-0">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
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
              );
            })}
          </div>

        </main>
      </div>

      {/* Full-screen premium sliding reading modal */}
      <AnimatePresence>
        {selectedArticleKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex justify-end overflow-y-auto"
          >
            {/* Click backdrop to close */}
            <div className="absolute inset-0" onClick={handleCloseArticle} />

            <motion.article
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-3xl bg-background border-l border-border px-6 py-12 md:p-16 flex flex-col justify-between overflow-y-auto shadow-2xl h-screen min-h-screen"
            >
              <div>
                {/* Modal close header */}
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-border">
                  <button
                    onClick={handleCloseArticle}
                    className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Insights
                  </button>

                  <button
                    onClick={handleCloseArticle}
                    className="p-2 bg-muted/50 rounded-full hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Article Header info */}
                <div className="mb-8">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-border inline-block mb-6 text-muted-foreground">
                    {articles[selectedArticleKey as keyof typeof articles].tag}
                  </span>
                  
                  <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight mb-4">
                    {articles[selectedArticleKey as keyof typeof articles].title}
                  </h1>

                  <div className="flex gap-4 items-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <span>{articles[selectedArticleKey as keyof typeof articles].date}</span>
                    <span>·</span>
                    <span>{articles[selectedArticleKey as keyof typeof articles].readTime}</span>
                  </div>
                </div>

                {/* Article Body Content */}
                <div className="prose prose-invert max-w-none pt-6 border-t border-border/50">
                  {articles[selectedArticleKey as keyof typeof articles].content}
                </div>
              </div>

              {/* Slide CTA Footer */}
              <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h4 className="text-base font-display font-bold">Have scaling challenges?</h4>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Let's analyze your pipeline parameters in Accra.</p>
                </div>
                
                <Link href="/book" onClick={handleCloseArticle}>
                  <button className="px-6 py-3 bg-primary text-background font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-full inline-flex items-center gap-2 hover:scale-105 transition-transform">
                    Let's Talk
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
