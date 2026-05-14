import type { ComponentType } from "react";
import { IFilter } from "src/lib/types/global";
import type { IconProps } from "@/lib/types/icons";
import { Envelope } from "@/content/icons/envelope";
import { Linkedin } from "@/content/icons/linkedin";
import { Github } from "@/content/icons/github";
// import { Medium } from "@/content/icons/medium";
import { FileText } from "./icons/file-text";

export const NAV_FILTERS: IFilter[] = [
  { id: 'aiml', label: 'AI/ML' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'labs', label: 'Labs' }
]

export type NavLink = {
  Icon: ComponentType<IconProps>;
  text: string;
  alt: string;
  href: string;
  tooltipText: string;
  target?: string;
  download?: string;
};

export const LINKS: NavLink[] = [
  {
    Icon: Github, text: "GitHub",
    alt: "GitHub",
    href: "https://github.com/torourke14",
    target: "_blank",
    tooltipText: "GitHub"
  },
  // {
  //   Icon: Medium, alt: "Medium",
  //   href: "https://medium.com/@tannerorourke",
  //   target: "_blank",
  //   tooltipText: "Medium"
  // }
  {
    Icon: Linkedin, text: "LinkedIn",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/tworourke/",
    target: "_blank",
    tooltipText: "LinkedIn"
  },
  {
    Icon: Envelope, text: "tannero@live.com",
    alt: "Email me",
    href: "mailto:tannero@live.com?subject=Reaching%20out",
    tooltipText: "Email me"
  },
  {
    Icon: FileText, text: "CV (PDF)",
    alt: "Download CV",
    href: "Tanner-ORourke-cv.pdf",
    target: "_blank",
    tooltipText: "Download CV"
  },
];

export const ABOUT_LINKS = LINKS.filter(l =>
  ["LinkedIn", "Download CV", "Email me"].includes(l.alt)
)