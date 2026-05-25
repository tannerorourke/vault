import { IconComponent } from "@/lib/types/icons";

import { Envelope } from "@/components/icons/envelope";
import { Linkedin } from "@/components/icons/linkedin";
import { Github } from "@/components/icons/github";
// import { Medium } from "@//components/icons/medium";
import { FileText } from "../components/icons/file-text";
import { GradCap } from "@/components/icons/grad-cap";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";


export type NavLink = {
  Icon?: IconComponent;
  text?: string;
  alt?: string;
  href?: string;
  tooltipText?: string;
  target?: string;
  download?: string;
};

export const LINKS: NavLink[] = [
  {
    Icon: Github, text: "GitHub",
    alt: "GitHub",
    href: "https://github.com/tannerorourke/",
    target: "_blank",
    tooltipText: "GitHub"
  },
  {
    Icon: Linkedin, text: "LinkedIn",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/tannerorourke/",
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
  // {
  //   Icon: Medium, alt: "Medium",
  //   href: "https://medium.com/@tannerorourke",
  //   target: "_blank",
  //   tooltipText: "Medium"
  // }
  {
    Icon: GradCap, text: "Google Scholar",
    alt: "Google Scholar",
    href: "https://scholar.google.com/citations?user=RwfFBoEAAAAJ&hl=en",
    target: "_blank",
    tooltipText: "Google Scholar"
  }
];

export const FOOTER: string = "Designed and developed E2E by me using boilerplate Next.js / Vanilla Extract."

export const REPO_LINK: NavLink = {
  Icon: ArrowUpRight,
  alt: "View Source",
  href: "https://github.com/tannerorourke/vault",
  target: "_blank",
  tooltipText: "View Source"
}