import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass, Sparkles } from 'lucide-react';
import { MAP_SYMPTOM_PINS } from '../data/healthData';
import { useTheme } from '../context/ThemeContext';

export function InteractiveMapSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  // 120fps Hardware-Accelerated Visual Topographic Health Map Showcase
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);
    window.addEventListener('resize', resize, { passive: true });

    let last = performance.now();
    let t = 0;

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      if (!isVisible) {
        last = now;
        return;
      }

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!prefersReducedMotion) t += dt;

      const isDark = themeRef.current === 'dark';
      ctx.clearRect(0, 0, width, height);

      // Cartographic base
      ctx.fillStyle = isDark ? '#070D1A' : '#F1F5F9';
      ctx.fillRect(0, 0, width, height);

      // Coordinate grid
      ctx.strokeStyle = isDark ? 'rgba(138, 153, 178, 0.07)' : 'rgba(15, 23, 42, 0.06)';
      ctx.lineWidth = 1;
      const grid = 48;
      for (let x = 0; x < width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Stylized topographic contours
      const contours = [
        { cx: 0.28, cy: 0.36, r: 120 },
        { cx: 0.64, cy: 0.28, r: 145 },
        { cx: 0.51, cy: 0.64, r: 130 },
      ];
      for (const c of contours) {
        for (let ring = 1; ring <= 3; ring++) {
          ctx.beginPath();
          ctx.ellipse(
            width * c.cx,
            height * c.cy,
            c.r * ring * 0.55,
            c.r * ring * 0.38,
            0.35,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = isDark ? 'rgba(46, 242, 197, 0.07)' : 'rgba(13, 148, 136, 0.11)';
          ctx.stroke();
        }
      }

      // Pattern connection arcs between symptom locations
      ctx.beginPath();
      MAP_SYMPTOM_PINS.forEach((pin, idx) => {
        const px = pin.x * width;
        const py = pin.y * height;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = isDark ? 'rgba(124, 107, 255, 0.28)' : 'rgba(79, 70, 229, 0.25)';
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1.25;
      ctx.stroke();
      ctx.setLineDash([]);

      // Animated 120fps heat-pulse ripples around each symptom pin
      MAP_SYMPTOM_PINS.forEach((pin, idx) => {
        const px = pin.x * width;
        const py = pin.y * height;
        const pulsePhase = (t * 0.6 + idx * 0.26) % 1;
        const maxR = 28 + pin.severity * 4;
        const r = 8 + pulsePhase * maxR;
        const alpha = (1 - pulsePhase) * 0.44;

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.strokeStyle = pin.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        const glow = ctx.createRadialGradient(px, py, 0, px, py, maxR * 0.85);
        glow.addColorStop(0, `${pin.color}2A`);
        glow.addColorStop(1, isDark ? 'rgba(7, 13, 26, 0)' : 'rgba(241, 245, 249, 0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, maxR * 0.85, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle radar sweep
      const sweepAngle = t * 0.42;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.max(width, height) * 0.7;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(sweepAngle);
      const beamGrad = ctx.createLinearGradient(0, 0, radius, 0);
      beamGrad.addColorStop(
        0,
        isDark ? 'rgba(46, 242, 197, 0.08)' : 'rgba(13, 148, 136, 0.09)'
      );
      beamGrad.addColorStop(1, 'rgba(13, 148, 136, 0)');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, -0.12, 0.12);
      ctx.closePath();
      ctx.fillStyle = beamGrad;
      ctx.fill();
      ctx.restore();
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="health-map" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1">
            <Compass className="h-3.5 w-3.5 text-rose-600 dark:text-[#FF6B6B]" />
            <span className="font-mono-tech text-[11px] font-medium uppercase tracking-widest text-slate-700 dark:text-[#CFE4F8]">
              Health Map · Geographical Patterns
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            See Your Health{' '}
            <span className="font-serif-editorial text-gradient-bio font-normal italic">
              Geographically.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#9BB0CB]">
            Visualize where symptoms were recorded on an interactive map inside the app. Identify
            geographical patterns in your daily routine and explore individual symptom records
            directly through map markers.
          </p>
        </div>

        {/* Pure Visual 120fps Topographic Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel relative mt-10 overflow-hidden rounded-[2rem] p-2 sm:p-3"
        >
          <div className="relative h-[380px] w-full overflow-hidden rounded-[1.5rem] border border-slate-900/10 sm:h-[450px] dark:border-white/[0.08]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            {/* Pure Visual Map Marker Pins */}
            {MAP_SYMPTOM_PINS.map((pin) => (
              <div
                key={pin.id}
                style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%` }}
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-md dark:border-[#05080F]"
                  style={{
                    backgroundColor: `${pin.color}2A`,
                    boxShadow: `0 0 18px ${pin.color}66`,
                  }}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: pin.color }}
                  />
                </span>
                <span className="mt-1.5 hidden rounded-lg border border-slate-900/10 bg-white/95 px-2 py-0.5 font-mono-tech text-[10px] font-semibold whitespace-nowrap text-slate-900 shadow-sm sm:inline-block dark:border-white/10 dark:bg-[#05080F]/90 dark:text-white">
                  {pin.symptom}
                </span>
              </div>
            ))}

            {/* Bottom Feature Highlight Strip */}
            <div className="absolute inset-x-4 bottom-4 z-20 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: MapPin,
                  title: 'Automatic Location Context',
                  desc: 'Every symptom entry can carry where it happened.',
                },
                {
                  icon: Compass,
                  title: 'Spot Regional Patterns',
                  desc: 'Discover workplace, transit, or environmental triggers.',
                },
                {
                  icon: Sparkles,
                  title: 'Tap-to-Inspect Markers',
                  desc: 'Open full notes and severity right from the map.',
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="glass-panel flex items-start gap-3 rounded-2xl p-3.5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-[#2EF2C5]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {card.title}
                      </div>
                      <p className="mt-0.5 text-[11px] leading-snug text-slate-600 dark:text-[#9BB0CB]">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
