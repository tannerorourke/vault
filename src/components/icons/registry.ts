import type { ComponentType } from "react";
import type { IconProps } from "@/lib/types/icons";

/** Unused icons explicitly kept in case we need them
 *  but keep bundle small
*/

// import { ArrowCircleDown } from "./arrow-circle-down";
// import { ArrowCircleUp } from "./arrow-circle-up";
import { ArrowDown } from "./arrow-down";
import { ArrowLeft } from "./arrow-left";
import { ArrowRight } from "./arrow-right";
import { ArrowUp } from "./arrow-up";
import { ArrowUpRight } from "./arrow-up-right";
import { ArrowsVerticalBold } from "./arrows-vertical-bold";
import { CaretCircleDown } from "./caret-circle-down";
// import { CaretCircleUp } from "./caret-circle-up";
// import { CaretLeft } from "./caret-left";
// import { CaretRight } from "./caret-right";
import { CodeBrackets } from "./code-brackets";
import { Colab } from "./colab";
// import { CodeFile } from "./code-file";
// import { Download } from "./download";
import { Envelope } from "./envelope";
import { FileText } from "./file-text";
import { Github } from "./github";
// import { Globe } from "./globe";
import { GradCap } from "./grad-cap";
import { Heart } from "./heart";
import { Linkedin } from "./linkedin";
import { List } from "./list";
// import { Medium } from "./medium";
import { Moon } from "./moon";
import { Network } from "./network";
// import { Notebook } from "./notebook";
import { Pdf } from "./pdf";
import { Sun } from "./sun";
import { Times } from "./times";
import { User } from "./user";

export const iconRegistry = {
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "arrow-up-right": ArrowUpRight,
  "arrows-vertical-bold": ArrowsVerticalBold,
  "caret-circle-down": CaretCircleDown,
  "code-brackets": CodeBrackets,
  "colab": Colab,
  "envelope": Envelope,
  "file-text": FileText,
  "github": Github,
  "heart": Heart,
  "grad-cap": GradCap,
  "linkedin": Linkedin,
  "list": List,
  "moon": Moon,
  "network": Network,
  "pdf": Pdf,
  "sun": Sun,
  "times": Times,
  'user': User
} as const satisfies Record<string, ComponentType<IconProps>>;

export type IconName = keyof typeof iconRegistry;
