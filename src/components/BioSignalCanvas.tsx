import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  colorIdx: number;
  phase: number;
}

export function BioSignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isVisible = true;

    const pointer = { x: 0.5, y: 0.45, tx: 0.5, ty: 0.45 };
    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = width < 768 ? 24 : 46;
      particles.length = 0;
      for (let i = 0; i < targetCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.26,
          vy: (Math.random() - 0.5) * 0.2,
          radius: 1.2 + Math.random() * 2.0,
          alpha: 0.2 + Math.random() * 0.35,
          colorIdx: i % 4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();

    const onPointerMove = (e: PointerEvent) => {
      if (width <= 0 || height <= 0) return;
      pointer.tx = e.clientX / width;
      pointer.ty = e.clientY / height;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let lastTime = performance.now();
    let elapsed = 0;

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (!isVisible) {
        lastTime = now;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!prefersReducedMotion) elapsed += dt;

      const lerpFactor = 1 - Math.exp(-5.5 * dt);
      pointer.x += (pointer.tx - pointer.x) * lerpFactor;
      pointer.y += (pointer.ty - pointer.y) * lerpFactor;

      const isDark = themeRef.current === 'dark';
      ctx.clearRect(0, 0, width, height);

      // Ambient atmospheric glows tuned per theme
      const cx1 = width * (0.26 + (pointer.x - 0.5) * 0.1);
      const cy1 = height * (0.32 + (pointer.y - 0.5) * 0.1);
      const grad1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, Math.max(width, height) * 0.48);
      if (isDark) {
        grad1.addColorStop(0, 'rgba(46, 242, 197, 0.12)');
        grad1.addColorStop(0.5, 'rgba(124, 107, 255, 0.05)');
        grad1.addColorStop(1, 'rgba(5, 8, 15, 0)');
      } else {
        grad1.addColorStop(0, 'rgba(13, 148, 136, 0.10)');
        grad1.addColorStop(0.55, 'rgba(79, 70, 229, 0.045)');
        grad1.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const cx2 = width * (0.78 - (pointer.x - 0.5) * 0.09);
      const cy2 = height * (0.58 - (pointer.y - 0.5) * 0.09);
      const grad2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, Math.max(width, height) * 0.42);
      if (isDark) {
        grad2.addColorStop(0, 'rgba(124, 107, 255, 0.14)');
        grad2.addColorStop(1, 'rgba(5, 8, 15, 0)');
      } else {
        grad2.addColorStop(0, 'rgba(56, 189, 248, 0.11)');
        grad2.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 3 Harmonic Biometric Signal Ribbons
      const waveConfigs = isDark
        ? [
            { amp: 24, freq: 0.0055, speed: 0.9, yOff: 0.58, color: 'rgba(46, 242, 197, 0.22)', lineWidth: 1.5 },
            { amp: 17, freq: 0.0078, speed: -0.65, yOff: 0.63, color: 'rgba(124, 107, 255, 0.18)', lineWidth: 1.2 },
            { amp: 12, freq: 0.0105, speed: 1.2, yOff: 0.67, color: 'rgba(255, 107, 107, 0.11)', lineWidth: 1.0 },
          ]
        : [
            { amp: 24, freq: 0.0055, speed: 0.9, yOff: 0.58, color: 'rgba(13, 148, 136, 0.18)', lineWidth: 1.5 },
            { amp: 17, freq: 0.0078, speed: -0.65, yOff: 0.63, color: 'rgba(79, 70, 229, 0.14)', lineWidth: 1.2 },
            { amp: 12, freq: 0.0105, speed: 1.2, yOff: 0.67, color: 'rgba(2, 132, 199, 0.11)', lineWidth: 1.0 },
          ];

      const step = width < 768 ? 14 : 10;
      for (const w of waveConfigs) {
        ctx.beginPath();
        const baseY = height * w.yOff + (pointer.y - 0.5) * 20;
        for (let x = 0; x <= width; x += step) {
          const normX = x / Math.max(width, 1);
          const envelope = Math.sin(normX * Math.PI);
          const pulse =
            Math.sin(x * w.freq + elapsed * w.speed) * w.amp +
            Math.sin(x * w.freq * 2.4 - elapsed * w.speed * 1.4) * (w.amp * 0.35);
          const y = baseY + pulse * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.lineWidth;
        ctx.stroke();
      }

      const palette = isDark
        ? ['#2EF2C5', '#7C6BFF', '#38BDF8', '#FF6B6B']
        : ['#0D9488', '#4F46E5', '#0284C7', '#E11D48'];

      const maxDist = width < 768 ? 80 : 115;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx * dt * 60;
          p.y += p.vy * dt * 60;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        const shimmer = 0.65 + 0.35 * Math.sin(elapsed * 2.2 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = palette[p.colorIdx];
        ctx.globalAlpha = p.alpha * shimmer;
        ctx.fill();
        ctx.globalAlpha = 1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * (isDark ? 0.11 : 0.08);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = isDark
              ? `rgba(46, 242, 197, ${alpha.toFixed(3)})`
              : `rgba(13, 148, 136, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
