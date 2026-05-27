import { Link } from "wouter";

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
  const card = (
    <div className="group cursor-pointer" data-cursor="view">
      <div className="relative aspect-[4/5] overflow-hidden mb-6 rounded-xl border-y sm:border dark:border-white/15" style={{ backgroundColor: bg, color: text }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 text-center">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-50 mb-4">{tag}</div>
          <div className="text-3xl sm:text-4xl font-display font-bold italic">{title}</div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold mt-6 opacity-70 max-w-xs">{desc}</p>
        </div>
      </div>
      <div className="flex justify-between items-baseline mb-4 text-[10px] font-mono text-foreground/70 uppercase tracking-widest">
        <div>{tag}</div>
        <div>{meta}</div>
      </div>
      <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold leading-relaxed text-foreground/70 max-w-sm">{desc}</p>
    </div>
  );

  if (externalUrl) {
    return (
      <a key={title} href={externalUrl} target="_blank" rel="noopener noreferrer" className="group cursor-pointer" data-cursor="view">
        {card}
      </a>
    );
  }

  return (
    <Link key={title} href={`/work/${slug || title.toLowerCase().replace(/ /g, '-')}`}>
      {card}
    </Link>
  );
}
