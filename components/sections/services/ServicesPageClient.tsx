"use client";

// components/sections/services/ServicesPageClient.tsx
// Drop into: components/sections/services/ServicesPageClient.tsx
//
// Renders the full service-page UI from a ServiceContent object.
// Animations use IntersectionObserver to trigger GSAP tweens (not ScrollTrigger),
// per this project's established rule that ScrollTrigger can silently conflict
// with smooth-scroll setups elsewhere on the site.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Blocks,
  CheckCircle2,
  ChevronDown,
  Code2,
  CreditCard,
  FileSearch,
  FileStack,
  Gauge,
  Globe,
  Layers,
  MapPin,
  MonitorSmartphone,
  Package,
  Palette,
  PenTool,
  Puzzle,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Terminal,
  TrendingUp,
  Truck,
} from "lucide-react";
import type { ServiceContent } from "@/lib/services-data";
import styles from "./ServicesPageClient.module.css";

const ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Code2,
  Layers,
  RefreshCw,
  Puzzle,
  Gauge,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Globe,
  CreditCard,
  Palette,
  Blocks,
  PenTool,
  BookOpen,
  Package,
  MonitorSmartphone,
  FileStack,
  FileSearch,
  Braces,
  TrendingUp,
  MapPin,
};

function Icon({ name }: { name: string }) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp size={22} strokeWidth={1.75} />;
}

interface Props {
  content: ServiceContent;
  quoteHref: string;
  contactHref: string;
}

export default function ServicesPageClient({ content, quoteHref, contactHref }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const terminalLineRef = useRef<HTMLSpanElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Reveal-on-scroll: IntersectionObserver triggers GSAP, no ScrollTrigger involved.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!targets || targets.length === 0) return;

      gsap.set(targets, { opacity: 0, y: 28 });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
      );

      targets.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Terminal typing effect (hero signature only)
  useEffect(() => {
    if (content.signatureType !== "terminal" || !content.terminalCommand) return;
    const el = terminalLineRef.current;
    if (!el) return;

    const full = content.terminalCommand;
    el.textContent = "";
    const chars = full.split("");
    const obj = { i: 0 };

    const tween = gsap.to(obj, {
      i: chars.length,
      duration: Math.min(1.6, chars.length * 0.035),
      ease: "none",
      delay: 0.4,
      onUpdate: () => {
        el.textContent = chars.slice(0, Math.round(obj.i)).join("");
      },
    });

    return () => {
      tween.kill();
    };
  }, [content.signatureType, content.terminalCommand]);

  return (
    <div ref={rootRef} className={styles.page} data-theme-scope="services">
      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy} data-reveal>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              {content.eyebrow}
            </span>
            <h1 className={styles.h1}>{content.h1}</h1>
            <p className={styles.subhead}>{content.subhead}</p>

            <div className={styles.heroActions}>
              <a href={quoteHref} className={styles.btnPrimary}>
                Get a quote
                <ArrowRight size={17} strokeWidth={2} />
              </a>
              <a href={contactHref} className={styles.btnGhost}>
                Talk to the team
              </a>
            </div>

            <div className={styles.statRow}>
              {content.heroStats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual} data-reveal>
            {content.signatureType === "terminal" ? (
              <div className={styles.terminal}>
                <div className={styles.terminalChrome}>
                  <span className={styles.dot} style={{ background: "#FF5F57" }} />
                  <span className={styles.dot} style={{ background: "#FEBC2E" }} />
                  <span className={styles.dot} style={{ background: "#28C840" }} />
                  <span className={styles.terminalTitle}>
                    <Terminal size={12} strokeWidth={2} />
                    zsh
                  </span>
                </div>
                <div className={styles.terminalBody}>
                  <div className={styles.terminalLine}>
                    <span className={styles.terminalPrompt}>$</span>
                    <span ref={terminalLineRef} className={styles.terminalCommand} />
                    <span className={styles.terminalCursor} aria-hidden="true" />
                  </div>
                  {content.terminalOutput?.map((line, i) => (
                    <div key={i} className={styles.terminalOutputLine} style={{ animationDelay: `${1 + i * 0.35}s` }}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.swatchPanel}>
                <div className={styles.swatchRow}>
                  <span className={styles.swatch} style={{ background: "#0B0D12" }} />
                  <span className={styles.swatch} style={{ background: "#00D9A3" }} />
                  <span className={styles.swatch} style={{ background: "#FFB13D" }} />
                  <span className={styles.swatch} style={{ background: "#F5F6F8", border: "1px solid rgba(0,0,0,0.08)" }} />
                </div>
                <div className={styles.swatchTypeScale}>
                  <span style={{ fontSize: "1.8rem" }}>Aa</span>
                  <span style={{ fontSize: "1.3rem" }}>Aa</span>
                  <span style={{ fontSize: "1rem" }}>Aa</span>
                </div>
                <div className={styles.swatchMeta}>
                  <span>Design tokens</span>
                  <span className={styles.swatchMetaDim}>brand/color-scale.json</span>
                </div>
              </div>
            )}
            <div className={styles.heroImageFrame}>
              <div
                className={styles.heroImagePlaceholder}
                style={{ backgroundImage: `url(${content.caseStudies[0]?.imageSrc ?? ""})` }}
                role="img"
                aria-label={content.caseStudies[0]?.imageAlt ?? "Project preview"}
              />
              <div className={styles.heroImageChrome}>
                <span className={styles.dot} style={{ background: "#FF5F57" }} />
                <span className={styles.dot} style={{ background: "#FEBC2E" }} />
                <span className={styles.dot} style={{ background: "#28C840" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHAT'S INCLUDED ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead} data-reveal>
          <span className={styles.kicker}>What's included</span>
          <h2 className={styles.h2}>{content.includedIntro}</h2>
        </div>
        <div className={styles.deliverableGrid}>
          {content.deliverables.map((item) => (
            <div key={item.title} className={styles.deliverableCard} data-reveal>
              <div className={styles.deliverableIcon}>
                <Icon name={item.icon} />
              </div>
              <h3 className={styles.deliverableTitle}>{item.title}</h3>
              <p className={styles.deliverableText}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- STACK ---------- */}
      <section className={`${styles.section} ${styles.stackSection}`}>
        <div className={styles.stackInner} data-reveal>
          <span className={styles.kicker}>Tools & stack</span>
          <div className={styles.stackPills}>
            {content.stack.map((tool) => (
              <span key={tool} className={styles.pill}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead} data-reveal>
          <span className={styles.kicker}>Process</span>
          <h2 className={styles.h2}>How the build actually happens</h2>
        </div>
        <div className={styles.processList}>
          {content.process.map((step, i) => (
            <div key={step.title} className={styles.processStep} data-reveal>
              <div className={styles.processNumber}>{String(i + 1).padStart(2, "0")}</div>
              <div className={styles.processBody}>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processText}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CASE STUDIES ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead} data-reveal>
          <span className={styles.kicker}>Recent work</span>
          <h2 className={styles.h2}>Projects in this lane</h2>
        </div>
        <div className={styles.caseGrid}>
          {content.caseStudies.map((project) => (
            <a key={project.title} href={project.href} className={styles.caseCard} data-reveal>
              <div className={styles.caseImageFrame}>
                <div className={styles.caseImageChrome}>
                  <span className={styles.dot} style={{ background: "#FF5F57" }} />
                  <span className={styles.dot} style={{ background: "#FEBC2E" }} />
                  <span className={styles.dot} style={{ background: "#28C840" }} />
                </div>
                <div
                  className={styles.caseImage}
                  style={{ backgroundImage: `url(${project.imageSrc})` }}
                  role="img"
                  aria-label={project.imageAlt}
                />
              </div>
              <div className={styles.caseCardBody}>
                <span className={styles.caseTag}>{project.tag}</span>
                <span className={styles.caseTitle}>
                  {project.title}
                  <ArrowRight size={16} strokeWidth={2} className={styles.caseArrow} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead} data-reveal>
          <span className={styles.kicker}>FAQ</span>
          <h2 className={styles.h2}>Questions worth answering upfront</h2>
        </div>
        <div className={styles.faqList} data-reveal>
          {content.faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={faq.question} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ""}`}
                  />
                </button>
                <div className={`${styles.faqAnswerWrap} ${isOpen ? styles.faqAnswerWrapOpen : ""}`}>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className={styles.ctaSection} data-reveal>
        <div className={styles.ctaInner}>
          <CheckCircle2 size={28} strokeWidth={1.75} className={styles.ctaIcon} />
          <h2 className={styles.ctaHeadline}>{content.ctaHeadline}</h2>
          <p className={styles.ctaSubhead}>{content.ctaSubhead}</p>
          <div className={styles.heroActions}>
            <a href={quoteHref} className={styles.btnPrimary}>
              Get a quote
              <ArrowRight size={17} strokeWidth={2} />
            </a>
            <a href={contactHref} className={styles.btnGhost}>
              Talk to the team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
