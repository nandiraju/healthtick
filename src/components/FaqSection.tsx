import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ_ITEMS = [
  {
    q: 'What is HealthTik?',
    a: 'HealthTik is a personal health symptom tracking platform that helps individuals record, organize, geographically map, visualize, and understand their health symptoms over time.',
  },
  {
    q: 'How does HealthTik help track health symptoms?',
    a: 'HealthTik lets you log individual symptoms as they occur, record symptom intensity or severity, add personal notes and observations, and capture the date, time, and geographical location of each occurrence.',
  },
  {
    q: 'Can I customize the symptoms I track in HealthTik?',
    a: 'Yes. HealthTik includes personalized symptom management so you can build your own custom library of health symptoms—adding, editing, and removing symptoms to match your individual needs.',
  },
  {
    q: 'How does the Health Map feature work?',
    a: 'The Health Map geographically visualizes where your symptoms were recorded on an interactive map, helping you identify location-based patterns and explore individual symptom records directly through map markers.',
  },
  {
    q: 'Can I share my HealthTik symptom history with my doctor?',
    a: 'Yes. HealthTik organizes your chronological symptom records and visual analytics reports so you can export and share a structured, documented health history for clearer discussions with healthcare professionals.',
  },
  {
    q: 'How does HealthTik manage my personal account and history?',
    a: 'HealthTik provides individual user accounts with secure login and logout, keeping your personalized symptom library and complete chronological health history organized under your own account.',
  },
] as const;

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <div className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1">
            <HelpCircle className="h-3.5 w-3.5 text-teal-600 dark:text-[#2EF2C5]" />
            <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-slate-700 dark:text-[#CFE4F8]">
              Frequently Asked Questions
            </span>
          </div>
          <h2
            id="faq-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white"
          >
            Everything You Want to{' '}
            <span className="font-serif-editorial text-gradient-bio font-normal italic">
              Know.
            </span>
          </h2>
          <p className="mx-auto mt-3.5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-[#9BB0CB]">
            Quick answers about symptom tracking, personalization, geographical health mapping,
            analytics, and sharing reports with your care team.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="glass-panel overflow-hidden rounded-2xl">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left"
                >
                  <span className="text-sm font-bold text-slate-950 sm:text-base dark:text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 dark:text-[#8A99B2] ${
                      isOpen ? 'rotate-180 text-teal-600 dark:text-[#2EF2C5]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-900/[0.06] px-6 py-4 text-sm leading-relaxed text-slate-600 dark:border-white/[0.07] dark:text-[#9BB0CB]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
