import { Filter, LinkIcon } from "../lib/types/global";

export const NAV_FILTERS: Filter[] = [
  { id: 'aiml', label: 'AI/ML' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'labs', label: 'Labs' }
]

export const SIDEBAR_LINKS: LinkIcon[] = [
  { 
    src: "public/icons/github.png", 
    alt: "Go to my GitHub",
    href: "https://github.com/torourke14",
    target: "_blank",
  },
  {
    src: "public/icons/linkedin.png",
    alt: "Go to my LinkedIn",
    href: "https://www.linkedin.com/in/tworourke/",
    target: "_blank",
  },
  { 
    src: "public/icons/download.png",
    alt: "Download my CV",
    download: 'tanner-orourke-cv',
    href: "public/content/tanner-orourke-cv.pdf" 
  },
  { 
    src: "public/icons/email.png", 
    alt: "Email me",
    href: "mailto:tannero@live.com?subject=Reaching%20out" 
  },
];