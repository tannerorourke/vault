import type { ReactNode } from "react";
import TextLink from "@/components/ui/TextLink";


export const HOOK: ReactNode = (
  <>
    <strong>Hey there,</strong>
  </>
);

const dtvLink = <TextLink
  label={"DirecTV"}
  nextProps={{ href: "/directv" }}
  textProps={{ variant: "body", tone: "secondary" }}
/>

const wbLink = <TextLink
  label={"Warner Bros"}
  nextProps={{ href: "/wb" }}
  textProps={{ variant: "body", tone: "secondary" }}
/>

export const PARAGRAPHS: ReactNode[] = [
  (
    <>
      I'm drawn to how technology represents information, how AI can be 
      shaped to actually serve the people using it, and the practice of 
      getting there - learning, building, collaborating, refining.
    </>
  ),
  (
    <>
      After undergraduate studies in CS and Human-Computer Interaction 
      at UC Boulder, I spent five years engineering at {wbLink} and {dtvLink}. 
      I've since transitioned to ML, earning a Master's in AI from UT Austin, 
      working on interpretability research and agents designed for complex 
      code iteration.
    </>
  ),
  (
    <>
      Off-keyboard, I'm usually outside - backcountry skiing, mountain 
      biking, summiting mountains where I can (Kilimanjaro, Mt. Rainier 
      twice, a bunch more). Big cook and even bigger music buff.
    </>
  )
]

export const CURRENTLY_AS_OF = "May 2026";
