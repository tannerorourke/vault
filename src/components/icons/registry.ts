import type { ComponentType } from "react";
import type { IconProps } from "@/lib/types/icons";

// import { ArrowCircleDown } from "./arrow-circle-down";
// import { ArrowCircleUp } from "./arrow-circle-up";
import { ArrowDown } from "./arrow-down";
import { ArrowLeft } from "./arrow-left";
import { ArrowRight } from "./arrow-right";
import { ArrowUp } from "./arrow-up";
import { ArrowUpRight } from "./arrow-up-right";
import { CaretCircleDown } from "./caret-circle-down";
// import { CaretCircleUp } from "./caret-circle-up";
// import { CaretLeft } from "./caret-left";
// import { CaretRight } from "./caret-right";
import { CodeBrackets } from "./code-brackets";
// import { CodeFile } from "./code-file";
// import { Dot } from "./dot";
// import { Download } from "./download";
import { Envelope } from "./envelope";
import { FileText } from "./file-text";
import { Github } from "./github";
// import { Globe } from "./globe";
import { GradCap } from "./grad-cap";
import { Linkedin } from "./linkedin";
// import { Medium } from "./medium";
import { Moon } from "./moon";
import { Network } from "./network";
// import { Notebook } from "./notebook";
// import { Pdf } from "./pdf";
import { Sun } from "./sun";
import { Times } from "./times";
import { User } from "./user";

export const iconRegistry = {
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "arrow-up-right": ArrowUpRight,
  "caret-circle-down": CaretCircleDown,
  "code-brackets": CodeBrackets,
  "envelope": Envelope,
  "file-text": FileText,
  "github": Github,
  "grad-cap": GradCap,
  "linkedin": Linkedin,
  "moon": Moon,
  "network": Network,
  "sun": Sun,
  "times": Times,
  'user': User
} as const satisfies Record<string, ComponentType<IconProps>>;

export type IconName = keyof typeof iconRegistry;
