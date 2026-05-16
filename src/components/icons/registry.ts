import type { ComponentType } from "react";
import type { IconProps } from "@/lib/types/icons";

import { ArrowCircleDown } from "./arrow-circle-down";
import { ArrowCircleUp } from "./arrow-circle-up";
import { ArrowDown } from "./arrow-down";
import { ArrowLeft } from "./arrow-left";
import { ArrowRight } from "./arrow-right";
import { ArrowUp } from "./arrow-up";
import { CaretCircleDown } from "./caret-circle-down";
import { CaretCircleUp } from "./caret-circle-up";
import { CaretLeft } from "./caret-left";
import { CaretRight } from "./caret-right";
import { CodeBrackets } from "./code-brackets";
import { CodeFile } from "./code-file";
import { Dot } from "./dot";
import { Download } from "./download";
import { Envelope } from "./envelope";
import { FileText } from "./file-text";
import { Github } from "./github";
import { Globe } from "./globe";
import { Linkedin } from "./linkedin";
import { Medium } from "./medium";
import { Moon } from "./moon";
import { Network } from "./network";
import { Notebook } from "./notebook";
import { Pdf } from "./pdf";
import { Sun } from "./sun";
import { Times } from "./times";

export const iconRegistry = {
  "arrow-circle-down": ArrowCircleDown,
  "arrow-circle-up": ArrowCircleUp,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "caret-circle-down": CaretCircleDown,
  "caret-circle-up": CaretCircleUp,
  "caret-left": CaretLeft,
  "caret-right": CaretRight,
  "code-brackets": CodeBrackets,
  "code-file": CodeFile,
  "dot": Dot,
  "download": Download,
  "envelope": Envelope,
  "file-text": FileText,
  "github": Github,
  "globe": Globe,
  "linkedin": Linkedin,
  "medium": Medium,
  "moon": Moon,
  "network": Network,
  "notebook": Notebook,
  "pdf": Pdf,
  "sun": Sun,
  "times": Times,
} as const satisfies Record<string, ComponentType<IconProps>>;

export type IconName = keyof typeof iconRegistry;
