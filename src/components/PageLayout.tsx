import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  showGridLines?: boolean;
  className?: string;
}

export default function PageLayout({ children, showGridLines = true, className = "" }: PageLayoutProps) {
  return (
    <div className={`relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-background ${className}`}>
      <Header />
      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative">
        {showGridLines && (
          <>
            <div className="absolute inset-y-0 left-6 xl:left-10 w-px bg-border/20 pointer-events-none" />
            <div className="absolute inset-y-0 right-6 xl:right-10 w-px bg-border/20 pointer-events-none" />
          </>
        )}
        {children}
        <Footer />
      </div>
    </div>
  );
}
