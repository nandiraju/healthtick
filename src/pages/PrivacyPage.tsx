import { MotionConfig } from 'framer-motion';
import { ShieldCheck, Mail, LifeBuoy, ArrowLeft } from 'lucide-react';
import { ThemeProvider } from '../context/ThemeContext';
import { Navbar } from '../components/Navbar';
import { DownloadCTAAndFooter } from '../components/DownloadCTAAndFooter';
import { SUPPORT_EMAIL, SITE_URL } from '../constants';

const SECTIONS = [
  {
    title: '1. Overview & Commitment to Your Privacy',
    body: [
      'HealthTik ("we," "our," or "us") respects your privacy and is committed to protecting the personal and health information you record using the HealthTik mobile application (iOS App ID: 1076611952) and website at healthtik.cend.in.',
      'This Privacy Policy explains what information the HealthTik app collects, how it is used, how it is protected, and the choices you have over your data.',
    ],
  },
  {
    title: '2. Information We Collect',
    body: [
      'Health & Symptom Data: Symptoms you create or log, severity/intensity ratings, personal notes and observations, timestamps, and your personalized symptom library.',
      'Location Data (Optional): If you grant location permissions on your device, HealthTik records the geographical location associated with a symptom entry so you can visualize patterns on your personal Health Map. You may disable location access at any time in your iOS Settings.',
      'Account Data: Basic account credentials (such as your email address and authentication identifiers) required to provide secure individual user login, logout, and access to your personal symptom history.',
      'Analytics & Diagnostics: We may collect anonymized crash logs, performance diagnostics, and aggregate website usage analytics (such as Google Analytics on healthtik.cend.in) to improve app stability and user experience. Health symptom content and personal notes are never included in marketing or advertising analytics.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: [
      'We use your information strictly to deliver and improve HealthTik’s core features: recording and organizing symptoms, displaying your chronological health history, rendering your personal Health Map, generating visual health reports and trends, and enabling you to export or share your records when you choose to do so.',
      'HealthTik is a personal health tracking tool and does not provide medical advice, diagnosis, or treatment.',
    ],
  },
  {
    title: '4. No Sale of Health or Personal Data',
    body: [
      'We never sell, rent, or trade your personal information or health symptom data to third parties, advertisers, or data brokers.',
      'Your health and symptom data is never used for targeted advertising, third-party marketing, or profiling.',
    ],
  },
  {
    title: '5. User-Initiated Sharing & Healthcare Exports',
    body: [
      'HealthTik allows you to export and share symptom records and reports (for example, to review with a healthcare professional). Sharing only occurs when you explicitly initiate an export or share action from your device.',
      'Once you export or send a report outside of HealthTik, that copy is governed by the privacy practices of the recipient or service you chose.',
    ],
  },
  {
    title: '6. Data Security',
    body: [
      'We use industry-standard technical and organizational safeguards, including encrypted data transmission (HTTPS/TLS) and isolated individual user accounts, to help protect your personal and health information against unauthorized access, loss, or misuse.',
    ],
  },
  {
    title: '7. Data Retention & Account Deletion',
    body: [
      'We retain your personal symptom history for as long as your account remains active or as needed to provide the service.',
      `You may delete individual symptom entries within the app at any time. To request permanent deletion of your HealthTik account and all associated data, contact us at ${SUPPORT_EMAIL} from your registered email address, and we will process your request promptly.`,
    ],
  },
  {
    title: "8. Children's Privacy",
    body: [
      'HealthTik is not directed to children under the age of 13 (or the minimum digital consent age in your jurisdiction), and we do not knowingly collect personal information from children. If you believe a child has provided personal information to us, please contact us so we can delete it.',
    ],
  },
  {
    title: '9. Changes to This Privacy Policy',
    body: [
      `We may update this Privacy Policy periodically to reflect improvements to HealthTik or legal requirements. Any updates will be posted at ${SITE_URL}/privacy/ with an updated effective date.`,
    ],
  },
  {
    title: '10. Contact Us',
    body: [
      `If you have any questions, privacy requests, or concerns about this Privacy Policy or your HealthTik data, please email us at ${SUPPORT_EMAIL}.`,
    ],
  },
];

export function PrivacyPage() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-[#F4F7FB] text-[#0B1220] transition-colors duration-300 dark:bg-[#04070E] dark:text-[#F4F7FB]">
          {/* Ambient Liquid Glass Mesh */}
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="animate-float-orb absolute -top-32 -left-24 h-[32rem] w-[32rem] rounded-full bg-teal-300/24 blur-[110px] dark:bg-[#2EF2C5]/10" />
            <div className="animate-float-orb-reverse absolute top-[40%] -right-32 h-[34rem] w-[34rem] rounded-full bg-indigo-300/22 blur-[120px] dark:bg-[#7C6BFF]/12" />
          </div>

          <div className="relative z-10">
            <Navbar />

            <main className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6 sm:pt-36">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="/"
                  className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to HealthTik
                </a>
                <a
                  href="/support/"
                  className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
                >
                  <LifeBuoy className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
                  Support & FAQ
                </a>
              </div>

              <article className="glass-panel rounded-[2.5rem] p-7 sm:p-12">
                <div className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
                  <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-slate-700 dark:text-[#CFE4F8]">
                    Privacy Policy
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                  HealthTik Privacy Policy
                </h1>
                <p className="mt-2 font-mono-tech text-xs text-slate-500 dark:text-[#8A99B2]">
                  Effective Date: November 19, 2026 · Applies to HealthTik iOS App & healthtik.cend.in
                </p>

                <div className="mt-8 space-y-8 border-t border-slate-900/10 pt-8 dark:border-white/[0.08]">
                  {SECTIONS.map((sec) => (
                    <section key={sec.title}>
                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                        {sec.title}
                      </h2>
                      <div className="mt-2.5 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
                        {sec.body.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-900/10 bg-white/60 p-5 dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <div>
                    <div className="text-sm font-bold text-slate-950 dark:text-white">
                      Questions about your privacy or data deletion?
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-[#9BB0CB]">
                      Reach our team directly anytime.
                    </p>
                  </div>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}?subject=HealthTik%20Privacy%20Inquiry`}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition-transform hover:scale-[1.02] dark:bg-white dark:text-[#05080F]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </article>
            </main>

            <DownloadCTAAndFooter showCta={false} />
          </div>
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default PrivacyPage;
