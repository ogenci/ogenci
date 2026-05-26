import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BodyText from "@/components/BodyText";

interface SectionFooterProps {
  leftText: string;
  ctaText: string;
  ctaHref: string;
  dark?: boolean;
}

export default function SectionFooter({ leftText, ctaText, ctaHref, dark }: SectionFooterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-border pt-12">
      <BodyText as="div">{leftText}</BodyText>
      <Link href={ctaHref}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] font-mono inline-flex items-center gap-3 cursor-pointer ${dark ? "bg-primary text-primary-foreground" : "bg-foreground text-background"}`}
        >
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </Link>
    </div>
  );
}
