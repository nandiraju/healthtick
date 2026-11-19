import { motion } from 'framer-motion';
import { ShieldCheck, Lock, UserCheck, KeyRound } from 'lucide-react';

const ACCOUNT_FEATURES = [
  {
    icon: KeyRound,
    title: 'Secure Login & Logout',
    description:
      'Fast, dependable sign-in and clean session logout keep your personal symptom journal protected on your device.',
  },
  {
    icon: UserCheck,
    title: 'Individual User Accounts',
    description:
      'Every user gets a dedicated personal account with an isolated symptom library, custom tags, and private preferences.',
  },
  {
    icon: Lock,
    title: 'Personalized Health Data',
    description:
      'Your symptom records, notes, geographical markers, and reports stay organized exclusively under your account.',
  },
  {
    icon: ShieldCheck,
    title: 'Direct History Access',
    description:
      'Revisit your complete chronological health history whenever you need it — structured, clear, and always yours.',
  },
];

export function AccountSecuritySection() {
  return (
    <section id="security" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass-panel relative overflow-hidden rounded-[2.4rem] p-8 sm:p-12">
          {/* Ambient Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-indigo-400/15 blur-3xl dark:bg-[#7C6BFF]/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl dark:bg-[#2EF2C5]/15"
          />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
            {/* Left: Heading & Animated Orbital Vault Visual */}
            <div className="lg:col-span-5">
              <div className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
                <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-slate-700 dark:text-[#CFE4F8]">
                  User Account Management
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                Private by Design.{' '}
                <span className="font-serif-editorial text-gradient-bio font-normal italic">
                  Uniquely Yours.
                </span>
              </h2>

              <p className="mt-3.5 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-[#9BB0CB]">
                Health records are deeply personal. HealthTik gives every individual a secure,
                dedicated account so your personalized symptom tracking and history remain organized
                and accessible only to you.
              </p>

              {/* Animated Orbital Shield Motif */}
              <div className="mt-8 flex items-center gap-5">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-dashed border-teal-500/50 dark:border-[#2EF2C5]/45"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-2.5 rounded-full border border-indigo-500/45 dark:border-[#7C6BFF]/50"
                  />
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/15 to-indigo-500/15 text-teal-700 dark:from-[#2EF2C5]/25 dark:to-[#7C6BFF]/25 dark:text-[#2EF2C5]">
                    <Lock className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Personal Account Isolation
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-[#8A99B2]">
                    Secure login & logout with dedicated per-user symptom libraries and history.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: 4 Account Pillars Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {ACCOUNT_FEATURES.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xs transition-colors hover:border-slate-300 dark:border-white/[0.08] dark:bg-[#070C17]/75 dark:hover:border-white/15"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-white/[0.05] dark:text-[#2EF2C5]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                      {feat.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
                      {feat.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
