import { NavLink } from "@/lib/types/nav";
import { LINKS } from "./nav-links";

export const PARAGRAPHS: string[] = [
  "Hi, I'm Tanner. I work on understanding what neural networks are actually doing and conveying it to humans.",
  "My day-to-day spans AI-assisted developer workflows, training and evaluation pipelines, and interpretability research. My current work applies interpretability techniques to non-transformer architectures – first Joint Embedding Predictive Architectures (JEPAs) on clinical sequence data.",
  "I came to ML through five years of software engineering at Warner Bros. and DirecTV, then earned a Master's in AI from UT Austin. Before that, undergraduate studies in CS and Human-Computer Interaction at CU Boulder shaped how I think about neural networks. HCI is about making systems usable to humans; interpretability is about making them legible to us.",
  "Outside work, I'm often outside skiing, mountain biking, mountaineering (Kilimanjaro, Mt. Rainier x2, a bunch more). Big cook, bigger music nerd.",
];


export const CONTACT_TEXT: string = "Currently open to ML engineering and interpretability research roles.";


export const ABOUT_LINKS: NavLink[] = 
  ["Email me", "LinkedIn", "GitHub", "Download CV"].reduce((acc, alt) => {
    const found = LINKS.find((l) => l.alt === alt);
    if (!found) return acc;
    return [...acc, found];
  }, [] as NavLink[]);

  
export const AUX_LINKS: NavLink[] = [
  {
    text: "ORCID",
    alt: "ORCID profile",
    href: "https://orcid.org/0009-0000-8384-4046",
    target: "_blank",
    tooltipText: "ORCID",
  },
  {
    text: "ResearchGate",
    alt: "ResearchGate profile",
    href: "https://www.researchgate.net/about/Tanner-Orourke",
    target: "_blank",
    tooltipText: "ResearchGate",
  },
];