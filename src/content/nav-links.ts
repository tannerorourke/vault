import type { NavFilter, NavLink } from "@/lib/types/nav";
import { Envelope } from "@/components/icons/envelope";
import { Linkedin } from "@/components/icons/linkedin";
import { Github } from "@/components/icons/github";
// import { Medium } from "@//components/icons/medium";
import { FileText } from "../components/icons/file-text";

export const NAV_FILTERS: NavFilter[] = [
  { id: 'aiml', label: 'AI/ML' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'labs', label: 'Labs' }
]

export const LINKS: NavLink[] = [
  {
    Icon: Github, text: "GitHub",
    alt: "GitHub",
    href: "https://github.com/tannerorourke/",
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
];

export const ABOUT_LINKS = LINKS.filter((l: NavLink) =>
  ["LinkedIn", "Download CV", "Email me"].includes(l.alt ?? "")
)
