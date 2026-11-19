import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  MapPin,
  Sparkles,
  ArrowRight,
  BarChart3,
  FileText,
} from 'lucide-react';
import { BioSignalCanvas } from './BioSignalCanvas';
import { IPhoneFrame } from './IPhoneFrame';
import { APP_STORE_URL, PLAY_STORE_URL } from '../constants';
import { trackEvent } from '../utils/analytics';

export function HeroSection() {
  // Smooth 120fps 3D pointer tilt for the unobstructed iPhone showcase
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.4 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  const handlePhoneMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePhoneLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      {/* 120fps Native Canvas Bio-Signal Field */}
      <BioSignalCanvas />

      {/* Subtle architectural grid */}
      <div className="bg-bio-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass-pill mb-6 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-bio-pulse absolute inline-flex h-full w-full rounded-full bg-teal-500 dark:bg-[#2EF2C5]" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-600 dark:bg-[#2EF2C5]" />
              </span>
              <span className="font-mono-tech text-xs font-medium tracking-wide text-slate-700 dark:text-[#CFE4F8]">
                HealthTik · Personal Health Symptom Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-950 sm:text-6xl lg:text-[4.25rem] dark:text-white"
            >
              Track What Your{' '}
              <span className="font-serif-editorial text-gradient-bio font-normal italic">
                Body
              </span>{' '}
              Is Telling You.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-[#9BB0CB]"
            >
              HealthTik helps you record, organize, map, and understand your health symptoms over
              time — combining personalized tracking, geographical visualization, chronological
              history, and clear analytics in one effortless mobile app.
            </motion.p>

            {/* Primary Download CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('store_click', { store: 'app_store', location: 'hero_primary' })}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#0D9488] via-[#0284C7] to-[#4F46E5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(13,148,136,0.28)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] dark:from-[#2EF2C5] dark:via-[#4FE8D8] dark:to-[#7C6BFF] dark:text-[#05080F] dark:shadow-[0_0_36px_rgba(46,242,197,0.35)]"
              >
                <span>Download on App Store</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('store_click', { store: 'google_play', location: 'hero_primary' })}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(15,23,42,0.2)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-[#05080F]"
              >
                <span>Get it on Google Play</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#experience"
                className="glass-pill inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-200 hover:bg-white dark:text-white dark:hover:bg-white/[0.08]"
              >
                <Sparkles className="h-4 w-4 text-teal-600 dark:text-[#2EF2C5]" />
                <span>Explore Features</span>
              </a>
            </motion.div>

            {/* Structured 3-Card Liquid Glass Value Strip (Meaningful Real Estate, Zero Overlap) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 grid gap-3 sm:grid-cols-3"
            >
              {[
                {
                  icon: MapPin,
                  title: 'Location Context',
                  desc: 'Auto-tagged geographical patterns',
                  accent: 'text-teal-600 dark:text-[#2EF2C5]',
                },
                {
                  icon: BarChart3,
                  title: 'Visual Analytics',
                  desc: 'Frequency & severity trends',
                  accent: 'text-indigo-600 dark:text-[#7C6BFF]',
                },
                {
                  icon: FileText,
                  title: 'Doctor-Ready',
                  desc: 'Structured exportable history',
                  accent: 'text-sky-600 dark:text-[#38BDF8]',
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="glass-panel rounded-2xl p-4">
                    <Icon className={`h-4 w-4 ${card.accent}`} />
                    <div className="mt-2.5 text-xs font-bold text-slate-950 dark:text-white">
                      {card.title}
                    </div>
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-500 dark:text-[#8A99B2]">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Clean, Unobstructed 19.5:9 iPhone Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:col-span-5"
            style={{ perspective: 1200 }}
            onMouseMove={handlePhoneMove}
            onMouseLeave={handlePhoneLeave}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative will-change-transform"
            >
              {/* Soft Ambient Aura Behind Device */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 rounded-[3.5rem] bg-gradient-to-tr from-teal-400/20 via-indigo-400/15 to-sky-400/20 blur-3xl dark:from-[#2EF2C5]/22 dark:via-[#7C6BFF]/20 dark:to-[#FF6B6B]/18"
              />

              <IPhoneFrame
                screens={[
                  {
                    src: '/screens/01-dashboard.jpg',
                    alt: 'HealthTik home screen showing the Live Health Cockpit, one-tap quick log, Wellness Index and 7-day severity gauge',
                  },
                ]}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
