import type { ProjectContent } from "@/lib/types/project";

import { Link } from "next-view-transitions";
import Image from "next/image";
import Text from "@/components/ui/Text";
import Markdown from "@/components/ui/Markdown";
import Eyebrow from "@/components/ui/Eyebrow";

import { content } from "@/lib/content/content";
import * as sty from "./work-index.css";


function IndexCard({ project }: { project: ProjectContent }) {
  const {
    pid,
    title,
    indexSubtitle,
    eyebrow,
    thumbnail
  } = project;

  return (
    <Link
      href={`/${pid}`}
      prefetch
      className={sty.cardBase}
    >
      <div className={sty.headRow}>
        {(thumbnail && thumbnail.src) && (
          <div className={sty.image}>
            {thumbnail.src.toLowerCase().endsWith(".svg") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnail.src}
                alt={thumbnail.alt ?? ""}
                className={sty.img}
              />
            ) : (
              <Image
                src={thumbnail.src}
                alt={thumbnail.alt ?? ""}
                className={sty.img}
                width={150} height={150}
              />
            )}
          </div>
        )}
        <Text as="h3" className={sty.title} variant="titleXs">
          {title}
        </Text>
      </div>

      {eyebrow &&
        <Eyebrow className={sty.eyebrow} as="span">{eyebrow}</Eyebrow>
      }

      <div className={sty.reveal}>
        {indexSubtitle &&
          <Markdown
            textProps={{ as: "p", variant: "bodySm", className: sty.subtitle }}
            value={indexSubtitle}
          />
        }
      </div>
    </Link>
  );
}

export function WorkIndex() {
  return (
    <section className={sty.section}>
      <ul className={sty.list}>
        {content.projectList.map((p) => (
          <li key={p.pid}>
            <IndexCard project={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WorkIndex;
