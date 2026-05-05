import { IFilter } from "../lib/types/global";

export const NAV_FILTERS: IFilter[] = [
  { id: 'aiml', label: 'AI/ML' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'labs', label: 'Labs' }
]

export const SIDEBAR_LINKS = [
  {
    icon: "github",
    alt: "GitHub",
    href: "https://github.com/torourke14",
    target: "_blank",
    tooltipText: "GitHub",
  },
  {
    icon: "linkedin",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/tworourke/",
    target: "_blank",
    tooltipText: "LinkedIn",
  },
  { 
    icon: "download",
    alt: "Download CV",
    download: 'tanner-orourke-cv',
    href: "content/tanner-orourke-cv.pdf",
    tooltipText: "Download CV",
  },
  { 
    icon: "mail",
    alt: "Email me",
    href: "mailto:tannero@live.com?subject=Reaching%20out",
    tooltipText: "Email me",
  },
];