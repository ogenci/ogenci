import type { ReactNode } from "react";

export interface Article {
  tag: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  bg: string;
  textColor: string;
  image: string;
  content: ReactNode;
}

const articles: Record<string, Article> = {
  "african-tech-leap": {
    tag: "Web Design",
    title: "The African Tech Leap: Capturing Global Enterprise B2B Flows",
    desc: "Why clean, localized, high-speed UX is outperforming bloated Western digital ecosystems in high-ticket lead generation.",
    date: "May 2026",
    readTime: "5 min read",
    bg: "hsl(77, 100%, 38%)",
    textColor: "#0a0a0a",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=630&fit=crop&q=85&auto=format",
    content: (
      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground font-semibold leading-relaxed">
          For the past decade, Western web development has been locked in a cycle of incremental bloat. Heavy frameworks, compounding tracking scripts, and multi-megabyte image assets have turned once-crisp enterprise landing pages into sluggish, conversion-killing bottlenecks.
        </p>
        <p>
          In contrast, African digital agencies operate under a different set of constraints. Bandwidth costs are high, and mobile devices range from low-end smartphones to high-fidelity flagships. In Accra, Lagos, and Nairobi, web engineers don't have the luxury of ignoring load speeds or layout shifts. We design for absolute efficiency because every extra kilobyte translates to user friction.
        </p>
        <h3 className="text-2xl font-display font-bold text-foreground mt-12">Leapfrogging Legacy Architecture</h3>
        <p>
          Just as Africa bypassed landline infrastructure directly to mobile telecommunications, African web agencies are leapfrogging legacy CMS platforms and bloated page builders. By adopting modern, static-first frameworks, serverless edge networks, and vanilla CSS, we are building systems that load near-instantly on any connection globally.
        </p>
        <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic text-foreground bg-primary/5 rounded-r text-lg">
          &ldquo;When a website loads in 400ms instead of 4.2 seconds, conversion rates do not just rise marginally&mdash;they shift exponentially.&rdquo;
        </blockquote>
        <h3 className="text-2xl font-display font-bold text-foreground mt-12">The Global Arbitrage of High-Speed UX</h3>
        <p>
          When an international enterprise client interacts with a website engineered by an African team, they are instantly struck by the speed. Every transition is fluid, images load instantly, and forms submit without lag. In B2B marketing, speed is synonymous with trust. An enterprise that values a buyer&rsquo;s time enough to build a blazingly fast interface is perceived as inherently more competent.
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=85&auto=format",
    content: (
      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground font-semibold leading-relaxed">
          The golden age of third-party browser tracking is dead. Between iOS privacy updates, ad blockers, and the final deprecation of third-party cookies, standard browser-side pixel tracking has become a guessing game.
        </p>
        <p>
          Despite this, many marketing teams still rely on Meta and Google ad managers to report conversions. The result? Compounding duplicate attributions, inflated ROAS figures, and thousands of dollars in ad spend wasted on campaigns that generate vanity sign-ups instead of hard bottom-line cash.
        </p>
        <h3 className="text-2xl font-display font-bold text-foreground mt-12">First-Party Server-Side Tracking</h3>
        <p>
          To survive and scale in 2026, companies must take ownership of their own marketing data. The solution is first-party server-side tracking. By routing customer events through a secure cloud container (e.g., Cloudflare Workers or server-side Google Tag Manager), you establish a direct, tamper-proof connection between your website&rsquo;s database and ad platforms.
        </p>
        <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic text-foreground bg-primary/5 rounded-r text-lg">
          &ldquo;If your tracking pixel runs only on the client&rsquo;s browser, you are losing up to 40% of conversion data. Server-side integration recovers this lost revenue pipeline.&rdquo;
        </blockquote>
        <h3 className="text-2xl font-display font-bold text-foreground mt-12">Optimizing for CRM Pipeline Value, Not Clicks</h3>
        <p>
          Once server-side tracking is in place, we go a step further: we feed real offline conversion data (like Stripe invoices or Salesforce deal closures) back to Google and Meta&rsquo;s algorithms. Instead of optimizing ads for who clicks a button, the AI optimizes for the buyers who actually wire the money.
        </p>
        <p>
          At OGENCI, our paid ad strategies are fully rooted in direct server-side data attribution. We don&rsquo;t report &lsquo;clicks&rsquo; or &lsquo;shares&rsquo;&mdash;we optimize purely for lifetime customer value (LTV) and verified pipeline profit.
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
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop&q=85&auto=format",
    content: (
      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground font-semibold leading-relaxed">
          Customer support is typically viewed as a cost center. Organizations struggle to balance quick response times with human capital costs, often resulting in slow ticketing queues and frustrated customers.
        </p>
        <p>
          By implementing autonomous, fine-tuned AI agents, we are turning customer support into a conversion engine. We aren&rsquo;t talking about basic, rule-based chatbots that fail at the first sign of complexity. We are talking about advanced cognitive agents integrated directly into your databases.
        </p>
        <h3 className="text-2xl font-display font-bold text-foreground mt-12">RAG &amp; Secure Database Tool-Calling</h3>
        <p>
          Modern AI agents utilize Retrieval-Augmented Generation (RAG) and secure API tool-calling. This allows them to securely access product details, order shipping statuses, and customer billing histories in real-time. When a customer asks about a delayed package, the agent instantly retrieves the live logistics coordinates and generates a friendly, comprehensive, customized update in under 2 seconds.
        </p>
        <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic text-foreground bg-primary/5 rounded-r text-lg">
          &ldquo;An AI agent never goes to sleep, never loses its patience, speaks 40 languages fluently, and resolves customer issues in under 3 seconds.&rdquo;
        </blockquote>
        <h3 className="text-2xl font-display font-bold text-foreground mt-12">Freeing Up Critical Human Capital</h3>
        <p>
          By automating up to 70% of inbound, routine queries, your human customer service experts are liberated from repetitive tasks. They can now focus on complex, high-touch account management and proactive client onboarding&mdash;activities that directly generate revenue.
        </p>
        <p>
          At OGENCI, we design and train custom AI agents that integrate seamlessly with tools like WhatsApp, Slack, Zendesk, and custom databases, ensuring that your enterprise scales customer care at zero incremental cost.
        </p>
      </div>
    )
  }
};

export default articles;
export const articleKeys = Object.keys(articles);
