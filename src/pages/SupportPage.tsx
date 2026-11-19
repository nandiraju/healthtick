import { MotionConfig } from 'framer-motion';
import {
  Mail,
  ShieldCheck,
  MapPin,
  SlidersHorizontal,
  Share2,
  KeyRound,
  ArrowUpRight,
  LifeBuoy,
  ExternalLink,
} from 'lucide-react';
import { ThemeProvider } from '../context/ThemeContext';
import { Navbar } from '../components/Navbar';
import { FaqSection } from '../components/FaqSection';
import { DownloadCTAAndFooter } from '../components/DownloadCTAAndFooter';
import { APP_STORE_URL, SUPPORT_EMAIL } from '../constants';
import { trackEvent } from '../utils/analytics';

const HELP_TOPICS = [
  {
    icon: KeyRound,
    title: 'Account & Sign-In',
    desc: 'Need help logging in, resetting access, or requesting deletion of your HealthTik account and records? Email our support team from the address associated with your account.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Custom Symptom Library',
    desc: 'You can add, edit, and remove custom symptoms anytime inside the HealthTik app to tailor daily tracking to your individual health needs.',
  },
  {
    icon: MapPin,
    title: 'Health Map & Location Access',
    desc: 'Health Map uses location permissions only when you log symptoms so you can visualize geographical patterns. You can adjust location permissions anytime in iOS Settings → HealthTik.',
  },
  {
    icon: Share2,
    title: 'Exporting & Sharing Reports',
    desc: 'Export your chronological symptom history and visual reports directly from the app to review during consultations with healthcare professionals.',
  },
];

export function SupportPage() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-[#F4F7FB] text-[#0B1220] transition-colors duration-300 dark:bg-[#04070E] dark:text-[#F4F7FB]">
          {/* Ambient Liquid Glass Mesh */}
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="animate-float-orb absolute -top-32 -left-24 h-[32rem] w-[32rem] rounded-full bg-teal-300/28 blur-[110px] dark:bg-[#2EF2C5]/12" />
            <div className="animate-float-orb-reverse absolute top-[35%] -right-32 h-[34rem] w-[34rem] rounded-full bg-indigo-300/25 blur-[120px] dark:bg-[#7C6BFF]/14" />
          </div>

          <div className="relative z-10">
            <Navbar />

            <main className="pt-28 pb-10 sm:pt-36">
              {/* Support Hero */}
              <section className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12">
                  <div className="glass-pill mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1">
                    <LifeBuoy className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
                    <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-slate-700 dark:text-[#CFE4F8]">
                      HealthTik Support Center
                    </span>
                  </div>

                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                    How can we{' '}
                    <span className="font-serif-editorial text-gradient-bio font-normal italic">
                      help you?
                    </span>
                  </h1>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
                    Have a question about symptom tracking, your Health Map, exporting reports, or
                    managing your HealthTik account? Reach out directly by email or browse the
                    answers below.
                  </p>

                  {/* Primary Support Actions */}
                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <a
                      href={`mailto:${SUPPORT_EMAIL}?subject=HealthTik%20Support%20Request`}
                      onClick={() => trackEvent('support_email_click', { page: 'support' })}
                      className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#0D9488] via-[#0284C7] to-[#4F46E5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(13,148,136,0.26)] transition-transform hover:scale-[1.02] active:scale-[0.98] dark:from-[#2EF2C5] dark:via-[#4FE8D8] dark:to-[#7C6BFF] dark:text-[#05080F]"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email {SUPPORT_EMAIL}</span>
                    </a>

                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('store_click', { store: 'app_store', page: 'support' })}
                      className="glass-pill inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-white dark:text-white dark:hover:bg-white/[0.1]"
                    >
                      <span>View on App Store</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href="/privacy/"
                      className="glass-pill inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-white dark:text-white dark:hover:bg-white/[0.1]"
                    >
                      <ShieldCheck className="h-4 w-4 text-teal-600 dark:text-[#2EF2C5]" />
                      <span>Privacy Policy</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <p className="mt-5 font-mono-tech text-xs text-slate-500 dark:text-[#8A99B2]">
                    Direct support email: <span className="font-semibold text-slate-800 dark:text-white">{SUPPORT_EMAIL}</span> · Typical response within 1–2 business days.
                  </p>
                </div>

                {/* Quick Help Topics */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {HELP_TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <div key={topic.title} className="glass-panel rounded-3xl p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/12 text-teal-600 dark:bg-[#2EF2C5]/15 dark:text-[#2EF2C5]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h2 className="mt-4 text-base font-bold text-slate-950 dark:text-white">
                          {topic.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
                          {topic.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Full FAQ Section */}
              <FaqSection />
            </main>

            <DownloadCTAAndFooter showCta={false} />
          </div>
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default SupportPage;
