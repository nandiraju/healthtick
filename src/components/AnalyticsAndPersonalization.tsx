import { motion } from 'framer-motion';
import {
  SlidersHorizontal,
  TrendingDown,
  BarChart3,
  Check,
  Sparkles,
} from 'lucide-react';
import { INITIAL_SYMPTOM_LIBRARY, ANALYTICS_SERIES } from '../data/healthData';

export function AnalyticsAndPersonalization() {
  const analytics = ANALYTICS_SERIES['30D'];

  const maxIntensity = 10;
  const chartWidth = 320;
  const chartHeight = 124;
  const points = analytics.intensity.map((val, i) => {
    const count = analytics.intensity.length;
    const x = (i / (count - 1)) * (chartWidth - 28) + 14;
    const y = chartHeight - 16 - (val / maxIntensity) * (chartHeight - 32);
    return { x, y, val, label: analytics.labels[i] };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${chartHeight} L ${points[0].x.toFixed(1)} ${chartHeight} Z`;

  return (
    <section id="insights" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Card 1: Personalization ("Your Symptoms, Your Way") — Pure Marketing Visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="glass-panel flex flex-col justify-between rounded-[2rem] p-6 sm:p-8 lg:col-span-5"
          >
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
                Create a custom library of health symptoms inside the HealthTik app. Add, edit, and
                organize what you track so your daily workflow fits your exact health needs.
              </p>

              {/* Editorial Visual Preview of Custom Symptom Library */}
              <div className="mt-6 space-y-2.5">
                {INITIAL_SYMPTOM_LIBRARY.slice(0, 5).map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                    className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-2xs dark:border-white/[0.08] dark:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${item.color}1C`,
                          color: item.color,
                        }}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-slate-900/10 pt-4 font-mono-tech text-[11px] text-slate-500 dark:border-white/[0.08] dark:text-[#8A99B2]">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-[#7C6BFF]" />
              <span>Unlimited custom symptoms in the mobile app</span>
            </div>
          </motion.div>

          {/* Card 2: Reports & Analytics ("Turn Health Data Into Insights") — Pure Marketing Visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="glass-panel flex flex-col justify-between rounded-[2rem] p-6 sm:p-8 lg:col-span-7"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-3 py-1 dark:border-[#2EF2C5]/30 dark:bg-[#2EF2C5]/10">
                <BarChart3 className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
                <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-teal-700 dark:text-[#B8FFF0]">
                  Reports & Analytics
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                Turn Health Data Into{' '}
                <span className="font-serif-editorial text-gradient-bio font-normal italic">
                  Insights.
                </span>
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
                Visualize symptom history through intuitive charts and graphs. Analyze frequency
                over time, monitor intensity trends, and spot your most frequent patterns at a
                glance.
              </p>

              {/* Visual KPI Highlights */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <div className="font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                    30-DAY LOGS
                  </div>
                  <div className="mt-1 font-mono-tech text-xl font-bold text-slate-950 sm:text-2xl dark:text-white">
                    {analytics.totalLogs}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <div className="font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                    AVG SEVERITY
                  </div>
                  <div className="mt-1 font-mono-tech text-xl font-bold text-amber-600 sm:text-2xl dark:text-[#FFB84D]">
                    {analytics.avgSeverity}
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
                    {analytics.trendDelta}
                  </div>
                </div>
              </div>

              {/* Animated SVG Intensity Spline Visual */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#070C17]">
                <div className="mb-2 flex items-center justify-between font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                  <span>SYMPTOM INTENSITY TRAJECTORY</span>
                  <span>30-DAY SNAPSHOT</span>
                </div>
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="h-32 w-full overflow-visible"
                  role="img"
                  aria-label="Illustration of HealthTik symptom intensity trends over time"
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
                    d={areaPath}
                    fill="url(#bioAreaGrad)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke="url(#bioLineGrad)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {points.map((p, i) => (
                    <g key={i}>
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

              {/* Frequently Occurring Symptoms Visual Bars */}
              <div className="mt-5 space-y-2.5">
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-500 dark:text-[#8A99B2]">
                  Frequently Occurring Symptoms
                </div>
                {analytics.topSymptoms.map((s) => (
                  <div key={s.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-900 dark:text-white">{s.name}</span>
                      <span className="font-mono-tech text-slate-500 dark:text-[#9BB0CB]">
                        {s.count} logs · {s.share}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.07]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.share}%` }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
