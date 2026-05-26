import type { ReactNode } from "react";
import PillBadge from "@/components/PillBadge";
import BodyText from "@/components/BodyText";

interface PageHeroProps {
  badge: string;
  heading: ReactNode;
  description: string;
  className?: string;
}

export default function PageHero({ badge, heading, description, className = "" }: PageHeroProps) {
  return (
    <header className={`mb-20 max-w-4xl ${className}`}>
      <PillBadge>{badge}</PillBadge>
      <h1 className="text-5xl sm:text-6xl md:text-[84px] font-display font-bold leading-[1.02] tracking-tight mb-8">
        {heading}
      </h1>
      <BodyText className="max-w-2xl">{description}</BodyText>
    </header>
  );
}
