import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  SlidersHorizontal,
  TrendingDown,
  BarChart3,
  Check,
} from 'lucide-react';
import {
  INITIAL_SYMPTOM_LIBRARY,
  ANALYTICS_SERIES,
  type SymptomOption,
} from '../data/healthData';

type RangeKey = keyof typeof ANALYTICS_SERIES;

const COLOR_SWATCHES = ['#0D9488', '#4F46E5', '#E11D48', '#D97706', '#0284C7'];

export function AnalyticsAndPersonalization() {
  const [library, setLibrary] = useState<SymptomOption[]>(INITIAL_SYMPTOM_LIBRARY);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(COLOR_SWATCHES[0]);

  const [range, setRange] = useState<RangeKey>('30D');
  const currentAnalytics = ANALYTICS_SERIES[range];

  const toggleSymptom = (id: string) => {
    setLibrary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const removeSymptom = (id: string) => {
    setLibrary((prev) => prev.filter((item) => item.id !== id));
  };

  const addSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;
    setLibrary((prev) => [
      {
        id: `custom-${Date.now()}`,
        name: trimmed,
        category: 'Neurological',
        color: newColor,
        defaultSeverity: 5,
        active: true,
      },
      ...prev,
    ]);
    setNewName('');
  };

  const maxIntensity = 10;
  const chartWidth = 320;
  const chartHeight = 128;
  const points = currentAnalytics.intensity.map((val, i) => {
    const count = currentAnalytics.intensity.length;
    const x = count <= 1 ? chartWidth / 2 : (i / (count - 1)) * (chartWidth - 28) + 14;
    const y = chartHeight - 16 - (val / maxIntensity) * (chartHeight - 32);
    return { x, y, val, label: currentAnalytics.labels[i] };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${chartHeight} L ${points[0].x.toFixed(1)} ${chartHeight} Z`;

  return (
    <section id="insights" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Card 1: Personalization ("Your Symptoms, Your Way") */}
          <div className="glass-panel flex flex-col justify-between rounded-[2rem] p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-50 px-3 py-1 dark:border-[#7C6BFF]/30 dark:bg-[#7C6BFF]/10">
                <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-600 dark:text-[#7C6BFF]" />
                <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-indigo-700 dark:text-[#D5D0FF]">
                  Personalization
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                Your Symptoms,{' '}
                <span className="font-serif-editorial text-gradient-bio font-normal italic">
                  Your Way.
                </span>
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
                Build a custom symptom library configured to your exact needs. Try adding, toggling,
                or removing symptoms right here.
              </p>

              {/* Add Custom Symptom Form */}
              <form onSubmit={addSymptom} className="mt-5 flex gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Add custom symptom (e.g. Vertigo)..."
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none dark:border-white/10 dark:bg-[#070C17] dark:text-white dark:placeholder-[#64748B] dark:focus:border-[#2EF2C5]/60"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs font-bold text-white transition-transform active:scale-95 dark:bg-white dark:text-[#05080F]"
                >
                  <Plus className="h-3.5 w-3.5" /> Add
                </button>
              </form>

              {/* Color Swatches */}
              <div className="mt-2.5 flex items-center gap-2">
                <span className="font-mono-tech text-[10px] text-slate-500 dark:text-[#64748B]">
                  TAG COLOR:
                </span>
                {COLOR_SWATCHES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewColor(c)}
                    aria-label={`Select color ${c}`}
                    className={`h-4 w-4 rounded-full transition-transform ${
                      newColor === c
                        ? 'scale-125 ring-2 ring-slate-900 dark:ring-white'
                        : 'opacity-65 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              {/* Interactive Symptom List */}
              <div className="mt-5 max-h-[290px] space-y-2 overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {library.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className={`flex items-center justify-between rounded-2xl border px-3.5 py-2.5 transition-colors ${
                        item.active
                          ? 'border-slate-200 bg-white dark:border-white/12 dark:bg-white/[0.05]'
                          : 'border-slate-200/60 bg-slate-50/70 opacity-60 dark:border-white/[0.04] dark:bg-white/[0.015]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSymptom(item.id)}
                        className="flex flex-1 items-center gap-3 text-left"
                      >
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-md border transition-colors"
                          style={{
                            borderColor: item.active ? item.color : 'rgba(148,163,184,0.4)',
                            backgroundColor: item.active ? `${item.color}20` : 'transparent',
                            color: item.color,
                          }}
                        >
                          {item.active && <Check className="h-3 w-3" />}
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">
                            {item.name}
                          </div>
                          <div className="font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                            {item.category}
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => removeSymptom(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-[#64748B] dark:hover:bg-white/10 dark:hover:text-[#FF6B6B]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-900/10 pt-4 font-mono-tech text-[11px] text-slate-500 dark:border-white/[0.08] dark:text-[#8A99B2]">
              <span>Active in tracker:</span>
              <span className="font-bold text-teal-600 dark:text-[#2EF2C5]">
                {library.filter((i) => i.active).length} / {library.length} symptoms
              </span>
            </div>
          </div>

          {/* Card 2: Reports & Analytics ("Turn Health Data Into Insights") */}
          <div className="glass-panel flex flex-col justify-between rounded-[2rem] p-6 sm:p-8 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-3 py-1 dark:border-[#2EF2C5]/30 dark:bg-[#2EF2C5]/10">
                  <BarChart3 className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
                  <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-teal-700 dark:text-[#B8FFF0]">
                    Reports & Analytics
                  </span>
                </div>

                {/* Timeframe Switcher */}
                <div className="flex rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#070C17]">
                  {(['7D', '30D', '90D'] as RangeKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRange(key)}
                      className={`rounded-lg px-3 py-1 font-mono-tech text-xs font-semibold transition-all ${
                        range === key
                          ? 'bg-slate-950 text-white dark:bg-white dark:text-[#05080F]'
                          : 'text-slate-500 hover:text-slate-950 dark:text-[#8A99B2] dark:hover:text-white'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                Turn Health Data Into{' '}
                <span className="font-serif-editorial text-gradient-bio font-normal italic">
                  Insights.
                </span>
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
                Visualize symptom frequency over time, monitor intensity trajectories, and pinpoint
                your most frequent health patterns at a glance.
              </p>

              {/* Top KPI Strip */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <div className="font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                    TOTAL LOGS
                  </div>
                  <div className="mt-1 font-mono-tech text-xl font-bold text-slate-950 sm:text-2xl dark:text-white">
                    {currentAnalytics.totalLogs}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <div className="font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                    AVG SEVERITY
                  </div>
                  <div className="mt-1 font-mono-tech text-xl font-bold text-amber-600 sm:text-2xl dark:text-[#FFB84D]">
                    {currentAnalytics.avgSeverity}
                    <span className="text-xs font-normal text-slate-400 dark:text-[#8A99B2]">
                      /10
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <div className="font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                    INTENSITY TREND
                  </div>
                  <div className="mt-1 flex items-center gap-1 font-mono-tech text-xl font-bold text-teal-600 sm:text-2xl dark:text-[#2EF2C5]">
                    <TrendingDown className="h-4 w-4" />
                    {currentAnalytics.trendDelta}
                  </div>
                </div>
              </div>

              {/* Animated SVG Intensity Spline Chart */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#070C17]">
                <div className="mb-2 flex items-center justify-between font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                  <span>SYMPTOM INTENSITY TRAJECTORY</span>
                  <span>SCALE 1 – 10</span>
                </div>
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="h-36 w-full overflow-visible"
                  role="img"
                  aria-label="Symptom intensity trend over time"
                >
                  <defs>
                    <linearGradient id="bioAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0D9488" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="bioLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="55%" stopColor="#0D9488" />
                      <stop offset="100%" stopColor="#0284C7" />
                    </linearGradient>
                  </defs>

                  {[0.25, 0.5, 0.75].map((ratio) => (
                    <line
                      key={ratio}
                      x1={0}
                      x2={chartWidth}
                      y1={chartHeight * ratio}
                      y2={chartHeight * ratio}
                      stroke="rgba(148,163,184,0.22)"
                      strokeDasharray="3 4"
                    />
                  ))}

                  <motion.path
                    key={`area-${range}`}
                    d={areaPath}
                    fill="url(#bioAreaGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.path
                    key={`line-${range}`}
                    d={linePath}
                    fill="none"
                    stroke="url(#bioLineGrad)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {points.map((p, i) => (
                    <g key={`${range}-${i}`}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#FFFFFF"
                        stroke="#0D9488"
                        strokeWidth="2.2"
                      />
                      <text
                        x={p.x}
                        y={chartHeight - 2}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {p.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Frequently Occurring Symptoms Breakdown */}
              <div className="mt-5 space-y-2.5">
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-500 dark:text-[#8A99B2]">
                  Frequently Occurring Symptoms
                </div>
                {currentAnalytics.topSymptoms.map((s) => (
                  <div key={s.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-900 dark:text-white">{s.name}</span>
                      <span className="font-mono-tech text-slate-500 dark:text-[#9BB0CB]">
                        {s.count} logs · {s.share}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.07]">
                      <motion.div
                        key={`${range}-${s.name}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.share}%` }}
                        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
