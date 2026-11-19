import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Clock, Activity } from 'lucide-react';
import { MAP_SYMPTOM_PINS, type MapSymptomPin } from '../data/healthData';

const REGIONS = ['All', 'Downtown', 'Office Park', 'Home', 'Transit'] as const;

export function InteractiveMapSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [regionFilter, setRegionFilter] = useState<(typeof REGIONS)[number]>('All');
  const [selectedPin, setSelectedPin] = useState<MapSymptomPin>(MAP_SYMPTOM_PINS[0]);

  const visiblePins =
    regionFilter === 'All'
      ? MAP_SYMPTOM_PINS
      : MAP_SYMPTOM_PINS.filter((p) => p.region === regionFilter);

  // 120fps Hardware-Accelerated Topographic & Radar Sweep Canvas
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

      ctx.clearRect(0, 0, width, height);

      // Dark map base
      ctx.fillStyle = '#070D1A';
      ctx.fillRect(0, 0, width, height);

      // Subtle latitude / longitude grid
      ctx.strokeStyle = 'rgba(138, 153, 178, 0.07)';
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

      // Stylized topographic contour rings
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
          ctx.strokeStyle = 'rgba(46, 242, 197, 0.065)';
          ctx.stroke();
        }
      }

      // Connecting geographical pattern arcs between pins
      if (visiblePins.length > 1) {
        ctx.beginPath();
        visiblePins.forEach((pin, idx) => {
          const px = pin.x * width;
          const py = pin.y * height;
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.strokeStyle = 'rgba(124, 107, 255, 0.24)';
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 1.25;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Animated heat-pulse ripples around each visible symptom pin
      visiblePins.forEach((pin, idx) => {
        const px = pin.x * width;
        const py = pin.y * height;
        const pulsePhase = (t * 0.65 + idx * 0.28) % 1;
        const maxR = 26 + pin.severity * 4.2;
        const r = 8 + pulsePhase * maxR;
        const alpha = (1 - pulsePhase) * 0.42;

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.strokeStyle = pin.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Soft heat radial glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, maxR * 0.9);
        glow.addColorStop(0, `${pin.color}33`);
        glow.addColorStop(1, 'rgba(7, 13, 26, 0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, maxR * 0.9, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle rotating radar scanner beam
      const sweepAngle = t * 0.45;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.max(width, height) * 0.7;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(sweepAngle);
      const beamGrad = ctx.createLinearGradient(0, 0, radius, 0);
      beamGrad.addColorStop(0, 'rgba(46, 242, 197, 0.08)');
      beamGrad.addColorStop(1, 'rgba(46, 242, 197, 0)');
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
  }, [visiblePins]);

  return (
    <section id="health-map" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1">
              <Compass className="h-3.5 w-3.5 text-[#FF6B6B]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#CFE4F8]">
                Health Map · Spatial Intelligence
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              See Your Health{' '}
              <span className="font-serif-editorial text-gradient-bio font-normal italic">
                Geographically.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#9BB0CB]">
              Explore where symptoms occur on an interactive map. Tap any pulsing marker to inspect
              recorded notes, severity, and timestamps — revealing environmental and location-based
              patterns invisible in plain lists.
            </p>
          </div>

          {/* Region Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((region) => {
              const active = regionFilter === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => {
                    setRegionFilter(region);
                    const nextPins =
                      region === 'All'
                        ? MAP_SYMPTOM_PINS
                        : MAP_SYMPTOM_PINS.filter((p) => p.region === region);
                    if (nextPins[0]) setSelectedPin(nextPins[0]);
                  }}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                    active
                      ? 'bg-white text-[#05080F] shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'border border-white/10 bg-white/[0.03] text-[#9BB0CB] hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Map Stage */}
        <div className="glass-panel relative mt-10 overflow-hidden rounded-[2rem] p-2 sm:p-3">
          <div className="relative h-[430px] w-full overflow-hidden rounded-[1.5rem] border border-white/[0.08] sm:h-[490px]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            {/* Interactive Clickable Marker Buttons */}
            {visiblePins.map((pin) => {
              const isSelected = selectedPin.id === pin.id;
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setSelectedPin(pin)}
                  style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%` }}
                  className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  aria-label={`Inspect ${pin.symptom} at ${pin.locationName}`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform duration-200 ${
                      isSelected ? 'scale-125 border-white' : 'border-[#05080F] group-hover:scale-110'
                    }`}
                    style={{
                      backgroundColor: `${pin.color}26`,
                      boxShadow: `0 0 24px ${pin.color}99`,
                    }}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full"
                      style={{ backgroundColor: pin.color }}
                    />
                  </span>
                  <span className="mt-1.5 hidden rounded-lg border border-white/10 bg-[#05080F]/90 px-2 py-0.5 font-mono-tech text-[10px] font-medium whitespace-nowrap text-white shadow-lg sm:inline-block">
                    {pin.symptom}
                  </span>
                </button>
              );
            })}

            {/* Top Left Map Telemetry Badge */}
            <div className="glass-pill absolute top-4 left-4 z-10 flex items-center gap-2 rounded-xl px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2EF2C5]" />
              <span className="font-mono-tech text-[11px] text-[#CFE4F8]">
                {visiblePins.length} Mapped Occurrences
              </span>
            </div>

            {/* Bottom Floating Selected Record Inspector */}
            <div className="absolute inset-x-4 bottom-4 z-20 sm:right-auto sm:w-[370px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPin.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="glass-panel rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${selectedPin.color}22`,
                          color: selectedPin.color,
                        }}
                      >
                        <Activity className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-white">{selectedPin.symptom}</h3>
                        <p className="flex items-center gap-1 text-xs text-[#9BB0CB]">
                          <MapPin className="h-3 w-3 text-[#7C6BFF]" />
                          {selectedPin.locationName}
                        </p>
                      </div>
                    </div>
                    <span
                      className="font-mono-tech rounded-lg px-2 py-1 text-xs font-bold"
                      style={{
                        color: selectedPin.color,
                        backgroundColor: `${selectedPin.color}1F`,
                      }}
                    >
                      {selectedPin.severity}/10
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[#CFE4F8]">
                    {selectedPin.notes}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-2.5 font-mono-tech text-[10px] text-[#8A99B2]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#2EF2C5]" />
                      {selectedPin.timestamp}
                    </span>
                    <span>{selectedPin.coords}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
