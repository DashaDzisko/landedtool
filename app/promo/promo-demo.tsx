"use client";

import { CountUp } from "@/components/atoms/count-up";
import { Text } from "@/components/atoms/text";
import { MessageList } from "@/components/molecules/message-list";
import type { ChatMessage } from "@/components/molecules/message-list";
import { KanbanBoard } from "@/components/organisms/canvas";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { statusLabels } from "@/lib/status-colors";
import type { Application, ApplicationStatus } from "@/types/application";
import { useEffect, useRef, useState } from "react";

const DEMO_COLUMNS: ApplicationStatus[] = [
  "applied",
  "screening",
  "interview",
  "offer",
];

const BETA_ID = "2"; // Beta Labs — the card we drag from Applied to Offer
const BASE_APPS = MOCK_APPLICATIONS.filter((a) => a.id !== BETA_ID);
const BETA = MOCK_APPLICATIONS.find((a) => a.id === BETA_ID) as Application;

// Chat copy tuned to the companies actually on the demo board
const BASE_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    author: "You",
    content: "How's my pipeline looking?",
    timestamp: "10:00",
    isUser: true,
  },
  {
    id: "m2",
    author: "Agent",
    content:
      "Delta Systems already has an offer and Acme Corp is mid-interview. Here's the full picture:",
    timestamp: "10:00",
    widget: { type: "pipeline-stats" },
  },
];
const CONGRATS: ChatMessage = {
  id: "congrats",
  author: "Agent",
  content:
    "🎉 Beta Labs just moved to Offer — that's 2 offers now! Want me to draft an acceptance email?",
  timestamp: "10:02",
};

type BetaStatus = "applied" | "hidden" | "offer";

// Single play-through (no loop) — the card lands in Offer and stays there.
const START_DELAY = 1300;
const PLAY = 4200;
const GRAB = 0.08;
const DRAG_END = 0.46;
const SCROLL_START = 0.46;
const SCROLL_END = 0.74;
const DROP = 0.82;
const START_LEFT = 2;
const EDGE_LEFT = 64;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const easeInOut = (x: number) =>
  x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

/** Live pipeline snapshot — mirrors the product's ChatStats widget. */
function DemoStats({ applications }: { applications: Application[] }) {
  const order: ApplicationStatus[] = [
    "applied",
    "screening",
    "interview",
    "offer",
  ];
  const counts = order.map((status) => ({
    status,
    count: applications.filter((a) => a.status === status).length,
  }));
  const max = Math.max(1, ...counts.map((c) => c.count));
  const active = applications.filter(
    (a) => !["rejected", "withdrawn"].includes(a.status)
  ).length;
  const interviews = counts.find((c) => c.status === "interview")?.count ?? 0;
  const offers = counts.find((c) => c.status === "offer")?.count ?? 0;

  const Metric = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col gap-0.5 rounded-md bg-surface-3 px-3 py-2">
      <Text variant="xs" as="span" className="text-ink-subtle">
        {label}
      </Text>
      <span className="text-h2 font-semibold text-foreground">
        <CountUp value={value} />
      </span>
    </div>
  );

  return (
    <div className="bento-card flex flex-col gap-3 p-3">
      <div className="grid grid-cols-3 gap-2">
        <Metric label="Active" value={active} />
        <Metric label="Interviews" value={interviews} />
        <Metric label="Offers" value={offers} />
      </div>
      <div className="flex flex-col gap-1.5">
        {counts
          .filter((c) => c.count > 0)
          .map(({ status, count }) => (
            <div key={status} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs text-ink-subtle">
                {statusLabels[status]}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-pill bg-surface-3">
                <div
                  className="h-full rounded-pill transition-[width] duration-500"
                  style={{
                    width: `${(count / max) * 100}%`,
                    backgroundColor: `var(--status-${status}-text)`,
                  }}
                />
              </div>
              <span className="w-4 shrink-0 text-right text-xs text-ink-muted">
                {count}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export function PromoDemo() {
  const [betaStatus, setBetaStatus] = useState<BetaStatus>("applied");
  const [congrats, setCongrats] = useState(false);

  const ghostRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<SVGSVGElement>(null);
  const boardWrapRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLElement>(null);

  const betaRef = useRef<BetaStatus>("applied");
  const congratsRef = useRef(false);

  // Keep the newest chat content (stats, congrats) in view on short panels.
  useEffect(() => {
    const el = chatRef.current?.querySelector<HTMLElement>(".promo__chat-msgs");
    if (el) el.scrollTop = el.scrollHeight;
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      // Skip the animation — show the finished, landed-in-Offer state.
      setBetaStatus("offer");
      setCongrats(true);
      return;
    }

    let raf = 0;
    let startTs = 0;

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const eff = ts - startTs - START_DELAY;
      const t = eff <= 0 ? 0 : clamp01(eff / PLAY);
      const done = t >= 1;

      const ghost = ghostRef.current;
      const cursor = cursorRef.current;
      const scroller = boardWrapRef.current
        ?.firstElementChild as HTMLElement | null;

      // ---- Ghost card ----
      let left = START_LEFT;
      let opacity = 0;
      let scale = 1;
      let rotate = 0;
      let lift = 0;
      if (t >= GRAB && t < DRAG_END) {
        const p = easeInOut(clamp01((t - GRAB) / (DRAG_END - GRAB)));
        left = lerp(START_LEFT, EDGE_LEFT, p);
        opacity = 1;
        scale = 1.05;
        rotate = -3;
        lift = -6;
      } else if (t >= DRAG_END && t < DROP) {
        left = EDGE_LEFT;
        opacity = 1;
        const p = easeInOut(clamp01((t - SCROLL_END) / (DROP - SCROLL_END)));
        scale = lerp(1.05, 1, p);
        rotate = lerp(-3, 0, p);
        lift = lerp(-6, 0, p);
      }
      if (ghost) {
        ghost.style.left = `${left}%`;
        ghost.style.opacity = `${opacity}`;
        ghost.style.transform = `translateY(${lift}px) scale(${scale}) rotate(${rotate}deg)`;
      }

      // ---- Cursor ----
      let cLeft = START_LEFT + 7;
      let cOpacity = 0;
      let cScale = 1;
      if (t >= 0.03 && t < DROP + 0.04) {
        cLeft = left + 7;
        cOpacity = 1;
        if (t >= GRAB - 0.01 && t < GRAB + 0.03) cScale = 0.82;
        else if (t >= DROP - 0.04 && t < DROP) cScale = 0.82;
      }
      if (cursor) {
        cursor.style.left = `${cLeft}%`;
        cursor.style.opacity = `${cOpacity}`;
        cursor.style.transform = `scale(${cScale})`;
      }

      // ---- Board horizontal scroll (real scrollLeft) ----
      if (scroller) {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        let frac = 0;
        if (t >= SCROLL_START && t < SCROLL_END) {
          frac = easeInOut((t - SCROLL_START) / (SCROLL_END - SCROLL_START));
        } else if (t >= SCROLL_END) {
          frac = 1;
        }
        scroller.scrollLeft = maxScroll * frac;
      }

      // ---- Discrete board + chat state ----
      let desiredBeta: BetaStatus;
      if (t < GRAB) desiredBeta = "applied";
      else if (t < DROP) desiredBeta = "hidden";
      else desiredBeta = "offer";

      const desiredCongrats = t >= DROP;

      if (desiredBeta !== betaRef.current) {
        betaRef.current = desiredBeta;
        setBetaStatus(desiredBeta);
      }
      if (desiredCongrats !== congratsRef.current) {
        congratsRef.current = desiredCongrats;
        setCongrats(desiredCongrats);
      }

      if (!done) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const applications =
    betaStatus === "hidden"
      ? BASE_APPS
      : [...BASE_APPS, { ...BETA, status: betaStatus }];

  const messages = congrats ? [...BASE_MESSAGES, CONGRATS] : BASE_MESSAGES;

  return (
    <div className="promo__demo" inert aria-hidden="true">
      <aside className="promo__chat" ref={chatRef}>
        <div className="promo__chat-head">
          <span className="promo__chat-dot" />
          AI co-pilot
        </div>
        <MessageList
          messages={messages}
          variant="panel"
          isAgentTyping
          className="promo__chat-msgs"
          renderWidget={(m) =>
            m.widget?.type === "pipeline-stats" ? (
              <DemoStats applications={applications} />
            ) : null
          }
        />
        <div className="promo__chat-composer">Ask anything…</div>
      </aside>

      <div className="promo__board" ref={boardWrapRef}>
        <KanbanBoard applications={applications} columns={DEMO_COLUMNS} />
      </div>

      {/* Cursor + ghost card driven imperatively by the rAF loop */}
      <div className="promo__dragzone">
        <div className="promo__drag-card" ref={ghostRef}>
          <span className="promo__drag-avatar">B</span>
          <span className="promo__drag-lines">
            <span className="promo__drag-l1">Beta Labs</span>
            <span className="promo__drag-l2">Design Engineer</span>
          </span>
        </div>
        <svg
          className="promo__cursor"
          ref={cursorRef}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 2.5l13.5 6.2-5.7 1.8-2.3 5.6z"
            fill="#fff"
            stroke="#1a1a1a"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
