'use client';
import { useEffect, useRef } from 'react';

// ── TUNING ────────────────────────────────────────────────────────────────────
const SPAWN_DISTANCE = 12;   // px mouse must move before spawning a new bird
const PARTICLE_LIFE  = 40;   // frames each bird lives
const SIZE_START     = 22;   // px — size when first spawned
const SIZE_END       = 6;    // px — size when it dies
const SPEED_DECAY    = 0.88; // how quickly birds slow down
const GRAVITY        = 0.06; // gentle downward drift
const ROTATION_SPEED = 0.03; // how much each bird rotates as it fades
const SPREAD         = 1.8;  // random velocity scatter

interface Bird {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  rotation: number;
  rotDir: number;
}

// Cache the image so we only load it once
let imgCache: HTMLImageElement | null = null;

function getImage(): HTMLImageElement {
  if (imgCache) return imgCache;
  const img = new window.Image();
  // Try standalone bird SVG first (best quality at small sizes)
  // If you don't have one, it falls back to cropping the logo webp
  img.src = '/images/reicodev-bird.svg';
  img.onerror = () => {
    img.src = '/images/reicodev-logo-dark-version.webp';
  };
  imgCache = img;
  return imgCache;
}

function drawFallbackBird(ctx: CanvasRenderingContext2D, size: number) {
  // Three horizontal rounded stripes — matches your logo bird shape exactly
  const s = size * 0.45;
  ctx.fillStyle = 'rgba(108,75,255,1)';
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const rowY = -s + i * (s * 0.82);
    const rowW = s * (1 - i * 0.3);
    ctx.roundRect(-rowW * 0.5, rowY, rowW, s * 0.3, 2);
  }
  ctx.fill();
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birds     = useRef<Bird[]>([]);
  const lastSpawn = useRef({ x: -999, y: -999 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getImage();

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function onMouseMove(e: MouseEvent) {
      const { clientX: x, clientY: y } = e;
      const dx = x - lastSpawn.current.x;
      const dy = y - lastSpawn.current.y;

      if (Math.hypot(dx, dy) > SPAWN_DISTANCE) {
        birds.current.push({
          x, y,
          vx: dx * 0.12 + (Math.random() - 0.5) * SPREAD,
          vy: dy * 0.12 + (Math.random() - 0.5) * SPREAD,
          life: PARTICLE_LIFE,
          maxLife: PARTICLE_LIFE,
          rotation: (Math.random() - 0.5) * 0.4,
          rotDir: Math.random() > 0.5 ? 1 : -1,
        });

        lastSpawn.current = { x, y };

        if (birds.current.length > 120) {
          birds.current = birds.current.slice(-120);
        }
      }
    }
    window.addEventListener('mousemove', onMouseMove);

    // Check if image loaded and is a full logo (needs cropping) vs standalone bird
    function isFullLogo() {
      return img.src.includes('logo') || img.src.includes('webp');
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      birds.current = birds.current.filter(b => b.life > 0);

      for (const b of birds.current) {
        b.life--;
        b.x  += b.vx;
        b.y  += b.vy;
        b.vx *= SPEED_DECAY;
        b.vy *= SPEED_DECAY;
        b.vy += GRAVITY;
        b.rotation += ROTATION_SPEED * b.rotDir;

        const progress  = b.life / b.maxLife;
        const alpha     = progress * 0.88;
        const size      = SIZE_END + (SIZE_START - SIZE_END) * progress;
        const half      = size / 2;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);

        if (img.complete && img.naturalWidth > 0) {
          if (isFullLogo()) {
            // Crop to just the bird icon (left ~28% of the logo)
            const cropW = Math.floor(img.naturalWidth * 0.28);
            const cropH = img.naturalHeight;
            ctx.drawImage(img, 0, 0, cropW, cropH, -half, -half, size, size);
          } else {
            ctx.drawImage(img, -half, -half, size, size);
          }
        } else {
          // Fallback while image loads — three-stripe bird shape
          drawFallbackBird(ctx, size);
        }

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      aria-hidden
    />
  );
}
