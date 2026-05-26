import type { ReactNode } from "react";

interface PillBadgeProps {
  children: ReactNode;
  variant?: "default" | "light" | "primary";
  className?: string;
}

const variants = {
  default: "border-border text-muted-foreground",
  light: "border-white/30 text-white/90",
  primary: "border-primary text-primary",
};

export default function PillBadge({ children, variant = "default", className = "" }: PillBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full text-[10px] font-mono mb-8 uppercase tracking-widest bg-background/50 backdrop-blur-sm ${variants[variant]} ${className}`}>
      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
      {children}
    </div>
  );
}
