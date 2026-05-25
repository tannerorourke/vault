import { NavLink } from "@/content/nav-links";
import { LINKS } from "./nav-links";

export const PARAGRAPHS: string[] = [
  "Hi, I'm Tanner. I work on understanding what neural networks are actually doing and conveying it to humans.",
  "My day-to-day spans AI-assisted developer workflows, training and evaluation pipelines, and interpretability research. My current work applies interpretability techniques to non-transformer architectures – first Joint Embedding Predictive Architectures (JEPAs) on clinical sequence data.",
  "I came to ML through five years of software engineering at Warner Bros. and DirecTV, then earned a Master's in AI from UT Austin. Before that, undergraduate studies in CS and Human-Computer Interaction at CU Boulder shaped how I think about neural networks. HCI is about making systems usable to humans; interpretability is about making them legible to us.",
  "Outside work, I'm often outside skiing, mountain biking, mountaineering (Kilimanjaro, Mt. Rainier x2, a bunch more). Big cook, bigger music nerd.",
];


export const CONTACT_TEXT: string =
  "Currently open to *ML engineering and interpretability research roles*. [Download my CV](/Tanner-ORourke-cv.pdf).";


export const ABOUT_LINKS: NavLink[] =
  ["Email me", "LinkedIn", "GitHub", "Google Scholar"].reduce((acc, alt) => {
    const found = LINKS.find((l) => l.alt === alt);
    if (!found) return acc;
    return [...acc, found];
  }, [] as NavLink[]);


export const PHOTO_META: { key: string; val: string }[] = [
  { key: "Subject",  val: "Tanner O'Rourke" },
  { key: "Shot",     val: "2024" },
  { key: "Location", val: "Boulder, CO" },
];
