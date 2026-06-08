"use client";

import { ApplicationCard } from "@/components/organisms/dashboard/application-card";
import { cn } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/types/application";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { KanbanColumn } from "./kanban-column";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

const DEFAULT_COLUMNS: ApplicationStatus[] = [
  "saved",
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
];

interface DragData {
  id: string;
  app: Application;
  width: number;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotation: number;
  startX: number;
  startY: number;
  started: boolean;
}

/** Static snapshot used to render the floating ghost (animated values are imperative). */
interface DragView {
  id: string;
  app: Application;
  width: number;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
}

function columnAt(x: number, y: number): ApplicationStatus | null {
  const el = document.elementFromPoint(x, y);
  const col = el?.closest("[data-status]") as HTMLElement | null;
  return (col?.dataset.status as ApplicationStatus) ?? null;
}

export interface KanbanBoardProps {
  applications: Application[];
  columns?: ApplicationStatus[];
  /** Called when a card is dropped on a different status column. Enables drag. */
  onMove?: (id: string, status: ApplicationStatus) => void;
  className?: string;
}

/**
 * Applications canvas in board mode. With `onMove`, cards use a custom
 * pointer-drag: the grabbed card lifts into a floating ghost that tilts with
 * the swing velocity (pivoting from where you grabbed it) and settles upright
 * at rest. Dropping on another column changes its status.
 */
export function KanbanBoard({
  applications,
  columns = DEFAULT_COLUMNS,
  onMove,
  className,
}: KanbanBoardProps) {
  const [dragView, setDragView] = useState<DragView | null>(null);
  const [overStatus, setOverStatus] = useState<ApplicationStatus | null>(null);
  const dragRef = useRef<DragData | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const onMoveRef = useRef(onMove);
  const justDragged = useRef(false);
  const prevRects = useRef<Map<string, DOMRect>>(new Map());
  const dropFrom = useRef<{ id: string; x: number; y: number } | null>(null);

  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);

  // FLIP: animate cards settling into place — the dropped card slides from where
  // you released it, the others reflow up/down to make room.
  useIsoLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const reduce = prefersReducedMotion();
    const next = new Map<string, DOMRect>();
    board.querySelectorAll<HTMLElement>("[data-card-id]").forEach((el) => {
      const id = el.dataset.cardId as string;
      const rect = el.getBoundingClientRect();
      next.set(id, rect);
      if (reduce) return;
      const drop = dropFrom.current;
      if (drop && drop.id === id) {
        el.animate(
          [
            {
              transform: `translate(${drop.x - rect.left}px, ${drop.y - rect.top}px) scale(1.03)`,
              opacity: 0.9,
            },
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
          ],
          { duration: 340, easing: EASE }
        );
      } else {
        const prev = prevRects.current.get(id);
        if (prev) {
          const dx = prev.left - rect.left;
          const dy = prev.top - rect.top;
          if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            el.animate(
              [
                { transform: `translate(${dx}px, ${dy}px)` },
                { transform: "translate(0, 0)" },
              ],
              { duration: 300, easing: EASE }
            );
          }
        }
      }
    });
    prevRects.current = next;
    dropFrom.current = null;
  }, [applications]);

  // Animate the ghost while a drag is active.
  useEffect(() => {
    if (!dragView) return;
    let raf = 0;
    function loop() {
      const d = dragRef.current;
      const ghost = ghostRef.current;
      if (d && ghost) {
        const dx = d.targetX - d.x;
        const dy = d.targetY - d.y;
        d.x += dx * 0.22;
        d.y += dy * 0.22;
        // tilt with horizontal swing velocity; eases back to 0 at rest
        const targetRot = Math.max(-16, Math.min(16, dx * 0.45));
        d.rotation += (targetRot - d.rotation) * 0.18;
        ghost.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) rotate(${d.rotation}deg) scale(1.03)`;

        // Edge auto-scroll: drag near a side → scroll the board that way.
        const board = boardRef.current;
        if (board) {
          const rect = board.getBoundingClientRect();
          const px = d.targetX + d.offsetX; // cursor x
          const EDGE = 90;
          const MAX = 24;
          let delta = 0;
          if (px < rect.left + EDGE) {
            delta = -MAX * Math.min(1, (rect.left + EDGE - px) / EDGE);
          } else if (px > rect.right - EDGE) {
            delta = MAX * Math.min(1, (px - (rect.right - EDGE)) / EDGE);
          }
          if (delta !== 0) {
            const before = board.scrollLeft;
            board.scrollLeft += delta;
            // columns slid under a stationary cursor → re-check the drop target
            if (board.scrollLeft !== before) {
              setOverStatus(columnAt(px, d.targetY + d.offsetY));
            }
          }
        }
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dragView]);

  const handleMove = useCallback((e: globalThis.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    d.targetX = e.clientX - d.offsetX;
    d.targetY = e.clientY - d.offsetY;
    if (!d.started) {
      if (Math.hypot(e.clientX - d.startX, e.clientY - d.startY) < 6) return;
      d.started = true;
      setDragView({
        id: d.id,
        app: d.app,
        width: d.width,
        offsetX: d.offsetX,
        offsetY: d.offsetY,
        x: d.x,
        y: d.y,
      });
    }
    setOverStatus(columnAt(e.clientX, e.clientY));
  }, []);

  const handleUp = useCallback(
    (e: globalThis.PointerEvent) => {
      window.removeEventListener("pointermove", handleMove);
      const d = dragRef.current;
      if (d?.started) {
        const status = columnAt(e.clientX, e.clientY);
        if (status && status !== d.app.status) {
          dropFrom.current = { id: d.id, x: d.x, y: d.y };
          onMoveRef.current?.(d.id, status);
        }
        justDragged.current = true;
        setTimeout(() => {
          justDragged.current = false;
        }, 50);
      }
      dragRef.current = null;
      setDragView(null);
      setOverStatus(null);
    },
    [handleMove]
  );

  const handleCardPointerDown = useCallback(
    (e: PointerEvent, app: Application) => {
      if (!onMoveRef.current || e.button !== 0) return;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      dragRef.current = {
        id: app.id,
        app,
        width: rect.width,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
        x: rect.left,
        y: rect.top,
        targetX: rect.left,
        targetY: rect.top,
        rotation: 0,
        startX: e.clientX,
        startY: e.clientY,
        started: false,
      };
      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp, { once: true });
    },
    [handleMove, handleUp]
  );

  const handleCardClickCapture = useCallback((e: React.MouseEvent) => {
    if (justDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return (
    <div
      ref={boardRef}
      className={cn(
        "scroll-styled flex h-full gap-4 overflow-x-auto pb-2",
        className
      )}
    >
      {columns.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          applications={applications.filter((a) => a.status === status)}
          draggingId={dragView?.id ?? null}
          isOver={overStatus === status}
          onCardPointerDown={onMove ? handleCardPointerDown : undefined}
          onCardClickCapture={onMove ? handleCardClickCapture : undefined}
        />
      ))}

      {dragView &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={ghostRef}
            className="pointer-events-none fixed left-0 top-0 z-50 opacity-95 shadow-2xl"
            style={{
              width: dragView.width,
              transformOrigin: `${dragView.offsetX}px ${dragView.offsetY}px`,
              transform: `translate3d(${dragView.x}px, ${dragView.y}px, 0) scale(1.03)`,
            }}
          >
            <ApplicationCard
              application={dragView.app}
              showMenu={false}
              statusDisplay="hidden"
            />
          </div>,
          document.body
        )}
    </div>
  );
}
