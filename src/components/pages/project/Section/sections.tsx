import type {
  ProjectSection,
  SectionParagraph,
  SectionBulletedList,
  SectionTwoUpTextImage,
  SectionImage,
  SectionVideo,
  SectionStats,
} from "@/lib/types/project-content";

import Markdown from "@/components/ui/Markdown";
import Sheet from "@/components/ui/Sheet";

import * as sty from "./sections.css";


export function SectionShell({
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
    <Sheet accent={accent} className={sty.sectionSheet}>
      <section id={`section-${id}`} className={sty.section}>
        {title && <h2 className={titleCls}>{title}</h2>}
        {children}
      </section>
    </Sheet>
  );
}

export function Paragraph({ s }: { s: SectionParagraph }) {
  return (
    <SectionShell id={s.id} title={s.title} accent={s.accent}>
      <div className={sty.prose}>
        <Markdown value={s.body} />
      </div>
    </SectionShell>
  );
}

export function BulletedList({ s }: { s: SectionBulletedList }) {
  return (
    <SectionShell id={s.id} title={s.title} accent={s.accent}>
      {s.intro && (
        <div className={[sty.prose, sty.intro].join(" ")}>
          <Markdown value={s.intro} />
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

export function TwoUpTextImage({ s }: { s: SectionTwoUpTextImage }) {
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
      <Markdown value={s.body} />
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

export function ImageSection({ s }: { s: SectionImage }) {
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

export function VideoSection({ s }: { s: SectionVideo }) {
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

export function StatsSection({ s }: { s: SectionStats }) {
  const isHeadlineMode = s.stats.length > 4;
  return (
    <SectionShell id={s.id} title={s.title} accent={s.accent}>
      {/* <StatStrip stats={s.stats} /> */}
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
