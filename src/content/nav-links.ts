import type { IconName } from "@/components/icons/registry";


export type NavLink = {
  iconName?: IconName;
  text?: string;
  alt?: string;
  href?: string;
  tooltipText?: string;
  target?: string;
  download?: string;
};

export const ACTION_LINKS: NavLink[] = [
  {
    iconName: "github", text: "GitHub",
    alt: "GitHub",
    href: "https://github.com/tannerorourke/",
    target: "_blank",
    tooltipText: "GitHub"
  },
  {
    iconName: "linkedin", text: "LinkedIn",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/tannerorourke/",
    target: "_blank",
    tooltipText: "LinkedIn"
  },
  {
    iconName: "envelope", text: "tannero@live.com",
    alt: "Email me",
    href: "mailto:tannero@live.com?subject=Reaching%20out",
    tooltipText: "Email me"
  },
  {
    iconName: "file-text", text: "CV (PDF)",
    alt: "Download CV",
    href: "Tanner-ORourke-cv.pdf",
    target: "_blank",
    tooltipText: "Download CV"
  },
  // {
  //   iconName: "medium", alt: "Medium",
  //   href: "https://medium.com/@tannerorourke",
  //   target: "_blank",
  //   tooltipText: "Medium"
  // },
  {
    iconName: "grad-cap", text: "Google Scholar",
    alt: "Google Scholar",
    href: "https://scholar.google.com/citations?user=RwfFBoEAAAAJ&hl=en",
    target: "_blank",
    tooltipText: "Google Scholar"
  },
  {
    iconName: "arrow-up-right",
    alt: "View Source",
    href: "https://github.com/tannerorourke/vault",
    target: "_blank",
    tooltipText: "View Source"
  }
];

export const REPO_LINK: NavLink = {
  iconName: "arrow-up-right",
  alt: "View Source",
  href: "https://github.com/tannerorourke/vault",
  target: "_blank",
  tooltipText: "View Source"
}

const linkSubset = (links: string[]): NavLink[] =>
  links.reduce((acc, l) => {
    const link = ACTION_LINKS.find((link) => link.alt === l);
    if (!link) return acc;
    return [...acc, link];
  }, [] as NavLink[]);


export const NAV_LINKS = 
  linkSubset(["Email me", "LinkedIn", "GitHub", "Google Scholar", "Download CV"]);

export const ABOUT_LINKS = 
  linkSubset(["Email me", "LinkedIn", "GitHub", "Google Scholar"]);