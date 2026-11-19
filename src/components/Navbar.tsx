import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { APP_STORE_URL, PLAY_STORE_URL } from '../constants';
import { trackEvent } from '../utils/analytics';

const NAV_LINKS = [
  { label: 'Features', href: '/#experience' },
  { label: 'Health Map', href: '/#health-map' },
  { label: 'Insights', href: '/#insights' },
  { label: 'Support', href: '/support/' },
  { label: 'Privacy', href: '/privacy/' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'glass-panel'
            : 'border border-white/40 bg-white/35 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03]'
        }`}
      >
        {/* Brand */}
        <a href="/" className="group flex items-center gap-2.5 focus:outline-none">
          <img
            src="/icon-192.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-[10px] shadow-[0_6px_18px_rgba(7,84,92,0.28)] transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
            Health<span className="text-[#0D9488] dark:text-[#2EF2C5]">Tik</span>
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/60 hover:text-slate-950 dark:text-[#B0BED4] dark:hover:bg-white/[0.08] dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-2">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('store_click', { store: 'app_store', location: 'navbar' })}
            className="group hidden items-center gap-1.5 rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(15,23,42,0.18)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:inline-flex dark:bg-white dark:text-[#05080F]"
          >
            App Store
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('store_click', { store: 'google_play', location: 'navbar' })}
            className="group glass-pill hidden items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-slate-900 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:inline-flex dark:text-white"
          >
            Google Play
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="glass-pill flex h-9 w-9 items-center justify-center rounded-full text-slate-900 md:hidden dark:text-white"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="glass-panel mx-auto mt-2.5 max-w-6xl rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-white/60 hover:text-slate-950 dark:text-[#D5E0F2] dark:hover:bg-white/[0.08] dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileOpen(false);
                  trackEvent('store_click', { store: 'app_store', location: 'mobile_drawer' });
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#4F46E5] px-4 py-3 text-sm font-bold text-white dark:from-[#2EF2C5] dark:to-[#7C6BFF] dark:text-[#05080F]"
              >
                Download on the App Store
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileOpen(false);
                  trackEvent('store_click', { store: 'google_play', location: 'mobile_drawer' });
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white dark:bg-white dark:text-[#05080F]"
              >
                Get it on Google Play
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
