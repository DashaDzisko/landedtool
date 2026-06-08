"use client";

import { useEffect, useState } from "react";

export interface CountUpProps {
  value: number;
  /** Animation duration in ms. */
  duration?: number;
}

/** Animates a number from 0 up to `value` once on mount (rAF, ease-out). */
export function CountUp({ value, duration = 800 }: CountUpProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || value === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{display}</>;
}
