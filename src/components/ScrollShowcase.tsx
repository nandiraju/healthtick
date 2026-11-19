import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  SlidersHorizontal,
  Clock,
  MapPin,
  BarChart3,
  Share2,
  Check,
  FileText,
  Sparkles,
} from 'lucide-react';
import { IPhoneFrame } from './IPhoneFrame';

interface Pillar {
  id: string;
  number: string;
  section: string;
  headline: string;
  description: string;
  bullets: string[];
  accent: string;
  icon: typeof Activity;
}

const PILLARS: Pillar[] = [
  {
    id: 'tracking',
    number: '01',
    section: 'Symptom Tracking',
    headline: 'Track What Your Body Is Telling You',
    description:
      'Capture symptoms the moment they occur without friction. Log intensity, write contextual observations, and let HealthTik automatically stamp the exact time and geographical location.',
    bullets: [
      'Log individual health symptoms in seconds',
      'Record symptom intensity & severity scales',
      'Add personal notes & contextual observations',
      'Automatic date, time & geographical location capture',
    ],
    accent: '#0D9488',
    icon: Activity,
  },
  {
    id: 'personalization',
    number: '02',
    section: 'Personalization',
    headline: 'Your Symptoms, Your Way',
    description:
      'No two bodies follow the same textbook. Build a custom library tailored to your life — add, edit, or remove symptoms and shape your tracking workflow around what matters most to you.',
    bullets: [
      'Create your own custom library of health symptoms',
      'Add, edit, and remove symptoms anytime',
      'Configure tracking parameters to individual needs',
      'Fully personalized daily logging experience',
    ],
    accent: '#4F46E5',
    icon: SlidersHorizontal,
  },
  {
    id: 'history',
    number: '03',
    section: 'Health History',
    headline: 'Your Health Journey, Documented',
    description:
      'Every logged moment builds a clean, chronological record of your health. Search, filter, and revisit past entries to see how frequency and intensity shift across weeks and months.',
    bullets: [
      'Complete chronological symptom timeline',
      'Review full entry details, notes & timestamps',
      'Track shifts in frequency and intensity over time',
      'Instant search and multi-criteria filtering',
    ],
    accent: '#0284C7',
    icon: Clock,
  },
  {
    id: 'map',
    number: '04',
    section: 'Health Map',
    headline: 'See Your Health Geographically',
    description:
      'Uncover hidden environmental or routine triggers by seeing where symptoms actually happen. Explore an interactive map of your logged markers and spot geographical patterns at a glance.',
    bullets: [
      'Geographically visualize recorded symptom locations',
      'Explore an interactive map of personal health markers',
      'Identify environmental & geographical patterns',
      'Tap any map marker to inspect the full record',
    ],
    accent: '#E11D48',
    icon: MapPin,
  },
  {
    id: 'analytics',
    number: '05',
    section: 'Reports & Analytics',
    headline: 'Turn Health Data Into Insights',
    description:
      'Transform scattered daily notes into crystal-clear visual intelligence. Monitor frequency curves, track intensity trajectories, surface your most frequent symptoms, and export reports for reference.',
    bullets: [
      'Visual charts & graphs of symptom history',
      'Analyze frequency trends & intensity trajectories',
      'Automatically highlight frequently occurring symptoms',
      'Export structured health reports for future reference',
    ],
    accent: '#D97706',
    icon: BarChart3,
  },
  {
    id: 'sharing',
    number: '06',
    section: 'Sharing',
    headline: 'Make Your Health History Accessible',
    description:
      'Walk into every appointment prepared. Export and share your documented symptom history and visual summaries to support clearer, more productive conversations with healthcare professionals.',
    bullets: [
      'Share organized health tracking summaries effortlessly',
      'Export documented symptom records and reports',
      'Ready for discussions with healthcare professionals',
      'Maintain a clear, structured record of observations',
    ],
    accent: '#0D9488',
    icon: Share2,
  },
];

function PillarScreenPreview({ pillar }: { pillar: Pillar }) {
  switch (pillar.id) {
    case 'tracking':
      return (
        <div className="space-y-3">
          <div className="rounded-2xl border border-teal-500/25 bg-teal-50/70 p-3.5 dark:border-[#2EF2C5]/25 dark:bg-[#2EF2C5]/[0.07]">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[9px] font-semibold uppercase tracking-widest text-teal-700 dark:text-[#2EF2C5]">
                Active Capture
              </span>
              <span className="font-mono-tech text-[9px] text-slate-500 dark:text-[#9BB0CB]">
                09:42 AM
              </span>
            </div>
            <p className="mt-1.5 text-base font-bold text-slate-900 dark:text-white">
              Migraine Aura
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
              />
            </div>
            <div className="mt-2 flex justify-between font-mono-tech text-[9px] text-slate-600 dark:text-[#8A99B2]">
              <span>Intensity: 8/10</span>
              <span>Auto-Location</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-[11px] leading-relaxed text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-[#B0BED4]">
            “Started after bright glare during morning commute. Rested 20 min in dim room.”
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <div className="font-mono-tech text-[8px] text-slate-400">DATE & TIME</div>
              <div className="mt-0.5 text-[11px] font-semibold text-slate-900 dark:text-white">
                Nov 19 · 09:42
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <div className="font-mono-tech text-[8px] text-slate-400">LOCATION</div>
              <div className="mt-0.5 text-[11px] font-semibold text-slate-900 dark:text-white">
                Financial Dist.
              </div>
            </div>
          </div>
        </div>
      );

    case 'personalization':
      return (
        <div className="space-y-2">
          {[
            { name: 'Migraine Aura', tag: 'Neurological', color: '#EF4444', on: true },
            { name: 'Sinus Pressure', tag: 'Respiratory', color: '#10B981', on: true },
            { name: 'Afternoon Fatigue', tag: 'Energy', color: '#6366F1', on: true },
            { name: 'Joint Stiffness', tag: 'Musculoskeletal', color: '#F59E0B', on: false },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <div className="text-[11px] font-semibold text-slate-900 dark:text-white">
                    {item.name}
                  </div>
                  <div className="font-mono-tech text-[8px] text-slate-500 dark:text-[#8A99B2]">
                    {item.tag}
                  </div>
                </div>
              </div>
              <div
                className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
                  item.on
                    ? 'justify-end bg-indigo-600 dark:bg-[#7C6BFF]'
                    : 'justify-start bg-slate-200 dark:bg-white/15'
                }`}
              >
                <span className="h-4 w-4 rounded-full bg-white shadow" />
              </div>
            </motion.div>
          ))}
        </div>
      );

    case 'history':
      return (
        <div className="space-y-2.5">
          {[
            { date: 'Today · 09:42 AM', title: 'Migraine Aura', sev: '8/10', color: '#EF4444' },
            { date: 'Yesterday · 06:15 PM', title: 'Sinus Pressure', sev: '4/10', color: '#10B981' },
            { date: 'Nov 17 · 02:30 PM', title: 'Afternoon Fatigue', sev: '6/10', color: '#6366F1' },
            { date: 'Nov 15 · 07:10 AM', title: 'Joint Stiffness', sev: '5/10', color: '#F59E0B' },
          ].map((row, idx) => (
            <motion.div
              key={row.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="relative rounded-2xl border border-slate-200 bg-white p-3 pl-5 dark:border-white/[0.07] dark:bg-white/[0.03]"
            >
              <span
                className="absolute top-3 bottom-3 left-2 w-1 rounded-full"
                style={{ backgroundColor: row.color }}
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-900 dark:text-white">
                  {row.title}
                </span>
                <span className="font-mono-tech text-[10px] font-bold" style={{ color: row.color }}>
                  {row.sev}
                </span>
              </div>
              <div className="mt-0.5 font-mono-tech text-[9px] text-slate-500 dark:text-[#8A99B2]">
                {row.date}
              </div>
            </motion.div>
          ))}
        </div>
      );

    case 'map':
      return (
        <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#070E1C]">
          <div className="bg-bio-grid absolute inset-0 opacity-80" />
          {[
            { top: '26%', left: '30%', color: '#EF4444', label: 'Migraine · 8/10' },
            { top: '54%', left: '66%', color: '#10B981', label: 'Sinus · 4/10' },
            { top: '76%', left: '38%', color: '#6366F1', label: 'Fatigue · 6/10' },
          ].map((pin) => (
            <div
              key={pin.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: pin.top, left: pin.left }}
            >
              <span
                className="animate-bio-pulse absolute -inset-2.5 rounded-full"
                style={{ backgroundColor: `${pin.color}44` }}
              />
              <span
                className="relative block h-3 w-3 rounded-full border-2 border-white dark:border-[#05080F]"
                style={{ backgroundColor: pin.color }}
              />
              <span className="mt-1 block whitespace-nowrap rounded-md bg-white/95 px-1.5 py-0.5 font-mono-tech text-[8px] font-semibold text-slate-900 shadow dark:bg-[#05080F]/90 dark:text-white">
                {pin.label}
              </span>
            </div>
          ))}
        </div>
      );

    case 'analytics':
      return (
        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[9px] text-slate-500 dark:text-[#8A99B2]">
                30-DAY INTENSITY
              </span>
              <span className="font-mono-tech text-[11px] font-bold text-teal-600 dark:text-[#2EF2C5]">
                -28% trend
              </span>
            </div>
            <div className="mt-4 flex h-28 items-end gap-2">
              {[74, 62, 85, 54, 48, 42, 34].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24, delay: i * 0.04 }}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-500/60 to-teal-500 dark:from-[#7C6BFF]/60 dark:to-[#2EF2C5]"
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
              <div className="font-mono-tech text-[8px] text-slate-500 dark:text-[#8A99B2]">
                TOP SYMPTOM
              </div>
              <div className="mt-0.5 text-[11px] font-bold text-slate-900 dark:text-white">
                Sinus Pressure
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
              <div className="font-mono-tech text-[8px] text-slate-500 dark:text-[#8A99B2]">
                AVG SEVERITY
              </div>
              <div className="mt-0.5 text-[11px] font-bold text-amber-600 dark:text-[#FFB84D]">
                4.9 / 10
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-3">
          <div className="rounded-2xl border border-teal-500/25 bg-gradient-to-br from-teal-50 to-indigo-50 p-4 dark:border-[#2EF2C5]/25 dark:from-[#2EF2C5]/10 dark:to-[#7C6BFF]/10">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600/15 text-teal-700 dark:bg-[#2EF2C5]/15 dark:text-[#2EF2C5]">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Clinical Health Summary
                </div>
                <div className="font-mono-tech text-[9px] text-slate-500 dark:text-[#9BB0CB]">
                  41 entries · 30-day span
                </div>
              </div>
            </div>
            <div className="mt-3.5 space-y-2 text-[11px] text-slate-700 dark:text-[#CFE4F8]">
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" /> Chronological
                notes & severity
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" /> Frequency &
                intensity charts
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" /> Ready for
                clinician review
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export function ScrollShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePillar = PILLARS[activeIndex];

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1">
            <Sparkles className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
            <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-slate-700 dark:text-[#CFE4F8]">
              Six Pillars of HealthTik
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Every Signal.{' '}
            <span className="font-serif-editorial text-gradient-bio font-normal italic">
              Beautifully Connected.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
            Designed to feel instantaneous at 120fps — from the moment a symptom appears to the
            day you review your visual history with your physician.
          </p>
        </div>

        {/* Interactive Split Stage */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left: 6 Selectable Feature Chapters */}
          <div className="space-y-3 lg:col-span-7">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = idx === activeIndex;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`group relative w-full rounded-3xl p-5 text-left transition-all duration-300 sm:p-6 ${
                    isActive
                      ? 'glass-panel'
                      : 'border border-slate-900/[0.06] bg-white/50 hover:border-slate-900/12 hover:bg-white/80 dark:border-white/[0.05] dark:bg-white/[0.015] dark:hover:border-white/10 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        borderColor: isActive ? `${pillar.accent}55` : 'rgba(148,163,184,0.25)',
                        backgroundColor: isActive ? `${pillar.accent}18` : 'transparent',
                        color: isActive ? pillar.accent : '#64748B',
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <span
                        className="font-mono-tech text-[11px] font-semibold uppercase tracking-widest"
                        style={{ color: isActive ? pillar.accent : '#64748B' }}
                      >
                        {pillar.number} · {pillar.section}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-slate-950 sm:text-xl dark:text-white">
                        {pillar.headline}
                      </h3>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
                              {pillar.description}
                            </p>
                            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                              {pillar.bullets.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-start gap-2 text-xs text-slate-700 dark:text-[#D5E0F2]"
                                >
                                  <span
                                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                    style={{ backgroundColor: pillar.accent }}
                                  />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Sticky True-Ratio iPhone Viewport */}
          <div className="flex justify-center lg:sticky lg:top-24 lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-[3.5rem] opacity-35 blur-3xl transition-colors duration-500"
                style={{
                  background: `radial-gradient(circle, ${activePillar.accent}55 0%, transparent 70%)`,
                }}
              />

              <IPhoneFrame badgeText={`${activePillar.number}/06`}>
                <div className="mt-1 mb-4">
                  <span
                    className="font-mono-tech text-[9px] font-semibold uppercase tracking-widest"
                    style={{ color: activePillar.accent }}
                  >
                    {activePillar.number} / 06 · {activePillar.section}
                  </span>
                  <h4 className="mt-0.5 text-sm font-bold leading-snug text-slate-900 dark:text-white">
                    {activePillar.headline}
                  </h4>
                </div>

                <div className="min-h-[340px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePillar.id}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    >
                      <PillarScreenPreview pillar={activePillar} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 flex items-center justify-center gap-1.5">
                  {PILLARS.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`View ${p.section}`}
                      onClick={() => setActiveIndex(idx)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: idx === activeIndex ? 22 : 6,
                        backgroundColor:
                          idx === activeIndex ? p.accent : 'rgba(148,163,184,0.35)',
                      }}
                    />
                  ))}
                </div>
              </IPhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
