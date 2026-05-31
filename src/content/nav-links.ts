import type { IconName } from "@/components/icons/registry";


export type NavLink = {
  id: string;
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
    id: "github",
    iconName: "github", text: "GitHub",
    alt: "GitHub",
    href: "https://github.com/tannerorourke/",
    target: "_blank",
    tooltipText: "GitHub"
  },
  {
    id: "linkedin",
    iconName: "linkedin", text: "LinkedIn",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/tannerorourke/",
    target: "_blank",
    tooltipText: "LinkedIn"
  },
  {
    id: "email",
    iconName: "envelope", text: "tannero@live.com",
    alt: "Email me",
    href: "mailto:tannero@live.com?subject=Reaching%20out",
    tooltipText: "Email me"
  },
  {
    id: "cv",
    iconName: "file-text", text: "CV (PDF)",
    alt: "Download CV",
    href: "Tanner-ORourke-cv.pdf",
    target: "_blank",
    tooltipText: "Download CV"
  },
  // {
  //   id: "medium",
  //   iconName: "medium", alt: "Medium",
  //   href: "https://medium.com/@tannerorourke",
  //   target: "_blank",
  //   tooltipText: "Medium"
  // },
  {
    id: "scholar",
    iconName: "grad-cap", text: "Google Scholar",
    alt: "Google Scholar",
    href: "https://scholar.google.com/citations?user=RwfFBoEAAAAJ&hl=en",
    target: "_blank",
    tooltipText: "Google Scholar"
  },
  {
    id: "source",
    iconName: "arrow-up-right",
    alt: "View Source",
    href: "https://github.com/tannerorourke/vault",
    target: "_blank",
    tooltipText: "View Source"
  }
];

const ACTION_LINKS_BY_ID: Record<string, NavLink> =
  Object.fromEntries(ACTION_LINKS.map((l) => [l.id, l]));

export const getActionLink = (id: string): NavLink | undefined =>
  ACTION_LINKS_BY_ID[id];

export const REPO_LINK: NavLink = {
  id: "source",
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

export const PROJECT_FOOTER =
  "Hiring or interested in the work?\n\nI'm open for ML engineering and research roles. [Email me](${email}), or find my on [LinkedIn](${linkedin})"