import { IProject, ITag } from "../lib/types/global";


export const TAGS: { [id: string]: ITag } = {
  "spatiotemporal": {
    group: "area",
    label: "Spatiotemporal Modeling",
    color: ""
  },
  "nlp": {
    group: "area",
    label: "NLP",
    color: ""
  },
  "comp-vision": {
    group: "area",
    label: "Computer Vision",
    color: ""
  },
  "ui-systems": {
    group: "area",
    label: "UI Systems",
    color: ""
  },
  "app-design": {
    group: "area",
    label: "App Design",
    color: ""
  },
};

export const TAG_GROUP_COLORS = {
  "area": "",
  "intent": "",
  "theme": "",
  "technique": "",
  "stack": ""
}


export const PROJECTS: IProject[] = [
    {
        pid: "fire-fusion",
        title: "FireFusion",
        tags: [TAGS['spatiotemporal']],
        filterIds: ['aiml', 'research', 'labs'],
        year: "2025",
        summaryShort: "2-week build of a spatiotemporal ConvFormer for wildfire ignition prediction",
        links: [
          { 
            src: "public/icons/social-github.svg",
            alt: "Go to the code",
            href: "https://github.com/torourke14/msai-lab/tree/main/msai-a4-gpt-causality/a4-distrib" },
          { 
            src: "public/icons/pdf.svg",
            alt: "Download the Paper",
            href: "https://github.com/torourke14/msai-lab/blob/main/msai-a4-gpt-causality/analysis.pdf",
            download: "gpt-causality-analysis"
          }
        ],
        readTime: 10,
        isFeature: true,
        summaryLong: "long summary text",
        sections: [],
    },
    {
        pid: "directv",
        title: "DirecTV",
        filterIds: ['experience'],
        tags: [TAGS['ui-systems']],
        year: "2023-2025",
        summaryShort: "Next.js development for directv.com team",
        links: [],
        readTime: 10,
        isFeature: false,
        summaryLong: "long summary text",
        sections: [],
    },
    {
        pid: "gpt4",
        title: "\"Fact Checking\" ChatGPT",
        filterIds: ['labs'],
        tags: [],
        year: "2025",
        summaryShort: "SNLI causality analysis of ChatGPT responses",
        links: [
          { 
            src: "public/icons/social-github.svg",
            alt: "Go to the code",
            href: "https://github.com/torourke14/msai-lab/tree/main/msai-a4-gpt-causality/a4-distrib" },
          { 
            src: "public/icons/pdf.svg",
            alt: "Download PDF",
            href: "https://github.com/torourke14/msai-lab/blob/main/msai-a4-gpt-causality/analysis.pdf",
            download: "gpt-causality-analysis"
          }
        ],
        readTime: 5,
        isFeature: false,
        summaryLong: "long summary text",
        sections: [],
    }
]