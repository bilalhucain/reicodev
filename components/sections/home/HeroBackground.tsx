'use client';
import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════
   HeroBackground — cursor-reactive particle network.

   A lightweight canvas layer: nodes drift slowly, nearby
   nodes are linked with faint lines, and anything within
   the cursor's radius lights up and glows — echoing the
   same violet "connector" language used in HomeServices'
   orb diagram, so the whole site feels like one system.

   - Reads [data-theme] on <html> and adapts palette live.
   - Respects prefers-reduced-motion (renders one calm frame).
   - Pauses via IntersectionObserver when scrolled out of view.
   - Listens on `containerRef` (not its own canvas) so it never
     steals pointer events from buttons/links above it.
   ═══════════════════════════════════════════════════════ */

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

const LINK_DIST = 130;
const CURSOR_DIST = 190;

export default function HeroBackground({
  containerRef,
  className,
}: {
  containerRef: React.RefObject<HTMLElement>;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!container || !wrap || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    let theme: 'dark' | 'light' = 'dark';
    const mouse = { x: -9999, y: -9999, active: false };

    const readTheme = () => {
      theme = (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
    };
    readTheme();
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const countFor = (w: number) => Math.min(85, Math.max(30, Math.round(w / 17)));

    const buildParticles = () => {
      const n = countFor(width);
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() * 1.5 + 0.9,
      }));
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = theme !== 'light';
      const dotRGB = isDark ? '167,139,250' : '108,75,255';
      const lineRGB = '108,75,255';
      const dotAlphaBase = isDark ? 0.7 : 0.5;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_DIST && dist > 0.01) {
            const force = (1 - dist / CURSOR_DIST) * 0.055;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            const nearCursor =
              mouse.active &&
              (Math.hypot(a.x - mouse.x, a.y - mouse.y) < CURSOR_DIST ||
                Math.hypot(b.x - mouse.x, b.y - mouse.y) < CURSOR_DIST);
            const alpha = (1 - dist / LINK_DIST) * (nearCursor ? 0.55 : 0.14);
            ctx.strokeStyle = `rgba(${lineRGB},${alpha})`;
            ctx.lineWidth = nearCursor ? 1.1 : 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const dCursor = mouse.active ? Math.hypot(p.x - mouse.x, p.y - mouse.y) : Infinity;
        const lit = dCursor < CURSOR_DIST;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${dotRGB},${lit ? 1 : dotAlphaBase})`;
        ctx.shadowColor = lit ? `rgba(${lineRGB},0.9)` : 'transparent';
        ctx.shadowBlur = lit ? 8 : 0;
        ctx.arc(p.x, p.y, lit ? p.r * 1.6 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      if (!visible) return;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && !reduced;
        if (visible) raf = requestAnimationFrame(loop);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0.01 }
    );
    io.observe(wrap);

    if (reduced) {
      draw(); // one calm, static frame — no motion, no listeners needed
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      visible = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      io.disconnect();
      themeObserver.disconnect();
    };
  }, [containerRef]);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
