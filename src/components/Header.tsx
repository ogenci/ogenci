import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import BodyText from "@/components/BodyText";

export default function Header() {
  const { scrollY } = useScroll();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(e.target as Node)) {
        setWorkDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navWidth = useTransform(scrollY, [0, 100], [isMobile ? "100%" : "100%", isMobile ? "100%" : "80%"]);
  const navPadding = useTransform(scrollY, [0, 100], [isMobile ? "0.5rem 0.5rem" : "0.8rem 0.75rem", "0.5rem 0.5rem"]);
  const navRadius = useTransform(scrollY, [0, 100], [isMobile ? "9999px" : "0px", "9999px"]);
  const navTop = useTransform(scrollY, [0, 100], [isMobile ? "12px" : "0px", isMobile ? "12px" : "16px"]);
  const navShadow = useTransform(scrollY, [0, 100], [isMobile ? "0 24px 48px -12px rgba(0,0,0,0.2)" : "none", "0 24px 48px -12px rgba(0,0,0,0.2)"]);
  const navBorder = useTransform(scrollY, [0, 100], [isMobile ? "hsl(var(--border) / 0.5)" : "hsl(var(--border) / 0)", "hsl(var(--border) / 0.5)"]);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    if (location === "/") {
      e.preventDefault();
      setIsMenuOpen(false);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Topbar */}
      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative hidden md:block">
        <div className="border-b border-border py-2 px-6 flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>OGENCI · Rooted in Africa · Serving the World</span>
          <span className="hidden lg:block">Web Design · Paid Ads · AI Integrations · Global ROI</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Booking Q3 · 2026 · EN </span>
          </div>
        </div>
      </div>

      {/* Sticky Nav Wrapper */}
      <div className="sticky top-0 z-50 w-full max-w-[1600px] mx-auto px-6 xl:px-10 flex justify-center pointer-events-none">
        <motion.div
          style={{
            width: navWidth,
            borderRadius: navRadius,
            boxShadow: navShadow,
            borderColor: navBorder,
            padding: navPadding,
            top: navTop
          }}
          className="relative pointer-events-auto bg-background/80 backdrop-blur-xl border transition-colors"
        >
          <div className="w-full max-w-[1600px] mx-auto px-2">
            <nav className="flex items-center justify-between transition-all duration-300">
              <div className="flex items-center gap-4 group">
                <Link href="/" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src="/favicon.svg" alt="OGENCI Logo" className="w-8 h-8 object-contain" />
                  </div>
                  <div className="flex flex-col hidden md:flex">
                    <span className="text-xl font-display font-bold tracking-[0.3em] text-foreground uppercase leading-none mr-[-0.3em]">OGENCI</span>
                    <span className="text-[7px] font-mono text-muted-foreground uppercase tracking-[0.45em] leading-none mt-1.5 mr-[-0.45em] block text-center">GLOBAL AGENCY</span>
                  </div>
                </Link>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                <Link href="/#services" onClick={(e) => handleNavClick("services", e)} className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-1">
                  Services <span className="text-[8px] opacity-50 mb-1">03</span>
                </Link>
                <Link href="/#pricing" onClick={(e) => handleNavClick("pricing", e)} className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-1">
                  Pricing <span className="text-[8px] opacity-50 mb-1">04</span>
                </Link>
                <Link href="/#process" onClick={(e) => handleNavClick("process", e)} className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-1">
                  Process <span className="text-[8px] opacity-50 mb-1">05</span>
                </Link>

                {/* Work Dropdown */}
                <div ref={workRef} className="relative">
                  <button
                    onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
                    onMouseEnter={() => setWorkDropdownOpen(true)}
                    className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-1"
                  >
                    Work <span className="text-[8px] opacity-50 mb-1">06</span>
                    <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${workDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {workDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        onMouseEnter={() => setWorkDropdownOpen(true)}
                        onMouseLeave={() => setWorkDropdownOpen(false)}
                        className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl overflow-hidden origin-top"
                      >
                        <Link
                          href="/work"
                          onClick={() => setWorkDropdownOpen(false)}
                          className="block px-5 py-3.5 hover:bg-muted/50 hover:text-primary transition-all text-[10px] font-mono uppercase tracking-[0.2em] font-bold border-b border-border/50"
                        >
                          <span className="text-primary">/</span> View All / Portfolio
                        </Link>
                        <Link
                          href="/education"
                          onClick={() => setWorkDropdownOpen(false)}
                          className="block px-5 py-3.5 hover:bg-muted/50 hover:text-primary transition-all text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
                        >
                          <span className="text-primary">/</span> Education
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/insights" className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-1">
                  Insights <span className="text-[8px] opacity-50 mb-1">07</span>
                </Link>
                <Link href="/#contact" onClick={(e) => handleNavClick("contact", e)} className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all">
                  Contact <span className="text-[8px] opacity-50 mb-1">08</span>
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/book">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 h-10 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer bg-primary text-primary-foreground"
                  >
                    Let's Talk 
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.div>
                </Link>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </nav>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col px-6 py-8 md:hidden overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <img src="/favicon.svg" alt="OGENCI" className="w-6 h-6" />
                <span className="text-lg font-display font-bold tracking-widest text-foreground uppercase">OGENCI</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-muted/50 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-1 flex-grow">
              <BodyText tracking="0.3em" className="mb-4" as="div">Navigation</BodyText>
              {[
                { name: "Services", id: "services", num: "03" },
                { name: "Pricing", id: "pricing", num: "04" },
                { name: "Process", id: "process", num: "05" },
                { name: "Work", id: "work", num: "06", isExpandable: true },
                { name: "Insights", id: "insights", num: "07", isPage: true, href: "/insights" },
                { name: "Contact", id: "contact", num: "08" },
              ].map((link) => {
                if (link.isPage) {
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-fit px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-3 text-sm font-black uppercase tracking-[0.1em]"
                    >
                      <span className="text-[10px] opacity-40 font-mono mb-0.5">{link.num}</span>
                      {link.name}
                    </Link>
                  );
                }
                if (link.isExpandable) {
                  return (
                    <div key={link.id} className="flex flex-col">
                      <button
                        onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
                        className="w-fit px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-3 text-sm font-black uppercase tracking-[0.1em]"
                      >
                        <span className="text-[10px] opacity-40 font-mono mb-0.5">{link.num}</span>
                        {link.name}
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${mobileWorkOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileWorkOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden flex flex-col pl-8"
                          >
                            <Link
                              href="/work"
                              onClick={() => setIsMenuOpen(false)}
                              className="w-fit px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground/80"
                            >
                              / View All / Portfolio
                            </Link>
                            <Link
                              href="/education"
                              onClick={() => setIsMenuOpen(false)}
                              className="w-fit px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground/80"
                            >
                              / Education
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <button
                    key={link.id}
                    onClick={(e) => handleNavClick(link.id, e as any)}
                    className="w-fit px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-3 text-sm font-black uppercase tracking-[0.1em]"
                  >
                    <span className="text-[10px] opacity-40 font-mono mb-0.5">{link.num}</span>
                    {link.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 space-y-8 pb-8 border-t border-border pt-8">
              <div className="space-y-4">
                <BodyText tracking="0.3em" as="div">Get Started</BodyText>
                <Link href="/book" onClick={() => setIsMenuOpen(false)}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="w-fit flex items-center justify-between px-8 h-11 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer bg-primary text-primary-foreground"
                  >
                    Let's Talk
                    <ArrowUpRight className="w-4 h-4 ml-4" />
                  </motion.div>
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <BodyText tracking="0.3em" as="div">Socials</BodyText>
                <div className="flex gap-10 text-xs font-mono font-bold uppercase tracking-[0.2em]">
                  <a href="https://wa.me/233263460173" target="_blank" rel="noreferrer" className="hover:text-primary">WhatsApp</a>
                  <a href="https://www.linkedin.com/company/ogencidigital" target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a>
                  <a href="https://www.instagram.com/ogencidigital/" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
