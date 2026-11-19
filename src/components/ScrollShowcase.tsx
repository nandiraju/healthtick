import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  SlidersHorizontal,
  Clock,
  MapPin,
  BarChart3,
  Share2,
  Sparkles,
} from 'lucide-react';
import { IPhoneFrame, type PhoneScreen } from './IPhoneFrame';

interface Pillar {
  id: string;
  number: string;
  section: string;
  headline: string;
  description: string;
  bullets: string[];
  accent: string;
  icon: typeof Activity;
  screen: string;
  screenAlt: string;
}

const PILLARS: Pillar[] = [
  {
    id: 'tracking',
    screen: '02-log-symptom.jpg',
    screenAlt: 'HealthTik Log Symptom screen with symptom picker, intensity, date and time, and pinned location',
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
    screen: '06-settings.jpg',
    screenAlt: 'HealthTik Settings screen with the customizable Symptom Library',
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
    screen: '05-history.jpg',
    screenAlt: 'HealthTik Symptom History screen with search, filters and dated entries',
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
    screen: '03-health-map.jpg',
    screenAlt: 'HealthTik Health Map screen with symptom pins across a city map',
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
    screen: '04-reports.jpg',
    screenAlt: 'HealthTik Health Insights screen with symptom frequency and intensity trend charts',
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
    screen: '04-reports.jpg',
    screenAlt: 'HealthTik Health Insights screen with PDF and CSV export buttons',
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

const SCREENS: PhoneScreen[] = PILLARS.map((p) => ({
  src: `/screens/${p.screen}`,
  alt: p.screenAlt,
}));

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

              <IPhoneFrame screens={SCREENS} activeScreen={activeIndex} />

              <div className="relative mt-5 flex items-center justify-center gap-1.5">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
