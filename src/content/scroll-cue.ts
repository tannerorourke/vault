export const SCROLL_CUE_IDLE = "Scroll";

export type ScrollCueHint = { idle: string; active: string };

export const SCROLL_CUE_HINTS: Record<"contact" | "work", ScrollCueHint> = {
  contact: { idle: "Reach out", active: "Close" },
  work: { idle: "My work", active: "Close" },
};
