import type { ReactNode } from "react";

interface BodyTextProps {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
  tracking?: "widest" | "0.2em" | "0.3em" | "0.4em";
}

const trackingClasses: Record<string, string> = {
  widest: "tracking-widest",
  "0.2em": "tracking-[0.2em]",
  "0.3em": "tracking-[0.3em]",
  "0.4em": "tracking-[0.4em]",
};

export default function BodyText({ children, className = "", as: Tag = "p", tracking = "widest" }: BodyTextProps) {
  const trackingClass = trackingClasses[tracking] || trackingClasses.widest;
  return (
    <Tag className={`text-[10px] font-mono uppercase ${trackingClass} font-bold text-muted-foreground leading-relaxed ${className}`}>
      {children}
    </Tag>
  );
}
