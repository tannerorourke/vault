import { RefObject, useEffect, useRef } from "react";

import type { DrawerId } from "@/components/providers/DrawerProvider";

import { setChargeDir } from "./charge-direction";

/** Config -------------------- */
const CHARGE_NEEDED_PX = 540; // scroll distance to fully charge a ring
const MAX_STEP = 140; // clamp a single input event's contribution

const IDLE_BEFORE_DRAIN_MS = 1000; // idle period before the charge starts draining
const DRAIN_TIME_MS = 5000; // time to drain a full ring (1 -> 0), linear
const TRIGGER_LOCK_MS = 400; // ignore input while a drawer open/close animates
const OPEN_DECAY_DELAY_MS = 200; // after opening a drawer, hold the full ring before it empties
const EDGE_EPSILON_PX = 1; // tolerance for "at the top/bottom edge" of a surface
/** --------------------------- */

const wheelPx = (e: WheelEvent) => {
  if (e.deltaMode === 1) return e.deltaY * 30; // px per line
  if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
  return e.deltaY;
};

// dir +1 = down / right / toward Work; dir -1 = up / left / toward Contact.
// Vertical keys are boundary-gated (they double as native scroll); the
// horizontal arrows are pure gateway intent and fire immediately (see onKey).
const DOWN_KEYS = new Set(["ArrowDown", "PageDown", " ", "Spacebar", "End"]);
const UP_KEYS = new Set(["ArrowUp", "PageUp", "Home"]);

type Side = "top" | "bottom";

/** Is a step in `dir` legal from the current slider position? */
const allowed = (open: DrawerId | null, dir: number) =>
  dir > 0
    ? open === null || open === "contact" // home -> work, or contact -> home
    : open === null || open === "work"; //   home -> contact, or work -> home

/** Perform slider transition based on direction + open state */
export const resolve = (
  open: DrawerId | null,
  dir: number,
  openDrawer: (id: DrawerId) => void,
  closeDrawer: () => void,
) => {
  if (dir > 0) {
    if (open === null) openDrawer("work");
    else if (open === "contact") closeDrawer();
  } else {
    if (open === null) openDrawer("contact");
    else if (open === "work") closeDrawer();
  }
};

/**
 * Which cue/ring visualises a valid gesture from `handleIntent` */
const cueFor = (open: DrawerId | null, dir: number): Side =>
  open === "work"
    ? "bottom"
    : open === "contact"
      ? "top"
      : dir > 0
        ? "bottom"
        : "top";

const atTop = (el: HTMLElement) => el.scrollTop <= EDGE_EPSILON_PX;
const atBottom = (el: HTMLElement) =>
  el.scrollHeight - el.clientHeight - el.scrollTop <= EDGE_EPSILON_PX;
/** Check for overscroll */
const atEdge = (el: HTMLElement, dir: number) =>
  dir > 0 ? atBottom(el) : atTop(el);

const isEditable = (t: EventTarget | null) => {
  const el = t as HTMLElement | null;
  return (
    !!el &&
    (el.isContentEditable || /^(input|textarea|select)$/i.test(el.tagName))
  );
};

// The charge fill (0..1) and a transition-bypass toggle are written as custom
// properties on the cue *element*, so the ring
// `<circle>` inherits them. On routes without the cue -> find no target -> engine runs headless
const CHARGE_PROP = "--explore-charge";
const ANIM_PROP = "--explore-charge-anim";

type Params = {
  scrollRef: RefObject<HTMLDivElement | null> | null;
  open: DrawerId | null;
  openDrawer: (id: DrawerId) => void;
  closeDrawer: () => void;
};

/**
 * Drives the ScrollCue gateway's two "decaying charge" rings.
 *
 * The site is a 3-position slider - Contact (left) -= Home -= Work (right). 
 * Gesture rules: 
 * - down opens Work / closes Contact drawer
 * - up opens Contact / closes Work drawer 
 * The visualised ring is drawer-bound (see {@link cueFor}), so each cue
 * location handles both opening and closing its drawer.
 *
 * Gateway only fires on an **overscroll past the edge of the active scroll
 * surface**, which is either the page container at home/on a project, or the open drawer's
 * `<aside>` while a drawer is open ({@link activeSurface}). 
 * Mid-content gestures fall through to native scroll, so a long page or a long drawer scrolls freely
 * and only converts to charge at its edge. When content fits the viewport both
 * edges coincide, so the gesture is always armed (the original desktop home
 * behavior, unchanged).
 *
 * After {@link IDLE_BEFORE_DRAIN_MS} of no input the charge drains linearly back
 * to empty over {@link DRAIN_TIME_MS}; any new gesture cancels the drain.
 * Switching to a different ring mid-charge resets the charge to 0.
 *
 * Charge is animation state, not render state, so it lives in closure variables
 * mirrored onto each cue element's `--explore-charge` custom property (inherited
 * by its ring) rather than React state:
 * - charge bumps animate via the ring's CSS transition (no jumps)
 * - the drain runs as a rAF loop with the transition disabled (--explore-charge-anim
 *   = 0ms), since its per-frame ticks are minuscule and the loop is the animation
 */
export function useExploreCharge({
  scrollRef,
  open,
  openDrawer,
  closeDrawer,
}: Params) {
  const openRef = useRef(open);
  // Timestamp until which input is ignored (covers the drawer slide animation).
  const lockUntilRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
    // =briefly lock input while drawer animates
    if (mountedRef.current) 
      lockUntilRef.current = performance.now() + TRIGGER_LOCK_MS;
    else 
      mountedRef.current = true;
  }, [open]);

  useEffect(() => {
    const scrollEl = scrollRef?.current;
    if (!scrollEl) return;

    // Safe to resolve once since drawers always rendered (off screen)
    const workEl = document.getElementById("sidebar-work") as HTMLElement | null;
    const contactEl = document.getElementById("sidebar-contact") as HTMLElement | null;

    // Which surface a gesture must come from to be valid based on slider position
    const activeSurface = (o: DrawerId | null): HTMLElement | null =>
      o === "work" ? workEl : o === "contact" ? contactEl : scrollEl;

    // The single cue lives on the home page only and mounts/unmounts on route
    // change, so resolve it lazily and re-query when the cached node detaches.
    let cueElCache: HTMLElement | null = null;
    const cueEl = (): HTMLElement | null => {
      if (!cueElCache || !cueElCache.isConnected) {
        cueElCache = document.querySelector<HTMLElement>("[data-cue]");
      }
      return cueElCache;
    };

    let charge = 0;
    let chargeSide: Side | null = null; // which direction is charging

    // Keep `chargeSide` and the React-facing direction store
    const setSide = (next: Side | null) => {
      chargeSide = next;
      setChargeDir(next === "top" ? "up" : next === "bottom" ? "down" : null);
    };

    let drainTimer = 0;
    let fireTimer = 0;
    let raf = 0;
    let lastTick = 0;
    let touchStartY = 0;

    const writeCharge = (v: number) =>
      cueEl()?.style.setProperty(CHARGE_PROP, v.toFixed(3));

    // Bypass the ring's CSS transition while the rAF loop drives its drain; restore
    // it (fall back to the stylesheet default) for animated bumps.
    const setInstant = (on: boolean) => {
      const el = cueEl();
      if (!el) return;
      if (on) el.style.setProperty(ANIM_PROP, "0ms");
      else el.style.removeProperty(ANIM_PROP);
    };

    /** --- Charge drain (rAF) */
    const stopDrain = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      setInstant(false);
    };

    const tick = (now: number) => {
      charge = Math.max(0, charge - (now - lastTick) / DRAIN_TIME_MS);
      lastTick = now;
      if (chargeSide) writeCharge(charge);
      if (charge > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        stopDrain();
        setSide(null);
      }
    };

    const startDrain = () => {
      if (raf || charge <= 0 || !chargeSide) return;
      setInstant(true);
      lastTick = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const scheduleDrain = () => {
      window.clearTimeout(drainTimer);
      drainTimer = window.setTimeout(startDrain, IDLE_BEFORE_DRAIN_MS);
    };

    /** --- Charge add (event driven, animates via CSS transition) */
    const addCharge = (dir: number, deltaPx: number) => {
      window.clearTimeout(drainTimer);
      window.clearTimeout(fireTimer);
      stopDrain(); // leave the decaying state, resume from current charge

      charge = Math.min(1, charge + Math.min(MAX_STEP, deltaPx) / CHARGE_NEEDED_PX);
      writeCharge(charge);

      if (charge >= 1) {
        const opensDrawer = openRef.current === null;
        resolve(openRef.current, dir, openDrawer, closeDrawer);
        // Guard the slide synchronously; the sync effect also sets this once the
        // open state actually flips.
        lockUntilRef.current = performance.now() + TRIGGER_LOCK_MS;

        // Empty the ring back out. On an open, hold the full ring briefly so it
        // lingers as the drawer slides + the arrow flips, then glide it down.
        const reset = () => {
          charge = 0;
          setSide(null);
          writeCharge(0);
        };
        if (opensDrawer) fireTimer = window.setTimeout(reset, OPEN_DECAY_DELAY_MS);
        else reset();
        return;
      }
      scheduleDrain();
    };

    /**
     * Convert raw gesture delta on `surfaceEl` into charge.
     * Returns true when the gesture was consumed (the caller should then `preventDefault`); 
     * false lets the browser scroll natively.
     */
    const handleIntent = (delta: number, surfaceEl: HTMLElement): boolean => {
      if (performance.now() < lockUntilRef.current) return false;
      if (!delta) return false;
      if (surfaceEl !== activeSurface(openRef.current)) return false;

      const dir = delta > 0 ? 1 : -1;
      if (!allowed(openRef.current, dir)) return false;
      // Not an overscroll past the edge yet - let the surface scroll natively.
      if (!atEdge(surfaceEl, dir)) return false;

      const side = cueFor(openRef.current, dir);
      if (side !== chargeSide) {
        // Reversing direction: glide the ring back to 0, then refill the new way.
        // chargeSide flips top-=bottom directly (never null), so the cue's icon
        // morphs up-=down without flashing through the idle "arrows-vertical-bold".
        if (chargeSide) {
          stopDrain();
          writeCharge(0);
        }
        charge = 0;
        setSide(side);
      }
      addCharge(dir, Math.abs(delta));
      return true;
    };

    /* ======================================================
     * Event handlers
     * ====================================================== */
    const onWheel = (e: WheelEvent) => {
      if (handleIntent(wheelPx(e), e.currentTarget as HTMLElement)) e.preventDefault();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchStartY;
      const dy = touchStartY - y; // + = downward swipe
      touchStartY = y;
      if (handleIntent(dy, e.currentTarget as HTMLElement)) e.preventDefault();
    };

    // Horizontal arrows = pure intent, fire from anywhere. 
    // Vertical keys double as native scroll
    const onKey = (e: KeyboardEvent) => {
      if (performance.now() < lockUntilRef.current) return;
      if (isEditable(e.target)) return;

      let dir = 0;
      let requireEdge = true;
      if (e.key === "ArrowRight") {
        dir = 1;
        requireEdge = false;
      } else if (e.key === "ArrowLeft") {
        dir = -1;
        requireEdge = false;
      } else if (DOWN_KEYS.has(e.key)) {
        dir = 1;
      } else if (UP_KEYS.has(e.key)) {
        dir = -1;
      }

      if (!dir || !allowed(openRef.current, dir)) return;

      if (requireEdge) {
        const surface = activeSurface(openRef.current);
        if (!surface || !atEdge(surface, dir)) return;
      }

      resolve(openRef.current, dir, openDrawer, closeDrawer);
      lockUntilRef.current = performance.now() + TRIGGER_LOCK_MS;
      e.preventDefault();
    };

    const surfaces = [scrollEl, workEl, contactEl].filter(
      (el): el is HTMLElement => el !== null,
    );
    for (const el of surfaces) {
      el.addEventListener("wheel", onWheel, { passive: false });
      el.addEventListener("touchstart", onTouchStart, { passive: true });
      el.addEventListener("touchmove", onTouchMove, { passive: false });
    }
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(drainTimer);
      window.clearTimeout(fireTimer);
      stopDrain();
      for (const el of surfaces) {
        el.removeEventListener("wheel", onWheel);
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchmove", onTouchMove);
      }
      window.removeEventListener("keydown", onKey);
      setChargeDir(null); // leaving home drop the cue to idle
      const el = cueEl();
      el?.style.removeProperty(CHARGE_PROP);
      el?.style.removeProperty(ANIM_PROP);
    };
  }, [scrollRef, openDrawer, closeDrawer]);
}
