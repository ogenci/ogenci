import type { ReactNode } from "react";

interface TagBadgeProps {
  children: ReactNode;
  variant?: "default" | "light" | "primary";
  className?: string;
}

const variants = {
  default: "border-border text-muted-foreground",
  light: "border-white/30 text-white/90",
  primary: "border-primary text-primary",
};

export default function TagBadge({ children, variant = "default", className = "" }: TagBadgeProps) {
  return (
    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
