import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, BarChart3, Clock } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import articles, { articleKeys } from "@/data/articles";

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Sliders for ROI Calculator
  const [adSpend, setAdSpend] = useState(5000);
  const [currentConv, setCurrentConv] = useState(1.2);
  const [automationRate, setAutomationRate] = useState(50);

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

  const filteredArticleKeys = articleKeys.filter((key) => {
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
