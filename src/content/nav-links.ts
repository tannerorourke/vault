import type { ComponentType } from "react";
import { IFilter } from "src/lib/types/global";
import type { IconProps } from "@/lib/types/icons";
import { Envelope } from "@/content/icons/envelope";
import { Download } from "@/content/icons/download";
import { Linkedin } from "@/content/icons/linkedin";
import { Github } from "@/content/icons/github";
import { Medium } from "@/content/icons/medium";

export const NAV_FILTERS: IFilter[] = [
  { id: 'aiml', label: 'AI/ML' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'labs', label: 'Labs' }
]

type NavLink = {
  Icon: ComponentType<IconProps>;
  alt: string;
  href: string;
  tooltipText: string;
  target?: string;
  download?: string;
};

export const SIDEBAR_LINKS: NavLink[] = [
  {
    Icon: Github,
    alt: "GitHub",
    href: "https://github.com/torourke14",
    target: "_blank",
    tooltipText: "GitHub"
  },
  {
    Icon: Linkedin, alt: "LinkedIn",
    href: "https://www.linkedin.com/in/tworourke/",
    target: "_blank",
    tooltipText: "LinkedIn"
  },
  {
    Icon: Download, alt: "Download CV",
    href: "/content/tanner-orourke-cv.pdf",
    download: "tanner-orourke-cv",
    tooltipText: "Download CV"
  },
  {
    Icon: Envelope, alt: "Email me",
    href: "mailto:tannero@live.com?subject=Reaching%20out",
    tooltipText: "Email me"
  },
  // {
  //   Icon: Medium, alt: "Medium",
  //   href: "https://medium.com/@tannerorourke",
  //   target: "_blank",
  //   tooltipText: "Medium"
  // }
];