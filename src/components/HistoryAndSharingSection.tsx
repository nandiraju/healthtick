import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Clock,
  MapPin,
  Share2,
  FileText,
  CheckCircle2,
  ChevronDown,
  Stethoscope,
  Download,
} from 'lucide-react';
import { SYMPTOM_HISTORY } from '../data/healthData';
import { trackEvent } from '../utils/analytics';

export function HistoryAndSharingSection() {
  const [query, setQuery] = useState('');
  const [minSeverity, setMinSeverity] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(SYMPTOM_HISTORY[0].id);
  const [sharedState, setSharedState] = useState<'idle' | 'preparing' | 'ready'>('idle');

  const filtered = SYMPTOM_HISTORY.filter((rec) => {
    const matchesQuery =
      rec.symptom.toLowerCase().includes(query.toLowerCase()) ||
      rec.notes.toLowerCase().includes(query.toLowerCase()) ||
      rec.location.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && rec.severity >= minSeverity;
  });

  const handleExportDemo = () => {
    trackEvent('preview_report_export');
    setSharedState('preparing');
    setTimeout(() => setSharedState('ready'), 700);
    setTimeout(() => setSharedState('idle'), 3200);
  };

  return (
    <section id="history-share" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Health History ("Your Health Journey, Documented") */}
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-50 px-3 py-1 dark:border-[#38BDF8]/30 dark:bg-[#38BDF8]/10">
              <Clock className="h-3.5 w-3.5 text-sky-600 dark:text-[#38BDF8]" />
              <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-sky-700 dark:text-[#BAE6FD]">
                Health History
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
              Your Health Journey,{' '}
              <span className="font-serif-editorial text-gradient-bio font-normal italic">
                Documented.
              </span>
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
              Search and filter your complete chronological record. Tap any entry to review notes,
              timestamps, severity, and where it occurred.
            </p>

            {/* Search & Severity Filter Controls */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#64748B]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search symptoms, notes, or locations..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-3.5 pl-10 text-xs text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none dark:border-white/10 dark:bg-[#070C17] dark:text-white dark:placeholder-[#64748B] dark:focus:border-[#2EF2C5]/60"
                />
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#070C17]">
                {[
                  { label: 'All', val: 1 },
                  { label: '5+', val: 5 },
                  { label: '7+', val: 7 },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setMinSeverity(opt.val)}
                    className={`rounded-lg px-2.5 py-1.5 font-mono-tech text-[11px] font-semibold transition-colors ${
                      minSeverity === opt.val
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-[#05080F]'
                        : 'text-slate-500 hover:text-slate-950 dark:text-[#8A99B2] dark:hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chronological Timeline List */}
            <div className="mt-5 space-y-2.5">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-[#8A99B2]">
                  No symptom records match your filter.
                </div>
              ) : (
                filtered.map((rec) => {
                  const isOpen = expandedId === rec.id;
                  return (
                    <div
                      key={rec.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-white/[0.08] dark:bg-white/[0.025] dark:hover:border-white/15"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedId(isOpen ? null : rec.id)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: rec.color }}
                          />
                          <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">
                              {rec.symptom}
                            </div>
                            <div className="mt-0.5 font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                              {rec.timestamp}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span
                            className="font-mono-tech rounded-lg px-2 py-0.5 text-xs font-bold"
                            style={{
                              color: rec.color,
                              backgroundColor: `${rec.color}1C`,
                            }}
                          >
                            {rec.severity}/10
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-slate-900 dark:text-white' : ''
                            }`}
                          />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-3.5 dark:border-white/[0.06] dark:bg-[#070C17]/70">
                              <p className="text-xs leading-relaxed text-slate-700 dark:text-[#CFE4F8]">
                                {rec.notes}
                              </p>
                              <div className="mt-3 flex flex-wrap items-center gap-3 font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-indigo-600 dark:text-[#7C6BFF]" />
                                  {rec.location}
                                </span>
                                <span>·</span>
                                <span>{rec.coords}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right: Sharing ("Make Your Health History Accessible") */}
          <div className="glass-panel flex flex-col justify-between rounded-[2rem] p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-3 py-1 dark:border-[#2EF2C5]/30 dark:bg-[#2EF2C5]/10">
                <Share2 className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
                <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-teal-700 dark:text-[#B8FFF0]">
                  Data Sharing & Export
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                Make Your Health History{' '}
                <span className="font-serif-editorial text-gradient-bio font-normal italic">
                  Accessible.
                </span>
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
                Export your documented observations and structured symptom reports so discussions
                with healthcare professionals are grounded in real data — not guesswork.
              </p>

              {/* Clinical Brief Visual Preview */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-[#070C17]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-gradient-to-br dark:from-[#2EF2C5]/20 dark:to-[#7C6BFF]/20 dark:text-[#2EF2C5]">
                      <Stethoscope className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Clinician Summary Brief
                      </div>
                      <div className="font-mono-tech text-[10px] text-slate-500 dark:text-[#8A99B2]">
                        Structured Personal Record
                      </div>
                    </div>
                  </div>
                  <FileText className="h-4 w-4 text-slate-400 dark:text-[#64748B]" />
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-[#8A99B2]">Reporting Window</span>
                    <span className="font-mono-tech font-semibold text-slate-900 dark:text-white">
                      Last 30 Days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-[#8A99B2]">Documented Entries</span>
                    <span className="font-mono-tech font-semibold text-slate-900 dark:text-white">
                      41 Records
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-[#8A99B2]">Primary Pattern</span>
                    <span className="font-mono-tech font-semibold text-teal-600 dark:text-[#2EF2C5]">
                      Intensity -28%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-[#8A99B2]">Geo-Tagged Context</span>
                    <span className="font-mono-tech font-semibold text-slate-900 dark:text-white">
                      Included
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-3 dark:bg-white/[0.03]">
                  <div className="font-mono-tech text-[9px] uppercase tracking-wider text-slate-400 dark:text-[#64748B]">
                    Attached Visual Summary
                  </div>
                  <div className="mt-2 flex h-10 items-end gap-1.5">
                    {[40, 65, 50, 85, 45, 35, 30, 55, 25].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="flex-1 rounded-t bg-gradient-to-t from-indigo-500/45 to-teal-500/85 dark:from-[#7C6BFF]/40 dark:to-[#2EF2C5]/80"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={handleExportDemo}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-95 dark:bg-white dark:text-[#05080F]"
              >
                {sharedState === 'idle' && (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Preview Report Export</span>
                  </>
                )}
                {sharedState === 'preparing' && (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Packaging Health History...</span>
                  </>
                )}
                {sharedState === 'ready' && (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
                    <span>Summary Ready to Share</span>
                  </>
                )}
              </motion.button>
              <p className="mt-2.5 text-center font-mono-tech text-[10px] text-slate-400 dark:text-[#64748B]">
                Shareable structured history for healthcare consultations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
