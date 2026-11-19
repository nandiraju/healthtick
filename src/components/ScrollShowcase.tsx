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
    accent: '#2EF2C5',
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
    accent: '#7C6BFF',
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
    accent: '#38BDF8',
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
    accent: '#FF6B6B',
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
    accent: '#FFB84D',
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
    accent: '#2EF2C5',
    icon: Share2,
  },
];

function PillarScreenPreview({ pillar }: { pillar: Pillar }) {
  switch (pillar.id) {
    case 'tracking':
      return (
        <div className="space-y-3">
          <div className="rounded-2xl border border-[#2EF2C5]/25 bg-[#2EF2C5]/[0.07] p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#2EF2C5]">
                Active Capture
              </span>
              <span className="font-mono-tech text-[10px] text-[#9BB0CB]">09:42 AM</span>
            </div>
            <p className="mt-1.5 text-lg font-bold text-white">Migraine Aura</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                className="h-full rounded-full bg-gradient-to-r from-[#2EF2C5] via-[#FFB84D] to-[#FF6B6B]"
              />
            </div>
            <div className="mt-2 flex justify-between font-mono-tech text-[10px] text-[#8A99B2]">
              <span>Intensity: 8/10</span>
              <span>Auto-Location Tagged</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5 text-xs leading-relaxed text-[#B0BED4]">
            “Started after bright glare during morning commute. Rested 20 min in dim room.”
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
              <div className="font-mono-tech text-[9px] text-[#64748B]">DATE & TIME</div>
              <div className="mt-0.5 text-xs font-semibold text-white">Nov 19 · 09:42</div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
              <div className="font-mono-tech text-[9px] text-[#64748B]">LOCATION</div>
              <div className="mt-0.5 text-xs font-semibold text-white">Financial Dist.</div>
            </div>
          </div>
        </div>
      );

    case 'personalization':
      return (
        <div className="space-y-2.5">
          {[
            { name: 'Migraine Aura', tag: 'Neurological', color: '#FF6B6B', on: true },
            { name: 'Sinus Pressure', tag: 'Respiratory', color: '#2EF2C5', on: true },
            { name: 'Afternoon Fatigue', tag: 'Energy', color: '#7C6BFF', on: true },
            { name: 'Joint Stiffness', tag: 'Musculoskeletal', color: '#FFB84D', on: false },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <div className="text-xs font-semibold text-white">{item.name}</div>
                  <div className="font-mono-tech text-[9px] text-[#8A99B2]">{item.tag}</div>
                </div>
              </div>
              <div
                className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
                  item.on ? 'justify-end bg-[#7C6BFF]' : 'justify-start bg-white/15'
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
            { date: 'Today', title: 'Migraine Aura', sev: '8/10', color: '#FF6B6B' },
            { date: 'Yesterday', title: 'Sinus Pressure', sev: '4/10', color: '#2EF2C5' },
            { date: 'Nov 17', title: 'Afternoon Fatigue', sev: '6/10', color: '#7C6BFF' },
          ].map((row, idx) => (
            <motion.div
              key={row.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 pl-5"
            >
              <span
                className="absolute top-3 bottom-3 left-2 w-1 rounded-full"
                style={{ backgroundColor: row.color }}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{row.title}</span>
                <span className="font-mono-tech text-[10px]" style={{ color: row.color }}>
                  {row.sev}
                </span>
              </div>
              <div className="mt-1 font-mono-tech text-[10px] text-[#8A99B2]">
                {row.date} · Notes & location saved
              </div>
            </motion.div>
          ))}
        </div>
      );

    case 'map':
      return (
        <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-[#070E1C]">
          {/* Minimal Vector Grid */}
          <div className="bg-bio-grid absolute inset-0 opacity-70" />
          {/* Animated Pulse Pins */}
          {[
            { top: '28%', left: '30%', color: '#FF6B6B', label: 'Migraine · 8/10' },
            { top: '58%', left: '66%', color: '#2EF2C5', label: 'Sinus · 4/10' },
            { top: '70%', left: '36%', color: '#7C6BFF', label: 'Fatigue · 6/10' },
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
                className="relative block h-3 w-3 rounded-full border-2 border-[#05080F]"
                style={{ backgroundColor: pin.color }}
              />
              <span className="mt-1 block whitespace-nowrap rounded-md bg-[#05080F]/90 px-1.5 py-0.5 font-mono-tech text-[9px] text-white shadow">
                {pin.label}
              </span>
            </div>
          ))}
        </div>
      );

    case 'analytics':
      return (
        <div className="space-y-3">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[10px] text-[#8A99B2]">30-DAY INTENSITY</span>
              <span className="font-mono-tech text-xs font-bold text-[#2EF2C5]">-28% trend</span>
            </div>
            <div className="mt-4 flex h-24 items-end gap-2">
              {[74, 62, 85, 54, 48, 42, 34].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24, delay: i * 0.04 }}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-[#7C6BFF]/50 to-[#2EF2C5]"
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5">
              <div className="font-mono-tech text-[9px] text-[#8A99B2]">TOP SYMPTOM</div>
              <div className="mt-0.5 text-xs font-bold text-white">Sinus Pressure</div>
            </div>
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5">
              <div className="font-mono-tech text-[9px] text-[#8A99B2]">AVG SEVERITY</div>
              <div className="mt-0.5 text-xs font-bold text-[#FFB84D]">4.9 / 10</div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-3">
          <div className="rounded-2xl border border-[#2EF2C5]/25 bg-gradient-to-br from-[#2EF2C5]/10 to-[#7C6BFF]/10 p-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2EF2C5]/15 text-[#2EF2C5]">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Clinical Health Summary</div>
                <div className="font-mono-tech text-[10px] text-[#9BB0CB]">
                  41 entries · 30-day span
                </div>
              </div>
            </div>
            <div className="mt-3.5 space-y-1.5 text-[11px] text-[#CFE4F8]">
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#2EF2C5]" /> Chronological notes & severity
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#2EF2C5]" /> Frequency & intensity charts
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#2EF2C5]" /> Ready for clinician review
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
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1">
            <Sparkles className="h-3.5 w-3.5 text-[#2EF2C5]" />
            <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#CFE4F8]">
              Six Pillars of HealthTik
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Every Signal.{' '}
            <span className="font-serif-editorial text-gradient-bio font-normal italic">
              Beautifully Connected.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#9BB0CB]">
            Designed to feel instantaneous at 120fps — from the moment a symptom appears to the
            day you review your visual history with your physician.
          </p>
        </div>

        {/* Interactive Split Stage */}
        <div className="mt-14 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
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
                      ? 'glass-panel border-white/15'
                      : 'border border-white/[0.05] bg-white/[0.015] hover:border-white/10 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        borderColor: isActive ? `${pillar.accent}55` : 'rgba(255,255,255,0.08)',
                        backgroundColor: isActive ? `${pillar.accent}18` : 'rgba(255,255,255,0.03)',
                        color: isActive ? pillar.accent : '#8A99B2',
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="font-mono-tech text-[11px] font-semibold uppercase tracking-widest"
                          style={{ color: isActive ? pillar.accent : '#64748B' }}
                        >
                          {pillar.number} · {pillar.section}
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                        {pillar.headline}
                      </h3>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-2.5 text-sm leading-relaxed text-[#9BB0CB]">
                              {pillar.description}
                            </p>
                            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                              {pillar.bullets.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-start gap-2 text-xs text-[#D5E0F2]"
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

          {/* Right: Sticky Live Morphing Phone Viewport */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="relative mx-auto max-w-[360px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-[3rem] opacity-45 blur-3xl transition-colors duration-500"
                style={{
                  background: `radial-gradient(circle, ${activePillar.accent}55 0%, transparent 70%)`,
                }}
              />

              <div className="glass-panel relative overflow-hidden rounded-[2.6rem] p-3">
                <div className="rounded-[2.1rem] border border-white/[0.07] bg-[#070C17] p-5">
                  {/* Top Bar */}
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <span
                        className="font-mono-tech text-[10px] uppercase tracking-widest"
                        style={{ color: activePillar.accent }}
                      >
                        {activePillar.number} / 06 · {activePillar.section}
                      </span>
                      <h4 className="mt-0.5 text-base font-bold text-white">
                        {activePillar.headline}
                      </h4>
                    </div>
                  </div>

                  {/* Animated Morphing Screen */}
                  <div className="min-h-[268px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePillar.id}
                        initial={{ opacity: 0, y: 14, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      >
                        <PillarScreenPreview pillar={activePillar} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Bottom Step Indicators */}
                  <div className="mt-5 flex items-center justify-center gap-1.5">
                    {PILLARS.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        aria-label={`View ${p.section}`}
                        onClick={() => setActiveIndex(idx)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: idx === activeIndex ? 24 : 6,
                          backgroundColor:
                            idx === activeIndex ? p.accent : 'rgba(255,255,255,0.16)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
