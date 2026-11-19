import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Plus,
  ShieldCheck,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import { BioSignalCanvas } from './BioSignalCanvas';
import { IPhoneFrame } from './IPhoneFrame';
import { INITIAL_SYMPTOM_LIBRARY } from '../data/healthData';
import { trackEvent } from '../utils/analytics';

interface LoggedToast {
  symptom: string;
  severity: number;
  time: string;
}

export function HeroSection() {
  const [selectedSymptom, setSelectedSymptom] = useState(INITIAL_SYMPTOM_LIBRARY[0]);
  const [severity, setSeverity] = useState(6);
  const [note, setNote] = useState('Bright glare on morning commute');
  const [recentLogs, setRecentLogs] = useState<LoggedToast[]>([
    { symptom: 'Sinus Pressure', severity: 4, time: '08:15 AM' },
  ]);
  const [justLogged, setJustLogged] = useState(false);

  // Subtle 120fps hardware-accelerated 3D pointer tilt for desktop phone showcase
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.4 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const handlePhoneMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePhoneLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleLogSymptom = () => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRecentLogs((prev) => [
      { symptom: selectedSymptom.name, severity, time: nowStr },
      ...prev.slice(0, 1),
    ]);
    setJustLogged(true);
    trackEvent('hero_demo_symptom_logged', {
      symptom: selectedSymptom.name,
      severity,
    });
    setTimeout(() => setJustLogged(false), 1800);
  };

  const severityColor =
    severity >= 8 ? '#EF4444' : severity >= 5 ? '#F59E0B' : '#10B981';

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pb-24">
      {/* 120fps Native Canvas Bio-Signal Field */}
      <BioSignalCanvas />

      {/* Subtle architectural grid */}
      <div className="bg-bio-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-950 sm:text-6xl lg:text-[4.15rem] dark:text-white"
            >
              Track What Your{' '}
              <span className="font-serif-editorial text-gradient-bio font-normal italic">
                Body
              </span>{' '}
              Is Telling You.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-[#9BB0CB]"
            >
              Record, organize, map, and understand your health symptoms over time. HealthTik
              combines effortless symptom logging, interactive geographical mapping, chronological
              history, and visual analytics — so every conversation with your doctor starts with
              clarity.
            </motion.p>

            {/* Primary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#download"
                onClick={() => trackEvent('cta_click', { location: 'hero_primary' })}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#0D9488] via-[#0284C7] to-[#4F46E5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(13,148,136,0.28)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] dark:from-[#2EF2C5] dark:via-[#4FE8D8] dark:to-[#7C6BFF] dark:text-[#05080F] dark:shadow-[0_0_36px_rgba(46,242,197,0.35)]"
              >
                <span>Download HealthTik</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#experience"
                className="glass-pill inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-200 hover:bg-white dark:text-white dark:hover:bg-white/[0.08]"
              >
                <Sparkles className="h-4 w-4 text-teal-600 dark:text-[#2EF2C5]" />
                <span>Explore the 6 Pillars</span>
              </a>
            </motion.div>

            {/* Micro-Proof Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-slate-900/10 pt-6 dark:border-white/[0.08]"
            >
              <div>
                <div className="font-mono-tech text-xl font-bold text-slate-950 sm:text-2xl dark:text-white">
                  &lt;3s
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-[#8A99B2]">
                  Symptom log capture
                </div>
              </div>
              <div>
                <div className="font-mono-tech text-xl font-bold text-teal-600 sm:text-2xl dark:text-[#2EF2C5]">
                  Geo-Mapped
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-[#8A99B2]">
                  Location-tagged patterns
                </div>
              </div>
              <div>
                <div className="font-mono-tech text-xl font-bold text-slate-950 sm:text-2xl dark:text-white">
                  Doctor-Ready
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-[#8A99B2]">
                  Structured exportable history
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: True-to-Life 19.5:9 iPhone Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:col-span-5"
            style={{ perspective: 1200 }}
            onMouseMove={handlePhoneMove}
            onMouseLeave={handlePhoneLeave}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative will-change-transform"
            >
              {/* Soft Ambient Aura Behind iPhone */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-[3.5rem] bg-gradient-to-tr from-teal-400/20 via-indigo-400/15 to-sky-400/20 blur-3xl dark:from-[#2EF2C5]/22 dark:via-[#7C6BFF]/20 dark:to-[#FF6B6B]/18"
              />

              <IPhoneFrame badgeText="LIVE">
                {/* App Header */}
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    <p className="font-mono-tech text-[9px] font-semibold uppercase tracking-widest text-teal-600 dark:text-[#2EF2C5]">
                      Quick Log · Try It Live
                    </p>
                    <h2 className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">
                      How are you feeling?
                    </h2>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-xs dark:border-white/10 dark:bg-white/[0.06] dark:text-[#9BB0CB]">
                    <Sliders className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Symptom Selector Pills */}
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {INITIAL_SYMPTOM_LIBRARY.slice(0, 4).map((item) => {
                    const active = selectedSymptom.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedSymptom(item);
                          setSeverity(item.defaultSeverity);
                        }}
                        className={`flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-left text-[11px] font-semibold transition-all ${
                          active
                            ? 'border border-teal-500/40 bg-teal-50 text-slate-900 shadow-xs dark:border-[#2EF2C5]/40 dark:bg-white/15 dark:text-white'
                            : 'border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-[#8A99B2] dark:hover:text-white'
                        }`}
                      >
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate">{item.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Severity Card */}
                <div className="mt-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-[#9BB0CB]">
                      Intensity
                    </span>
                    <span
                      className="font-mono-tech rounded-md px-1.5 py-0.5 text-[11px] font-bold"
                      style={{
                        color: severityColor,
                        backgroundColor: `${severityColor}18`,
                      }}
                    >
                      {severity} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={severity}
                    onChange={(e) => setSeverity(Number(e.target.value))}
                    aria-label="Symptom severity intensity"
                    className="bio-slider mt-2.5 w-full"
                  />
                  <div className="mt-1 flex justify-between font-mono-tech text-[9px] text-slate-400 dark:text-[#64748B]">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>
                </div>

                {/* Observation Note */}
                <div className="mt-2.5 rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-xs dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <label className="block font-mono-tech text-[9px] font-medium uppercase tracking-wider text-slate-400 dark:text-[#64748B]">
                    Notes
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add triggers or observations..."
                    className="mt-0.5 w-full bg-transparent text-[11px] text-slate-800 placeholder-slate-400 focus:outline-none dark:text-white dark:placeholder-[#64748B]"
                  />
                </div>

                {/* Auto-Captured Metadata */}
                <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                  <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    <Clock className="h-3 w-3 shrink-0 text-teal-600 dark:text-[#2EF2C5]" />
                    <span className="truncate font-mono-tech text-[9px] text-slate-600 dark:text-[#B0BED4]">
                      Auto Time
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    <MapPin className="h-3 w-3 shrink-0 text-indigo-600 dark:text-[#7C6BFF]" />
                    <span className="truncate font-mono-tech text-[9px] text-slate-600 dark:text-[#B0BED4]">
                      San Francisco
                    </span>
                  </div>
                </div>

                {/* Log CTA */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={handleLogSymptom}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#4F46E5] py-2.5 text-[11px] font-bold text-white shadow-sm transition-opacity hover:opacity-95 dark:from-[#2EF2C5] dark:to-[#7C6BFF] dark:text-[#05080F]"
                >
                  {justLogged ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Saved to History & Map</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      <span>Log {selectedSymptom.name}</span>
                    </>
                  )}
                </motion.button>

                {/* Recent Feed */}
                <div className="mt-3 border-t border-slate-200/80 pt-2.5 dark:border-white/[0.07]">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono-tech text-[9px] uppercase tracking-wider text-slate-400 dark:text-[#64748B]">
                      Recent Log
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-medium text-teal-600 dark:text-[#2EF2C5]">
                      <ShieldCheck className="h-3 w-3" /> Private
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <AnimatePresence initial={false}>
                      {recentLogs.map((log, idx) => (
                        <motion.div
                          key={`${log.symptom}-${log.time}-${idx}`}
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                          className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white px-2.5 py-1.5 dark:border-transparent dark:bg-white/[0.04]"
                        >
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  log.severity >= 8
                                    ? '#EF4444'
                                    : log.severity >= 5
                                      ? '#F59E0B'
                                      : '#10B981',
                              }}
                            />
                            <span className="text-[11px] font-semibold text-slate-800 dark:text-white">
                              {log.symptom}
                            </span>
                          </div>
                          <span className="font-mono-tech text-[9px] text-slate-500 dark:text-[#8A99B2]">
                            {log.severity}/10 · {log.time}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
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
