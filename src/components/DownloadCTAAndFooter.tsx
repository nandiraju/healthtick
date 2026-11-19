import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2, Smartphone } from 'lucide-react';

export function DownloadCTAAndFooter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <>
      <section id="download" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#0E182D] via-[#091020] to-[#060A14] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.8)] sm:p-16">
            {/* Ambient Aurora */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2EF2C5]/25 via-[#7C6BFF]/25 to-[#FF6B6B]/20 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="glass-pill mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
                <Smartphone className="h-3.5 w-3.5 text-[#2EF2C5]" />
                <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#CFE4F8]">
                  Available for iOS & Android
                </span>
              </div>

              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Your body speaks every day.{' '}
                <span className="font-serif-editorial text-gradient-bio font-normal italic">
                  Start listening.
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9BB0CB] sm:text-base">
                Bring clarity to your personal health journey with effortless symptom logging,
                interactive geographical mapping, chronological records, and visual insights.
              </p>

              {/* Store Badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#download"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-left text-[#05080F] shadow-[0_0_32px_rgba(255,255,255,0.22)]"
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
                  href="#download"
                  className="glass-pill inline-flex items-center gap-3 rounded-2xl px-6 py-3.5 text-left text-white transition-colors hover:bg-white/[0.08]"
                >
                  <svg className="h-6 w-6 fill-current text-[#2EF2C5]" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .61-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.493-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div>
                    <div className="text-[10px] font-medium text-[#9BB0CB]">Get it on</div>
                    <div className="text-sm font-extrabold leading-tight">Google Play</div>
                  </div>
                </motion.a>
              </div>

              {/* Release Notification Form */}
              <form
                onSubmit={handleJoin}
                className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 sm:flex-row"
              >
                {submitted ? (
                  <div className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#2EF2C5]/35 bg-[#2EF2C5]/10 px-4 py-3 text-xs font-semibold text-[#2EF2C5]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>You&apos;re on the HealthTik updates list!</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for release updates..."
                      className="flex-1 rounded-2xl border border-white/10 bg-[#05080F]/80 px-4 py-3 text-xs text-white placeholder-[#64748B] focus:border-[#2EF2C5]/60 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#2EF2C5] to-[#7C6BFF] px-5 py-3 text-xs font-bold text-[#05080F] transition-transform active:scale-95"
                    >
                      Notify Me <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-white/[0.07] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#2EF2C5]/20 to-[#7C6BFF]/20 text-[#2EF2C5]">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-white">
                Health<span className="text-[#2EF2C5]">Tik</span>
              </span>
              <span className="ml-2 text-xs text-[#64748B]">
                Personal Health Symptom Tracking Platform
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#8A99B2]">
            <a href="#experience" className="transition-colors hover:text-white">
              Features
            </a>
            <a href="#health-map" className="transition-colors hover:text-white">
              Health Map
            </a>
            <a href="#insights" className="transition-colors hover:text-white">
              Analytics
            </a>
            <a href="#history-share" className="transition-colors hover:text-white">
              Sharing
            </a>
            <a href="#security" className="transition-colors hover:text-white">
              Account Security
            </a>
          </div>

          <div className="font-mono-tech text-[11px] text-[#64748B]">
            © {new Date().getFullYear()} HealthTik
          </div>
        </div>
      </footer>
    </>
  );
}
