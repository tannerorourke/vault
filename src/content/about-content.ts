import { NavLink } from "@/lib/types/nav";
import { LINKS } from "./nav-links";

export const PARAGRAPHS: string[] = [
  "Hey there! I'm an ML engineer currently living in Seattle, WA.",
  "I'm drawn to how technology represents information, how AI can be shaped to actually serve the people using it, and the practice of getting there - learning, building, collaborating, refining.",
  "After undergraduate studies in CS and Human-Computer Interaction at UC Boulder, I spent five years engineering at [Warner Bros](/wb) and [DirecTV](/directv). I've since transitioned to ML, earning a Master's in AI from UT Austin, working on interpretability research and agents designed for complex code iteration.",
  "Off-keyboard, I'm often outside - backcountry skiing, mountain biking, and summiting mountains where I can (Kilimanjaro, Mt. Rainier twice, a bunch more). Big cook and even bigger music buff.",
];


export const CONTACT_TEXT: string = "Currently open to **ML Engineer** roles!";


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