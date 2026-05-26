import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import BodyText from "@/components/BodyText";

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
      <div className="relative aspect-[4/5] overflow-hidden mb-6 rounded-xl border" style={{ backgroundColor: bg, color: text }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <BodyText as="div" className="opacity-50 mb-4">{tag}</BodyText>
          <div className="text-4xl font-display font-bold italic">{title}</div>
          <BodyText tracking="0.2em" className="mt-6 opacity-70 max-w-xs">{desc}</BodyText>
        </div>
      </div>
      <div className="flex justify-between items-baseline mb-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
        <div>{tag}</div>
        <div>{meta}</div>
      </div>
      <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
      <BodyText tracking="0.2em" className="max-w-sm">{desc}</BodyText>
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
