import Markdown from "@/components/ui/Markdown";
import { preHighlightCodeBlocks } from "@/lib/markdown/highlight";

import * as sty from "./section.css";


function SectionShell({
  id,
  title,
  accent,
  children,
}: {
  id: string;
  title?: string;
  accent?: "copper";
  children: React.ReactNode;
}) {
  const titleCls = [sty.sectionTitle, accent === "copper" && sty.sectionTitleCopper]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={`section-${id}`} className={sty.section}>
      {title && <h2 className={titleCls}>{title}</h2>}
      {children}
    </section>
  );
}

type SectionParagraph = {
  type: "Paragraph";
  id: string;
  title?: string;
  body: string;
  accent?: "copper";
};

async function Paragraph({ s }: { s: SectionParagraph }) {
  const body = await preHighlightCodeBlocks(s.body);
  return (
    <SectionShell id={s.id} title={s.title} accent={s.accent}>
      <div className={sty.prose}>
        <Markdown value={body} />
      </div>
    </SectionShell>
  );
}

type SectionBulletedList = {
  type: "BulletedList";
  id: string;
  title?: string;
  intro?: string;
  items: string[];
  accent?: "copper";
};

async function BulletedList({ s }: { s: SectionBulletedList }) {
  const intro = s.intro ? await preHighlightCodeBlocks(s.intro) : undefined;
  return (
    <SectionShell id={s.id} title={s.title} accent={s.accent}>
      {intro && (
        <div className={[sty.prose, sty.intro].join(" ")}>
          <Markdown value={intro} />
        </div>
      )}
      <ul className={sty.list}>
        {s.items.map((item, i) => (
          <li key={i}>
            <Markdown value={item} inline />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

type SectionTwoUpTextImage = {
  type: "2upTextImage";
  id: string;
  title?: string;
  body: string;
  image: { src: string; alt?: string };
  /** Which side the image sits on. Defaults to "right". */
  side?: "left" | "right" | "top" | "bottom";
  accent?: "copper";
};

async function TwoUpTextImage({ s }: { s: SectionTwoUpTextImage }) {
  const body = await preHighlightCodeBlocks(s.body);
  const imageSide = s.side ?? "right";
  const isStacked = imageSide === "top" || imageSide === "bottom";

  const containerCls = isStacked
    ? sty.twoUpStacked
    : [sty.twoUp, imageSide === "left" ? sty.twoUpReverse : ""]
        .filter(Boolean).join(" ");

  const image = (
    <img className={sty.inlineImage}
         src={s.image.src} alt={s.image.alt ?? ""}
    />
  );
  const prose = (
    <div className={sty.prose}>
      <Markdown value={body} />
    </div>
  );

  return (
    <SectionShell id={s.id} title={s.title} accent={s.accent}>
      <div className={containerCls}>
        {imageSide === "top" ? (
          <>{image}{prose}</>
        ) : (
          <>{prose}{image}</>
        )}
      </div>
    </SectionShell>
  );
}

type SectionImage = {
  type: "Image";
  id: string;
  title?: string;
  src: string;
  alt?: string;
  caption?: string;
  accent?: "copper";
};

function ImageSection({ s }: { s: SectionImage }) {
  return (
    <SectionShell id={s.id} title={s.title} accent={s.accent}>
      <img
        className={sty.standaloneImage}
        src={s.src}
        alt={s.alt ?? ""}
      />
      {s.caption && <p className={sty.caption}>{s.caption}</p>}
    </SectionShell>
  );
}

type SectionVideo = {
  type: "Video";
  id: string;
  title?: string;
  /** Either an mp4 path/URL, or a YouTube embed URL. */
  src: string;
  /** Defaults to "mp4". Use "youtube" for an iframe embed. */
  kind?: "mp4" | "youtube";
  poster?: string;
  caption?: string;
  accent?: "copper";
};

function VideoSection({ s }: { s: SectionVideo }) {
  const isYoutube =
    s.kind === "youtube" || /youtube\.com|youtu\.be/.test(s.src);
  return (
    <SectionShell id={s.id} title={s.title} accent={s.accent}>
      <div className={sty.videoWrap}>
        {isYoutube ? (
          <iframe
            className={sty.videoMedia}
            src={s.src}
            title={s.title ?? "Video"}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className={sty.videoMedia}
            src={s.src}
            poster={s.poster}
            controls
            playsInline
          />
        )}
      </div>
      {s.caption && <p className={sty.caption}>{s.caption}</p>}
    </SectionShell>
  );
}

type SectionStats = {
  type: "Stats";
  id: string;
  title?: string;
  stats: Array<{ value: string; label: string }>;
  accent?: "copper";
};

function StatsSection({ s }: { s: SectionStats }) {
  const isHeadlineMode = s.stats.length > 4;
  return (
    <SectionShell id={s.id} title={s.title} accent={s.accent}>
      <div className={sty.strip} role="list">
        {s.stats.map((s, i) => (
          <div key={i} className={sty.cell} role="listitem">
            <div className={i === 0 && isHeadlineMode ? sty.value.headline : sty.value.default}>
              {s.value}
            </div>
            <div className={sty.label}>{s.label}</div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export type ProjectSection =
  | SectionParagraph
  | SectionBulletedList
  | SectionTwoUpTextImage
  | SectionImage
  | SectionVideo
  | SectionStats;

export function renderSection(s: ProjectSection) {
  switch (s.type) {
    case "Paragraph":
      return <Paragraph key={s.id} s={s} />;
    case "BulletedList":
      return <BulletedList key={s.id} s={s} />;
    case "2upTextImage":
      return <TwoUpTextImage key={s.id} s={s} />;
    case "Image":
      return <ImageSection key={s.id} s={s} />;
    case "Video":
      return <VideoSection key={s.id} s={s} />;
    case "Stats":
      return <StatsSection key={s.id} s={s} />;
  }
}
