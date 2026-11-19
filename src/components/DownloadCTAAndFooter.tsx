import { motion } from 'framer-motion';
import { Activity, Smartphone, Sun, Moon, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { APP_STORE_URL, SUPPORT_EMAIL } from '../constants';
import { trackEvent } from '../utils/analytics';

interface DownloadCTAAndFooterProps {
  showCta?: boolean;
}

export function DownloadCTAAndFooter({ showCta = true }: DownloadCTAAndFooterProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {showCta && (
        <section id="download" className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="glass-panel relative overflow-hidden rounded-[2.75rem] p-8 text-center sm:p-16">
              {/* Soft Refractive Aurora */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-400/25 via-indigo-400/20 to-sky-400/25 blur-3xl dark:from-[#2EF2C5]/25 dark:via-[#7C6BFF]/25 dark:to-[#FF6B6B]/20"
              />

              <div className="relative z-10 mx-auto max-w-2xl">
                <div className="glass-pill mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
                  <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-slate-700 dark:text-[#CFE4F8]">
                    Available on the Apple App Store
                  </span>
                </div>

                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                  Your body speaks every day.{' '}
                  <span className="font-serif-editorial text-gradient-bio font-normal italic">
                    Start listening.
                  </span>
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-[#9BB0CB]">
                  Bring clarity to your personal health journey with effortless symptom logging,
                  interactive geographical mapping, chronological records, and visual insights.
                </p>

                {/* Store & Support CTAs */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('store_click', { store: 'app_store', location: 'cta' })}
                    className="inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-6 py-3.5 text-left text-white shadow-[0_12px_30px_rgba(15,23,42,0.2)] dark:bg-white dark:text-[#05080F]"
                  >
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.67-.81 1.12-1.94 1-3.08-.96.04-2.13.64-2.82 1.45-.61.71-1.15 1.87-1 2.98 1.08.08 2.16-.54 2.82-1.35" />
                    </svg>
                    <div>
                      <div className="text-[10px] font-medium opacity-75">Download on the</div>
                      <div className="text-sm font-extrabold leading-tight">App Store</div>
                    </div>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href={`mailto:${SUPPORT_EMAIL}?subject=HealthTik%20Inquiry`}
                    className="glass-pill inline-flex items-center gap-2.5 rounded-2xl px-6 py-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90 dark:text-white dark:hover:bg-white/[0.1]"
                  >
                    <Mail className="h-4 w-4 text-teal-600 dark:text-[#2EF2C5]" />
                    <span>{SUPPORT_EMAIL}</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Centered Site Footer matching healment.cend.in structure */}
      <footer className="relative z-10 border-t border-slate-900/[0.08] bg-white/45 py-14 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
          {/* App Logo (56x56) */}
          <a
            href="/"
            aria-label="HealthTik Home"
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#4F46E5] shadow-[0_10px_28px_rgba(13,148,136,0.28)] transition-transform duration-200 hover:scale-105 dark:from-[#2EF2C5] dark:to-[#7C6BFF]"
          >
            <Activity className="h-7 w-7 text-white dark:text-[#05080F]" />
          </a>

          {/* Copyright */}
          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-[#9BB0CB]">
            © {new Date().getFullYear()} HealthTik. All rights reserved.
          </p>

          {/* Footer Navigation + Inline Theme Toggle Icon Button */}
          <nav
            aria-label="Footer"
            className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm font-medium text-slate-600 dark:text-[#9BB0CB]"
          >
            <a href="/#experience" className="transition-colors hover:text-slate-950 dark:hover:text-white">
              Features
            </a>
            <a href="/#health-map" className="transition-colors hover:text-slate-950 dark:hover:text-white">
              Health Map
            </a>
            <a href="/#insights" className="transition-colors hover:text-slate-950 dark:hover:text-white">
              Insights
            </a>
            <a href="/privacy/" className="transition-colors hover:text-slate-950 dark:hover:text-white">
              Privacy Policy
            </a>
            <a href="/support/" className="transition-colors hover:text-slate-950 dark:hover:text-white">
              Support
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="transition-colors hover:text-slate-950 dark:hover:text-white"
            >
              Contact
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Switch between dark and light colours"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="glass-pill inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition-transform duration-200 hover:scale-105 active:scale-95 dark:text-slate-200"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 text-indigo-600" />
              ) : (
                <Sun className="h-4 w-4 text-amber-300" />
              )}
            </button>
          </nav>

          {/* Author Credit & Links */}
          <p className="mt-6 text-xs leading-relaxed text-slate-500 dark:text-[#8A99B2]">
            HealthTik app &amp; website designed and developed by{' '}
            <a
              href="https://srikanth.nandiraju.com/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-slate-800 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-teal-600 hover:decoration-teal-500 dark:text-slate-200 dark:decoration-white/20 dark:hover:text-[#2EF2C5]"
            >
              Srikanth Nandiraju
            </a>{' '}
            ·{' '}
            <a
              href="https://ai.nandiraju.com/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-slate-800 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-teal-600 hover:decoration-teal-500 dark:text-slate-200 dark:decoration-white/20 dark:hover:text-[#2EF2C5]"
            >
              Talk to the digital twin of Srikanth Nandiraju
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
