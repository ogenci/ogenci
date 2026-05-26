import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import BodyText from "@/components/BodyText";

interface SectionHeaderProps {
  heading: ReactNode;
  description: string;
}

export default function SectionHeader({ heading, description }: SectionHeaderProps) {
  return (
    <div className="mt-20 mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight"
      >
        {heading}
      </motion.h2>
      <div className="flex gap-6 max-w-sm">
        <span className="text-2xl font-light mt-[-4px] text-primary">+</span>
        <BodyText tracking="0.2em">{description}</BodyText>
      </div>
    </div>
  );
}
