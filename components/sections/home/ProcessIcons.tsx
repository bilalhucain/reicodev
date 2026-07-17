/* ═══════════════════════════════════════════════════════
   ProcessIcons — hand-drawn line icons, one per step.
   Each icon exposes its animatable pieces via [data-part]
   so the animation layer (processAnimations.ts) can target
   them without any icon needing to know about GSAP.
   Icons are intentionally *not* imported from lucide-react
   directly — Telescope/Route/Grid2x2Check/CircleGauge are
   redrawn at 1.5px stroke to match this icon family, and
   "Pencil + Sparkles" is composed from two lucide glyphs
   since lucide has no single PencilSparkles icon.
   ═══════════════════════════════════════════════════════ */

import { forwardRef } from 'react';

export type ProcessIconProps = {
  className?: string;
};

/* 01 — Discovery: Telescope */
export const TelescopeIcon = forwardRef<SVGSVGElement, ProcessIconProps>(
  ({ className }, ref) => (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g data-part="scope">
        <path data-part="tube" d="M7.5 12.2 18 6.3l2 3.4-10.3 6.1z" />
        <path d="M7.5 12.2 5.2 17" />
        <path d="M10.6 14 8.3 18.8" />
        <circle data-part="lens" cx="18.6" cy="7.6" r="1.15" fill="currentColor" stroke="none" opacity="0.55" />
      </g>
      <path data-part="leg" d="M5.5 21.5 7 17.6" />
      <path data-part="leg" d="M9.3 21.5 10.2 18.6" />
      <path data-part="leg" d="M13 21.5 11.8 19.2" />
    </svg>
  )
);
TelescopeIcon.displayName = 'TelescopeIcon';

/* 02 — Strategy: Route */
export const RouteIcon = forwardRef<SVGSVGElement, ProcessIconProps>(
  ({ className }, ref) => (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path
        data-part="path"
        d="M5.5 18.5C5.5 15 9 14.5 9 11.5C9 8.5 5.8 8.2 6.3 5.3"
        pathLength="100"
      />
      <path
        data-part="path"
        d="M6.3 5.3C6.8 3 9.5 2.7 10.3 4.8C11.3 7.4 14.7 7 15 10C15.3 13 18.5 12.8 18.5 16.5"
        pathLength="100"
      />
      <circle data-part="startDot" cx="5.5" cy="18.5" r="1.8" fill="currentColor" stroke="none" />
      <circle data-part="endDot" cx="18.5" cy="16.5" r="1.8" fill="none" />
      <circle data-part="travelDot" cx="5.5" cy="18.5" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  )
);
RouteIcon.displayName = 'RouteIcon';

/* 03 — Design: Pencil + Sparkles */
export const PencilSparklesIcon = forwardRef<SVGSVGElement, ProcessIconProps>(
  ({ className }, ref) => (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path data-part="pencil" d="m14.2 4.8 3.8 3.8L8.7 17.9l-4.4 1 1-4.4z" />
      <path data-part="tipline" d="m13 6 3.8 3.8" />
      <path data-part="drawline" d="M4.5 19.5c3-.4 5.6-1 7.6-3.4" pathLength="100" />
      <g data-part="sparkleBig">
        <path d="M18.7 12.4v2.6" />
        <path d="M17.4 13.7h2.6" />
      </g>
      <g data-part="sparkleSmall">
        <path d="M20.4 17.2v1.6" />
        <path d="M19.6 18h1.6" />
      </g>
    </svg>
  )
);
PencilSparklesIcon.displayName = 'PencilSparklesIcon';

/* 04 — Development: Grid2x2Check */
export const GridCheckIcon = forwardRef<SVGSVGElement, ProcessIconProps>(
  ({ className }, ref) => (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect data-part="cell cell1" x="3" y="3" width="8" height="8" rx="1.6" />
      <rect data-part="cell cell2" x="13" y="3" width="8" height="8" rx="1.6" />
      <rect data-part="cell cell3" x="3" y="13" width="8" height="8" rx="1.6" />
      <rect data-part="cell cell4" x="13" y="13" width="8" height="8" rx="1.6" />
      <path data-part="check" d="M9.3 17.6 11 19.5l4-5.3" pathLength="100" />
    </svg>
  )
);
GridCheckIcon.displayName = 'GridCheckIcon';

/* 05 — Optimization: CircleGauge */
export const GaugeIcon = forwardRef<SVGSVGElement, ProcessIconProps>(
  ({ className }, ref) => (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path data-part="track" d="M4.2 16a7.8 7.8 0 1 1 15.6 0" opacity="0.32" />
      <path data-part="arc" d="M4.2 16a7.8 7.8 0 1 1 15.6 0" pathLength="100" />
      <g data-part="needleGroup">
        <line data-part="needle" x1="12" y1="16" x2="12" y2="9.4" />
      </g>
      <circle cx="12" cy="16" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
);
GaugeIcon.displayName = 'GaugeIcon';

export const PROCESS_ICONS = [
  TelescopeIcon,
  RouteIcon,
  PencilSparklesIcon,
  GridCheckIcon,
  GaugeIcon,
] as const;
