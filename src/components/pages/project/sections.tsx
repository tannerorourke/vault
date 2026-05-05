import type {
  ProjectSection,
  SectionParagraph,
  SectionBulletedList,
  SectionTwoUpTextImage,
  SectionImage,
  SectionVideo,
} from "@/lib/types/project-content";
import * as sty from "./sections.css";

function SectionShell({
  id,
  title,
  children,
}: {
  id: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={`section-${id}`} className={sty.section}>
      {title && <h2 className={sty.sectionTitle}>{title}</h2>}
      {children}
    </section>
  );
}

function Paragraph({ s }: { s: SectionParagraph }) {
  return (
    <SectionShell id={s.id} title={s.title}>
      <div
        className={sty.prose}
        dangerouslySetInnerHTML={{ __html: s.body }}
      />
    </SectionShell>
  );
}

function BulletedList({ s }: { s: SectionBulletedList }) {
  return (
    <SectionShell id={s.id} title={s.title}>
      {s.intro && (
        <div
          className={[sty.prose, sty.intro].join(" ")}
          dangerouslySetInnerHTML={{ __html: s.intro }}
        />
      )}
      <ul className={sty.list}>
        {s.items.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </SectionShell>
  );
}

function TwoUpTextImage({ s }: { s: SectionTwoUpTextImage }) {
  const reverse = s.imageSide === "left";
  return (
    <SectionShell id={s.id} title={s.title}>
      <div
        className={[sty.twoUp, reverse ? sty.twoUpReverse : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className={sty.prose}
          dangerouslySetInnerHTML={{ __html: s.body }}
        />
        <img
          className={sty.inlineImage}
          src={s.image.src}
          alt={s.image.alt ?? ""}
        />
      </div>
    </SectionShell>
  );
}

function ImageSection({ s }: { s: SectionImage }) {
  return (
    <SectionShell id={s.id} title={s.title}>
      <img
        className={sty.standaloneImage}
        src={s.src}
        alt={s.alt ?? ""}
      />
      {s.caption && <p className={sty.caption}>{s.caption}</p>}
    </SectionShell>
  );
}

function VideoSection({ s }: { s: SectionVideo }) {
  const isYoutube =
    s.kind === "youtube" || /youtube\.com|youtu\.be/.test(s.src);
  return (
    <SectionShell id={s.id} title={s.title}>
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
  }
}
