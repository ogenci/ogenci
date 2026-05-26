import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageLayout from "@/components/PageLayout";
import DarkCtaSection from "@/components/DarkCtaSection";
import TagBadge from "@/components/TagBadge";
import AuthorAvatar from "@/components/AuthorAvatar";
import BodyText from "@/components/BodyText";
import { Image } from "@/components/Image";
import { useParallax } from "@/hooks/useParallax";
import { fadeUp } from "@/lib/animations";
import articles, { sortedArticleKeys } from "@/data/articles";

export default function ArticlePage() {
  const [, params] = useRoute("/insights/:slug");
  const slug = params?.slug || sortedArticleKeys[0];

  const article = articles[slug];
  if (!article) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 pt-32">
          <h1 className="text-4xl font-display font-bold">Article not found</h1>
          <Link href="/insights" className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">
            Back to Insights
          </Link>
        </div>
      </PageLayout>
    );
  }

  const { y, opacity } = useParallax({ yInput: 500, yOutput: 150, opacityInput: 300, opacityMin: 0.3 });

  const otherArticles = sortedArticleKeys
    .filter(k => k !== slug)
    .slice(0, 2)
    .map(k => ({ slug: k, ...articles[k] }));

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex items-end pb-8 md:pb-12 px-6"
        >
          <div className="max-w-[1600px] mx-auto w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <TagBadge variant="primary">{article.tag}</TagBadge>
                <span className="text-[9px] font-mono text-primary/70 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.08] tracking-tight text-white mb-6">
                {article.title}
              </h1>

              <div className="flex items-center justify-center gap-5 text-[10px] font-mono uppercase tracking-widest text-primary/60">
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
            <div className="text-base md:text-lg leading-loose space-y-8 [&_p]:text-muted-foreground [&_p]:leading-[1.9] [&_p:first-of-type]:text-lg [&_p:first-of-type]:text-foreground [&_p:first-of-type]:font-semibold [&_h3]:text-foreground [&_h3]:text-2xl [&_h3]:font-display [&_h3]:font-bold [&_h3]:mt-16 [&_h3]:mb-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-4 [&_blockquote]:my-10 [&_blockquote]:italic [&_blockquote]:text-foreground [&_blockquote]:bg-primary/5 [&_blockquote]:rounded-r [&_blockquote]:text-lg [&_blockquote]:leading-relaxed">
              <Markdown remarkPlugins={[remarkGfm]}>{article.content}</Markdown>
            </div>

            {/* Article footer */}
            <div className="mt-20 pt-10 border-t border-border">
              <AuthorAvatar
                initial="O"
                name="OGENCI Growth Lab"
                role="Research & Insights Team"
                className="mb-2"
              />
              <BodyText className="mt-6 max-w-xl">
                Deep, mathematical research on building high-conversion interfaces, attribution logic, and autonomous operational frameworks that pay predictable business dividends.
              </BodyText>
            </div>

            {/* CTA card */}
            <div className="mt-12 p-8 md:p-10 rounded-2xl bg-[#f4f1ea] border border-border">
              <h3 className="text-xl md:text-2xl font-display font-bold mb-3">Ready to apply these insights?</h3>
              <BodyText className="mb-6">
                Let&rsquo;s analyze your growth parameters and build a strategy that delivers measurable pipeline value.
              </BodyText>
              <Link href="/book">
                <span
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer hover:opacity-90 transition-opacity bg-primary text-primary-foreground"
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
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                    <div className="p-7">
                      <div className="flex items-center gap-3 mb-4">
                        <TagBadge>{art.tag}</TagBadge>
                        <span className="text-[9px] font-mono text-muted-foreground">{art.readTime}</span>
                      </div>
                      <h3 className="text-lg font-display font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{art.date}</span>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary inline-flex items-center gap-1.5">
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
      <DarkCtaSection
        heading='Ready to <em class="italic font-normal text-primary">scale?</em>'
        description="Stop guessing. Start growing. Get a data-driven strategy custom-built for your business and the global market."
        primaryAction={{ label: "Let's Talk", href: "/book" }}
        secondaryAction={{ label: "More Insights", href: "/insights" }}
      />
    </PageLayout>
  );
}
