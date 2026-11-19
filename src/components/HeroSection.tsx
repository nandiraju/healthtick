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
import { INITIAL_SYMPTOM_LIBRARY } from '../data/healthData';

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
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);

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
      ...prev.slice(0, 2),
    ]);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 1800);
  };

  const severityColor =
    severity >= 8 ? '#FF6B6B' : severity >= 5 ? '#FFB84D' : '#2EF2C5';

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      {/* 120fps Native Canvas Bio-Signal Field */}
      <BioSignalCanvas />

      {/* Subtle architectural grid */}
      <div className="bg-bio-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-pill mb-6 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-bio-pulse absolute inline-flex h-full w-full rounded-full bg-[#2EF2C5]" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2EF2C5]" />
              </span>
              <span className="font-mono-tech text-xs tracking-wide text-[#CFE4F8]">
                HealthTik · Personal Health Symptom Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.15rem]"
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
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#9BB0CB] sm:text-lg"
            >
              Record, organize, map, and understand your health symptoms over time. HealthTik
              combines effortless symptom logging, interactive geographical mapping, chronological
              history, and visual analytics — so every conversation with your doctor starts with
              clarity.
            </motion.p>

            {/* Primary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#download"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#2EF2C5] via-[#4FE8D8] to-[#7C6BFF] px-6 py-3.5 text-sm font-bold text-[#05080F] shadow-[0_0_36px_rgba(46,242,197,0.35)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Download HealthTik</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#experience"
                className="glass-pill inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08]"
              >
                <Sparkles className="h-4 w-4 text-[#2EF2C5]" />
                <span>Explore the 6 Pillars</span>
              </a>
            </motion.div>

            {/* Micro-Proof Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/[0.08] pt-6"
            >
              <div>
                <div className="font-mono-tech text-xl font-bold text-white sm:text-2xl">&lt;3s</div>
                <div className="mt-0.5 text-xs text-[#8A99B2]">Symptom log capture</div>
              </div>
              <div>
                <div className="font-mono-tech text-xl font-bold text-[#2EF2C5] sm:text-2xl">
                  Geo-Mapped
                </div>
                <div className="mt-0.5 text-xs text-[#8A99B2]">Location-tagged patterns</div>
              </div>
              <div>
                <div className="font-mono-tech text-xl font-bold text-white sm:text-2xl">
                  Doctor-Ready
                </div>
                <div className="mt-0.5 text-xs text-[#8A99B2]">Structured exportable history</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Interactive 3D-Tilted Obsidian iPhone Prototype */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:col-span-5"
            style={{ perspective: 1200 }}
            onMouseMove={handlePhoneMove}
            onMouseLeave={handlePhoneLeave}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-[356px] will-change-transform"
            >
              {/* Ambient Aura Behind Phone */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-[3.2rem] bg-gradient-to-tr from-[#2EF2C5]/25 via-[#7C6BFF]/20 to-[#FF6B6B]/20 blur-3xl"
              />

              {/* Titanium Obsidian Device Chassis */}
              <div className="relative rounded-[2.85rem] border border-white/15 bg-[#070B14] p-2.5 shadow-[0_32px_90px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22)]">
                {/* Screen Surface */}
                <div className="relative overflow-hidden rounded-[2.3rem] border border-white/[0.06] bg-gradient-to-b from-[#0D1526] via-[#090F1D] to-[#060A13] p-4">
                  {/* Dynamic Island */}
                  <div className="mx-auto mb-3.5 flex h-6 w-28 items-center justify-between rounded-full bg-black px-3">
                    <span className="h-2 w-2 rounded-full bg-[#2EF2C5] shadow-[0_0_8px_#2EF2C5]" />
                    <span className="font-mono-tech text-[9px] text-[#8A99B2]">LIVE DEMO</span>
                  </div>

                  {/* App Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#2EF2C5]">
                        Quick Log · Try It Live
                      </p>
                      <h2 className="text-base font-bold text-white">How are you feeling?</h2>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                      <Sliders className="h-3.5 w-3.5 text-[#9BB0CB]" />
                    </div>
                  </div>

                  {/* Symptom Selector Chips */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
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
                          className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all ${
                            active
                              ? 'border border-white/25 bg-white/15 text-white shadow-[0_0_16px_rgba(46,242,197,0.18)]'
                              : 'border border-white/[0.06] bg-white/[0.03] text-[#8A99B2] hover:bg-white/[0.07] hover:text-white'
                          }`}
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          {item.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Severity Meter Card */}
                  <div className="mt-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#9BB0CB]">Symptom Intensity</span>
                      <span
                        className="font-mono-tech rounded-lg px-2 py-0.5 text-xs font-bold"
                        style={{
                          color: severityColor,
                          backgroundColor: `${severityColor}1A`,
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
                      className="bio-slider mt-3 w-full"
                    />
                    <div className="mt-1.5 flex justify-between font-mono-tech text-[10px] text-[#64748B]">
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Severe</span>
                    </div>
                  </div>

                  {/* Notes Input */}
                  <div className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
                    <label className="block font-mono-tech text-[10px] uppercase tracking-wider text-[#64748B]">
                      Observation Note
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add triggers or observations..."
                      className="mt-1 w-full bg-transparent text-xs text-white placeholder-[#64748B] focus:outline-none"
                    />
                  </div>

                  {/* Auto-Captured Metadata Strip */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-[#2EF2C5]" />
                      <span className="truncate font-mono-tech text-[10px] text-[#B0BED4]">
                        Auto Timestamp
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#7C6BFF]" />
                      <span className="truncate font-mono-tech text-[10px] text-[#B0BED4]">
                        San Francisco, CA
                      </span>
                    </div>
                  </div>

                  {/* Interactive Log Button */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={handleLogSymptom}
                    className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2EF2C5] to-[#7C6BFF] py-3 text-xs font-bold text-[#05080F] shadow-[0_8px_28px_rgba(46,242,197,0.3)] transition-opacity hover:opacity-95"
                  >
                    {justLogged ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Recorded to History & Map</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Log {selectedSymptom.name}</span>
                      </>
                    )}
                  </motion.button>

                  {/* Live Mini Feed inside Phone */}
                  <div className="mt-3.5 border-t border-white/[0.07] pt-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#64748B]">
                        Recent Entries
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-[#2EF2C5]">
                        <ShieldCheck className="h-3 w-3" /> Private
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <AnimatePresence initial={false}>
                        {recentLogs.map((log, idx) => (
                          <motion.div
                            key={`${log.symptom}-${log.time}-${idx}`}
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                            className="flex items-center justify-between rounded-xl bg-white/[0.04] px-2.5 py-2"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{
                                  backgroundColor:
                                    log.severity >= 8
                                      ? '#FF6B6B'
                                      : log.severity >= 5
                                        ? '#FFB84D'
                                        : '#2EF2C5',
                                }}
                              />
                              <span className="text-xs font-medium text-white">{log.symptom}</span>
                            </div>
                            <span className="font-mono-tech text-[10px] text-[#8A99B2]">
                              {log.severity}/10 · {log.time}
                            </span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
