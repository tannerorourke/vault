import Image from "next/image";
import Markdown from "@/components/ui/Markdown";
import { preHighlightCodeBlocks } from "@/lib/markdown/highlight";
import { getImageSize, isSvg } from "@/lib/content/images";

import * as sty from "./section.css";
import Eyebrow from "@/components/ui/Eyebrow";


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
      {title && 
        <Markdown
          textProps={{ as: "h2", variant: "titleMd", className: titleCls }}
          value={title}
        />}
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
      <Markdown
        textProps={{ as: "p", variant: 'body', className: sty.prose }}
        value={body}
      />
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
        <Markdown 
          textProps={{ as: "p", variant: "body", className: [sty.prose, sty.bulletListIntro].join(" ") }}
          value={intro}
        />
      )}
      <ul className={sty.bulletList}>
        {s.items.map((item, i) => (
          <Markdown
            key={i}
            textProps={{
              as: "li",
              variant: "bodySm",
              className: sty.bulletListItem,
            }}
            value={item}
          />
        ))}
      </ul>
    </SectionShell>
  );
}

type SectionTwoUpTextImage = {
  type: "2upTextImage";
  id: string;
  title?: string;
  body?: string;
  caption?: string;
  image: { src: string; alt?: string };
  side?: "left" | "right" | "top" | "bottom";
  accent?: "copper";
};

async function TwoUpTextImage({ s }: { s: SectionTwoUpTextImage }) {
  const body = s.body ? await preHighlightCodeBlocks(s.body) : "";

  // image / side
  // ?caption


  const imageSide = s.side ?? "right";

  const containerCls = ["top", "bottom"].includes(imageSide)
    ? sty.twoUpStacked
    : [sty.twoUp, imageSide === "left" ? sty.twoUpReverse : ""]
        .filter(Boolean).join(" ");

  const img = isSvg(s.image.src) ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={sty.inlineImage}
      src={s.image.src} alt={s.image.alt ?? ""}
      loading="lazy"
    />
  ) : (
    <Image
      className={sty.inlineImage}
      src={s.image.src} alt={s.image.alt ?? ""}
      sizes="(min-width: 700px) 45vw, 100vw"
      {...getImageSize(s.image.src)}
    />
  )

  const image = s?.caption ? (
    <div className={sty.inlineImageWrap}>
      {img}
      <Markdown 
        textProps={{ as: "p", 
          variant: 'caption', 
          className: [sty.prose, sty.imgCaption].join(" ")
        }}
        value={s.caption}
      />
    </div>
  ) : img;

  const prose = s?.body ? (
    <Markdown 
      value={body}
      textProps={{ as: "p", 
        variant: imageSide === 'top' ? 'caption' : 'body', 
        className: [sty.prose, sty.imgCaption].join(" ")
      }}
    />
  ) : null;

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
      {isSvg(s.src) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={sty.standaloneImage}
          src={s.src}
          alt={s.alt ?? ""}
          loading="lazy"
        />
      ) : (
        <Image
          className={sty.standaloneImage}
          src={s.src}
          alt={s.alt ?? ""}
          sizes="(min-width: 1024px) 98ch, 100vw"
          {...getImageSize(s.src)}
        />
      )}
      {s.caption &&
        <Markdown
          textProps={{ as: "p", variant: "caption", className: sty.imgCaption }}
          value={s.caption}
        />}
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
      {s.caption && <p className={sty.imgCaption}>{s.caption}</p>}
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
      <ul className={sty.statsContainer}>
        {s.stats.map((s, i) => (
          <li key={i} className={sty.statCell}>
            <Markdown
              textProps={{
                as: "h4",
                variant: i === 0 && isHeadlineMode ? "titleLg" : "titleXs",
                className: sty.statValue,
              }}
              value={s.value}
            />
            <Eyebrow>{s.label}</Eyebrow>
          </li>
        ))}
      </ul>
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
    default:
      return null;
  }
}
