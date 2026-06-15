import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  tag: string;
  meta: string;
  title: string;
  desc: string;
  bg: string;
  text: string;
  externalUrl?: string;
  slug?: string;
}

export default function ProjectCard({ tag, meta, title, desc, bg, text, externalUrl, slug }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  const imgSrc = externalUrl
    ? `/images/${new URL(externalUrl).hostname}.png`
    : `/images/${slug || title.toLowerCase().replace(/ /g, '-')}.vercel.app.png`;

  const card = (
    <div className="group flex flex-col justify-between cursor-pointer" data-cursor="view">
      <div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-border shadow-md bg-[#faf9f6] flex flex-col justify-center items-center p-4">
          {imgError ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ backgroundColor: bg, color: text }}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-4">{tag}</span>
              <h2 className="text-2xl font-display font-bold italic">{title}</h2>
            </div>
          ) : (
            <img
              src={imgSrc}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain rounded-xl transition-all duration-700 group-hover:scale-[1.02]"
            />
          )}
        </div>
        <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[9px] font-mono uppercase tracking-wider font-bold text-muted-foreground leading-relaxed mb-6">
          {desc}
        </p>
      </div>
      <span className="inline-flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-widest border-b border-border pb-1 hover:text-primary hover:border-primary transition-all duration-300 w-fit">
        View Case Study <ArrowUpRight className="w-3 h-3 text-primary" />
      </span>
    </div>
  );

  if (externalUrl) {
    return (
      <a key={title} href={externalUrl} target="_blank" rel="noopener noreferrer" className="block">
        {card}
      </a>
    );
  }

  return (
    <Link key={title} href={`/work/${slug || title.toLowerCase().replace(/ /g, '-')}`} className="block">
      {card}
    </Link>
  );
}
