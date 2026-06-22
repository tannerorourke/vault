"use client";

import { useDrawer, type DrawerId } from "@/components/providers/DrawerProvider";

import { Icon } from "@/components/ui/Icon";
import Eyebrow from "@/components/ui/Eyebrow";

import { SCROLL_CUE_HINTS, SCROLL_CUE_IDLE } from "@/content/scroll-cue";

import { RING_R, RING_CENTER } from "./scroll-cue.css";
import * as sty from "./scroll-cue.css";

import { useChargeDir, type ChargeDir } from "./charge-direction";


const ICON_LAYERS = ["arrows-vertical-bold", "arrow-up", "arrow-down"] as const;

const LABEL_LAYERS = [
  ...new Set([
    SCROLL_CUE_IDLE,
    SCROLL_CUE_HINTS.contact.idle,
    SCROLL_CUE_HINTS.work.idle,
    SCROLL_CUE_HINTS.contact.active,
    SCROLL_CUE_HINTS.work.active,
  ]),
];

type CueIcon = (typeof ICON_LAYERS)[number];
type CueView = { icon: CueIcon; label: string; arrow: "up" | "down" | "none" };

/**
 * 1. Drawer open ? arrow that closes it + "Close"
 * 2. home + charging ? scrolled direction's arrow + hint
 * 3. home + idle ? idle state
 */
function cueView(open: DrawerId | null, chargeDir: ChargeDir): CueView {
  if (open === "contact")   
    return { icon: "arrow-down", label: SCROLL_CUE_HINTS.contact.active, arrow: "down" };
  if (open === "work") 
    return { icon: "arrow-up", label: SCROLL_CUE_HINTS.work.active, arrow: "up" };
  if (chargeDir === "down") 
    return { icon: "arrow-down", label: SCROLL_CUE_HINTS.work.idle, arrow: "down" };
  if (chargeDir === "up") 
    return { icon: "arrow-up", label: SCROLL_CUE_HINTS.contact.idle, arrow: "up" };
  return { icon: "arrows-vertical-bold", label: SCROLL_CUE_IDLE, arrow: "none" };
}

/**
 * Home only affordance which renders charge cue based on state.
 * 
 * gesture engine ({@link ScrollGateway}, shell layout) provides `--explore-charge` 
 * and pushes charge direction to {@link useChargeDir}; here we only render the derived state.
 * 
 * Clicking opens {@link NavHub}
 */
export default function ScrollCue() {
  const { open, closeDrawer, setHubOpen } = useDrawer();
  const chargeDir = useChargeDir();
  const view = cueView(open, chargeDir);

  return (
    <div className={sty.cueWrap}>
      <button
        type="button"
        className={sty.scrollCuePositioner}
        aria-label={view.label}
        data-cue=""
        data-arrow={view.arrow}
        onClick={() => (open ? closeDrawer() : setHubOpen(true))}
      >
        <span className={sty.chargeRing}>
          <svg className={sty.ring} viewBox={`0 0 ${RING_CENTER * 2} ${RING_CENTER * 2}`} aria-hidden>
            <circle className={sty.ringTrack} cx={RING_CENTER} cy={RING_CENTER} r={RING_R} />
            <circle className={sty.ringProgress} cx={RING_CENTER} cy={RING_CENTER} r={RING_R} />
          </svg>
          <span className={sty.iconStack} aria-hidden>
            {ICON_LAYERS.map((name) => (
              <Icon
                key={name}
                name={name}
                size="sm"
                className={[sty.layer, view.icon === name ? sty.layerShown : sty.layerHidden].join(" ")}
              />
            ))}
          </span>
        </span>
        <span className={sty.labelStack}>
          {LABEL_LAYERS.map((label) => (
            <Eyebrow
              key={label}
              size="micro"
              aria-hidden={view.label !== label || undefined}
              className={[sty.labelLayer, view.label === label ? sty.layerShown : sty.layerHidden].join(" ")}
            >
              {label}
            </Eyebrow>
          ))}
        </span>
      </button>
    </div>
  );
}
