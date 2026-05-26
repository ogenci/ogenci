import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import TagBadge from "@/components/TagBadge";
import BodyText from "@/components/BodyText";
interface ArticleCardProps {
  tag: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  index?: number;
  animated?: boolean;
}

export default function ArticleCard({ tag, title, desc, date, readTime, image, slug, animated = true }: ArticleCardProps) {
  const Card = animated ? motion.div : "div";
  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 } as any,
        viewport: { once: true } as any,
        whileHover: { y: -4 } as any,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } as any,
      }
    : {};

  return (
    <Link href={`/insights/${slug}`}>
      <Card
        {...motionProps}
        className="border border-border rounded-xl bg-background hover:bg-card cursor-pointer group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col"
      >
        <div className="relative h-[200px] w-full overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col flex-1 justify-between p-8">
          <div>
            <div className="flex justify-between items-start mb-6">
              <TagBadge>{tag}</TagBadge>
              <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
            </div>

            <h3 className="text-2xl font-display font-bold mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-3">
              {title}
            </h3>

            <BodyText tracking="0.2em" className="line-clamp-3">{desc}</BodyText>
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-muted-foreground border-t border-border pt-4 mt-6">
            <span>{date}</span>
            <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
              Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
