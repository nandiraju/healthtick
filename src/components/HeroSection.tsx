import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Activity,
  BarChart3,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { BioSignalCanvas } from './BioSignalCanvas';
import { IPhoneFrame } from './IPhoneFrame';
import { APP_STORE_URL } from '../constants';
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

              <IPhoneFrame>
                <div className="flex h-full flex-col justify-between pt-1 pb-2">
                  <div>
                    {/* App Top Bar */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono-tech text-[9px] font-semibold uppercase tracking-widest text-teal-600 dark:text-[#2EF2C5]">
                          Today · Nov 19
                        </p>
                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                          Health Overview
                        </h2>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0D9488] to-[#4F46E5] text-white shadow-xs dark:from-[#2EF2C5] dark:to-[#7C6BFF] dark:text-[#05080F]">
                        <Activity className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Hero Visual Status Card inside App */}
                    <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#4F46E5] p-4 text-white shadow-md dark:from-[#0F2438] dark:to-[#1B183B] dark:ring-1 dark:ring-white/10">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[9px] uppercase tracking-wider text-white/80">
                          Latest Symptom Log
                        </span>
                        <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono-tech text-[9px] font-bold">
                          6 / 10
                        </span>
                      </div>
                      <div className="mt-1.5 text-lg font-bold">Migraine Aura</div>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/85">
                        Morning glare on commute. Logged with timestamp & location.
                      </p>
                      <div className="mt-3 flex items-center gap-3 font-mono-tech text-[9px] text-white/80">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 09:42 AM
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> Downtown
                        </span>
                      </div>
                    </div>

                    {/* Visual Trend Preview Card */}
                    <div className="glass-card-inner mt-3 rounded-2xl p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-800 dark:text-white">
                          Weekly Intensity
                        </span>
                        <span className="font-mono-tech text-[10px] font-bold text-teal-600 dark:text-[#2EF2C5]">
                          -18% calmer
                        </span>
                      </div>
                      <div className="mt-3 flex h-16 items-end gap-1.5">
                        {[55, 78, 42, 84, 52, 36, 44].map((h, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{
                              delay: 0.35 + idx * 0.05,
                              type: 'spring',
                              stiffness: 240,
                              damping: 22,
                            }}
                            style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500/45 to-teal-500 dark:from-[#7C6BFF]/55 dark:to-[#2EF2C5]"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Recent Logged Symptoms List */}
                    <div className="mt-3 space-y-2">
                      {[
                        { name: 'Sinus Pressure', meta: 'Yesterday · 4/10', color: '#10B981' },
                        { name: 'Afternoon Fatigue', meta: 'Nov 17 · 6/10', color: '#6366F1' },
                      ].map((row) => (
                        <div
                          key={row.name}
                          className="glass-card-inner flex items-center justify-between rounded-xl px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: row.color }}
                            />
                            <span className="text-[11px] font-semibold text-slate-800 dark:text-white">
                              {row.name}
                            </span>
                          </div>
                          <span className="font-mono-tech text-[9px] text-slate-500 dark:text-[#8A99B2]">
                            {row.meta}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subtle App Privacy Footer */}
                  <div className="mt-3 flex items-center justify-center gap-1.5 font-mono-tech text-[9px] text-slate-400 dark:text-[#64748B]">
                    <ShieldCheck className="h-3 w-3 text-teal-600 dark:text-[#2EF2C5]" />
                    <span>Personal HealthTik Journal</span>
                  </div>
                </div>
              </IPhoneFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
