import { motion } from "framer-motion";
import Cal from "@calcom/embed-react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import DotGrid from "@/components/DotGrid";
import { scaleIn } from "@/lib/animations";

export default function BookingPage() {
  return (
    <PageLayout>
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex flex-col items-center text-center max-w-4xl mx-auto">
            <PageHero
              badge="Strategy · Discovery · ROI"
              heading={<>Ready to <em className="italic font-normal text-primary">dominate</em> your market?</>}
              description="Stop guessing. Start growing. Select a time below for a high-impact, no-nonsense strategy audit. We'll diagnose your digital infrastructure and map the exact blueprint required to scale your business globally."
            />
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto border border-border rounded-3xl overflow-hidden bg-card min-h-[700px] shadow-2xl relative"
          >
            <DotGrid size={16} opacity={0.02} />
            <Cal
              namespace="lets-talk"
              calLink="ogenci/lets-talk"
              style={{ width: "100%", height: "100%", minHeight: "700px" }}
              config={{ layout: "month_view" }}
            />
          </motion.div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-t border-border pt-12">
            <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Next available slots: Q3 2026
            </div>
            <div>
              GMT +0 · Accra, Ghana · Worldwide
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
