'use client';
import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/lib/data';
import styles from './HomeStats.module.css';

const ITEMS = [
  { icon:'😊', num: STATS.clients,   label:'Happy Clients',       suffix:'+' },
  { icon:'🚀', num: STATS.projects,  label:'Projects Delivered',  suffix:'+' },
  { icon:'🌍', num: STATS.countries, label:'Countries Served',    suffix:'+' },
  { icon:'⭐', num: STATS.rating,    label:'Fiverr Rating',       suffix:'/5' },
];

// Parse numeric value from strings like "1,440+", "488+", "4.9"
function parseNum(str: string): number {
  return parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
}

// Format number back with commas for display
function formatNum(n: number, original: string): string {
  const isDecimal = original.includes('.');
  if (isDecimal) return n.toFixed(1);
  if (n >= 1000) return Math.round(n).toLocaleString();
  return Math.round(n).toString();
}

function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const end = parseNum(target);
        const duration = 1800;
        const steps = 60;
        const increment = end / steps;
        let current = 0;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          // Ease out — faster start, slower end
          const progress = 1 - Math.pow(1 - step / steps, 3);
          current = end * progress;
          setDisplay(formatNum(current, target));
          if (step >= steps) {
            clearInterval(timer);
            setDisplay(formatNum(end, target));
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function HomeStats() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold:0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className={`section section-dark2 ${styles.section}`} ref={ref}>
      <div className="container">
        <div className={`stat-strip reveal`} style={{ gridTemplateColumns:`repeat(${ITEMS.length},1fr)` }}>
          {ITEMS.map((s, i) => (
            <div key={s.label} className="stat-item" style={{ transitionDelay:`${i*0.08}s` }}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-num">
                <AnimatedCounter target={s.num} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
