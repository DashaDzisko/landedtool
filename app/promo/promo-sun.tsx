"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";

// How far each sparkle flies outward (in px) when the sun is clicked.
const BURST_DISTANCE = 120;

const SPIN_MS = 1100; // matches the rotation transition in promo.css

// All positions constrained to radius ≤ ~0.51 of half-width from center,
// so sparkles sit on the bead disc and inner rays, not on the outer tips.
const SUN_SPARKLES = [
  // Face / inner zone
  { top: "45%", left: "48%", delay: "0s",    duration: "2.4s" },
  { top: "52%", left: "53%", delay: "0.45s", duration: "2.1s" },
  { top: "55%", left: "47%", delay: "0.9s",  duration: "2.6s" },
  // Inner ring (cardinals + diagonals)
  { top: "38%", left: "50%", delay: "0.15s", duration: "1.8s" },
  { top: "62%", left: "50%", delay: "0.6s",  duration: "2.3s" },
  { top: "50%", left: "38%", delay: "1.05s", duration: "2s"   },
  { top: "50%", left: "62%", delay: "1.5s",  duration: "2.5s" },
  { top: "40%", left: "40%", delay: "0.3s",  duration: "2.2s" },
  { top: "40%", left: "60%", delay: "0.75s", duration: "2.4s" },
  { top: "60%", left: "40%", delay: "1.2s",  duration: "1.9s" },
  { top: "60%", left: "60%", delay: "1.65s", duration: "2.6s" },
  // Mid ring
  { top: "30%", left: "42%", delay: "0.5s",  duration: "2.1s" },
  { top: "30%", left: "58%", delay: "1.4s",  duration: "2.3s" },
  { top: "70%", left: "42%", delay: "0.85s", duration: "1.9s" },
  { top: "70%", left: "58%", delay: "1.75s", duration: "2.5s" },
  { top: "42%", left: "30%", delay: "0.35s", duration: "2.2s" },
  { top: "58%", left: "30%", delay: "1.25s", duration: "1.8s" },
  { top: "42%", left: "70%", delay: "0.95s", duration: "2.6s" },
  { top: "58%", left: "70%", delay: "1.85s", duration: "2.1s" },
  // Outer (still well inside rays)
  { top: "28%", left: "50%", delay: "0.2s",  duration: "2.5s" },
  { top: "72%", left: "50%", delay: "1.1s",  duration: "2s"   },
  { top: "50%", left: "28%", delay: "0.55s", duration: "2.3s" },
  { top: "50%", left: "72%", delay: "1.45s", duration: "1.9s" },
];

/** Hero sun that spins a full turn each time it's clicked — glowing only while it spins. */
export function PromoSun() {
  const [turns, setTurns] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spin = () => {
    setTurns((t) => t + 1);
    setSpinning(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSpinning(false), SPIN_MS);
  };

  return (
    <button
      type="button"
      className={`promo__sun-btn${spinning ? " is-spinning" : ""}`}
      onClick={spin}
      aria-label="Spin the sun"
    >
      <Image
        className={`promo__sun${spinning ? " is-spinning" : ""}`}
        src="/promo/Sun.png"
        alt="Ornate golden sun"
        width={240}
        height={240}
        priority
        style={{ transform: `rotate(${turns * 360}deg)` }}
      />
      {SUN_SPARKLES.map((s, i) => {
        // Outward unit vector from center (50%, 50%) → sparkle position, scaled by BURST_DISTANCE.
        const dx = parseFloat(s.left) - 50;
        const dy = parseFloat(s.top) - 50;
        const len = Math.hypot(dx, dy) || 1;
        const burstX = ((dx / len) * BURST_DISTANCE).toFixed(1);
        const burstY = ((dy / len) * BURST_DISTANCE).toFixed(1);
        const style: CSSProperties & Record<string, string> = {
          top: s.top,
          left: s.left,
          animationDelay: s.delay,
          animationDuration: s.duration,
          "--burst-x": `${burstX}px`,
          "--burst-y": `${burstY}px`,
        };
        return (
          <span
            key={i}
            className="promo__sun-sparkle"
            aria-hidden
            style={style}
          />
        );
      })}
    </button>
  );
}
