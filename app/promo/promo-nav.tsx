"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/** Mega-menu columns shown under "Product". */
const MEGA = [
  {
    heading: "Track",
    items: [
      { label: "Kanban board", desc: "Drag from applied to offer", href: "#waitlist" },
      { label: "Pipeline view", desc: "Every stage at a glance", href: "#waitlist" },
      { label: "Reminders", desc: "Never miss a follow-up", href: "#waitlist" },
    ],
  },
  {
    heading: "AI co-pilot",
    items: [
      { label: "Chat assistant", desc: "Ask about your search", href: "#waitlist" },
      { label: "Draft emails", desc: "Follow-ups in one click", href: "#waitlist" },
      { label: "Insights", desc: "Spot what's working", href: "#waitlist" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Guides", desc: "Land your next role", href: "#waitlist" },
      { label: "Changelog", desc: "What's new in Landed", href: "#waitlist" },
      { label: "Support", desc: "We're here to help", href: "#waitlist" },
    ],
  },
];

const LINKS = [
  { label: "Pricing", href: "#waitlist" },
  { label: "About", href: "#about" },
];

export function PromoNav() {
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="promo-nav">
      <div className="promo-nav__inner">
        <Link href="/promo" className="promo-nav__brand">
          <Image src="/promo/Sun.png" alt="" width={28} height={28} />
          <span>Landed</span>
        </Link>

        <nav
          className="promo-nav__links"
          onMouseLeave={() => setMegaOpen(false)}
        >
          <div className="promo-nav__item">
            <button
              type="button"
              className="promo-nav__link"
              aria-expanded={megaOpen}
              onMouseEnter={() => setMegaOpen(true)}
              onFocus={() => setMegaOpen(true)}
              onClick={() => setMegaOpen((v) => !v)}
            >
              Product
              <svg
                className="promo-nav__caret"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {/* Mega menu */}
            <div
              className="promo-mega"
              data-open={megaOpen}
              onMouseEnter={() => setMegaOpen(true)}
            >
              <div className="promo-mega__grid">
                {MEGA.map((col) => (
                  <div key={col.heading} className="promo-mega__col">
                    <p className="promo-mega__heading">{col.heading}</p>
                    {col.items.map((it) => (
                      <Link
                        key={it.label}
                        href={it.href}
                        className="promo-mega__link"
                      >
                        <span className="promo-mega__link-label">
                          {it.label}
                        </span>
                        <span className="promo-mega__link-desc">{it.desc}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="promo-mega__foot">
                <span>The sun never sets on your career path</span>
                <Link href="/sign-in" className="promo-mega__foot-link">
                  Get started →
                </Link>
              </div>
            </div>
          </div>

          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="promo-nav__link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="promo-nav__actions">
          <Link
            href="/sign-in"
            className="promo__btn promo__btn--primary promo-nav__cta"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
