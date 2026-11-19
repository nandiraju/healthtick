import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { trackEvent } from '../utils/analytics';

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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3.5 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'glass-panel'
            : 'border border-transparent bg-transparent'
        }`}
      >
        {/* Brand */}
        <a href="#" className="group flex items-center gap-2.5 focus:outline-none">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0D9488] to-[#4F46E5] shadow-[0_4px_16px_rgba(13,148,136,0.28)] dark:from-[#2EF2C5] dark:to-[#7C6BFF]">
            <Activity className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110 dark:text-[#05080F]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              Health<span className="text-[#0D9488] dark:text-[#2EF2C5]">Tik</span>
            </span>
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-[#8A99B2]">
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
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-900/[0.05] hover:text-slate-950 dark:text-[#B0BED4] dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Theme Switcher + CTA + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            className="glass-pill flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-slate-700 transition-all hover:scale-[1.03] active:scale-[0.97] dark:text-slate-200"
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-3.5 w-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Dark</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-300" />
                <span className="hidden sm:inline">Light</span>
              </>
            )}
          </button>

          <a
            href="#download"
            onClick={() => trackEvent('cta_click', { location: 'navbar' })}
            className="group hidden items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:inline-flex dark:bg-white dark:text-[#05080F]"
          >
            Get the App
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-900/10 bg-white/70 text-slate-900 md:hidden dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-900/[0.05] hover:text-slate-950 dark:text-[#D5E0F2] dark:hover:bg-white/[0.06] dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#download"
                onClick={() => {
                  setMobileOpen(false);
                  trackEvent('cta_click', { location: 'mobile_drawer' });
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#4F46E5] px-4 py-3 text-sm font-bold text-white dark:from-[#2EF2C5] dark:to-[#7C6BFF] dark:text-[#05080F]"
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
