import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Health Map', href: '#health-map' },
  { label: 'Insights', href: '#insights' },
  { label: 'History & Share', href: '#history-share' },
  { label: 'Security', href: '#security' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'glass-panel border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)]'
            : 'border border-transparent bg-transparent'
        }`}
      >
        {/* Brand */}
        <a href="#" className="group flex items-center gap-2.5 focus:outline-none">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2EF2C5] to-[#7C6BFF] p-[1px] shadow-[0_0_24px_rgba(46,242,197,0.35)]">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#070C17]">
              <Activity className="h-4 w-4 text-[#2EF2C5] transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white">
              Health<span className="text-[#2EF2C5]">Tik</span>
            </span>
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#8A99B2]">
              Personal Health OS
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#B0BED4] transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile Menu Button */}
        <div className="flex items-center gap-2.5">
          <a
            href="#download"
            className="group hidden items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#05080F] shadow-[0_0_24px_rgba(255,255,255,0.2)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:inline-flex"
          >
            Get the App
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="glass-panel mx-auto mt-2.5 max-w-6xl rounded-2xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[#D5E0F2] transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#download"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2EF2C5] to-[#7C6BFF] px-4 py-3 text-sm font-bold text-[#05080F]"
              >
                Download HealthTik
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
