import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import articles, { articleKeys } from "@/data/articles";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function ArticlePage() {
  const [, params] = useRoute("/insights/:slug");
  const slug = params?.slug || articleKeys[0];

  const article = articles[slug];
  if (!article) {
    return (
      <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 pt-32">
          <h1 className="text-4xl font-display font-bold">Article not found</h1>
          <Link href="/insights" className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">
            Back to Insights
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const otherArticles = articleKeys
    .filter(k => k !== slug)
    .slice(0, 2)
    .map(k => ({ slug: k, ...articles[k] }));

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <Header />

      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-y-0 left-6 xl:left-10 w-px bg-border/20 pointer-events-none" />
        <div className="absolute inset-y-0 right-6 xl:right-10 w-px bg-border/20 pointer-events-none" />

        {/* Hero */}
        <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <motion.div style={{ y: heroParallax }} className="absolute inset-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-end pb-8 md:pb-12 px-6"
        >
          <div className="max-w-[1600px] mx-auto w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border border-white/30 text-white/90"
                >
                  {article.tag}
                </span>
                <span className="text-[9px] font-mono text-white/60 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[84px] font-display font-bold leading-[1.02] tracking-tight text-white mb-6">
                {article.title}
              </h1>

              <div className="flex items-center gap-5 text-[10px] font-mono uppercase tracking-widest text-white/50">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span className="w-px h-4 bg-white/20" />
                <span>OGENCI Growth Lab</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </section>

      {/* Article body */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Back link + meta sidebar */}
          <div className="lg:col-span-2 lg:col-start-1">
            <div className="lg:sticky lg:top-32 space-y-8">
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                All Insights
              </Link>

              <div className="hidden lg:block space-y-4 pt-4 border-t border-border">
                <div className="text-[8px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Published</div>
                <div className="text-[10px] font-mono text-foreground">{article.date}</div>
              </div>

              <div className="hidden lg:block space-y-4 pt-4 border-t border-border">
                <div className="text-[8px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Read time</div>
                <div className="text-[10px] font-mono text-foreground">{article.readTime}</div>
              </div>
            </div>
          </div>

          {/* Article content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="lg:col-span-7 lg:col-start-4 max-w-3xl"
          >
            <div className="text-base md:text-lg leading-loose space-y-8 [&_p]:text-muted-foreground [&_p]:leading-[1.9] [&_h3]:text-foreground [&_h3]:text-2xl [&_h3]:font-display [&_h3]:font-bold [&_h3]:mt-16 [&_h3]:mb-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-4 [&_blockquote]:my-10 [&_blockquote]:italic [&_blockquote]:text-foreground [&_blockquote]:bg-primary/5 [&_blockquote]:rounded-r [&_blockquote]:text-lg [&_blockquote]:leading-relaxed">
              {article.content}
            </div>

            {/* Article footer */}
            <div className="mt-20 pt-10 border-t border-border">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-display text-lg font-bold">
                  O
                </div>
                <div>
                  <div className="text-sm font-display font-bold">OGENCI Growth Lab</div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">Research & Insights Team</div>
                </div>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mt-6 leading-relaxed max-w-xl">
                Deep, mathematical research on building high-conversion interfaces, attribution logic, and autonomous operational frameworks that pay predictable business dividends.
              </p>
            </div>

            {/* CTA card */}
            <div className="mt-12 p-8 md:p-10 rounded-2xl bg-[#f4f1ea] border border-border">
              <h3 className="text-xl md:text-2xl font-display font-bold mb-3">Ready to apply these insights?</h3>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-bold leading-relaxed mb-6">
                Let&rsquo;s analyze your growth parameters and build a strategy that delivers measurable pipeline value.
              </p>
              <Link href="/book">
                <span
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "hsl(77, 100%, 38%)", color: "#0a0a0a" }}
                >
                  Book a Strategy Session
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related articles */}
      {otherArticles.length > 0 && (
        <section className="px-6 py-24 border-t border-border bg-muted/30">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold">More Insights</h2>
              <Link
                href="/insights"
                className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                View All
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherArticles.map((art, i) => (
                <Link key={art.slug} href={`/insights/${art.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group border border-border rounded-2xl bg-background overflow-hidden hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                    <div className="p-7">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border border-border/40 text-muted-foreground">
                          {art.tag}
                        </span>
                        <span className="text-[9px] font-mono text-muted-foreground">{art.readTime}</span>
                      </div>
                      <h3 className="text-lg font-display font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{art.date}</span>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-primary inline-flex items-center gap-1.5">
                          Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="px-6 py-32 flex flex-col items-center text-center relative overflow-hidden bg-[#0a0a0a] text-white -mx-6 xl:-mx-10">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[800px] h-[800px] bg-primary rounded-full blur-[200px]" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative z-10 max-w-3xl"
        >
          <h2 className="text-5xl md:text-[84px] font-display font-bold leading-none tracking-tight mb-8">
            Ready to <em className="italic font-normal text-primary">scale?</em>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 mb-12 font-bold leading-relaxed max-w-xl mx-auto">
            Stop guessing. Start growing. Get a data-driven strategy custom-built for your business and the global market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <div
                className="px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 text-[10px] font-mono transition-transform hover:scale-105 cursor-pointer"
                style={{ backgroundColor: "hsl(77, 100%, 38%)", color: "#0a0a0a" }}
              >
                Let&rsquo;s Talk <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
            <Link href="/insights">
              <span className="px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 text-[10px] font-mono text-white border border-white/20 hover:bg-white/10 transition-colors cursor-pointer">
                More Insights
              </span>
            </Link>
          </div>
        </motion.div>
      </section>

        <Footer />
      </div>
    </div>
  );
}
