import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/PrimaryButton";
import { fadeUp } from "@/lib/animations";
import BodyText from "@/components/BodyText";

interface CtaAction {
  label: string;
  href: string;
}

interface DarkCtaSectionProps {
  heading: string;
  description: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
}

export default function DarkCtaSection({ heading, description, primaryAction, secondaryAction }: DarkCtaSectionProps) {
  return (
    <section className="px-6 py-40 flex flex-col items-center text-center relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-primary rounded-full blur-[200px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative z-10 max-w-3xl"
      >
        <h2 className="text-5xl md:text-[84px] font-display font-bold leading-none tracking-tight mb-8" dangerouslySetInnerHTML={{ __html: heading }} />

        <BodyText className="text-white/70 mb-12 max-w-xl mx-auto">{description}</BodyText>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton href={primaryAction.href}>{primaryAction.label}</PrimaryButton>

          {secondaryAction && (
            <Link href={secondaryAction.href}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-full font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 text-[10px] font-mono text-white border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
              >
                {secondaryAction.label} <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
