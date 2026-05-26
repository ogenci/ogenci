import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href: string;
  icon?: "arrow-up-right" | "arrow-right";
  shadow?: boolean;
  external?: boolean;
  className?: string;
}

export function PrimaryButton({ children, href, icon, shadow, external, className = "" }: ButtonProps) {
  const Icon = icon === "arrow-right" ? ArrowRight : ArrowUpRight;
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] font-mono inline-flex items-center gap-3 cursor-pointer bg-primary text-primary-foreground ${shadow ? "shadow-[0_20px_50px_-15px_rgba(186,230,55,0.3)]" : ""} ${className}`}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </motion.div>
  );

  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return <Link href={href}>{content}</Link>;
}

export function SecondaryButton({ children, href, icon = "arrow-right", external, className = "" }: ButtonProps) {
  const Icon = icon === "arrow-up-right" ? ArrowUpRight : ArrowRight;
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-4 rounded-full border border-border font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2 text-[10px] font-mono text-foreground cursor-pointer ${className}`}
    >
      {children}
      <Icon className="w-4 h-4" />
    </motion.div>
  );

  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return <Link href={href}>{content}</Link>;
}
