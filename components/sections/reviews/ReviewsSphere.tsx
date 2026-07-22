'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { gsap } from 'gsap';
import type { Testimonial } from '@/lib/testimonials';
import { getTestimonialText, getTestimonialCountry } from '@/lib/testimonials';
import ReviewCard from './ReviewCard';
import styles from './ReviewsSphere.module.css';

interface Props {
  items: Testimonial[];
  locale: string;
  repeatClientLabel: string;
  closeLabel: string;
  /** Plain prefix string, e.g. "View full review from" — Server Components
   *  can't pass functions to Client Components, so the name is appended
   *  here rather than interpolated via a passed-in formatter. */
  viewReviewLabel: string;
}

const SPHERE_RADIUS  = 900;
const CAMERA_DISTANCE = 1650;
const IDLE_REVOLUTION_SECONDS = 130; // one full slow drift every ~2 minutes

/** Evenly distributes N points on a sphere surface, but only within a
 *  vertical "band" around the equator (golden-angle spiral for the
 *  horizontal spread, same technique used for phyllotaxis/sunflower-seed
 *  patterns).
 *
 *  Why not the full pole-to-pole sphere: rotation here only ever spins
 *  around the Y axis, so a card's vertical position is permanently fixed
 *  — it can never rotate into view. If points are spread all the way to
 *  the poles, the camera's field of view can't reach them at ANY
 *  rotation, so they just sit there invisible forever, showing up as a
 *  visually empty region instead of content. Clamping the vertical
 *  spread to a band keeps every card within what the camera can actually
 *  show, so the frame always looks full while it spins. */
function fibonacciSpherePoints(count: number, radius: number, bandFactor = 0.62): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const yNorm = 1 - (i / Math.max(count - 1, 1)) * 2; // -1..1
    const y = yNorm * radius * bandFactor;
    const r = Math.sqrt(Math.max(0, 1 - yNorm * yNorm)) * radius;
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(
      Math.cos(theta) * r,
      y,
      Math.sin(theta) * r,
    ));
  }
  return points;
}

export default function ReviewsSphere({ items, locale, repeatClientLabel, closeLabel, viewReviewLabel }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<Testimonial | null>(null);
  const focusedRef = useRef<Testimonial | null>(null);
  const closeFocusImpRef = useRef<() => void>(() => {});

  useEffect(() => { focusedRef.current = focused; }, [focused]);

  const closeFocus = useCallback(() => closeFocusImpRef.current(), []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || items.length === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width  = mount.clientWidth;
    let height = mount.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 1, 8000);
    const defaultCamPos = new THREE.Vector3(0, 0, CAMERA_DISTANCE);
    const defaultTarget = new THREE.Vector3(0, 0, 0);
    camera.position.copy(defaultCamPos);
    camera.lookAt(defaultTarget);

    const renderer = new CSS3DRenderer();
    renderer.setSize(width, height);
    renderer.domElement.className = styles.renderer;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const positions = fibonacciSpherePoints(items.length, SPHERE_RADIUS);
    const cardMeta: { object: CSS3DObject; el: HTMLDivElement; review: Testimonial }[] = [];

    items.forEach((review, i) => {
      const el = document.createElement('div');
      el.className = styles.sphereCard;
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `${viewReviewLabel} ${review.name}`);
      el.innerHTML = renderToStaticMarkup(
        <ReviewCard review={review} locale={locale} repeatClientLabel={repeatClientLabel} compact />
      );

      const object = new CSS3DObject(el);
      object.position.copy(positions[i]);
      // Face OUTWARD, not at the center. lookAt(0,0,0) would point the card's
      // front toward the sphere's core, which flips the text/reads inside-out
      // from the viewer's side. Looking at a point twice as far along the
      // same radial line orients the card's front face away from center —
      // correctly readable from outside the sphere.
      object.lookAt(positions[i].clone().multiplyScalar(2));
      group.add(object);

      cardMeta.push({ object, el, review });
    });

    // ── click / keyboard → focus, but only if it wasn't a drag ────────
    const DRAG_THRESHOLD = 6; // px — below this, treat pointerup as a click
    let dragStartX = 0, dragStartY = 0, dragMoved = false;

    const handleActivate = (meta: typeof cardMeta[number]) => setFocused(meta.review);
    cardMeta.forEach(meta => {
      meta.el.addEventListener('click', (e) => {
        if (dragMoved) { e.preventDefault(); e.stopPropagation(); return; }
        handleActivate(meta);
      });
      meta.el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(meta); }
      });
    });

    // ── idle auto-rotate — NEVER pauses on hover, only while actively
    //    dragging or while a card is focused (camera is elsewhere then) ──
    let rafId = 0;
    let lastTime = performance.now();
    const rotSpeed = reducedMotion ? 0 : (Math.PI * 2) / (IDLE_REVOLUTION_SECONDS * 1000);

    let isDragging = false;
    let dragVelocity = 0; // rad/ms, for a small momentum flick on release

    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      if (!isDragging && !focusedRef.current) {
        // idle drift, plus any residual momentum decaying toward 0
        group.rotation.y += rotSpeed * dt + dragVelocity * dt;
        if (dragVelocity !== 0) {
          dragVelocity *= 0.92;
          if (Math.abs(dragVelocity) < 0.00002) dragVelocity = 0;
        }
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── drag-to-rotate (mouse + touch, via Pointer Events) ─────────────
    const DRAG_SENSITIVITY = 0.0032; // rad per px
    let lastPointerX = 0;
    let lastMoveTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (focusedRef.current) return; // don't spin the sphere while a card is open
      isDragging = true;
      dragMoved = false;
      dragVelocity = 0;
      dragStartX = lastPointerX = e.clientX;
      dragStartY = e.clientY;
      lastMoveTime = performance.now();
      mount.classList.add(styles.grabbing);
      mount.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastPointerX;
      const totalDx = e.clientX - dragStartX;
      const totalDy = e.clientY - dragStartY;
      if (Math.abs(totalDx) > DRAG_THRESHOLD || Math.abs(totalDy) > DRAG_THRESHOLD) dragMoved = true;

      group.rotation.y += dx * DRAG_SENSITIVITY;

      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTime);
      dragVelocity = (dx * DRAG_SENSITIVITY) / dt;
      lastPointerX = e.clientX;
      lastMoveTime = now;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      mount.classList.remove(styles.grabbing);
      try { mount.releasePointerCapture(e.pointerId); } catch { /* already released */ }
      // dragVelocity keeps decaying in tick() for a brief momentum flick,
      // then the idle drift takes back over seamlessly.
    };

    mount.addEventListener('pointerdown', onPointerDown);
    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('pointercancel', onPointerUp);

    // ── click-to-focus camera dolly ───────────────────────────────────
    const camProxy = { x: camera.position.x, y: camera.position.y, z: camera.position.z,
                        tx: defaultTarget.x, ty: defaultTarget.y, tz: defaultTarget.z };
    let camTween: gsap.core.Tween | null = null;

    const focusOnObject = (object: CSS3DObject) => {
      const worldPos = object.position.clone().applyMatrix4(group.matrixWorld);
      const camPos = worldPos.clone().normalize().multiplyScalar(SPHERE_RADIUS * 0.62);
      camTween?.kill();
      camTween = gsap.to(camProxy, {
        x: camPos.x, y: camPos.y, z: camPos.z,
        tx: worldPos.x, ty: worldPos.y, tz: worldPos.z,
        duration: 0.9, ease: 'power3.inOut',
        onUpdate: () => {
          camera.position.set(camProxy.x, camProxy.y, camProxy.z);
          camera.lookAt(camProxy.tx, camProxy.ty, camProxy.tz);
        },
      });
    };

    const resetCamera = () => {
      camTween?.kill();
      camTween = gsap.to(camProxy, {
        x: defaultCamPos.x, y: defaultCamPos.y, z: defaultCamPos.z,
        tx: defaultTarget.x, ty: defaultTarget.y, tz: defaultTarget.z,
        duration: 0.8, ease: 'power3.inOut',
        onUpdate: () => {
          camera.position.set(camProxy.x, camProxy.y, camProxy.z);
          camera.lookAt(camProxy.tx, camProxy.ty, camProxy.tz);
        },
      });
    };

    closeFocusImpRef.current = () => setFocused(null);

    // ── resize ─────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      width  = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    // expose a way for the focus-state effect below to reach into the scene
    (mount as any).__focusOnObject = focusOnObject;
    (mount as any).__resetCamera = resetCamera;
    (mount as any).__cardMeta = cardMeta;

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      mount.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('pointercancel', onPointerUp);
      camTween?.kill();
      mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, locale, repeatClientLabel]);

  // Drives the visual "focus" state: dims siblings, dollies the camera.
  // Kept as a separate effect (rather than inline in the click handler)
  // so it also fires correctly if focus is cleared via the close button.
  useEffect(() => {
    const mount = mountRef.current as any;
    if (!mount || !mount.__cardMeta) return;
    const cardMeta = mount.__cardMeta as { object: CSS3DObject; el: HTMLDivElement; review: Testimonial }[];

    if (focused) {
      const meta = cardMeta.find(m => m.review.id === focused.id);
      if (meta) mount.__focusOnObject(meta.object);
      cardMeta.forEach(m => {
        m.el.classList.toggle(styles.dimmed, m.review.id !== focused.id);
      });
    } else {
      mount.__resetCamera?.();
      cardMeta.forEach(m => m.el.classList.remove(styles.dimmed));
    }
  }, [focused]);

  return (
    <div className={styles.wrap}>
      <div className={styles.mount} ref={mountRef} />

      {focused && (
        <div className={styles.detailPanel} role="dialog" aria-modal="true" aria-label={focused.name}>
          <button className={styles.closeBtn} onClick={closeFocus} aria-label={closeLabel}>
            <span aria-hidden="true">×</span> {closeLabel}
          </button>
          <div className={styles.detailStars} aria-hidden="true">
            {'★'.repeat(Math.round(focused.rating))}{'☆'.repeat(5 - Math.round(focused.rating))}
          </div>
          <p className={styles.detailText}>&ldquo;{getTestimonialText(focused, locale)}&rdquo;</p>
          <div className={styles.detailAuthor}>
            <div className={styles.detailAvatar}>{focused.initial}</div>
            <div>
              <div className={styles.detailName}>
                {focused.name}
                {focused.repeatClient && <span className={styles.detailPill}>{repeatClientLabel}</span>}
              </div>
              <div className={styles.detailRole}>
                <span className={`fi fi-${focused.countryCode} ${styles.detailFlag}`} aria-hidden="true" />
                {getTestimonialCountry(focused, locale)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
