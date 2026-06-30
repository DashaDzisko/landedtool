import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PromoDemo } from "./promo-demo";
import { PromoFooter } from "./promo-footer";
import { PromoNav } from "./promo-nav";
import { PromoSun } from "./promo-sun";
import "./promo.css";

export const metadata: Metadata = {
  title: "Landed — the sun never sets on your career path",
  description:
    "AI-powered job application tracker. Keep every application moving from applied to offer.",
};

const TESTIMONIALS = [
  "Landed every interview I tracked.",
  "Finally, applications that don't fall through the cracks.",
  "From applied to offer in three weeks.",
  "The clearest pipeline I've ever had.",
  "It's like a co-pilot for my job search.",
];

const ARROW_SPARKLES = [
  { top: "18%", left: "26%", delay: "0s",    duration: "2.1s" },
  { top: "32%", left: "62%", delay: "0.35s", duration: "1.8s" },
  { top: "48%", left: "22%", delay: "0.7s",  duration: "2.4s" },
  { top: "24%", left: "78%", delay: "1.05s", duration: "2s"   },
  { top: "70%", left: "38%", delay: "1.3s",  duration: "1.9s" },
  { top: "58%", left: "72%", delay: "1.55s", duration: "2.3s" },
  { top: "82%", left: "55%", delay: "1.85s", duration: "1.7s" },
  { top: "40%", left: "48%", delay: "2.15s", duration: "2.2s" },
  { top: "62%", left: "18%", delay: "0.5s",  duration: "2.6s" },
  { top: "14%", left: "50%", delay: "1.75s", duration: "2s"   },
];

export default function PromoPage() {
  return (
    <main className="promo">
      <PromoNav />
      <span id="top" className="promo__anchor" />
      <div className="promo__inner">
        {/* Hero */}
        <PromoSun />

        <h1 className="promo__headline">
          The sun never sets on your career path
        </h1>

        <div className="promo__cta-row promo__cta--hero">
          <Link
            href="/sign-in"
            className="promo__btn promo__btn--primary"
          >
            Get started
          </Link>
          <span className="promo__cta-arrow-wrap" aria-hidden>
            <Image
              className="promo__cta-arrow"
              src="/promo/arrow.png"
              alt=""
              width={50}
              height={50}
              priority
            />
            {ARROW_SPARKLES.map((s, i) => (
              <span
                key={i}
                className="promo__cta-sparkle"
                style={{
                  top: s.top,
                  left: s.left,
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                }}
              />
            ))}
          </span>
        </div>

        {/* App demo, with the golden divider overlapping its bottom edge */}
        <section id="demo" className="promo__stage">
          <div className="promo__window">
            <div className="promo__chrome">
              <Image
                className="promo__dot"
                src="/promo/demo.png"
                alt=""
                width={16}
                height={16}
              />
              <Image
                className="promo__dot"
                src="/promo/demo.png"
                alt=""
                width={16}
                height={16}
              />
              <Image
                className="promo__dot"
                src="/promo/demo.png"
                alt=""
                width={16}
                height={16}
              />
            </div>
            {/* Real product UI — a self-running, non-interactive demo */}
            <PromoDemo />
          </div>

          <div className="promo__divider-band" aria-hidden="true">
            <Image
              className="promo__divider-half"
              src="/promo/Divider.png"
              alt=""
              width={760}
              height={320}
            />
            <Image
              className="promo__divider-half promo__divider-half--right"
              src="/promo/Divider.png"
              alt=""
              width={760}
              height={320}
            />
          </div>
        </section>

        {/* Testimonials marquee */}
        <div id="testimonials" className="promo__marquee">
          <div className="promo__track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((quote, i) => (
              <p className="promo__quote" key={i}>
                <span>&ldquo;</span>
                {quote}
              </p>
            ))}
          </div>
        </div>

        {/* About — two feature areas (image slots) */}
        <section id="about" className="promo__about">
          <article className="promo__about-card">
            <div className="promo__about-media" data-slot="kanban">
              {/* Image slot — drop the Kanban screenshot here */}
              <span className="promo__about-media-label">Kanban board</span>
            </div>
            <h2 className="promo__about-title">See every application at a glance</h2>
            <p className="promo__about-copy">
              Drag applications from applied to offer on a board built for
              momentum. Nothing slips through the cracks.
            </p>
          </article>

          <article className="promo__about-card">
            <div className="promo__about-media" data-slot="ai">
              {/* Image slot — drop the AI screenshot here */}
              <span className="promo__about-media-label">AI co-pilot</span>
            </div>
            <h2 className="promo__about-title">Let the AI do the busywork</h2>
            <p className="promo__about-copy">
              Auto-fill details, draft follow-ups, and surface your next move —
              so you spend your energy on the conversations that matter.
            </p>
          </article>
        </section>
      </div>

      <PromoFooter />
    </main>
  );
}
