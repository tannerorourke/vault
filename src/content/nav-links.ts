import type { NavFilter, NavLink } from "@/lib/types/nav";
import { Envelope } from "@/components/icons/envelope";
import { Linkedin } from "@/components/icons/linkedin";
import { Github } from "@/components/icons/github";
// import { Medium } from "@//components/icons/medium";
import { FileText } from "../components/icons/file-text";
import { GradCap } from "@/components/icons/grad-cap";

export const NAV_FILTERS: NavFilter[] = [
  { id: 'research', label: 'Research' },
  { id: 'labs', label: 'Labs' },
  { id: 'experience', label: 'Experience' },
]

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